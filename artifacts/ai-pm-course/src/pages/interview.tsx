import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  INTERVIEW_QUESTIONS,
  INDUSTRIES,
  QUESTION_CATEGORIES,
  DIFFICULTIES,
  INDUSTRY_INFO,
  type Industry,
  type QuestionCategory,
  type Difficulty,
  type InterviewQuestion,
} from "@/lib/interview-data";
import {
  ChevronDown, ChevronUp, Briefcase, Brain, Target, TrendingUp,
  Users, Shield, Search, Filter, BookOpen, Star, AlertCircle, CheckCircle2,
  Lightbulb, MessageSquare, ArrowRight, X
} from "lucide-react";

const CATEGORY_ICONS: Record<QuestionCategory, any> = {
  "Product Sense": Target,
  "AI Technical": Brain,
  "Execution & Metrics": TrendingUp,
  "Strategy": Briefcase,
  "Leadership": Users,
  "Ethics & Responsible AI": Shield,
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  "Junior": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Mid-Level": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Senior": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Staff/Principal": "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

const INDUSTRY_COLORS: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

function QuestionCard({ q }: { q: InterviewQuestion }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"framework" | "answer" | "followups">("framework");
  const Icon = CATEGORY_ICONS[q.category];
  const info = INDUSTRY_INFO[q.industries[0]];

  return (
    <div className={cn(
      "rounded-2xl border transition-all duration-200",
      open ? "border-primary/30 shadow-lg shadow-primary/5" : "border-border hover:border-primary/20"
    )}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg",
          INDUSTRY_COLORS[info?.color ?? "blue"]
        )}>
          {info?.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={cn(
              "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
              DIFFICULTY_COLORS[q.difficulty]
            )}>
              {q.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted border border-border text-muted-foreground">
              <Icon className="w-3 h-3" />
              {q.category}
            </span>
            {q.industries.length > 1 && (
              <span className="text-xs text-muted-foreground">+{q.industries.length - 1} more</span>
            )}
          </div>
          <p className="font-semibold text-foreground leading-snug pr-8">{q.question}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {q.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </button>

      {/* Expanded Content */}
      {open && (
        <div className="px-5 pb-5">
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-muted mb-4">
            {(["framework", "answer", "followups"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-150",
                  tab === t
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "framework" ? "How to Approach" : t === "followups" ? "Follow-up Qs" : "Full Answer"}
              </button>
            ))}
          </div>

          {/* Framework Tab */}
          {tab === "framework" && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-primary">Framework & Approach</p>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{q.framework}</p>
            </div>
          )}

          {/* Answer Tab */}
          {tab === "answer" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-xs text-amber-400">
                  Use this as a guide, not a script. Personalize with your own experience.
                </p>
              </div>
              <div className="prose-answer text-sm text-foreground/80 leading-relaxed space-y-3">
                {q.answer.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.includes(':**')) {
                    return (
                      <div key={i}>
                        {para.split('\n').map((line, j) => {
                          if (line.startsWith('**') && !line.startsWith('- ')) {
                            const boldEnd = line.indexOf('**', 2);
                            return (
                              <p key={j} className="font-semibold text-foreground mt-4 mb-1">
                                {line.slice(2, boldEnd)}
                                <span className="font-normal text-foreground/80">{line.slice(boldEnd + 2)}</span>
                              </p>
                            );
                          } else if (line.startsWith('- ')) {
                            return (
                              <div key={j} className="flex gap-2 ml-4">
                                <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                                <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                              </div>
                            );
                          }
                          return line.trim() ? <p key={j} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') }} /> : null;
                        })}
                      </div>
                    );
                  }
                  // Table detection
                  if (para.includes('|---|')) {
                    const rows = para.split('\n').filter(l => l.startsWith('|'));
                    if (rows.length >= 2) {
                      const headers = rows[0].split('|').filter(h => h.trim()).map(h => h.trim());
                      const dataRows = rows.slice(2).map(r => r.split('|').filter(c => c.trim()).map(c => c.trim()));
                      return (
                        <div key={i} className="overflow-x-auto rounded-xl border border-border my-4">
                          <table className="w-full text-xs">
                            <thead className="bg-muted">
                              <tr>{headers.map((h, hi) => <th key={hi} className="px-3 py-2 text-left font-semibold text-foreground border-b border-border">{h}</th>)}</tr>
                            </thead>
                            <tbody>
                              {dataRows.map((row, ri) => (
                                <tr key={ri} className="border-b border-border/50">
                                  {row.map((cell, ci) => <td key={ci} className="px-3 py-2 text-foreground/80" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                  }
                  return (
                    <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>') }} />
                  );
                })}
              </div>
            </div>
          )}

          {/* Follow-ups Tab */}
          {tab === "followups" && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">Interviewers often ask these after the main question. Prepare for them.</p>
              {q.followUps.map((fu, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-muted/30 hover:border-primary/20 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80">{fu}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function InterviewPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | "All">("All");
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | "All">("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter(q => {
      if (selectedIndustry !== "All" && !q.industries.includes(selectedIndustry)) return false;
      if (selectedCategory !== "All" && q.category !== selectedCategory) return false;
      if (selectedDifficulty !== "All" && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery) {
        const lq = searchQuery.toLowerCase();
        return q.question.toLowerCase().includes(lq) || q.tags.some(t => t.toLowerCase().includes(lq));
      }
      return true;
    });
  }, [selectedIndustry, selectedCategory, selectedDifficulty, searchQuery]);

  const stats = useMemo(() => {
    const total = INTERVIEW_QUESTIONS.length;
    const byCategory: Record<string, number> = {};
    INTERVIEW_QUESTIONS.forEach(q => {
      byCategory[q.category] = (byCategory[q.category] || 0) + 1;
    });
    return { total, byCategory };
  }, []);

  const clearFilters = () => {
    setSelectedIndustry("All");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSearchQuery("");
  };

  const hasFilters = selectedIndustry !== "All" || selectedCategory !== "All" || selectedDifficulty !== "All" || searchQuery;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Star className="w-3 h-3" />
            Job-Ready Interview Prep
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            AI PM Interview Bank
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Every question an AI PM interview has ever asked — organized by industry, category, and seniority. Full frameworks and sample answers included.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <p className="text-2xl font-bold text-foreground">{stats.total}+</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <p className="text-2xl font-bold text-foreground">{INDUSTRIES.length}</p>
              <p className="text-xs text-muted-foreground">Industries</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <p className="text-2xl font-bold text-foreground">{QUESTION_CATEGORIES.length}</p>
              <p className="text-xs text-muted-foreground">Question Types</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border">
              <p className="text-2xl font-bold text-foreground">{DIFFICULTIES.length}</p>
              <p className="text-xs text-muted-foreground">Seniority Levels</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0 space-y-6">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-card transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Industry Filter */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Industry</p>
              <div className="space-y-1">
                {(["All", ...INDUSTRIES] as const).map(ind => {
                  const info = ind !== "All" ? INDUSTRY_INFO[ind] : null;
                  return (
                    <button
                      key={ind}
                      onClick={() => setSelectedIndustry(ind as any)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 flex items-center gap-2",
                        selectedIndustry === ind
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {info ? <span>{info.emoji}</span> : <BookOpen className="w-4 h-4" />}
                      <span className="truncate">{ind}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Question Type</p>
              <div className="space-y-1">
                {(["All", ...QUESTION_CATEGORIES] as const).map(cat => {
                  const Icon = cat !== "All" ? CATEGORY_ICONS[cat] : Filter;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as any)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 flex items-center gap-2",
                        selectedCategory === cat
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Seniority</p>
              <div className="space-y-1">
                {(["All", ...DIFFICULTIES] as const).map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff as any)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 flex items-center gap-2",
                      selectedDifficulty === diff
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      diff === "Junior" ? "bg-emerald-400" :
                      diff === "Mid-Level" ? "bg-blue-400" :
                      diff === "Senior" ? "bg-violet-400" :
                      diff === "Staff/Principal" ? "bg-rose-400" : "bg-muted-foreground"
                    )} />
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="w-full py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Industry Cards (shown when no industry filter) */}
            {selectedIndustry === "All" && !searchQuery && selectedCategory === "All" && selectedDifficulty === "All" && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-muted-foreground mb-3">Browse by Industry</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {INDUSTRIES.map(ind => {
                    const info = INDUSTRY_INFO[ind];
                    const count = INTERVIEW_QUESTIONS.filter(q => q.industries.includes(ind)).length;
                    return (
                      <button
                        key={ind}
                        onClick={() => setSelectedIndustry(ind)}
                        className={cn(
                          "p-4 rounded-xl border text-left transition-all duration-200 hover:shadow-md group",
                          INDUSTRY_COLORS[info.color],
                          "hover:scale-[1.02]"
                        )}
                      >
                        <div className="text-2xl mb-2">{info.emoji}</div>
                        <p className="font-semibold text-sm mb-1">{ind}</p>
                        <p className="text-xs opacity-70">{count} questions</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> questions
                {hasFilters && " matching filters"}
              </p>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                  Clear filters
                </button>
              )}
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="font-semibold text-foreground mb-2">No questions found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
                  <button onClick={clearFilters} className="mt-4 text-sm text-primary hover:underline">
                    Clear all filters
                  </button>
                </div>
              ) : (
                filtered.map(q => <QuestionCard key={q.id} q={q} />)
              )}
            </div>

            {/* Bottom CTA */}
            {filtered.length > 0 && (
              <div className="mt-12 p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Practice tip: Use the STAR method</p>
                    <p className="text-sm text-muted-foreground">
                      For behavioral questions, structure your answer as: <strong className="text-foreground">Situation → Task → Action → Result</strong>. 
                      For technical questions, always show your reasoning process — interviewers want to see how you think, not just your answer.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
