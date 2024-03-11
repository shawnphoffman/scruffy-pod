import { Suspense } from 'react'

import LinkCard from 'components/LinkCard'
import RatingsApple from 'components/RatingsApple'
import RatingsSpotify from 'components/RatingsSpotify'
import Reviews from 'components/Reviews'

import items from './links'

export default async function Home() {
	return (
		<>
			<div className="pageDescription">
				A stuck-up, half-witted, Star Wars Podcast. 4 scruffy dudes on a weekly podcast covering Star Wars news and speculation. Hosts and
				avid Star Wars fans James Hebert, Kev Garbett, Chris Hall, and Ed Bosshart discuss Star Wars movies, shows, news, books, and more
				from their perspectives and have loads of fun doing it. Mature Content.
			</div>
			<div className="ratingsWrapper">
				<Suspense>
					<RatingsApple />
					<RatingsSpotify />
				</Suspense>
			</div>
			<div className="pageRow">
				{items.map(item => {
					return (
						<LinkCard
							key={item.title}
							title={item.title}
							link={item.href}
							icon={item.icon}
							bg={item.background}
							color={item.color}
						></LinkCard>
					)
				})}
			</div>

			<div className="pageRow">
				<Suspense>
					<Reviews />
				</Suspense>
			</div>
		</>
	)
}
