import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ensureSupabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Save, User, Mail, Loader2 } from "lucide-react";
import { clearCurrentUserData } from "@/lib/usageGate";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = ensureSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setName(user.user_metadata?.display_name || "");
          setEmail(user.user_metadata?.contact_email || user.email || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!name || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const supabase = ensureSupabase();
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: name,
          contact_email: email,
        }
      });

      if (error) throw error;

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const supabase = ensureSupabase();
      // Clear ONLY current user's data before signing out
      clearCurrentUserData();
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Account deleted successfully");
      window.location.assign("/");
    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <main className="container mx-auto max-w-2xl px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground mt-1">
                Manage your profile and contact information for receipts.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 border-primary/10 bg-primary/[0.02]">
            {fetching ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading your profile...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="grid gap-2.5">
                    <Label htmlFor="name" className="text-sm font-medium ml-1">
                      Display Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="pl-10 h-12 rounded-xl bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2.5">
                    <Label htmlFor="email" className="text-sm font-medium ml-1">
                      Contact Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-10 h-12 rounded-xl bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4 border-t border-primary/5">
                  <p className="text-xs text-muted-foreground max-w-[200px]">
                    This information will be used for your billing and support requests.
                  </p>
                  <Button
                    onClick={handleSave}
                    variant="gradient"
                    size="lg"
                    className="gap-2 min-w-[140px] shadow-lg shadow-primary/20"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-destructive/10">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-destructive/80">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Permanently delete your account and all associated data.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all rounded-xl h-12"
                      onClick={() => {
                        if (confirm("Are you absolutely sure you want to delete your account? This will only erase your current session data. This action is irreversible.")) {
                          handleDeleteAccount();
                        }
                      }}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;

