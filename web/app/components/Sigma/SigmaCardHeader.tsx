import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { SigmaEntryContext } from './SigmaEntryContext'

export function SigmaCardHeader({ expanded }: { expanded: boolean }) {
	const { sigma, ticker, name, marketCap, type } = useContext(SigmaEntryContext)
	const formattedSigma = Math.abs(sigma).toFixed(2)

	//const { formattedName: nameWithoutTypes, shareTypes } = handleTickerTypes(name)
	//const { cleanInput: nameWithoutTypesAndParan, content: parantheses } = extractContentInParentheses(nameWithoutTypes)

	const nameWithoutTypesAndParan = name
	const shareTypes: any[] = []
	const parantheses = ''

	// All of truncation stuff here addresses the issue that
	// on the close animation if truncation happens during/before
	// there are animation artifacts.
	// This setup delays truncation until after the animation has completed
	// but keeps the immidiate 'untrucation' on expansion
	// (there a delay is not tollerable and produces no artifacts).
	// It's still not ideal because the truncation is delay so much that I causes seemingly random movement
	// when the user has moved on.

	const [trunc, setTrunc] = useState<Boolean>(expanded ? false : true)
	useEffect(() => {
		if (expanded) setTrunc(false)
	}, [expanded])

	return (
		<div
			className={
				'w-100 grid cursor-pointer grid-cols-[6.5rem_auto] items-baseline gap-x-4'
			}
		>
			<div className="flex items-center justify-end">
				<div className="text-right text-2xl leading-none text-indigo12">
					{formattedSigma}
				</div>
				<div className="ml-1 flex flex-col text-xl">
					<div
						className={clsx('-my-1 text-xxs opacity-90', {
							'text-redA11': sigma < 0,
							'text-greenA11': sigma > 0,
						})}
					>
						{sigma < 0 ? '↓' : '↑'}
					</div>
					<div className="-my-1 text-sm text-slate10">σ</div>
				</div>
			</div>

			<motion.div
				onAnimationComplete={() => {
					if (!expanded) setTrunc(true)
				}}
				initial={{ height: 'calc(1.75rem)' }}
				animate={{
					height: expanded ? 'auto' : 'calc(1.75rem)',
					transition: {
						ease: 'easeInOut',
						duration: 0.75,
					},
				}}
				className={'overflow-hidden pr-5 text-left text-xl'}
			>
				<div className={clsx({ truncate: expanded ? false : trunc })}>
					<span className="mr-1 text-slate11">{ticker}</span>
					{'  '}
					<span className="text-slate12">{nameWithoutTypesAndParan}</span>
				</div>
			</motion.div>
		</div>
	)
}
