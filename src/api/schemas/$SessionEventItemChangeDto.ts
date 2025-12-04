/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionEventItemChangeDto = {
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
      isNullable: true,
    },
    quantityChange: {
      type: 'number',
      description: `변동 수량`,
      isRequired: true,
    },
    newQuantity: {
      type: 'number',
      description: `변경 후 총량`,
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
