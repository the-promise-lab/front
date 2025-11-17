/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubmitInventoryDto = {
  properties: {
    bagId: {
      type: 'number',
      description: `가방 ID`,
      isRequired: true,
    },
    slots: {
      type: 'array',
      contains: {
        type: 'CreateSlotDto',
      },
      isRequired: true,
    },
  },
} as const;
