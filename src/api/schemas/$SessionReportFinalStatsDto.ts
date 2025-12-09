/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportFinalStatsDto = {
  properties: {
    lifePoint: {
      type: 'number',
      description: `LifePoint 최종값`,
      isRequired: true,
    },
    survivalDays: {
      type: 'number',
      description: `생존 일수`,
    },
    totalChoices: {
      type: 'number',
      description: `총 선택 횟수`,
    },
    goodChoices: {
      type: 'number',
      description: `GOOD 선택 수`,
    },
    badChoices: {
      type: 'number',
      description: `BAD 선택 수`,
    },
    neutralChoices: {
      type: 'number',
      description: `Neutral 선택 수`,
    },
  },
} as const;
