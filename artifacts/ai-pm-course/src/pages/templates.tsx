import { useState } from "react";
import { TEMPLATES_DATA } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Copy, ExternalLink, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ContentRenderer({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-2xl font-bold text-foreground mt-6 mb-3 first:mt-0">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-base font-bold text-foreground mt-4 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
      elements.push(<p key={i} className="font-bold text-foreground mt-3 mb-1">{line.slice(2, -2)}</p>);
    } else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('☐ ') || line.startsWith('✅ ') || line.startsWith('❌ ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* ') || lines[i].startsWith('☐ ') || lines[i].startsWith('✅ ') || lines[i].startsWith('❌ '))) {
        items.push(lines[i]);
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-3 ml-2">
          {items.map((item, idx) => {
            const isCheck = item.startsWith('☐ ');
            const isGood = item.startsWith('✅ ');
            const isBad = item.startsWith('❌ ');
            const text = item.replace(/^[-*☐✅❌] /, '');
            return (
              <li key={idx} className="flex gap-2 text-sm text-foreground/80">
                <span className="flex-shrink-0 mt-0.5">
                  {isCheck ? '☐' : isGood ? '✅' : isBad ? '❌' : '•'}
                </span>
                <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              </li>
            );
          })}
        </ul>
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
        <pre key={`code-${i}`} className="my-4 p-4 rounded-xl bg-muted border border-border overflow-x-auto text-xs font-mono text-foreground/90 leading-relaxed whitespace-pre-wrap">
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
          <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>{headers.map((h, hi) => <th key={hi} className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-border text-xs">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-border/50 hover:bg-muted/30">
                    {row.map((cell, ci) => <td key={ci} className="px-4 py-2.5 text-foreground/80 text-xs" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="my-5 border-border" />);
    } else {
      const rendered = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted text-xs font-mono text-foreground/90">$1</code>');
      elements.push(<p key={i} className="text-foreground/80 leading-relaxed my-2 text-sm" dangerouslySetInnerHTML={{ __html: rendered }} />);
    }
    i++;
  }
  return <div>{elements}</div>;
}

const TYPE_COLORS: Record<string, string> = {
  Framework: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Architecture: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Evaluation: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  Launch: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Engineering: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export default function Templates() {
  const { toast } = useToast();
  const [viewTemplate, setViewTemplate] = useState<(typeof TEMPLATES_DATA)[0] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast({ title: "Copied to clipboard!", description: "Template is ready to paste." });
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10">
      <header className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">Playbooks & Templates</h1>
        <p className="text-lg text-muted-foreground">
          Battle-tested frameworks for AI product decisions. Copy, customize, and use these in your next sprint or stakeholder review.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES_DATA.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col p-6 rounded-3xl bg-card border border-border hover:shadow-xl hover:border-primary/40 transition-all duration-300 group"
          >
            <div className="mb-5 flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-muted to-secondary border border-border flex items-center justify-center group-hover:scale-110 group-hover:text-primary transition-all">
                <FileText className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${TYPE_COLORS[template.type] || "bg-muted text-muted-foreground border-border"}`}>
                {template.type}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{template.title}</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed">{template.desc}</p>

            <div className="flex items-center gap-2 mt-auto">
              <button
                onClick={() => handleCopy(template.id, template.fullContent)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                {copied === template.id ? <><Check className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
              <button
                onClick={() => setViewTemplate(template)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
              >
                View <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Content Modal */}
      <AnimatePresence>
        {viewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setViewTemplate(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card border border-border rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${TYPE_COLORS[viewTemplate.type] || "bg-muted border-border"}`}>
                    {viewTemplate.type}
                  </span>
                  <h2 className="text-2xl font-bold mt-2">{viewTemplate.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(viewTemplate.id, viewTemplate.fullContent)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all"
                  >
                    {copied === viewTemplate.id ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy All</>}
                  </button>
                  <button
                    onClick={() => setViewTemplate(null)}
                    className="w-9 h-9 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <ContentRenderer text={viewTemplate.fullContent} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
