'use client'

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import classnames from 'classnames'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import sanityClient from '@/sanity/sanity.client'

interface PostImageProps {
	asset: SanityImageSource
	alt: string
	caption?: string
	className?: string
}

const PostImage = (props: PostImageProps) => {
	const { asset, caption } = props

	const imageProps = useNextSanityImage(sanityClient, asset)

	if (!imageProps) return null

	return (
		<figure>
			<Image
				alt={caption || ''}
				//
				sizes="(max-width: 800px) 100vw, 800px"
				className={classnames('mw-full h-auto max-h-96 aspect-auto w-auto mx-auto', props.className)}
				{...imageProps}
			/>
			{caption && (
				<figcaption className="mt-2 text-base italic text-center text-neutral-400 text-pretty">
					{/*  */}
					{caption}
				</figcaption>
			)}
		</figure>
	)
}

export default PostImage
