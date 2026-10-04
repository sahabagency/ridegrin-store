import Marquee from "@/components/Marquee";
import { featuredProduct as product, formatMoney, productPath } from "@/lib/product";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const from = Math.min(...product.bundles.map((b) => b.price / b.qty));

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:gap-12 md:py-16">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-neutral-100">
          <Image src={product.images[0]} alt={product.name} fill priority className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-black leading-tight md:text-6xl">{product.shortName}</h1>
          <ul className="flex flex-col gap-3 text-lg">
            {product.highlights.map((h) => (
              <li key={h.title}>
                <span className="mr-2">{h.icon}</span>
                <strong>{h.title}</strong> – {h.body}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <Link
              href={productPath(product)}
              className="rounded-xl bg-black px-8 py-4 text-center text-lg font-black uppercase tracking-wide text-white transition hover:bg-neutral-800"
            >
              Order now
            </Link>
            <p className="text-center text-sm text-neutral-500">
              From {formatMoney(from)} each · Free shipping
            </p>
          </div>
        </div>
      </section>

      <Marquee items={["😂 Funny design", "💨 Breathable", "🏍️ Fits under helmets", "🚚 Free shipping"]} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-3xl font-black md:text-4xl">Pick your face 😂</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {product.designs.map((d, i) => (
            <Link
              key={d.id}
              href={productPath(product)}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white"
            >
              <div className="relative aspect-square bg-neutral-100">
                <Image
                  src={product.images[(i + 1) % product.images.length]}
                  alt={d.label}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <p className="p-4 text-center font-bold">{d.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-neutral-200 p-6">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
