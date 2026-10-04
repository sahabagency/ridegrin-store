import BuyBox from "@/components/BuyBox";
import Gallery from "@/components/Gallery";
import { product, store } from "@/lib/product";

export default function Home() {
  const marquee = ["😂 Funny designs", "💨 Breathable", "🏍️ Fits under helmets", "🚚 Free shipping"];

  return (
    <div className="bg-neutral-50 text-neutral-900">
      <div className="bg-black py-2 text-center text-sm font-semibold text-white">
        Free shipping on every order
      </div>

      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xl font-black tracking-tight">{store.name}</div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2 md:gap-12 md:py-12">
          <Gallery images={product.images} alt={product.name} />
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-3xl font-black leading-tight md:text-4xl">{product.name}</h1>
              <p className="mt-2 text-neutral-600">{product.tagline}</p>
            </div>
            <BuyBox />
          </div>
        </section>

        <div className="overflow-hidden border-y border-neutral-200 bg-yellow-300 py-3">
          <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-10 whitespace-nowrap font-bold">
            {[...marquee, ...marquee, ...marquee, ...marquee].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>

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
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} {store.name} · Questions? {store.supportEmail}
      </footer>
    </div>
  );
}
