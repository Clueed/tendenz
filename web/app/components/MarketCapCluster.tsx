'use client'
import classNames from 'classnames'
import { useState } from 'react'
import MarketCapFilter from './Sigma/MarketCapFilter'
import MarketCapFilterLabel from './Sigma/MarketCapFilterLabel'

type Props = {}

export default function MarketCapCluster({}: Props) {
	const [edit, setEdit] = useState<boolean>(false)
	return (
		<div
			className={classNames(
				'flex w-60 flex-col items-end gap-1 rounded-lg transition-colors delay-150 duration-500 ease-in',
				edit
					? 'bg-slate-a8 px-4 py-2 text-sm text-slate-1'
					: 'px-2 py-1 text-xs text-slate-11',
			)}
		>
			<MarketCapFilter edit={edit} setEdit={setEdit} />
			<MarketCapFilterLabel />
		</div>
	)
}
