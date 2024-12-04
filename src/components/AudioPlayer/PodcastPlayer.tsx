import React, { useState, useRef, useEffect } from 'react';
import { AudioControls } from './AudioControls';
import { ProgressBar } from './ProgressBar';
import { Subtitles } from './Subtitles';
import { Headphones } from 'lucide-react';
import { subtitles as iSubtitles, Subtitle } from '../../data/subtitles';

const AUDIO_URL = '/wrapped.mp3';

const config = {
  title: import.meta.env.VITE_OG_TITLE || 'Spotify Wrapped 2024',
  subtitle: import.meta.env.VITE_OG_SUBTITLE || "Natalie's Year in Review",
  stat1: import.meta.env.VITE_OG_STAT_1 || '195,877 minutes listened',
  stat2: import.meta.env.VITE_OG_STAT_2 || 'Top 0.01% of Spotify listeners',
  bgColor: import.meta.env.VITE_OG_BG_COLOR || '#100827',
  accentColor: import.meta.env.VITE_OG_ACCENT_COLOR || 'rgba(79, 70, 229, 0.2)',
  textColor: import.meta.env.VITE_OG_TEXT_COLOR || '#ffffff',
  subtitleColor: import.meta.env.VITE_OG_SUBTITLE_COLOR || '#818cf8',
};

export function PodcastPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [subtitles, setSubtitles] = useState<Subtitle[] | null>(null);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    iSubtitles().then((s) => setSubtitles(s));
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        const time = audioRef.current?.currentTime || 0;
        setCurrentTime(time);
      });
    }
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ backgroundColor: config.bgColor }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-transparent p-6 z-10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 bg-opacity-20 rounded-full">
            <Headphones className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{config.title}</h2>
            <p className="text-indigo-300">{config.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Subtitles Area */}
      <div className="flex-1 px-6 mt-24 mb-32 overflow-hidden">
        {subtitles && (
          <Subtitles
            subtitles={subtitles}
            currentTime={currentTime}
            onSeek={handleSeek}
          />
        )}
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent pt-20 pb-6 px-6 space-y-4">
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
        <AudioControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkipForward={handleSkipForward}
          onSkipBackward={handleSkipBackward}
        />
      </div>

      <audio ref={audioRef} src={AUDIO_URL} />
    </div>
  );
}
