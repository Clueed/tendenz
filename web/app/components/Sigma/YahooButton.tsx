import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import Link from 'next/link'
import ChevronRight from './ChevronRight'

export function YahooButton({ ticker }: { ticker: string }) {
	return (
		<Link
			target="_blank"
			rel="noopener noreferrer"
			href={`https://finance.yahoo.com/quote/${ticker}`}
			className="flex h-full items-center gap-1.5 rounded-l-lg bg-gradient-to-br from-indigo-a3 to-indigo-a4 py-3 pl-4 pr-2 text-violet-12 transition-all hover:-ml-1 hover:bg-indigo-a6 hover:pl-5"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1rem"
				width="1rem"
				viewBox="0 0 512 512"
				fill="currentColor"
				aria-hidden="true"
				focusable="false"
				strokeWidth={1}
			>
				! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
				License - https://fontawesome.com/license (Commercial License) Copyright
				2023 Fonticons, Inc.
				<path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
			</svg>
			<ChevronRight />
			<VisuallyHidden.Root>(opens in a new tab)</VisuallyHidden.Root>
		</Link>
	)
}
