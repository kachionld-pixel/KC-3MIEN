export type RegionId = 'bac-dong-bac' | 'tay-bac-bac-trung-bo' | 'nam-trung-bo-nam-bo';

export type Category = 
  | 'vi-tri' 
  | 'dia-hinh' 
  | 'khi-hau' 
  | 'song-ngoi' 
  | 'sinh-vat' 
  | 'khoang-san';

export interface Hotspot {
  id: string;
  name: string;
  description: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  type: 'mountain' | 'river' | 'plains' | 'sea' | 'mineral' | 'biome';
}

export interface RegionSection {
  category: Category;
  title: string;
  content: string;
  highlights: string[];
}

export interface RegionData {
  id: RegionId;
  index: number;
  frameTitle: string;
  fullName: string;
  shortName: string;
  subTitle: string;
  image: string;
  accentColor: 'sky' | 'amber' | 'emerald';
  badgeColor: string;
  sections: Record<Category, RegionSection>;
  hotspots: Hotspot[];
  visualHighlights: string[];
}

export interface Flashcard {
  id: string;
  regionId: RegionId;
  category: Category;
  content: string;
  hint: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export type ViewMode = 'parallel' | 'game';
