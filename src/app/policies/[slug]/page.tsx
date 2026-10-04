import { getPolicy, policies } from "@/lib/policies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const policy = getPolicy((await params).slug);
  return policy ? { title: policy.title } : {};
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const policy = getPolicy((await params).slug);
  if (!policy) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-black">{policy.title}</h1>
      <div className="mt-8 flex flex-col gap-6">
        {policy.sections.map((s) => (
          <section key={s.h}>
            <h2 className="font-bold">{s.h}</h2>
            <p className="mt-1 text-neutral-700">{s.p}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
