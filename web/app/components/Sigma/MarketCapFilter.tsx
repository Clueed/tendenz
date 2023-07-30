import React, { Dispatch, SetStateAction } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import classNames from "classnames";

export default function MarketCapFilter<T extends string[]>({
  selectedKey,
  selectKey,
  allKeys,
}: {
  selectedKey: T[number];
  selectKey: Dispatch<SetStateAction<T[number]>>;
  allKeys: T;
}) {
  return (
    <ToggleGroup.Root
      type="single"
      value={selectedKey}
      onValueChange={(newKey) => {
        if (allKeys.includes(newKey)) {
          selectKey(newKey);
        }
      }}
      asChild
    >
      <div className="inline-flex text-xs rounded-md overflow-clip bg-slate-a2 text-slate-11">
        {allKeys.map((key) => (
          <ToggleGroup.Item
            key={key}
            value={key}
            className={classNames(
              "px-2 py-1  transition-all",
              {
                "hover:bg-slate-a5 hover:text-slate-12": key !== selectedKey,
              },
              {
                "text-slate-1 bg-slate-a8 font-semibold": key === selectedKey,
              }
            )}
          >
            {key}
          </ToggleGroup.Item>
        ))}
      </div>
    </ToggleGroup.Root>
  );
}
