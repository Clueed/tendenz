import Link from "next/link";
import Container from "./components/Container";

export function Footer() {
  return (
    <footer className="pt-10 pb-5 px-[5vw]">
      <Container type="default">
        <div className="flex flex-col items-stretch gap-5">
          <div className="flex justify-around text-slate-9">
            <Link href="/disclaimers">disclaimers</Link>
            <a href="https://www.github.com/Clueed/tendenz" target="_blank">
              GitHub
            </a>
          </div>
          <div className="text-xs text-center text-slate-8">
            Tendenz © 2023 under{" "}
            <a
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
              target="_blank"
              rel="license noopener noreferrer"
            >
              CC BY-NC-SA 4.0
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
