export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  status: "success" | "failed" | "dismissed";
  createdAt: number;
}

const KEY = "paymentHistory";

export function getPayments(): PaymentRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as PaymentRecord[];
    return [];
  } catch {
    return [];
  }
}

export function addPayment(rec: PaymentRecord) {
  try {
    const list = getPayments();
    list.unshift(rec);
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 100)));
  } catch {}
}
