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
      <body className={inter.className + " bg-slate-3"}>
        <NavigationBar />
        {children}
        <footer className="flex my-10 justify-around text-slate-9">
          <Link href="/disclaimers">disclaimers</Link>
          <div>© 2023</div>
        </footer>
      </body>
    </html>
  );
}
