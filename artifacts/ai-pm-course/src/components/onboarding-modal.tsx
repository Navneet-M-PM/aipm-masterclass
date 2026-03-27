import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, BookOpen } from "lucide-react";

const ROLES = [
  "Product Manager",
  "Senior PM / Lead PM",
  "Engineering Manager",
  "Founder / Co-founder",
  "UX / Product Designer",
  "Data Scientist / ML Engineer",
  "Consultant",
  "Student / Career switcher",
  "Other",
];

interface Props {
  onComplete: (name: string, role: string) => void;
}

export function OnboardingModal({ onComplete }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleStep1 = () => {
    if (name.trim().length < 1) return;
    setStep(2);
  };

  const handleFinish = () => {
    if (!role) return;
    onComplete(name.trim(), role);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-md rounded-3xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="p-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 mx-auto">
              {step === 1 ? (
                <Sparkles className="w-7 h-7 text-primary" />
              ) : (
                <BookOpen className="w-7 h-7 text-primary" />
              )}
            </div>

            {step === 1 ? (
              <div>
                <h2 className="text-2xl font-bold text-center mb-2">Welcome to AI PM Course</h2>
                <p className="text-muted-foreground text-center text-sm mb-8">
                  Your personalized learning journey starts here. What should we call you?
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Your first name</label>
                    <input
                      autoFocus
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleStep1()}
                      placeholder="e.g. Alex"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <button
                    onClick={handleStep1}
                    disabled={name.trim().length < 1}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-center mb-2">What's your background?</h2>
                <p className="text-muted-foreground text-center text-sm mb-6">
                  We'll tailor examples and frameworks to your experience.
                </p>
                <div className="space-y-2 mb-6 max-h-64 overflow-y-auto pr-1">
                  {ROLES.map(r => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        role === r
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background hover:border-primary/40 hover:bg-muted"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleFinish}
                  disabled={!role}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  Start Learning <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="px-8 pb-6">
            <div className="flex items-center gap-2">
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
