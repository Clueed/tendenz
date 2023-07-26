import localFont from "next/font/local";
import { Footer } from "./Footer";
import NavigationBar from "./components/Navbar/NavigationBar";
import "./globals.css";

const rubik = localFont({
  src: [
    { path: "./fonts/DMSans-VariableFont_opsz,wght.woff2", style: "normal" },
    {
      path: "./fonts/DMSans-Italic-VariableFont_opsz,wght.woff2",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
          rubik.variable + " font-sans bg-slate-3 relative text-slate-12"
        }
      >
        <NavigationBar />
        <main>{children}</main>
        <Footer />
        <div className="absolute top-0 left-0 w-full h-full opacity-5 -z-30 noise2" />
        <div className="absolute top-0 w-full h-full -z-40 backdrop-blur-3xl"></div>
        <div className="absolute top-0 w-full h-full overflow-clip -z-50">
          <div className="absolute rounded-full opacity-30 -top-48 w-96 h-96 bg-indigo-a12 -left-48" />
          <div className="absolute rounded-full w-96 h-96 bg-sky-3 -left-48 top-[25%]" />
          <div className="absolute rounded-full w-[30em] h-[30em] bg-indigo-3 left-[40vw] top-[-20em]" />
          <div className="absolute rounded-full w-96 h-96 bg-indigo-6 -right-48 top-[45%]" />
          <div className="absolute rounded-full w-44 h-44 bg-sky-4 right-[10vw] bottom-[-10em]" />
        </div>
      </body>
    </html>
  );
}
