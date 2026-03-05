import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const codeExample = `curl -X POST https://api.autocaption.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://example.com/photo.jpg",
    "tone": "marketing",
    "count": 5
  }'`;

const responseExample = `{
  "captions": [
    "Transform your brand story with every post 📸",
    "Creating content that converts and connects 🎯",
    ...
  ],
  "hashtags": [
    "#socialmedia", "#marketing", "#branding", ...
  ],
  "credits_remaining": 42
}`;

const ApiDocs = () => {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold">
            <span className="gradient-text">API</span> Documentation
          </h1>
          <p className="mt-4 text-muted-foreground">
            Integrate AI caption generation into your applications with our REST API.
          </p>

          <div className="mt-12 space-y-8">
            <section>
              <h2 className="font-display text-2xl font-semibold">Authentication</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Include your API key in the Authorization header of every request.
              </p>
              <div className="mt-4 glass-card rounded-xl p-4">
                <code className="text-sm text-primary">Authorization: Bearer YOUR_API_KEY</code>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">Generate Captions</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">POST /v1/generate</code>
              </p>

              <div className="mt-4 space-y-4">
                <div className="glass-card relative rounded-xl p-4">
                  <button onClick={() => copy(codeExample)} className="absolute top-3 right-3 rounded-md p-1.5 text-muted-foreground hover:bg-secondary">
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <pre className="overflow-x-auto text-sm text-muted-foreground">
                    <code>{codeExample}</code>
                  </pre>
                </div>

                <h3 className="text-sm font-medium">Response</h3>
                <div className="glass-card rounded-xl p-4">
                  <pre className="overflow-x-auto text-sm text-muted-foreground">
                    <code>{responseExample}</code>
                  </pre>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">Rate Limits</h2>
              <div className="mt-4 glass-card rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Plan</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Rate Limit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">Free</td>
                      <td className="px-4 py-3 text-muted-foreground">5 req/day</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">Pro</td>
                      <td className="px-4 py-3 text-muted-foreground">100 req/min</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Credits</td>
                      <td className="px-4 py-3 text-muted-foreground">60 req/min</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApiDocs;
