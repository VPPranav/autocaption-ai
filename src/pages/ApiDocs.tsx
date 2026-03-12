import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Copy, Check, Key, RefreshCw, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ensureSupabase } from "@/lib/supabase";

const getCodeExample = (apiKey: string) => `curl -X POST https://api.autocaption.ai/v1/generate \\
  -H "Authorization: Bearer ${apiKey || "YOUR_API_KEY"}" \\
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = ensureSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setIsLoggedIn(true);
          setApiKey(user.user_metadata?.api_key || "");
        }
      } catch {}
    };
    checkUser();
  }, []);

  const generateApiKey = async () => {
    try {
      setLoading(true);
      const newKey = `sk_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
      const supabase = ensureSupabase();
      
      const { error } = await supabase.auth.updateUser({
        data: { api_key: newKey }
      });

      if (error) throw error;

      setApiKey(newKey);
      toast.success("API Key generated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate API Key");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="font-display text-4xl font-bold">
              <span className="gradient-text">API</span> Documentation
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Powerful caption generation for your own applications.
          </p>

          <div className="mt-12 space-y-12">
            {/* API Key Management */}
            <section className="glass-card rounded-2xl p-8 border-primary/20 bg-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Key className="h-32 w-32 rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-semibold">Your Authentication Key</h2>
                </div>

                {isLoggedIn ? (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      Protect this key. Anyone with access to it can make requests using your credits.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <input
                          type={showKey ? "text" : "password"}
                          value={apiKey || "No key generated yet"}
                          readOnly
                          className="w-full h-12 rounded-xl border border-primary/10 bg-background/80 px-4 pt-0 font-mono text-sm outline-none focus:border-primary/30 transition-all"
                        />
                        <button
                          onClick={() => setShowKey(!showKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:bg-secondary rounded-lg"
                        >
                          {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="lg"
                          className="h-12 px-6 rounded-xl hover:bg-secondary"
                          onClick={() => copy(apiKey)}
                          disabled={!apiKey}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button
                          variant="gradient"
                          size="lg"
                          className="h-12 px-6 rounded-xl shadow-lg shadow-primary/20"
                          onClick={generateApiKey}
                          disabled={loading}
                        >
                          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                          {apiKey ? "Regenerate" : "Generate"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center sm:text-left">
                    <p className="text-sm text-muted-foreground mb-6">
                      Sign in to your account to generate and manage your unique API keys.
                    </p>
                    <Button 
                      variant="gradient" 
                      onClick={() => window.location.assign("/login")}
                      className="rounded-xl h-11 px-8"
                    >
                      Log In to Get Started
                    </Button>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold flex items-center gap-2">
                Authentication
              </h2>
              <p className="mt-2 text-muted-foreground">
                All API requests must include your API key in the `Authorization` HTTP header.
              </p>
              <div className="mt-4 glass-card rounded-xl p-5 bg-secondary/20">
                <code className="text-sm font-mono text-primary font-medium">
                  Authorization: Bearer {showKey && apiKey ? apiKey : "••••••••••••••••"}
                </code>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold">Generate Captions</h2>
              <p className="mt-2 text-muted-foreground mb-4">
                <code className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-mono text-primary mr-2 font-bold uppercase tracking-wider">POST</code>
                <code className="rounded-lg bg-secondary px-2 py-1 text-xs font-mono">/v1/generate</code>
              </p>

              <div className="space-y-6">
                <div className="glass-card relative rounded-2xl p-6 bg-[#0B0B0C] border-white/5">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest font-bold">Request Body</span>
                    <button 
                      onClick={() => copy(getCodeExample(apiKey))} 
                      className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-white transition-all"
                      title="Copy code"
                    >
                      {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <pre className="overflow-x-auto text-sm font-mono leading-relaxed text-blue-100/80">
                    <code>{getCodeExample(apiKey)}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3 ml-1">Example Response</h3>
                  <div className="glass-card rounded-2xl p-6 bg-[#0B0B0C] border-white/5">
                    <pre className="overflow-x-auto text-sm font-mono leading-relaxed text-emerald-100/80">
                      <code>{responseExample}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold mb-6">Rate Limits</h2>
              <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-muted-foreground">Plan</th>
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-xs text-muted-foreground">Rate Limit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">Free Plan</td>
                      <td className="px-6 py-4 text-muted-foreground">5 requests per day</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors bg-primary/5">
                      <td className="px-6 py-4 font-bold text-primary flex items-center gap-2">
                        Pro Plan
                        <span className="text-[10px] bg-primary/20 px-1.5 py-0.5 rounded-full text-primary font-black">PRO</span>
                      </td>
                      <td className="px-6 py-4 text-primary/80 font-medium">100 requests per minute</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-medium">Add-on Credits</td>
                      <td className="px-6 py-4 text-muted-foreground">60 requests per minute</td>
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
