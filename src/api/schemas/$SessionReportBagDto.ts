/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportBagDto = {
  properties: {
    bagId: {
      type: 'number',
      description: `가방 ID`,
      isRequired: true,
    },
    bagName: {
      type: 'string',
      description: `가방 이름`,
      isRequired: true,
    },
    capacity: {
      type: 'number',
      description: `가방 용량`,
      isRequired: true,
    },
    usedCapacity: {
      type: 'number',
      description: `사용 용량`,
    },
    usageRate: {
      type: 'number',
      description: `사용률(%)`,
    },
    grade: {
      type: 'string',
      description: `가방 등급`,
    },
    efficiency: {
      type: 'number',
      description: `가방 효율(%)`,
    },
    bagImageUrl: {
      type: 'string',
      description: `가방 이미지 URL`,
    },
    ownedItemCount: {
      type: 'number',
      description: `담은 아이템 개수`,
    },
    usedItemCount: {
      type: 'number',
      description: `실제 사용한 아이템 개수`,
    },
  },
} as const;
