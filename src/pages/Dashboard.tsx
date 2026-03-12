import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { ToneSelector } from "@/components/dashboard/ToneSelector";
import { CaptionResults } from "@/components/dashboard/CaptionResults";
import { Sparkles, History, CreditCard, Settings, Zap, BarChart3, User } from "lucide-react";
import { Link } from "react-router-dom";
import { hasUsedFree, isLoggedIn, markFreeUsed, getFreeGenerationsRemaining, isProUser } from "@/lib/usageGate";
import { toast } from "sonner";
import { ensureSupabase } from "@/lib/supabase";
import {
  addCaptionHistory,
  getCaptionHistory,
  type CaptionHistoryItem,
} from "@/lib/captionHistory";

const sidebarItems = [
  { icon: Sparkles, label: "Generate", href: "/dashboard", active: true },
  { icon: History, label: "History", href: "/dashboard/history" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const Dashboard = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPro, setIsPro] = useState(isProUser());
  const [userName, setUserName] = useState<string | null>(null);
  const [credits, setCredits] = useState(isProUser() ? Infinity : getFreeGenerationsRemaining());
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tone, setTone] = useState("marketing");
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [history, setHistory] = useState<CaptionHistoryItem[]>(() => getCaptionHistory());

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Import dynamically to avoid circular dependencies if any
        const { syncProStatus } = await import("@/lib/usageGate");
        await syncProStatus();
        
        const updatedPro = isProUser();
        setIsPro(updatedPro);
        setCredits(updatedPro ? Infinity : getFreeGenerationsRemaining());

        const supabase = ensureSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const name = user.user_metadata?.display_name || user.user_metadata?.name || user.email?.split('@')[0] || "User";
          setUserName(name);
        }
      } catch (error) {
        console.error("Error fetching user for dashboard:", error);
      }
    };
    fetchUser();
  }, []);

  const handleGenerate = async () => {
    if (!imageFile) return;

    const loggedIn = await isLoggedIn();
    // Fresh check for Pro status
    const currentlyPro = isProUser();
    if (!currentlyPro && getFreeGenerationsRemaining() <= 0) {
      toast.error("Upgrade to Pro for Unlimited generation", {
        description: "You've reached your free limit of 5 generations.",
        action: {
          label: "Upgrade",
          onClick: () => window.location.assign("/pricing")
        }
      });
      return;
    }

    setLoading(true);
    // Simulated AI processing and history capture
    setTimeout(() => {
      const generatedCaptions = [
        "Transform your vision into reality with every click 📸",
        "Creating content that speaks louder than words 🎯",
        "Your brand story starts with a single image ✨",
        "Making waves in the digital world, one post at a time 🌊",
        "Where creativity meets strategy — that's the sweet spot 💡",
      ];
      const generatedHashtags = [
        "#socialmedia",
        "#contentcreator",
        "#digitalmarketing",
        "#branding",
        "#instagram",
        "#creative",
        "#marketing",
        "#growthhacking",
        "#engagement",
        "#contentisking",
      ];

      setCaptions(generatedCaptions);
      setHashtags(generatedHashtags);

      const entry: CaptionHistoryItem = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        captions: generatedCaptions,
        hashtags: generatedHashtags,
      };

      setHistory((prev) => [entry, ...prev]);
      addCaptionHistory(entry);
      if (!isProUser()) {
        markFreeUsed();
        setCredits(getFreeGenerationsRemaining());
      }
      setLoading(false);
    }, 2500);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setCaptions([]);
    setHashtags([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-border/50 bg-card/30 md:block">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col p-4">
            <div className="glass-card mb-4 rounded-xl p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Credits</span>
                <span className="font-semibold text-primary">{isPro ? "Unlimited" : `${credits} / 5`}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: isPro ? "100%" : `${(credits / 5) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{isPro ? "Pro plan • Unlimited" : "Free plan • 5 total"}</p>
            </div>

            <nav className="flex-1 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold">
                  Hi, <span className="gradient-text">{userName || "there"}</span>!
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ready to generate some amazing captions today?
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                  <User className="h-3 w-3" />
                  {isPro ? "Pro Member" : "Free Account"}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <ImageUpload
                onImageSelected={(file, preview) => {
                  setImageFile(file);
                  setImagePreview(preview);
                  setCaptions([]);
                  setHashtags([]);
                }}
                preview={imagePreview}
                onClear={clearImage}
              />

              <ToneSelector selected={tone} onSelect={setTone} />

              <Button
                variant="gradient"
                size="lg"
                className="w-full gap-2"
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

              {history.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h2 className="font-display text-xl font-semibold">Caption History</h2>
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="glass-card rounded-xl p-4 text-sm text-muted-foreground"
                      >
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="font-medium text-foreground">
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                            {item.captions.length} captions
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {item.captions.map((c) => (
                            <li key={c} className="line-clamp-1">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
