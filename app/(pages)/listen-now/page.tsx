'use client'

export default function ListenNow() {
	return (
		<div className="w-full max-w-4xl text-base leading-normal sm:text-lg">
			<iframe
				className="w-full max-w-3xl mx-auto border-none"
				src="https://open.spotify.com/embed/show/0smXt1crilKFVJg3RubFPK?utm_source=generator&t=0"
				width="100%"
				height="352"
				allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
				sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
				loading="lazy"
				title="Listen Now"
			></iframe>
		</div>
	)
}
