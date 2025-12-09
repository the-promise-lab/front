/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportResultDto = {
  properties: {
    ending: {
      type: 'SessionReportEndingDto',
      isRequired: true,
    },
    finalStats: {
      type: 'SessionReportFinalStatsDto',
      isRequired: true,
    },
    characters: {
      type: 'array',
      contains: {
        type: 'SessionReportCharacterDto',
      },
      isRequired: true,
    },
    hiddenStats: {
      type: 'array',
      contains: {
        type: 'SessionReportHiddenStatDto',
      },
      isRequired: true,
    },
    survivalBag: {
      type: 'SessionReportBagDto',
      isRequired: true,
    },
    inventory: {
      type: 'array',
      contains: {
        type: 'SessionReportInventoryItemDto',
      },
    },
    points: {
      type: 'array',
      contains: {
        type: 'SessionReportPointDto',
      },
      isRequired: true,
    },
    experiencePoints: {
      type: 'SessionReportExperienceBreakdownDto',
      isRequired: true,
    },
  },
} as const;
