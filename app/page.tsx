
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { SectionHeader } from "@/components/landing/section-header";
import { ProblemCard } from "@/components/landing/problem-card";
import { FeatureCard } from "@/components/landing/feature-card";
import { StepCard } from "@/components/landing/step-card";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { TestimonialCard } from "@/components/landing/testimonial-card";
import { FAQAccordion } from "@/components/landing/faq-accordion";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/landing/button";
import { ArrowRight, BarChart3, BrainCircuit, CircleDollarSign, Compass, MessageCircleMore, PackageCheck, ShieldCheck, Sparkles, Store, TrendingUp, Zap } from "lucide-react";
import { LoginModalWrapper } from "@/components/landing/login-modal-wrapper";

const problems = [
  { title: "Checkout abandonment", description: "Customers leave before purchase when friction rises at the last step.", icon: <CircleDollarSign className="h-5 w-5" /> },
  { title: "Revenue drops unexpectedly", description: "Performance shifts often go unnoticed until it is too late.", icon: <TrendingUp className="h-5 w-5" /> },
  { title: "Inventory issues", description: "Out-of-stock products silently reduce conversion and trust.", icon: <PackageCheck className="h-5 w-5" /> },
  { title: "Marketing waste", description: "Budgets get spent without a clear understanding of what actually works.", icon: <Zap className="h-5 w-5" /> },
];

const features = [
  { title: "Revenue intelligence", description: "Understand where revenue is coming from and where it is leaking.", icon: BarChart3 },
  { title: "AI insights", description: "Get actionable recommendations that are tailored to your store's behavior.", icon: BrainCircuit },
  { title: "Problem detection", description: "Find friction, risk, and opportunity moments before they become serious issues.", icon: ShieldCheck },
  { title: "Order intelligence", description: "Track order health, payment issues, and fulfillment challenges from one view.", icon: Store },
  { title: "Customer analytics", description: "See how customer behavior changes across products, devices, and channels.", icon: Compass },
  { title: "Smart reporting", description: "Surface the stories behind the numbers with minimal noise and polished clarity.", icon: MessageCircleMore },
];

const steps = [
  { step: "1", title: "Connect your store", description: "Link your ecommerce platform in minutes and start monitoring performance immediately." },
  { step: "2", title: "AI analyzes your business", description: "The system continuously scans orders, products, devices, and conversions for meaningful patterns." },
  { step: "3", title: "Revenue problems detected", description: "Urgent opportunities and risks are surfaced with clear explanations and impact estimates." },
  { step: "4", title: "Receive recommendations", description: "Act on precise next steps that are designed to recover revenue and improve growth." },
];

const benefits = [
  { title: "AI-first approach", description: "Designed for modern teams that need insight, not noise." },
  { title: "Real-time monitoring", description: "Stay aware of changes the moment they begin to affect revenue." },
  { title: "Revenue-focused actions", description: "Every recommendation is tied to business impact and recovery opportunity." },
  { title: "Beautiful dashboard", description: "The experience is as polished as the business outcome it supports." },
];

const testimonials = [
  { name: "Maya Chen", role: "Founder", company: "North Studio", quote: "It gave our team a way to focus on the problems that were actually costing us money." },
  { name: "Jordan Rivera", role: "Head of Growth", company: "Lumen Goods", quote: "The recommendations felt clear, actionable, and much more useful than a standard dashboard." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <LoginModalWrapper>
        <Navbar />
      </LoginModalWrapper>
      <Hero />

      <section id="problems" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="The Problem" title="Revenue issues rarely announce themselves clearly." description="Store owners face a constant stream of friction, uncertainty, and missed opportunities without a simple way to understand what is actually hurting growth." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {problems.map((problem) => (
              <ProblemCard key={problem.title} title={problem.title} description={problem.description} icon={problem.icon} />
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Solution" title="AI Revenue Recovery helps you focus on the right problems." description="It continuously monitors store performance and surfaces the issues that matter most, with simple explanations and powerful recommendations." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="How It Works" title="From signal to action in four elegant steps." description="The experience is intentionally simple so teams can understand what is happening and decide what to do next." />
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {steps.map((step) => (
              <StepCard key={step.step} step={step.step} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      <DashboardPreview />

      <section id="benefits" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Why Choose Us" title="Built to make revenue recovery feel clear and inevitable." description="The product combines intelligent monitoring with a premium interface designed for modern ecommerce operators." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-24px_rgba(15,23,42,0.24)]">
                <div className="rounded-2xl bg-violet-50 p-3 text-violet-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Testimonials" title="Trusted by teams building ambitious ecommerce brands." description="The experience is designed for stores that care about clarity, precision, and growth." />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeader eyebrow="FAQ" title="Common questions from ecommerce teams." description="Everything here is designed to make the value of the product feel obvious and immediate." />
            <FAQAccordion />
          </div>
        </div>
      </section>

      <section id="cta" className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-10 lg:p-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Ready to recover revenue?</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Bring clarity to the revenue leaks your team is already feeling.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Start with a premium experience that helps you identify what is happening, why it matters, and what to do next.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Start Free</Button>
              <Button variant="secondary">Book Demo</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
