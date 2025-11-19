import type { ItemDto } from '@api/models/ItemDto';
import type { SubmitInventoryDto, CreateSlotDto, SetupInfoDto } from '@api';
import type { Shelf, ShelfItem } from './types';

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
      id: String(section.id),
      name: section.name,
      backgroundImage:
        section.backgroundImage || getBackgroundImageForSection(section.name),
      shelfItems,
    };
  });
}

/**
 * ShelfItem[]을 SubmitInventoryDto로 변환
 *
 * @param items - 선택된 ShelfItem 목록
 * @param bagId - 선택한 가방 ID
 * @returns SubmitInventoryDto
 */
export function adaptShelfItemsToInventoryPayload(
  items: ShelfItem[],
  bagId: number
): SubmitInventoryDto {
  const slots: CreateSlotDto[] = items.map(item => ({
    itemId: Number(item.id),
    quantity: item.quantity,
  }));

  return {
    bagId,
    slots,
  };
}
