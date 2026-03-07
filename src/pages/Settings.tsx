import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <main className="container mx-auto px-4 py-8">
          <h1 className="font-display text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update basic profile info used for receipts and contact.
          </p>

          <div className="mt-6 grid max-w-xl gap-4">
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground" htmlFor="name">
                Display Name
              </label>
              <input
                id="name"
                className="h-10 rounded-md border border-border bg-card px-3 text-sm outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-muted-foreground" htmlFor="email">
                Contact Email
              </label>
              <input
                id="email"
                className="h-10 rounded-md border border-border bg-card px-3 text-sm outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  try {
                    localStorage.setItem(
                      "profileInfo",
                      JSON.stringify({ name, email, updatedAt: Date.now() }),
                    );
                  } catch {}
                }}
                variant="gradient"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;

