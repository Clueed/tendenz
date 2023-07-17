import MainBox from "./components/MainBox";
import NavigationBar from "./components/NavigationBar";

export default function Home() {
  return (
    <main className="bg-slate-950 text-indigo-12">
      <div>
        <div className="h-[40vh] mx-auto">
          <div className="w-[70vw] mx-auto">
            <nav>
              <NavigationBar />
            </nav>
            <div>
              <div className="w-[40vw] h-12 font-bold text-center mx-auto mt-3 text-slate-5 text-5xl">
                Objective insight
              </div>
              <div className="w-[40vw] h-12 font-bold text-center mx-auto mt-3 text-slate-5 text-5xl">
                across all markets
              </div>
              <div className="mx-auto mt-3 font-semibold text-center text-slate-9">
                skip past the statistical noise
              </div>
            </div>
            <div>
              <div className="mt-[16vh]  text-center text-4xl font-semibold text-slate-7">
                US Stocks
              </div>
            </div>
            <div className="mt-[4vh] flex justify-center">
              <div>
                <MainBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
