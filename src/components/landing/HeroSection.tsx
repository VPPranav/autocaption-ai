import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
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
            <Link to="/register">
              <Button variant="gradient" size="xl" className="gap-2">
                Start Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/#how-it-works">
              <Button variant="gradient-outline" size="xl">
                See How It Works
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            5 free captions daily • No credit card required
          </p>
        </motion.div>

        {/* Hero preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="glass-card rounded-2xl p-6 hover-glow">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex h-48 flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/30">
                <div className="text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-primary/60" />
                  <p className="mt-2 text-sm text-muted-foreground">Drop your image here</p>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {["🎯 Engaging marketing caption...", "😄 Witty & fun caption...", "💼 Professional tone..."].map(
                  (text, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 text-left text-sm text-muted-foreground"
                    >
                      {text}
                    </div>
                  )
                )}
                <div className="flex flex-wrap gap-1.5">
                  {["#socialmedia", "#AI", "#content", "#creator"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
