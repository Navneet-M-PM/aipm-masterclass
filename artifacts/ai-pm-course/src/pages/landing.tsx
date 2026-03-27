import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Code, Rocket, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effect */}
      <div className="hero-glow" />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8 shadow-[0_0_20px_rgba(255,85,95,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next Cohort Enrolling Now
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-8 leading-[1.1]">
              Become an AI PM who <br className="hidden md:block" />
              <span className="text-gradient">builds, not just ships.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              A 12-week immersive curriculum designed for senior Product Managers. 
              Master LLM architecture, prompt engineering, RAG, and AI product strategy to build products that feel like magic.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-primary to-accent-foreground text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Access Platform Demo <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg bg-card border border-border hover:bg-muted transition-all duration-300">
                View Curriculum
              </button>
            </div>
          </motion.div>

          {/* Hero Image / Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl rounded-2xl md:rounded-[2rem] border border-border/50 bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden p-2"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50"></div>
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
              alt="Platform Abstract Background" 
              className="w-full h-auto rounded-xl md:rounded-[1.5rem] object-cover aspect-[16/9] opacity-80 mix-blend-screen"
            />
            {/* Mock overlay to look like app UI */}
            <div className="absolute inset-0 flex flex-col p-4 md:p-8">
               <div className="flex items-center gap-4 mb-8">
                 <div className="h-8 w-8 rounded-full bg-primary/20 backdrop-blur-md"></div>
                 <div className="h-4 w-32 bg-primary/20 rounded backdrop-blur-md"></div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                 <div className="h-32 md:h-48 rounded-xl bg-card/60 backdrop-blur-md border border-white/10"></div>
                 <div className="h-32 md:h-48 rounded-xl bg-card/60 backdrop-blur-md border border-white/10 col-span-2"></div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Beyond typical PM skills.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Stop managing Jira tickets and start defining AI architectures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={BrainCircuit}
              title="LLM Architecture"
              desc="Understand RAG, fine-tuning, embeddings, and context window optimization."
            />
            <FeatureCard 
              icon={Code}
              title="Technical Prototyping"
              desc="Build working prototypes with OpenAI APIs, LangChain, and vector databases."
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Evals & Guardrails"
              desc="Learn how to measure non-deterministic outputs and keep AI safe."
            />
            <FeatureCard 
              icon={Rocket}
              title="GTM for AI"
              desc="Positioning, pricing strategies, and launching features that users actually adopt."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-3xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
        <Icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
