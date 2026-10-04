// Newsletter signups and contact messages. Each one is forwarded to
// FORMS_WEBHOOK_URL (Zapier, Make, Google Sheets, Slack…) if it's set.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const type = body?.type;
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if ((type !== "newsletter" && type !== "contact") || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const clean = (v: unknown) => (typeof v === "string" ? v.slice(0, 5000) : "");
  const entry =
    type === "newsletter"
      ? { type, email }
      : { type, email, name: clean(body?.name), order: clean(body?.order), message: clean(body?.message) };

  console.log("Form submission:", JSON.stringify(entry));

  if (process.env.FORMS_WEBHOOK_URL) {
    const res = await fetch(process.env.FORMS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...entry, receivedAt: new Date().toISOString() }),
    }).catch(() => null);
    if (!res?.ok) return Response.json({ error: "Couldn't save. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
