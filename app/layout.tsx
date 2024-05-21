import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { GeistSans } from 'geist/font/sans'

const title = `Scruffy Lookin' Podcasters`
const description = `If you want Star Wars news... Google it! If you want two yanks and two brits sharing their life adventures and weekly shenanigans, whilst jumping into all things from a galaxy far far away, then this maybe the pod you're looking for.`
const url = 'https://scruffypod.com'

export const metadata = {
	title: {
		template: `%s | ${title}`,
		default: title,
	},
	description,
	metadataBase: url,
	openGraph: {
		title: {
			template: `%s | ${title}`,
			default: title,
		},
		description,
		siteName: title,
		url: url,
		locale: 'en_US',
		type: 'website',
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<head>
				<meta name="apple-itunes-app" content="app-id=1272718319" />
			</head>
			<body>{children}</body>
		</html>
	)
}
