import { getEpisodes } from '@/app/actions'
import Episodes from '@/components/core/Episodes'

export default async function EpisodesPage() {
	// await new Promise(resolve => setTimeout(resolve, 5000))
	const data = await getEpisodes()
	return (
		<div className="w-full max-w-3xl p-4 mb-8 border rounded-lg border-brand-border bg-brand-background-transparent">
			<Episodes episodes={data.episodes} />
		</div>
	)
}
