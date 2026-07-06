import React, { useState, useEffect } from "react";
import { Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const mono = Geist_Mono({ subsets: ["latin"] });

export default function PortfolioClock() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata", // Keeps it strictly locked to Indian Standard Time
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      setTime(formatter.format(new Date()));
    };

    // Run once immediately on mount, then interval takes over
    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    // Clean up interval on unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={cn(
        "flex items-center justify-center text-[10px] text-muted-foreground/50",
        mono.className,
      )}
    >
      <span>{time}</span>
    </div>
  );
}
