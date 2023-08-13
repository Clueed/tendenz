/** @type {import('ts-jest').JestConfigWithTsJest} */

import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	testEnvironment: 'node',
	preset: 'ts-jest/presets/default-esm', // or other ESM presets
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		// '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
		// '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
		//'^.+\\.tsx?$'
		'^.+\\.[tj]s?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
	transformIgnorePatterns: [],
	extensionsToTreatAsEsm: ['.ts'],
}

export default jestConfig
