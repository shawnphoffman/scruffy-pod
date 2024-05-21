import '@/app/(pages)/pages.css'

// BRANDS
import { faAmazon, faBluesky, faSpotify, faYoutube } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/brands'
// CLASSIC - SOLID
import {
	faAt,
	faPodcast,
	faSpaceStationMoonConstruction,
	faSquareRss,
	faStar,
	faStarSharp,
} from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
// DUO - SOLID
import { faStar as faStarDuo } from '@awesome.me/kit-d7ccc5bb1a/icons/duotone/solid'
// CUSTOM
import {
	faGoodpods,
	faOvercast,
	faPocketCasts,
	faRadioPublic,
	faYoutubeMusic,
	faZencastr,
} from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { library } from '@fortawesome/fontawesome-svg-core'
import Image from 'next/image'

import headerImage from '@/app/title.png'
import ActiveLink from '@/components/core/ActiveLink'
import StarBackground from '@/components/core/StarBackground'

library.add([
	faStarSharp,
	faStar,
	faStarDuo,
	faSpaceStationMoonConstruction,
	faAt,
	faPodcast,
	faSquareRss,
	faAmazon,
	faBluesky,
	faSpotify,
	faYoutube,
	faGoodpods,
	faOvercast,
	faPocketCasts,
	faRadioPublic,
	faYoutubeMusic,
	faZencastr,
])

export default function PageLayout({ children }) {
	return (
		<>
			<StarBackground />
			<div className="w-full px-2 py-0 mx-auto overflow-scroll h-dvh">
				<div className="flex flex-col items-center w-full max-w-screen-xl mx-auto">
					<div className="flex flex-col w-full max-w-4xl min-h-dvh">
						<div className="flex flex-col items-center m-4 text-center">
							{/* IMAGE */}
							<Image className="w-52 lg:w-72" alt="Scruffy Lookin' Podcasters" src={headerImage} width={300} height={300} priority />
							{/* NAV */}
							<div className="flex flex-row flex-wrap justify-center gap-4">
								<ActiveLink href="/" label="Links" />
								<ActiveLink href="/episodes" label="Episodes" />
								<ActiveLink href="/updates" label="Updates" />
								<ActiveLink href="/listen-now" label="Listen Now" />
							</div>
						</div>
						<div className="flex flex-col items-center flex-1 gap-4 text-center">{children}</div>
					</div>
				</div>
			</div>
		</>
	)
}
