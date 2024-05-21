import Image from 'next/image'

import { urlForSanityImage } from '@/sanity/sanity.image'

import PostAuthor from './PostAuthor'
import PostAuthorAvatar from './PostAuthorAvatar'
import PostDate from './PostDate'

export default function PostRow({ slug, mainImage, title, publishedAt, author }) {
	return (
		<a href={`/updates/${slug}`} className="mx-auto text-white w-fit md:w-full wow group ">
			<div className="flex flex-col items-center justify-between gap-2 p-4 py-2 transition-all rounded-lg hover:bg-sky-950/50 md:flex-row md:gap-4">
				{mainImage && (
					<Image
						className="h-auto w-96 md:w-24"
						width={400}
						height={200}
						alt={mainImage?.alt || ''}
						src={urlForSanityImage(mainImage).height(200).width(400).url()}
						sizes="100vw"
					/>
				)}
				<div className="flex flex-row w-full gap-2">
					<div className="flex items-center justify-center md:hidden">
						<PostAuthorAvatar name={author?.name} image={author?.image} />
					</div>
					<div className="flex flex-col items-start justify-center flex-1 w-full">
						<span className="text-xl font-bold transition-colors group-hover:text-sky-400">{title}</span>
						<PostDate dateString={publishedAt} />
					</div>
				</div>
				<div className="hidden md:flex">
					<PostAuthor name={author?.name} image={author?.image} />
				</div>
			</div>
		</a>
	)
}
