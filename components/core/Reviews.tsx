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
		<div className="border-brand2 border-4 rounded-2xl p-0 mb-4">
			<div className="text-xl font-bold bg-brand2 text-black pb-2">Recent Reviews</div>
			{filteredReviews.map((r: Review) => (
				<div key={r.title} className="flex flex-col p-2 justify-start text-left text-sm m-2 rounded-lg bg-neutral-500/25">
					<div className="flex flex-row items-center justify-between">
						<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
							<div className="font-bold text-brand2">{`"${r.title}"`}</div>
							<div className="text-xs text-brand1 italic"> {r.author}</div>
						</div>
						<Stars count={r.stars} />
					</div>
					<div className="py-2 text-xs leading-normal p-2">{r.text}</div>
				</div>
			))}
		</div>
	)
}
