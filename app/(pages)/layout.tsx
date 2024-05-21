import '@/app/(pages)/pages.css'

import './icons'

import Image from 'next/image'

import headerImage from '@/app/title.png'
import ActiveLink from '@/components/core/ActiveLink'
import StarBackground from '@/components/core/StarBackground'

export default function PageLayout({ children }) {
	return (
		<>
			<StarBackground />
			<div className="w-full px-2 py-0 mx-auto overflow-scroll h-dvh">
				<div className="flex flex-col items-center w-full max-w-screen-xl mx-auto">
					<div className="flex flex-col w-full max-w-4xl min-h-dvh">
						<div className="flex flex-col items-center m-4 text-center">
							{/* IMAGE */}
							<Image className="w-[410px]" alt="Scruffy Lookin' Podcasters" src={headerImage} width={410} priority />
							{/* NAV */}
							<div className="flex flex-row flex-wrap justify-center gap-4 mt-4">
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
