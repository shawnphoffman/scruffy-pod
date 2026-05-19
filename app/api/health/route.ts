import { createHealthRoute } from '@shawnphoffman/pod-sites-shared/health'

const probes = [
	{
		name: 'Apple Podcasts',
		url: 'https://api.shawn.party/api/podcast-data/apple?url=https://podcasts.apple.com/us/podcast/id1272718319?see-all=reviews',
	},
	{
		name: 'Spotify',
		url: 'https://api.shawn.party/api/podcast-data/spotify-scrape?url=https://open.spotify.com/show/0smXt1crilKFVJg3RubFPK',
	},
	{
		name: 'Goodpods',
		url: 'https://api.shawn.party/api/podcast-data/goodpods?url=https://goodpods.com/podcasts/scruffy-looking-podcasters-a-star-wars-podcast-318983',
	},
	{
		name: 'Awards',
		url: 'https://api.shawn.party/api/podcast-data/goodpods-scrape?url=https://goodpods.com/podcasts/scruffy-looking-podcasters-a-star-wars-podcast-318983',
	},
]

export const { GET } = createHealthRoute({ probes })
