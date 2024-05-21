import { faArrowRight } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center max-w-2xl gap-8 p-4 mx-auto text-white h-dvh w-dvw">
			<div className="flex flex-col w-full gap-2">
				<h1 className="text-6xl font-bold text-brand2">Uh oh...</h1>
				<h2 className="text-xl text-white/80">These aren&apos;t the droids you&apos;re looking for...</h2>
				<Link
					href="/"
					className="flex flex-row items-center justify-center gap-2 text-2xl font-bold group hover:text-brand2 text-brand1 w-fit"
				>
					<span className="group-hover:bg-squiggle">Return to safety</span>
					<FontAwesomeIcon icon={faArrowRight} />
				</Link>
			</div>
		</div>
	)
}
