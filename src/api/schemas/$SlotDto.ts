/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SlotDto = {
  properties: {
    id: {
      type: 'number',
      description: `슬롯 ID`,
      isRequired: true,
    },
    invId: {
      type: 'number',
      description: `인벤토리 ID`,
    },
    item: {
      type: 'all-of',
      description: `아이템 정보`,
      contains: [
        {
          type: 'ItemDto',
        },
      ],
      isRequired: true,
    },
    quantity: {
      type: 'number',
      description: `수량`,
      isRequired: true,
    },
  },
} as const;
