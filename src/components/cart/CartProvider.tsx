"use client";

import { priceCart, type Cart, type CartLine } from "@/lib/cart";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ridegrin-cart";

type CartContext = ReturnType<typeof priceCart> & {
  cart: Cart;
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (line: Omit<CartLine, "key">) => void;
  remove: (key: string) => void;
  clear: () => void;
  setAddOn: (id: string, on: boolean) => void;
  checkout: () => Promise<void>;
  checkingOut: boolean;
  error: string;
};

const Ctx = createContext<CartContext | null>(null);

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ lines: [], addOnIds: [] });
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring from storage after hydration
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, loaded]);

  const add = useCallback((line: Omit<CartLine, "key">) => {
    setCart((c) => ({ ...c, lines: [...c.lines, { ...line, key: crypto.randomUUID() }] }));
    setOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setCart((c) => ({ ...c, lines: c.lines.filter((l) => l.key !== key) }));
  }, []);

  const clear = useCallback(() => {
    // Remove the saved copy too: this can run before the restore effect above.
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setCart({ lines: [], addOnIds: [] });
  }, []);

  const setAddOn = useCallback((id: string, on: boolean) => {
    setCart((c) => ({
      ...c,
      addOnIds: on ? [...new Set([...c.addOnIds, id])] : c.addOnIds.filter((x) => x !== id),
    }));
  }, []);

  const checkout = useCallback(async () => {
    setCheckingOut(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed. Please try again.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed. Please try again.");
      setCheckingOut(false);
    }
  }, [cart]);

  const value = useMemo(() => {
    const priced = priceCart(cart);
    return {
      ...priced,
      cart,
      count: priced.lines.reduce((s, l) => s + l.qty, 0),
      open,
      setOpen,
      add,
      remove,
      clear,
      setAddOn,
      checkout,
      checkingOut,
      error,
    };
  }, [cart, open, add, remove, clear, setAddOn, checkout, checkingOut, error]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
