'use client'
import * as Switch from '@radix-ui/react-switch'
import { useSettingsStore } from '../components/settingsStore'
import { H3 } from '../docs/TextStyles'
import { OFFRAMP_NAMES } from '../lib/MARKET_CAP_BUCKETS'
import { OffRampToggle } from './OffRampToggle'

export default function SettingsPage() {
	const offRampName = useSettingsStore(state => state.offRampName)
	const setOffRampName = useSettingsStore(state => state.setOffRampName)

	const allOffRampNames = OFFRAMP_NAMES

	return (
		<>
			<section>
				<H3>Offramp Provider</H3>
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
							className="text-white pr-[15px] text-[15px] leading-none"
							htmlFor="airplane-mode"
						>
							remember settings
						</label>
						<Switch.Root
							className="focus:shadow-black data-[state=checked]:bg-black relative h-[25px] w-[42px] cursor-default rounded-full bg-black-a9 shadow-[0_2px_10px] shadow-black-a7 outline-none focus:shadow-[0_0_0_2px]"
							id="airplane-mode"
							style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
						>
							<Switch.Thumb className="bg-white shadow-blackA7 block h-[21px] w-[21px] translate-x-0.5 rounded-full shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
						</Switch.Root>
					</div>
				</form>
			</section>
		</>
	)
}
