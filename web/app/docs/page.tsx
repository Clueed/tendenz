'use client'
import { motion } from 'framer-motion'

export default function docs() {
	return (
		<>
			<section className="grid grid-cols-default pt-10">
				<div className="col-start-2 flex gap-[10%]">
					<motion.div className="bg-gradient-br h-10 flex-grow from-indigo-a6 via-sky-a7 to-violet-a9">
						statistical significants
					</motion.div>
					<motion.div className="bg-gradient-br  h-10 flex-grow from-indigo-a6 via-sky-a7 to-violet-a9">
						market capitalization
					</motion.div>
				</div>
			</section>
		</>
	)
}
