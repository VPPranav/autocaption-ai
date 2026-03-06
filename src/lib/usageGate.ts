import { ensureSupabase } from "@/lib/supabase";

const KEY = "freeGenerateUsed";

export function hasUsedFree() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markFreeUsed() {
  try {
    localStorage.setItem(KEY, "1");
  } catch {}
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
