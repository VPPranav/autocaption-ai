import { motion } from "framer-motion";
import { Upload, Brain, MessageSquare, Copy } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Image",
    description: "Drag & drop or browse to upload your image. Supports JPG, PNG, WEBP up to 10MB.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Analyzes",
    description: "Our AI Vision model scans the image to understand content, context, and mood.",
  },
  {
    icon: MessageSquare,
    step: "03",
    title: "Captions Generated",
    description: "5 unique captions and 10 hashtags are created in your selected tone.",
  },
  {
    icon: Copy,
    step: "04",
    title: "Copy & Post",
    description: "Copy your favorite caption and hashtags, then paste directly to social media.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            How <span className="gradient-text">It Works</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From image to perfect caption in under 5 seconds.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                <step.icon className="h-7 w-7" />
              </div>
              <span className="text-xs font-bold tracking-widest text-primary">{step.step}</span>
              <h3 className="mt-1 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
