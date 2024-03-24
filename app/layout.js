import 'app/global.css'
import 'app/stars.css'
import '@shawnphoffman/pod-sites-common/index.css'

import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import Image from 'next/image'

// import titleSvg2 from 'app/title_grouped.svg'
// import titleSvg from 'app/title_single.svg'
import titleLogo from 'app/title.png'
import ActiveLink from 'components/ActiveLink'
import StarBackground from 'components/StarBackground'

export const metadata = {
	title: `Scruffy Lookin' Podcasters`,
	description:
		'A stuck-up, half-witted, Star Wars Podcast. 4 scruffy dudes on a weekly podcast covering Star Wars news and speculation. Hosts and avid Star Wars fans James Hebert, Kev Garbett, Chris Hall, and Ed Bosshart discuss Star Wars movies, shows, news, books, and more from their perspectives and have loads of fun doing it. Mature Content.',
	metadataBase: 'https://scruffypod.com',
	openGraph: {
		title: `Scruffy Lookin' Podcasters`,
		description:
			'A stuck-up, half-witted, Star Wars Podcast. 4 scruffy dudes on a weekly podcast covering Star Wars news and speculation. Hosts and avid Star Wars fans James Hebert, Kev Garbett, Chris Hall, and Ed Bosshart discuss Star Wars movies, shows, news, books, and more from their perspectives and have loads of fun doing it. Mature Content.',
		url: 'https://scruffypod.com',
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<head>
				<script src="https://kit.fontawesome.com/d7ccc5bb1a.js" crossOrigin="anonymous" async defer></script>
				<meta name="apple-itunes-app" content="app-id=1726695035" />
			</head>
			<body>
				<StarBackground />
				<div className="scroller">
					<div className="wrapper">
						<div className="page">
							<div className="header">
								<Image className="headerLogo" alt="Scruffy Lookin' Podcasters" src={titleLogo} width={410} priority />
								{/* <Image src={titleSvg} alt="Scruffy Lookin' Podcasters" width={400} priority unoptimized className="headerLogo" /> */}
								{/* <Image src={titleSvg2} alt="Scruffy Lookin' Podcasters" width={410} priority unoptimized className="headerLogo" /> */}
								<div className="navContainer">
									<ActiveLink href="/" label="Links" />
									<ActiveLink href="/episodes" label="Episodes" />
									<ActiveLink href="/listen-now" label="Listen Now" />
								</div>
							</div>
							<div className="pageDetails">{children}</div>
						</div>
					</div>
				</div>
				<Analytics />
			</body>
		</html>
	)
}
