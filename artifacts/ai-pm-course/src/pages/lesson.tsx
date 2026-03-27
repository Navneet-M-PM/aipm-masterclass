import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { COURSE_LESSONS, COURSE_WEEKS, type Lesson } from "@/lib/data";
import { useProgress, useSaveProgress } from "@/hooks/use-progress";
import { useNotes, useSaveLessonNote } from "@/hooks/use-notes";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Save, Clock, BookOpen, Edit3, Lightbulb, ExternalLink, HelpCircle, X, ChevronDown, ChevronUp, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

function QuizBlock({ quiz }: { quiz: Lesson["quiz"] }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);

  if (!quiz || quiz.length === 0) return null;

  return (
    <div className="space-y-6 mt-2">
      {quiz.map((q, qi) => (
        <div key={qi} className="p-6 rounded-2xl border border-border bg-muted/30">
          <div className="flex items-start gap-3 mb-4">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{qi + 1}</span>
            <p className="font-semibold text-foreground leading-snug">{q.question}</p>
          </div>
          <div className="space-y-2 ml-10">
            {q.options.map((opt, oi) => {
              const isSelected = selected[qi] === oi;
              const isRevealed = revealed[qi];
              const isCorrect = oi === q.answer;
              return (
                <button
                  key={oi}
                  disabled={isRevealed}
                  onClick={() => {
                    const ns = [...selected]; ns[qi] = oi; setSelected(ns);
                    const nr = [...revealed]; nr[qi] = true; setRevealed(nr);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 flex items-center gap-3",
                    !isRevealed && "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
                    isRevealed && isCorrect && "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400",
                    isRevealed && !isCorrect && isSelected && "border-red-400 bg-red-500/10 text-red-600 dark:text-red-400",
                    isRevealed && !isCorrect && !isSelected && "border-border opacity-50",
                  )}
                >
                  <span className={cn(
                    "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold",
                    !isRevealed && "border-muted-foreground",
                    isRevealed && isCorrect && "border-green-500 bg-green-500 text-white",
                    isRevealed && !isCorrect && isSelected && "border-red-400 bg-red-400 text-white",
                  )}>
                    {isRevealed && isCorrect && <CheckCircle2 className="w-3 h-3" />}
                    {isRevealed && !isCorrect && isSelected && <X className="w-3 h-3" />}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          <AnimatePresence>
            {revealed[qi] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="ml-10 mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20"
              >
                <p className="text-sm font-semibold text-primary mb-1">Explanation</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ResourceCard({ resource }: { resource: { title: string; url: string; type: string } }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all duration-200 group"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center">
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{resource.title}</p>
        <p className="text-xs text-muted-foreground">{resource.type}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
    </a>
  );
}

function ContentBlock({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-3xl font-bold text-foreground mt-8 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
      elements.push(<p key={i} className="font-bold text-foreground mt-4 mb-1">{line.slice(2, -2)}</p>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 my-4 ml-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-foreground/80">
              <span className="text-primary mt-1.5 flex-shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 my-4 ml-4 list-decimal list-inside">
          {items.map((item, idx) => (
            <li key={idx} className="text-foreground/80" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          ))}
        </ol>
      );
      continue;
    } else if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={`code-${i}`} className="my-4 p-4 rounded-xl bg-muted border border-border overflow-x-auto text-xs font-mono text-foreground/90 leading-relaxed">
          {codeLines.join('\n')}
        </pre>
      );
    } else if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const headers = tableLines[0].split('|').filter(h => h.trim()).map(h => h.trim());
        const rows = tableLines.slice(2).map(row => row.split('|').filter(c => c.trim()).map(c => c.trim()));
        elements.push(
          <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>{headers.map((h, hi) => <th key={hi} className="px-4 py-3 text-left font-semibold text-foreground border-b border-border">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    {row.map((cell, ci) => <td key={ci} className="px-4 py-3 text-foreground/80" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    } else {
      const rendered = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground/90">$1</code>');
      elements.push(<p key={i} className="text-foreground/80 leading-relaxed my-3" dangerouslySetInnerHTML={{ __html: rendered }} />);
    }

    i++;
  }

  return <div>{elements}</div>;
}

export default function LessonView() {
  const { lessonId } = useParams();
  const lesson = lessonId ? COURSE_LESSONS[lessonId] as Lesson | undefined : null;
  const { toast } = useToast();
  const [expandedSection, setExpandedSection] = useState<string | null>("content");

  const { isCompleted } = useProgress();
  const { toggleProgress } = useSaveProgress();
  const { getNoteForLesson } = useNotes();
  const { saveNote, isPending: isSavingNote } = useSaveLessonNote();
  const [noteContent, setNoteContent] = useState("");
  const completed = lesson ? isCompleted(lesson.id) : false;

  useEffect(() => {
    if (lessonId) {
      const existing = getNoteForLesson(lessonId);
      setNoteContent(existing ? existing.content : "");
    }
  }, [lessonId, getNoteForLesson]);

  if (!lesson) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-lg font-semibold">Lesson not found</p>
        <Link href="/curriculum" className="text-primary text-sm hover:underline">← Back to curriculum</Link>
      </div>
    </div>
  );

  const week = COURSE_WEEKS[lesson.weekId];

  const handleComplete = () => {
    if (!completed) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#8b5cf6', '#a855f7', '#d946ef'] });
      toast({ title: "🎉 Lesson completed!", description: "Keep the momentum going!" });
    }
    toggleProgress(lesson.id, completed);
  };

  const handleSaveNote = () => {
    saveNote(lesson.id, noteContent);
    toast({ title: "Notes saved", description: "Your insights are stored." });
  };

  const Section = ({ id, label, icon, children }: { id: string; label: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-muted/40 transition-colors"
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
      >
        <div className="flex items-center gap-3 font-semibold text-foreground">
          {icon}
          {label}
        </div>
        {expandedSection === id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {expandedSection === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] lg:min-h-screen">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-3xl mx-auto p-6 md:p-10 pb-32">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-8">
            <Link href="/curriculum" className="hover:text-foreground transition-colors">Curriculum</Link>
            <ChevronRight className="w-4 h-4" />
            {week && (
              <Link href={`/week/${week.id}`} className="hover:text-foreground transition-colors truncate max-w-[150px]">
                {week.title.split(":")[0]}
              </Link>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[160px]">{lesson.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            {lesson.subtitle && (
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">{lesson.subtitle}</p>
            )}
            <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-5 leading-tight text-foreground">
              {lesson.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-foreground border border-border">
                <Clock className="w-4 h-4" /> {lesson.time} min read
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full text-primary border border-primary/20">
                <BookOpen className="w-4 h-4" /> Core Concept
              </span>
              {completed && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-full text-green-600 border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </span>
              )}
            </div>
          </header>

          {/* Sections */}
          <div className="space-y-4">
            {/* Main Content */}
            <Section id="content" label="Lesson Content" icon={<BookOpen className="w-5 h-5 text-primary" />}>
              <div className="text-foreground/90 leading-relaxed">
                <ContentBlock text={lesson.content} />
              </div>
            </Section>

            {/* Key Takeaways */}
            {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
              <Section id="takeaways" label="Key Takeaways" icon={<Trophy className="w-5 h-5 text-amber-500" />}>
                <ul className="space-y-3">
                  {lesson.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/85 leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Think Like a PM */}
            {lesson.thinkLikeAPM && (
              <Section id="pm-mindset" label="Think Like a PM" icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-1 rounded-full bg-gradient-to-b from-yellow-400 to-primary" />
                  <p className="text-foreground/85 leading-relaxed italic">{lesson.thinkLikeAPM}</p>
                </div>
              </Section>
            )}

            {/* Real World Example */}
            {lesson.realWorldExample && (
              <Section id="example" label="Real-World Example" icon={<ExternalLink className="w-5 h-5 text-blue-500" />}>
                <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-foreground/85 leading-relaxed">{lesson.realWorldExample}</p>
                </div>
              </Section>
            )}

            {/* Quiz */}
            {lesson.quiz && lesson.quiz.length > 0 && (
              <Section id="quiz" label={`Knowledge Check (${lesson.quiz.length} questions)`} icon={<HelpCircle className="w-5 h-5 text-purple-500" />}>
                <QuizBlock quiz={lesson.quiz} />
              </Section>
            )}

            {/* Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <Section id="resources" label="Further Reading & Resources" icon={<BookOpen className="w-5 h-5 text-muted-foreground" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lesson.resources.map((r, i) => (
                    <ResourceCard key={i} resource={r} />
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Completion */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleComplete}
              className={cn(
                "w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-3",
                completed
                  ? "bg-green-500/10 text-green-600 border border-green-500/30 hover:bg-green-500/20"
                  : "bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5"
              )}
            >
              {completed
                ? <><CheckCircle2 className="w-5 h-5" /> Completed</>
                : <><div className="w-5 h-5 rounded-full border-2 border-current" /> Mark as Complete</>
              }
            </button>
            {week && (
              <Link href={`/week/${week.id}`} className="px-6 py-4 rounded-xl font-semibold bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2">
                Back to week <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Notes Sidebar */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-card flex flex-col h-[50vh] lg:h-screen sticky top-0">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-primary" /> My Notes
          </h3>
          <button
            onClick={handleSaveNote}
            disabled={isSavingNote}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 text-xs font-semibold"
          >
            <Save className="w-3.5 h-3.5" />
            {isSavingNote ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="flex-1 p-5 relative overflow-hidden">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder={`Your notes on "${lesson.title}"...\n\nCapture:\n• What surprised you\n• How this applies to your work\n• Questions to investigate\n• Ideas for your capstone`}
            className="w-full h-full resize-none bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground/50 text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
