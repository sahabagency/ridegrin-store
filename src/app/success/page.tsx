import ClearCart from "@/components/cart/ClearCart";
import { store } from "@/lib/product";
import { getStripe } from "@/lib/stripe";
import Link from "next/link";

export default async function Success({ searchParams }: PageProps<"/success">) {
  const { session_id } = await searchParams;
  let email: string | null | undefined;
  if (typeof session_id === "string") {
    const session = await getStripe().checkout.sessions.retrieve(session_id).catch(() => null);
    email = session?.customer_details?.email;
  }

  return (
    <section className="mx-auto flex max-w-lg flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <ClearCart />
      <div className="text-5xl">🎉</div>
      <h1 className="text-3xl font-black">Thanks for your order!</h1>
      <p className="text-neutral-600">
        {email ? `A receipt is on its way to ${email}.` : "A receipt is on its way to your email."} We&apos;ll email you
        tracking as soon as your order ships.
      </p>
      <p className="text-sm text-neutral-500">Questions? {store.supportEmail}</p>
      <Link href="/" className="mt-4 rounded-xl bg-black px-6 py-3 font-bold text-white">
        Back to store
      </Link>
    </section>
  );
}
