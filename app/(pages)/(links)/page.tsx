import { faStarSharp } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { RatingsApple, RatingsGoodpods, RatingsSpotify } from '@shawnphoffman/pod-sites-shared/ratings'
import { Suspense } from 'react'

import ErrorBoundary from '@/components/core/ErrorBoundary'
import LinkCard from '@/components/core/LinkCard'
import Loading from '@/components/core/Loading'
import Reviews from '@/components/core/Reviews'

import { getAppleReviews, getSpotifyReviews } from '@/app/actions'

import items, { appleRatingUrl, goodpodsUrl, spotifyUrl } from './links'

// // Force dynamic rendering to prevent build-time API call issues
// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default async function Home() {
	return (
		<ErrorBoundary>
			<div className="w-full max-w-3xl p-4 text-base leading-normal border rounded-lg sm:text-lg border-brand-border bg-brand-background-transparent">
				If you want Star Wars news... Google it! If you want two yanks and two brits sharing their life adventures and weekly shenanigans,
				whilst jumping into all things from a galaxy far far away, then this maybe the pod you&apos;re looking for.
			</div>
			{/*  */}
			<blockquote className="bg-brand-background-transparent w-fit px-8 py-2 mx-auto border-4 border-brand-yellow rounded-lg flex flex-col gap-1.5">
				<span className="text-lg font-bold leading-tight">&quot;I&apos;ve never made it till the end&quot;</span>
				<span className="w-full text-sm italic text-white/75">Josh Chapman – a proper Star Wars podcaster</span>
			</blockquote>
			{/*  */}
			<div className="flex flex-row flex-wrap items-center justify-center gap-2">
				<Suspense>
					<RatingsApple appleRatingUrl={appleRatingUrl} getReviews={getAppleReviews} starIcon={faStarSharp} />
					<RatingsGoodpods goodpodsUrl={goodpodsUrl} starIcon={faStarSharp} />
					<RatingsSpotify spotifyUrl={spotifyUrl} getReviews={getSpotifyReviews} starIcon={faStarSharp} />
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

			{/* <Suspense>
				<Awards />
			</Suspense> */}

			<div className="flex flex-row flex-wrap justify-center w-full">
				<Suspense fallback={<Loading />}>
					<Reviews />
				</Suspense>
			</div>
		</ErrorBoundary>
	)
}
