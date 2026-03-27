import { TEMPLATES_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { FileText, Copy, ArrowDownToLine, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Templates() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: "Template ready to use." });
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      <header className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">Playbooks & Templates</h1>
        <p className="text-lg text-muted-foreground">
          Stop starting from a blank page. Use these battle-tested frameworks to structure your AI product decisions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES_DATA.map((template, i) => (
          <motion.div 
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col p-6 rounded-3xl bg-card border border-border hover:shadow-xl hover:border-primary/40 transition-all duration-300 group"
          >
            <div className="mb-6 flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-muted to-secondary border border-border flex items-center justify-center text-foreground group-hover:scale-110 group-hover:text-primary transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-background border border-border text-muted-foreground">
                {template.type}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2">{template.title}</h3>
            <p className="text-muted-foreground text-sm mb-8 flex-1">{template.desc}</p>
            
            <div className="flex items-center gap-2 mt-auto">
              <button 
                onClick={() => copyToClipboard(`[TEMPLATE] ${template.title}\n\n${template.desc}`)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
              <button className="px-4 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2">
                View <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
