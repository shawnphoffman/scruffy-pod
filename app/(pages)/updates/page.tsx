import PostRow from '@/components/updates/PostRow'
import { getAllPosts } from '@/sanity/sanity.requests'

export default async function UpdatesPage() {
	const posts = await getAllPosts()

	return (
		<div className="w-full max-w-3xl mb-8 border rounded-lg border-zinc-900 bg-zinc-950/75">
			<div className="flex flex-col justify-center w-full p-2 divide-y divide-sky-500">
				{posts.map(post => {
					const { author, mainImage, publishedAt, slug, _id, title } = post
					return <PostRow key={_id} author={author} mainImage={mainImage} publishedAt={publishedAt} slug={slug} title={title} />
				})}
			</div>
		</div>
	)
}
