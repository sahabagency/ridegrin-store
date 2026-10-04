"use client";

import { useState } from "react";

// Email signup and contact form share one endpoint: /api/forms.
export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const email = new FormData(e.currentTarget).get("email");
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "newsletter", email }),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done") return <p className="font-semibold">You&apos;re in! Watch your inbox for new faces and offers.</p>;

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        className={`flex-1 rounded-xl border px-4 py-3 ${dark ? "border-white/30 bg-white/10 text-white placeholder:text-white/60" : "border-neutral-300 bg-white"}`}
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className={`rounded-xl px-6 py-3 font-bold disabled:opacity-60 ${dark ? "bg-yellow-300 text-black" : "bg-black text-white"}`}
      >
        {state === "sending" ? "Joining…" : "Join"}
      </button>
      {state === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
    </form>
  );
}

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact", ...data }),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-bold">Thanks! We got your message.</p>
        <p className="mt-1 text-sm text-neutral-600">We reply within 24–48 hours.</p>
      </div>
    );
  }

  const field = "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3";
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="Name" className={field} />
        <input name="email" type="email" required placeholder="Email" className={field} />
      </div>
      <input name="order" placeholder="Order number (optional)" className={field} />
      <textarea name="message" required rows={5} placeholder="How can we help?" className={field} />
      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-xl bg-black px-6 py-4 font-bold text-white disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
      {state === "error" && <p className="text-sm text-red-600">Something went wrong. Please email us instead.</p>}
    </form>
  );
}
