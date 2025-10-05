# contextual-ai-site
# Trip‑aware infotainment co‑pilot
A small project for KPIT Sparkle that recommends media and gives concise, safe assistance tailored to trip context (route type, time of day, trip duration, and recent behavior). The app shows transparent citations for every suggestion and keeps interactions glanceable for in‑vehicle use
# Problem statement
Build a context‑aware co‑pilot that enhances in‑car infotainment by combining retrieval‑augmented generation with lightweight rules and user context. Given a user query or a “quick suggest” action plus route, time, and recent selections, the system should return three grounded recommendations or a brief answer with clear source citations, fast enough for real‑time use and safe for drivers.

## KPIs
.Success targets for the demo and evaluations.
- Groundedness: ≥ 80% of answers cite at least one retrieved source relevant to the response.

- Latency: p95 end‑to‑end time to first complete answer ≤ 2.5 s.

- Engagement: ≥ 20% click‑through on recommendation cards during test sessions.

## Milestone checklist

- []Define context schema and sample payloads.

- []Seed catalog (≥150 items) and help snippets (≥30).

- []Build embeddings and index; implement hybrid retrieve(q, ctx).

- []Implement POST /api/query returning structured JSON with citations.

- []Add /api/health and /api/debug/trace; show health badge in UI.

- []Replace echo in UI; render three cards with reasons and citation popovers.

- []Logging: write per‑request JSONL/CSV with timings, scores, citations, fallback_used.

- []Eval: 40–60 prompt set; script outputs groundedness, accuracy@k, p95 latency to metrics.csv

- []Tune to hit KPIs; freeze config for demo.

- []Record a 60–90 s demo with two scenarios; link video and latest metrics