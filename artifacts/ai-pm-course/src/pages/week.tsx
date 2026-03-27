import { Link, useParams } from "wouter";
import { COURSE_WEEKS, COURSE_LESSONS } from "@/lib/data";
import { useProgress } from "@/hooks/use-progress";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowLeft, Play, Clock, FileText, ExternalLink, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WeekView() {
  const { weekId } = useParams();
  const week = weekId ? COURSE_WEEKS[weekId] : null;
  const { isCompleted } = useProgress();

  if (!week) return <div className="p-10">Week not found</div>;

  const lessons = week.lessons.map((id: string) => COURSE_LESSONS[id]).filter(Boolean);
  const completedCount = lessons.filter(l => isCompleted(l.id)).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 pb-20">
      <Link href="/curriculum" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Curriculum
      </Link>

      {/* Header Card */}
      <header className="bg-card border border-border p-8 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-muted text-foreground text-xs font-bold tracking-wider uppercase mb-4 border border-border">
            {week.title.split(":")[0]}
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-4">
            {week.title.split(":")[1]?.trim() || week.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">{week.description}</p>

          {/* Progress */}
          <div className="flex items-center gap-4 max-w-md">
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold whitespace-nowrap">{completedCount}/{lessons.length} complete</span>
          </div>
        </div>
      </header>

      {/* Learning Objectives */}
      {week.objectives && week.objectives.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
            <BookMarked className="w-4 h-4" /> Learning Objectives
          </h2>
          <ul className="space-y-2">
            {week.objectives.map((obj: string, i: number) => (
              <li key={i} className="flex gap-3 items-start text-sm text-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lessons */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold px-1">Lessons in this module</h2>

        {lessons.map((lesson: any, index: number) => {
          const done = isCompleted(lesson.id);
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link href={`/lesson/${lesson.id}`} className="block group">
                <div className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5",
                  done
                    ? "bg-card border-border/50 hover:border-primary/30"
                    : "bg-card border-border hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
                )}>
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    done ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                    {done ? <CheckCircle2 className="w-6 h-6" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-muted-foreground">Lesson {index + 1}</span>
                      {done && <span className="text-xs font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">Done</span>}
                    </div>
                    <h3 className={cn(
                      "text-base font-bold transition-colors mb-1 truncate",
                      done ? "text-foreground" : "text-foreground group-hover:text-primary"
                    )}>
                      {lesson.title}
                    </h3>
                    {lesson.subtitle && (
                      <p className="text-xs text-muted-foreground truncate">{lesson.subtitle}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {lesson.time} min
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                      "bg-muted group-hover:bg-primary/10 group-hover:text-primary text-muted-foreground"
                    )}>
                      <Play className="w-4 h-4 ml-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Assignment */}
      {week.assignment && (
        <div className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Week Assignment
          </h2>
          <p className="text-foreground/80 text-sm leading-relaxed">{week.assignment}</p>
        </div>
      )}

      {/* Resources */}
      {week.resources && week.resources.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Supplementary Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {week.resources.map((r: any, i: number) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
