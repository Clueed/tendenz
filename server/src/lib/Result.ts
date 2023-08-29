declare module 'Result' {
	class Result<S, F> {
		constructor() {}

		isSuccess = (
			result: ({ success: true } & S) | ({ success: false } & F),
		): result is { success: true } & S => result.success === true

		isFailure = (
			result: ({ success: true } & S) | ({ success: false } & F),
		): result is { success: false } & F => result.success === false

		success(data: S): { success: true } & S {
			return { success: true, ...data }
		}
		failure(data: F): { success: false } & F {
			return { success: false, ...data }
		}
	}
}
