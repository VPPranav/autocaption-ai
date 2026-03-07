import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          Shipping and Delivery Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          AutoCaption AI is a fully digital SaaS product. We do not ship any physical goods. All
          services are delivered online through your account on this website.
        </p>

        <section className="mt-8 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <h2 className="mt-4 text-base font-semibold text-foreground">Digital Delivery</h2>
          <p>
            Once your payment is confirmed via Razorpay, your subscription or credits are
            automatically activated on your AutoCaption AI account. You can access the service by
            logging in with your registered email address.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">Activation Timelines</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>New Accounts:</strong> Access is typically available immediately after
              successful payment.
            </li>
            <li>
              <strong>Existing Accounts:</strong> Additional credits or plan upgrades are usually
              reflected within a few minutes of the payment confirmation.
            </li>
          </ul>

          <h2 className="mt-6 text-base font-semibold text-foreground">Non-receipt of Access</h2>
          <p>
            If access to your plan or credits is not available within 30 minutes after a successful
            payment, please contact us with your registered email address and Razorpay payment
            reference ID so we can assist you.
          </p>

          <h2 className="mt-6 text-base font-semibold text-foreground">Shipping Charges</h2>
          <p>
            As we do not ship any physical products, there are no shipping or delivery charges
            applicable on any plan or credit purchase.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingDelivery;

