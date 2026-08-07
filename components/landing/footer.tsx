import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-[14px] bg-violet-600 p-2 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">AI Revenue Recovery</p>
              <p className="text-xs text-slate-500">Revenue intelligence</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">A premium AI experience helping ecommerce stores recover revenue with clarity and confidence.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-slate-950">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Features</li>
              <li>How It Works</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Resources</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Docs</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>About</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
