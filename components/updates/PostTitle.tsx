export default function PostTitle({ children }) {
	return (
		<h1 className="w-full mb-2 text-4xl font-bold leading-tight tracking-tighter text-center sm:text-5xl md:text-6xl lg:text-8xl text-brand2 md:leading-none text-balance">
			{children}
		</h1>
	)
}
