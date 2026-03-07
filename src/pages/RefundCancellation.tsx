import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const RefundCancellation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Refund and Cancellation Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This Refund and Cancellation Policy applies to all purchases made on the AutoCaption AI
          website, including subscriptions and credit packs processed via Razorpay.
        </p>

        <section className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <h2 className="mt-4 text-base font-semibold text-foreground">1. Subscriptions</h2>
          <p>
            Subscription plans (such as the Pro plan) provide ongoing access to features for a
            specified period. Once a subscription payment is successfully completed, it is
            generally <strong>non-refundable</strong> for the current billing cycle.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">2. Credits and One-time Purchases</h2>
          <p>
            Credit packs and other one-time purchases are non-refundable once the credits are
            added to your account. Please review your selected plan and price before confirming the
            payment.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">3. Duplicate or Incorrect Charges</h2>
          <p>
            If you believe you have been charged incorrectly or have made a duplicate payment,
            please contact us within 7 days of the transaction with proof of payment. After
            verification, eligible refunds will be processed back to the original payment method via
            Razorpay in accordance with their timelines.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">4. Failed Transactions</h2>
          <p>
            If your account is not updated after a successful payment or you encounter a failed
            transaction where the amount is debited from your bank, please reach out to us with the
            Razorpay payment reference ID. We will coordinate with Razorpay to track and resolve the
            issue.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">5. Cancellation of Subscription</h2>
          <p>
            You may cancel your subscription at any time from your account or by contacting our
            support team. After cancellation, you will continue to have access to the paid features
            until the end of the current billing period. No partial refunds are provided for early
            cancellation.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">6. Contact for Refund Requests</h2>
          <p>
            For any refund or cancellation related queries, please write to us using the contact
            details mentioned on the Contact page with your registered email address and payment
            details.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RefundCancellation;

