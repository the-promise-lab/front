/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NextActSessionStatChangeDto = {
  properties: {
    statType: {
      type: 'Enum',
      isRequired: true,
    },
    change: {
      type: 'number',
      description: `변화량`,
      isRequired: true,
    },
  },
} as const;
