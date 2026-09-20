import { cn } from "cnfast";
import { Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({
  weight: "400",
  style: "italic",
});

export default function HomeText() {
  return (
      <span
        className={cn(
          "text-3xl font-semibold text-(--text-muted) tracking-tight flex justify-center items-end ml-0 -mb-1",
          serif.className,
        )}>
        Hi! I am Tanav
      </span>
  );
}
