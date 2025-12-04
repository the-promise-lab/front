/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionEventSessionEffectDto = {
  properties: {
    effectType: {
      type: 'string',
      description: `세션 통계 종류`,
      isRequired: true,
    },
    change: {
      type: 'number',
      description: `변동 값`,
      isRequired: true,
    },
    newValue: {
      type: 'number',
      description: `변경 후 값`,
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
