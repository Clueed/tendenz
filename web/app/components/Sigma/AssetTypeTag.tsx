import { stockTypes } from '@tendenz/types'
import { useContext } from 'react'
import { PopRoot, PopoverContentStyled } from '../Pop2'
import { SigmaEntryContext } from './SigmaEntryContext'
import { TagPopoverTrigger } from './TagPopoverTrigger'

export function AssetTypeTag() {
	const { type } = useContext(SigmaEntryContext)
	return (
		<PopRoot>
			<TagPopoverTrigger>{type}</TagPopoverTrigger>
			<PopoverContentStyled color="slate">
				{stockTypes[type].description}
			</PopoverContentStyled>
		</PopRoot>
	)
}
