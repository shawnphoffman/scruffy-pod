/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./sanity/**/*.{js,ts,jsx,tsx,mdx}',
		'./utils/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				squiggle: "url('/squiggle.svg')",
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: 0 },
					'100%': { transform: 1 },
				},
			},
			animation: {
				fadeInUp: '0.5s fadeInUp',
			},
			backgroundColor: {
				applepodcasts: '#872ec4',
				spotify: '#16883e',
				twitter: '#0d7ac4',
				teepublic: '#374ecd',
				overcast: '#be5a01',
				youtube: '#ee0000',
				googlepodcasts: '#206ff2',
				goodpods: '#fcdb00',
				amazonmusic: '#0077c1',
				iheart: '#c6002b',
				pocketcasts: '#ea150d',
				castbox: '#db3c0e',
				zencastr: '#1474e0',
				rss: '#ce4a0c',
				facebook: '#0866ff',
				bluesky: '#0560ff',
				instagram: '#c13584',
				etsy: '#f56400',
				radiopublic: '#ce262f',
				podbean: '#5f7e1b',
				googlepodcasts: '#206ff2',
				email: '#52565e',
			},
		},
	},
	plugins: [],
}
