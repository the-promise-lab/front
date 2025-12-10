/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportHiddenStatDto = {
  properties: {
    statCode: {
      type: 'string',
      description: `히든 스탯 코드`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `히든 스탯 이름`,
      isRequired: true,
    },
    value: {
      type: 'number',
      description: `값`,
      isRequired: true,
    },
    maxValue: {
      type: 'number',
      description: `최대값`,
      isRequired: true,
    },
    grade: {
      type: 'string',
      description: `등급`,
      isRequired: true,
    },
    description: {
      type: 'string',
      description: `설명`,
    },
  },
} as const;
