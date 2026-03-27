import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { COURSE_LESSONS, COURSE_WEEKS } from "@/lib/data";
import { useProgress, useSaveProgress } from "@/hooks/use-progress";
import { useNotes, useSaveLessonNote } from "@/hooks/use-notes";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight, Save, Clock, BookOpen, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

export default function LessonView() {
  const { lessonId } = useParams();
  const lesson = lessonId ? COURSE_LESSONS[lessonId] : null;
  const { toast } = useToast();
  
  const { isCompleted } = useProgress();
  const { toggleProgress } = useSaveProgress();
  
  const { getNoteForLesson } = useNotes();
  const { saveNote, isPending: isSavingNote } = useSaveLessonNote();
  
  const [noteContent, setNoteContent] = useState("");
  const completed = lesson ? isCompleted(lesson.id) : false;

  useEffect(() => {
    if (lessonId) {
      const existing = getNoteForLesson(lessonId);
      if (existing) {
        setNoteContent(existing.content);
      } else {
        setNoteContent("");
      }
    }
  }, [lessonId, getNoteForLesson]);

  if (!lesson) return <div className="p-10">Lesson not found</div>;
  const week = COURSE_WEEKS[lesson.weekId];

  const handleComplete = () => {
    if (!completed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#a855f7', '#d946ef'] // Tailwind violet/fuchsia
      });
      toast({
        title: "Lesson completed!",
        description: "Great job. Keep up the momentum.",
      });
    }
    toggleProgress(lesson.id, completed);
  };

  const handleSaveNote = () => {
    saveNote(lesson.id, noteContent);
    toast({
      title: "Notes saved",
      description: "Your insights are safely stored.",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] lg:min-h-screen">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
        <div className="max-w-3xl mx-auto p-6 md:p-12 lg:pb-32">
          
          <nav className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-8">
            <Link href="/curriculum" className="hover:text-foreground transition-colors">Curriculum</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/week/${week.id}`} className="hover:text-foreground transition-colors truncate max-w-[150px]">
              {week.title.split(":")[0]}
            </Link>
          </nav>

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-6 leading-tight">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-foreground border border-border">
                <Clock className="w-4 h-4" /> {lesson.time} min read
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full text-primary border border-primary/20">
                <BookOpen className="w-4 h-4" /> Core Concept
              </span>
            </div>
          </header>

          <article className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p className="text-xl text-foreground font-medium mb-8 leading-snug">
              {lesson.content}
            </p>
            
            {/* Mocked Extended Content to show scrolling & formatting */}
            <div className="space-y-8 mt-12">
              <div className="p-8 rounded-3xl bg-secondary/50 border border-border">
                <h3 className="text-xl font-bold text-foreground mt-0 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">💡</div>
                  Think Like a PM
                </h3>
                <p className="mb-0">When approaching this concept, don't ask "How does the model calculate this?". Instead ask, "If the model gets this wrong 5% of the time, how does our user interface gracefully handle the error without breaking trust?"</p>
              </div>

              <h2>Key Takeaways</h2>
              <ul className="space-y-3 list-none pl-0">
                {[1, 2, 3].map(i => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span>This is a crucial point about {lesson.title} that you must remember when talking to engineering.</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Completion Action */}
          <div className="mt-16 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={handleComplete}
              className={cn(
                "w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3",
                completed 
                  ? "bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20" 
                  : "bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1"
              )}
            >
              {completed ? (
                <><CheckCircle2 className="w-6 h-6" /> Completed</>
              ) : (
                <><div className="w-5 h-5 rounded-full border-2 border-current" /> Mark as Complete</>
              )}
            </button>
            
            <div className="flex items-center gap-2">
              <Link href={`/week/${week.id}`} className="px-6 py-4 rounded-xl font-semibold bg-muted hover:bg-muted/80 transition-colors">
                Next Lesson <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Sidebar Note Taking */}
      <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-card flex flex-col h-[50vh] lg:h-screen sticky top-0">
        <div className="p-6 border-b border-border flex items-center justify-between bg-card z-10">
          <h3 className="font-bold flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-primary" /> My Notes
          </h3>
          <button 
            onClick={handleSaveNote}
            disabled={isSavingNote}
            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
            title="Save Notes"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 p-6 relative">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write down your insights, ideas, and questions here. These notes are saved automatically and available for your capstone."
            className="w-full h-full resize-none bg-transparent border-none focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground/60 custom-scrollbar leading-relaxed"
          />
          {isSavingNote && (
            <div className="absolute bottom-6 right-6 text-xs text-primary animate-pulse">
              Saving...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
