/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'media',
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			...createColorObject([
				'tomato',
				'red',
				'ruby',
				'crimson',
				'pink',
				'plum',
				'purple',
				'violet',
				'indigo',
				'iris',
				'blue',
				'cyan',
				'teal',
				'jade',
				'green',
				'grass',
				'orange',
				'brown',
				'sky',
				'mint',
				'lime',
				'yellow',
				'amber',
				'gray',
				'mauve',
				'slate',
				'sage',
				'olive',
				'sand',
				'bronze',
				'gold',
			]),
			black: generateScale('black', true),
			white: generateScale('white', true),
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
			animation: {
				'text-gradient-15s': 'text-gradient 15s linear infinite',
				slide: 'slide 4s linear infinite',
			},
			keyframes: {
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
			},
		},
	},
	plugins: [
		require('@tailwindcss/container-queries'),
		require('tailwindcss-radix'),
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
