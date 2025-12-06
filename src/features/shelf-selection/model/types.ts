import type { ReactElement, SVGProps } from 'react';

/**
 * 레거시 타입 정의
 * TODO: 백엔드 API 구조가 변경되면 이 타입들도 재검토 필요
 */

export interface ShelfItem {
  id: string;
  name: string;
  image: string | null;
  x: number;
  y: number;
  quantity: number;
  description: string;
}

export interface Shelf {
  id: number;
  code: string;
  name: string;
  backgroundImage: string;
  shelfItems: ShelfItem[];
}

/**
 * 미니맵 아이콘 props 타입
 */
export type MinimapIconProps = SVGProps<SVGSVGElement> & { className?: string };

/**
 * 미니맵 아이콘 상태별 컴포넌트
 */
export interface MinimapIconSet {
  default: ReactElement<MinimapIconProps>;
  active: ReactElement<MinimapIconProps>;
  focus: ReactElement<MinimapIconProps>;
  inactive: ReactElement<MinimapIconProps>;
}

/**
 * 미니맵에 표시될 섹션 정보 (adapter를 통해 변환된 도메인 타입)
 */
export interface MinimapSection {
  shelfId: number;
  code: string;
  displayName: string;
  icons: MinimapIconSet;
  positionClassName: string;
}
