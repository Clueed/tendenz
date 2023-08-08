import config from '@tendenz/prettier-config'

const { plugins, ...restConfig } = config

export default {
	...restConfig,
	plugins: [
		'prettier-plugin-organize-imports',
		'prettier-plugin-tailwindcss',
		...plugins,
	],
	tailwindFunctions: ['classNames'],
}
