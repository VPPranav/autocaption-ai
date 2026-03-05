import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface CaptionResultsProps {
  captions: string[];
  hashtags: string[];
  loading: boolean;
}

export function CaptionResults({ captions, hashtags, loading }: CaptionResultsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    const allText = captions.join("\n\n") + "\n\n" + hashtags.join(" ");
    navigator.clipboard.writeText(allText);
    toast.success("All captions & hashtags copied!");
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-secondary/50" />
        ))}
      </div>
    );
  }

  if (captions.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Generated Captions</h3>
        <button
          onClick={copyAll}
          className="text-xs text-primary hover:underline"
        >
          Copy All
        </button>
      </div>

      <div className="space-y-3">
        {captions.map((caption, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group glass-card flex items-start gap-3 rounded-lg p-4 transition-all hover:border-primary/30"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <p className="flex-1 text-sm leading-relaxed">{caption}</p>
            <button
              onClick={() => copyToClipboard(caption, i)}
              className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {copiedIndex === i ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </button>
          </motion.div>
        ))}
      </div>

      {hashtags.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">Hashtags</h4>
          <div
            className="glass-card cursor-pointer rounded-lg p-4 transition-all hover:border-primary/30"
            onClick={() => copyToClipboard(hashtags.join(" "), -1)}
          >
            <div className="flex flex-wrap gap-1.5">
              {hashtags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
