import { getSyncUserId, isProUser } from "@/lib/usageGate";

export interface CaptionHistoryItem {
  id: number;
  createdAt: string;
  captions: string[];
  hashtags: string[];
}

const getHistoryKey = () => `captionHistory_${getSyncUserId()}`;

export function getCaptionHistory(): CaptionHistoryItem[] {
  try {
    const raw = localStorage.getItem(getHistoryKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CaptionHistoryItem[];
    if (Array.isArray(parsed)) {
      const isPro = isProUser();
      const now = new Date();
      const retentionDays = isPro ? 30 : 7;

      return parsed.filter(item => {
        const itemDate = new Date(item.createdAt);
        const diffTime = Math.abs(now.getTime() - itemDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= retentionDays;
      });
    }
    return [];
  } catch {
    return [];
  }
}

export function addCaptionHistory(entry: CaptionHistoryItem) {
  try {
    const key = getHistoryKey();
    const list = getCaptionHistory();
    list.unshift(entry);
    localStorage.setItem(key, JSON.stringify(list.slice(0, 100)));
  } catch {
    // ignore storage errors
  }
}
