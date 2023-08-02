import { SVGProps } from 'react'
export const Logo = (props: SVGProps<SVGSVGElement>) => (
	<svg
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 136 27"
		// Added by hand makes text color apply
		fill="currentColor"
		width="100%"
		shapeRendering="geometricPrecision"
	>
		<path d="M8.751 25.943c-1.632 0-2.916-.396-3.852-1.188-.936-.792-1.404-2.22-1.404-4.284v-9.828H.4V8.087h3.096l.396-4.284H6.52v4.284h5.256v2.556H6.52v9.828c0 1.128.228 1.896.684 2.304.456.384 1.26.576 2.412.576h1.872v2.592H8.751Zm15.146.432c-1.752 0-3.312-.384-4.68-1.152a8.485 8.485 0 0 1-3.168-3.276c-.768-1.392-1.152-3.012-1.152-4.86 0-1.872.372-3.516 1.116-4.932.768-1.416 1.824-2.52 3.168-3.312 1.368-.792 2.952-1.188 4.752-1.188 1.752 0 3.276.396 4.572 1.188a8.14 8.14 0 0 1 3.024 3.096c.72 1.296 1.08 2.724 1.08 4.284 0 .24-.012.504-.036.792 0 .264-.012.564-.036.9H18.641c.12 1.728.684 3.048 1.692 3.96 1.032.888 2.22 1.332 3.564 1.332 1.08 0 1.98-.24 2.7-.72a4.544 4.544 0 0 0 1.656-2.016h3.816c-.48 1.68-1.44 3.084-2.88 4.212-1.416 1.128-3.18 1.692-5.292 1.692Zm0-15.588c-1.272 0-2.4.384-3.384 1.152-.984.744-1.584 1.872-1.8 3.384h10.08c-.072-1.392-.564-2.496-1.476-3.312-.912-.816-2.052-1.224-3.42-1.224ZM36.57 25.943V8.087h3.384l.288 3.132a6.135 6.135 0 0 1 2.412-2.592c1.08-.648 2.316-.972 3.708-.972 2.16 0 3.852.672 5.076 2.016 1.248 1.344 1.872 3.348 1.872 6.012v10.26h-3.78V16.08c0-3.456-1.416-5.184-4.248-5.184-1.416 0-2.592.504-3.528 1.512-.912 1.008-1.368 2.448-1.368 4.32v9.216h-3.816Zm29.37.432c-1.68 0-3.18-.408-4.5-1.224-1.32-.816-2.364-1.932-3.132-3.348-.768-1.416-1.152-3.024-1.152-4.824 0-1.8.384-3.396 1.152-4.788.768-1.416 1.812-2.52 3.132-3.312 1.32-.816 2.82-1.224 4.5-1.224 1.344 0 2.52.252 3.528.756a6.359 6.359 0 0 1 2.448 2.124V.023h4.608v25.92H72.42l-.504-2.556c-.576.792-1.344 1.488-2.304 2.088-.936.6-2.16.9-3.672.9Zm.972-4.032c1.488 0 2.7-.492 3.636-1.476.96-1.008 1.44-2.292 1.44-3.852s-.48-2.832-1.44-3.816c-.936-1.008-2.148-1.512-3.636-1.512-1.464 0-2.676.492-3.636 1.476s-1.44 2.256-1.44 3.816.48 2.844 1.44 3.852 2.172 1.512 3.636 1.512Zm22.728 4.032c-1.751 0-3.311-.384-4.68-1.152a8.485 8.485 0 0 1-3.168-3.276c-.767-1.392-1.151-3.012-1.151-4.86 0-1.872.371-3.516 1.115-4.932.769-1.416 1.825-2.52 3.169-3.312 1.367-.792 2.951-1.188 4.751-1.188 1.752 0 3.276.396 4.573 1.188a8.14 8.14 0 0 1 3.023 3.096c.72 1.296 1.08 2.724 1.08 4.284 0 .24-.011.504-.035.792 0 .264-.013.564-.037.9H84.385c.12 1.728.683 3.048 1.692 3.96 1.032.888 2.22 1.332 3.564 1.332 1.08 0 1.98-.24 2.7-.72a4.544 4.544 0 0 0 1.656-2.016h3.816c-.48 1.68-1.44 3.084-2.88 4.212-1.416 1.128-3.18 1.692-5.293 1.692Zm0-15.588c-1.271 0-2.4.384-3.383 1.152-.984.744-1.585 1.872-1.8 3.384h10.08c-.073-1.392-.564-2.496-1.477-3.312-.912-.816-2.052-1.224-3.42-1.224Zm12.672 15.156V8.087h3.384l.288 3.132a6.135 6.135 0 0 1 2.412-2.592c1.08-.648 2.316-.972 3.708-.972 2.16 0 3.852.672 5.076 2.016 1.248 1.344 1.872 3.348 1.872 6.012v10.26h-3.78V16.08c0-3.456-1.416-5.184-4.248-5.184-1.416 0-2.592.504-3.528 1.512-.912 1.008-1.368 2.448-1.368 4.32v9.216h-3.816Zm20.082 0V23.46l9.936-12.852h-9.756v-2.52h13.14v2.484l-9.936 12.852h10.116v2.52h-13.5Z" />
	</svg>
)
