import Balancer from 'react-wrap-balancer'

export default function Hero() {
	return (
		<div className="grid grid-cols-default">
			<div className="col-start-2 col-end-2">
				<h1 className="text-left text-5xl leading-tight text-blue-a12 lg:text-center lg:text-6xl">
					<Balancer>objective insight across all markets</Balancer>
				</h1>
			</div>
		</div>
	)
}
