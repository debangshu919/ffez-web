import * as React from "react";
import { cn } from "@/lib/utils";

interface CrosshairProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  type?: "plus" | "minus";
}

export function Crosshair({
  className,
  type = "plus",
  ...props
}: CrosshairProps) {
  return (
    <svg
      className={cn(
        "absolute h-3.5 w-3.5 text-muted-foreground/60 select-none pointer-events-none z-10",
        className
      )}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      {...props}
    >
      {type === "plus" ? (
        <path d="M7 1v12M1 7h12" />
      ) : (
        <path d="M1 7h12" />
      )}
    </svg>
  );
}
