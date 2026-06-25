"use client";

import * as React from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function FeedbackButton() {
  const [open, setOpen] = React.useState(false);

  const [rating, setRating] = React.useState(0);

  const [hover, setHover] = React.useState(0);

  const [text, setText] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);

  const maxLen = 255;

  async function handleSubmit() {
    setLoading(true);

    setStatusMessage(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ rating, text }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json?.error || "failed");

      setStatusMessage("Thanks — your feedback was saved");

      // reset UX after success
      setOpen(false);

      setRating(0);

      setHover(0);

      setText("");
    } catch (err) {
      console.error("feedback submit error", err);

      setStatusMessage("Could not send feedback. Please try again later.");
    } finally {
      setLoading(false);

      // clear transient status after a short delay
      setTimeout(() => setStatusMessage(null), 3500);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger render={<Button variant="link">Feedback</Button>} />

      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Send feedback</DialogTitle>
          <DialogDescription>
            Rate your experience and leave a short message (max {maxLen}{" "}
            characters).
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">Rating</p>
            <div
              className="flex items-center gap-1"
              role="group"
              aria-label="Rating"
            >
              {[1, 2, 3, 4, 5].map((i) => {
                const filled = hover ? i <= hover : i <= rating;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Rate ${i} out of 5 stars`}
                    aria-pressed={rating === i}
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    className={`rounded p-1 text-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60`}
                  >
                    <Star
                      aria-hidden="true"
                      className={`size-5 ${filled ? "fill-amber-400 text-amber-500" : "text-amber-300"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="feedback-text"
              className="mb-1 block text-sm font-medium"
            >
              Feedback (optional)
            </label>
            <textarea
              id="feedback-text"
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= maxLen) setText(e.target.value);
              }}
              rows={4}
              placeholder="What could be improved or what you liked..."
              className="w-full resize-none rounded border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            />
            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
              <div>{rating ? `${rating} / 5` : "No rating"}</div>
              <div>
                {text.length} / {maxLen}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <div className="flex w-full items-center justify-between gap-2">
            {statusMessage ? (
              <div className="text-sm text-muted-foreground" aria-live="polite">
                {statusMessage}
              </div>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={rating === 0 || loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
