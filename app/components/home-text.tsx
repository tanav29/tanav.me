import { cn } from "cnfast";
import { Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({
  weight: "400",
  style: "italic",
});

export default function HomeText() {
  return (
    <h1 className="flex justify-center items-end ml-0 -mb-1">
      <span
        className={cn(
          "text-4xl font-semibold text-(--text-muted) tracking-tight",
          serif.className,
        )}>
        Hi! I am
      </span>
      <div className="w-1.5" />
      <span className="text-4xl font-semibold text-(--text) tracking-tighter">
        Tanav
      </span>
    </h1>
  );
}
