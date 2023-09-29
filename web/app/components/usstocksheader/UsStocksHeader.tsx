import SettingsButton from './SettingsButton'
import { UsStocksHeaderTitle } from './UsStocksHeaderTitle'

import Timer from './Timer'

export default function UsStocksHeader({}: {}) {
	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 mb-[1.5vh] flex flex-wrap-reverse justify-end gap-5 align-baseline">
				<UsStocksHeaderTitle className="flex-grow" />

				<div className="flex items-end gap-2">
					<Timer />
					<SettingsButton />
				</div>
			</div>
		</div>
	)
}
