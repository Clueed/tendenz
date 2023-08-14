import Link from 'next/link'

export function Footer() {
	const linkClassName =
		'flex-1 transition-colors hover:text-indigo-11 text-center text-slate-9'

	return (
		<footer className="grid grid-cols-default pb-5 pt-10 sm:pt-[10vh]">
			<div className="col-start-2 flex flex-col items-stretch gap-5">
				<div className="flex justify-around">
					<Link href="/disclaimers" className={linkClassName}>
						disclaimers
					</Link>
					<a
						href="https://www.github.com/Clueed/tendenz"
						target="_blank"
						className={linkClassName}
					>
						GitHub
					</a>
					<Link href="/docs" className={linkClassName}>
						docs
					</Link>
				</div>
				<div className="text-center text-xs text-slate-8">
					Tendenz © 2023 under{' '}
					<a
						href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
						target="_blank"
						rel="license noopener noreferrer"
						className="transition-colors hover:text-indigo-11"
					>
						CC BY-NC-SA 4.0
					</a>
				</div>
			</div>
		</footer>
	)
}
