"use client";
import { useState } from "react";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    setAnswer("Thinking...");

    try {
      const base = "/contextual-ai-site";
      const res = await fetch(`${base}/api/query`, { method: "GET" });
      if (!res.ok) {
        setAnswer(`Request failed: ${res.status}`);
        return;
      }
      const json = await res.json();
      // Echo the user input on the client to simulate a tailored reply
      setAnswer(
        text.trim()
          ? `${json.reply} You asked: "${text.trim()}".`
          : json.reply
      );
    } catch {
      setAnswer("Network error");
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>Contextual AI Chat</h1>
      <form onSubmit={ask} style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask something…"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Ask</button>
      </form>
      <pre style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>{answer}</pre>
    </main>
  );
}
