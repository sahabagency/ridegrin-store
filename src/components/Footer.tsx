import { NewsletterForm } from "@/components/SignupForm";
import { policies } from "@/lib/policies";
import { featuredProduct, productPath, store } from "@/lib/product";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <section className="bg-black px-4 py-14 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-black">Join the {store.name} crew</h2>
          <p className="text-white/70">Be the first to see new faces, drops and exclusive offers.</p>
          <NewsletterForm dark />
        </div>
      </section>
      <div className="border-t border-neutral-200 bg-white px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xl font-black">{store.name}</p>
            <p className="mt-2 text-neutral-500">Funny face masks for riders. Free shipping on every order.</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold uppercase tracking-wide">Shop</p>
            <Link href={productPath(featuredProduct)} className="text-neutral-600 hover:underline">{featuredProduct.shortName}</Link>
            <Link href="/collections/all" className="text-neutral-600 hover:underline">All products</Link>
            <Link href="/pages/track" className="text-neutral-600 hover:underline">Track your order</Link>
            <Link href="/pages/contact" className="text-neutral-600 hover:underline">Contact us</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold uppercase tracking-wide">Policies</p>
            {policies.map((p) => (
              <Link key={p.slug} href={`/policies/${p.slug}`} className="text-neutral-600 hover:underline">
                {p.title}
              </Link>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-xs text-neutral-400">
          © {new Date().getFullYear()} {store.name} · Payments secured by Stripe
        </p>
      </div>
    </footer>
  );
}
