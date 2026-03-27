import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, BookOpen, PenTool, LayoutTemplate, Box, 
  Menu, X, Sparkles, Moon, Sun, ChevronRight
} from "lucide-react";
import { COURSE_WEEKS } from "@/lib/data";
import { useProgress } from "@/hooks/use-progress";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const isLanding = location === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default dark for premium feel

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle theme
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
            <Link href="/" className="flex items-center gap-2 group">
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
        <div className="flex items-center gap-2">
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
        "fixed lg:static top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen w-72 bg-card border-r border-border z-30 transition-transform duration-300 ease-in-out flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="hidden lg:flex h-20 items-center px-6 border-b border-border gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">AI PM Course</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8 custom-scrollbar">
          <SidebarNav />
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
              JD
            </div>
            <div>
              <p className="text-sm font-semibold">Jane Doe</p>
              <p className="text-xs text-muted-foreground">Pro Member</p>
            </div>
          </div>
          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
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
  const { totalCompleted } = useProgress();
  const totalLessons = 15; // Total mock lessons
  const progressPercent = Math.round((totalCompleted / totalLessons) * 100);

  const mainLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/curriculum", label: "Curriculum", icon: BookOpen },
    { href: "/capstone", label: "Capstone Tracker", icon: PenTool },
  ];

  const resources = [
    { href: "/templates", label: "Playbooks & Templates", icon: LayoutTemplate },
    { href: "/tools", label: "AI Tools Directory", icon: Box },
  ];

  const isCurrentWeek = (weekId: string) => location.includes(`/week/${weekId}`) || location.includes(`/lesson/l`) && COURSE_WEEKS[weekId].lessons.some((l:string) => location.includes(l));

  return (
    <>
      <div className="space-y-1">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;
          return (
            <Link key={link.href} href={link.href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div>
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">My Progress</p>
        <div className="px-3">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-medium text-foreground">{progressPercent}% Completed</span>
            <span className="text-muted-foreground">{totalCompleted}/{totalLessons}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Current Focus</p>
        <div className="space-y-1">
          {Object.values(COURSE_WEEKS).slice(0, 3).map((week: any) => {
            const isActive = isCurrentWeek(week.id);
            return (
              <Link key={week.id} href={`/week/${week.id}`} className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 group",
                isActive 
                  ? "bg-muted text-foreground font-medium border border-border" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}>
                <span className="truncate pr-2">{week.title.split(":")[0]}</span>
                <ChevronRight className={cn(
                  "w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200",
                  isActive || "group-hover:opacity-100 group-hover:translate-x-0"
                )} />
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Resources</p>
        <div className="space-y-1">
          {resources.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href} className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
