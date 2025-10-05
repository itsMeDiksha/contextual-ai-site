// my-app/app/chat/page.tsx
"use client";
import { useState } from "react";
import { postQuery, type QueryContext } from "../../lib/api";



type ChatMsg = { role: "user" | "assistant"; text: string };

export default function ChatPage() {
  const [ctx, setCtx] = useState<QueryContext>({ time_of_day: "morning", route_type: "city", trip_duration: 20 });
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "assistant", text: "Hi! Ask for news, music, or tips for the trip." },
  ]);
  const [sending, setSending] = useState(false);

  async function send() {
    const q = input.trim();
    if (!q) return;
    setMsgs(m => [...m, { role: "user", text: q }]);
    setInput("");
    setSending(true);
    try {
      const res = await postQuery(q, ctx);
      const recLines = res.recommendations.map((r: any, i: number) => `${i + 1}. ${r.title} — ${r.reason}`).join("\n");
      const text = `${res.answer}\n\n${recLines}`;
      setMsgs(m => [...m, { role: "assistant", text }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>Trip chat</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <select value={ctx.time_of_day || ""} onChange={e => setCtx({ ...ctx, time_of_day: e.target.value || undefined })}>
          <option value="">any time</option><option>morning</option><option>afternoon</option><option>evening</option><option>night</option>
        </select>
        <select value={ctx.route_type || ""} onChange={e => setCtx({ ...ctx, route_type: e.target.value || undefined })}>
          <option value="">any route</option><option>city</option><option>highway</option>
        </select>
        <input type="number" placeholder="minutes" value={ctx.trip_duration ?? ""} onChange={e => setCtx({ ...ctx, trip_duration: e.target.value ? Number(e.target.value) : undefined })} />
      </div>

      <div style={{ border: "1px solid #444", borderRadius: 8, padding: 12, minHeight: 300, marginBottom: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ whiteSpace: "pre-wrap", margin: "8px 0", color: m.role === "assistant" ? "#0a0" : "#ccc" }}>
            <b>{m.role === "assistant" ? "Assistant:" : "User:"}</b> {m.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input style={{ flex: 1 }} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button onClick={send} disabled={sending}>{sending ? "Sending…" : "Send"}</button>
      </div>
    </main>
  );
}
