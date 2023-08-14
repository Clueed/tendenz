import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'
import { MarketCap } from './MarketCap'
import { Tag } from './Tag'

interface Props {
	expanded: boolean
	sigma: number
	ticker: string
	name: string
	marketCap: number
}

export function SigmaCardHeader({
	expanded,
	sigma,
	ticker,
	name,
	marketCap,
}: Props) {
	const formattedSigma = Math.abs(sigma).toFixed(2)
	const { formattedName, shareTypes } = useMemo(
		() => handleTickerTypes(name),
		[name],
	)
	return (
		<div
			className={
				'w-100 grid cursor-pointer grid-cols-[6.5rem_auto] items-baseline gap-x-4'
			}
		>
			<div className="grid grid-cols-[_auto_min-content] items-center">
				<div className="text-right text-2xl leading-none text-indigo-12">
					{formattedSigma}
				</div>
				<div className="ml-1 flex flex-col text-xl">
					<div
						className={classNames('-my-1 text-xxs opacity-90', {
							'text-red-a11': sigma < 0,
							'text-green-a11': sigma > 0,
						})}
					>
						{sigma < 0 ? '↓' : '↑'}
					</div>
					<div className="-my-1 text-sm text-slate-10">σ</div>
				</div>
			</div>

			<motion.div
				initial={{ height: 'calc(1.75rem)' }}
				animate={{
					height: expanded ? 'auto' : 'calc(1.75rem)',
					transition: {
						type: 'spring',
						duration: 0.75,
					},
				}}
				className={'overflow-clip pr-5 text-left text-xl'}
			>
				<span className="mr-1 text-slate-11">{ticker}</span>
				<span className="text-slate-12">{formattedName}</span>
				<AnimatePresence>
					{expanded && (
						<>
							{' '}
							<MarketCap marketCap={marketCap} ticker={ticker} />
							{shareTypes.map(type => (
								<Tag key={type}>
									{' '}
									<motion.span
										initial={{ opacity: 0 }}
										animate={{
											opacity: expanded ? 1 : 0,
											transition: {
												type: 'spring',
												duration: 0.5,
											},
										}}
									>
										{type}
									</motion.span>
								</Tag>
							))}
						</>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}

function handleTickerTypes(name: string | null) {
	let formattedName = name
	let shareTypes: string[] = []

	if (formattedName === null) {
		return { formattedName, shareTypes }
	}

	for (const type of ['Common Stock', 'Ordinary Shares', 'Class A']) {
		if (formattedName!.search(type) !== -1) {
			formattedName = formattedName!.replace(type, '')
			shareTypes.push(type)
		}
	}

	shareTypes = shareTypes.map(type =>
		type.replace(' ', String.fromCharCode(160)),
	)

	return { formattedName, shareTypes }
}
