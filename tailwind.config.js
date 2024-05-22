const plugin = require('tailwindcss/plugin')

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
				// brand1: '#3b82f6',
				brand1: '#60a5fa',
				brand2: '#fede00',
				brand3: 'hsl(180, 100%, 7%)',
				brand4: '#242424',
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
	plugins: [
		plugin(function ({ addComponents, theme }) {
			addComponents({
				'.link': {
					backgroundImage: `linear-gradient(to right, ${theme('colors.brand2')}, ${theme('colors.brand2')} 50%, ${theme(
						'colors.brand1'
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
						background: theme('colors.brand2'),
					},
					'&:hover::before': {
						width: '100%',
					},
					'&.text-white': {
						backgroundImage: `linear-gradient(to right, ${theme('colors.brand2')}, ${theme('colors.brand2')} 50%, ${theme(
							'colors.white'
						)} 50%)`,
					},
				},
			})
		}),
	],
}

// @layer components {
// 	.link {
// 		@apply bg-[linear-gradient(to_right,#fede00,#fede00_50%,#60a5fa_50%)] bg-[size:200%_100%] bg-[position:-100%] inline-block relative transition-all duration-[0.2s] ease-[ease-in-out] bg-clip-text;
// 		-webkit-text-fill-color: transparent;
// 		/* Hover */
// 		@apply hover:bg-[0];
// 		/* Before */
// 		@apply before:bg-brand2 before:content-[''] before:block before:absolute before:bottom-[-3px] before:w-0 before:h-[3px] before:transition-all before:duration-[0.2s] before:ease-[ease-in-out] before:left-0;
// 		/* Hover Before */
// 		@apply hover:before:w-full;
// 	}
// }
