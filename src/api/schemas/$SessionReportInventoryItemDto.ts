/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportInventoryItemDto = {
  properties: {
    itemId: {
      type: 'number',
      description: `아이템 ID`,
      isRequired: true,
    },
    itemName: {
      type: 'string',
      description: `아이템 이름`,
      isRequired: true,
    },
    quantity: {
      type: 'number',
      description: `남은 수량`,
      isRequired: true,
    },
  },
} as const;
