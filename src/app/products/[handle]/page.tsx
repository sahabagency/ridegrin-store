import BuyBox from "@/components/BuyBox";
import Gallery from "@/components/Gallery";
import Marquee from "@/components/Marquee";
import { getProduct, products } from "@/lib/product";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/products/[handle]">): Promise<Metadata> {
  const product = getProduct((await params).handle);
  return product ? { title: product.name, description: product.tagline } : {};
}

export default async function ProductPage({ params }: PageProps<"/products/[handle]">) {
  const product = getProduct((await params).handle);
  if (!product) notFound();

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2 md:gap-12 md:py-12">
        <Gallery images={product.images} alt={product.name} />
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-black leading-tight md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-neutral-600">{product.tagline}</p>
          </div>
          <BuyBox product={product} />
        </div>
      </section>

      <Marquee items={["😂 Funny design", "💨 Breathable", "🏍️ Fits under helmets", "🚚 Free shipping"]} />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-3xl font-black">{product.tagline} 😂</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="text-center text-2xl font-black">Questions</h2>
        <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
          {product.faq.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {f.q}
                <span className="text-xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-neutral-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
