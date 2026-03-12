import { ensureSupabase } from "@/lib/supabase";

export function getSyncUserId(): string {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
        const token = localStorage.getItem(key);
        if (token) {
          const parsed = JSON.parse(token);
          if (parsed?.user?.id) {
            return parsed.user.id;
          }
        }
      }
    }
  } catch {
    // ignore
  }
  return 'guest';
}

const getUsageKey = () => `freeGenerationsCount_${getSyncUserId()}`;

export function getFreeGenerationsRemaining() {
  try {
    // Pro users have unlimited credits
    if (isProUser()) return Infinity;

    const count = parseInt(localStorage.getItem(getUsageKey()) || "0", 10);
    return Math.max(0, 5 - count);
  } catch {
    return 5;
  }
}

export function hasUsedFree() {
  if (isProUser()) return false;
  return getFreeGenerationsRemaining() <= 0;
}

export function markFreeUsed() {
  try {
    if (isProUser()) return;
    const key = getUsageKey();
    const count = parseInt(localStorage.getItem(key) || "0", 10);
    localStorage.setItem(key, (count + 1).toString());
  } catch {
    // ignore
  }
}

// Guest landing page limit (1 generation)
export function hasUsedGuestLimit() {
  try {
    return localStorage.getItem("guest_landing_used") === "true";
  } catch {
    return false;
  }
}

export function markGuestLimitUsed() {
  try {
    localStorage.setItem("guest_landing_used", "true");
  } catch { }
}

export async function isLoggedIn() {
  try {
    const supabase = ensureSupabase();
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  } catch {
    return false;
  }
}

/**
 * Checks if the current user is a Pro member.
 * Only returns true if the logged-in account has the 'pro' plan metadata,
 * or if there is a pending payment in the current session.
 */
export function isProUser(): boolean {
  try {
    // 1. Check if the logged-in user has 'pro' metadata (The ultimate source of truth)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
        const token = localStorage.getItem(key);
        if (token) {
          const parsed = JSON.parse(token);
          if (parsed?.user?.user_metadata?.plan === 'pro') {
            return true;
          }
        }
      }
    }

    // 2. Check for a pending payment (One-time session-based fallback)
    // This allows active Pro status immediately after payment but before registration
    const isPending = localStorage.getItem("pending_pro_activation");
    if (isPending === "true") {
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Ensures the Pro status is synced to the Supabase account metadata.
 * Called when a user logs in or registers.
 * If a payment was made as a guest, this links it to the account and CLEARS the pending state.
 */
export async function syncProStatus() {
  try {
    const isPending = localStorage.getItem("pending_pro_activation") === "true";
    if (!isPending) return;

    const supabase = ensureSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // 1. Upgrade the account metadata permanently
      const { error } = await supabase.auth.updateUser({
        data: { plan: 'pro' }
      });
      
      if (!error) {
        // 2. CLEAR the pending state so another user logging in later isn't upgraded
        localStorage.removeItem("pending_pro_activation");
        localStorage.removeItem("paymentHistory"); // Clear evidence of transaction for security
        
        // 3. Refresh session to update local storage token immediately
        await supabase.auth.refreshSession();
        console.log("Pro account activated and locked to:", user.email);
      }
    }
  } catch (err) {
    console.error("Pro sync failure:", err);
  }
}

/**
 * Erases session-related keys and usage data for the CURRENT user only.
 */
export function clearCurrentUserData() {
  try {
    const userId = getSyncUserId();
    // Only delete data scoped to this specific user ID
    if (userId !== 'guest') {
      localStorage.removeItem(`freeGenerationsCount_${userId}`);
    }
    // Clear global session flags
    localStorage.removeItem("guest_landing_used");
    localStorage.removeItem("paymentHistory");
    localStorage.removeItem("pending_pro_activation");
  } catch {}
}
