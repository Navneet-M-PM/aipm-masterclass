import { Link } from "wouter";
import { COURSE_PHASES, COURSE_WEEKS, BONUS_MODULES, CAPSTONE_OPTIONS } from "@/lib/data";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/use-progress";
import { CheckCircle2, ChevronRight, Zap, BookOpen, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const PHASE_COLORS = [
  { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", dot: "bg-blue-500" },
  { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-500" },
  { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", dot: "bg-violet-500" },
  { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", dot: "bg-amber-500" },
  { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400", dot: "bg-rose-500" },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Intermediate: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Advanced: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Essential: "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

export default function Curriculum() {
  const { isCompleted } = useProgress();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-16">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
          <BookOpen className="w-3 h-3" /> 12-Week Curriculum
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
          Your AI PM Roadmap
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Five phases from zero to shipping production AI products. Progress linearly 
          or jump to the topics you need right now.
        </p>
      </header>

      {/* Phase Timeline */}
      <div className="space-y-10 relative before:absolute before:left-[23px] md:before:left-[27px] before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
        {COURSE_PHASES.map((phase, pIndex) => {
          const color = PHASE_COLORS[pIndex];
          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pIndex * 0.08 }}
              className="relative"
            >
              {/* Phase Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 flex items-center justify-center relative z-10 text-xl shadow-sm",
                  color.bg, color.border
                )}>
                  <span>{phase.emoji}</span>
                </div>
                <div>
                  <h2 className={cn("text-xl md:text-2xl font-bold", color.text)}>{phase.title}</h2>
                  <p className="text-sm text-muted-foreground">{phase.weeks.length} week{phase.weeks.length !== 1 ? "s" : ""}</p>
                </div>
              </div>

              {/* Weeks */}
              <div className="pl-14 md:pl-20 space-y-3">
                {phase.weeks.map((weekId) => {
                  const week = COURSE_WEEKS[weekId];
                  if (!week) return null;
                  const allDone = week.lessons.every((lId: string) => isCompleted(lId));
                  const anyDone = week.lessons.some((lId: string) => isCompleted(lId));

                  return (
                    <Link key={week.id} href={`/week/${week.id}`} className="block group">
                      <div className={cn(
                        "p-5 rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 glow-card relative overflow-hidden",
                        allDone && "border-emerald-500/30"
                      )}>
                        {anyDone && !allDone && (
                          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/0"
                            style={{ width: `${(week.lessons.filter((l: string) => isCompleted(l)).length / week.lessons.length) * 100}%` }}
                          />
                        )}
                        {allDone && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                        )}

                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                {week.title}
                              </h3>
                              {allDone && (
                                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                  <CheckCircle2 className="w-3 h-3" /> Complete
                                </span>
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{week.description}</p>
                            {week.keyConceptsLabel && (
                              <p className="text-xs text-muted-foreground/70 font-mono">
                                Concepts: {week.keyConceptsLabel}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                              "bg-muted group-hover:bg-primary/10 group-hover:text-primary"
                            )}>
                              <ChevronRight className="w-5 h-5" />
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {week.lessons.length} lessons
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Capstone Project Options */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl">
            🧩
          </div>
          <div>
            <h2 className="text-2xl font-bold">Capstone Project</h2>
            <p className="text-sm text-muted-foreground">Runs throughout the course — choose your track below</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAPSTONE_OPTIONS.map((option) => (
            <Link key={option.id} href="/capstone" className="block group">
              <div className="p-5 rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 glow-card h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="text-2xl">{option.icon}</div>
                  <span className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full border",
                    DIFFICULTY_COLORS[option.difficulty] || "text-muted-foreground bg-muted border-border"
                  )}>
                    {option.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {option.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Bonus Modules */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Bonus Modules</h2>
            <p className="text-sm text-muted-foreground">Optional but high-value — for those who want more</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BONUS_MODULES.map((mod) => (
            <div key={mod.id} className="p-5 rounded-2xl bg-card border border-dashed border-border/70 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
              <div className="absolute top-3 right-3">
                <span className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full border",
                  DIFFICULTY_COLORS[mod.level] || "text-muted-foreground bg-muted border-border"
                )}>
                  {mod.level}
                </span>
              </div>
              <div className="text-2xl mb-3">{mod.emoji}</div>
              <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{mod.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{mod.description}</p>
              <ul className="space-y-1.5">
                {mod.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">›</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
