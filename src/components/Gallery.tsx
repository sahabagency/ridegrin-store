"use client";

import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <Image src={images[active]} alt={alt} fill priority className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
              i === active ? "border-black" : "border-transparent"
            }`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
