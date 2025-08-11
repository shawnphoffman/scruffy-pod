import { NextResponse } from 'next/server'

export async function GET() {
	const apis = [
		{
			name: 'Apple Podcasts',
			url: 'https://api.shawn.party/api/pod-data/apple?url=https://podcasts.apple.com/us/podcast/id1272718319?see-all=reviews',
		},
		{
			name: 'Spotify',
			url: 'https://api.shawn.party/api/pod-data/spotify-scrape?url=https://open.spotify.com/show/0smXt1crilKFVJg3RubFPK',
		},
		{
			name: 'Goodpods',
			url: 'https://api.shawn.party/api/pod-data/goodpods?url=https://goodpods.com/podcasts/scruffy-looking-podcasters-a-star-wars-podcast-318983',
		},
		{
			name: 'Awards',
			url: 'https://api.shawn.party/api/pod-data/goodpods-scrape?url=https://goodpods.com/podcasts/scruffy-looking-podcasters-a-star-wars-podcast-318983',
		},
	]

	const results = await Promise.allSettled(
		apis.map(async api => {
			try {
				const controller = new AbortController()
				const timeoutId = setTimeout(() => controller.abort(), 10000)

				const response = await fetch(api.url, {
					signal: controller.signal,
				})

				clearTimeout(timeoutId)

				if (!response.ok) {
					return {
						name: api.name,
						status: 'error',
						statusCode: response.status,
						statusText: response.statusText,
					}
				}

				const text = await response.text()
				if (text.toLowerCase().includes('error')) {
					return {
						name: api.name,
						status: 'error',
						message: 'API returned error message',
						response: text.substring(0, 100),
					}
				}

				return {
					name: api.name,
					status: 'healthy',
					statusCode: response.status,
				}
			} catch (error) {
				return {
					name: api.name,
					status: 'error',
					message: error instanceof Error ? error.message : 'Unknown error',
				}
			}
		})
	)

	const healthy = results.filter(result => result.status === 'fulfilled' && result.value.status === 'healthy').length

	const total = results.length

	return NextResponse.json({
		overall: {
			status: healthy === total ? 'healthy' : 'degraded',
			healthy,
			total,
		},
		apis: results.map(result =>
			result.status === 'fulfilled' ? result.value : { name: 'Unknown', status: 'error', message: 'Promise rejected' }
		),
		timestamp: new Date().toISOString(),
	})
}
