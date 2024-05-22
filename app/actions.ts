'use server'

import { XMLParser } from 'fast-xml-parser'

import { appleRatingUrl, rssFeedUrl, spotifyUrl } from './(pages)/(links)/links'

export async function getAppleReviews() {
	try {
		const res = await fetch(`https://api.shawn.party/api/pod-data/apple?url=${appleRatingUrl}`, {
			next: { revalidate: 60 * 60 * 1 },
		})
		const data = await res.json()
		const { rating, ratingsUrl, reviews } = data

		return {
			appleRating: rating,
			appleRatingUrl: ratingsUrl,
			reviews,
		}
	} catch (e) {
		console.error(e)
		return {}
	}
}

export async function getSpotifyReviews() {
	try {
		const res = await fetch(`https://api.shawn.party/api/pod-data/spotify?url=${spotifyUrl}`, {
			next: { revalidate: 60 * 60 * 1 },
		})
		const data = await res.json()
		return data
	} catch {
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
		const res = await fetch(rssFeedUrl, {
			next: { revalidate: 60 * 60 * 1 },
		})
		const xml = await res.text()
		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		})
		const parsed = parser.parse(xml)
		const feedImg = parsed.rss.channel.image.url
		const episodes = parsed.rss.channel.item.map(ep => {
			// console.log(ep)
			const imgSrc = ep['itunes:image'] ? ep['itunes:image']['@_href'] : feedImg
			return {
				guid: ep.guid['#text'],
				title: ep.title,
				imgSrc,
				summary: cleanEpisodeSummary(ep['itunes:summary']),
				link: ep.link,
				pubDate: ep.pubDate,
			}
		})
		return {
			episodes,
		}
	} catch (error) {
		console.log(error)
		return {}
	}
}
