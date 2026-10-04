"use client";

import { useCart } from "@/components/cart/CartProvider";
import { featuredProduct, productPath, store } from "@/lib/product";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: productPath(featuredProduct), label: "Shop" },
  { href: "/pages/track", label: "Track order" },
  { href: "/pages/contact", label: "Contact" },
];

export default function Header() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="bg-black px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
        {store.announcement}
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="text-2xl md:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <Link href="/" className="text-2xl font-black tracking-tight">
          {store.name}
        </Link>
        <nav className="hidden gap-8 text-sm font-bold uppercase tracking-wide md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:underline">
              {n.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={() => setOpen(true)} aria-label="Open cart" className="relative text-2xl">
          🛒
          {count > 0 && (
            <span className="absolute -right-2 -top-1 grid size-5 place-items-center rounded-full bg-black text-[11px] font-bold text-white">
              {count}
            </span>
          )}
        </button>
      </div>
      {menuOpen && (
        <nav className="flex flex-col border-t border-neutral-200 px-4 py-2 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-bold uppercase tracking-wide"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
