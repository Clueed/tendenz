'use client'
import { useSettingsStore } from '../components/settingsStore'
import { H3 } from '../docs/TextStyles'
import { OFFRAMP_NAMES } from '../lib/MARKET_CAP_BUCKETS'
import { OffRampToggle } from './OffRampToggle'

export default function Settings() {
	const offRampName = useSettingsStore(state => state.offrampName)
	const setOfframpName = useSettingsStore(state => state.setOfframpName)

	const allOffRampNames = OFFRAMP_NAMES

	return (
		<section>
			<H3>Offramp Provider</H3>
			<OffRampToggle />
		</section>
	)
}
