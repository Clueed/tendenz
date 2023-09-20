import { type SVGProps } from "react";
import { type IconName } from "./output/name";
import React from "react";

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 */
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
