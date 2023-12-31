'use client'
import * as Switch from '@radix-ui/react-switch'

import { Icon } from '@tendenz/icons'
import Balancer from 'react-wrap-balancer'
import { H3 } from '../docs/TextStyles'
import { useSettingsStore } from '../lib/stores/settingsStore'
import { OffRampToggle } from './OffRampToggle'

export default function SettingsPage() {
	const setPersist = useSettingsStore(state => state.setPersist)
	const persist = useSettingsStore(state => state.persist)

	return (
		<>
			<section>
				<H3>
					<div className="flex items-center gap-2 text-slate12">
						<Icon name="phosphor-icons/chart-line" />
						offramp provider
					</div>
				</H3>
				<div className="text-sm text-slate11 sm:text-center">
					<Balancer>
						the service to be used when linking to external sites for additional
						information on assets
					</Balancer>
				</div>
				<div className="my-7">
					<OffRampToggle />
				</div>
			</section>
			<section className="pt-8">
				<form>
					<div className="flex items-center">
						<label
							className="text-white pr-[15px] text-[15px] leading-none text-slate11"
							htmlFor="remeber-setting"
						>
							remember settings
						</label>
						<Switch.Root
							checked={persist}
							onCheckedChange={setPersist}
							className="group relative flex h-4 w-8 cursor-default items-center outline-none"
							id="remeber-setting"
							style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
						>
							<div className="absolute inset-0 -m-0.5 rounded-full bg-slateA7 transition-colors duration-500 ease-in-out will-change-[backgroundColor] group-radix-state-checked:bg-slateA9" />
							<Switch.Thumb className="h-4 w-4 rounded-full bg-slate1 transition-transform duration-500 ease-in-out will-change-transform data-[state=checked]:translate-x-[calc(2rem-100%)] dark:bg-slate12" />
						</Switch.Root>
					</div>
					<div className="mt-1 text-xs text-slate10">this uses cookies.</div>
				</form>
			</section>
		</>
	)
}
