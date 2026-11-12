"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

// Artwork: https://stickitupx.vercel.app/ (MIT, see public/stickers/LICENSE.txt).
const collection = [
  "pink-cat", "pip-coffee", "flower", "Spiral",
  "star", "Peace-hand", "nori-heart", "SparkleTrio",
];

const placements = [
  { side: "left", top: "12%", tilt: -14, offset: -12 },
  { side: "left", top: "43%", tilt: 10, offset: 18 },
  { side: "left", top: "75%", tilt: -8, offset: -6 },
  { side: "right", top: "19%", tilt: 12, offset: 10 },
  { side: "right", top: "51%", tilt: -12, offset: -16 },
  { side: "right", top: "80%", tilt: 8, offset: 6 },
] as const;

export function SideStickers() {
  const [stickers, setStickers] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle only after hydration; keep each visit's selection stable on rerenders.
    const shuffled = [...collection];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setStickers(shuffled.slice(0, placements.length));
  }, []);

  return (
    <div className="side-stickers" aria-hidden="true">
      {(["left", "right"] as const).map((side) => (
        <div key={side} className={`sticker-rail sticker-rail-${side}`}>
          {placements.map((placement, index) => (
            placement.side === side && stickers[index] ? (
              <Image
                key={index}
                src={`/stickers/${stickers[index]}.svg`}
                alt=""
                width={120}
                height={120}
                unoptimized
                draggable={false}
                className="side-sticker"
                style={{
                  top: placement.top,
                  "--sticker-tilt": `${placement.tilt}deg`,
                  "--sticker-offset": `${placement.offset}px`,
                } as CSSProperties}
              />
            ) : null
          ))}
        </div>
      ))}
    </div>
  );
}
