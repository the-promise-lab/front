import type { SlotItem } from '@entities/inventory';

// ============================================
// Collection 관련 타입
// ============================================

export interface CollectionCard {
  endingTitle: string;
  endingThumbnailUrl: string | null;
}

export interface CollectionCharacterSet {
  id: number;
  name: string;
  images: {
    active: string;
    disabled: string;
    default: string;
  };
  collectionCards: CollectionCard[];
}

// ============================================
// PlayReport 관련 타입
// ============================================

export interface PlayReportPoint {
  type: 'positive' | 'negative';
  label: string;
  description: string;
}

export interface PlayReportCharacterStats {
  name: string;
  health: number;
  mental: number;
  potential: number;
}

export interface PlayReportSurvivalBag {
  ownerNames: string;
  bagType: string;
  usability: string;
  itemUsageRate: string;
  bagImage?: string;
  items?: SlotItem[];
}

export interface PlayReportData {
  endingTitle: string;
  points: PlayReportPoint[];
  characters: PlayReportCharacterStats[];
  survivalBag: PlayReportSurvivalBag;
}

// ============================================
// Ranking 관련 타입
// ============================================

export interface RankingMyScore {
  rank: number;
  totalUsers: number;
  xp: number;
}

export interface RankingCharacterResult {
  characterNames: string;
  result: string;
  imageUrl?: string;
}

export interface RankingUser {
  rank: number;
  nickname: string;
  xp: number;
  isCurrentUser?: boolean;
}

export interface RankingData {
  myScore: RankingMyScore;
  characters: RankingCharacterResult[];
  rankings: RankingUser[];
}
