import { getProduct } from "@/lib/product";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

// Stripe calls this after every paid order. It turns the payment into a
// fulfilment order and forwards it to ORDER_WEBHOOK_URL (Zapier, Make, Slack,
// Google Sheets…) so you can place it with your supplier.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("STRIPE_WEBHOOK_SECRET is not set", { status: 500 });

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = await getStripe().webhooks.constructEventAsync(payload, signature, secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed" && event.data.object.payment_status === "paid") {
    const order = toFulfilmentOrder(event.data.object);
    console.log("New order to fulfil:", JSON.stringify(order));

    if (process.env.ORDER_WEBHOOK_URL) {
      const res = await fetch(process.env.ORDER_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      // A non-2xx reply makes Stripe retry the webhook later.
      if (!res.ok) return new Response("Order forward failed", { status: 502 });
    }
  }

  return Response.json({ received: true });
}

function toFulfilmentOrder(session: Stripe.Checkout.Session) {
  const shipping = session.collected_information?.shipping_details;

  // metadata.items looks like "handle:design,design;handle:design"
  const items = (session.metadata?.items ?? "")
    .split(";")
    .filter(Boolean)
    .flatMap((entry) => {
      const [handle, designs = ""] = entry.split(":");
      const product = getProduct(handle);
      return designs
        .split(",")
        .filter(Boolean)
        .map((id) => ({
          product: product?.name ?? handle,
          design: product?.designs.find((d) => d.id === id)?.label ?? id,
          qty: 1,
        }));
    });

  return {
    orderId: session.id,
    paidAt: new Date(session.created * 1000).toISOString(),
    total: (session.amount_total ?? 0) / 100,
    currency: session.currency,
    customer: {
      name: shipping?.name ?? session.customer_details?.name,
      email: session.customer_details?.email,
      phone: session.customer_details?.phone,
    },
    shipTo: shipping?.address,
    items,
    addOns: (session.metadata?.addOns ?? "").split(",").filter(Boolean),
  };
}
