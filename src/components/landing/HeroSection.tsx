import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { ToneSelector } from "@/components/dashboard/ToneSelector";
import { CaptionResults } from "@/components/dashboard/CaptionResults";
import { classifyImageFromUrl, labelsToHashtags } from "@/lib/vision";
import { generateCaptionsFromLabels } from "@/lib/captionGenerator";
import { hasUsedFree, markFreeUsed, isLoggedIn } from "@/lib/usageGate";
import { toast } from "sonner";

export function HeroSection() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tone, setTone] = useState("marketing");
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!imageFile) return;
    const loggedIn = await isLoggedIn();
    if (!loggedIn && hasUsedFree()) {
      toast.error("Please Sign in for further use");
      return;
    }
    setLoading(true);
    setCaptions([]);
    setHashtags([]);
    try {
      const labels = imagePreview ? await classifyImageFromUrl(imagePreview) : [];
      const captionsGen = generateCaptionsFromLabels(labels, tone);
      const tags = labelsToHashtags(labels, tone);
      setCaptions(captionsGen);
      setHashtags(tags);
      if (!loggedIn) markFreeUsed();
    } catch {
      const fallback = generateCaptionsFromLabels([], tone);
      setCaptions(fallback);
      setHashtags(labelsToHashtags([], tone));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Caption Generation
          </div>

          <h1 className="mx-auto max-w-4xl font-display text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Generate Perfect
            <span className="gradient-text"> Social Media</span> Captions Instantly
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Upload any image and get 5 engaging captions with relevant hashtags. 
            Choose your tone — funny, professional, marketing, or inspirational.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="gradient" size="xl" className="gap-2" asChild>
              <Link to="/register">
                Start Free <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="gradient-outline" size="xl" asChild>
              <Link to="/#how-it-works">See How It Works</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            5 free captions daily • No credit card required
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="glass-card rounded-2xl p-6 hover-glow">
            <div className="grid gap-6 md:grid-cols-2">
              <ImageUpload
                onImageSelected={(file, preview) => {
                  setImageFile(file);
                  setImagePreview(preview);
                  setCaptions([]);
                  setHashtags([]);
                }}
                preview={imagePreview}
                onClear={() => {
                  setImageFile(null);
                  setImagePreview(null);
                  setCaptions([]);
                  setHashtags([]);
                }}
              />
              <div className="flex flex-col gap-4">
                <ToneSelector selected={tone} onSelect={setTone} />
                <Button
                  variant="gradient"
                  className="gap-2"
                  onClick={handleGenerate}
                  disabled={!imageFile || loading}
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Analyzing image...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Generate Captions
                    </>
                  )}
                </Button>
                <CaptionResults captions={captions} hashtags={hashtags} loading={loading} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
