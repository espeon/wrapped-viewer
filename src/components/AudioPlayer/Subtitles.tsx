import React, { useEffect, useRef } from 'react';
import { Subtitle } from '../../data/subtitles';

interface SubtitlesProps {
  subtitles: Subtitle[];
  currentTime: number;
  onSeek: (time: number) => void;
}

export function Subtitles({ subtitles, currentTime, onSeek }: SubtitlesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeSubtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSubtitleRef.current && scrollContainerRef.current) {
      activeSubtitleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentTime]);

  const isSubtitleActive = (subtitle: Subtitle) =>
    currentTime >= subtitle.timestamp[0] &&
    currentTime <= subtitle.timestamp[1];

  const formatTimestamp = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSubtitleClick = (subtitle: Subtitle) => {
    onSeek(subtitle.timestamp[0] + 0.01);
  };

  return (
    <div
      ref={scrollContainerRef}
      className="w-full max-w-3xl mx-auto h-full overflow-y-auto custom-scrollbar"
      style={{
        maskImage: `linear-gradient(to bottom, transparent 0rem, black 10%, black 50%, #000 85%, transparent 98%)`,
        maskComposite: 'intersect',
      }}
    >
      <div className="space-y-6 py-8">
        <div className="h-32" />
        {subtitles.map((subtitle, index) => (
          <div
            key={index}
            onClick={() => handleSubtitleClick(subtitle)}
            className={`transition-all duration-300 p-4 rounded-lg cursor-pointer ${
              isSubtitleActive(subtitle)
                ? 'bg-indigo-600 bg-opacity-20'
                : 'hover:bg-gray-800'
            }`}
          >
            <div className="text-indigo-400 text-sm mb-1">
              {formatTimestamp(subtitle.timestamp[0])} -{' '}
              {formatTimestamp(subtitle.timestamp[1])}
            </div>
            <p
              className={`text-xl ${
                isSubtitleActive(subtitle) ? 'text-white' : 'text-gray-400'
              }`}
            >
              {subtitle.text}
            </p>
            <div
              className="top-32 relative"
              ref={isSubtitleActive(subtitle) ? activeSubtitleRef : null}
            />
          </div>
        ))}
      </div>
      <div className="h-32" />
    </div>
  );
}
