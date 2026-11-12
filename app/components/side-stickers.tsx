"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

// Artwork: https://stickitupx.vercel.app/ (MIT, see public/stickers/LICENSE.txt).
const collection = [
  "pink-cat", "pip-coffee", "flower", "Spiral",
  "star", "Peace-hand", "nori-heart", "SparkleTrio",
];

type Sticker = {
  name: string;
  side: "left" | "right";
  top: number;
  left: number;
  tilt: number;
  scale: number;
};

export function SideStickers() {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    // Shuffle only after hydration; keep each visit's selection stable on rerenders.
    const shuffled = [...collection];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setStickers(shuffled.slice(0, 6).map((name, index) => ({
      name,
      side: index < 3 ? "left" : "right",
      // Separate vertical bands prevent the random scatter from bunching up.
      top: 12 + (index % 3) * 32 + Math.random() * 8,
      left: 22 + Math.random() * 56,
      tilt: Math.random() * 36 - 18,
      scale: 0.82 + Math.random() * 0.18,
    })));
  }, []);

  return (
    <div className="side-stickers" aria-hidden="true">
      {(["left", "right"] as const).map((side) => (
        <div key={side} className={`sticker-rail sticker-rail-${side}`}>
          {stickers.filter((sticker) => sticker.side === side).map((sticker) => (
              <Image
                key={sticker.name}
                src={`/stickers/${sticker.name}.svg`}
                alt=""
                width={120}
                height={120}
                unoptimized
                draggable={false}
                className="side-sticker"
                style={{
                  top: `clamp(80px, ${sticker.top}%, calc(100% - 80px))`,
                  left: `clamp(80px, ${sticker.left}%, calc(100% - 80px))`,
                  "--sticker-tilt": `${sticker.tilt}deg`,
                  "--sticker-scale": sticker.scale,
                } as CSSProperties}
              />
          ))}
        </div>
      ))}
    </div>
  );
}
