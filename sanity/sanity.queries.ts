import {
	buildAwardsQuery,
	buildBannerQuery,
	buildPostSlugsQuery,
	buildPostsListQuery,
	postBySlugQuery,
} from '@shawnphoffman/pod-sites-shared/sanity'

const podId = '79aa2892-e3ca-4ef0-869f-ef36846b241b'

export const postsListQuery = buildPostsListQuery(podId)
export const postSlugsQuery = buildPostSlugsQuery(podId)
export { postBySlugQuery }
export const BANNER_QUERY = buildBannerQuery(podId)
export const AWARDS_QUERY = buildAwardsQuery(podId)
