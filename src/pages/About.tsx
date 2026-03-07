import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          About <span className="gradient-text">AutoCaption AI</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          AutoCaption AI is an AI-powered caption generation platform built for creators, brands,
          and social media managers. We turn your product shots, lifestyle photos, and marketing
          visuals into high-converting captions in just a few seconds.
        </p>

        <section className="mt-10 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            Our web app helps you generate on-brand captions, relevant hashtags, and copy variations
            for Instagram, Facebook, LinkedIn, and other platforms. You can use AutoCaption AI to
            plan campaigns faster, keep a consistent voice, and never run out of content ideas.
          </p>
          <p>
            The product is owned and operated under the trade name <strong>AutoCaption AI</strong>.
            All payments for subscriptions and credits are collected securely via our payment
            partner Razorpay.
          </p>
          <p>
            If you have any questions about AutoCaption AI, our pricing, or how we handle your
            data, you can always reach us through the contact details listed on our Contact page.
          </p>
        </section>

        <section className="mt-10 rounded-xl border border-border/60 bg-card p-6 text-sm text-muted-foreground">
          <h2 className="mb-3 text-base font-semibold text-foreground">Website Information</h2>
          <p>
            This website is the official platform of AutoCaption AI for discovering features,
            managing your account, purchasing subscriptions or credits, and accessing support
            resources and documentation.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

