import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import clsx from 'clsx'
import Link from 'next/link'
import ChevronRight from '../icons/ChevronRight'
import { GraphIcon } from '../icons/GraphIcon'

export function YahooButton({ url }: { url: string }) {
	return (
		<Link
			target="_blank"
			rel="noopener noreferrer"
			href={url}
			className={clsx(
				'm-0 flex h-full items-center gap-1.5 rounded-l-lg bg-slate-a4 py-3 pl-4 pr-2 text-slate-11 transition-all duration-500',
				'shadow-sm hover:-ml-2 hover:bg-slate-a6 hover:pl-5 hover:pr-3 hover:text-slate-12',
			)}
		>
			<GraphIcon />
			<ChevronRight height="0.65rem" />
			<VisuallyHidden.Root>(opens in a new tab)</VisuallyHidden.Root>
		</Link>
	)
}
