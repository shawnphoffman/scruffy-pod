'use client'

export default function ListenNow() {
	return (
		<div className="pageDescription">
			<iframe
				className="iframe"
				src="https://open.spotify.com/embed/show/0BM9MOB6jdirna5f1vNcMe?utm_source=generator&t=0"
				width="100%"
				height="352"
				allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
				sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
				loading="lazy"
			></iframe>
		</div>
	)
}
