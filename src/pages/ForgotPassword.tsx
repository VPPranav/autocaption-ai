import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center pt-16">
        <div className="w-full max-w-md px-4">
          <div className="glass-card rounded-2xl p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold">Reset Password</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {sent ? "Check your email for a reset link" : "Enter your email to reset your password"}
              </p>
            </div>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                </div>
                <Button variant="gradient" className="w-full" type="submit">
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center text-sm text-primary">
                We've sent a password reset link to <strong>{email}</strong>
              </div>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline">
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
