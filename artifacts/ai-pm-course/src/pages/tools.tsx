import { TOOLS_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { Box, Wrench, Search, Star } from "lucide-react";

export default function Tools() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      <header className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">AI Tools Directory</h1>
        <p className="text-lg text-muted-foreground">
          The technical stack you need to know. You don't need to write the code, but you must understand the capabilities and constraints of these systems.
        </p>
      </header>

      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search tools, databases, frameworks..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS_DATA.map((tool, i) => (
          <motion.div 
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-1 rounded-3xl bg-gradient-to-b from-border/50 to-transparent hover:from-primary/30 transition-all duration-500"
          >
            <div className="p-6 md:p-8 rounded-[1.4rem] bg-card h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm">
                    <Wrench className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{tool.name}</h3>
                    <span className="text-sm font-medium text-primary">{tool.useCase}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-5 rounded-2xl bg-muted/50 border border-border/50 relative overflow-hidden flex-1">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" /> PM Perspective
                </h4>
                <p className="text-foreground text-sm leading-relaxed">
                  {tool.pmNotes}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
