'use client'

import { motion, type SpringOptions, type Transition, useMotionValue, useSpring } from 'motion/react'
import * as React from 'react'

type StarLayerProps = {
	count: number
	size: number
	transition: Transition
	starColor: string
}

function generateStars(count: number, starColor: string) {
	const shadows: string[] = []
	for (let i = 0; i < count; i++) {
		const x = Math.floor(Math.random() * 4000) - 2000
		const y = Math.floor(Math.random() * 4000) - 2000
		shadows.push(`${x}px ${y}px ${starColor}`)
	}
	return shadows.join(', ')
}

function StarLayer({ count, size, transition, starColor }: StarLayerProps) {
	const [boxShadow, setBoxShadow] = React.useState<string>('')

	React.useEffect(() => {
		setBoxShadow(generateStars(count, starColor))
	}, [count, starColor])

	return (
		<motion.div animate={{ y: [0, -2000] }} transition={transition} className="absolute top-0 left-0 w-full h-[2000px]">
			<div className="absolute bg-transparent rounded-full" style={{ width: `${size}px`, height: `${size}px`, boxShadow }} />
			<div className="absolute bg-transparent rounded-full top-[2000px]" style={{ width: `${size}px`, height: `${size}px`, boxShadow }} />
		</motion.div>
	)
}

type StarBackgroundProps = {
	factor?: number
	speed?: number
	transition?: SpringOptions
	starColor?: string
}

export default function StarBackground({
	factor = 0.05,
	speed = 50,
	transition = { stiffness: 50, damping: 20 },
	starColor = 'rgba(96, 165, 250, 0.85)',
}: StarBackgroundProps = {}) {
	const offsetX = useMotionValue(1)
	const offsetY = useMotionValue(1)
	const springX = useSpring(offsetX, transition)
	const springY = useSpring(offsetY, transition)

	React.useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const centerX = window.innerWidth / 2
			const centerY = window.innerHeight / 2
			offsetX.set(-(e.clientX - centerX) * factor)
			offsetY.set(-(e.clientY - centerY) * factor)
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [offsetX, offsetY, factor])

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
			<motion.div style={{ x: springX, y: springY }} className="w-full h-full">
				<StarLayer count={2200} size={1} transition={{ repeat: Infinity, duration: speed, ease: 'linear' }} starColor={starColor} />
				<StarLayer count={900} size={2} transition={{ repeat: Infinity, duration: speed * 2, ease: 'linear' }} starColor={starColor} />
				<StarLayer count={450} size={3} transition={{ repeat: Infinity, duration: speed * 3, ease: 'linear' }} starColor={starColor} />
			</motion.div>
		</div>
	)
}
