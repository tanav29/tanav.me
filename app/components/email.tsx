"use client";

import { CircleCheck, MailIcon } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Email() {
  const [click, setClick] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("hey@tanav.me");
      setClick(true);

      setTimeout(() => setClick(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy email address"
            className="cursor-pointer active:scale-[0.97] hover:scale-105 transition"
          >
            <div className="group flex gap-2 items-center">
              <span className="relative w-5 h-5 text-neutral-600 dark:text-neutral-400">
                <CircleCheck
                  aria-hidden="true"
                  className={
                    "absolute inset-0 w-5 h-5 transition-all duration-150 ease-out " +
                    (click ? "opacity-100" : "opacity-0")
                  }
                />
                <MailIcon
                  aria-hidden="true"
                  className={
                    "absolute inset-0 w-5 h-5 transition-all duration-150 ease-out " +
                    (click ? "opacity-0" : "opacity-100")
                  }
                />
              </span>
            </div>
          </button>
        }
      />

      <TooltipContent side="bottom">
        <p>hey@tanav.me</p>
      </TooltipContent>
    </Tooltip>
  );
}
