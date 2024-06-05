import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/app/(pages)/icons'

import { GeistSans } from 'geist/font/sans'
import Image from 'next/image'

import { siteDescription as description, siteTitle, siteUrl as url } from '@/app/meta'
import headerImage from '@/app/title.png'
import ActiveLink from '@/components/core/ActiveLink'
import StarBackground from '@/components/core/StarBackground'

export const metadata = {
	title: {
		template: `%s | ${siteTitle}`,
		default: siteTitle,
	},
	description,
	metadataBase: url,
	openGraph: {
		title: {
			template: `%s | ${siteTitle}`,
			default: siteTitle,
		},
		description,
		siteName: siteTitle,
		url: url,
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${GeistSans.className} bg-black h-full p-0 m-0 overflow-x-hidden w-dvw`}>
			<head>
				<meta name="apple-itunes-app" content="app-id=1272718319" />
			</head>
			<body className="px-2 py-0 mx-auto my-0 text-white min-h-dvh w-dvw">
				<StarBackground />
				<div className="flex flex-col items-center w-full max-w-screen-xl mx-auto">
					<div className="flex flex-col w-full max-w-4xl min-h-dvh">
						<div className="flex flex-col items-center m-4 mb-2 text-center">
							<h1 className="sr-only">{siteTitle}</h1>
							{/* IMAGE */}
							<Image className="w-[410px]" alt="Scruffy Lookin' Podcasters" src={headerImage} width={410} priority />
							{/* NAV */}
							<nav className="flex flex-row flex-wrap justify-center gap-4 mt-4 gap-y-1">
								<ActiveLink href="/" label="Links" />
								<ActiveLink href="/episodes" label="Episodes" />
								<ActiveLink href="/updates" label="Updates" fuzzy />
								<ActiveLink href="/listen-now" label="Listen Now" />
							</nav>
						</div>
						<main className="flex flex-col items-center flex-1 gap-4 text-center">{children}</main>
					</div>
				</div>
			</body>
		</html>
	)
}
