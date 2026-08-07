import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/landing/button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(124,92,252,0.16),_transparent_55%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
            AI revenue recovery for modern stores
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Recover lost ecommerce revenue before it impacts your business.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            AI Revenue Recovery continuously monitors your store to uncover revenue leaks, explain the cause, and suggest actions that actually move the needle.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary">Start Free</Button>
            <Button variant="secondary">
              <PlayCircle className="h-4 w-4" />
              View Demo
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
            <div><span className="font-semibold text-slate-900">4.9/5</span> from product teams</div>
            <div><span className="font-semibold text-slate-900">24/7</span> monitoring</div>
            <div><span className="font-semibold text-slate-900">+18%</span> average recovery uplift</div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-3">
              <div className="rounded-[20px] border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Revenue recovery overview</p>
                    <p className="text-sm text-slate-500">Signals detected today</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">Live</div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[{ title: "Revenue at risk", value: "$24.8K" }, { title: "Checkout issues", value: "12" }, { title: "AI actions", value: "7" }, { title: "Recovery uplift", value: "2.1%" }].map((item) => (
                    <div key={item.title} className="rounded-[18px] border border-slate-200 bg-slate-50/80 p-4">
                      <p className="text-sm text-slate-500">{item.title}</p>
                      <p className="mt-2 text-xl font-semibold text-slate-950">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-[20px] border border-slate-200 bg-gradient-to-br from-violet-600 to-sky-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-violet-100">AI recommendation</p>
                      <p className="mt-1 text-lg font-semibold">Improve mobile checkout flow</p>
                    </div>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -left-4 bottom-8 hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.3)] lg:block">
            <p className="text-sm text-slate-500">Revenue leak detected</p>
            <p className="mt-1 font-semibold text-slate-900">Checkout abandonment +24%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
