const RAW_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
const RAZORPAY_KEY_ID = (RAW_RAZORPAY_KEY_ID ?? "").trim() || undefined;

export interface OpenProCheckoutParams {
  amountInRupees?: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

declare global {
  interface Window {
    Razorpay?: new (options: any) => {
      open: () => void;
      close: () => void;
      on: (event: string, callback: (data: any) => void) => void;
    };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

import { addPayment } from "@/lib/payments";

export async function openProCheckout(params: OpenProCheckoutParams = {}) {
  const ok = await loadRazorpayScript();

  if (!ok || !window.Razorpay) {
    console.error("Razorpay SDK failed to load.");
    return;
  }

  if (!RAZORPAY_KEY_ID) {
    console.error("VITE_RAZORPAY_KEY_ID is not set in .env.local");
    return;
  }

  const amountInRupees = params.amountInRupees ?? 499;
  const amountInPaise = Math.round(amountInRupees * 100);

  let orderId: string | undefined = undefined;

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amountInPaise,
    currency: "INR",
    name: "AutoCaption AI",
    description: "Pro Plan Subscription",
    order_id: orderId,
    redirect: false,
    retry: {
      enabled: true,
      max_count: 1,
    },
    notes: {
      plan: "pro_monthly",
      platform: "web_app",
    },
    prefill: {
      name: params.customerName ?? "",
      email: params.customerEmail ?? "",
      contact: params.customerPhone ?? "",
    },
    theme: {
      color: "#6366F1",
    },
    handler: (response: any) => {
      try {
        const paymentId =
          response?.razorpay_payment_id || response?.payment_id || `test_${Date.now()}`;
        addPayment({
          id: paymentId,
          amount: amountInPaise / 100,
          currency: "INR",
          status: "success",
          createdAt: Date.now(),
        });
      } catch { }
      try {
        // Set a one-time pending flag so the next login/register consumes it
        localStorage.setItem("pending_pro_activation", "true");
        
        // Redirect to register page after payment so they can create their account
        window.location.assign("/register?success=pro");
      } catch { }
    },
    modal: {
      ondismiss: () => {
        try {
          addPayment({
            id: `dismissed_${Date.now()}`,
            amount: amountInPaise / 100,
            currency: "INR",
            status: "dismissed",
            createdAt: Date.now(),
          });
        } catch { }
      },
    },
  };

  try {
    delete (options as any).order_id;
    const rzp = new window.Razorpay!(options);
    rzp.open();
  } catch (e) {
    console.error("Failed to open Razorpay checkout:", e);
  }
}
