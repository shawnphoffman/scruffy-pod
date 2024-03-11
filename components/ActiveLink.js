'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './ActiveLink.module.css'

const ActiveLink = ({ label, href }) => {
	const currentRoute = usePathname()
	const isActive = currentRoute === href
	return (
		<Link href={href} className={`${styles.link} ${isActive ? styles.active : ''}`}>
			{label}
		</Link>
	)
}

export default ActiveLink
