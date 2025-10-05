// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { postQuery, type QueryContext, getHealth } from "../lib/api";

type ApiResult = {
  answer: string;
  recommendations: { id: string; title: string; reason: string }[];
  citations: { id: string; title: string }[];
  timings: { totalMs: number };
};


export default function Home() {
  const [health, setHealth] = useState<string>("Checking API…");
  const [query, setQuery] = useState("suggest quick news");
  const [ctx, setCtx] = useState<QueryContext>({
    time_of_day: "morning",
    route_type: "city",
    trip_duration: 20,
  });
  const [res, setRes] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  getHealth()
    .then(j => setHealth(`API ok — index ${j.indexCount}, ${j.timeMs} ms`))
    .catch(() => setHealth("API offline"));
}, []);

  async function send() {
    setLoading(true);
    setError(null);
    try {
      const data: ApiResult = await postQuery(query, ctx);
      setRes(data);
    } catch (e: any) {
      setError(e?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.5 }}>
      <h1>Trip‑aware infotainment co‑pilot</h1>
      <p style={{ color: "#0a0" }}>{health}</p>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        <input
          style={{ gridColumn: "1 / span 4" }}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          value={ctx.time_of_day || ""}
          onChange={e => setCtx({ ...ctx, time_of_day: e.target.value || undefined })}
        >
          <option value="">any time</option>
          <option>morning</option>
          <option>afternoon</option>
          <option>evening</option>
          <option>night</option>
        </select>
        <select
          value={ctx.route_type || ""}
          onChange={e => setCtx({ ...ctx, route_type: e.target.value || undefined })}
        >
          <option value="">any route</option>
          <option>city</option>
          <option>highway</option>
        </select>
        <input
          type="number"
          placeholder="trip minutes"
          value={ctx.trip_duration ?? ""}
          onChange={e =>
            setCtx({ ...ctx, trip_duration: e.target.value ? Number(e.target.value) : undefined })
          }
        />
        <button onClick={send} disabled={loading}>
          {loading ? "Sending…" : "Send"}
        </button>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {res && (
        <>
          <h3>Answer</h3>
          <p>
            {res.answer} <small>({res.timings.totalMs} ms)</small>
          </p>

          <h3>Recommendations</h3>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}>
            {res.recommendations.map(r => (
              <div key={r.id} style={{ border: "1px solid #444", borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600 }}>{r.title}</div>
                <div style={{ fontSize: 13, opacity: 0.9 }}>{r.reason}</div>
              </div>
            ))}
          </div>

          <h3>Citations</h3>
          <ul>
            {res.citations.map(c => (
              <li key={c.id}>{c.title}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
