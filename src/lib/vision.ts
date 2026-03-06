import type * as mobilenetNS from "@tensorflow-models/mobilenet";

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

export async function classifyImageFromUrl(url: string): Promise<string[]> {
  await import("@tensorflow/tfjs");
  const mobilenet = (await import("@tensorflow-models/mobilenet")) as typeof mobilenetNS;
  const img = await loadImage(url);
  const model = await mobilenet.load();
  const predictions = await model.classify(img);
  return predictions.map((p) => p.className);
}

export function labelsToHashtags(labels: string[], tone: string): string[] {
  const base = labels
    .slice(0, 6)
    .flatMap((l) =>
      l
        .split(/[\\s,]+/)
        .map((s) => s.replace(/[^a-z0-9]/gi, "").toLowerCase())
        .filter(Boolean),
    )
    .map((s) => `#${s}`)
    .slice(0, 8);

  const toneTags: Record<string, string[]> = {
    marketing: ["#marketing", "#branding", "#content", "#reach", "#engagement", "#socialmedia"],
    funny: ["#funny", "#lol", "#meme", "#vibes", "#goodtimes", "#relatable"],
    professional: ["#professional", "#business", "#strategy", "#quality", "#results", "#leadership"],
    inspirational: ["#inspiration", "#motivation", "#goals", "#mindset", "#growth", "#create"],
    casual: ["#casual", "#vibes", "#lifestyle", "#daily", "#instadaily", "#goodvibes"],
  };

  const extras = toneTags[tone] ?? ["#socialmedia", "#creator", "#content"];
  const seen = new Set<string>();
  const tags = [...base, ...extras].filter((t) => {
    const k = t.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  return tags.slice(0, 10);
}
