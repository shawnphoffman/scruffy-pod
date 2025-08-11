'use client'

import { Component, ReactNode } from 'react'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: any) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="flex flex-col items-center justify-center w-full p-8 text-center border border-red-500 rounded-lg bg-red-500/10">
						<div className="mb-2 text-lg font-semibold text-red-400">Something went wrong</div>
						<div className="mb-4 text-sm text-red-300">{this.state.error?.message || 'An unexpected error occurred'}</div>
						<button
							onClick={() => this.setState({ hasError: false, error: undefined })}
							className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
						>
							Try again
						</button>
					</div>
				)
			)
		}

		return this.props.children
	}
}
