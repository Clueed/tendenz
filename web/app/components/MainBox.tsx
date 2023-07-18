import { AiOutlineLink } from "react-icons/ai";
import { SigmaUsStocksYesterday } from "../page";
import MainBoxRow from "./MainBoxRow";

export default function MainBox({ data }: { data: SigmaUsStocksYesterday[] }) {
  return (
    <div className="max-w-md w-[90vw] m-3">
      <div className="rounded-md grid grid-cols-[0.3fr_0.5fr_1fr_0.4fr_0.2fr] bg-[#fff] py-3 px-4 gap-x-1.5 gap-y-3 shadow-md">
        {data.map((entry) => (
          <MainBoxRow entry={entry} />
        ))}
      </div>
    </div>
  );
}
