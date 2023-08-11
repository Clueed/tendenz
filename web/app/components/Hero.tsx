import { ExplainingTitle } from './ExplainingTitle'

export default function Hero() {
	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 col-end-2">
				<h1 className="text-left text-6xl text-indigo-a12 lg:text-center">
					objective insight
					<br />
					made simple.
				</h1>
				<ExplainingTitle />
			</div>
		</div>
	)
}
