import React, { useState } from 'react';
import { ViewMode } from '../types';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, BookOpen, Gamepad2, Info } from 'lucide-react';

interface NavbarProps {
  currentMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
  onOpenInfo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  onOpenInfo,
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);

  const toggleSound = () => {
    const nextState = soundManager.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-slate-100 hover:text-emerald-400 transition-colors"
          >
            Địa Lý 3 Miền Việt Nam
          </a>
        </div>

        {/* Zone 2: Navigation Links / Mode Segmented Tabs */}
        <nav className="flex items-center gap-1 rounded-xl bg-slate-900 border border-slate-800 p-1">
          <button
            type="button"
            onClick={() => onSelectMode('parallel')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
              currentMode === 'parallel'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đọc & So Sánh Song Song</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('game')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
              currentMode === 'game'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Trò Chơi Kéo Thả</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              isMuted
                ? 'border-slate-800 bg-slate-900 text-slate-500 hover:text-slate-300'
                : 'border-emerald-500/30 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/40'
            }`}
            title={isMuted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh hiệu ứng'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Quick Guide / Help */}
          <button
            type="button"
            onClick={onOpenInfo}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Hướng dẫn sử dụng"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
