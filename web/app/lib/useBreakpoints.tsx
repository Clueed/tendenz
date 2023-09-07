import { useMediaQuery } from 'react-responsive'
import * as screens from '../../tailwind-screens.config'

type BreakpointKey = keyof typeof screens

/**
 * @desc The 'useBreakpoint()' hook is used to get the current
 *       screen breakpoint based on the TailwindCSS config.
 *
 * @usage
 *    import { useBreakpoint } from "@/hooks/useBreakpoint";
 *
 *    const { isAboveSm, isBelowSm, sm } = useBreakpoint("sm");
 *    console.log({ isAboveSm, isBelowSm, sm });
 *
 *    const { isAboveMd } = useBreakpoint("md");
 *    const { isAboveLg } = useBreakpoint("lg");
 *    const { isAbove2Xl } = useBreakpoint("2xl");
 *    console.log({ isAboveMd, isAboveLg, isAbove2Xl });
 *
 * @see https://stackoverflow.com/a/76630444/6543935
 * @requirements npm install react-responsive
 */
export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
	const breakpointValue = screens[breakpointKey as BreakpointKey]
	const bool = useMediaQuery({
		query: `(max-width: ${breakpointValue})`,
	})
	const capitalizedKey =
		breakpointKey[0].toUpperCase() + breakpointKey.substring(1)

	type KeyAbove = `isAbove${Capitalize<K>}`
	type KeyBelow = `isBelow${Capitalize<K>}`

	return {
		[breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, '')),
		[`isAbove${capitalizedKey}`]: !bool,
		[`isBelow${capitalizedKey}`]: bool,
	} as Record<typeof breakpointKey, number> &
		Record<KeyAbove | KeyBelow, boolean>
}
