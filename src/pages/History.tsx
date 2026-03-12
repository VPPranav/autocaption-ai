import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getCaptionHistory } from "@/lib/captionHistory";

const History = () => {
  const items = getCaptionHistory();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <main className="container mx-auto px-4 py-8">
          <h1 className="font-display text-2xl font-bold">Caption History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Captions you&apos;ve generated on this device.
          </p>
          <div className="mt-6 space-y-3">
            {items.length === 0 ? (
              <div className="rounded-lg border border-border/60 bg-card p-6 text-sm text-muted-foreground">
                No caption history yet. Generate some captions in the dashboard to see them here.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-border/60 bg-card p-4 text-sm text-muted-foreground"
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

