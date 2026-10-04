"use client";

import { addOns, bundles, formatMoney, product } from "@/lib/product";
import { useState } from "react";

export default function BuyBox() {
  const [bundleId, setBundleId] = useState("x2");
  const [designs, setDesigns] = useState<string[]>(["grin", "monster", "skull"]);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bundle = bundles.find((b) => b.id === bundleId)!;
  const extras = addOns.filter((a) => addOnIds.includes(a.id)).reduce((s, a) => s + a.price, 0);
  const total = bundle.price + extras;

  function setDesign(index: number, id: string) {
    setDesigns((d) => d.map((v, i) => (i === index ? id : v)));
  }

  function toggleAddOn(id: string) {
    setAddOnIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  async function checkout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleId, designs: designs.slice(0, bundle.qty), addOnIds }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed. Please try again.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Choose a bundle">
        {bundles.map((b) => {
          const selected = b.id === bundleId;
          return (
            <div
              key={b.id}
              className={`relative rounded-xl border-2 p-4 transition ${
                selected ? "border-black bg-yellow-50" : "border-neutral-200 bg-white"
              }`}
            >
              {b.badge && (
                <span className="absolute -top-3 right-4 rounded-full bg-black px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                  {b.badge}
                </span>
              )}
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setBundleId(b.id)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`grid size-5 place-items-center rounded-full border-2 ${
                      selected ? "border-black" : "border-neutral-400"
                    }`}
                  >
                    {selected && <span className="size-2.5 rounded-full bg-black" />}
                  </span>
                  <span>
                    <span className="block font-bold">{b.label} + Free shipping</span>
                    <span className="block text-sm text-green-700">
                      You save {formatMoney(b.compareAt - b.price)}
                    </span>
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-lg font-bold">{formatMoney(b.price)}</span>
                  <span className="block text-sm text-neutral-500 line-through">{formatMoney(b.compareAt)}</span>
                </span>
              </button>

              {selected && (
                <div className="mt-3 grid gap-2 border-t border-neutral-200 pt-3">
                  {Array.from({ length: b.qty }, (_, i) => (
                    <label key={i} className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium">#{i + 1} Design</span>
                      <select
                        value={designs[i]}
                        onChange={(e) => setDesign(i, e.target.value)}
                        className="rounded-md border border-neutral-300 bg-white px-2 py-1.5"
                      >
                        {product.designs.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold text-neutral-700">Add to your order</legend>
        {addOns.map((a) => (
          <label
            key={a.id}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3"
          >
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={addOnIds.includes(a.id)}
                onChange={() => toggleAddOn(a.id)}
                className="size-4 accent-black"
              />
              <span>
                <span className="block text-sm font-semibold">{a.name}</span>
                <span className="block text-xs text-neutral-500">{a.description}</span>
              </span>
            </span>
            <span className="text-sm font-semibold">{formatMoney(a.price)}</span>
          </label>
        ))}
      </fieldset>

      <button
        type="button"
        onClick={checkout}
        disabled={loading}
        className="rounded-xl bg-black px-6 py-4 text-lg font-bold text-white transition hover:bg-neutral-800 disabled:opacity-60"
      >
        {loading ? "Opening secure checkout…" : `Buy now · ${formatMoney(total)}`}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-center text-xs text-neutral-500">Secure payment by Stripe · Free shipping on every order</p>
    </div>
  );
}
