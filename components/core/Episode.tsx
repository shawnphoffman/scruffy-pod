import Image from 'next/image'

import EpisodeSummary from './EpisodeSummary'

const options = { year: 'numeric', month: 'long', day: 'numeric' } as const

export default function Episodes({ episode }) {
	const pubDate = new Date(episode.pubDate).toLocaleDateString('en-US', options)
	return (
		<div className="flex flex-col justify-start w-full py-4 text-sm text-left">
			<h2 className="mb-2 text-2xl font-bold text-center text-red-600 md:mb-4">{episode.title}</h2>
			<div className="flex flex-col items-center justify-start gap-4 md:flex-row md:items-start">
				<Image src={episode.imgSrc} alt={episode.title} className="w-32 rounded md:w-48 h-fit aspect-square" width={192} height={192} />
				<div className="flex flex-col self-stretch overflow-hidden whitespace-break-spaces text-wrap text-ellipsis">
					<div className="mb-2 text-xs text-white/75">Posted: {pubDate}</div>
					<div className="[&_a]:text-sky-400 mb-1 [&_a]:pb-0.5 [&_a]:font-bold [&_a:hover]:text-yellow-400 [&_a:hover]:bg-squiggle [&_a]:break-words">
						<EpisodeSummary summary={episode.summary} />
					</div>
					<div className="flex items-end flex-1">
						<a
							className="inline-block text-base font-bold text-sky-400 hover:text-yellow-400 hover:bg-squiggle"
							target="_blank"
							href={episode.link ? episode.link : 'https://zencastr.com/Just-Shillin'}
						>
							Episode Link
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
