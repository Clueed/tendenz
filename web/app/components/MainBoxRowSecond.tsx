"use client";
export function MainBoxRowSecond({
  dailyReturn,
  secondLastClose,
  lastClose,
}: {
  dailyReturn: string;
  secondLastClose: string;
  lastClose: string;
}) {
  return (
    <div className="flex justify-around gap-2 text-slate-12">
      <div className="flex flex-col p-2 text-right">
        <div className="text-xl">{secondLastClose}</div>
        <div className="text-xs leading-tight">day before yesterday</div>
        <div className="text-xs leading-tight text-slate-11">close price</div>
      </div>
      <div className="flex flex-col p-2 text-right">
        <div className="text-xl">{dailyReturn}</div>
        <div className="text-xs leading-tight">return</div>
      </div>
      <div className="flex flex-col p-2 text-right">
        <div className="text-xl">{lastClose}</div>
        <div className="text-xs leading-tight">yesterday</div>
        <div className="text-xs leading-tight text-slate-11">close price</div>
      </div>
    </div>
  );
}
