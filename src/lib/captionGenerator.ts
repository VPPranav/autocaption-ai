function pick<T>(arr: T[], n: number): T[] {
  return Array.from(new Set(arr)).slice(0, n);
}

export function generateCaptionsFromLabels(labels: string[], tone: string): string[] {
  const top = pick(labels, 3);
  const subject = top.join(", ").toLowerCase();
  const toneMap: Record<string, ((s: string) => string)[]> = {
    marketing: [
      (s) => `Turn ${s} into scroll‑stopping stories that convert 🎯`,
      (s) => `Your brand, your vision — powered by ${s} ✨`,
      (s) => `Showcase ${s} and boost engagement instantly 🚀`,
      (s) => `Let ${s} tell the story — we drive results`,
      (s) => `Create content that moves with ${s} at the center`,
    ],
    funny: [
      (s) => `${s}? More like “did you just double‑tap me” 😅`,
      (s) => `POV: You came for ${s}, you stayed for the vibes`,
      (s) => `When ${s} accidentally becomes the main character 😂`,
      (s) => `Serving looks and ${s} on the feed`,
      (s) => `If this gets 10 likes, I’ll caption ${s} again`,
    ],
    professional: [
      (s) => `Precision and clarity in focus: ${s} 💼`,
      (s) => `Visual consistency, measurable outcomes — featuring ${s}`,
      (s) => `Strategic storytelling anchored by ${s}`,
      (s) => `Quality content built around ${s}`,
      (s) => `Driving results with thoughtful ${s}`,
    ],
    inspirational: [
      (s) => `Small moments become big stories — start with ${s} ✨`,
      (s) => `Create, refine, repeat — ${s} in motion`,
      (s) => `Your vision matters — let ${s} lead the way`,
      (s) => `Make space for growth — even in ${s}`,
      (s) => `Dream it, plan it, post it — ${s}`,
    ],
    casual: [
      (s) => `${s}, good vibes only 😎`,
      (s) => `Just keeping it simple with ${s}`,
      (s) => `${s} on the timeline today`,
      (s) => `Snapped, posted, done — ${s}`,
      (s) => `Weekend mood: ${s}`,
    ],
  };
  const templates = toneMap[tone] ?? toneMap.casual;
  return templates.map((fn) => fn(subject)).slice(0, 5);
}
