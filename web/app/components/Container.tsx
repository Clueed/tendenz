import classNames from "classnames";
import React, { ReactNode } from "react";

function Container({
  children,
  className,
  type,
}: {
  children: ReactNode;
  type: "default";
  className?: string;
}) {
  return (
    <div
      className={classNames("grid [&>*]:col-[2_/_2]", className, {
        "grid-cols-[1fr_min(640px,_90vw)_1fr]": type === "default",
      })}
    >
      {children}
    </div>
  );
}

export default Container;
