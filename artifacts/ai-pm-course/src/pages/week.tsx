import { Link, useParams } from "wouter";
import { COURSE_WEEKS, COURSE_LESSONS } from "@/lib/data";
import { useProgress } from "@/hooks/use-progress";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowLeft, Play, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WeekView() {
  const { weekId } = useParams();
  const week = weekId ? COURSE_WEEKS[weekId] : null;
  const { isCompleted } = useProgress();

  if (!week) return <div className="p-10">Week not found</div>;

  const lessons = week.lessons.map((id: string) => COURSE_LESSONS[id]);
  const completedCount = lessons.filter(l => isCompleted(l.id)).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <Link href="/curriculum" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Curriculum
      </Link>

      <header className="bg-card border border-border p-8 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-block px-3 py-1 rounded-full bg-muted text-foreground text-xs font-bold tracking-wider uppercase mb-4 border border-border">
            {week.title.split(":")[0]}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-4">{week.title.split(":")[1] || week.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            {week.description}
          </p>

          <div className="flex items-center gap-4 max-w-md">
            <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold">{completedCount}/{lessons.length}</span>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        <h2 className="text-xl font-bold px-2">Lessons in this module</h2>
        
        {lessons.map((lesson: any, index: number) => {
          const completed = isCompleted(lesson.id);
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/lesson/${lesson.id}`} className="block group">
                <div className={cn(
                  "p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5",
                  completed 
                    ? "bg-card border-border/50 hover:border-primary/30" 
                    : "bg-card border-border hover:border-primary/50 hover:shadow-md"
                )}>
                  
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    completed ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                    {completed ? <CheckCircle2 className="w-6 h-6" /> : <Play className="w-5 h-5 ml-1" />}
                  </div>

                  <div className="flex-1">
                    <h3 className={cn(
                      "text-lg font-bold transition-colors mb-1",
                      completed ? "text-foreground" : "text-foreground group-hover:text-primary"
                    )}>
                      {lesson.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {lesson.time} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
