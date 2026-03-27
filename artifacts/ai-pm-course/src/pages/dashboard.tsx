import { Link } from "wouter";
import { useProgress } from "@/hooks/use-progress";
import { COURSE_WEEKS, COURSE_LESSONS, TEMPLATES_DATA, TOOLS_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { Flame, PlayCircle, Trophy, Target, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
  const { totalCompleted, data: progressData } = useProgress();
  const totalLessons = 15;
  const progressPercent = Math.round((totalCompleted / totalLessons) * 100);

  // Find next lesson
  let nextLesson = Object.values(COURSE_LESSONS)[0];
  if (progressData) {
    const completedIds = progressData.filter(p => p.completed).map(p => p.lessonId);
    const uncompleted = Object.values(COURSE_LESSONS).filter(l => !completedIds.includes(l.id));
    if (uncompleted.length > 0) {
      nextLesson = uncompleted[0];
    }
  }

  const nextWeek = COURSE_WEEKS[nextLesson.weekId];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-display font-bold mb-2"
          >
            Welcome back, Jane 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            You are in the top 10% of your cohort. Keep pushing!
          </motion.p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-2xl border border-orange-500/20 font-bold shadow-inner">
            <Flame className="w-5 h-5 fill-current" />
            4 Day Streak
          </div>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Continue Learning Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-card border border-border shadow-lg"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <PlayCircle className="w-48 h-48" />
          </div>
          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4">
                Up Next • {nextWeek.title.split(":")[0]}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{nextLesson.title}</h2>
              <p className="text-muted-foreground max-w-md line-clamp-2 mb-8">
                {nextLesson.content}
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-auto">
              <Link 
                href={`/lesson/${nextLesson.id}`}
                className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5" /> Continue Learning
              </Link>
              <span className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                ~{nextLesson.time} min read
              </span>
            </div>
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl bg-card border border-border shadow-lg p-8 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-end justify-between mb-4">
              <h3 className="text-5xl font-display font-black text-foreground">{progressPercent}%</h3>
              <span className="text-muted-foreground font-medium mb-1">{totalCompleted} / {totalLessons}</span>
            </div>
            
            <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Course Completion</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Latest Templates</h3>
            <Link href="/templates" className="text-sm text-primary hover:underline font-medium">View all</Link>
          </div>
          <div className="space-y-3">
            {TEMPLATES_DATA.slice(0, 3).map((template, i) => (
              <Link key={template.id} href={`/templates`} className="block p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">{template.title}</h4>
                    <p className="text-sm text-muted-foreground truncate max-w-[250px]">{template.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Capstone Project</h3>
            <Link href="/capstone" className="text-sm text-primary hover:underline font-medium">Open Tracker</Link>
          </div>
          
          <div className="p-6 rounded-3xl bg-card border border-border shadow-sm h-[calc(100%-2rem)] flex flex-col relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute right-0 bottom-0 p-6 opacity-5">
               <Target className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold tracking-wider uppercase mb-4">
                Current Stage: Idea
              </div>
              <h4 className="text-xl font-bold mb-2">Define the Problem</h4>
              <p className="text-muted-foreground text-sm mb-6">You need to clearly articulate the user problem before selecting an AI architecture.</p>
              
              <Link href="/capstone" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                Continue Drafting <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
