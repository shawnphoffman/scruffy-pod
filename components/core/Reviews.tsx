import { getAppleReviews } from '@/app/actions'

import Stars from './Stars'

type Review = {
	title: string
	author: string
	stars: string
	text: string
}

export default async function Reviews() {
	const { reviews } = await getAppleReviews()

	if (!reviews) return null

	const filteredReviews = reviews.reduce((memo, acc) => {
		if (acc.stars !== '5' && !!process.env.VERCEL_URL) {
			return memo
		}
		memo.push(acc)
		return memo
	}, [])

	if (!filteredReviews || !filteredReviews.length) return null

	return (
		<>
			<div className="text-xl font-bold ">Recent Reviews</div>
			<div className="flex flex-col w-full px-2 mb-8 divide-y rounded-lg bg-zinc-950/75 divide-sky-500">
				{filteredReviews.map((r: Review) => (
					<div className="flex flex-col justify-start w-full p-2 text-left" key={r.title}>
						<div className="flex flex-row items-center justify-between">
							<div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center text-sky-400">
								<div className="font-bold">{`"${r.title}"`}</div>
								<div className="text-base italic"> - {r.author}</div>
							</div>
							<Stars count={r.stars} />
						</div>
						<div className="py-2">{r.text}</div>
					</div>
				))}
			</div>
		</>
	)
}
