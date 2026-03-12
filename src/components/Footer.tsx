import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { isProUser } from "@/lib/usageGate";
import { useState, useEffect } from "react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features", hideForPro: true },
    { label: "Pricing", href: "/pricing", hideForPro: true },
    { label: "API Docs", href: "/api-docs" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Refund and Cancellation", href: "/refund-cancellation" },
    { label: "Shipping & Delivery", href: "/shipping-delivery" },
  ],
};

export function Footer() {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(isProUser());
  }, []);

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to={isPro ? "/dashboard" : "/"} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">AutoCaption AI</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-powered caption generation for social media creators.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{category}</h4>
              <ul className="space-y-2">
                {links
                  .filter((link: any) => !(isPro && link.hideForPro))
                  .map((link: any) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AutoCaption AI. Developed By Pranav V P - All rights reserved.
        </div>
      </div>
    </footer>
  );
}
