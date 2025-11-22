/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameSessionInventoryDto = {
  properties: {
    sessionId: {
      type: 'number',
      description: `게임 세션 ID`,
      isRequired: true,
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
