import { motion } from "framer-motion";
import { Sparkles, Zap, Hash, Palette, Shield, BarChart3, Globe } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Vision Analysis",
    description: "Advanced AI understands your image content, objects, mood, and context automatically.",
  },
  {
    icon: Zap,
    title: "5 Caption Variations",
    description: "Get five unique caption suggestions tailored to your selected tone and style.",
  },
  {
    icon: Hash,
    title: "Smart Hashtags",
    description: "10 relevant hashtags generated per image to maximize your reach and engagement.",
  },
  {
    icon: Palette,
    title: "Multiple Tones",
    description: "Choose from Funny, Professional, Marketing, Inspirational, or Casual tones.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Images auto-delete after 24 hours. No permanent storage. Your content stays yours.",
  },
  {
    icon: Globe,
    title: "Developer API",
    description: "Integrate caption generation into your own apps with our simple REST API.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Everything You Need to <span className="gradient-text">Create Captions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Powerful AI features designed for content creators, marketers, and social media managers.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group rounded-xl p-6 transition-all hover-glow hover:border-primary/30"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
