import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPayments } from "@/lib/payments";
import { useMemo } from "react";

const History = () => {
  const items = useMemo(() => getPayments(), []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <main className="container mx-auto px-4 py-8">
          <h1 className="font-display text-2xl font-bold">Payment History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Recent payments recorded on this device for testing.
          </p>
          <div className="mt-6 space-y-3">
            {items.length === 0 ? (
              <div className="rounded-lg border border-border/60 bg-card p-6 text-sm text-muted-foreground">
                No payments found yet.
              </div>
            ) : (
              items.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-card p-4">
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
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default History;

