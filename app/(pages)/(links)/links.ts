import { faFacebook, faSpotify, faXTwitter } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/brands'
import { faAt, faCoffeeBeans, faRssSquare } from '@awesome.me/kit-d7ccc5bb1a/icons/classic/solid'
import { faPodcast } from '@awesome.me/kit-d7ccc5bb1a/icons/duotone/solid'
import { faTeepublic } from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export const spotifyId = '0smXt1crilKFVJg3RubFPK'
export const spotifyUrl = `https://open.spotify.com/show/${spotifyId}`
export const applePodcastId = '1272718319'
export const applePodcastUrl = `https://podcasts.apple.com/us/podcast/id${applePodcastId}`
export const appleRatingUrl = `${applePodcastUrl}?see-all=reviews`
export const rssFeedUrl = 'https://feed.podbean.com/scruffypodcasters/feed.xml'
export const goodpodsUrl = 'https://goodpods.com/podcasts/scruffy-looking-podcasters-a-star-wars-podcast-318983'
export const podbeanUrl = 'https://scruffypodcasters.podbean.com'

type LinkItem = {
	title: string
	href: string
	icon: IconDefinition
	background: string
	color?: string
}

const items: LinkItem[] = [
	{
		title: 'Apple Podcasts',
		href: applePodcastUrl,
		icon: faPodcast,
		background: 'bg-applepodcasts',
	},
	{
		title: 'Spotify',
		href: spotifyUrl,
		icon: faSpotify,
		background: 'bg-spotify',
	},
	{
		title: 'Email',
		href: 'mailto:scruffypodcasters@gmail.com',
		icon: faAt,
		background: 'bg-email',
	},
	{
		title: 'TeePublic',
		href: 'https://www.teepublic.com/user/scruffylookinpodcasters',
		icon: faTeepublic,
		background: 'bg-teepublic',
	},
	{
		title: 'PodBean',
		href: podbeanUrl,
		icon: faCoffeeBeans,
		background: 'bg-podbean',
	},
	{
		title: 'RSS',
		href: rssFeedUrl,
		icon: faRssSquare,
		background: 'bg-rss',
	},
	{
		title: 'Twitter',
		href: 'https://twitter.com/ScruffyPodcast',
		icon: faXTwitter,
		background: 'bg-twitter',
	},
	{
		title: 'Facebook',
		href: 'https://www.facebook.com/ScruffyPodcasters/',
		icon: faFacebook,
		background: 'bg-facebook',
	},
	// {
	// 	title: 'Overcast',
	// 	href: `https://overcast.fm/itunes${applePodcastId}`,
	// 	icon: 'fak fa-overcast fa-lg',
	// 	background: 'bg-overcast',
	// },
	// {
	// 	title: 'YouTube',
	// 	href: 'https://www.youtube.com/@JustShillin',
	// 	icon: 'fa-brands fa-youtube',
	// 	background: 'bg-youtube',
	// },
	// {
	// 	title: 'Google Podcasts',
	// 	href: 'https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy56ZW5jYXN0ci5jb20vZi9sNWJteTZ3bS5yc3M',
	// 	icon: 'fa-brands fa-google-play',
	// 	background: 'bg-googlepodcasts',
	// },
	// {
	// 	title: 'Goodpods',
	// 	href: 'https://goodpods.com/podcasts/scruffy-looking-podcasters-a-star-wars-podcast-318983',
	// 	icon: 'fak fa-goodpods',
	// 	background: 'bg-goodpods',
	// 	color: 'text-black',
	// },
	// {
	// 	title: 'Amazon Music',
	// 	href: 'https://music.amazon.com/podcasts/7b78aa2a-57db-477e-9ef4-bd13c54b2292/scruffy-looking-podcasters-a-star-wars-podcast',
	// 	icon: 'fa-brands fa-amazon',
	// 	background: 'bg-amazonmusic',
	// },
	// {
	// 	title: 'iHeart',
	// 	href: 'https://www.iheart.com/podcast/338-jammed-transmissions-a-sta-102467606/',
	// 	icon: 'fak fa-iheart',
	// 	background: 'bg-iheart',
	// },
	// {
	// 	title: 'Pocket Casts',
	// 	href: 'https://pca.st/74wq5erg',
	// 	icon: 'fak fa-pocket-casts',
	// 	background: 'bg-pocketcasts',
	// },
	// {
	// 	title: 'Radio Public',
	// 	href: 'https://radiopublic.com/scruffy-looking-podcasters-a-star-69OBjQ',
	// 	icon: 'fak fa-radio-public',
	// 	background: 'bg-radiopublic',
	// },
	// {
	// 	title: 'Castbox',
	// 	href: 'https://castbox.fm/podcasts/Jammed%20Transmissions:%20A%20Star%20Wars%20Podcast',
	// 	icon: 'fak fa-castbox',
	// 	background: 'bg-castbox',
	// },
	// {
	// 	title: 'Zencastr',
	// 	href: 'https://zencastr.com/Just-Shillin',
	// 	icon: 'fak fa-zencastr',
	// 	background: 'bg-zencastr',
	// },
	// {
	// 	title: 'Bluesky Feed',
	// 	href: 'https://bsky.app/profile/did:plc:q7ul4lz2j3d6qtcjzvz4rrjh/feed/shawnbot-pods',
	// 	icon: 'fa-solid fa-clouds',
	// 	background: 'bg-bluesky',
	// },
	// {
	// 	title: 'Chris Art',
	// 	href: 'https://www.instagram.com/chrishallillustration',
	// 	icon: 'fa-brands fa-instagram',
	// 	background: 'bg-instagram',
	// },
	// {
	// 	title: 'Chris Shop',
	// 	href: 'https://www.etsy.com/uk/shop/BlackSheepRebellion',
	// 	icon: 'fa-brands fa-etsy',
	// 	background: 'bg-etsy',
	// },
	// {
	// 	title: 'Ed',
	// 	href: 'https://twitter.com/ScruffyEdB',
	// 	icon: 'fa-brands fa-x-twitter',
	// 	background: 'bg-twitter',
	// },
	// {
	// 	title: 'James',
	// 	href: 'https://twitter.com/RealEcho207',
	// 	icon: 'fa-brands fa-x-twitter',
	// 	background: 'bg-twitter',
	// },
	// {
	// 	title: 'Kev',
	// 	href: 'https://twitter.com/kpg1974',
	// 	icon: 'fa-brands fa-x-twitter',
	// 	background: 'bg-twitter',
	// },
	// {
	// 	title: 'Chris',
	// 	href: 'https://twitter.com/chrishallbsdc',
	// 	icon: 'fa-brands fa-x-twitter',
	// 	background: 'bg-twitter',
	// },
]

export default items
