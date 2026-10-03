import React, { useRef, useState } from 'react';
import { RegionData, Flashcard, Hotspot, RegionId } from '../types';
import { ParticleCanvas, ParticleEffectHandle } from './ParticleCanvas';
import { 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Layers, 
  Maximize2, 
  Info,
  Flame,
  X
} from 'lucide-react';

interface TerrainCardProps {
  region: RegionData;
  isGameMode: boolean;
  placedCards?: Flashcard[];
  isDragOver?: boolean;
  onDropTarget?: (cardId: string, regionId: RegionId) => void;
  onSelectAsTarget?: (regionId: RegionId) => void;
  isSelectedTarget?: boolean;
}

export interface TerrainCardHandle {
  triggerExplosion: () => void;
  triggerFireworks: () => void;
}

export const TerrainCard = React.forwardRef<TerrainCardHandle, TerrainCardProps>(({
  region,
  isGameMode,
  placedCards = [],
  isDragOver = false,
  onDropTarget,
  onSelectAsTarget,
  isSelectedTarget = false
}, ref) => {
  const particleRef = useRef<ParticleEffectHandle | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  React.useImperativeHandle(ref, () => ({
    triggerExplosion: () => {
      setIsExploding(true);
      particleRef.current?.burstExplosion();
      setTimeout(() => setIsExploding(false), 650);
    },
    triggerFireworks: () => {
      setIsCelebrating(true);
      particleRef.current?.burstFireworks();
      setTimeout(() => setIsCelebrating(false), 2200);
    }
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isGameMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isGameMode) return;
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (onDropTarget) {
      onDropTarget(cardId, region.id);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => isGameMode && onSelectAsTarget && onSelectAsTarget(region.id)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
      }}
      className={`group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${
        isExploding 
          ? 'animate-explosion border-rose-500 bg-rose-950/40 ring-4 ring-rose-500/50' 
          : isCelebrating 
          ? 'animate-celebrate border-emerald-400 bg-emerald-950/30 ring-4 ring-emerald-500/50' 
          : isDragOver
          ? 'border-sky-400 bg-sky-950/30 ring-4 ring-sky-400/60 scale-[1.01]'
          : isSelectedTarget
          ? 'border-emerald-400 bg-slate-900/90 ring-2 ring-emerald-400 shadow-xl shadow-emerald-500/20'
          : 'border-slate-800 bg-slate-900/80 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-950/80'
      }`}
    >
      {/* Visual Canvas Particle Layer */}
      <ParticleCanvas ref={particleRef} />

      {/* Header bar */}
      <div className="relative z-20 flex items-center justify-between border-b border-slate-800/80 px-4 py-3 bg-slate-900/95 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Khung {region.index}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 truncate max-w-[200px]">
              {region.shortName || (region.id === 'bac-dong-bac' ? 'Bắc & Đông Bắc' : region.id === 'tay-bac-bac-trung-bo' ? 'Tây Bắc & Bắc Trung Bộ' : 'Nam Trung Bộ & Nam Bộ')}
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-100 mt-0.5 tracking-tight group-hover:text-emerald-300 transition-colors">
            {region.fullName}
          </h2>
        </div>

        {/* Game Mode Drop Indicator / Badge */}
        {isGameMode && (
          <div className="flex items-center gap-1.5">
            <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              placedCards.length > 0 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : isSelectedTarget
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 animate-pulse'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{placedCards.length} thẻ đúng</span>
            </div>
          </div>
        )}
      </div>

      {/* 3D Map / Terrain Image Showcase */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 select-none">
        <img
          src={region.image}
          alt={region.fullName}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dynamic lighting gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/40 pointer-events-none" />

        {/* Hotspots Pin Layer on the 3D model */}
        {region.hotspots.map((spot) => (
          <button
            key={spot.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(spot);
            }}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            className="group/pin absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center p-1 rounded-full cursor-pointer focus:outline-none transition-transform hover:scale-125"
            title={spot.name}
            aria-label={spot.name}
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950 shadow-md"></span>
            </span>

            {/* Tooltip on hover */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:flex flex-col items-center pointer-events-none z-30">
              <span className="whitespace-nowrap rounded-md bg-slate-900/95 border border-slate-700 px-2 py-1 text-[11px] font-medium text-slate-200 shadow-xl backdrop-blur-md">
                {spot.name}
              </span>
              <span className="w-1.5 h-1.5 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1"></span>
            </span>
          </button>
        ))}

        {/* Active Hotspot Modal / Popover */}
        {activeHotspot && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 bottom-3 z-30 rounded-xl bg-slate-900/95 border border-emerald-500/40 p-3.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Tiêu điểm địa hình 3D</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="text-slate-400 hover:text-slate-200 p-0.5 rounded-md hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-100 mt-1">
              {activeHotspot.name}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {activeHotspot.description}
            </p>
          </div>
        )}

        {/* Drop zone callout when dragging over in Game Mode */}
        {isGameMode && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-opacity">
            <div className={`rounded-xl px-4 py-2 border backdrop-blur-md text-xs font-bold transition-all ${
              isDragOver
                ? 'bg-emerald-500/90 text-slate-950 border-emerald-300 scale-110 shadow-2xl shadow-emerald-500/50'
                : isSelectedTarget
                ? 'bg-sky-500/90 text-slate-950 border-sky-300 scale-105'
                : 'bg-slate-900/70 text-slate-300 border-slate-700/80 opacity-0 group-hover:opacity-100'
            }`}>
              {isDragOver ? '⚡ Thả vào đây!' : 'Thả thẻ vào khung này'}
            </div>
          </div>
        )}

        {/* Bottom Tagline on image */}
        <div className="absolute bottom-2.5 left-3 right-3 z-10 pointer-events-none">
          <p className="text-xs font-medium text-slate-300 line-clamp-1 drop-shadow-md">
            {region.subTitle}
          </p>
        </div>
      </div>

      {/* Visual Highlights & Terrain Features */}
      <div className="p-3.5 flex-1 flex flex-col justify-between bg-slate-900/60">
        <div className="space-y-1.5">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>Đặc trưng địa hình nổi bật</span>
          </div>
          <ul className="space-y-1">
            {region.visualHighlights.map((hl, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Placed cards list in Game Mode */}
        {isGameMode && placedCards.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-400 mb-1.5">
              <span>Đặc điểm đã gán đúng ({placedCards.length}):</span>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
              {placedCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-2 text-xs text-emerald-200 flex items-start gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{card.content}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

TerrainCard.displayName = 'TerrainCard';
