import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { OFFRAMP_NAMES } from '../lib/MARKET_CAP_BUCKETS'

export default function Settings({}: {}) {
	const [value, setValue] =
		useState<(typeof OFFRAMP_NAMES)[number]>('Yahoo Finance')

	const onValueChange = () => {}

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					className="text-violet11 bg-white shadow-blackA7 hover:bg-violet3 focus:shadow-black inline-flex items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
					aria-label="Customise options"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 512 512"
						fill="currentColor"
					>
						! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com
						License - https://fontawesome.com/license (Commercial License)
						Copyright 2023 Fonticons, Inc.{' '}
						<path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
					</svg>
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="min-w-[220px] rounded-md bg-slate-10 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
					sideOffset={5}
				>
					<DropdownMenu.Label className="text-xs text-slate-3">
						offramp link
					</DropdownMenu.Label>
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>{value}</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent
								className="min-w-[220px] rounded-md bg-slate-10 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
								sideOffset={5}
							>
								<DropdownMenu.RadioGroup
									value={value}
									onValueChange={newValue =>
										setValue(newValue as (typeof OFFRAMP_NAMES)[number])
									}
									className="flex flex-col gap-0"
								>
									{OFFRAMP_NAMES.map(value => (
										<DropdownMenu.RadioItem
											value={value}
											key={value}
											className="data-[disabled]:text-mauve8 relative grid select-none grid-cols-[1rem_auto] items-center rounded-[3px] px-[5px] py-1 text-[13px] leading-none text-slate-1 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-9 data-[highlighted]:text-violet-1"
										>
											<DropdownMenu.ItemIndicator className="flex items-center justify-center">
												<div className="h-2 w-2 rounded-full bg-tomato-10" />
											</DropdownMenu.ItemIndicator>
											<div className="col-start-2">{value}</div>
										</DropdownMenu.RadioItem>
									))}
								</DropdownMenu.RadioGroup>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
