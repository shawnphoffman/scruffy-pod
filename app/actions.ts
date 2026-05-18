'use server'

import { XMLParser } from 'fast-xml-parser'

import { appleRatingUrl, rssFeedUrl, spotifyUrl } from './(pages)/(links)/links'

// Utility function to add a hard timeout to fetch calls. Uses Promise.race as
// a belt-and-suspenders guarantee: we stop waiting at `timeout`ms no matter
// what, even if the underlying fetch implementation ignores AbortSignal.
async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number } = {}) {
	const { timeout = 10000, ...fetchOptions } = options

	const controller = new AbortController()

	let timeoutId: ReturnType<typeof setTimeout> | undefined
	const timeoutPromise = new Promise<never>((_, reject) => {
		timeoutId = setTimeout(() => {
			controller.abort()
			reject(new Error(`Request timeout after ${timeout}ms`))
		}, timeout)
	})

	const fetchPromise = fetch(url, {
		...fetchOptions,
		signal: controller.signal,
	})
	// Swallow any late rejection (e.g. AbortError that fires after the race has
	// already been won by timeoutPromise) so it doesn't surface as an unhandled
	// promise rejection and crash the Node process.
	fetchPromise.catch(() => {})

	try {
		const response = await Promise.race([fetchPromise, timeoutPromise])
		return response
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			throw new Error(`Request timeout after ${timeout}ms`)
		}
		throw error
	} finally {
		if (timeoutId) clearTimeout(timeoutId)
	}
}

// Utility function to retry failed requests
async function fetchWithRetry(url: string, options: RequestInit & { timeout?: number; retries?: number } = {}) {
	const { retries = 2, ...fetchOptions } = options
	let lastError: Error | null = null

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			return await fetchWithTimeout(url, fetchOptions)
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error))

			if (attempt === retries) {
				break
			}

			// Wait before retrying (exponential backoff)
			const delay = Math.min(1000 * Math.pow(2, attempt), 5000)
			await new Promise(resolve => setTimeout(resolve, delay))
		}
	}

	throw lastError || new Error('Request failed after all retries')
}

export async function getAppleReviews() {
	try {
		const res = await fetchWithRetry(`https://api.shawn.party/api/podcast-data/apple?url=${appleRatingUrl}`, {
			next: { revalidate: 60 * 60 * 1 },
			timeout: 5000,
			retries: 1,
		})

		if (!res.ok) {
			console.warn(`Apple API error: ${res.status} ${res.statusText}`)
			return {}
		}

		const text = await res.text()
		if (!text || text.trim() === '') {
			console.warn('Apple API returned empty response')
			return {}
		}

		// Check if response starts with "An error" or similar error message
		if (text.toLowerCase().startsWith('an error') || text.toLowerCase().includes('error')) {
			console.warn('Apple API returned error message:', text)
			return {}
		}

		const data = JSON.parse(text)
		const { rating, ratingsUrl, reviews } = data

		return {
			appleRating: rating,
			appleRatingUrl: ratingsUrl,
			reviews,
		}
	} catch (e) {
		console.warn('Apple API fetch error:', e)
		return {}
	}
}

export async function getSpotifyReviews() {
	try {
		const res = await fetchWithRetry(`https://api.shawn.party/api/podcast-data/spotify-scrape?url=${spotifyUrl}`, {
			next: { revalidate: 60 * 60 * 6 },
			timeout: 5000,
			retries: 1,
		})

		if (!res.ok) {
			console.warn(`Spotify API error: ${res.status} ${res.statusText}`)
			return {}
		}

		const text = await res.text()
		if (!text || text.trim() === '') {
			console.warn('Spotify API returned empty response')
			return {}
		}

		// Check if response starts with "An error" or similar error message
		if (text.toLowerCase().startsWith('an error') || text.toLowerCase().includes('error')) {
			console.warn('Spotify API returned error message:', text)
			return {}
		}

		const data = JSON.parse(text)
		// console.log('Spotify data', data)
		return {
			url: data?.url,
			rating: data?.vals?.rating ? Number(data?.vals?.rating) : undefined,
		}
	} catch (error) {
		console.warn('Failed to fetch Spotify data', error)
		return {}
	}
}

function cleanEpisodeSummary(text: string) {
	const index = text.indexOf('Email us at')
	if (index !== -1) {
		text = text.substring(0, index).trim()
	}
	// text = text.replace(/Email us at.*$/gi, '').trim()

	// const regex1 = /(Chapters|^\d{2}:\d{2}:\d{2}.*)[\r\n]?/gm
	// text = text.replace(regex1, '')

	// const regex2 = /.*(?:https:\/\/justshillin\.com|feedback@justshillin\.com).*/gm
	// text = text.replace(regex2, '')

	// const regex3 = /\b(https?:\/\/\S+)\s+\[\1\]/g
	// text = text.replace(regex3, '$1')

	// const regexFinal = /[\r\n]{3,}/g
	// text = text.replace(regexFinal, '\n').replace(/[\r\n]+\s*$/g, '')

	return text
}

export async function getEpisodes() {
	try {
		const res = await fetchWithRetry(rssFeedUrl, {
			next: { revalidate: 60 * 60 * 1 },
			timeout: 8000,
			retries: 1,
		})

		if (!res.ok) {
			console.warn(`RSS feed error: ${res.status} ${res.statusText}`)
			return {}
		}

		const xml = await res.text()
		if (!xml || xml.trim() === '') {
			console.warn('RSS feed returned empty response')
			return {}
		}

		// Check if response contains error messages
		if (xml.toLowerCase().includes('error') || xml.toLowerCase().includes('not found')) {
			console.warn('RSS feed returned error message')
			return {}
		}

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		})

		let parsed
		try {
			parsed = parser.parse(xml)
		} catch (parseError) {
			console.warn('Failed to parse RSS XML:', parseError)
			return {}
		}

		// Validate parsed structure
		if (!parsed?.rss?.channel?.item || !Array.isArray(parsed.rss.channel.item)) {
			console.warn('Invalid RSS feed structure')
			return {}
		}

		const feedImg = parsed.rss.channel.image?.url
		const episodes = parsed.rss.channel.item.map(ep => {
			// console.log(ep)
			const imgSrc = ep['itunes:image'] ? ep['itunes:image']['@_href'] : feedImg
			return {
				guid: ep.guid?.['#text'] || ep.guid || '',
				title: ep.title || 'Untitled Episode',
				imgSrc: imgSrc || '',
				summary: cleanEpisodeSummary(ep['itunes:summary'] || ''),
				link: ep.link || '',
				pubDate: ep.pubDate || '',
			}
		})
		return {
			episodes,
		}
	} catch (error) {
		console.log('RSS feed fetch error:', error)
		return {}
	}
}
