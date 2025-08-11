'use server'

import { XMLParser } from 'fast-xml-parser'

import { appleRatingUrl, rssFeedUrl, spotifyUrl } from './(pages)/(links)/links'

// Utility function to add timeout to fetch calls
async function fetchWithTimeout(url: string, options: RequestInit & { timeout?: number } = {}) {
	const { timeout = 10000, ...fetchOptions } = options

	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), timeout)

	try {
		const response = await fetch(url, {
			...fetchOptions,
			signal: controller.signal,
		})
		clearTimeout(timeoutId)
		return response
	} catch (error) {
		clearTimeout(timeoutId)
		if (error instanceof Error && error.name === 'AbortError') {
			throw new Error(`Request timeout after ${timeout}ms`)
		}
		throw error
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
		const res = await fetchWithRetry(`https://api.shawn.party/api/pod-data/apple?url=${appleRatingUrl}`, {
			next: { revalidate: 60 * 60 * 1 },
			timeout: 15000, // 15 second timeout
		})

		if (!res.ok) {
			console.error(`Apple API error: ${res.status} ${res.statusText}`)
			return {}
		}

		const text = await res.text()
		if (!text || text.trim() === '') {
			console.error('Apple API returned empty response')
			return {}
		}

		// Check if response starts with "An error" or similar error message
		if (text.toLowerCase().startsWith('an error') || text.toLowerCase().includes('error')) {
			console.error('Apple API returned error message:', text)
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
		console.error('Apple API fetch error:', e)
		return {}
	}
}

export async function getSpotifyReviews() {
	try {
		const res = await fetchWithRetry(`https://api.shawn.party/api/pod-data/spotify-scrape?url=${spotifyUrl}`, {
			next: { revalidate: 60 * 60 * 6 },
			timeout: 15000, // 15 second timeout
		})

		if (!res.ok) {
			console.error(`Spotify API error: ${res.status} ${res.statusText}`)
			return {}
		}

		const text = await res.text()
		if (!text || text.trim() === '') {
			console.error('Spotify API returned empty response')
			return {}
		}

		// Check if response starts with "An error" or similar error message
		if (text.toLowerCase().startsWith('an error') || text.toLowerCase().includes('error')) {
			console.error('Spotify API returned error message:', text)
			return {}
		}

		const data = JSON.parse(text)
		// console.log('Spotify data', data)
		return {
			url: data?.url,
			rating: data?.vals?.rating ? Number(data?.vals?.rating) : undefined,
		}
	} catch (error) {
		console.error('Failed to fetch Spotify data', error)
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
			timeout: 15000, // 15 second timeout
		})

		if (!res.ok) {
			console.error(`RSS feed error: ${res.status} ${res.statusText}`)
			return {}
		}

		const xml = await res.text()
		if (!xml || xml.trim() === '') {
			console.error('RSS feed returned empty response')
			return {}
		}

		// Check if response contains error messages
		if (xml.toLowerCase().includes('error') || xml.toLowerCase().includes('not found')) {
			console.error('RSS feed returned error message')
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
			console.error('Failed to parse RSS XML:', parseError)
			return {}
		}

		// Validate parsed structure
		if (!parsed?.rss?.channel?.item || !Array.isArray(parsed.rss.channel.item)) {
			console.error('Invalid RSS feed structure')
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
