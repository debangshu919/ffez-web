import { cn } from "@/lib/utils";
import { Crosshair } from "@/components/crosshair";

interface DiagonalHatchProps {
  className?: string;
  showTopCrosshairs?: boolean;
  showBottomCrosshairs?: boolean;
}

export function DiagonalHatch({
  className,
  showTopCrosshairs = false,
  showBottomCrosshairs = false,
}: DiagonalHatchProps) {
  return (
    <div className={cn("w-full border-b border-border bg-background relative", className)}>
      <div className="mx-auto max-w-6xl relative border-x border-border h-9 sm:h-10">
        <div className="w-full h-full bg-diagonal-hatch" />
        {showTopCrosshairs && (
          <>
            <Crosshair type="minus" className="-top-[7px] -left-[7px]" />
            <Crosshair type="minus" className="-top-[7px] -right-[7px]" />
          </>
        )}
        {showBottomCrosshairs && (
          <>
            <Crosshair type="plus" className="-bottom-[7px] -left-[7px]" />
            <Crosshair type="plus" className="-bottom-[7px] -right-[7px]" />
          </>
        )}
      </div>
    </div>
  );
}
