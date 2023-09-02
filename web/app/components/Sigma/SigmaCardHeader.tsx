import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import Pop from '../Pop'
import { MarketCap } from './MarketCap'
import { Tag } from './Tag'
import { stockTypeCode, stockTypes } from '@tendenz/types'

export function SigmaCardHeader({
	expanded,
	sigma,
	ticker,
	name,
	marketCap,
	type,
}: {
	expanded: boolean
	sigma: number
	ticker: string
	name: string
	marketCap: number
	type: stockTypeCode
}) {
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
				<div className={classNames({ truncate: expanded ? false : trunc })}>
					<span className="mr-1 text-slate-11">{ticker}</span>
					{'  '}
					<span className="text-slate-12">{nameWithoutTypesAndParan}</span>
					<AnimatePresence>
						{expanded && (
							<>
								{' '}<StockTypePopover key={type} text={stockTypes[type].description}>
												<Tag
													className={classNames(
														'hover:bg-slate-a5 hover:text-slate-12',
														'group-radix-state-open:bg-slate-a5 group-radix-state-open:text-slate-12',
													)}
												>
													{type}
												</Tag>
											</StockTypePopover>
								{' '}
								<MarketCap marketCap={marketCap} ticker={ticker} />
							</>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</div>
	)
}

function StockTypePopover({
	children,
	text,
}: {
	children: ReactNode | ReactNode[]
	text: string
}) {
	return (
		<Pop
			offset={1}
			popoverColor="slate"
			popoverContent={<div className="w-36">{text}</div>}
		>
			{children}
		</Pop>
	)
}

function handleTickerTypes(name: string) {
	let formattedName = name
	let shareTypes: string[] = []

	if (formattedName === null) {
		return { formattedName, shareTypes }
	}

	for (const type of [
		'Common Stock',
		'Ordinary Shares',
		'Class A',
		'Depositary Shares',
	]) {
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

function extractContentInParentheses(input: string) {
	const openingIndex = input.indexOf('(')
	const closingIndex = input.lastIndexOf(')')

	const substring = input.substring(openingIndex, closingIndex + 1)
	const cleanInput = input.replace(substring, '')

	const content = substring.slice(1, -1)

	return { cleanInput, content }
}
