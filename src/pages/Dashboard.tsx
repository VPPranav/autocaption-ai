import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { ToneSelector } from "@/components/dashboard/ToneSelector";
import { CaptionResults } from "@/components/dashboard/CaptionResults";
import { Sparkles, History, CreditCard, Settings, Zap, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { icon: Sparkles, label: "Generate", href: "/dashboard", active: true },
  { icon: History, label: "History", href: "/dashboard/history" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const Dashboard = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tone, setTone] = useState("marketing");
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!imageFile) return;
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setCaptions([
        "Transform your vision into reality with every click 📸",
        "Creating content that speaks louder than words 🎯",
        "Your brand story starts with a single image ✨",
        "Making waves in the digital world, one post at a time 🌊",
        "Where creativity meets strategy — that's the sweet spot 💡",
      ]);
      setHashtags([
        "#socialmedia", "#contentcreator", "#digitalmarketing", "#branding",
        "#instagram", "#creative", "#marketing", "#growthhacking",
        "#engagement", "#contentisking",
      ]);
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
                <span className="font-semibold text-primary">3 / 5</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-secondary">
                <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-primary to-accent" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Free plan • Resets daily</p>
            </div>

            <nav className="flex-1 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    item.active
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
            <div className="mb-8">
              <h1 className="font-display text-2xl font-bold">Generate Captions</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload an image and select a tone to generate AI-powered captions.
              </p>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
