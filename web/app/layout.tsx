import localFont from 'next/font/local'
import { Footer } from './Footer'
import NavigationBar from './components/Navbar/NavigationBar'
import './globals.css'

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="dark-theme">
			<head>
				<title>Tendenz - skip past the noise</title>
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
				className={
					dmSans.variable +
					' relative min-h-screen bg-slate-1 font-sans text-slate-12'
				}
			>
				<NavigationBar />
				<div className="flex min-h-full flex-col content-between justify-between">
					<main>{children}</main>

					<Footer />
				</div>
				<div className="noise2 absolute left-0 top-0 -z-30 h-full w-full opacity-5" />
				<div className="absolute top-0 -z-40 h-full w-full backdrop-blur-3xl"></div>
				<div className="absolute top-0 -z-50 h-full w-full overflow-clip">
					{
						// Top
					}
					<div className="absolute left-0 top-0 grid w-full grid-cols-default">
						<div className="left-0 top-0 col-start-2 h-96 w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-a12 opacity-30 lg:hidden" />
					</div>
					<div className="absolute left-1/2 top-0 hidden h-80 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-a11 opacity-30 lg:block" />
					{
						// Middle
					}
					<div className="absolute -right-48 top-[62rem] h-96 w-96 rounded-full bg-sky-a3" />
					<div className="absolute -left-48 top-[40rem] h-96 w-96 rounded-full bg-indigo-a4" />
					{
						// Bot
					}
					<div className="absolute bottom-0 left-1/2 h-80 w-[40rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-slate-a3" />
				</div>
			</body>
		</html>
	)
}
