/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameSessionDto = {
  properties: {
    id: {
      type: 'number',
      isRequired: true,
    },
    userId: {
      type: 'number',
      isRequired: true,
    },
    currentActId: {
      type: 'number',
      isRequired: true,
      isNullable: true,
    },
    createdAt: {
      type: 'string',
      isRequired: true,
      format: 'date-time',
    },
    playingCharacterSet: {
      type: 'all-of',
      contains: [
        {
          type: 'PlayingCharacterSetDto',
        },
      ],
      isRequired: true,
      isNullable: true,
    },
    inventory: {
      type: 'all-of',
      contains: [
        {
          type: 'InventoryDto',
        },
      ],
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
