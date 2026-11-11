import { cn } from "@/lib/utils";

export function DiagonalHatch({ className }: { className?: string }) {
  return (
    <div className={cn("w-full border-b border-border bg-background relative", className)}>
      <div className="mx-auto max-w-6xl relative border-x border-border h-9 sm:h-10">
        <div className="w-full h-full bg-diagonal-hatch" />
      </div>
    </div>
  );
}
