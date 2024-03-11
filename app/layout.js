import 'app/global.css'
import 'app/stars.css'

import { GeistSans } from 'geist/font/sans'
import Image from 'next/image'

// import titleSvg from 'app/title.svg'
import titleLogo from 'app/icon.webp'
import ActiveLink from 'components/ActiveLink'
import StarBackground from 'components/StarBackground'

export const metadata = {
	title: `Scruffy Lookin' Podcasters`,
	description: 'TODO',
	metadataBase: 'https://justshillin.com',
	openGraph: {
		title: `Scruffy Lookin' Podcasters`,
		description: 'TODO',
		url: 'https://justshillin.com',
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
								<Image className="headerLogo" alt="Scruffy Lookin' Podcasters" src={titleLogo} width={320} height={320} priority />
								{/* <Image src={titleSvg} alt="Scruffy Lookin' Podcasters" priority unoptimized className="headerLogo" /> */}
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
			</body>
		</html>
	)
}
