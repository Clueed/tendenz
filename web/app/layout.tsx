import Link from "next/link";
import NavigationBar from "./components/NavigationBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark-theme">
      <body className={inter.className + " bg-slate-3 relative text-slate-12"}>
        <NavigationBar />
        {children}
        <footer className="flex justify-around pt-20 pb-10 text-slate-7">
          <Link href="/disclaimers">disclaimers</Link>
          <div>© 2023</div>
        </footer>
        <div className="absolute top-0 w-full h-full overflow-clip -z-50">
          <div className="absolute w-44 h-44 bg-sky-4 blur-3xl left-[-20vw] top-[25%]" />
          <div className="absolute w-[30em] h-[30em] bg-indigo-3 blur-3xl left-[40vw] top-[-20em]" />
          <div className="absolute w-[30em] h-[30em] bg-indigo-3 blur-3xl left-[40vw] top-[45%]" />
          <div className="absolute w-44 h-44 bg-sky-4 blur-3xl right-[10vw] bottom-[-10em]" />
        </div>
      </body>
    </html>
  );
}
