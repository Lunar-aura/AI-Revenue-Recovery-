"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Item = {
  question: string;
  answer: string;
};

const items: Item[] = [
  { question: "Who is AI Revenue Recovery built for?", answer: "It is designed for ecommerce operators, founders, and growth teams who want a clearer view of store performance and revenue recovery opportunities." },
  { question: "Does it integrate with Shopify or WooCommerce?", answer: "The UI is ready for a premium product experience, and the current build focuses on the front-end experience with placeholder content." },
  { question: "How quickly can I get value from the platform?", answer: "Most teams can understand their revenue risks and recommendations within the first few sessions thanks to the streamlined monitoring experience." },
  { question: "Is the dashboard suitable for teams?", answer: "Yes. The experience is built to support operators, founders, and marketers in making faster decisions across revenue performance." },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <div key={item.question} className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.18)]">
            <button className="flex w-full items-center justify-between gap-3 text-left" onClick={() => setOpenIndex(open ? null : index)}>
              <span className="font-semibold text-slate-900">{item.question}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open ? <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
