import { useState, useEffect } from "react";
import { useCapstone, useSaveCapstone } from "@/hooks/use-capstone";
import { motion } from "framer-motion";
import { Save, Target, Layout, ShieldAlert, LineChart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const STAGES = ["Idea", "Design", "Build", "Evaluate", "Launch"];

export default function Capstone() {
  const { data: capstone, isLoading } = useCapstone();
  const { mutate: updateCapstone, isPending } = useSaveCapstone();
  const { toast } = useToast();

  const [form, setForm] = useState({
    problemStatement: "",
    aiArchitecture: "",
    mvpIdea: "",
    metrics: "",
    guardrails: "",
    currentStage: "Idea"
  });

  useEffect(() => {
    if (capstone) {
      setForm({
        problemStatement: capstone.problemStatement || "",
        aiArchitecture: capstone.aiArchitecture || "",
        mvpIdea: capstone.mvpIdea || "",
        metrics: capstone.metrics || "",
        guardrails: capstone.guardrails || "",
        currentStage: capstone.currentStage || "Idea"
      });
    }
  }, [capstone]);

  const handleSave = () => {
    updateCapstone({ data: form }, {
      onSuccess: () => {
        toast({ title: "Project saved", description: "Your capstone progress has been updated." });
      }
    });
  };

  if (isLoading) {
    return <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="min-h-screen pb-20 relative">
      <div className="absolute top-0 w-full h-64 overflow-hidden z-0 pointer-events-none">
        <img 
          src={`${import.meta.env.BASE_URL}images/capstone-bg.png`} 
          className="w-full h-full object-cover opacity-20 dark:opacity-30 mix-blend-plus-lighter"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-10 relative z-10 space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pt-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-3">Capstone Tracker</h1>
            <p className="text-lg text-muted-foreground">Define and iterate on your final AI product proposal.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-6 py-3 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Progress
          </button>
        </header>

        {/* Stage Tracker */}
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm mb-10">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Current Stage</p>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {STAGES.map((stage, idx) => {
              const isActive = form.currentStage === stage;
              const isPast = STAGES.indexOf(form.currentStage) > idx;
              return (
                <button
                  key={stage}
                  onClick={() => setForm(f => ({ ...f, currentStage: stage }))}
                  className={cn(
                    "flex-1 min-w-[120px] py-3 px-4 rounded-xl font-semibold text-sm transition-all border",
                    isActive 
                      ? "bg-primary text-primary-foreground border-primary shadow-md" 
                      : isPast 
                        ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                        : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
                  )}
                >
                  {idx + 1}. {stage}
                </button>
              )
            })}
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          <SectionCard 
            title="Problem Statement" 
            icon={<Target className="w-5 h-5" />}
            desc="What user problem are you solving? Why does it need AI?"
          >
            <textarea
              value={form.problemStatement}
              onChange={(e) => setForm(f => ({ ...f, problemStatement: e.target.value }))}
              placeholder="E.g. Customer support agents spend 40% of their time searching through legacy wikis..."
              className="w-full min-h-[120px] p-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y transition-all"
            />
          </SectionCard>

          <SectionCard 
            title="MVP Definition" 
            icon={<Layout className="w-5 h-5" />}
            desc="What is the simplest version of this product you can test?"
          >
            <textarea
              value={form.mvpIdea}
              onChange={(e) => setForm(f => ({ ...f, mvpIdea: e.target.value }))}
              placeholder="E.g. A Slack bot that retrieves internal docs and drafts a response for the agent to review."
              className="w-full min-h-[120px] p-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y transition-all"
            />
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard 
              title="Success Metrics" 
              icon={<LineChart className="w-5 h-5" />}
              desc="How do you know it works?"
            >
              <textarea
                value={form.metrics}
                onChange={(e) => setForm(f => ({ ...f, metrics: e.target.value }))}
                placeholder="- Reduce ticket resolution time by 20%\n- 80% acceptance rate of AI drafted responses"
                className="w-full min-h-[150px] p-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y transition-all"
              />
            </SectionCard>

            <SectionCard 
              title="Guardrails" 
              icon={<ShieldAlert className="w-5 h-5" />}
              desc="What are the risks and mitigations?"
            >
              <textarea
                value={form.guardrails}
                onChange={(e) => setForm(f => ({ ...f, guardrails: e.target.value }))}
                placeholder="Risk: Hallucination of policies.\nMitigation: Ground model strictly in RAG, provide citations to source docs."
                className="w-full min-h-[150px] p-4 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y transition-all"
              />
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon, desc, children }: { title: string, icon: React.ReactNode, desc: string, children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-3xl bg-card border border-border shadow-sm group hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
