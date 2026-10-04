"use client";

import { useCart } from "@/components/cart/CartProvider";
import { formatMoney, type Product } from "@/lib/product";
import { useState } from "react";

export default function BuyBox({ product }: { product: Product }) {
  const cart = useCart();
  const popular = product.bundles.find((b) => b.badge === "Most popular") ?? product.bundles[0];
  const [bundleId, setBundleId] = useState(popular.id);
  const [designs, setDesigns] = useState<string[]>(() =>
    Array.from({ length: 10 }, (_, i) => product.designs[i % product.designs.length].id),
  );

  const bundle = product.bundles.find((b) => b.id === bundleId)!;

  function setDesign(index: number, id: string) {
    setDesigns((d) => d.map((v, i) => (i === index ? id : v)));
  }

  function addToCart() {
    cart.add({ handle: product.handle, bundleId, designs: designs.slice(0, bundle.qty) });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Choose a bundle">
        {product.bundles.map((b) => {
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
                    <span className="block text-sm text-green-700">You save {formatMoney(b.compareAt - b.price)}</span>
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

      <button
        type="button"
        onClick={addToCart}
        className="rounded-xl bg-black px-6 py-4 text-lg font-bold text-white transition hover:bg-neutral-800"
      >
        Add to cart · {formatMoney(bundle.price)}
      </button>
      <p className="text-center text-xs text-neutral-500">
        Free shipping · 30-day returns · Secure payment by Stripe
      </p>
    </div>
  );
}
