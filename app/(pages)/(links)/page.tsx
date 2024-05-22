import { Suspense } from 'react'

import items from './links'

import LinkCard from '@/components/core/LinkCard'
import Loading from '@/components/core/Loading'
import RatingsApple from '@/components/core/RatingsApple'
import RatingsSpotify from '@/components/core/RatingsSpotify'
import Reviews from '@/components/core/Reviews'

export default async function Home() {
	return (
		<>
			<div className="w-full max-w-3xl text-base leading-normal sm:text-lg p-4 border rounded-lg border-neutral-900 bg-neutral-950/75">
				If you want Star Wars news... Google it! If you want two yanks and two brits sharing their life adventures and weekly shenanigans,
				whilst jumping into all things from a galaxy far far away, then this maybe the pod you&apos;re looking for.
			</div>
			{/*  */}
			<blockquote className="bg-neutral-950/75 w-fit px-8 py-2 mx-auto border-4 border-brand2 rounded-lg flex flex-col gap-1.5">
				<span className="font-bold text-lg leading-tight">&quot;I&apos;ve never made it till the end&quot;</span>
				<span className="italic w-full text-white/75 text-sm">Josh Chapman – a proper Star Wars podcaster</span>
			</blockquote>
			{/*  */}
			<div className="flex flex-row flex-wrap items-center justify-center gap-2">
				<Suspense>
					<RatingsApple />
					<RatingsSpotify />
				</Suspense>
			</div>
			{/*  */}
			<div className="flex flex-row flex-wrap justify-center w-full gap-4">
				{items.map(item => {
					return (
						<LinkCard
							key={item.title}
							title={item.title}
							link={item.href}
							icon={item.icon}
							bg={item.background}
							// color={item.color}
						></LinkCard>
					)
				})}
			</div>

			<div className="flex flex-row flex-wrap justify-center w-full">
				<Suspense fallback={<Loading />}>
					<Reviews />
				</Suspense>
			</div>
		</>
	)
}
