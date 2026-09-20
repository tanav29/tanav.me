"use client";

import * as React from "react";
import { Check } from "lucide-react";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "error";

export function Subscribe() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const [celebrate, setCelebrate] = React.useState(false);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json?.error || "Something went wrong");

      // Already on the list -> surface as an error, no celebration.
      if (json.already) {
        setStatus("error");
        setError("You're already subscribed.");
        return;
      }

      // New subscriber -> celebrate 🎉
      setSubscribed(true);
      setCelebrate(true);
      setEmail("");
      setStatus("idle");
    } catch (err) {
      console.error("subscribe error", err);
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Could not subscribe. Please try again later.",
      );
    }
  }

  return (
    <section
      aria-labelledby="subscribe-heading"
      className="mt-6 px-4 pt-8 pb-2 sm:px-6"
    >
      {celebrate && size.width > 0 ? (
        <Confetti
          width={size.width}
          height={size.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.25}
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 100,
          }}
          onConfettiComplete={(confetti) => {
            setCelebrate(false);
            confetti?.reset();
          }}
        />
      ) : null}

      <div className="flex flex-col gap-1.5">
        <h2
          id="subscribe-heading"
          className="text-lg font-semibold text-(--text)"
        >
          Subscribe
        </h2>
        <p className="max-w-prose text-sm text-(--text-muted)">
          Get an email when I ship a new project or publish a blog post. No
          spam, unsubscribe anytime.
        </p>
      </div>

      {subscribed ? (
        <div
          aria-live="polite"
          className="mt-4 flex items-center gap-2 text-sm text-(--text)"
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-(--text) text-(--bg)">
            <Check aria-hidden="true" className="size-3" strokeWidth={3} />
          </span>
          You&apos;re in. I&apos;ll be in touch.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center"
        >
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            aria-invalid={status === "error"}
            disabled={status === "loading"}
            className="w-full rounded-lg border border-(--border) bg-transparent px-3 py-2 text-sm text-(--text) outline-none placeholder:text-(--text-muted) focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-50 sm:max-w-xs"
          />
          <Button type="submit" size="lg" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </Button>
        </form>
      )}

      {status === "error" && error ? (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </section>
  );
}
