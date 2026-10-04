import { priceCart, type Cart } from "@/lib/cart";
import { store } from "@/lib/product";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Partial<Cart> | null;
  const cart = priceCart({
    lines: Array.isArray(body?.lines) ? body.lines : [],
    addOnIds: Array.isArray(body?.addOnIds) ? body.addOnIds : [],
  });
  if (!cart.lines.length) return Response.json({ error: "Your cart is empty." }, { status: 400 });

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    ...cart.lines.map((l) => ({
      quantity: 1,
      price_data: {
        currency: store.currency,
        unit_amount: l.price,
        product_data: {
          name: `${l.name} × ${l.qty}`,
          description: `Designs: ${l.designLabels.join(", ")}`,
        },
      },
    })),
    ...cart.addOns.map((a) => ({
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
    // Everything your supplier needs travels with the payment.
    // Format: "handle:design,design;handle:design" (Stripe allows 500 chars per value).
    metadata: {
      items: cart.lines.map((l) => `${l.handle}:${l.designs.join(",")}`).join(";").slice(0, 500),
      addOns: cart.addOns.map((a) => a.id).join(","),
    },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });

  return Response.json({ url: session.url });
}
