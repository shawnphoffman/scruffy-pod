import PostRow from '@/components/updates/PostRow'
import { getAllPosts } from '@/sanity/sanity.requests'
import { POST_QUERYResult } from '@/sanity/sanity.types'

export default async function UpdatesPage() {
	const posts = await getAllPosts()

	return (
		<div className="w-full max-w-3xl mb-8 border rounded-lg border-brand-border bg-brand-background-transparent">
			<div className="flex flex-col items-center justify-center w-full p-2 divide-y divide-brand-yellow">
				{posts.length === 0 && <div className="text-center">No posts found</div>}
				{posts.map(post => {
					return <PostRow key={post._id} post={post as NonNullable<POST_QUERYResult>} />
				})}
			</div>
		</div>
	)
}
