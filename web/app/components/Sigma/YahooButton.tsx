import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { Icon } from '@tendenz/icons'
import clsx from 'clsx'
import Link from 'next/link'

export function YahooButton({ url }: { url: string }) {
	return (
		<Link
			target="_blank"
			rel="noopener noreferrer"
			href={url}
			className={clsx(
				'm-0 flex h-full items-center gap-1 rounded-l-lg bg-slate-a4 py-3 pl-4 pr-2 leading-none text-slate-11 transition-all duration-500',
				'shadow-sm hover:-ml-2 hover:bg-slate-a6 hover:pl-5 hover:pr-3 hover:text-slate-12',
			)}
		>
			{' '}
			<Icon name="phosphor-icons/chart-line" sizeClassName="h-5" />
			<Icon name="radix-icons/chevron-right" sizeClassName="h-3" />
			<VisuallyHidden.Root>(opens in a new tab)</VisuallyHidden.Root>
		</Link>
	)
}
