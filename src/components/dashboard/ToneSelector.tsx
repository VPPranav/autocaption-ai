import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const tones = [
  { value: "funny", label: "😄 Funny" },
  { value: "professional", label: "💼 Professional" },
  { value: "marketing", label: "🎯 Marketing" },
  { value: "inspirational", label: "✨ Inspirational" },
  { value: "casual", label: "😎 Casual" },
];

interface ToneSelectorProps {
  selected: string;
  onSelect: (tone: string) => void;
}

export function ToneSelector({ selected, onSelect }: ToneSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">Caption Tone</label>
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onSelect(tone.value)}
            className={`rounded-lg border px-3 py-2 text-sm transition-all ${
              selected === tone.value
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/30"
            }`}
          >
            {tone.label}
          </button>
        ))}
      </div>
    </div>
  );
}
