const { createThemes } = require('tw-colors')
const radix = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'../packages/icons/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			transparent: '#00000000',
		},
		screens: require('./tailwind-screens.config'),
		extend: {
			fontSize: {
				xxs: ['0.64rem', { lineHeight: '1rem' }],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontFamily: {
				sans: ['var(--font-dmsans)'],
				mono: ['var(--font-dmmono)'],
			},
			gridTemplateColumns: {
				default: '1fr min(640px, 90vw) 1fr',
				'default-prosa': '1fr min(45ch, 90vw) 1fr',
			},
			transitionTimingFunction: { spring: 'cubic-bezier(.12,0,.36,1.5)' },
			animation: {
				'text-gradient-15s': 'text-gradient 15s linear infinite',
				slide: 'slide 4s linear infinite',
				'pulse-1s': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'border-width': 'border-width 1s infinite',
				slideDownAndFade:
					'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideLeftAndFade:
					'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideRightAndFade:
					'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				clockRotate: 'rotate-360 1s spring ',
			},
			keyframes: {
				overlayShow: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				contentShow: {
					from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
					to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
				},
				slideDownAndFade: {
					from: { opacity: 0, transform: 'translateY(-10px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				slideLeftAndFade: {
					from: { opacity: 0, transform: 'translateX(10px)' },
					to: { opacity: 1, transform: 'translateX(0)' },
				},
				slideUpAndFade: {
					from: { opacity: 0, transform: 'translateY(10px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				slideRightAndFade: {
					from: { opacity: 0, transform: 'translateX(-10px)' },
					to: { opacity: 1, transform: 'translateX(0)' },
				},
				'text-gradient': {
					to: {
						backgroundPosition: '200% center',
					},
				},
				slide: {
					'0%': { transform: 'translateY(100%)', opacity: 0.1 },
					'15%': { transform: 'translateY(0)', opacity: 1 },
					'30%': { transform: 'translateY(0)', opacity: 1 },
					'45%': { transform: 'translateY(-100%)', opacity: 1 },
					'100%': { transform: 'translateY(-100%)', opacity: 0.1 },
				},
				'border-width': {
					'0%': {
						width: '0%',
						opacity: '0',
					},
					'50%': {
						width: '100%',
						opacity: '1',
					},
					'100%': {
						width: '0%',
						opacity: '0',
					},
				},
				'rotate-360': {
					to: {
						transform: 'rotate(360deg)',
					},
				},
				'random-movement1': {
					'0%': {
						transform: 'translate(Opx, Opx) scale(1)',
					},
					'33%': {
						transform: 'translate (30px, -50x) scale(1.1)',
					},
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
					'100%': { transform: 'translate(0px, 0px) scale(1)' },
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('tailwindcss-radix'),
		createThemes({
			light: Object.entries(radix)
				.filter(color => !color[0].includes('Dark'))
				.map(color => color[1])
				.reduce((accumulator, currentObject) => {
					Object.assign(accumulator, currentObject)
					return accumulator
				}, {}),
			dark: Object.entries(radix)
				.filter(color => color[0].includes('Dark'))
				.map(color => color[1])
				.reduce((accumulator, currentObject) => {
					Object.assign(accumulator, currentObject)
					return accumulator
				}, {}),
		}),
	],
}

function createColorObject(names) {
	let colors = {}
	for (const name of names) {
		colors[name] = generateScale(name)
	}
	return colors
}

function generateScale(name, alpha_only = false) {
	let scale = Array.from({ length: 12 }, (_, i) => {
		let id = i + 1
		r = [[`a${id}`, `var(--${name}-a${id})`]]
		if (!alpha_only) {
			r.push([id, `var(--${name}-${id})`])
		}
		return r
	}).flat()

	return Object.fromEntries(scale)
}
