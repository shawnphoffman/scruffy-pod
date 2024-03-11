export const spotifyId = '0smXt1crilKFVJg3RubFPK'
export const spotifyUrl = `https://open.spotify.com/show/${spotifyId}`
export const applePodcastId = '1272718319'
export const applePodcastUrl = `https://podcasts.apple.com/us/podcast/id${applePodcastId}`
export const appleRatingUrl = `${applePodcastUrl}?see-all=reviews`
export const rssFeedUrl = 'https://feed.podbean.com/scruffypodcasters/feed.xml'

export const podbeanUrl = 'https://scruffypodcasters.podbean.com'

const items = [
	// {
	// 	title: 'Twitter',
	// 	href: 'https://twitter.com/JTComlink',
	// 	icon: 'fa-brands fa-twitter',
	// 	background: '#0d7ac4',
	// },
	// {
	// 	title: 'Twitter - Rik',
	// 	href: 'https://twitter.com/cadbanesbounty',
	// 	icon: 'fa-brands fa-twitter',
	// 	background: '#0d7ac4',
	// },
	{
		title: 'Apple Podcasts',
		href: applePodcastUrl,
		icon: 'fa-solid fa-podcast',
		background: 'var(--applePodcasts)',
	},
	{
		title: 'Spotify',
		href: spotifyUrl,
		icon: 'fa-brands fa-spotify',
		background: 'var(--spotify)',
	},
	// {
	// 	title: 'Email',
	// 	href: 'mailto:feedback@justshillin.com',
	// 	icon: 'fa-solid fa-at',
	// 	background: '#52565e',
	// },
	// {
	// 	title: 'TeePublic',
	// 	href: 'https://www.teepublic.com/user/jammed-transmissions',
	// 	icon: 'fak fa-teepublic',
	// 	background: '#374ECD',
	// },
	{
		title: 'Overcast',
		href: `https://overcast.fm/itunes${applePodcastId}`,
		icon: 'fak fa-overcast fa-lg',
		background: '#be5a01',
	},
	// {
	// 	title: 'YouTube',
	// 	href: 'https://www.youtube.com/@JustShillin',
	// 	icon: 'fa-brands fa-youtube',
	// 	background: 'rgb(238 0 0)',
	// },
	{
		title: 'PodBean',
		href: podbeanUrl,
		icon: 'fa-solid fa-coffee-beans',
		background: 'hsl(79 65% 30% / 1)',
	},
	// {
	// 	title: 'Google Podcasts',
	// 	href: 'https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy56ZW5jYXN0ci5jb20vZi9sNWJteTZ3bS5yc3M',
	// 	icon: 'fa-brands fa-google-play',
	// 	background: '#206ff2',
	// },
	// {
	// 	title: 'Goodpods',
	// 	href: 'https://goodpods.com/podcasts/just-shillin-303749',
	// 	icon: 'fak fa-goodpods',
	// 	background: '#fcdb00',
	// 	color: 'var(--bg)',
	// },
	// {
	// 	title: 'Amazon Music',
	// 	href: 'https://music.amazon.com/podcasts/41b5996a-f09d-4657-991f-d495150756f3/just-shillin',
	// 	icon: 'fa-brands fa-amazon',
	// 	background: '#0077c1',
	// },
	// {
	// 	title: 'iHeart',
	// 	href: 'https://www.iheart.com/podcast/338-jammed-transmissions-a-sta-102467606/',
	// 	icon: 'fak fa-iheart',
	// 	background: '#C6002B',
	// },
	// {
	// 	title: 'Pocket Casts',
	// 	href: 'https://pca.st/74wq5erg',
	// 	icon: 'fak fa-pocket-casts',
	// 	background: '#ea150d',
	// },
	// {
	// 	title: 'Radio Public',
	// 	href: 'https://radiopublic.com/just-shillin-6pQpmN',
	// 	icon: 'fak fa-radio-public',
	// 	background: '#CE262F',
	// },
	// {
	// 	title: 'Castbox',
	// 	href: 'https://castbox.fm/podcasts/Jammed%20Transmissions:%20A%20Star%20Wars%20Podcast',
	// 	icon: 'fak fa-castbox',
	// 	background: '#db3c0e',
	// },
	// {
	// 	title: 'Zencastr',
	// 	href: 'https://zencastr.com/Just-Shillin',
	// 	icon: 'fak fa-zencastr',
	// 	background: 'hwb(212 8% 12%)',
	// },
	{
		title: 'RSS',
		href: rssFeedUrl,
		icon: 'fa-solid fa-square-rss',
		background: '#ce4a0c',
	},
	// {
	// 	title: 'Bluesky Feed',
	// 	href: 'https://bsky.app/profile/did:plc:q7ul4lz2j3d6qtcjzvz4rrjh/feed/shawnbot-pods',
	// 	icon: 'fa-solid fa-clouds',
	// 	background: '#0560ff',
	// },

	{
		title: 'Chris Hall - IG',
		href: 'https://www.instagram.com/chrishallillustration',
		icon: 'fa-brands fa-instagram',
		background: '#c13584',
	},
	{
		title: 'Chris Hall - Etsy',
		href: 'https://www.etsy.com/uk/shop/BlackSheepRebellion',
		icon: 'fa-brands fa-etsy',
		background: '#F56400',
	},
]

export default items
