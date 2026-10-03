import React, { useState, useEffect, useRef } from 'react';
import { Flashcard, RegionId } from '../types';
import { FLASHCARDS, REGIONS_DATA, CATEGORY_LABELS } from '../data/regionsData';
import { soundManager } from '../utils/audio';
import { TerrainCardHandle } from './TerrainCard';
import { 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  Trophy, 
  Flame, 
  Check, 
  X, 
  ArrowRight,
  MousePointerClick,
  Info
} from 'lucide-react';

interface DragDropGameProps {
  regionRefs: React.MutableRefObject<Record<RegionId, TerrainCardHandle | null>>;
  placedCardsByRegion: Record<RegionId, Flashcard[]>;
  setPlacedCardsByRegion: React.Dispatch<React.SetStateAction<Record<RegionId, Flashcard[]>>>;
  selectedTargetRegion: RegionId | null;
  setSelectedTargetRegion: (regionId: RegionId | null) => void;
  dragOverRegion: RegionId | null;
  setDragOverRegion: (regionId: RegionId | null) => void;
}

export interface DragDropGameHandle {
  assignCard: (cardId: string, targetRegionId: RegionId) => void;
  resetGame: () => void;
  getSelectedCard: () => string | null;
}

export const DragDropGame = React.forwardRef<DragDropGameHandle, DragDropGameProps>(({
  regionRefs,
  placedCardsByRegion,
  setPlacedCardsByRegion,
  selectedTargetRegion,
  setSelectedTargetRegion,
  dragOverRegion,
  setDragOverRegion,
}, ref) => {
  // Pool of available cards that haven't been placed correctly yet
  const [unplacedCards, setUnplacedCards] = useState<Flashcard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [activeHintCardId, setActiveHintCardId] = useState<string | null>(null);
  const [failingCardId, setFailingCardId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  // Initialize and shuffle cards
  const initializeGame = () => {
    const shuffled = [...FLASHCARDS].sort(() => Math.random() - 0.5);
    setUnplacedCards(shuffled);
    setPlacedCardsByRegion({
      'bac-dong-bac': [],
      'tay-bac-bac-trung-bo': [],
      'nam-trung-bo-nam-bo': [],
    });
    setSelectedCardId(null);
    setActiveHintCardId(null);
    setFailingCardId(null);
    setScore(0);
    setStreak(0);
    setShowVictoryModal(false);
    setTotalAttempts(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Expose imperative handle for external drop events
  React.useImperativeHandle(ref, () => ({
    assignCard: (cardId: string, targetRegionId: RegionId) => {
      handleAssignCardToRegion(cardId, targetRegionId);
    },
    resetGame: () => {
      initializeGame();
    },
    getSelectedCard: () => selectedCardId
  }));

  // Check victory condition
  useEffect(() => {
    const totalPlaced = 
      placedCardsByRegion['bac-dong-bac'].length +
      placedCardsByRegion['tay-bac-bac-trung-bo'].length +
      placedCardsByRegion['nam-trung-bo-nam-bo'].length;

    if (FLASHCARDS.length > 0 && totalPlaced === FLASHCARDS.length) {
      soundManager.playVictory();
      setShowVictoryModal(true);
    }
  }, [placedCardsByRegion]);

  // Handle evaluation of dropping or assigning a card to a region
  const handleAssignCardToRegion = (cardId: string, targetRegionId: RegionId) => {
    const card = unplacedCards.find((c) => c.id === cardId);
    if (!card) return;

    setTotalAttempts((prev) => prev + 1);

    if (card.regionId === targetRegionId) {
      // CORRECT!
      soundManager.playFireworks();
      regionRefs.current[targetRegionId]?.triggerFireworks();

      // Update state
      setPlacedCardsByRegion((prev) => ({
        ...prev,
        [targetRegionId]: [...prev[targetRegionId], card],
      }));
      setUnplacedCards((prev) => prev.filter((c) => c.id !== cardId));
      setSelectedCardId(null);
      setSelectedTargetRegion(null);

      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak((prev) => Math.max(prev, newStreak));
      setScore((prev) => prev + 100 + newStreak * 20);
    } else {
      // WRONG!
      soundManager.playExplosion();
      regionRefs.current[targetRegionId]?.triggerExplosion();

      // Visual feedback on card
      setFailingCardId(cardId);
      setTimeout(() => setFailingCardId(null), 650);

      setStreak(0);
      setScore((prev) => Math.max(0, prev - 25));
    }
  };

  // HTML5 Drag Events
  const handleDragStart = (e: React.DragEvent, card: Flashcard) => {
    soundManager.playCardPick();
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'copyMove';
    setSelectedCardId(card.id);
  };

  const handleDragEnd = () => {
    setDragOverRegion(null);
  };

  // Card click (for click-to-assign on mobile & accessible devices)
  const handleCardClick = (card: Flashcard) => {
    soundManager.playCardPick();
    if (selectedCardId === card.id) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(card.id);
      // If a region target was already selected, assign immediately!
      if (selectedTargetRegion) {
        handleAssignCardToRegion(card.id, selectedTargetRegion);
      }
    }
  };

  // Total completion percentage
  const totalCards = FLASHCARDS.length;
  const completedCards = totalCards - unplacedCards.length;
  const progressPercent = Math.round((completedCards / totalCards) * 100);

  return (
    <div className="space-y-5">
      {/* Game Dashboard Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Progress */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Tiến độ hoàn thành:</span>
              <span className="font-mono text-emerald-400">{completedCards}/{totalCards} thẻ</span>
              <span>({progressPercent}%)</span>
            </div>
            <div className="mt-1.5 h-2 w-40 sm:w-56 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Streak indicator */}
          {streak > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-xs font-bold text-amber-400 animate-pulse">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Streak {streak}x!</span>
            </div>
          )}
        </div>

        {/* Score and Reset Controls */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
              Điểm số
            </span>
            <span className="font-mono text-lg font-bold text-emerald-400">
              {score}
            </span>
          </div>

          <button
            type="button"
            onClick={initializeGame}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chơi lại</span>
          </button>
        </div>
      </div>

      {/* Interactive Guidance Banner */}
      <div className="flex items-center justify-between rounded-xl bg-slate-900/60 border border-slate-800 px-4 py-2.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <MousePointerClick className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {selectedCardId
              ? 'Đang chọn 1 thẻ! Hãy thả hoặc nhấp vào 1 trong 3 Khung Miền ở trên để gán.'
              : 'Kéo thả các thẻ thông tin bên dưới vào đúng khung ảnh 3D của miền, hoặc bấm vào thẻ rồi bấm vào khung.'}
          </span>
        </div>
        <span className="hidden md:inline-block text-[11px] font-mono text-slate-400">
          Còn {unplacedCards.length} thẻ
        </span>
      </div>

      {/* Cards Deck Tray */}
      {unplacedCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {unplacedCards.map((card) => {
            const isSelected = selectedCardId === card.id;
            const isFailing = failingCardId === card.id;
            const hasHintOpen = activeHintCardId === card.id;
            const categoryInfo = CATEGORY_LABELS[card.category];

            return (
              <div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
                onDragEnd={handleDragEnd}
                onClick={() => handleCardClick(card)}
                className={`relative flex flex-col justify-between rounded-xl border p-3.5 cursor-grab active:cursor-grabbing transition-all select-none duration-200 ${
                  isFailing
                    ? 'animate-explosion border-rose-500 bg-rose-950/70 ring-2 ring-rose-500'
                    : isSelected
                    ? 'border-sky-400 bg-slate-900 ring-2 ring-sky-400 scale-[1.02] shadow-xl shadow-sky-500/20'
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700 hover:bg-slate-900 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {categoryInfo.title.split('&')[0]}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHintCardId(hasHintOpen ? null : card.id);
                      }}
                      className="text-slate-400 hover:text-amber-400 p-0.5 rounded transition-colors"
                      title="Xem gợi ý"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card Content Text */}
                  <p className="text-xs font-medium text-slate-200 leading-relaxed">
                    {card.content}
                  </p>
                </div>

                {/* Hint popover */}
                {hasHintOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2.5 rounded-lg border border-amber-500/30 bg-amber-950/40 p-2 text-[11px] text-amber-200 leading-tight"
                  >
                    <span className="font-semibold block mb-0.5">💡 Gợi ý:</span>
                    {card.hint}
                  </div>
                )}

                {/* Bottom Quick-Action buttons for Touch / Mobile */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">
                    {isSelected ? 'Đã chọn' : 'Kéo hoặc chạm'}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="hover:text-emerald-400 transition-colors">Chọn miền</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* All cards completed state */
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-8 text-center shadow-xl">
          <Trophy className="mx-auto h-12 w-12 text-emerald-400 animate-bounce" />
          <h3 className="mt-3 text-lg font-bold text-slate-100">
            Xuất sắc! Bạn đã gán chính xác tất cả đặc điểm của 3 miền!
          </h3>
          <p className="mt-1 text-xs text-slate-300 max-w-md mx-auto">
            Tổng điểm: <strong className="text-emerald-400 font-mono text-sm">{score}</strong> điểm · Chuỗi đúng dài nhất: <strong className="text-amber-400 font-mono text-sm">{maxStreak}</strong>
          </p>
          <button
            type="button"
            onClick={initializeGame}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Thử thách lại</span>
          </button>
        </div>
      )}

      {/* Victory Celebration Modal */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-emerald-500/50 bg-slate-900 p-6 shadow-2xl text-center">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-3">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              Chúc Mừng Bạn Đã Hoàn Thành!
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Bạn đã nắm vững toàn bộ kiến thức tự nhiên về 3 miền địa lý Việt Nam từ vị trí, địa hình cánh cung/TB-ĐN/cao nguyên, khí hậu, sông ngòi đến sinh vật và khoáng sản.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-950 border border-slate-800 p-3">
              <div>
                <span className="text-[11px] text-slate-400 block">Tổng điểm</span>
                <span className="font-mono text-lg font-bold text-emerald-400">{score}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Độ chính xác</span>
                <span className="font-mono text-lg font-bold text-sky-400">
                  {totalAttempts > 0 ? Math.round((totalCards / totalAttempts) * 100) : 100}%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Chuỗi cao nhất</span>
                <span className="font-mono text-lg font-bold text-amber-400">{maxStreak}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowVictoryModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
              >
                Xem lại kết quả trên bản đồ
              </button>
              <button
                type="button"
                onClick={initializeGame}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/30"
              >
                Chơi lại lượt mới
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

DragDropGame.displayName = 'DragDropGame';
