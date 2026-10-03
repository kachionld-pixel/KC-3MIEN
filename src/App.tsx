import React, { useState, useRef } from 'react';
import { ViewMode, RegionId, Flashcard } from './types';
import { REGIONS_DATA, FLASHCARDS } from './data/regionsData';
import { Navbar } from './components/Navbar';
import { TerrainCard, TerrainCardHandle } from './components/TerrainCard';
import { ParallelComparison } from './components/ParallelComparison';
import { DragDropGame, DragDropGameHandle } from './components/DragDropGame';
import { soundManager } from './utils/audio';
import { 
  Compass, 
  BookOpen, 
  Gamepad2, 
  Sparkles, 
  Map, 
  HelpCircle, 
  X, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<ViewMode>('parallel');
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  // References to the 3 region cards to invoke particle effects (explosion / fireworks)
  const regionRefs = useRef<Record<RegionId, TerrainCardHandle | null>>({
    'bac-dong-bac': null,
    'tay-bac-bac-trung-bo': null,
    'nam-trung-bo-nam-bo': null,
  });

  // Reference to DragDropGame
  const gameRef = useRef<DragDropGameHandle | null>(null);

  // State of placed cards in Game mode
  const [placedCardsByRegion, setPlacedCardsByRegion] = useState<Record<RegionId, Flashcard[]>>({
    'bac-dong-bac': [],
    'tay-bac-bac-trung-bo': [],
    'nam-trung-bo-nam-bo': [],
  });

  // Hovered drop target during drag
  const [dragOverRegion, setDragOverRegion] = useState<RegionId | null>(null);

  // Selected target region (for tap-to-assign on touch devices)
  const [selectedTargetRegion, setSelectedTargetRegion] = useState<RegionId | null>(null);

  // Handle drop on a region
  const handleDropOnRegion = (cardId: string, targetRegionId: RegionId) => {
    setDragOverRegion(null);
    if (cardId) {
      gameRef.current?.assignCard(cardId, targetRegionId);
    }
  };

  const handleSelectRegionAsTarget = (regionId: RegionId) => {
    const activeCardId = gameRef.current?.getSelectedCard();
    if (activeCardId) {
      gameRef.current?.assignCard(activeCardId, regionId);
      setSelectedTargetRegion(null);
    } else {
      setSelectedTargetRegion(prev => prev === regionId ? null : regionId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => setCurrentMode(mode)}
        onOpenInfo={() => setShowInfoModal(true)}
      />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero Section & Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Compass className="w-4 h-4" />
              <span>Địa lý Tự nhiên Lớp 8 & Lớp 12 · Chương trình Giáo dục Phổ thông</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mt-1">
              Ba Miền Địa Lý Tự Nhiên Việt Nam
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Khám phá cấu trúc địa hình, khí hậu, sông ngòi, sinh vật và khoáng sản của 3 miền tự nhiên thông qua mô hình 3D trực quan, chế độ đọc so sánh song song và trò chơi kéo thả thẻ kiến thức sinh động.
            </p>
          </div>

          {/* Quick Mode Indicator / Switch */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400">Chế độ đang mở:</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-700 px-3 py-1 text-xs font-semibold text-emerald-400">
              {currentMode === 'parallel' ? (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Đọc & So sánh</span>
                </>
              ) : (
                <>
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Trò chơi kéo thả</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* SECTION 1: The 3 Main Region Frames (Always visible for constant visual reference) */}
        <section aria-label="3 Khung hình đại diện 3 miền">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Bản đồ & Mô hình Địa hình 3D Ba Miền
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              {currentMode === 'game' ? 'Kéo thẻ vào các khung miền bên dưới' : 'Nhấp vào các điểm tròn xanh để xem tiêu điểm địa hình'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REGIONS_DATA.map((region) => (
              <TerrainCard
                key={region.id}
                ref={(el) => {
                  regionRefs.current[region.id] = el;
                }}
                region={region}
                isGameMode={currentMode === 'game'}
                placedCards={placedCardsByRegion[region.id]}
                isDragOver={dragOverRegion === region.id}
                isSelectedTarget={selectedTargetRegion === region.id}
                onDropTarget={(cardId, rId) => handleDropOnRegion(cardId, rId)}
                onSelectAsTarget={(rId) => handleSelectRegionAsTarget(rId)}
              />
            ))}
          </div>
        </section>

        {/* SECTION 2: Dynamic Mode Content */}
        <section className="pt-2">
          {currentMode === 'parallel' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Phần 1: Đọc & Đối Chiếu Song Song Đặc Điểm Tự Nhiên
                </h2>
              </div>
              <ParallelComparison />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Phần 2: Trò Chơi Kéo Thả Thẻ Kiến Thức
                </h2>
              </div>
              <DragDropGame
                ref={gameRef}
                regionRefs={regionRefs}
                placedCardsByRegion={placedCardsByRegion}
                setPlacedCardsByRegion={setPlacedCardsByRegion}
                selectedTargetRegion={selectedTargetRegion}
                setSelectedTargetRegion={setSelectedTargetRegion}
                dragOverRegion={dragOverRegion}
                setDragOverRegion={setDragOverRegion}
              />
            </div>
          )}
        </section>
      </main>

      {/* Info / Guide Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <HelpCircle className="w-5 h-5" />
                <span>Hướng Dẫn Ôn Tập & Thao Tác</span>
              </div>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-slate-100 mb-1">
                  1. Khung hình đại diện & Mô hình 3D:
                </h4>
                <p>
                  Màn hình luôn hiển thị 3 khung hình 3D đại diện cho 3 miền tự nhiên. Bạn có thể di chuột qua ảnh để thấy góc nghiêng 3D (parallax tilt) và nhấp vào các điểm ghim xanh (Hotspots) để đọc thông tin tiêu điểm địa hình tiêu biểu (dãy Hoàng Liên Sơn, vịnh Hạ Long, cao nguyên Tây Nguyên...).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-100 mb-1">
                  2. Chế độ Đọc & So Sánh Song Song:
                </h4>
                <p>
                  Xem toàn bộ đặc điểm vị trí, địa hình, khí hậu, sông ngòi, sinh vật và khoáng sản của cả 3 miền cạnh nhau. Bạn có thể lọc theo từng tiêu chí hoặc chuyển sang dạng Bảng Ma Trận để đối chiếu trực tiếp.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-100 mb-1">
                  3. Trò Chơi Kéo Thả & Hiệu Ứng Âm Thanh:
                </h4>
                <ul className="space-y-1 mt-1 pl-4 list-disc">
                  <li>
                    <strong className="text-emerald-400">Kéo thả:</strong> Dùng chuột kéo thẻ thông tin vào khung miền tương ứng. Trên điện thoại, bạn có thể kéo hoặc chạm vào thẻ rồi chạm vào khung miền.
                  </li>
                  <li>
                    <strong className="text-rose-400">Khi chọn SAI:</strong> Khung miền xuất hiện hiệu ứng rung giật, nổ tung nhẹ và phát âm thanh "bùm" vui nhộn, thẻ thông tin sẽ bật ngược lại khay.
                  </li>
                  <li>
                    <strong className="text-emerald-400">Khi chọn ĐÚNG:</strong> Khung miền bắn pháo hoa rực rỡ, phát tiếng pháo hoa lách tách và nhạc chúc mừng, thẻ đổi sang màu xanh lá và được ghim vào khung.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-right">
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-sm"
              >
                Đã hiểu & Bắt đầu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer adhering to anti-slop rules */}
      <footer className="border-t border-slate-800 bg-slate-950 py-5 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Tài liệu ôn tập Địa lý Ba Miền Tự Nhiên Việt Nam</span>
          <div className="flex items-center gap-3">
            <span>Dành cho học sinh & giáo viên</span>
            <span aria-hidden="true">·</span>
            <span>Tích hợp mô phỏng tương tác Web Audio & Canvas 3D</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
