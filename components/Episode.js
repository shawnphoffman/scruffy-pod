import Image from 'next/image'

import styles from './Episodes.module.css'
import EpisodeSummary from './EpisodeSummary'

const options = { year: 'numeric', month: 'long', day: 'numeric' }

export default function Episodes({ episode }) {
	const pubDate = new Date(episode.pubDate).toLocaleDateString('en-US', options)
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{episode.title}</h2>
			<div className={styles.detailsContainer}>
				<Image src={episode.imgSrc} alt={episode.title} className={styles.cover} width={200} height={200} />
				<div className={styles.summary}>
					<div className={styles.pubDate} suppressHydrationWarning>
						Posted: {pubDate}
					</div>
					<EpisodeSummary summary={episode.summary} />
					<a className={styles.link} target="_blank" href={episode.link ? episode.link : 'https://zencastr.com/Just-Shillin'}>
						Episode Link
					</a>
				</div>
			</div>
		</div>
	)
}
