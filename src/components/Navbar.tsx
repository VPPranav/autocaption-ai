import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ensureSupabase } from "@/lib/supabase";
import { isProUser } from "@/lib/usageGate";

const navItems = [
  { label: "Features", href: "/#features", hideForPro: true },
  { label: "How It Works", href: "/#how-it-works", hideForPro: true },
  { label: "Pricing", href: "/pricing", hideForPro: true },
  { label: "API Docs", href: "/api-docs" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const supabase = ensureSupabase();
        const { data } = await supabase.auth.getUser();
        const user = data.user;
        if (!isMounted) return;
        if (user) {
          const meta: any = user.user_metadata ?? {};
          // Settings.tsx saves it as 'display_name'
          const nameFromMeta: string | undefined = meta.display_name;
          const fallback =
            user.email && typeof user.email === "string"
              ? user.email.split("@")[0]
              : null;
          setUserName(nameFromMeta || fallback || null);

          const proStatus = isProUser();
          setIsPro(proStatus);

          // Redirect Pro users away from index/pricing/etc to dashboard
          const restrictedPaths = ["/", "/pricing", "#features", "#how-it-works"];
          const currentPath = location.pathname;
          if (proStatus && (currentPath === "/" || currentPath === "/pricing")) {
            navigate("/dashboard");
          }
        } else {
          setUserName(null);
          setIsPro(false);
        }
      } catch {
        if (isMounted) {
          setUserName(null);
          setIsPro(false);
        }
      }
    };

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = ensureSupabase();
      await supabase.auth.signOut();
    } catch {
      // ignore
    } finally {
      setUserName(null);
      setIsPro(false);
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={isPro ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">AutoCaption<span className="gradient-text"> AI</span></span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navItems
            .filter((item) => !(isPro && item.hideForPro))
            .map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          {userName && (
            <Link
              to="/dashboard"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {userName ? (
            <>
              <span className="text-sm text-muted-foreground">
                Hi, <span className="font-semibold text-foreground">{userName}</span>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient" size="sm">Get Started Free</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems
                .filter((item) => !(isPro && item.hideForPro))
                .map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              {userName && (
                <Link
                  to="/dashboard"
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <div className="mt-2 flex flex-col gap-2">
                {userName ? (
                  <>
                    <div className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm">
                      <span className="text-muted-foreground">Hi,</span>
                      <span className="font-semibold text-foreground">{userName}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setMobileOpen(false);
                        void handleLogout();
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full">Log in</Button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}>
                      <Button variant="gradient" className="w-full">Get Started Free</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
