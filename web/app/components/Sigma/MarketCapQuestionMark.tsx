import classNames from 'classnames'
import Pop from '../Pop'
import { PopLearnMore } from './PopLearnMore'

type Props = {}

export default function MarketCapFilterLabel({}: Props) {
	return (
		<Pop
			popoverColor="slate"
			offset={0}
			popoverContent={
				<div className="relative w-[calc(var(--radix-popover-trigger-width)*2)] text-base">
					<p>
						Market Cap stands for <i>Market Capitalization</i> and measures a
						company&apos;s total value in the stock market.
					</p>
					<p className="mt-2">
						Change the minimum value to see smaller/larger companies.
					</p>
					<div className="flex justify-end">
						<PopLearnMore href="/docs#market-capitalization" color="slate" />
					</div>
				</div>
			}
		>
			{open => (
				<div
					className={classNames(
						'flex gap-0.5 text-xxs transition-colors',
						{
							'text-slate-a10 duration-500 hover:text-slate-a12': !open,
						},
						{ 'text-slate-12': open },
					)}
				>
					<div>minimum market cap</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="0.8em"
						viewBox="0 0 512 512"
						fill="currentColor"
					>
						! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
						License - https://fontawesome.com/license (Commercial License)
						Copyright 2023 Fonticons, Inc.{' '}
						<path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
					</svg>
				</div>
			)}
		</Pop>
	)
}
