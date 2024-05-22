'use client'

import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ActiveLink = ({ label, href, ...rest }) => {
	const currentRoute = usePathname()
	const isActive = currentRoute === href

	const conditionalClasses = classnames(
		isActive ? 'text-brand2 underline-4 underline underline-offset-[7px] decoration-[3px]' : 'text-white link'
	)

	return (
		<Link {...rest} href={href} className={`text-lg font-bold whitespace-nowrap cursor-pointer pb-0.5 ${conditionalClasses}`}>
			{label}
		</Link>
	)
}

export default ActiveLink
