'use client'
import * as Switch from '@radix-ui/react-switch'
import { GraphIcon } from '../components/Sigma/GraphIcon'
import { useSettingsStore } from '../components/settingsStore'
import { H3 } from '../docs/TextStyles'
import { OFFRAMP_NAMES } from '../lib/MARKET_CAP_BUCKETS'
import { OffRampToggle } from './OffRampToggle'

export default function SettingsPage() {
	const offRampName = useSettingsStore(state => state.offRampName)
	const setOffRampName = useSettingsStore(state => state.setOffRampName)
	const setPersist = useSettingsStore(state => state.setPersist)
	const persist = useSettingsStore(state => state.persist)

	const allOffRampNames = OFFRAMP_NAMES

	return (
		<>
			<section>
				<H3>
					<div className="flex items-center gap-2">
						<span className="text-xl">
							<GraphIcon />{' '}
						</span>{' '}
						offramp provider
					</div>
				</H3>
				<div className="my-7">
					<OffRampToggle
						selectedKey={offRampName}
						selectKey={setOffRampName}
						allKeys={allOffRampNames}
					/>
				</div>
			</section>
			<section>
				<form>
					<div className="flex items-center">
						<label
							className="text-white pr-[15px] text-[15px] leading-none text-slate-11"
							htmlFor="remeber-setting"
						>
							remember settings
						</label>
						<Switch.Root
							checked={persist}
							onCheckedChange={setPersist}
							className="group relative flex h-4 w-8 cursor-default items-center outline-none"
							id="remeber-setting"
							style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
						>
							<div className="absolute inset-0 -m-0.5 rounded-full bg-slate-a7 transition-colors duration-500 ease-in-out will-change-[backgroundColor] group-radix-state-checked:bg-slate-a9" />
							<Switch.Thumb className="h-4 w-4 rounded-full bg-slate-1 transition-transform duration-500 ease-in-out will-change-transform data-[state=checked]:translate-x-[calc(2rem-100%)] dark:bg-slate-12" />
						</Switch.Root>
					</div>
				</form>
			</section>
		</>
	)
}
