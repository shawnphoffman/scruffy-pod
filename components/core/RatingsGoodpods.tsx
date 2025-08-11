import { faStarSharp } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { goodpodsUrl } from '@/app/(pages)/(links)/links'

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

async function getGoodpodsReviews() {
	try {
		const res = await fetchWithRetry(`https://api.shawn.party/api/pod-data/goodpods?url=${goodpodsUrl}`, {
			next: { revalidate: 60 * 60 * 6 },
			timeout: 15000, // 15 second timeout
			retries: 2,
		})

		if (!res.ok) {
			console.error(`Goodpods API error: ${res.status} ${res.statusText}`)
			return {}
		}

		const text = await res.text()
		if (!text || text.trim() === '') {
			console.error('Goodpods API returned empty response')
			return {}
		}

		// Check if response starts with "An error" or similar error message
		if (text.toLowerCase().startsWith('an error') || text.toLowerCase().includes('error')) {
			console.error('Goodpods API returned error message:', text)
			return {}
		}

		const data = JSON.parse(text)
		// console.log('getGoodpodsReviews', data)
		return data
	} catch (e) {
		console.error('Goodpods API fetch error:', e)
		return {}
	}
}

export default async function RatingsGoodpods() {
	try {
		const spotifyData = await getGoodpodsReviews()

		if (!spotifyData || !spotifyData.rating) return null

		return (
			<a
				className="flex flex-row items-center px-2 py-1 text-xs font-bold leading-normal text-black rounded-lg whitespace-nowrap bg-goodpods"
				href={spotifyData.url || ''}
				target="_blank"
				rel="noopener noreferrer"
			>
				<div>{spotifyData.rating.toFixed(1)}</div>
				<FontAwesomeIcon icon={faStarSharp} size="sm" className="mx-0.5" />
				<div>on Goodpods</div>
			</a>
		)
	} catch (error) {
		console.error('Error rendering Goodpods ratings:', error)
		return null
	}
}
