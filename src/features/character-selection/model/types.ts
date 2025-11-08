/**
 * 개별 캐릭터 정보
 * FIXME: 백엔드에서 fullImage, thumbnailImage, colors를 API 응답에 포함하도록 수정 요청 중
 */
export interface Character {
  id: string; // characterId (string 변환)
  name: string;
  fullImage: string; // FIXME: 백엔드 추가 예정
  thumbnailImage: string; // FIXME: 백엔드 추가 예정
  currentHp: number; // 시작 HP (증감 관리)
  currentSp: number; // 시작 SP (mentality → sp로 통일)
  colors: {
    backgroundColor: string; // FIXME: 백엔드 추가 예정
    borderColor: string; // FIXME: 백엔드 추가 예정
  };
}

/**
 * 캐릭터 세트 (캐릭터 그룹)
 * 예: 헴과 병철 세트
 */
export interface CharacterSet {
  id: string; // characterGroupId
  name: string;
  image: string; // 그룹 대표 이미지
  description: string;
  isLocked?: boolean; // 미공개 여부
}

export interface CharacterSelectionState {
  characterSets: CharacterSet[];
  currentIndex: number;
  selectedCharacterSet: CharacterSet | null;
}

export interface CharacterSelectionActions {
  setCharacterSets: (characterSets: CharacterSet[]) => void;
  moveToNext: () => void;
  moveToPrevious: () => void;
  selectCharacterSet: (characterSet: CharacterSet) => void;
  reset: () => void;
}
