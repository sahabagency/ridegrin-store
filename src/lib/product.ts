// Everything about the product lives here. Edit this file to change the store.
// Prices are in cents (2999 = $29.99). The server reads prices from this file,
// never from the browser, so customers can't change what they pay.

export const store = {
  name: "RideGrin",
  currency: "usd",
  // Countries you ship to (ISO codes). Stripe shows only these at checkout.
  shipTo: ["US", "CA", "GB", "AU", "SA", "AE", "KW", "QA", "BH", "OM"] as const,
  supportEmail: "support@example.com",
};

export const product = {
  id: "rider-face-mask",
  name: "RideGrin Funny Rider Face Mask",
  tagline: "Turn every ride into a laugh",
  // Put your supplier's product photos in /public/products and list them here.
  images: [
    "/products/placeholder-1.svg",
    "/products/placeholder-2.svg",
    "/products/placeholder-3.svg",
  ],
  designs: [
    { id: "grin", label: "Big Grin" },
    { id: "monster", label: "Monster" },
    { id: "skull", label: "Skull" },
  ],
  features: [
    { icon: "😂", title: "Instant reactions", body: "Turn heads and get laughs everywhere you ride." },
    { icon: "🏍️", title: "Made for riders", body: "Fits comfortably under your motorcycle helmet." },
    { icon: "💨", title: "Light and breathable", body: "Stay comfortable without feeling bulky." },
    { icon: "🎭", title: "Pick your personality", body: "Three designs. Mix and match in a bundle." },
  ],
  faq: [
    { q: "How long does shipping take?", a: "Orders ship within 1–3 business days. Delivery usually takes 7–15 business days, depending on your country." },
    { q: "Will it fit under my helmet?", a: "Yes. It's thin, stretchy fabric designed to sit under full-face and open-face helmets." },
    { q: "Can I return it?", a: "If it arrives damaged or isn't right, contact us within 30 days of delivery." },
  ],
};

export type Bundle = {
  id: string;
  qty: number;
  price: number;
  compareAt: number;
  label: string;
  badge?: string;
};

export const bundles: Bundle[] = [
  { id: "x1", qty: 1, price: 2999, compareAt: 4599, label: "Buy 1" },
  { id: "x2", qty: 2, price: 5398, compareAt: 9198, label: "Buy 2", badge: "Most popular" },
  { id: "x3", qty: 3, price: 7198, compareAt: 13797, label: "Buy 3", badge: "Best value" },
];

export type AddOn = { id: string; name: string; description: string; price: number };

export const addOns: AddOn[] = [
  { id: "warranty", name: "30-day warranty", description: "Free replacement if anything goes wrong.", price: 499 },
  { id: "priority", name: "Priority shipping", description: "Your order is packed and shipped first.", price: 399 },
  { id: "protection", name: "Shipping protection", description: "Covers lost, stolen or damaged packages.", price: 499 },
];

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: store.currency.toUpperCase(),
  }).format(cents / 100);
}
