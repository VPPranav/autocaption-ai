import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This Privacy Policy describes how AutoCaption AI collects, uses, and protects your
          information when you use our website and services.
        </p>

        <section className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            By accessing or using AutoCaption AI, you agree to the collection and use of
            information in accordance with this policy. This policy is tailored for our AI caption
            generation and credit-based usage model.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">Information We Collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Account Information:</strong> Name, email address, and password when you
              create an account.
            </li>
            <li>
              <strong>Payment Information:</strong> We do not store full card details. Payments are
              processed securely by Razorpay. We may receive limited information such as the last 4
              digits of your card, payment status, and transaction IDs.
            </li>
            <li>
              <strong>Usage Data:</strong> Log data such as IP address, device information, browser
              type, and pages visited to improve our service.
            </li>
            <li>
              <strong>Content You Provide:</strong> Images, prompts, and captions you submit to
              generate AI captions.
            </li>
          </ul>

          <h2 className="mt-6 text-base font-semibold text-foreground">How We Use Your Data</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>To operate, maintain, and improve the AutoCaption AI platform.</li>
            <li>To process payments for subscriptions and credits via Razorpay.</li>
            <li>To provide customer support and respond to your requests.</li>
            <li>To send important service updates, security alerts, and transactional emails.</li>
            <li>To monitor usage, prevent fraud, and enforce our Terms and Conditions.</li>
          </ul>

          <h2 className="mt-6 text-base font-semibold text-foreground">Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share information with trusted third parties
            only when necessary to provide our services, such as:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Payment processing partners like Razorpay.</li>
            <li>Cloud hosting and analytics providers.</li>
            <li>Service providers who help us operate and secure the platform.</li>
          </ul>

          <h2 className="mt-6 text-base font-semibold text-foreground">Data Security</h2>
          <p>
            We use industry-standard security measures to protect your information. However, no
            method of transmission over the internet or electronic storage is completely secure, and
            we cannot guarantee absolute security.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">
            Your Rights and Choices
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Access and update your account information from your profile.</li>
            <li>Request deletion of your account by contacting our support team.</li>
            <li>Opt out of non-essential marketing emails via the unsubscribe link.</li>
          </ul>

          <h2 className="mt-6 text-base font-semibold text-foreground">Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, please
            reach out using the contact details on our Contact page.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

