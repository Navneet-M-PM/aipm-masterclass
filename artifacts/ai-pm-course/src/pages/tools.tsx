import { useState } from "react";
import { TOOLS_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { Search, Star, ExternalLink, Layers, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  "Foundation Model": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Vector Database": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Framework": "bg-green-500/10 text-green-600 dark:text-green-400",
  "Model Hub": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Frontend SDK": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "Monitoring & Eval": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  "Beginner": "text-green-600 bg-green-500/10",
  "Intermediate": "text-amber-600 bg-amber-500/10",
  "Advanced": "text-red-600 bg-red-500/10",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Foundation Model": <Zap className="w-5 h-5" />,
  "Vector Database": <Layers className="w-5 h-5" />,
  "Framework": <Layers className="w-5 h-5" />,
  "Model Hub": <Shield className="w-5 h-5" />,
  "Frontend SDK": <Zap className="w-5 h-5" />,
  "Monitoring & Eval": <Star className="w-5 h-5" />,
};

export default function Tools() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(TOOLS_DATA.map(t => t.category)));

  const filtered = TOOLS_DATA.filter(tool => {
    const matchSearch = !search || [tool.name, tool.useCase, tool.description, tool.pmNotes].some(s =>
      s.toLowerCase().includes(search.toLowerCase())
    );
    const matchCat = !activeCategory || tool.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 pb-20">
      <header className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">AI Tools Directory</h1>
        <p className="text-lg text-muted-foreground">
          The technical stack every AI PM must understand. You don't need to code — but you must know what each tool does, why it exists, and what your team is trading off by choosing it.
        </p>
      </header>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools, categories, use cases..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-3 py-2 rounded-xl text-sm font-semibold border transition-all",
              !activeCategory ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
            )}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-semibold border transition-all",
                activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
          >
            {/* Card Header */}
            <div className="p-6 pb-4 border-b border-border/50">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center border border-border",
                    CATEGORY_COLORS[tool.category] || "bg-muted"
                  )}>
                    {CATEGORY_ICONS[tool.category] || <Zap className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{tool.name}</h3>
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", CATEGORY_COLORS[tool.category])}>
                      {tool.category}
                    </span>
                  </div>
                </div>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-sm font-semibold text-primary mb-1">{tool.useCase}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
            </div>

            {/* PM Notes */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1 p-4 rounded-2xl bg-muted/40 border border-border/50 relative overflow-hidden mb-4">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5 pl-3">
                  <Star className="w-3.5 h-3.5 text-primary" /> PM Perspective
                </h4>
                <p className="text-sm text-foreground leading-relaxed pl-3">{tool.pmNotes}</p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", DIFFICULTY_COLORS[tool.difficulty])}>
                  {tool.difficulty}
                </span>
                {tool.pricing && (
                  <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border font-medium">
                    {tool.pricing}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No tools match your search</p>
          <button onClick={() => { setSearch(""); setActiveCategory(null); }} className="mt-2 text-sm text-primary hover:underline">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
