import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, PenTool, LayoutTemplate, Box,
  Menu, X, Sparkles, Moon, Sun, ChevronDown, TrendingUp, CheckCircle2, Circle, GraduationCap
} from "lucide-react";
import { COURSE_PHASES, COURSE_WEEKS, COURSE_LESSONS } from "@/lib/data";
import { useProgress } from "@/hooks/use-progress";

// Phase color tokens
const PHASE_COLORS: Record<string, { label: string; dot: string; badge: string; activeBg: string; border: string }> = {
  p1: { label: "text-blue-400",   dot: "bg-blue-400",   badge: "bg-blue-500/15 text-blue-400",   activeBg: "bg-blue-500/10", border: "border-blue-500/25" },
  p2: { label: "text-emerald-400", dot: "bg-emerald-400", badge: "bg-emerald-500/15 text-emerald-400", activeBg: "bg-emerald-500/10", border: "border-emerald-500/25" },
  p3: { label: "text-violet-400", dot: "bg-violet-400", badge: "bg-violet-500/15 text-violet-400", activeBg: "bg-violet-500/10", border: "border-violet-500/25" },
  p4: { label: "text-amber-400",  dot: "bg-amber-400",  badge: "bg-amber-500/15 text-amber-400",  activeBg: "bg-amber-500/10", border: "border-amber-500/25" },
  p5: { label: "text-rose-400",   dot: "bg-rose-400",   badge: "bg-rose-500/15 text-rose-400",   activeBg: "bg-rose-500/10", border: "border-rose-500/25" },
};

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isLanding = location === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  if (isLanding) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-0 rounded-none bg-background/70">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">AI PM Course</span>
            </Link>
            <div className="flex items-center gap-6">
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-muted transition-colors">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link href="/dashboard" className="px-6 py-2.5 rounded-full font-medium bg-foreground text-background hover:scale-105 hover:shadow-xl transition-all duration-300">
                Enter Platform
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 pt-20">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-background text-foreground transition-colors duration-300 overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass-panel z-40 flex items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg">AI PM Course</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen w-64 bg-card border-r border-border z-30 transition-transform duration-300 ease-in-out flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="hidden lg:flex h-16 items-center px-4 border-b border-border gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-md shadow-primary/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base tracking-tight">AI PM Course</span>
        </div>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <SidebarNav />
        </div>

        {/* User Footer */}
        <div className="flex-shrink-0 px-3 py-3 border-t border-border">
          <div className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                JD
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">Jane Doe</p>
                <p className="text-xs text-muted-foreground leading-tight">Pro Member</p>
              </div>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto pt-16 lg:pt-0 relative custom-scrollbar">
        {children}
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

function SidebarNav() {
  const [location] = useLocation();
  const { isCompleted, totalCompleted } = useProgress();

  // Derive active lesson + week from URL
  const activeLesson = location.startsWith("/lesson/") ? location.slice("/lesson/".length) : null;
  const activeWeekFromUrl = location.startsWith("/week/") ? location.slice("/week/".length) : null;
  const activeWeek = activeWeekFromUrl ?? (activeLesson ? COURSE_LESSONS[activeLesson]?.weekId : null);

  // Derive active phase
  const activePhase = activeWeek
    ? COURSE_PHASES.find((p) => p.weeks.includes(activeWeek))?.id ?? null
    : null;

  // Which phases are expanded — auto-expand active phase
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(() => {
    const s = new Set<string>();
    if (activePhase) s.add(activePhase);
    else s.add("p1");
    return s;
  });

  useEffect(() => {
    if (activePhase) {
      setExpandedPhases((prev) => new Set([...prev, activePhase]));
    }
  }, [activePhase]);

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalLessons = Object.keys(COURSE_LESSONS).length;
  const progressPercent = Math.round((totalCompleted / totalLessons) * 100);

  const mainLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/curriculum", label: "Curriculum", icon: BookOpen },
    { href: "/capstone", label: "Capstone Tracker", icon: PenTool },
  ];

  const resourceLinks = [
    { href: "/interview", label: "Interview Prep", icon: GraduationCap },
    { href: "/templates", label: "Playbooks & Templates", icon: LayoutTemplate },
    { href: "/tools", label: "AI Tools Directory", icon: Box },
  ];

  return (
    <div className="py-3 px-3 flex flex-col gap-0.5">

      {/* ── Main Nav ── */}
      {mainLinks.map((link) => {
        const Icon = link.icon;
        const isActive = location === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-primary")} />
            {link.label}
          </Link>
        );
      })}

      {/* ── Divider ── */}
      <div className="h-px bg-border/60 my-2" />

      {/* ── Progress ── */}
      <div className="px-3 py-2.5 rounded-xl bg-muted/40 border border-border/50 mb-1">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">My Progress</span>
        </div>
        <div className="flex justify-between items-baseline mb-1.5">
          <span className="text-sm font-bold text-foreground">{progressPercent}%</span>
          <span className="text-xs text-muted-foreground">{totalCompleted} / {totalLessons} lessons</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-border/60 my-2" />

      {/* ── Curriculum label ── */}
      <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
        12-Week Curriculum
      </p>

      {/* ── Phases ── */}
      {COURSE_PHASES.map((phase) => {
        const c = PHASE_COLORS[phase.id];
        const isExpanded = expandedPhases.has(phase.id);
        const isPhaseActive = phase.id === activePhase;
        const phaseShortTitle = phase.title.split(": ")[1]; // "Foundations & AI Thinking"

        // Count completed lessons in phase
        const phaseLessons = phase.weeks.flatMap((wid) => COURSE_WEEKS[wid]?.lessons ?? []);
        const phaseCompleted = phaseLessons.filter((lid) => isCompleted(lid)).length;

        return (
          <div key={phase.id} className="mb-0.5">
            {/* Phase header */}
            <button
              onClick={() => togglePhase(phase.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group",
                isPhaseActive
                  ? cn(c.activeBg, c.label)
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", c.dot)} />
              <span className="flex-1 text-left truncate">{phaseShortTitle}</span>
              {phaseCompleted > 0 && (
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0", c.badge)}>
                  {phaseCompleted}/{phaseLessons.length}
                </span>
              )}
              <ChevronDown className={cn(
                "w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200",
                isExpanded ? "rotate-180" : ""
              )} />
            </button>

            {/* Expanded weeks */}
            {isExpanded && (
              <div className="ml-3 mt-0.5 mb-1 border-l border-border/50 pl-2 flex flex-col gap-0.5">
                {phase.weeks.map((weekId) => {
                  const week = COURSE_WEEKS[weekId];
                  if (!week) return null;
                  const weekNum = weekId.replace("w", "");
                  const weekShortTitle = week.title.includes(": ")
                    ? week.title.split(": ").slice(1).join(": ")
                    : week.title;
                  const isWeekActive = weekId === activeWeek;

                  return (
                    <div key={weekId}>
                      {/* Week row */}
                      <Link
                        href={`/week/${weekId}`}
                        className={cn(
                          "flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group",
                          isWeekActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span className={cn(
                          "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors",
                          isWeekActive
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground group-hover:bg-border"
                        )}>
                          {weekNum}
                        </span>
                        <span className="truncate text-xs leading-tight">{weekShortTitle}</span>
                      </Link>

                      {/* Lessons (only when week is active) */}
                      {isWeekActive && (
                        <div className="ml-3 mt-0.5 mb-1 border-l border-border/40 pl-2 flex flex-col gap-0.5">
                          {week.lessons.map((lessonId: string) => {
                            const lesson = COURSE_LESSONS[lessonId];
                            if (!lesson) return null;
                            const isLessonActive = lessonId === activeLesson;
                            const isDone = isCompleted(lessonId);

                            return (
                              <Link
                                key={lessonId}
                                href={`/lesson/${lessonId}`}
                                className={cn(
                                  "flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all duration-150",
                                  isLessonActive
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                              >
                                {isDone
                                  ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                                  : <Circle className={cn("w-3.5 h-3.5 flex-shrink-0", isLessonActive ? "text-primary" : "text-muted-foreground/40")} />
                                }
                                <span className="truncate leading-tight">{lesson.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* ── Divider ── */}
      <div className="h-px bg-border/60 my-2" />

      {/* ── Resources ── */}
      <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Resources</p>
      {resourceLinks.map((link) => {
        const Icon = link.icon;
        const isActive = location === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-primary")} />
            {link.label}
          </Link>
        );
      })}

      {/* Bottom padding */}
      <div className="h-2" />
    </div>
  );
}
