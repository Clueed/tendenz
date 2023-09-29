import { Footer } from '@/app/Footer'
import NavigationBar from '@/app/components/navbar/NavigationBar'
import { CustomThemeProvider } from '@/app/lib/providers/ThemeProvider'
import clsx from 'clsx'
import { DM_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './global.css'

const dmSans = localFont({
	src: [
		{ path: './fonts/DMSans-VariableFont_opsz,wght.woff2', style: 'normal' },
		{
			path: './fonts/DMSans-Italic-VariableFont_opsz,wght.woff2',
			style: 'italic',
		},
	],
	display: 'swap',
	variable: '--font-dmsans',
})

const dmMono = DM_Mono({
	weight: ['300', '400', '500', '300', '400', '500'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-dmmono',
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			className="min-h-full w-full overflow-x-hidden"
			suppressHydrationWarning
		>
			<head>
				<title>Tendenz - Skip past the noise</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png?v=2"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png?v=2"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png?v=2"
				/>
				<link rel="manifest" href="/site.webmanifest?v=2" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg?v=2"
					color="#fbfcfd"
				/>
				<link rel="shortcut icon" href="/favicon.ico?v=2" />
				<meta name="msapplication-TileColor" content="#fbfcfd" />
				<meta
					name="theme-color"
					content="#F1F3F5"
					media="(prefers-color-scheme: light)"
				/>
				<meta
					name="theme-color"
					content="#202425"
					media="(prefers-color-scheme: dark)"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body
				className={clsx(
					dmSans.variable,
					dmMono.variable,
					'relative flex min-h-screen w-full flex-col overflow-x-clip bg-slate1 font-sans text-slate12',
				)}
			>
				<CustomThemeProvider>
					<NavigationBar />
					<main className="flex-1">{children}</main>
					<Footer />
					<div className="noise-bg absolute inset-0 -z-30 transform-gpu opacity-30" />
					<div className="absolute top-0 -z-40 h-full w-full transform-gpu backdrop-blur-3xl"></div>
					<div className="absolute top-0 -z-50 h-full w-full overflow-clip">
						{
							// Top
						}
						<div className="absolute left-0 top-0 grid w-full grid-cols-default">
							<div className="left-0 top-0 col-start-2 h-96 w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigoA12 opacity-30 sm:hidden" />
						</div>
						<div className="absolute left-1/2 top-0 hidden h-80 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigoA11 opacity-30 sm:block" />
						{
							// Middle
						}
						<div className="absolute right-0 top-[40rem] h-[50vw] w-[50vw] translate-x-1/2 rounded-full bg-skyA3 dark:opacity-50" />
						<div className="absolute left-0 top-[62rem] h-[50vw] w-[50vw] -translate-x-1/2 rounded-full bg-indigoA4 dark:opacity-50" />
						{
							// Middle 2 (coming soon)
						}
						<div className="absolute bottom-[30rem] right-0 h-[50vw] w-[50vw] translate-x-1/2 translate-y-1/2 rounded-full bg-violetA3  dark:opacity-50  sm:bottom-[44rem]" />
						<div className="absolute bottom-[20rem] left-0 h-[50vw] w-[50vw] -translate-x-1/2 translate-y-1/2 rounded-full bg-blueA3 dark:opacity-50  sm:bottom-[34rem]" />
						{
							// Bot
						}
						<div className="absolute bottom-0 left-1/2 h-80 w-[40rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-slateA3" />
					</div>
				</CustomThemeProvider>
			</body>
		</html>
	)
}
