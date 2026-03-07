import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Contact Us</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Have questions about AutoCaption AI, your subscription, or a payment made via Razorpay?
          You can reach us through the details below.
        </p>

        <section className="mt-8 grid gap-6 text-sm text-muted-foreground md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-border/60 bg-card p-5">
            <h2 className="text-base font-semibold text-foreground">Business Details</h2>
            <p>
              <strong>Trade Name:</strong> Pranav V P
            </p>
            <p>
              <strong>Nature of Business:</strong> Online AI caption generation and content
              assistance for social media creators and brands.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-border/60 bg-card p-5">
            <h2 className="text-base font-semibold text-foreground">Contact Information</h2>
            <p>
              <strong>Phone:</strong> +91-9380833197
            </p>
            <p>
              <strong>Email:</strong> pranavvp1507@gmail.com
            </p>
            <p>
              <strong>Address:</strong> Rajajinagar, Bengaluru
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-border/60 bg-card p-5 text-sm text-muted-foreground">
          <h2 className="mb-3 text-base font-semibold text-foreground">Support and Payments</h2>
          <p>
            For issues related to payments, refunds, or cancellations of transactions processed via
            Razorpay, please share your registered email address and Razorpay payment reference ID
            when you contact us. This helps us resolve your query faster.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

