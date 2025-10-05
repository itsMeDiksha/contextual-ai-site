export type QueryContext = {
  time_of_day?: string;
  route_type?: string;
  trip_duration?: number;
  last_played?: string;
};

const base = process.env.NEXT_PUBLIC_API_URL || "";
export async function getHealth() {
  const r = await fetch(base + "/api/health");
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}
export async function postQuery(query: string, context: QueryContext) {
  const r = await fetch(base + "/api/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, context })
  });
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
}


