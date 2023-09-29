import { type SVGProps } from "react";
import { IconName } from "./output/name";

import React from "react";

export function Icon({
  name,
  sizeClassName = "h-[1em]",
  className,
  children,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  sizeClassName?: string;
}) {
  return (
    <svg
      {...props}
      fill="currentColor"
      className={
        "self-center aspect-square " +
        sizeClassName +
        (className ? " " + className : "")
      }
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
