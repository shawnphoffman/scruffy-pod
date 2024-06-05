import '@/app/global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { GeistSans } from 'geist/font/sans'

import { siteDescription as description, siteTitle as title, siteUrl as url } from '@/app/meta'

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
		<html lang="en" className={`${GeistSans.className} bg-black h-full p-0 m-0 w-dvw`}>
			<head>
				<meta name="apple-itunes-app" content="app-id=1272718319" />
			</head>
			<body className="h-full p-0 m-0 w-dvw">{children}</body>
		</html>
	)
}
