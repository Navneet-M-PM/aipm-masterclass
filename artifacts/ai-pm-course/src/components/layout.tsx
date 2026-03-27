import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, BookOpen, PenTool, LayoutTemplate, Box, 
  Menu, X, Sparkles, Moon, Sun, ChevronRight, TrendingUp
} from "lucide-react";
import { COURSE_WEEKS } from "@/lib/data";
import { useProgress } from "@/hooks/use-progress";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isLanding = location === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (isLanding) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-t-0 border-l-0 border-r-0 rounded-none bg-background/70">
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
        "fixed lg:static top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen w-64 bg-sidebar border-r border-sidebar-border z-30 transition-transform duration-300 ease-in-out flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="hidden lg:flex h-16 items-center px-4 border-b border-sidebar-border gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-md shadow-primary/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base tracking-tight">AI PM Course</span>
        </div>

        {/* Nav Content */}
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 custom-scrollbar">
          <SidebarNav isDark={isDark} setIsDark={setIsDark} />
        </div>

        {/* User Footer */}
        <div className="flex-shrink-0 px-3 py-3 border-t border-sidebar-border">
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
            <button onClick={() => setIsDark(!isDark)} className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0">
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

function SidebarNav({ isDark, setIsDark }: { isDark: boolean; setIsDark: (v: boolean) => void }) {
  const [location] = useLocation();
  const { totalCompleted } = useProgress();
  const totalLessons = 19;
  const progressPercent = Math.round((totalCompleted / totalLessons) * 100);

  const mainLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/curriculum", label: "Curriculum", icon: BookOpen },
    { href: "/capstone", label: "Capstone Tracker", icon: PenTool },
  ];

  const resourceLinks = [
    { href: "/templates", label: "Playbooks & Templates", icon: LayoutTemplate },
    { href: "/tools", label: "AI Tools Directory", icon: Box },
  ];

  const isWeekActive = (weekId: string) => {
    if (location.includes(`/week/${weekId}`)) return true;
    const week = COURSE_WEEKS[weekId];
    if (!week) return false;
    return week.lessons.some((l: string) => location === `/lesson/${l}`);
  };

  const weekNumbers: Record<string, string> = { w1: "1", w2: "2", w3: "3" };
  const weekShortTitles: Record<string, string> = {
    w1: "AI Fundamentals",
    w2: "Problem Framing",
    w3: "Product Strategy",
  };

  return (
    <>
      {/* Main Navigation */}
      <div className="space-y-0.5">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;
          return (
            <Link key={link.href} href={link.href} className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-primary/12 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-primary" : "")} />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60 mx-1 my-2" />

      {/* Progress */}
      <div className="px-3 py-2.5 rounded-xl bg-muted/40 border border-border/50 mx-0">
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
            className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60 mx-1 my-2" />

      {/* Current Focus */}
      <div>
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Current Focus</p>
        <div className="space-y-0.5">
          {["w1", "w2", "w3"].map((weekId) => {
            const isActive = isWeekActive(weekId);
            return (
              <Link key={weekId} href={`/week/${weekId}`} className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group",
                isActive
                  ? "bg-primary/12 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <div className={cn(
                  "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-border group-hover:text-foreground"
                )}>
                  {weekNumbers[weekId]}
                </div>
                <span className="truncate">{weekShortTitles[weekId]}</span>
                <ChevronRight className={cn(
                  "w-3.5 h-3.5 ml-auto flex-shrink-0 opacity-0 -translate-x-1 transition-all duration-200",
                  isActive ? "opacity-60 translate-x-0" : "group-hover:opacity-40 group-hover:translate-x-0"
                )} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60 mx-1 my-2" />

      {/* Resources */}
      <div>
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Resources</p>
        <div className="space-y-0.5">
          {resourceLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href} className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-primary" : "")} />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
