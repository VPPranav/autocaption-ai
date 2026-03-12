import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { openProCheckout } from "@/lib/razorpay";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["5 captions per day", "All tones", "Hashtag generation", "7-day history"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    features: ["Unlimited captions", "Priority processing", "API access", "30-day history", "Priority support"],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Credits",
    price: "₹99",
    period: "/10 credits",
    features: ["Pay per caption", "No expiration", "All tones", "API access"],
    cta: "Buy Credits",
    popular: false,
  },
];

export function PricingPreview() {
  const handleProClick = () => {
    openProCheckout({
      amountInRupees: 499,
    });
  };

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card relative rounded-2xl p-6 ${
                plan.popular ? "border-primary/50 animate-pulse-glow" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              {plan.name === "Pro" ? (
                <button
                  type="button"
                  onClick={handleProClick}
                  className="mt-6 block w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 hover:shadow-lg shadow-primary/20 h-10 px-4 py-2"
                >
                  {plan.cta}
                </button>
              ) : (
                <Link to="/register" className="mt-6 block">
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
