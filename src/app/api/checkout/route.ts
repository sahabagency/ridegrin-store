import { addOns, bundles, product, store } from "@/lib/product";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

type Body = { bundleId?: string; designs?: string[]; addOnIds?: string[] };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;

  const bundle = bundles.find((b) => b.id === body.bundleId);
  if (!bundle) return Response.json({ error: "Pick a bundle." }, { status: 400 });

  const designIds = new Set(product.designs.map((d) => d.id));
  const designs = (body.designs ?? []).slice(0, bundle.qty);
  if (designs.length !== bundle.qty || !designs.every((d) => designIds.has(d))) {
    return Response.json({ error: "Pick a design for each mask." }, { status: 400 });
  }

  const chosenAddOns = addOns.filter((a) => body.addOnIds?.includes(a.id));
  const designLabels = designs.map((id) => product.designs.find((d) => d.id === id)!.label);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: store.currency,
        unit_amount: bundle.price,
        product_data: {
          name: `${product.name} × ${bundle.qty}`,
          description: `Designs: ${designLabels.join(", ")}`,
        },
      },
    },
    ...chosenAddOns.map((a) => ({
      quantity: 1,
      price_data: {
        currency: store.currency,
        unit_amount: a.price,
        product_data: { name: a.name },
      },
    })),
  ];

  const origin = new URL(request.url).origin;
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: [...store.shipTo] },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Free shipping",
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: store.currency },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 7 },
            maximum: { unit: "business_day", value: 15 },
          },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    // Everything your supplier needs to fulfil the order travels with the payment.
    metadata: {
      bundle: bundle.id,
      qty: String(bundle.qty),
      designs: designs.join(","),
      addOns: chosenAddOns.map((a) => a.id).join(","),
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });

  return Response.json({ url: session.url });
}
