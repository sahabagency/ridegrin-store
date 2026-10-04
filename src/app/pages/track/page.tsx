"use client";

import { useState } from "react";

// Opens the tracking number on 17TRACK, which supports the carriers most
// dropshipping suppliers use (YunExpress, Yanwen, 4PX, China Post…).
export default function Track() {
  const [number, setNumber] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = number.trim();
    if (n) window.open(`https://t.17track.net/en#nums=${encodeURIComponent(n)}`, "_blank", "noopener");
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-12 text-center">
      <h1 className="text-3xl font-black">Track your order</h1>
      <p className="mt-2 text-neutral-600">
        Enter the tracking number from your shipping email. It can take 2–5 days after shipping for tracking to show
        updates.
      </p>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          placeholder="Tracking number"
          className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-3"
        />
        <button type="submit" className="rounded-xl bg-black px-6 py-3 font-bold text-white">
          Track
        </button>
      </form>
    </section>
  );
}
