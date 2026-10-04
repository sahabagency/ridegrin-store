"use client";

import { useCart } from "@/components/cart/CartProvider";
import { addOns, featuredProduct, formatMoney, productPath } from "@/lib/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const cart = useCart();
  const { open, setOpen } = cart;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="text-lg font-black">Cart · {cart.count} {cart.count === 1 ? "item" : "items"}</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close cart" className="text-2xl leading-none">
            ×
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
            <p className="text-lg font-bold">Your cart is empty</p>
            <Link
              href={productPath(featuredProduct)}
              onClick={() => setOpen(false)}
              className="rounded-xl bg-black px-6 py-3 font-bold text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {cart.lines.map((l) => (
                  <li key={l.key} className="flex gap-3">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <Image src={l.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm font-bold">{l.name} × {l.qty}</p>
                      <p className="text-xs text-neutral-500">{l.designLabels.join(" · ")}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <button type="button" onClick={() => cart.remove(l.key)} className="text-xs text-neutral-500 underline">
                          Remove
                        </button>
                        <span className="text-sm">
                          <span className="mr-2 text-neutral-400 line-through">{formatMoney(l.compareAt)}</span>
                          <span className="font-bold">{formatMoney(l.price)}</span>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2">
                <p className="text-sm font-semibold text-neutral-700">Add to your order</p>
                {addOns.map((a) => (
                  <label
                    key={a.id}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-neutral-200 px-3 py-2.5"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={cart.cart.addOnIds.includes(a.id)}
                        onChange={(e) => cart.setAddOn(a.id, e.target.checked)}
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
              </div>
            </div>

            <div className="border-t border-neutral-200 px-5 py-4">
              {cart.savings > 0 && (
                <p className="mb-1 flex justify-between text-sm text-green-700">
                  <span>You save</span>
                  <span>{formatMoney(cart.savings)}</span>
                </p>
              )}
              <p className="mb-1 flex justify-between text-sm">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </p>
              <p className="mb-4 flex justify-between text-lg font-black">
                <span>Subtotal</span>
                <span>{formatMoney(cart.subtotal)}</span>
              </p>
              <button
                type="button"
                onClick={cart.checkout}
                disabled={cart.checkingOut}
                className="w-full rounded-xl bg-black px-6 py-4 text-lg font-bold text-white transition hover:bg-neutral-800 disabled:opacity-60"
              >
                {cart.checkingOut ? "Opening secure checkout…" : "Check out"}
              </button>
              {cart.error && <p className="mt-2 text-sm text-red-600">{cart.error}</p>}
              <p className="mt-2 text-center text-xs text-neutral-500">Secure payment by Stripe</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
