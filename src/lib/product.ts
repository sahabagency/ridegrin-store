// Everything about the store lives here. Edit this file to change it.
// Prices are in cents (2999 = $29.99). The server reads prices from this file,
// never from the browser, so customers can't change what they pay.

export const store = {
  name: "RideGrin",
  currency: "usd",
  announcement: "Free shipping on every order · Save up to 47% with bundles",
  // Countries you ship to (ISO codes). Stripe shows only these at checkout.
  shipTo: ["US", "CA", "GB", "AU", "SA", "AE", "KW", "QA", "BH", "OM"] as const,
  supportEmail: "support@example.com",
  // Shown on the contact page and in the policies. Fill in your real details.
  businessName: "RideGrin",
  businessAddress: "",
};

export type Bundle = {
  id: string;
  qty: number;
  price: number;
  compareAt: number;
  label: string;
  badge?: string;
};

export type Product = {
  handle: string;
  name: string;
  shortName: string;
  tagline: string;
  // Photos live in /public/products. The first one is the main image.
  images: string[];
  designs: { id: string; label: string }[];
  bundles: Bundle[];
  highlights: { icon: string; title: string; body: string }[];
  features: { icon: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
};

// To sell another product (your own designs, for example), copy this object,
// give it a new handle, and add it to the list. It gets its own page and
// shows up in the shop automatically.
export const products: Product[] = [
  {
    handle: "funny-face-mask",
    name: "RideGrin Funny Old Man Face Mask",
    shortName: "Funny Face Mask",
    tagline: "Turn every ride into a laugh",
    images: [
      "/products/toothless-2.jpg",
      "/products/mustache-1.jpg",
      "/products/smoker-1.jpg",
      "/products/toothless-1.jpg",
      "/products/mustache-2.jpg",
    ],
    designs: [
      { id: "toothless", label: "Toothless Grin" },
      { id: "mustache", label: "Grandpa Mustache" },
      { id: "smoker", label: "Grumpy Smoker" },
    ],
    bundles: [
      { id: "x1", qty: 1, price: 2999, compareAt: 4599, label: "Buy 1" },
      { id: "x2", qty: 2, price: 5398, compareAt: 9198, label: "Buy 2", badge: "Most popular" },
      { id: "x3", qty: 3, price: 7198, compareAt: 13797, label: "Buy 3", badge: "Best value" },
    ],
    highlights: [
      { icon: "😂", title: "Funny and eye-catching", body: "Guaranteed to get reactions" },
      { icon: "🏍️", title: "Fits under your helmet", body: "Made for every ride" },
      { icon: "💨", title: "Breathable and lightweight", body: "Comfortable on the road" },
      { icon: "🎭", title: "3 hilarious faces", body: "Pick your favourite" },
    ],
    features: [
      { icon: "😂", title: "Instant reactions", body: "Turn heads and get laughs everywhere you ride." },
      { icon: "🏍️", title: "Made for riders", body: "Fits comfortably under your motorcycle helmet." },
      { icon: "💨", title: "Light and breathable", body: "Stay comfortable without feeling bulky." },
      { icon: "🎭", title: "Pick your personality", body: "Three realistic old-man faces. Mix and match in a bundle." },
    ],
    faq: [
      { q: "How long does shipping take?", a: "Orders ship within 1–3 business days. Delivery usually takes 7–15 business days, depending on your country." },
      { q: "Will it fit under my helmet?", a: "Yes. It's thin, stretchy polyester that sits under full-face and open-face helmets, and works with goggles." },
      { q: "Can I return it?", a: "If it arrives damaged or isn't right, contact us within 30 days of delivery." },
    ],
  },
];

export type AddOn = { id: string; name: string; description: string; price: number };

export const addOns: AddOn[] = [
  { id: "warranty", name: "30-day warranty", description: "Free replacement if anything goes wrong.", price: 499 },
  { id: "priority", name: "Priority shipping", description: "Your order is packed and shipped first.", price: 399 },
  { id: "protection", name: "Shipping protection", description: "Covers lost, stolen or damaged packages.", price: 499 },
];

export const featuredProduct = products[0];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export function productPath(p: Product) {
  return `/products/${p.handle}`;
}

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: store.currency.toUpperCase(),
  }).format(cents / 100);
}
