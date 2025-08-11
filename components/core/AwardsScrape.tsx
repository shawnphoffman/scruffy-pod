import Image from 'next/image'
import Link from 'next/link'

import { goodpodsUrl } from '@/app/(pages)/(links)/links'

type Award = {
	// TODO - Add "name"
	imageHeight: number
	imageWidth: number
	frequency: string
	linkUrl: string
	imageUrl: string
	category: string
}

type AwardsResponse = {
	awards: Award[]
	url: string
}

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

export async function getAwards() {
	try {
		const res = await fetchWithRetry(`https://api.shawn.party/api/pod-data/goodpods-scrape?url=${goodpodsUrl}`, {
			next: { revalidate: 3600 },
			timeout: 15000, // 15 second timeout
			retries: 2,
			// next: { revalidate: 360 },
		})

		if (!res.ok) {
			console.error(`Awards API error: ${res.status} ${res.statusText}`)
			return []
		}

		const text = await res.text()
		if (!text || text.trim() === '') {
			console.error('Awards API returned empty response')
			return []
		}

		// Check if response starts with "An error" or similar error message
		if (text.toLowerCase().startsWith('an error') || text.toLowerCase().includes('error')) {
			console.error('Awards API returned error message:', text)
			return []
		}

		const data: AwardsResponse = JSON.parse(text)
		const { awards } = data

		console.log('getAwards', awards)

		return awards
	} catch (e) {
		console.error('Awards API fetch error:', e)
		return []
	}
}

export default async function Awards() {
	let awards: Award[] = []

	try {
		awards = await getAwards()
	} catch (e) {
		console.error('Error in Awards component:', e)
		return null
	}

	// console.log('Awards.awards', awards)

	if (!awards || !awards.length) {
		return null
	}

	return (
		<div className="flex flex-row flex-wrap justify-center flex-1 gap-2 gap-y-0.5 items-center">
			{awards.map(award =>
				award.linkUrl ? (
					<Link
						title="Goodpods Award"
						key={award.linkUrl}
						href={award.linkUrl}
						target="_blank"
						className={`flex flex-col items-center`} /*aria-label={award.name}*/
					>
						<Image src={award.imageUrl} alt="" width={award.imageWidth} height={award.imageHeight} />
					</Link>
				) : (
					<div key={award.linkUrl} className={`flex flex-col items-center`}>
						<Image src={award.imageUrl} alt="" width={award.imageWidth} height={award.imageHeight} />
					</div>
				)
			)}
		</div>
	)
}
