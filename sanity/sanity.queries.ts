import { groq } from 'next-sanity'

const podName = 'Scruffy Lookin Podcasters'

const postFields = groq`
  _id,
  _updatedAt,
  title,
  date,
	publishedAt,
  excerpt,
  mainImage,
  "slug": slug.current,
  "author": author->{name, image},
	"categories": categories[]->title,
`

export const postsListQuery =
	process.env.VERCEL_ENV === 'production'
		? groq`
*[_type == "post" && "${podName}" in categories[]->.title] | order(date desc, publishedAt desc) {
  ${postFields}
}`
		: groq`
*[_type == "post"] | order(date desc, publishedAt desc) {
  ${postFields}
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current) && "${podName}" in categories[]->.title][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
	body,
  ${postFields}
}
`
