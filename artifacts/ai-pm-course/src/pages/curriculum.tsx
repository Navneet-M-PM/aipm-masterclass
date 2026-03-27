import { Link } from "wouter";
import { COURSE_PHASES, COURSE_WEEKS } from "@/lib/data";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/use-progress";
import { CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Curriculum() {
  const { isCompleted } = useProgress();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
      <header>
        <h1 className="text-4xl font-display font-extrabold mb-4">Curriculum</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The 12-week roadmap to mastering AI Product Management. 
          Progress linearly, or jump directly to the topics you need right now.
        </p>
      </header>

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[23px] md:before:ml-[27px] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border/50">
        {COURSE_PHASES.map((phase, pIndex) => (
          <motion.div 
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: pIndex * 0.1 }}
            className="relative"
          >
            {/* Phase Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-card border-4 border-background shadow-sm flex items-center justify-center relative z-10">
                <span className="font-display font-bold text-lg text-primary">{pIndex + 1}</span>
              </div>
              <h2 className="text-2xl font-bold">{phase.title}</h2>
            </div>

            {/* Weeks List */}
            <div className="pl-14 md:pl-20 space-y-4">
              {phase.weeks.map((weekId) => {
                const week = COURSE_WEEKS[weekId];
                const allLessonsInWeekCompleted = week.lessons.every((lId: string) => isCompleted(lId));
                
                return (
                  <Link key={week.id} href={`/week/${week.id}`} className="block group">
                    <div className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {week.title}
                            </h3>
                            {allLessonsInWeekCompleted && (
                              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" /> Done
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2">{week.description}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors flex-shrink-0">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
