import type { ItemDto } from '@api/models/ItemDto';
import type {
  SubmitGameSessionInventoryDto,
  GameSessionInventoryItemDto,
  SetupInfoDto,
  StoreSectionDto,
} from '@api';
import type { Shelf, ShelfItem, MinimapSection } from './types';
import { MINIMAP_ICON_CONFIG } from './minimapIconConfig';

/**
 * storeSection별 배경 이미지 매핑 (임시 하드코딩)
 * TODO: 백엔드에서 storeSection에 backgroundImage 포함 시 제거
 */
const STORE_SECTION_BACKGROUND_MAP: Record<string, string> = {
  groupgrocery: '/shelf-food.png',
  groupfood: '/shelf-food.png',
  grouphousehold: '/shelf-household.png',
  groupapparel: '/shelf-clothing.png',
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
 * positionX/Y가 제공되면 사용, 없으면 fallback 계산
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
  // positionX/Y가 제공되면 사용, 없으면 fallback 계산
  const x =
    item.positionX !== null && item.positionX !== undefined
      ? item.positionX
      : (index + 1) / (totalCount + 1);

  const y =
    item.positionY !== null && item.positionY !== undefined
      ? item.positionY
      : 0.5;

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
 * SetupInfoDto의 storeSections를 Shelf[] 구조로 변환
 *
 * @param setupInfo - 백엔드에서 받은 SetupInfoDto
 * @returns Shelf[] (레거시 UI 구조)
 */
export function adaptShelvesFromSetupInfo(setupInfo: SetupInfoDto): Shelf[] {
  return setupInfo.storeSections.map(section => {
    const shelfItems = section.items.map((item, itemIndex) =>
      adaptShelfItemFromItemDto(item, itemIndex, section.items.length)
    );

    return {
      id: section.id,
      code: section.code,
      name: section.displayName,
      backgroundImage:
        section.backgroundImage ||
        getBackgroundImageForSection(section.displayName),
      shelfItems,
    };
  });
}

/**
 * StoreSectionDto[]를 MinimapSection[]으로 변환
 * 미니맵에 표시할 섹션 정보와 아이콘을 매핑
 *
 * @param sections - 백엔드 StoreSectionDto 배열
 * @returns MinimapSection[] (아이콘이 매핑된 미니맵용 데이터)
 */
export function adaptStoreSectionsToMinimapSections(
  sections: StoreSectionDto[]
): MinimapSection[] {
  return sections
    .map(section => {
      const config = MINIMAP_ICON_CONFIG[section.code];
      if (!config) return null;

      return {
        code: section.code,
        displayName: section.displayName,
        icons: config.icons,
        positionClassName: config.positionClassName,
      };
    })
    .filter((section): section is MinimapSection => section !== null);
}

/**
 * ShelfItem[]을 SubmitGameSessionInventoryDto로 변환
 *
 * @param items - 선택된 ShelfItem 목록
 * @param bagId - 선택한 가방 ID
 * @returns SubmitGameSessionInventoryDto
 */
export function adaptShelfItemsToInventoryPayload(
  items: ShelfItem[],
  bagId: number
): SubmitGameSessionInventoryDto {
  const inventoryItems: GameSessionInventoryItemDto[] = items.map(item => ({
    itemId: Number(item.id),
    quantity: item.quantity,
  }));

  return {
    bagId,
    items: inventoryItems,
  };
}
