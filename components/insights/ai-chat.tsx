"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { chatWithAI } from "@/app/actions";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "Which customers are most at risk?",
  "Why is my revenue dropping?",
  "Which orders need attention?",
  "What should I do to recover revenue?",
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text?: string) {
    const question = text || input.trim();
    if (!question || loading) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);

    const history = messages.slice(-10).map((m) => ({ role: m.role, content: m.content }));
    const result = await chatWithAI(question, history);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: result.reply ?? "No response." },
    ]);
  }

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
        <div className="rounded-full bg-violet-600 p-2 text-white">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-950">AI Revenue Agent</h2>
          <p className="text-xs text-slate-500">Ask about revenue, customers, orders, and recovery.</p>
        </div>
      </div>

      <div className="max-h-[520px] overflow-y-auto px-6 py-4">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm font-medium text-slate-700">How can I help you recover revenue today?</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs text-slate-600 transition hover:border-violet-300 hover:text-violet-700"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`mb-4 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex max-w-[85%] gap-3 rounded-[14px] px-4 py-3 text-sm leading-6 ${
                m.role === "user"
                  ? "bg-violet-600 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-800"
              }`}
            >
              {m.role === "assistant" ? <Bot className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" /> : <User className="mt-0.5 h-4 w-4 shrink-0 text-white" />}
              <span>{m.content}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="mb-4 flex justify-start">
            <div className="flex gap-3 rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <Bot className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
              <span className="animate-pulse">Analyzing your data...</span>
            </div>
          </div>
        )}

        {error && (
          <p className="mb-4 rounded-[10px] bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">{error}</p>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-slate-200 px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your revenue, orders, or customers..."
            className="block w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-100"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-violet-600 text-white transition hover:bg-violet-700 disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
