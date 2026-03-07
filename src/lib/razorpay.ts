const RAW_RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
const RAZORPAY_KEY_ID = (RAW_RAZORPAY_KEY_ID ?? "").trim() || undefined;
const FAKE_PAYMENTS = String(import.meta.env.VITE_FAKE_PAYMENTS ?? "").trim() === "true";

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

  if (FAKE_PAYMENTS) {
    try {
      const paymentId = `fake_${Date.now()}`;
      const { addPayment } = await import("@/lib/payments");
      addPayment({
        id: paymentId,
        amount: amountInPaise / 100,
        currency: "INR",
        status: "success",
        createdAt: Date.now(),
      });
    } catch {}
    try {
      window.location.assign("/dashboard");
    } catch {}
    return;
  }

  let orderId: string | undefined = undefined;
  let useDirect = false;
  try {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        notes: { plan: "pro_monthly" },
      }),
    });
    if (res.ok) {
      const data = await res.json();
      orderId = data.id;
    } else {
      const text = await res.text();
      console.error("Failed to create order:", text);
      try {
        const json = JSON.parse(text);
        if (json?.status === 401) {
          useDirect = true;
        }
      } catch {}
    }
  } catch (e) {
    console.error("Order creation error:", e);
    useDirect = true;
  }

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
      } catch {}
      try {
        window.location.assign("/dashboard");
      } catch {}
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
        } catch {}
      },
    },
  };

  if (!orderId && !useDirect) {
    console.error("Order creation failed; checkout aborted.");
    return;
  }
  try {
    if (!orderId && useDirect) {
      delete (options as any).order_id;
    }
    const rzp = new window.Razorpay!(options);
    rzp.open();
  } catch (e) {
    console.error("Failed to open Razorpay checkout:", e);
  }
}
