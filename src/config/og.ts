export interface OGConfig {
  title: string;
  subtitle: string;
  stat1: string;
  stat2: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
  subtitleColor: string;
}

export function getOGConfig(): OGConfig {
  return {
    title: import.meta.env.VITE_OG_TITLE || "Spotify Wrapped 2024",
    subtitle: import.meta.env.VITE_OG_SUBTITLE || "Natalie's Year in Review",
    stat1: import.meta.env.VITE_OG_STAT_1 || "195,877 minutes listened",
    stat2: import.meta.env.VITE_OG_STAT_2 || "Top 0.01% of Spotify listeners",
    bgColor: import.meta.env.VITE_OG_BG_COLOR || "#111827",
    accentColor: import.meta.env.VITE_OG_ACCENT_COLOR || "rgba(79, 70, 229, 0.2)",
    textColor: import.meta.env.VITE_OG_TEXT_COLOR || "#ffffff",
    subtitleColor: import.meta.env.VITE_OG_SUBTITLE_COLOR || "#818cf8"
  };
}