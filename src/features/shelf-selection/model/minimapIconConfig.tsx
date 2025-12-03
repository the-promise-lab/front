import type { MinimapIconSet } from './types';
import {
  IconMinimapClothesActive,
  IconMinimapClothesDefault,
  IconMinimapClothesFocus,
  IconMinimapClothesInactive,
  IconMinimapDailyActive,
  IconMinimapDailyDefault,
  IconMinimapDailyFocus,
  IconMinimapDailyInactive,
  IconMinimapDigitalActive,
  IconMinimapDigitalDefault,
  IconMinimapDigitalFocus,
  IconMinimapDigitalInactive,
  IconMinimapDrinkDefault,
  IconMinimapDrinkActive,
  IconMinimapDrinkFocus,
  IconMinimapDrinkInactive,
  IconMinimapFoodActive,
  IconMinimapFoodDefault,
  IconMinimapFoodFocus,
  IconMinimapFoodInactive,
  IconMinimapNoteActive,
  IconMinimapNoteDefault,
  IconMinimapNoteFocus,
  IconMinimapNoteInactive,
  IconMinimapPharmacyActive,
  IconMinimapPharmacyDefault,
  IconMinimapPharmacyFocus,
  IconMinimapPharmacyInactive,
  IconMinimapSaleActive,
  IconMinimapSaleDefault,
  IconMinimapSaleFocus,
  IconMinimapSaleInactive,
} from '../ui/ShelfSelection/kit/icons';

interface MinimapIconConfig {
  icons: MinimapIconSet;
  positionClassName: string;
}

/**
 * 미니맵 아이콘 설정
 * storeSectionCode를 키로 사용하여 아이콘 및 위치 정보 매핑
 */
export const MINIMAP_ICON_CONFIG: Record<string, MinimapIconConfig> = {
  GroupHousehold: {
    icons: {
      default: <IconMinimapDailyDefault />,
      active: <IconMinimapDailyActive />,
      focus: <IconMinimapDailyFocus />,
      inactive: <IconMinimapDailyInactive />,
    },
    positionClassName: 'top-[38%] left-[49%]',
  },
  GroupFood: {
    icons: {
      default: <IconMinimapFoodDefault />,
      active: <IconMinimapFoodActive />,
      focus: <IconMinimapFoodFocus />,
      inactive: <IconMinimapFoodInactive />,
    },
    positionClassName: 'top-[38%] left-[34%]',
  },
  GroupBeverage: {
    icons: {
      default: <IconMinimapDrinkDefault />,
      active: <IconMinimapDrinkActive />,
      focus: <IconMinimapDrinkFocus />,
      inactive: <IconMinimapDrinkInactive />,
    },
    positionClassName: 'top-[38%] left-[42%]',
  },
  GroupToy: {
    icons: {
      default: <IconMinimapNoteDefault />,
      active: <IconMinimapNoteActive />,
      focus: <IconMinimapNoteFocus />,
      inactive: <IconMinimapNoteInactive />,
    },
    positionClassName: 'top-[67%] left-[38%]',
  },
  GroupSale: {
    icons: {
      default: <IconMinimapSaleDefault />,
      active: <IconMinimapSaleActive />,
      focus: <IconMinimapSaleFocus />,
      inactive: <IconMinimapSaleInactive />,
    },
    positionClassName: 'top-[38%] left-[64%]',
  },
  GroupApparel: {
    icons: {
      default: <IconMinimapClothesDefault />,
      active: <IconMinimapClothesActive />,
      focus: <IconMinimapClothesFocus />,
      inactive: <IconMinimapClothesInactive />,
    },
    positionClassName: 'top-[90%] left-[45%]',
  },
  GroupDrugstore: {
    icons: {
      default: <IconMinimapPharmacyDefault />,
      active: <IconMinimapPharmacyActive />,
      focus: <IconMinimapPharmacyFocus />,
      inactive: <IconMinimapPharmacyInactive />,
    },
    positionClassName: 'top-[38%] left-[21%]',
  },
  GroupElectronics: {
    icons: {
      default: <IconMinimapDigitalDefault />,
      active: <IconMinimapDigitalActive />,
      focus: <IconMinimapDigitalFocus />,
      inactive: <IconMinimapDigitalInactive />,
    },
    positionClassName: 'top-[67%] left-[48%]',
  },
};
