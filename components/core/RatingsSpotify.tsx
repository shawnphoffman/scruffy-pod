import { faStarSharp } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getSpotifyReviews } from '@/app/actions'

export default async function RatingsSpotify() {
	try {
		const spotifyData = await getSpotifyReviews()

		if (!spotifyData || !spotifyData.rating) return null

		return (
			<a
				className="flex flex-row items-center px-2 py-1 text-xs font-bold leading-normal text-white rounded-lg whitespace-nowrap bg-spotify"
				href={spotifyData.url || ''}
				target="_blank"
				rel="noopener noreferrer"
			>
				<div>{spotifyData.rating.toFixed(1)}</div>
				<FontAwesomeIcon icon={faStarSharp} size="sm" className="mx-0.5" />
				<div>on Spotify</div>
			</a>
		)
	} catch (error) {
		console.error('Error rendering Spotify ratings:', error)
		return null
	}
}
