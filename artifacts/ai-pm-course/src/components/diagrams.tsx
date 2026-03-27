
function Arrow({ dir = "right", className = "" }: { dir?: "right" | "down" | "left" | "up"; className?: string }) {
  const arrows: Record<string, string> = { right: "→", down: "↓", left: "←", up: "↑" };
  return <span className={`text-muted-foreground font-bold text-lg select-none ${className}`}>{arrows[dir]}</span>;
}

function Box({
  children, color = "default", size = "md", className = ""
}: {
  children: React.ReactNode;
  color?: "default" | "primary" | "accent" | "green" | "amber" | "red" | "purple" | "blue";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const colors: Record<string, string> = {
    default: "bg-muted/50 border-border text-foreground",
    primary: "bg-primary/10 border-primary/30 text-primary",
    accent: "bg-[hsl(172_76%_42%)]/10 border-[hsl(172_76%_42%)]/30 text-[hsl(172_76%_42%)]",
    green: "bg-green-500/10 border-green-500/30 text-green-500",
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-500",
    red: "bg-red-500/10 border-red-500/30 text-red-500",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-500",
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-500",
  };
  const sizes: Record<string, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3.5 text-sm",
  };
  return (
    <div className={`rounded-xl border font-semibold text-center ${colors[color]} ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}

function DiagramWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
      <div className="px-4 py-2.5 bg-muted/50 border-b border-border">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
      </div>
      <div className="p-5 md:p-6">
        {children}
      </div>
    </div>
  );
}

function AIErasTimeline() {
  const eras = [
    { label: "Rule-Based AI", years: "1950s–2010s", desc: "Humans write the rules", examples: ["Chess engines", "Spam filters (manual)", "Expert systems"], color: "amber" as const },
    { label: "Machine Learning", years: "2010s", desc: "Models learn from data", examples: ["Netflix recommendations", "Fraud detection", "Ad targeting"], color: "blue" as const },
    { label: "Generative AI", years: "2022–present", desc: "Models create new content", examples: ["ChatGPT", "Midjourney", "GitHub Copilot"], color: "primary" as const },
  ];
  return (
    <DiagramWrapper title="The Three Eras of AI">
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        {eras.map((era, i) => (
          <div key={era.label} className="flex flex-col md:flex-row items-center gap-3 flex-1">
            <div className={`flex-1 w-full rounded-2xl border p-4 ${
              era.color === "amber" ? "bg-amber-500/8 border-amber-500/25" :
              era.color === "blue" ? "bg-blue-500/8 border-blue-500/25" :
              "bg-primary/8 border-primary/25"
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                era.color === "amber" ? "text-amber-400" : era.color === "blue" ? "text-blue-400" : "text-primary"
              }`}>{era.years}</div>
              <div className="font-bold text-foreground mb-1">{era.label}</div>
              <div className="text-xs text-muted-foreground mb-3">{era.desc}</div>
              <ul className="space-y-1">
                {era.examples.map(ex => (
                  <li key={ex} className="text-xs text-foreground/70 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      era.color === "amber" ? "bg-amber-400" : era.color === "blue" ? "bg-blue-400" : "bg-primary"
                    }`} />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
            {i < eras.length - 1 && (
              <div className="text-muted-foreground text-xl font-bold md:rotate-0 rotate-90">→</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">Each era didn't replace the last — they stacked on top. Today's AI products use all three.</p>
    </DiagramWrapper>
  );
}

function LLMFlow() {
  const steps = [
    { icon: "💬", label: "Your Text Input", sub: '"Summarize this article..."', color: "default" as const },
    { icon: "✂️", label: "Tokenizer", sub: "Splits text into tokens (~4 chars each)", color: "blue" as const },
    { icon: "🔢", label: "Embeddings", sub: "Converts tokens into numbers (vectors)", color: "purple" as const },
    { icon: "🧠", label: "Transformer Layers", sub: "Attention mechanism weighs context", color: "primary" as const },
    { icon: "🎲", label: "Sampling", sub: "Picks next token (temperature controls randomness)", color: "accent" as const },
    { icon: "📝", label: "Output Text", sub: "Generated word by word", color: "green" as const },
  ];
  return (
    <DiagramWrapper title="How LLMs Process Your Input">
      <div className="flex flex-col items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center gap-1 w-full">
            <div className={`w-full max-w-sm rounded-xl border px-4 py-3 flex items-center gap-3 ${
              step.color === "default" ? "bg-muted/50 border-border" :
              step.color === "blue" ? "bg-blue-500/10 border-blue-500/25" :
              step.color === "purple" ? "bg-purple-500/10 border-purple-500/25" :
              step.color === "primary" ? "bg-primary/10 border-primary/25" :
              step.color === "accent" ? "bg-[hsl(172_76%_42%)]/10 border-[hsl(172_76%_42%)]/25" :
              "bg-green-500/10 border-green-500/25"
            }`}>
              <span className="text-xl">{step.icon}</span>
              <div>
                <div className="text-sm font-bold text-foreground">{step.label}</div>
                <div className="text-xs text-muted-foreground">{step.sub}</div>
              </div>
            </div>
            {i < steps.length - 1 && <Arrow dir="down" />}
          </div>
        ))}
      </div>
    </DiagramWrapper>
  );
}

function AIvsTraditional() {
  return (
    <DiagramWrapper title="Traditional Software vs AI Software">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="text-center font-bold text-foreground pb-1 border-b border-border">Traditional Software</div>
          {[
            { step: "1", text: "Human writes explicit rules", icon: "👤" },
            { step: "2", text: "Rules compiled into code", icon: "💻" },
            { step: "3", text: "Computer executes rules", icon: "⚙️" },
            { step: "4", text: "Output is predictable", icon: "✅" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-full bg-amber-500/8 border border-amber-500/20 rounded-xl px-3 py-2.5 flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs text-foreground/80">{item.text}</span>
              </div>
              {i < 3 && <Arrow dir="down" />}
            </div>
          ))}
          <div className="text-center">
            <span className="text-xs px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 font-semibold">Deterministic — same input, same output always</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-center font-bold text-foreground pb-1 border-b border-border">AI Software</div>
          {[
            { step: "1", text: "Human provides examples (data)", icon: "📊" },
            { step: "2", text: "Model learns patterns", icon: "🧠" },
            { step: "3", text: "Model generates its own rules", icon: "🔮" },
            { step: "4", text: "Output is probabilistic", icon: "🎲" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-full bg-primary/8 border border-primary/20 rounded-xl px-3 py-2.5 flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs text-foreground/80">{item.text}</span>
              </div>
              {i < 3 && <Arrow dir="down" />}
            </div>
          ))}
          <div className="text-center">
            <span className="text-xs px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary font-semibold">Probabilistic — same input can produce different outputs</span>
          </div>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function AICapabilitiesMap() {
  return (
    <DiagramWrapper title="AI Capability vs Reliability Map">
      <div className="relative aspect-square max-w-sm mx-auto">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-6">
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center p-3 text-center">
            <div className="text-lg mb-1">⚠️</div>
            <div className="text-xs font-bold text-amber-400">High Capability</div>
            <div className="text-xs font-bold text-amber-400">Low Reliability</div>
            <div className="text-[10px] text-muted-foreground mt-1">Powerful but risky — needs human oversight</div>
          </div>
          <div className="rounded-xl bg-green-500/10 border border-green-500/20 flex flex-col items-center justify-center p-3 text-center">
            <div className="text-lg mb-1">🏆</div>
            <div className="text-xs font-bold text-green-400">High Capability</div>
            <div className="text-xs font-bold text-green-400">High Reliability</div>
            <div className="text-[10px] text-muted-foreground mt-1">Ship it — ideal for production</div>
          </div>
          <div className="rounded-xl bg-muted/60 border border-border flex flex-col items-center justify-center p-3 text-center">
            <div className="text-lg mb-1">🗑️</div>
            <div className="text-xs font-bold text-muted-foreground">Low Capability</div>
            <div className="text-xs font-bold text-muted-foreground">Low Reliability</div>
            <div className="text-[10px] text-muted-foreground mt-1">Don't build — neither useful nor safe</div>
          </div>
          <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center p-3 text-center">
            <div className="text-lg mb-1">🛠️</div>
            <div className="text-xs font-bold text-blue-400">Low Capability</div>
            <div className="text-xs font-bold text-blue-400">High Reliability</div>
            <div className="text-[10px] text-muted-foreground mt-1">Good for internal tools — limited value</div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-px" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold text-muted-foreground uppercase tracking-wider -translate-x-1">← Capability →</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">← Reliability →</div>
      </div>
    </DiagramWrapper>
  );
}

function ProblemFramingTree() {
  return (
    <DiagramWrapper title="Should You Solve This With AI? Decision Tree">
      <div className="flex flex-col items-center gap-3">
        <Box color="primary" size="lg" className="w-full max-w-xs">Start: Define your problem clearly</Box>
        <Arrow dir="down" />
        <div className="w-full max-w-xs bg-amber-500/10 border border-amber-500/25 rounded-xl px-4 py-3 text-center">
          <div className="text-xs font-bold text-amber-400 mb-0.5">Decision</div>
          <div className="text-sm font-semibold text-foreground">Can you define what "correct" looks like?</div>
        </div>
        <div className="flex items-start gap-6 w-full max-w-md">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-bold text-red-400 uppercase">No →</div>
            <Box color="red" size="sm" className="w-full">Clarify the problem first — AI can't help if success is undefined</Box>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="text-xs font-bold text-green-400 uppercase">Yes →</div>
            <Arrow dir="down" />
            <div className="w-full bg-amber-500/10 border border-amber-500/25 rounded-xl px-3 py-2.5 text-center">
              <div className="text-xs font-bold text-amber-400 mb-0.5">Decision</div>
              <div className="text-xs font-semibold text-foreground">Do you have enough data or examples?</div>
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex-1">
                <div className="text-[10px] font-bold text-red-400 text-center mb-1">No →</div>
                <Box color="amber" size="sm" className="w-full text-[10px]">Collect data first or use prompting/few-shot</Box>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-green-400 text-center mb-1">Yes →</div>
                <Box color="green" size="sm" className="w-full text-[10px]">✅ Build it with AI</Box>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">If you can't measure success, no AI system can succeed either.</p>
      </div>
    </DiagramWrapper>
  );
}

function ROIComplexityMatrix() {
  const items = [
    { label: "Automate Emails", zone: "tl", x: 30, y: 25 },
    { label: "AI Chatbot", zone: "tl", x: 45, y: 42 },
    { label: "RAG Search", zone: "tr", x: 65, y: 28 },
    { label: "AI Copilot", zone: "tr", x: 72, y: 45 },
    { label: "Summarizer", zone: "tl", x: 25, y: 55 },
    { label: "Custom LLM", zone: "tr", x: 82, y: 65 },
  ];
  return (
    <DiagramWrapper title="ROI vs Complexity Matrix — Where to Start">
      <div className="relative w-full max-w-sm mx-auto" style={{ height: 280 }}>
        <div className="absolute inset-8 grid grid-cols-2 grid-rows-2 gap-1">
          <div className="rounded-tl-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <div className="text-center p-2">
              <div className="text-base">🚀</div>
              <div className="text-[10px] font-bold text-green-400">Quick Wins</div>
              <div className="text-[9px] text-muted-foreground">High ROI, Low Complexity</div>
            </div>
          </div>
          <div className="rounded-tr-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <div className="text-center p-2">
              <div className="text-base">🏗️</div>
              <div className="text-[10px] font-bold text-primary">Strategic Bets</div>
              <div className="text-[9px] text-muted-foreground">High ROI, High Complexity</div>
            </div>
          </div>
          <div className="rounded-bl-xl bg-muted/50 border border-border flex items-center justify-center">
            <div className="text-center p-2">
              <div className="text-base">🗑️</div>
              <div className="text-[10px] font-bold text-muted-foreground">Avoid</div>
              <div className="text-[9px] text-muted-foreground">Low ROI, Low Complexity</div>
            </div>
          </div>
          <div className="rounded-br-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <div className="text-center p-2">
              <div className="text-base">⚠️</div>
              <div className="text-[10px] font-bold text-amber-400">Think Carefully</div>
              <div className="text-[9px] text-muted-foreground">Low ROI, High Complexity</div>
            </div>
          </div>
        </div>
        <div className="absolute left-2 bottom-8 top-8 flex items-center">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>ROI ↑</span>
        </div>
        <div className="absolute left-8 right-0 bottom-2 flex justify-center">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Complexity →</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">Always start in the Quick Wins quadrant to build momentum and prove AI's value.</p>
    </DiagramWrapper>
  );
}

function WhenNotAI() {
  const noGo = [
    { icon: "❌", text: "The task changes too fast for a model to keep up" },
    { icon: "❌", text: "You can't define what 'good output' looks like" },
    { icon: "❌", text: "Errors would cause serious harm (legal, medical, safety)" },
    { icon: "❌", text: "You have less than ~100 quality examples to learn from" },
    { icon: "❌", text: "The simpler rule-based solution already works well" },
  ];
  const goAhead = [
    { icon: "✅", text: "Task is repetitive, high-volume, and well-defined" },
    { icon: "✅", text: "Output quality can be measured and improved" },
    { icon: "✅", text: "Human review can catch edge cases before harm occurs" },
    { icon: "✅", text: "Speed or scale creates meaningful business value" },
  ];
  return (
    <DiagramWrapper title="AI Go / No-Go Framework">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">Do NOT Use AI When...</div>
          <div className="space-y-2">
            {noGo.map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-red-500/5 border border-red-500/15 rounded-xl px-3 py-2">
                <span className="text-sm flex-shrink-0 mt-0.5">{item.icon}</span>
                <span className="text-xs text-foreground/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">Green Light For AI When...</div>
          <div className="space-y-2">
            {goAhead.map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-green-500/5 border border-green-500/15 rounded-xl px-3 py-2">
                <span className="text-sm flex-shrink-0 mt-0.5">{item.icon}</span>
                <span className="text-xs text-foreground/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function AIStrategyMatrix() {
  return (
    <DiagramWrapper title="AI Product Strategy: Native vs Enabled">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-xl bg-primary/10 border-2 border-primary/30 p-4">
          <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">AI-Native</div>
          <div className="text-sm font-bold text-foreground mb-2">Product can't exist without AI</div>
          <ul className="space-y-1">
            {["ChatGPT", "Midjourney", "GitHub Copilot", "Perplexity"].map(ex => (
              <li key={ex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {ex}
              </li>
            ))}
          </ul>
          <div className="mt-3 text-[10px] text-primary font-semibold">Highest defensibility • Hardest to build</div>
        </div>
        <div className="rounded-xl bg-accent/10 border-2 border-accent/30 p-4" style={{ "--accent": "172 76% 42%" } as React.CSSProperties}>
          <div className="text-xs font-bold text-[hsl(172_76%_42%)] uppercase tracking-wider mb-1">AI-Enabled</div>
          <div className="text-sm font-bold text-foreground mb-2">Existing product supercharged by AI</div>
          <ul className="space-y-1">
            {["Notion AI", "Grammarly", "Figma AI", "Salesforce Einstein"].map(ex => (
              <li key={ex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(172_76%_42%)] flex-shrink-0" /> {ex}
              </li>
            ))}
          </ul>
          <div className="mt-3 text-[10px] text-[hsl(172_76%_42%)] font-semibold">Leverages existing moat • Most common path</div>
        </div>
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">AI Feature</div>
          <div className="text-sm font-bold text-foreground mb-2">One AI feature in a larger product</div>
          <ul className="space-y-1">
            {["Gmail Smart Reply", "Spotify DJ", "Apple Siri"].map(ex => (
              <li key={ex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" /> {ex}
              </li>
            ))}
          </ul>
          <div className="mt-3 text-[10px] text-amber-400 font-semibold">Quick to ship • Easily replicated</div>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-4">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">AI Experiment</div>
          <div className="text-sm font-bold text-foreground mb-2">Exploring AI's potential in the product</div>
          <ul className="space-y-1">
            {["Internal tools", "Beta features", "Research prototypes"].map(ex => (
              <li key={ex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" /> {ex}
              </li>
            ))}
          </ul>
          <div className="mt-3 text-[10px] text-muted-foreground font-semibold">Learning phase • Build toward the others</div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center">Start with experiments → graduate to features → build toward Native or Enabled strategy.</p>
    </DiagramWrapper>
  );
}

function DataFlywheel() {
  const steps = [
    { icon: "👤", label: "More Users", color: "primary" },
    { icon: "📊", label: "More Data", color: "blue" },
    { icon: "🧠", label: "Better Model", color: "purple" },
    { icon: "✨", label: "Better UX", color: "accent" },
  ];
  return (
    <DiagramWrapper title="The AI Data Flywheel — Your Competitive Moat">
      <div className="relative flex items-center justify-center" style={{ height: 220 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-center p-2">
            <span className="text-xs font-bold text-primary leading-tight">Compounding<br />Advantage</span>
          </div>
        </div>
        {steps.map((step, i) => {
          const angles = [270, 0, 90, 180];
          const angle = angles[i] * (Math.PI / 180);
          const r = 85;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <div
              key={step.label}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className={`rounded-xl border px-3 py-2 text-center min-w-[80px] ${
                step.color === "primary" ? "bg-primary/15 border-primary/30" :
                step.color === "blue" ? "bg-blue-500/15 border-blue-500/30" :
                step.color === "purple" ? "bg-purple-500/15 border-purple-500/30" :
                "bg-[hsl(172_76%_42%)]/15 border-[hsl(172_76%_42%)]/30"
              }`}>
                <div className="text-lg">{step.icon}</div>
                <div className="text-[10px] font-bold text-foreground">{step.label}</div>
              </div>
            </div>
          );
        })}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 2" />
          {[270, 0, 90, 180].map((deg, i) => {
            const startAngle = (deg + 20) * (Math.PI / 180);
            const endAngle = (deg + 70) * (Math.PI / 180);
            const r = 42;
            const sx = 50 + r * Math.cos(startAngle);
            const sy = 50 + r * Math.sin(startAngle);
            const ex = 50 + r * Math.cos(endAngle);
            const ey = 50 + r * Math.sin(endAngle);
            return (
              <path
                key={i}
                d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.8"
                opacity="0.4"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
          <defs>
            <marker id="arrowhead" markerWidth="3" markerHeight="3" refX="2" refY="1.5" orient="auto">
              <polygon points="0 0, 3 1.5, 0 3" fill="hsl(var(--primary))" opacity="0.6" />
            </marker>
          </defs>
        </svg>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">The more users you have, the more data you collect, which improves your model, which attracts more users. This is how AI companies build defensible moats.</p>
    </DiagramWrapper>
  );
}

function AIUXFourPillars() {
  const pillars = [
    { icon: "🎲", title: "Uncertainty", desc: "Always communicate confidence levels. Never present AI output as fact.", example: "Show confidence bars, say 'Suggested:' not 'The answer is:'", color: "primary" as const },
    { icon: "🔍", title: "Transparency", desc: "Show users how AI made its decision so they can trust or challenge it.", example: "Show sources, explain reasoning, reveal what data was used", color: "blue" as const },
    { icon: "🎮", title: "Control", desc: "Users must always be able to override, edit, or reject AI output.", example: "Editable AI suggestions, undo buttons, manual override mode", color: "purple" as const },
    { icon: "🔄", title: "Feedback", desc: "Build in mechanisms for users to correct AI so it improves over time.", example: "Thumbs up/down, 'Was this helpful?', correction flows", color: "green" as const },
  ];
  return (
    <DiagramWrapper title="The 4 Core Principles of AI UX Design">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pillars.map((p) => (
          <div key={p.title} className={`rounded-xl border p-4 ${
            p.color === "primary" ? "bg-primary/8 border-primary/20" :
            p.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
            p.color === "purple" ? "bg-purple-500/8 border-purple-500/20" :
            "bg-green-500/8 border-green-500/20"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{p.icon}</span>
              <span className={`font-bold text-sm ${
                p.color === "primary" ? "text-primary" :
                p.color === "blue" ? "text-blue-400" :
                p.color === "purple" ? "text-purple-400" :
                "text-green-400"
              }`}>{p.title}</span>
            </div>
            <p className="text-xs text-foreground/85 mb-2">{p.desc}</p>
            <div className="text-[10px] text-muted-foreground bg-muted/40 rounded-lg px-2 py-1.5">{p.example}</div>
          </div>
        ))}
      </div>
    </DiagramWrapper>
  );
}

function HumanInLoop() {
  return (
    <DiagramWrapper title="Human-in-the-Loop AI Workflow">
      <div className="flex flex-col items-center gap-2">
        <Box color="primary" className="w-full max-w-xs">User submits request</Box>
        <Arrow dir="down" />
        <Box color="blue" className="w-full max-w-xs">🤖 AI generates output</Box>
        <Arrow dir="down" />
        <div className="w-full max-w-xs rounded-xl border-2 border-amber-500/30 bg-amber-500/8 p-4 text-center">
          <div className="text-xs font-bold text-amber-400 mb-2 uppercase">Human Review Gate</div>
          <div className="flex justify-center gap-3">
            <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1.5 text-xs text-green-400 font-semibold">✅ Approve</div>
            <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-1.5 text-xs text-amber-400 font-semibold">✏️ Edit</div>
            <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-lg px-2 py-1.5 text-xs text-red-400 font-semibold">❌ Reject</div>
          </div>
        </div>
        <div className="flex gap-4 w-full max-w-xs">
          <div className="flex-1 flex flex-col items-center gap-1">
            <Arrow dir="down" />
            <Box color="green" size="sm" className="w-full">Output delivered</Box>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <Arrow dir="down" />
            <Box color="amber" size="sm" className="w-full">Edited output</Box>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <Arrow dir="down" />
            <Box color="red" size="sm" className="w-full">Re-generate</Box>
          </div>
        </div>
        <div className="w-full max-w-xs mt-2 rounded-xl bg-primary/5 border border-primary/15 px-3 py-2 text-center">
          <p className="text-[10px] text-primary font-semibold">All paths feed corrections back to improve future AI outputs</p>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function ConversationVsStructured() {
  return (
    <DiagramWrapper title="Conversational UI vs Structured UI — When to Use Which">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="font-bold text-sm text-center mb-3 text-foreground">Conversational UI</div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
            <div className="px-3 py-2 bg-primary/10 text-xs font-semibold text-primary">Chat Interface</div>
            <div className="p-3 space-y-2">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">Summarize this article for me</div>
              </div>
              <div className="flex">
                <div className="bg-muted text-foreground text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">Here's a 3-point summary: 1. AI adoption is accelerating... 2. The key bottleneck is...</div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">Make it shorter</div>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="text-[10px] text-green-400 font-semibold">✅ Best for: Open-ended, exploratory, complex tasks</div>
            <div className="text-[10px] text-red-400 font-semibold">❌ Avoid when: Output needs consistent structure</div>
          </div>
        </div>
        <div>
          <div className="font-bold text-sm text-center mb-3 text-foreground">Structured UI</div>
          <div className="rounded-xl border border-accent/20 bg-accent/5 overflow-hidden" style={{ "--accent-color": "hsl(172 76% 42%)" } as React.CSSProperties}>
            <div className="px-3 py-2 bg-[hsl(172_76%_42%)]/10 text-xs font-semibold text-[hsl(172_76%_42%)]">Form + AI Output</div>
            <div className="p-3 space-y-2">
              <div className="space-y-1.5">
                <div className="text-[10px] text-muted-foreground font-semibold">Tone</div>
                <div className="flex gap-1.5">
                  {["Professional", "Casual", "Friendly"].map((t, i) => (
                    <div key={t} className={`text-[10px] px-2 py-1 rounded-lg border flex-1 text-center font-medium ${i === 0 ? "bg-[hsl(172_76%_42%)]/20 border-[hsl(172_76%_42%)]/40 text-[hsl(172_76%_42%)]" : "bg-muted border-border text-muted-foreground"}`}>{t}</div>
                  ))}
                </div>
                <div className="text-[10px] text-muted-foreground font-semibold">Length</div>
                <div className="h-1.5 bg-muted rounded-full">
                  <div className="h-full w-1/2 bg-[hsl(172_76%_42%)] rounded-full" />
                </div>
                <div className="text-[10px] bg-muted/60 border border-border rounded-lg p-2 text-foreground/70">AI-generated output appears here based on your settings above...</div>
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="text-[10px] text-green-400 font-semibold">✅ Best for: Consistent, high-volume, predictable outputs</div>
            <div className="text-[10px] text-red-400 font-semibold">❌ Avoid when: User needs to explore or iterate freely</div>
          </div>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function RAGArchitecture() {
  const steps = [
    { icon: "❓", label: "User Query", sub: '"What is our refund policy?"', color: "default" as const },
    { icon: "🔢", label: "Embed Query", sub: "Query → vector representation", color: "blue" as const },
    { icon: "🔍", label: "Vector Search", sub: "Find nearest neighbors in DB", color: "purple" as const },
    { icon: "📄", label: "Retrieved Chunks", sub: "Top 3-5 relevant doc sections", color: "amber" as const },
    { icon: "🤖", label: "LLM + Prompt", sub: "Query + chunks + system prompt", color: "primary" as const },
    { icon: "💬", label: "Grounded Response", sub: "Answer based on your docs only", color: "green" as const },
  ];
  return (
    <DiagramWrapper title="RAG Architecture — Retrieval-Augmented Generation">
      <div className="flex items-center gap-1.5 flex-wrap justify-center mb-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5">
            <div className={`rounded-xl border px-3 py-2 text-center min-w-[80px] max-w-[100px] ${
              step.color === "default" ? "bg-muted/50 border-border" :
              step.color === "blue" ? "bg-blue-500/10 border-blue-500/25" :
              step.color === "purple" ? "bg-purple-500/10 border-purple-500/25" :
              step.color === "amber" ? "bg-amber-500/10 border-amber-500/25" :
              step.color === "primary" ? "bg-primary/10 border-primary/25" :
              "bg-green-500/10 border-green-500/25"
            }`}>
              <div className="text-base">{step.icon}</div>
              <div className="text-[10px] font-bold text-foreground leading-tight">{step.label}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{step.sub}</div>
            </div>
            {i < steps.length - 1 && <Arrow dir="right" className="text-sm" />}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-primary/5 border border-primary/15 px-4 py-3">
        <div className="text-xs font-bold text-primary mb-1">Why RAG matters:</div>
        <div className="text-xs text-muted-foreground">Without RAG, LLMs hallucinate facts not in their training data. With RAG, every answer is grounded in your actual documents — dramatically reducing hallucinations.</div>
      </div>
    </DiagramWrapper>
  );
}

function AgentLoop() {
  return (
    <DiagramWrapper title="The AI Agent Loop — How Agents Think and Act">
      <div className="relative flex items-center justify-center mb-4" style={{ height: 230 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
        </div>
        {[
          { deg: 270, icon: "👁️", label: "Observe", sub: "Read environment state", color: "blue" },
          { deg: 0, icon: "🧠", label: "Plan", sub: "Decide next action", color: "purple" },
          { deg: 90, icon: "⚡", label: "Act", sub: "Call tool or API", color: "primary" },
          { deg: 180, icon: "📊", label: "Update", sub: "Process tool results", color: "accent" },
        ].map((step) => {
          const angle = step.deg * (Math.PI / 180);
          const r = 85;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <div
              key={step.label}
              className="absolute text-center"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className={`rounded-xl border px-3 py-2 min-w-[80px] ${
                step.color === "blue" ? "bg-blue-500/15 border-blue-500/30" :
                step.color === "purple" ? "bg-purple-500/15 border-purple-500/30" :
                step.color === "primary" ? "bg-primary/15 border-primary/30" :
                "bg-[hsl(172_76%_42%)]/15 border-[hsl(172_76%_42%)]/30"
              }`}>
                <div className="text-lg">{step.icon}</div>
                <div className="text-[10px] font-bold text-foreground">{step.label}</div>
                <div className="text-[9px] text-muted-foreground">{step.sub}</div>
              </div>
            </div>
          );
        })}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {[270, 0, 90, 180].map((deg, i) => {
            const startAngle = (deg + 25) * (Math.PI / 180);
            const endAngle = (deg + 65) * (Math.PI / 180);
            const r = 42;
            const sx = 50 + r * Math.cos(startAngle);
            const sy = 50 + r * Math.sin(startAngle);
            const ex = 50 + r * Math.cos(endAngle);
            const ey = 50 + r * Math.sin(endAngle);
            return (
              <path key={i} d={`M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`}
                fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0.5"
                markerEnd="url(#arrowAgent)" />
            );
          })}
          <defs>
            <marker id="arrowAgent" markerWidth="3" markerHeight="3" refX="2" refY="1.5" orient="auto">
              <polygon points="0 0, 3 1.5, 0 3" fill="hsl(var(--primary))" opacity="0.7" />
            </marker>
          </defs>
        </svg>
      </div>
      <div className="rounded-xl bg-muted/40 border border-border px-4 py-3">
        <div className="text-xs font-bold text-foreground mb-2">Tools an Agent Can Use:</div>
        <div className="flex flex-wrap gap-2">
          {["🌐 Web Search", "📁 File Read/Write", "💻 Code Execution", "📧 Send Email", "🗄️ Database Query", "🔌 API Calls"].map(t => (
            <span key={t} className="text-[10px] px-2 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium">{t}</span>
          ))}
        </div>
      </div>
    </DiagramWrapper>
  );
}

function TechStackLayers() {
  const layers = [
    { label: "Your Application (UX/UI)", sub: "What users interact with", color: "primary", width: "100%", icon: "📱" },
    { label: "Orchestration Layer", sub: "LangChain, LlamaIndex, custom code", color: "accent", width: "85%", icon: "🔗" },
    { label: "Vector Database", sub: "Pinecone, Weaviate, pgvector", color: "blue", width: "70%", icon: "🗄️" },
    { label: "LLM API", sub: "OpenAI, Anthropic, Cohere, Mistral", color: "purple", width: "55%", icon: "🤖" },
    { label: "Foundation Model", sub: "GPT-4o, Claude 3, Gemini, Llama", color: "amber", width: "40%", icon: "🧠" },
  ];
  return (
    <DiagramWrapper title="Modern AI Tech Stack — Layer by Layer">
      <div className="flex flex-col items-center gap-2">
        {layers.map((layer, i) => (
          <div
            key={layer.label}
            className={`rounded-xl border flex items-center gap-3 px-4 py-3 ${
              layer.color === "primary" ? "bg-primary/10 border-primary/25" :
              layer.color === "accent" ? "bg-[hsl(172_76%_42%)]/10 border-[hsl(172_76%_42%)]/25" :
              layer.color === "blue" ? "bg-blue-500/10 border-blue-500/25" :
              layer.color === "purple" ? "bg-purple-500/10 border-purple-500/25" :
              "bg-amber-500/10 border-amber-500/25"
            }`}
            style={{ width: layer.width }}
          >
            <span className="text-xl flex-shrink-0">{layer.icon}</span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-foreground truncate">{layer.label}</div>
              <div className="text-[10px] text-muted-foreground truncate">{layer.sub}</div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <Arrow dir="up" className="text-sm" />
          <span className="text-[10px] text-muted-foreground">Each layer abstracts complexity from layers above</span>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function EmbeddingsVectorSearch() {
  return (
    <DiagramWrapper title="How Embeddings & Vector Search Work">
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-center">
            <div className="text-base mb-1">📝</div>
            <div className="text-xs font-bold text-foreground">Text Input</div>
            <div className="text-[10px] text-muted-foreground mt-1 font-mono">"AI PM course"</div>
          </div>
          <Arrow dir="right" />
          <div className="rounded-xl border border-blue-500/25 bg-blue-500/10 px-4 py-3 text-center">
            <div className="text-base mb-1">🧮</div>
            <div className="text-xs font-bold text-blue-400">Embedding Model</div>
            <div className="text-[10px] text-muted-foreground mt-1">text-embedding-3-large</div>
          </div>
          <Arrow dir="right" />
          <div className="rounded-xl border border-purple-500/25 bg-purple-500/10 px-4 py-3 text-center">
            <div className="text-base mb-1">🔢</div>
            <div className="text-xs font-bold text-purple-400">Vector</div>
            <div className="text-[10px] text-muted-foreground mt-1 font-mono">[0.12, -0.84, 0.31...]</div>
            <div className="text-[9px] text-muted-foreground">1536 dimensions</div>
          </div>
          <Arrow dir="right" />
          <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-center">
            <div className="text-base mb-1">🗄️</div>
            <div className="text-xs font-bold text-primary">Vector DB</div>
            <div className="text-[10px] text-muted-foreground mt-1">Store & index all vectors</div>
          </div>
        </div>
        <div className="rounded-xl bg-muted/30 border border-border p-4">
          <div className="text-xs font-bold text-foreground mb-2 text-center">Semantic Similarity — What Makes Vector Search Powerful</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { text: '"AI product manager"', score: "0.97", close: true },
              { text: '"machine learning PM"', score: "0.91", close: true },
              { text: '"software engineer"', score: "0.34", close: false },
            ].map(item => (
              <div key={item.text} className={`rounded-lg border px-2 py-2 ${item.close ? "border-green-500/25 bg-green-500/8" : "border-border bg-muted/40"}`}>
                <div className="text-[10px] text-foreground/80 font-medium mb-1">{item.text}</div>
                <div className={`text-xs font-bold ${item.close ? "text-green-400" : "text-muted-foreground"}`}>Similarity: {item.score}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">Vector search finds semantically similar content — not just exact keyword matches.</p>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function ModelSelectionTree() {
  return (
    <DiagramWrapper title="Which AI Model Should You Use? Decision Guide">
      <div className="space-y-3">
        <div className="flex flex-col items-center gap-2">
          <Box color="primary" size="sm" className="w-full max-w-xs text-xs">Start: What is the primary task?</Box>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { task: "📝 Text & Reasoning", recs: ["GPT-4o", "Claude 3.5", "Gemini 1.5"], color: "primary" as const },
            { task: "🖼️ Image Understanding", recs: ["GPT-4 Vision", "Claude 3 Opus", "Gemini Vision"], color: "blue" as const },
            { task: "💻 Code Generation", recs: ["GPT-4o", "Claude 3.5 Sonnet", "Codestral"], color: "purple" as const },
          ].map(item => (
            <div key={item.task} className={`rounded-xl border p-3 text-center ${
              item.color === "primary" ? "bg-primary/8 border-primary/20" :
              item.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
              "bg-purple-500/8 border-purple-500/20"
            }`}>
              <div className="text-base mb-1">{item.task.split(" ")[0]}</div>
              <div className="text-[10px] font-bold text-foreground mb-2">{item.task.split(" ").slice(1).join(" ")}</div>
              <div className="space-y-1">
                {item.recs.map(r => (
                  <div key={r} className="text-[9px] bg-muted/40 rounded-md px-1.5 py-0.5 text-muted-foreground">{r}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "⚡ Latency Critical?", pick: "Use smaller/faster models: GPT-3.5, Claude Haiku, Gemini Flash", color: "amber" as const },
            { label: "💰 Cost Critical?", pick: "Use open-source: Llama 3, Mistral, or quantized models on GPU", color: "green" as const },
          ].map(item => (
            <div key={item.label} className={`rounded-xl border p-3 ${
              item.color === "amber" ? "bg-amber-500/8 border-amber-500/20" : "bg-green-500/8 border-green-500/20"
            }`}>
              <div className={`text-xs font-bold mb-1 ${item.color === "amber" ? "text-amber-400" : "text-green-400"}`}>{item.label}</div>
              <div className="text-[10px] text-muted-foreground">{item.pick}</div>
            </div>
          ))}
        </div>
      </div>
    </DiagramWrapper>
  );
}

function PromptAnatomy() {
  const parts = [
    { label: "SYSTEM PROMPT", desc: "Defines the AI's persona, constraints, and goals", example: 'You are a helpful customer support agent for Acme Corp. Always be polite and factual. Never make up information.', color: "purple" },
    { label: "CONTEXT / RAG CHUNKS", desc: "Background info the model needs to answer correctly", example: "Refund Policy: Customers may return items within 30 days with receipt. No exceptions for digital downloads.", color: "blue" },
    { label: "INSTRUCTION", desc: "The actual task you want the model to do", example: "Based on the above policy, answer the user's question clearly and briefly.", color: "primary" },
    { label: "USER INPUT", desc: "What the user actually asks", example: "Can I return software I bought 3 weeks ago?", color: "accent" },
    { label: "OUTPUT FORMAT", desc: "Tell the model how to structure its response", example: "Respond in 2 sentences. Start with the direct answer, then explain why.", color: "green" },
  ];
  return (
    <DiagramWrapper title="Anatomy of a High-Quality Prompt">
      <div className="space-y-2">
        {parts.map(part => (
          <div key={part.label} className={`rounded-xl border overflow-hidden ${
            part.color === "purple" ? "border-purple-500/25" :
            part.color === "blue" ? "border-blue-500/25" :
            part.color === "primary" ? "border-primary/25" :
            part.color === "accent" ? "border-[hsl(172_76%_42%)]/25" :
            "border-green-500/25"
          }`}>
            <div className={`px-3 py-1.5 flex items-center gap-2 ${
              part.color === "purple" ? "bg-purple-500/15" :
              part.color === "blue" ? "bg-blue-500/15" :
              part.color === "primary" ? "bg-primary/15" :
              part.color === "accent" ? "bg-[hsl(172_76%_42%)]/15" :
              "bg-green-500/15"
            }`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                part.color === "purple" ? "text-purple-400" :
                part.color === "blue" ? "text-blue-400" :
                part.color === "primary" ? "text-primary" :
                part.color === "accent" ? "text-[hsl(172_76%_42%)]" :
                "text-green-400"
              }`}>{part.label}</span>
              <span className="text-[10px] text-muted-foreground">— {part.desc}</span>
            </div>
            <div className="px-3 py-2 bg-muted/20">
              <code className="text-[10px] text-foreground/70 font-mono">{part.example}</code>
            </div>
          </div>
        ))}
      </div>
    </DiagramWrapper>
  );
}

function ABTestingLoop() {
  return (
    <DiagramWrapper title="The Prompt A/B Testing Iteration Loop">
      <div className="flex flex-col items-center gap-2">
        <Box color="default" className="w-full max-w-xs">📊 Define: What output quality metric matters?</Box>
        <Arrow dir="down" />
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          <div className="flex flex-col items-center gap-1.5">
            <Box color="primary" size="sm" className="w-full">Prompt A (control)</Box>
            <div className="text-[10px] text-muted-foreground text-center px-2">Your current best prompt</div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Box color="accent" size="sm" className="w-full">Prompt B (variant)</Box>
            <div className="text-[10px] text-muted-foreground text-center px-2">One change at a time</div>
          </div>
        </div>
        <Arrow dir="down" />
        <Box color="blue" size="sm" className="w-full max-w-xs">Run both on same 20+ test inputs</Box>
        <Arrow dir="down" />
        <Box color="purple" size="sm" className="w-full max-w-xs">🧑 Human or LLM-as-judge scores each output</Box>
        <Arrow dir="down" />
        <div className="flex gap-3 w-full max-w-xs">
          <div className="flex-1 flex flex-col items-center gap-1">
            <Box color="green" size="sm" className="w-full text-[10px]">B wins → promote B to control</Box>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <Box color="amber" size="sm" className="w-full text-[10px]">A wins → try different variant</Box>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] text-muted-foreground">Repeat until you hit quality threshold</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <p className="text-[10px] text-muted-foreground text-center">Key rule: change ONE variable at a time. Multiple changes make it impossible to know what improved performance.</p>
      </div>
    </DiagramWrapper>
  );
}

function EvalPipeline() {
  const steps = [
    { icon: "📝", label: "Golden Dataset", sub: "20-100 curated (input, expected output) pairs", color: "amber" as const },
    { icon: "🤖", label: "Run LLM", sub: "Generate outputs for all test inputs", color: "primary" as const },
    { icon: "⚖️", label: "Evaluator", sub: "Human review OR LLM-as-judge", color: "purple" as const },
    { icon: "📊", label: "Scores", sub: "Accuracy, hallucination rate, helpfulness", color: "blue" as const },
    { icon: "🎯", label: "Pass / Fail", sub: "vs your quality threshold", color: "green" as const },
  ];
  return (
    <DiagramWrapper title="The AI Evaluation Pipeline">
      <div className="flex items-center gap-1.5 flex-wrap justify-center mb-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5">
            <div className={`rounded-xl border px-3 py-2.5 text-center min-w-[80px] ${
              step.color === "amber" ? "bg-amber-500/10 border-amber-500/25" :
              step.color === "primary" ? "bg-primary/10 border-primary/25" :
              step.color === "purple" ? "bg-purple-500/10 border-purple-500/25" :
              step.color === "blue" ? "bg-blue-500/10 border-blue-500/25" :
              "bg-green-500/10 border-green-500/25"
            }`}>
              <div className="text-base">{step.icon}</div>
              <div className="text-[10px] font-bold text-foreground leading-tight">{step.label}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{step.sub}</div>
            </div>
            {i < steps.length - 1 && <Arrow dir="right" className="text-sm" />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-2">
        {[
          { metric: "Accuracy", desc: "% correct vs golden answers", color: "green" },
          { metric: "Hallucination Rate", desc: "% outputs with made-up facts", color: "red" },
          { metric: "Latency p95", desc: "95th percentile response time", color: "blue" },
        ].map(m => (
          <div key={m.metric} className={`rounded-xl border p-3 text-center ${
            m.color === "green" ? "bg-green-500/8 border-green-500/20" :
            m.color === "red" ? "bg-red-500/8 border-red-500/20" :
            "bg-blue-500/8 border-blue-500/20"
          }`}>
            <div className={`text-xs font-bold mb-0.5 ${
              m.color === "green" ? "text-green-400" : m.color === "red" ? "text-red-400" : "text-blue-400"
            }`}>{m.metric}</div>
            <div className="text-[10px] text-muted-foreground">{m.desc}</div>
          </div>
        ))}
      </div>
    </DiagramWrapper>
  );
}

function GuardrailsLayers() {
  const layers = [
    { label: "🔍 Real-Time Monitoring & Alerting", sub: "Detect and flag anomalies in production output quality and usage patterns", color: "primary" },
    { label: "👤 Human Review & Escalation", sub: "High-stakes outputs routed to human reviewer before delivery", color: "blue" },
    { label: "📤 Output Filtering", sub: "Block harmful, off-topic, or policy-violating responses before they reach users", color: "purple" },
    { label: "📥 Input Validation", sub: "Block prompt injections, jailbreaks, and off-topic queries at entry", color: "amber" },
    { label: "🧠 Model Alignment (RLHF)", sub: "Base model trained to refuse harmful requests and follow safety guidelines", color: "green" },
  ];
  return (
    <DiagramWrapper title="AI Safety Guardrails — Defense in Layers">
      <div className="space-y-2">
        {layers.map((layer, i) => (
          <div key={layer.label} className={`rounded-xl border px-4 py-3 flex items-start gap-3 ${
            layer.color === "primary" ? "bg-primary/8 border-primary/20" :
            layer.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
            layer.color === "purple" ? "bg-purple-500/8 border-purple-500/20" :
            layer.color === "amber" ? "bg-amber-500/8 border-amber-500/20" :
            "bg-green-500/8 border-green-500/20"
          }`}>
            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              layer.color === "primary" ? "bg-primary/20 text-primary" :
              layer.color === "blue" ? "bg-blue-500/20 text-blue-400" :
              layer.color === "purple" ? "bg-purple-500/20 text-purple-400" :
              layer.color === "amber" ? "bg-amber-500/20 text-amber-400" :
              "bg-green-500/20 text-green-400"
            }`}>{layers.length - i}</div>
            <div>
              <div className="text-xs font-bold text-foreground">{layer.label}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{layer.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">No single guardrail is sufficient. Defense-in-depth is the only reliable approach to AI safety.</p>
    </DiagramWrapper>
  );
}

function ResponsibleAIFramework() {
  const dimensions = [
    { icon: "⚖️", label: "Fairness", desc: "Model performs equally across demographic groups", color: "primary" },
    { icon: "🔍", label: "Transparency", desc: "Decisions can be explained and audited", color: "blue" },
    { icon: "🔒", label: "Privacy", desc: "User data is protected and not used to train without consent", color: "purple" },
    { icon: "🛡️", label: "Safety", desc: "System cannot be easily misused to cause harm", color: "red" },
    { icon: "📋", label: "Accountability", desc: "Clear ownership when AI causes harm", color: "amber" },
    { icon: "🌱", label: "Sustainability", desc: "AI resource usage has minimal environmental impact", color: "green" },
  ];
  return (
    <DiagramWrapper title="Responsible AI — 6 Key Dimensions">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {dimensions.map(d => (
          <div key={d.label} className={`rounded-xl border p-3 text-center ${
            d.color === "primary" ? "bg-primary/8 border-primary/20" :
            d.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
            d.color === "purple" ? "bg-purple-500/8 border-purple-500/20" :
            d.color === "red" ? "bg-red-500/8 border-red-500/20" :
            d.color === "amber" ? "bg-amber-500/8 border-amber-500/20" :
            "bg-green-500/8 border-green-500/20"
          }`}>
            <div className="text-2xl mb-1">{d.icon}</div>
            <div className={`text-xs font-bold mb-1 ${
              d.color === "primary" ? "text-primary" :
              d.color === "blue" ? "text-blue-400" :
              d.color === "purple" ? "text-purple-400" :
              d.color === "red" ? "text-red-400" :
              d.color === "amber" ? "text-amber-400" :
              "text-green-400"
            }`}>{d.label}</div>
            <div className="text-[10px] text-muted-foreground">{d.desc}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">All six dimensions must be addressed simultaneously — optimizing one often creates tension with another.</p>
    </DiagramWrapper>
  );
}

function AIBusinessModel() {
  return (
    <DiagramWrapper title="AI Product Business Model Canvas">
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="col-span-1 rounded-xl bg-purple-500/8 border border-purple-500/20 p-3">
          <div className="text-[10px] font-bold text-purple-400 uppercase mb-1">Key Resources</div>
          <ul className="space-y-0.5 text-[10px] text-muted-foreground">
            <li>• Proprietary data</li>
            <li>• ML infrastructure</li>
            <li>• AI talent</li>
            <li>• API access</li>
          </ul>
        </div>
        <div className="col-span-1 rounded-xl bg-primary/8 border border-primary/20 p-3">
          <div className="text-[10px] font-bold text-primary uppercase mb-1">Value Proposition</div>
          <ul className="space-y-0.5 text-[10px] text-muted-foreground">
            <li>• 10x faster workflow</li>
            <li>• Personalization at scale</li>
            <li>• Predictive insights</li>
            <li>• Automation savings</li>
          </ul>
        </div>
        <div className="col-span-1 rounded-xl bg-blue-500/8 border border-blue-500/20 p-3">
          <div className="text-[10px] font-bold text-blue-400 uppercase mb-1">Customer Segments</div>
          <ul className="space-y-0.5 text-[10px] text-muted-foreground">
            <li>• Enterprise (B2B)</li>
            <li>• SMBs</li>
            <li>• Developers (API)</li>
            <li>• Consumers</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-amber-500/8 border border-amber-500/20 p-3">
          <div className="text-[10px] font-bold text-amber-400 uppercase mb-1">Cost Structure</div>
          <ul className="space-y-0.5 text-[10px] text-muted-foreground">
            <li>• API/inference costs (variable)</li>
            <li>• Model training (fixed)</li>
            <li>• Human review labor</li>
            <li>• Data storage & compute</li>
          </ul>
        </div>
        <div className="rounded-xl bg-green-500/8 border border-green-500/20 p-3">
          <div className="text-[10px] font-bold text-green-400 uppercase mb-1">Revenue Streams</div>
          <ul className="space-y-0.5 text-[10px] text-muted-foreground">
            <li>• Seat-based SaaS</li>
            <li>• Usage-based (per API call)</li>
            <li>• Outcome-based pricing</li>
            <li>• Enterprise contracts</li>
          </ul>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function UnitEconomics() {
  return (
    <DiagramWrapper title="AI Product Unit Economics — Per Output">
      <div className="space-y-4">
        <div className="flex items-center gap-2 justify-center flex-wrap">
          {[
            { label: "Input tokens", val: "1,000 tokens", cost: "$0.001", color: "amber" },
            { label: "Output tokens", val: "500 tokens", cost: "$0.002", color: "amber" },
            { label: "Vector search", val: "1 query", cost: "$0.0001", color: "blue" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`rounded-xl border px-3 py-2 text-center ${
                item.color === "amber" ? "bg-amber-500/10 border-amber-500/25" : "bg-blue-500/10 border-blue-500/25"
              }`}>
                <div className="text-[10px] font-bold text-foreground">{item.label}</div>
                <div className="text-[10px] text-muted-foreground">{item.val}</div>
                <div className={`text-xs font-bold ${item.color === "amber" ? "text-amber-400" : "text-blue-400"}`}>{item.cost}</div>
              </div>
              {i < 2 && <span className="text-muted-foreground font-bold">+</span>}
            </div>
          ))}
          <span className="text-muted-foreground font-bold">=</span>
          <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-2 text-center">
            <div className="text-[10px] font-bold text-foreground">Cost / Output</div>
            <div className="text-base font-bold text-red-400">$0.0031</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Revenue / output", val: "$0.05", note: "Charge $50 per 1000 queries", color: "green" },
            { label: "Gross Margin", val: "93.8%", note: "($0.05 - $0.003) / $0.05", color: "primary" },
            { label: "Margin at scale", val: "~90%+", note: "Bulk discounts improve costs", color: "accent" },
          ].map(item => (
            <div key={item.label} className={`rounded-xl border p-3 text-center ${
              item.color === "green" ? "bg-green-500/8 border-green-500/20" :
              item.color === "primary" ? "bg-primary/8 border-primary/20" :
              "bg-[hsl(172_76%_42%)]/8 border-[hsl(172_76%_42%)]/20"
            }`}>
              <div className={`text-base font-bold mb-0.5 ${
                item.color === "green" ? "text-green-400" :
                item.color === "primary" ? "text-primary" :
                "text-[hsl(172_76%_42%)]"
              }`}>{item.val}</div>
              <div className="text-[10px] font-semibold text-foreground">{item.label}</div>
              <div className="text-[9px] text-muted-foreground mt-1">{item.note}</div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground text-center">AI products have high gross margins but variable costs. Track cost-per-output carefully — it determines if your pricing model is viable at scale.</p>
      </div>
    </DiagramWrapper>
  );
}

function CapstoneStages() {
  const stages = [
    { n: "1", icon: "🎯", label: "Define", sub: "Pick problem & success metrics", color: "blue" },
    { n: "2", icon: "🏗️", label: "Architect", sub: "Choose stack, RAG vs FT, data plan", color: "primary" },
    { n: "3", icon: "🚀", label: "Build MVP", sub: "Working prototype in <2 weeks", color: "purple" },
    { n: "4", icon: "🔁", label: "Iterate", sub: "Eval → prompt improve → user test", color: "amber" },
    { n: "5", icon: "📣", label: "Present", sub: "Demo + metrics + lessons learned", color: "green" },
  ];
  return (
    <DiagramWrapper title="5 Stages of Your AI Capstone Project">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1.5 flex-shrink-0">
            <div className={`rounded-xl border p-3 text-center min-w-[90px] ${
              s.color === "blue" ? "bg-blue-500/10 border-blue-500/25" :
              s.color === "primary" ? "bg-primary/10 border-primary/25" :
              s.color === "purple" ? "bg-purple-500/10 border-purple-500/25" :
              s.color === "amber" ? "bg-amber-500/10 border-amber-500/25" :
              "bg-green-500/10 border-green-500/25"
            }`}>
              <div className={`text-[10px] font-bold mb-1 ${
                s.color === "blue" ? "text-blue-400" :
                s.color === "primary" ? "text-primary" :
                s.color === "purple" ? "text-purple-400" :
                s.color === "amber" ? "text-amber-400" :
                "text-green-400"
              }`}>Stage {s.n}</div>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-xs font-bold text-foreground">{s.label}</div>
              <div className="text-[9px] text-muted-foreground mt-1 leading-tight">{s.sub}</div>
            </div>
            {i < stages.length - 1 && <Arrow dir="right" className="text-sm" />}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">Each stage has a clear deliverable. Don't skip Stage 4 — iteration is where the real learning happens.</p>
    </DiagramWrapper>
  );
}

function CareerPath() {
  const path = [
    { level: "Start", title: "PM (AI-Curious)", skills: ["Takes AI course", "Reads papers", "Builds toy projects"], color: "muted", icon: "🌱" },
    { level: "Year 1–2", title: "PM with AI Skills", skills: ["Ships AI features", "Writes AI PRDs", "Runs evals"], color: "blue", icon: "📈" },
    { level: "Year 2–4", title: "AI Product Manager", skills: ["Owns full AI product", "Cross-func AI lead", "Mentors team"], color: "primary", icon: "🚀" },
    { level: "Year 4–6", title: "Senior AI PM / Director", skills: ["AI product strategy", "Team of AI PMs", "Stakeholder influence"], color: "purple", icon: "⭐" },
    { level: "Year 6+", title: "Head of AI / CPO", skills: ["Company AI vision", "Board-level AI strategy", "Thought leadership"], color: "amber", icon: "👑" },
  ];
  return (
    <DiagramWrapper title="AI PM Career Ladder — Where You're Headed">
      <div className="flex flex-col items-center gap-2">
        {[...path].reverse().map((step, i) => (
          <div key={step.title} className={`w-full rounded-xl border p-3 flex items-center gap-3 ${
            step.color === "muted" ? "bg-muted/30 border-border" :
            step.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
            step.color === "primary" ? "bg-primary/8 border-primary/20" :
            step.color === "purple" ? "bg-purple-500/8 border-purple-500/20" :
            "bg-amber-500/8 border-amber-500/20"
          }`} style={{ marginLeft: `${i * 0}px` }}>
            <span className="text-xl flex-shrink-0">{step.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-foreground">{step.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  step.color === "muted" ? "bg-muted text-muted-foreground" :
                  step.color === "blue" ? "bg-blue-500/15 text-blue-400" :
                  step.color === "primary" ? "bg-primary/15 text-primary" :
                  step.color === "purple" ? "bg-purple-500/15 text-purple-400" :
                  "bg-amber-500/15 text-amber-400"
                }`}>{step.level}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {step.skills.map(s => (
                  <span key={s} className="text-[10px] text-muted-foreground bg-muted/50 border border-border rounded-md px-1.5 py-0.5">{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <Arrow dir="up" />
          <span className="text-xs text-muted-foreground font-semibold">Your journey up the ladder</span>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function InterviewFramework() {
  const questions = [
    { type: "Technical", q: "How would you decide between RAG and fine-tuning?", hint: "Show you understand trade-offs: RAG = fresh data, FT = style/behavior", color: "primary" },
    { type: "Strategy", q: "How do you find AI product opportunities?", hint: "Apply AI-native vs AI-enabled matrix, data flywheel thinking", color: "blue" },
    { type: "Metrics", q: "How do you measure success of an AI feature?", hint: "Accuracy, hallucination rate, user satisfaction, cost/output", color: "purple" },
    { type: "Ethics", q: "How would you handle an AI model showing bias?", hint: "Audit, disaggregate metrics, improve training data, guardrails", color: "amber" },
    { type: "PM Core", q: "How do you write a PRD for an AI product?", hint: "Include eval criteria, failure modes, human-in-loop plan, data dependencies", color: "green" },
  ];
  return (
    <DiagramWrapper title="AI PM Interview — Question Framework">
      <div className="space-y-2.5">
        {questions.map(q => (
          <div key={q.type} className={`rounded-xl border p-3 ${
            q.color === "primary" ? "bg-primary/8 border-primary/20" :
            q.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
            q.color === "purple" ? "bg-purple-500/8 border-purple-500/20" :
            q.color === "amber" ? "bg-amber-500/8 border-amber-500/20" :
            "bg-green-500/8 border-green-500/20"
          }`}>
            <div className="flex items-start gap-2">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                q.color === "primary" ? "bg-primary/20 text-primary" :
                q.color === "blue" ? "bg-blue-500/20 text-blue-400" :
                q.color === "purple" ? "bg-purple-500/20 text-purple-400" :
                q.color === "amber" ? "bg-amber-500/20 text-amber-400" :
                "bg-green-500/20 text-green-400"
              }`}>{q.type}</span>
              <div>
                <div className="text-xs font-semibold text-foreground mb-1">"{q.q}"</div>
                <div className="text-[10px] text-muted-foreground">💡 {q.hint}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DiagramWrapper>
  );
}

function FeedbackLoopArchitecture() {
  return (
    <DiagramWrapper title="Human Feedback Loop — How AI Products Actually Improve">
      <div className="space-y-3">
        <div className="flex items-center gap-2 justify-center flex-wrap">
          <Box color="primary" size="sm">AI Output Delivered</Box>
          <Arrow dir="right" />
          <Box color="blue" size="sm">User Signal Captured</Box>
          <Arrow dir="right" />
          <Box color="purple" size="sm">Signal Analyzed</Box>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { type: "Explicit", examples: ["👍 Thumbs up/down", "⭐ Rating", "✏️ User edits output", "🚩 Report button"], color: "green" },
            { type: "Implicit", examples: ["⏱️ Time on output", "🔄 Copy to clipboard", "🔁 Regenerate clicked", "🚪 Bounce rate"], color: "blue" },
            { type: "Outcome", examples: ["✅ Task completed", "💬 Follow-up question", "📤 Shared externally", "📞 Support ticket"], color: "amber" },
          ].map(f => (
            <div key={f.type} className={`rounded-xl border p-3 ${
              f.color === "green" ? "bg-green-500/8 border-green-500/20" :
              f.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
              "bg-amber-500/8 border-amber-500/20"
            }`}>
              <div className={`text-[10px] font-bold uppercase mb-2 ${
                f.color === "green" ? "text-green-400" : f.color === "blue" ? "text-blue-400" : "text-amber-400"
              }`}>{f.type} Signals</div>
              {f.examples.map(ex => (
                <div key={ex} className="text-[10px] text-muted-foreground mb-0.5">{ex}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-primary/8 border border-primary/20 px-4 py-3 flex items-center gap-3">
          <span className="text-xl">🔄</span>
          <div>
            <div className="text-xs font-bold text-primary">Signals feed back into improvement</div>
            <div className="text-[10px] text-muted-foreground">Fine-tuning data, prompt changes, system redesigns, personalization models</div>
          </div>
        </div>
      </div>
    </DiagramWrapper>
  );
}

function CaseStudyTimeline() {
  const milestones = [
    { year: "2022", event: "ChatGPT launches", impact: "1M users in 5 days — fastest product adoption in history", color: "primary" },
    { year: "2023", event: "Notion AI, GitHub Copilot scale", impact: "AI-enabled products prove B2B viability. Copilot reaches $100M ARR", color: "blue" },
    { year: "2024", event: "Agents & multimodal emerge", impact: "Products expand beyond text. Voice, vision, code execution become standard", color: "purple" },
    { year: "2025", event: "AI PM role professionalizes", impact: "34x demand growth. Dedicated AI PM teams at every major tech company", color: "amber" },
    { year: "2026+", event: "Autonomous AI workflows", impact: "AI handles multi-step business processes with minimal human intervention", color: "green" },
  ];
  return (
    <DiagramWrapper title="AI Product Case Studies — Key Milestones">
      <div className="space-y-3">
        {milestones.map((m, i) => (
          <div key={m.year} className="flex items-start gap-3">
            <div className={`flex-shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-bold text-center min-w-[48px] ${
              m.color === "primary" ? "bg-primary/15 text-primary" :
              m.color === "blue" ? "bg-blue-500/15 text-blue-400" :
              m.color === "purple" ? "bg-purple-500/15 text-purple-400" :
              m.color === "amber" ? "bg-amber-500/15 text-amber-400" :
              "bg-green-500/15 text-green-400"
            }`}>{m.year}</div>
            <div className={`flex-1 rounded-xl border p-3 ${
              m.color === "primary" ? "bg-primary/5 border-primary/15" :
              m.color === "blue" ? "bg-blue-500/5 border-blue-500/15" :
              m.color === "purple" ? "bg-purple-500/5 border-purple-500/15" :
              m.color === "amber" ? "bg-amber-500/5 border-amber-500/15" :
              "bg-green-500/5 border-green-500/15"
            }`}>
              <div className="text-xs font-bold text-foreground mb-0.5">{m.event}</div>
              <div className="text-[10px] text-muted-foreground">{m.impact}</div>
            </div>
          </div>
        ))}
      </div>
    </DiagramWrapper>
  );
}

function ImplementationRoadmap() {
  const phases = [
    { phase: "Phase 1", label: "Foundation", weeks: "Week 1–2", tasks: ["Set up evals first", "Define success metric", "Choose model & stack"], color: "blue" },
    { phase: "Phase 2", label: "Prototype", weeks: "Week 3–4", tasks: ["Build prompt pipeline", "Connect to data", "Internal testing"], color: "primary" },
    { phase: "Phase 3", label: "Alpha", weeks: "Week 5–6", tasks: ["10–50 beta users", "Collect feedback", "Iterate on prompts"], color: "purple" },
    { phase: "Phase 4", label: "Ship", weeks: "Week 7–8", tasks: ["Monitoring & alerts", "Guardrails in place", "Gradual rollout"], color: "green" },
  ];
  return (
    <DiagramWrapper title="AI Feature Implementation Roadmap — 8 Weeks">
      <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
        {phases.map((p, i) => (
          <div key={p.phase} className="flex items-stretch gap-2 flex-shrink-0">
            <div className={`rounded-xl border p-4 min-w-[130px] flex flex-col ${
              p.color === "blue" ? "bg-blue-500/8 border-blue-500/20" :
              p.color === "primary" ? "bg-primary/8 border-primary/20" :
              p.color === "purple" ? "bg-purple-500/8 border-purple-500/20" :
              "bg-green-500/8 border-green-500/20"
            }`}>
              <div className={`text-[10px] font-bold uppercase mb-0.5 ${
                p.color === "blue" ? "text-blue-400" :
                p.color === "primary" ? "text-primary" :
                p.color === "purple" ? "text-purple-400" :
                "text-green-400"
              }`}>{p.phase}</div>
              <div className="text-sm font-bold text-foreground mb-0.5">{p.label}</div>
              <div className="text-[10px] text-muted-foreground mb-3">{p.weeks}</div>
              <div className="flex-1 space-y-1.5">
                {p.tasks.map(t => (
                  <div key={t} className="text-[10px] text-foreground/80 flex items-start gap-1">
                    <span className={`flex-shrink-0 mt-0.5 ${
                      p.color === "blue" ? "text-blue-400" :
                      p.color === "primary" ? "text-primary" :
                      p.color === "purple" ? "text-purple-400" : "text-green-400"
                    }`}>→</span> {t}
                  </div>
                ))}
              </div>
            </div>
            {i < phases.length - 1 && <div className="flex items-center"><Arrow dir="right" /></div>}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-3">Critical: set up evals in Phase 1, before writing a single prompt. You can't improve what you can't measure.</p>
    </DiagramWrapper>
  );
}

const DIAGRAMS: Record<string, React.ComponentType> = {
  "ai-eras-timeline": AIErasTimeline,
  "llm-flow": LLMFlow,
  "ai-vs-traditional": AIvsTraditional,
  "ai-capabilities-map": AICapabilitiesMap,
  "problem-framing-tree": ProblemFramingTree,
  "roi-complexity-matrix": ROIComplexityMatrix,
  "when-not-ai": WhenNotAI,
  "ai-strategy-matrix": AIStrategyMatrix,
  "data-flywheel": DataFlywheel,
  "case-study-timeline": CaseStudyTimeline,
  "ai-ux-4-pillars": AIUXFourPillars,
  "human-in-loop": HumanInLoop,
  "conversation-vs-structured": ConversationVsStructured,
  "rag-architecture": RAGArchitecture,
  "agent-loop": AgentLoop,
  "tech-stack-layers": TechStackLayers,
  "embeddings-vector-search": EmbeddingsVectorSearch,
  "model-selection-tree": ModelSelectionTree,
  "prompt-anatomy": PromptAnatomy,
  "implementation-roadmap": ImplementationRoadmap,
  "ab-testing-loop": ABTestingLoop,
  "feedback-loop": FeedbackLoopArchitecture,
  "eval-pipeline": EvalPipeline,
  "guardrails-layers": GuardrailsLayers,
  "responsible-ai-framework": ResponsibleAIFramework,
  "ai-business-model": AIBusinessModel,
  "unit-economics": UnitEconomics,
  "capstone-stages": CapstoneStages,
  "interview-framework": InterviewFramework,
  "career-path": CareerPath,
};

export function DiagramRenderer({ id }: { id: string }) {
  const Component = DIAGRAMS[id];
  if (!Component) return null;
  return <Component />;
}
