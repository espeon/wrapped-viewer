import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
}

export function AudioControls({ isPlaying, onPlayPause, onSkipForward, onSkipBackward }: AudioControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onSkipBackward}
        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        aria-label="Skip backward"
      >
        <SkipBack className="w-8 h-8 text-gray-300" />
      </button>
      
      <button
        onClick={onPlayPause}
        className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="w-10 h-10 text-white" />
        ) : (
          <Play className="w-10 h-10 text-white" />
        )}
      </button>
      
      <button
        onClick={onSkipForward}
        className="p-2 rounded-full hover:bg-gray-800 transition-colors"
        aria-label="Skip forward"
      >
        <SkipForward className="w-8 h-8 text-gray-300" />
      </button>
    </div>
  );
}