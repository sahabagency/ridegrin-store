import { formatMoney, productPath, products } from "@/lib/product";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "All products" };

export default function AllProducts() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-black">All products</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const cheapest = p.bundles[0];
          return (
            <Link key={p.handle} href={productPath(p)} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="relative aspect-square bg-neutral-100">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover transition group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="p-4">
                <p className="font-bold">{p.name}</p>
                <p className="mt-1">
                  <span className="font-bold">{formatMoney(cheapest.price)}</span>
                  <span className="ml-2 text-sm text-neutral-400 line-through">{formatMoney(cheapest.compareAt)}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
