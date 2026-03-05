import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string) => void;
  preview: string | null;
  onClear: () => void;
}

export function ImageUpload({ onImageSelected, preview, onClear }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndSet = useCallback(
    (file: File) => {
      setError(null);
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Only JPG, PNG, and WEBP files are supported.");
        return;
      }
      if (file.size > MAX_SIZE) {
        setError("File size must be under 10MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      onImageSelected(file, url);
    },
    [onImageSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files[0]) validateAndSet(e.dataTransfer.files[0]);
    },
    [validateAndSet]
  );

  return (
    <div>
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative overflow-hidden rounded-xl border border-border"
          >
            <img src={preview} alt="Upload preview" className="h-64 w-full object-cover" />
            <button
              onClick={onClear}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ACCEPTED_TYPES.join(",");
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) validateAndSet(file);
              };
              input.click();
            }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-3 text-sm font-medium">
              {dragActive ? "Drop your image here" : "Drag & drop or click to upload"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, WEBP • Max 10MB</p>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
