import { store } from "@/lib/product";

// Starting templates. Read them and adjust to how you actually run the store
// (delivery times, return window, your country's consumer law).
export const policies = [
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    sections: [
      { h: "Free shipping", p: "Every order ships free to the countries we deliver to. You'll see the available countries at checkout." },
      { h: "Processing time", p: "Orders are processed within 1–3 business days. Orders placed on weekends or holidays are processed the next business day." },
      { h: "Delivery time", p: "Delivery usually takes 7–15 business days after your order ships, depending on your location. Customs checks can occasionally add a few days." },
      { h: "Tracking", p: "As soon as your order ships we email you a tracking number. You can follow it any time on our Track Order page." },
      { h: "Priority shipping", p: "If you add Priority Shipping at checkout, your order is packed and handed to the carrier first." },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    sections: [
      { h: "30-day guarantee", p: "If your item arrives damaged, defective or isn't what you ordered, contact us within 30 days of delivery and we'll send a replacement or refund you." },
      { h: "How to request", p: `Email ${store.supportEmail} with your order number and a photo of the item. We reply within 24–48 hours.` },
      { h: "Lost packages", p: "If your tracking hasn't updated for 30 days, contact us. Orders with Shipping Protection are replaced or refunded at no cost if they're lost, stolen or damaged in transit." },
      { h: "Refund timing", p: "Approved refunds go back to your original payment method. Your bank may take 5–10 business days to show it." },
      { h: "Cancellations", p: "You can cancel within 12 hours of ordering, before your order ships. Email us with your order number." },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    sections: [
      { h: "What we collect", p: "When you order, we collect your name, email, phone number, and shipping address. Card details are handled by Stripe and never reach our servers." },
      { h: "How we use it", p: "We use your details to process and deliver your order, send order and shipping updates, provide customer support, and, if you subscribe, send offers you can unsubscribe from at any time." },
      { h: "Who we share it with", p: "We share only what's needed to fulfil your order: payment details with Stripe, and your name, address and phone number with our fulfilment and shipping partners." },
      { h: "Your rights", p: `You can ask us to see, correct or delete your personal data at any time by emailing ${store.supportEmail}.` },
      { h: "Cookies", p: "We use essential browser storage to keep your cart working. We don't sell your data." },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    sections: [
      { h: "About us", p: `This store is operated by ${store.businessName}. By placing an order you agree to these terms.` },
      { h: "Orders and pricing", p: "All prices are shown in US dollars and include free shipping. We may cancel and fully refund an order if a product is out of stock or a price was listed in error." },
      { h: "Payment", p: "Payments are processed securely by Stripe. Your order is confirmed once payment succeeds." },
      { h: "Product use", p: "Our face masks are novelty items. They are not protective equipment and don't replace a helmet or other safety gear." },
      { h: "Contact", p: `Questions about these terms? Email ${store.supportEmail}.` },
    ],
  },
];

export function getPolicy(slug: string) {
  return policies.find((p) => p.slug === slug);
}
