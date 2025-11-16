import type { ItemDto } from '@api/models/ItemDto';
import type { Shelf, ShelfItem } from './types';

/**
 * storeSection별 배경 이미지 매핑 (임시 하드코딩)
 * TODO: 백엔드에서 storeSection에 backgroundImage 포함 시 제거
 */
const STORE_SECTION_BACKGROUND_MAP: Record<string, string> = {
  food: '/shelf-food.png',
  household: '/shelf-example.png',
  clothing: '/shelf-clothing.png',
  default: '/long-shelf-example.png',
};

/**
 * storeSection 이름을 기반으로 배경 이미지 반환
 *
 * @param storeSectionName - storeSection 이름
 * @returns 배경 이미지 경로
 */
function getBackgroundImageForSection(storeSectionName: string): string {
  const normalized = storeSectionName.toLowerCase();
  return (
    STORE_SECTION_BACKGROUND_MAP[normalized] ||
    STORE_SECTION_BACKGROUND_MAP.default
  );
}

/**
 * ItemDto를 ShelfItem으로 변환
 * position(x, y)은 임시로 일렬 배치 계산
 *
 * @param item - 백엔드 ItemDto
 * @param index - 배열 내 인덱스
 * @param totalCount - 해당 섹션 내 전체 아이템 수
 * @returns ShelfItem
 */
function adaptShelfItemFromItemDto(
  item: ItemDto,
  index: number,
  totalCount: number
): ShelfItem {
  // TODO: 백엔드에서 position(x, y) 제공 시 제거
  // 일렬 배치: x는 균등 분배, y는 고정
  const x = (index + 1) / (totalCount + 1);
  const y = Math.random();

  return {
    id: String(item.id),
    name: item.name,
    x,
    y,
    // TODO: 백엔드에서 재고(quantity) 제공 시 수정
    quantity: 99, // 임시로 충분한 재고 설정
    // TODO: 백엔드에서 description 제공 시 수정
    description: `${item.name}에 대한 설명`, // 임시 설명
  };
}

/**
 * SetupInfoDto의 items를 Shelf[] 구조로 변환
 * storeSection별로 그룹화하여 각각을 Shelf로 만듦
 *
 * TODO: 백엔드에서 storeSection을 상위로 하고 items를 하위로 제공하면
 *       이 역전 로직 제거 가능
 *
 * @param items - 백엔드에서 받은 ItemDto[]
 * @returns Shelf[] (레거시 UI 구조)
 */
export function adaptShelvesFromSetupInfo(items: ItemDto[]): Shelf[] {
  // 1. storeSection별로 아이템 그룹화
  const itemsBySection = items.reduce(
    (acc, item) => {
      const sectionName = item.storeSection || 'default';
      if (!acc[sectionName]) {
        acc[sectionName] = [];
      }
      acc[sectionName].push(item);
      return acc;
    },
    {} as Record<string, ItemDto[]>
  );

  // 2. 각 섹션을 Shelf로 변환
  const shelves: Shelf[] = Object.entries(itemsBySection).map(
    ([sectionName, sectionItems], sectionIndex) => {
      const shelfItems = sectionItems.map((item, itemIndex) =>
        adaptShelfItemFromItemDto(item, itemIndex, sectionItems.length)
      );

      return {
        id: `section-${sectionIndex}`, // 고유 ID 생성
        name: sectionName,
        backgroundImage: getBackgroundImageForSection(sectionName),
        shelfItems,
      };
    }
  );

  return shelves;
}
