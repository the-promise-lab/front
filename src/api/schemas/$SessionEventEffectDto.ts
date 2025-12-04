/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionEventEffectDto = {
  properties: {
    characterCode: {
      type: 'string',
      description: `Target character code`,
      isRequired: true,
      isNullable: true,
    },
    effectType: {
      type: 'string',
      description: `Affected stat type`,
      isRequired: true,
    },
    change: {
      type: 'number',
      description: `Delta applied to the stat`,
      isRequired: true,
      isNullable: true,
    },
    newValue: {
      type: 'number',
      description: `Post-change value`,
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
