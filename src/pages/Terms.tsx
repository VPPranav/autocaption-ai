import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          These Terms and Conditions govern your use of the AutoCaption AI website and services.
          By creating an account or purchasing any plan, you agree to these terms.
        </p>

        <section className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <h2 className="mt-4 text-base font-semibold text-foreground">1. Services</h2>
          <p>
            AutoCaption AI provides AI-based caption generation tools, credits, and subscription
            plans for social media content creation. We reserve the right to modify or discontinue
            any feature with prior notice where reasonably possible.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">2. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and
            for all activities that occur under your account. Notify us immediately if you suspect
            any unauthorized use.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">3. Payments and Billing</h2>
          <p>
            All payments for subscriptions and credits are processed securely via Razorpay. By
            completing a payment, you authorize Razorpay and AutoCaption AI to process the
            transaction in accordance with our Refund and Cancellation Policy.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">4. Acceptable Use</h2>
          <p>You agree not to use AutoCaption AI to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Generate or share illegal, harmful, or offensive content.</li>
            <li>Violate any applicable laws, regulations, or third-party rights.</li>
            <li>Attempt to reverse engineer or misuse the platform.</li>
          </ul>

          <h2 className="mt-6 text-base font-semibold text-foreground">
            5. Intellectual Property
          </h2>
          <p>
            The AutoCaption AI name, logo, website design, and software are the intellectual
            property of AutoCaption AI. You may not copy, modify, or distribute any part of the
            platform without prior written consent.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">6. Limitation of Liability</h2>
          <p>
            AutoCaption AI is provided on an &quot;as is&quot; basis. We are not liable for any
            indirect, incidental, or consequential damages arising from the use of our services.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">7. Changes to These Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. Continued use of the
            service after changes are posted constitutes your acceptance of the revised terms.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">8. Contact</h2>
          <p>
            For any questions about these Terms and Conditions, please contact us using the details
            provided on our Contact page.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;

