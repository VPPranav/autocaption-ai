import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPayments } from "@/lib/payments";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Billing = () => {
  const payments = getPayments();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold">Billing</h1>
            <Link to="/pricing">
              <Button variant="gradient">Upgrade / Buy Credits</Button>
            </Link>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your plan and review recent payments on this device.
          </p>

          <section className="mt-6 space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground">Recent Payments</h2>
            {payments.length === 0 ? (
              <div className="rounded-lg border border-border/60 bg-card p-6 text-sm text-muted-foreground">
                No payments found yet.
              </div>
            ) : (
              payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-4"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Payment ID: {p.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(p.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      ₹{p.amount.toFixed(2)} {p.currency}
                    </div>
                    <div
                      className={
                        p.status === "success"
                          ? "text-xs text-green-400"
                          : p.status === "failed"
                          ? "text-xs text-red-400"
                          : "text-xs text-muted-foreground"
                      }
                    >
                      {p.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Billing;

