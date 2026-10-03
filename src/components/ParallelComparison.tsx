import React, { useState } from 'react';
import { REGIONS_DATA, CATEGORY_LABELS } from '../data/regionsData';
import { Category } from '../types';
import { 
  MapPin, 
  Mountain, 
  CloudSun, 
  Waves, 
  Trees, 
  Gem, 
  Columns3, 
  Table2, 
  Search, 
  ArrowRight,
  Filter
} from 'lucide-react';

const CATEGORY_ICONS: Record<Category, React.ComponentType<{ className?: string }>> = {
  'vi-tri': MapPin,
  'dia-hinh': Mountain,
  'khi-hau': CloudSun,
  'song-ngoi': Waves,
  'sinh-vat': Trees,
  'khoang-san': Gem,
};

export const ParallelComparison: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [viewStyle, setViewStyle] = useState<'columns' | 'matrix'>('columns');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  const filteredCategories = selectedCategory === 'all' 
    ? categories 
    : [selectedCategory];

  return (
    <div className="space-y-6">
      {/* Control bar: Criteria filter + View Style + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 backdrop-blur-md">
        {/* Category Pills / Segmented Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Tất cả 6 tiêu chí
          </button>
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{CATEGORY_LABELS[cat].title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* View toggle & Search */}
        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm từ khóa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-36 sm:w-48 rounded-lg bg-slate-950 border border-slate-800 pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Style switch */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-1">
            <button
              type="button"
              onClick={() => setViewStyle('columns')}
              title="Xem 3 cột song song"
              className={`p-1.5 rounded-md transition-colors ${
                viewStyle === 'columns'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewStyle('matrix')}
              title="Xem bảng ma trận đối chiếu"
              className={`p-1.5 rounded-md transition-colors ${
                viewStyle === 'matrix'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* VIEW STYLE 1: 3 Parallel Columns */}
      {viewStyle === 'columns' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REGIONS_DATA.map((region) => (
            <div
              key={region.id}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg"
            >
              {/* Region Header */}
              <div className="border-b border-slate-800 bg-slate-900/90 p-4">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-400">
                  <span>Khung {region.index}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-semibold">{region.fullName.split('và')[0]}</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mt-1">
                  {region.fullName}
                </h3>
              </div>

              {/* Sections list */}
              <div className="divide-y divide-slate-800/80 p-4 space-y-4">
                {filteredCategories.map((catKey) => {
                  const section = region.sections[catKey];
                  const Icon = CATEGORY_ICONS[catKey];
                  const matchesSearch = !searchQuery || 
                    section.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    section.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

                  if (searchQuery && !matchesSearch) return null;

                  return (
                    <div key={catKey} className="pt-3 first:pt-0 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{CATEGORY_LABELS[catKey].title}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed text-justify">
                        {section.content}
                      </p>
                      <div className="space-y-1 pt-1">
                        {section.highlights.map((hl, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400 leading-tight">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW STYLE 2: Cross-Comparison Matrix Table */}
      {viewStyle === 'matrix' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 w-1/5">
                  Tiêu chí tự nhiên
                </th>
                {REGIONS_DATA.map((r) => (
                  <th key={r.id} className="p-4 text-xs font-bold text-slate-200 w-4/15 border-l border-slate-800/80">
                    <span className="text-[11px] font-mono text-emerald-400 block mb-0.5">Khung {r.index}</span>
                    <span className="text-sm font-semibold">{r.fullName}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {filteredCategories.map((catKey) => {
                const Icon = CATEGORY_ICONS[catKey];
                return (
                  <tr key={catKey} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 align-top font-bold text-slate-300 bg-slate-950/40">
                      <div className="flex items-center gap-2 sticky top-4">
                        <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{CATEGORY_LABELS[catKey].title}</span>
                      </div>
                    </td>
                    {REGIONS_DATA.map((r) => {
                      const section = r.sections[catKey];
                      return (
                        <td key={r.id} className="p-4 align-top text-slate-300 border-l border-slate-800/80 leading-relaxed">
                          <p className="mb-2 text-justify">{section.content}</p>
                          <ul className="space-y-1 border-t border-slate-800/60 pt-2">
                            {section.highlights.map((hl, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                                <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
