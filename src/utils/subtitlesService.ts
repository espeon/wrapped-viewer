import { Subtitle } from '../data/subtitles';

export function findCurrentSubtitle(currentTime: number, subtitles: Subtitle[]): string {
  const currentSubtitle = subtitles.find(
    subtitle => 
      currentTime >= subtitle.timestamp[0] && 
      currentTime <= subtitle.timestamp[1]
  );
  
  return currentSubtitle?.text || '';
}