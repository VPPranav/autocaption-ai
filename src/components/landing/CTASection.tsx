import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="glass-card mx-auto max-w-3xl rounded-2xl p-12 text-center hover-glow">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Ready to Create <span className="gradient-text">Better Captions</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Join thousands of creators using AI to write engaging social media captions in seconds.
          </p>
          <Link to="/register" className="mt-8 inline-block">
            <Button variant="gradient" size="xl" className="gap-2">
              Start Free Today <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
