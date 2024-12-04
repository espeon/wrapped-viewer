export interface Subtitle {
  timestamp: [number, number];
  text: string;
}

export async function subtitles() {
  let j = await fetch('/transcript.json').then((res) => res.json());
  return j as Subtitle[];
}
