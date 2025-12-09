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

export const ENDING_GRADE = {
  HAPPY: 'HAPPY',
  NORMAL: 'NORMAL',
  BAD: 'BAD',
  HIDDEN: 'HIDDEN',
} as const;
export type EndingGrade = (typeof ENDING_GRADE)[keyof typeof ENDING_GRADE];

export const POINT_TYPE = {
  GOOD: 'GOOD',
  BAD: 'BAD',
} as const;
export type PointType = (typeof POINT_TYPE)[keyof typeof POINT_TYPE];

// ============================================
// PlayReport 관련 타입
// ============================================

export interface PlayReportPoint {
  type: PointType;
  label: string;
  description: string;
}

export interface PlayReportCharacterStats {
  name: string;
  finalHealth: number;
  finalMental: number;
  maxHealth: number;
  maxMental: number;
  characterCode: string;
  potential: number;
  survivalStatus: string;
}

export interface PlayReportSurvivalBag {
  ownerNames: string;
  bagName: string;
  usability: string;
  itemUsageRate: string;
  bagImage?: string;
  items?: SlotItem[];
}

export interface PlayReportSessionMetadata {
  id: number;
  userName: string;
  characterGroupCode?: string;
  characterGroupName?: string;
  status: string;
  endedAt?: string;
  createdAt: string;
  totalPlayTimeSeconds?: number;
  lifePoint: number;
}

export interface PlayreportEnding {
  id: number;
  title: string;
  grade: EndingGrade;
  image?: string;
}
export interface PlayReportData {
  sessionMetadata: PlayReportSessionMetadata;
  ending: PlayreportEnding;
  points: PlayReportPoint[];
  characters: PlayReportCharacterStats[];
  survivalBag: PlayReportSurvivalBag;
  experiencePointsTotal: number;
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

// ============================================
// History 관련 타입
// ============================================

export interface HistoryItem {
  id: string;
  characterName: string;
  resultType: string;
  xp: number;
  date: string;
  time: string;
  characterImageUrl?: string;
  /** 히스토리 상세 조회 시 사용되는 PlayReport 데이터 */
  playReport: PlayReportData;
}
