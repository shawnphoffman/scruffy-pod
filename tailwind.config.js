import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

const podSitesColors = {
	amazonmusic: '#0077c1',
	applepodcasts: '#872ec4',
	bluesky: '#0560ff',
	castbox: '#db3c0e',
	discord: '#5865F2',
	email: '#52565e',
	etsy: '#f56400',
	facebook: '#0866ff',
	goodpods: '#fcdb00',
	googlepodcasts: '#206ff2',
	iheart: '#c6002b',
	instagram: '#c13584',
	overcast: '#be5a01',
	patreon: '#d93b26',
	pocketcasts: '#ea150d',
	podbean: '#5f7e1b',
	radiopublic: '#ce262f',
	rss: '#ce4a0c',
	spotify: '#16883e',
	teepublic: '#374ecd',
	threads: '#222',
	tiktok: '#eb004a',
	twitch: '#9146ff',
	twitter: '#0d7ac4',
	youtube: '#ee0000',
	zencastr: '#1474e0',
}


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
			colors: {
				...podSitesColors,
				brand: {
					yellow: colors.yellow['400'],
					blue: colors.blue['400'],
					background: {
						solid: colors.neutral['950'],
						transparent: `color-mix(in oklch, transparent, ${colors.neutral['950']} 75%)`,
					},
					border: colors.neutral['900'],
				},
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
		},
	},
	plugins: [
		plugin(function ({ addComponents, theme }) {
			addComponents({
				'.link': {
					backgroundImage: `linear-gradient(to right, ${theme('colors.brand.yellow')}, ${theme('colors.brand.yellow')} 50%, ${theme(
						'colors.brand.blue'
					)} 50%)`,
					backgroundSize: '200% 100%',
					backgroundPosition: '-100%',
					display: 'inline-block',
					position: 'relative',
					transition: 'all 0.2s ease-in-out',
					backgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					'&:hover': {
						backgroundPosition: '0',
					},
					'&::before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						bottom: '0px',
						width: '0',
						height: '3px',
						transition: 'all 0.2s ease-in-out',
						left: '0',
						background: theme('colors.brand.yellow'),
					},
					'&:hover::before': {
						width: '100%',
					},
					'&.text-white': {
						backgroundImage: `linear-gradient(to right, ${theme('colors.brand.yellow')}, ${theme('colors.brand.yellow')} 50%, ${theme(
							'colors.white'
						)} 50%)`,
					},
				},
			})
		}),
	],
}
