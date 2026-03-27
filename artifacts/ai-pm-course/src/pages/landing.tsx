import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight, BrainCircuit, Code, Rocket, ShieldCheck, ChevronRight,
  CheckCircle2, Star, BookOpen, Target, Zap, Users, TrendingUp,
  MessageSquare, BarChart3, Lock, ChevronDown
} from "lucide-react";
import { useState } from "react";

const PHASES = [
  {
    number: "01",
    title: "Foundations & AI Thinking",
    weeks: "Weeks 1–2",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
    topics: ["How LLMs actually work", "AI vs traditional software", "Problem framing for AI", "10x vs 10% use cases"],
  },
  {
    number: "02",
    title: "AI Product Design",
    weeks: "Weeks 3–5",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
    topics: ["AI product strategy", "UX for non-deterministic systems", "RAG architecture", "Fine-tuning vs RAG decisions"],
  },
  {
    number: "03",
    title: "Building with AI",
    weeks: "Weeks 6–8",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
    topics: ["Prompt engineering at production scale", "AI tech stack deep-dive", "Writing AI feature PRDs", "Rapid prototyping"],
  },
  {
    number: "04",
    title: "Scaling & Mastery",
    weeks: "Weeks 9–11",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
    topics: ["AI metrics & evaluation systems", "Guardrails & responsible AI", "Business models & unit economics", "Scaling in production"],
  },
  {
    number: "05",
    title: "Capstone & Career",
    weeks: "Week 12",
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/20",
    topics: ["Build your AI product from scratch", "AI PM interview preparation", "Portfolio & job search", "Mock case walkthrough"],
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Senior PM → AI PM Lead at Anthropic",
    avatar: "SC",
    avatarBg: "bg-blue-500",
    quote: "I went from knowing nothing about LLMs to leading Anthropic's product discovery team in 4 months. This course gave me the technical vocabulary and product frameworks to earn a seat at the table.",
    stars: 5,
  },
  {
    name: "Marcus Williams",
    role: "SWE → PM at OpenAI",
    avatar: "MW",
    avatarBg: "bg-emerald-500",
    quote: "The RAG architecture lesson alone was worth the full price. I used that framework in my OpenAI interview and my interviewer literally said 'that's exactly how we think about it.' I got the offer.",
    stars: 5,
  },
  {
    name: "Priya Patel",
    role: "Product Manager at Figma",
    avatar: "PP",
    avatarBg: "bg-violet-500",
    quote: "The interview bank is exceptional. 23+ real questions with full frameworks — I didn't get a single question in my AI PM interviews that wasn't covered here. Worth every penny.",
    stars: 5,
  },
];

const PRICING = [
  {
    name: "Preview",
    price: "Free",
    period: "",
    desc: "Explore the platform and try Week 1 before committing.",
    cta: "Start Free",
    ctaHref: "/dashboard",
    highlight: false,
    features: [
      "Week 1: AI Fundamentals (4 lessons)",
      "3 interview questions",
      "1 template",
      "Dashboard & progress tracker",
    ],
    missing: ["Weeks 2–12", "Full interview bank", "All templates", "Capstone tracker"],
  },
  {
    name: "Pro",
    price: "$199",
    period: "one-time",
    desc: "Full 12-week curriculum. Lifetime access. No subscription.",
    cta: "Enroll Now",
    ctaHref: "/dashboard",
    highlight: true,
    badge: "Most Popular",
    features: [
      "All 32 lessons across 12 weeks",
      "23+ interview questions (all 6 industries)",
      "5 playbooks & templates",
      "Capstone tracker with 5 stages",
      "AI tools directory",
      "My Notes on every lesson",
      "Quiz system with scoring",
      "Lifetime access + all future updates",
    ],
    missing: [],
  },
  {
    name: "Team",
    price: "$599",
    period: "per seat",
    desc: "For teams building AI products together. Includes group cohort.",
    cta: "Contact Us",
    ctaHref: "/dashboard",
    highlight: false,
    features: [
      "Everything in Pro",
      "Team progress dashboard",
      "Group cohort with live sessions",
      "Private Slack channel",
      "Custom case studies for your industry",
      "Dedicated PM mentor (2 sessions)",
    ],
    missing: [],
  },
];

const FAQS = [
  {
    q: "Do I need a technical background to take this course?",
    a: "No. This course is built for PMs who want to understand AI deeply without becoming engineers. We use plain language, real analogies, and PM-specific frameworks throughout. If you can write a PRD, you can do this course.",
  },
  {
    q: "How is this different from other AI courses?",
    a: "Most AI courses teach you to use AI tools. This teaches you to build AI products — the architecture decisions, the evaluation frameworks, the PRD structure, and the business models. It's the difference between knowing how to drive and knowing how to design a car.",
  },
  {
    q: "How long does the course take to complete?",
    a: "Most students complete the 12-week curriculum in 8–12 weeks, spending 3–5 hours per week. The pace is entirely self-directed. All content is available immediately — no waiting for cohort start dates.",
  },
  {
    q: "Is the content up to date with current AI models?",
    a: "Yes. The curriculum covers GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 Flash, Llama 3.3, and the latest 2025-2026 frameworks from HubSpot, Anthropic, and leading AI product teams. We update content as the field evolves.",
  },
  {
    q: "Will this help me land an AI PM role?",
    a: "The Week 12 Interview Prep section is built specifically for this. We have 23+ real interview questions across 6 industries (Tech/SaaS, FinTech, Healthcare, E-commerce, Media, Enterprise), each with full frameworks and sample answers. Multiple students have used this to land roles at OpenAI, Anthropic, Google, Meta, and top-tier startups.",
  },
  {
    q: "Can I get a refund if it's not for me?",
    a: "Yes. We offer a 14-day full refund, no questions asked. If you complete more than 50% of the course and feel it didn't deliver value, we'll still honor the refund — that's how confident we are.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <span className="font-semibold text-foreground pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="w-full h-full bg-[#0d1117] rounded-xl overflow-hidden flex text-xs select-none">
      {/* Sidebar */}
      <div className="w-52 flex-shrink-0 bg-[#0d1117] border-r border-white/5 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <span className="text-white text-[8px] font-black">AI</span>
          </div>
          <span className="text-white text-[11px] font-bold tracking-tight">AI PM Course</span>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-0.5 p-2 pt-3">
          {[
            { label: "Dashboard", active: true },
            { label: "Curriculum", active: false },
            { label: "Capstone Tracker", active: false },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[10px] font-medium ${item.active ? "bg-blue-500/15 text-blue-400" : "text-white/40"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-blue-400" : "bg-white/20"}`} />
              {item.label}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="px-3 pt-3 border-t border-white/5 mt-2">
          <div className="text-[9px] text-white/30 font-semibold uppercase tracking-wider mb-2">My Progress</div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-blue-400">32%</span>
            <span className="text-[9px] text-white/30">10 / 32 lessons</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full mb-3">
            <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          </div>

          <div className="text-[9px] text-white/30 font-semibold uppercase tracking-wider mb-2">Phases</div>
          {[
            { label: "Foundations", color: "bg-blue-400", done: true },
            { label: "AI Product Design", color: "bg-emerald-400", done: true },
            { label: "Building with AI", color: "bg-violet-400", done: false },
            { label: "Scaling & Mastery", color: "bg-amber-400", done: false },
          ].map(p => (
            <div key={p.label} className="flex items-center gap-2 py-1">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.color} ${!p.done && "opacity-30"}`} />
              <span className={`text-[9px] ${p.done ? "text-white/60" : "text-white/25"}`}>{p.label}</span>
            </div>
          ))}
        </div>

        {/* User Footer */}
        <div className="mt-auto p-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-[8px] font-bold">S</div>
            <div>
              <div className="text-[9px] text-white/70 font-semibold">Sarah Chen</div>
              <div className="text-[8px] text-white/30">Product Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#080c12]">
        {/* Header */}
        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="text-[12px] font-bold text-white">Welcome back, Sarah 👋</div>
            <div className="text-[9px] text-white/35">Week 6 · Prompt Engineering at Scale</div>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full px-2.5 py-1 text-[9px] font-bold">
            🔥 4-day streak
          </div>
        </div>

        {/* Cards */}
        <div className="p-4 flex flex-col gap-3 overflow-hidden">
          <div className="grid grid-cols-3 gap-3">
            {/* Up Next */}
            <div className="col-span-2 bg-[#0d1117] border border-blue-500/20 rounded-xl p-3">
              <div className="text-[8px] text-blue-400 font-bold uppercase tracking-wider mb-1.5">UP NEXT · WEEK 6</div>
              <div className="text-[11px] font-bold text-white mb-0.5">Prompt Engineering at Scale</div>
              <div className="text-[9px] text-white/40 mb-3">Chain-of-thought, few-shot patterns & production prompts</div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[9px] font-semibold">Continue →</div>
                <div className="text-[8px] text-white/30">45 min · Quiz included</div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#0d1117] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
              <div className="text-[22px] font-black text-white leading-none">32%</div>
              <div className="text-[8px] text-white/35 mb-2">Course Complete</div>
              <div className="h-1.5 bg-white/5 rounded-full">
                <div className="h-full w-1/3 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Lesson Preview */}
          <div className="bg-[#0d1117] border border-white/5 rounded-xl p-3 flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-semibold text-white">L6 · Prompt Engineering at Scale</div>
              <div className="text-[8px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 font-semibold">In Progress</div>
            </div>
            <div className="space-y-1.5 mb-3">
              {[
                { text: "The anatomy of a production-grade prompt", done: true },
                { text: "Chain-of-thought & few-shot patterns", done: true },
                { text: "Temperature, top-p and creativity tradeoffs", done: false },
                { text: "Prompt versioning and evaluation loops", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center ${item.done ? "bg-emerald-500" : "border border-white/15"}`}>
                    {item.done && <span className="text-white text-[7px]">✓</span>}
                  </div>
                  <span className={`text-[9px] ${item.done ? "text-white/60 line-through" : "text-white/45"}`}>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <div className="text-[8px] px-2 py-1 rounded-lg bg-blue-500/15 text-blue-400 font-medium">Take Quiz</div>
              <div className="text-[8px] px-2 py-1 rounded-lg bg-white/5 text-white/40 font-medium">Add Note</div>
              <div className="ml-auto text-[8px] text-white/25">Quiz score: 92/100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <div className="hero-glow" />

      {/* HERO */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Enrollment Open · Self-Paced · Lifetime Access
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-8 leading-[1.05]">
              Become an AI PM who<br className="hidden md:block" />
              <span className="text-gradient"> builds, not just ships.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              A 12-week immersive curriculum for Product Managers. Master LLM architecture,
              prompt engineering, RAG, agents, and AI evaluation to build products that feel like magic.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                Access Platform <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/curriculum" className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg bg-card border border-border hover:bg-muted hover:border-primary/30 transition-all duration-300 flex items-center justify-center gap-2">
                View Curriculum <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto max-w-5xl rounded-2xl md:rounded-[2rem] border border-border/50 bg-card shadow-2xl shadow-primary/10 overflow-hidden"
            style={{ height: "420px" }}
          >
            <div className="absolute top-0 left-0 right-0 h-8 bg-card/80 backdrop-blur border-b border-border/50 flex items-center px-4 gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-rose-400/70" />
              <div className="w-3 h-3 rounded-full bg-amber-400/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
              <div className="flex-1" />
              <div className="h-4 w-40 bg-muted/60 rounded" />
              <div className="flex-1" />
            </div>
            <div className="pt-8 h-full">
              <DashboardMockup />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "32", label: "Lessons" },
              { value: "12", label: "Weeks" },
              { value: "23+", label: "Interview Questions" },
              { value: "5", label: "Playbooks" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-display font-black text-foreground mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Beyond typical PM skills.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Stop managing Jira tickets. Start defining AI architectures.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BrainCircuit, title: "LLM Architecture", desc: "Understand RAG, fine-tuning, embeddings, and context window optimization — so you make real technical decisions." },
              { icon: Code, title: "Technical Prototyping", desc: "Build working prototypes with OpenAI APIs, LangChain, and vector databases without needing to code." },
              { icon: ShieldCheck, title: "Evals & Guardrails", desc: "Design Golden Datasets, measure hallucination rates, and build safety systems that engineers respect." },
              { icon: Rocket, title: "GTM for AI", desc: "Positioning, pricing strategies, and launching AI features that users actually adopt — not just demo." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                  <Icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM OVERVIEW */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">The 12-week learning path.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Five phases that take you from AI fundamentals to shipping production-grade AI products.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHASES.map(phase => (
              <div key={phase.number} className={`p-6 rounded-2xl border ${phase.bg} relative overflow-hidden`}>
                <div className={`text-5xl font-display font-black opacity-10 absolute top-4 right-6 ${phase.color}`}>
                  {phase.number}
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${phase.color}`}>{phase.weeks}</div>
                <h3 className="text-lg font-bold mb-4 text-foreground">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.topics.map(t => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${phase.color}`} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col items-center justify-center text-center">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">Ready to see it all?</h3>
              <p className="text-sm text-muted-foreground mb-4">Explore the full curriculum with all 32 lessons.</p>
              <Link href="/curriculum" className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5">
                View Full Roadmap <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Everything you need. Nothing you don't.</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Built for time-constrained PMs who need practical skills, not theoretical knowledge. Every lesson connects directly to decisions you'll make in your next AI role.
              </p>
              <div className="space-y-4">
                {[
                  { icon: BookOpen, title: "32 Deep Lessons", desc: "Not summaries — full frameworks, quizzes, and real-world PM scenarios." },
                  { icon: MessageSquare, title: "23+ Interview Questions", desc: "Organized by industry, category, and difficulty. Full frameworks and sample answers included." },
                  { icon: BarChart3, title: "Progress Tracking", desc: "Per-lesson completion, quiz scores, and a visual roadmap of your journey." },
                  { icon: Zap, title: "5 Production Playbooks", desc: "Copy-paste templates for AI PRDs, RAG specs, eval frameworks, and prompt engineering." },
                  { icon: Target, title: "Capstone Project Tracker", desc: "A guided 5-stage tracker that takes your AI product idea from concept to launch-ready pitch." },
                  { icon: TrendingUp, title: "Live AI Market Data", desc: "2025–2026 statistics, model comparisons, and case studies from HubSpot, Klarna, GitHub, Spotify, and more." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-0.5">{title}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">CURRENT LESSON</div>
                    <div className="font-bold text-foreground">Prompt Engineering at Scale</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">Week 6</div>
                </div>
                <div className="space-y-3 mb-6">
                  {["The anatomy of a production prompt", "Chain-of-thought reasoning", "Few-shot learning patterns", "Temperature and creativity tradeoffs"].map((item, i) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${i < 2 ? "bg-primary" : "border border-border"}`}>
                        {i < 2 && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${i < 2 ? "text-foreground" : "text-muted-foreground"}`}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Think Like a PM</div>
                  <p className="text-sm text-muted-foreground">Before your next sprint kickoff, ask: "What does a 10% improvement in prompt quality mean in dollars saved per month?"</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border border-border bg-card p-4 shadow-xl">
                <div className="text-2xl font-black text-primary">92%</div>
                <div className="text-[10px] text-muted-foreground">Quiz score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">From the people who've done it.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">PMs who've used this curriculum to break into AI product roles at the top companies.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Simple pricing. Lifetime value.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Pay once. Access everything. Keep it forever as the field evolves.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map(plan => (
              <div key={plan.name} className={`relative rounded-3xl border p-8 flex flex-col ${plan.highlight ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" : "border-border bg-card"}`}>
                {plan.highlight && plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-lg">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`}>{plan.name}</div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-display font-black text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-sm mb-1">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.desc}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-primary" : "text-emerald-400"}`} />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                  {plan.missing.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm opacity-40">
                      <div className="w-4 h-4 flex-shrink-0 mt-0.5 rounded-full border border-muted-foreground/30 flex items-center justify-center">
                        <div className="w-1.5 h-px bg-muted-foreground rounded" />
                      </div>
                      <span className="text-muted-foreground line-through">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-center block transition-all ${plan.highlight ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30" : "bg-muted hover:bg-muted/80 text-foreground border border-border"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" /> 14-day full refund guarantee · No questions asked
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Frequently asked questions.</h2>
            <p className="text-muted-foreground">Everything you need to decide if this is right for you.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8">
            <Users className="w-4 h-4" />
            340% growth in AI PM roles in 2024 — the time is now
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 leading-tight">
            Build AI products that<br /><span className="text-gradient">ship in production.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join PMs who've used this curriculum to land roles at OpenAI, Anthropic, Google, Meta, and top AI startups. Your 12-week transformation starts today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-lg bg-primary text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
              Start Learning Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/curriculum" className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-lg bg-card border border-border hover:bg-muted transition-all duration-300 flex items-center justify-center gap-2">
              Browse Curriculum <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
