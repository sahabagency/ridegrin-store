import { ContactForm } from "@/components/SignupForm";
import { store } from "@/lib/product";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-black">Contact us</h1>
      <p className="mt-2 text-neutral-600">
        Questions about your order or our masks? Send us a message, or email{" "}
        <strong>{store.supportEmail}</strong>. We reply within 24–48 hours.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
      {store.businessAddress && (
        <p className="mt-8 whitespace-pre-line text-sm text-neutral-500">
          {store.businessName}
          {"\n"}
          {store.businessAddress}
        </p>
      )}
    </section>
  );
}
