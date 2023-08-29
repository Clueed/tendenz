import IconFire from '../IconFire'

export function LoadingError({
	error,
	isValidating,
}: {
	error: any
	isValidating: boolean
}) {
	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 flex h-96 items-center justify-center rounded-md bg-gradient-radial from-tomato-a3 to-slate-a1 shadow-sm">
				<div className="flex items-center gap-2 text-tomato-a12">
					{isValidating ? (
						<div className="h-4 w-4 animate-spin rounded-full border-b-2 border-tomato-a11" />
					) : (
						<>
							<IconFire />
						</>
					)}
					Something went wrong
				</div>
			</div>
		</div>
	)
}
