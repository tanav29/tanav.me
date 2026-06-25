import { cn } from "cnfast";
import { Instrument_Serif } from "next/font/google";

const serif = Instrument_Serif({
  weight: "400",
  style: "italic",
});

export default function HomeText() {
  return (
    <div className="flex justify-center items-end ml-2 -mb-1">
      <p
        className={cn(
          "text-4xl font-semibold text-(--text-muted) tracking-tight",
          serif.className,
        )}
      >
        Hi! I am
      </p>
      <div className="w-1.5" />
      <p className="text-4xl font-semibold text-(--text) tracking-tighter">
        Tanav
      </p>
    </div>
  );
}
