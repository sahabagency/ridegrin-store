import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set. Copy .env.example to .env.local and add your key.");
  }
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}
