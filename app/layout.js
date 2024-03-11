import 'app/global.css'
import 'app/stars.css'

import { GeistSans } from 'geist/font/sans'
import Image from 'next/image'

import titleSvg from 'app/title.svg'
import ActiveLink from 'components/ActiveLink'
import StarBackground from 'components/StarBackground'

export const metadata = {
	title: `Just Shillin Positive Podcasting`,
	description:
		'Join Andy and Shawn for a casual and light-hearted podcast experience. Discover what happens when two friends come together to share their love for the things that make life awesome',
	metadataBase: 'https://justshillin.com',
	openGraph: {
		title: `Just Shillin - Positive Podcasting`,
		description:
			'Join Andy and Shawn for a casual and light-hearted podcast experience. Discover what happens when two friends come together to share their love for the things that make life awesome',
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
								{/* <Image className="headerLogo" alt="Just Shillin'" src={titleLogo} width={292} height={139} priority /> */}
								<Image src={titleSvg} alt="Just Shillin'" priority unoptimized className="headerLogo" />
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
