import { addOns, getProduct } from "@/lib/product";

export type CartLine = { key: string; handle: string; bundleId: string; designs: string[] };
export type Cart = { lines: CartLine[]; addOnIds: string[] };

export type PricedLine = CartLine & {
  name: string;
  image: string;
  qty: number;
  price: number;
  compareAt: number;
  designLabels: string[];
};

// Turns what the browser sent into trusted, priced lines. Anything that
// doesn't match the catalog is dropped. Used by both the cart UI and checkout.
export function priceCart(cart: Cart) {
  const lines: PricedLine[] = [];
  for (const line of cart.lines) {
    const product = getProduct(line.handle);
    const bundle = product?.bundles.find((b) => b.id === line.bundleId);
    if (!product || !bundle) continue;
    const designs = line.designs.slice(0, bundle.qty);
    const labels = designs.map((id) => product.designs.find((d) => d.id === id)?.label);
    if (designs.length !== bundle.qty || labels.some((l) => !l)) continue;
    lines.push({
      ...line,
      designs,
      name: product.name,
      image: product.images[0],
      qty: bundle.qty,
      price: bundle.price,
      compareAt: bundle.compareAt,
      designLabels: labels as string[],
    });
  }
  const chosenAddOns = lines.length ? addOns.filter((a) => cart.addOnIds.includes(a.id)) : [];
  const subtotal = lines.reduce((s, l) => s + l.price, 0) + chosenAddOns.reduce((s, a) => s + a.price, 0);
  const savings = lines.reduce((s, l) => s + l.compareAt - l.price, 0);
  return { lines, addOns: chosenAddOns, subtotal, savings };
}
