import { Suspense } from 'react'

import LinkCard from '@/components/LinkCard'
import RatingsApple from '@/components/RatingsApple'
import RatingsSpotify from '@/components/RatingsSpotify'
import Reviews from '@/components/Reviews'

import items from './links'

export default async function Home() {
	return (
		<>
			<div className="pageDescription">
				If you want Star Wars news... Google it! If you want two yanks and two brits sharing their life adventures and weekly shenanigans,
				whilst jumping into all things from a galaxy far far away, then this maybe the pod you&apos;re looking for.
				<br />
			</div>
			<blockquote className="quote">
				<span>&quot;I&apos;ve never made it till the end&quot;</span>
				<span>Josh Chapman – a proper Star Wars podcaster</span>
			</blockquote>
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
