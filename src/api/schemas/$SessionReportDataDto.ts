/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportDataDto = {
  properties: {
    session: {
      type: 'SessionReportSessionMetaDto',
      isRequired: true,
    },
    tab: {
      type: 'Enum',
      isRequired: true,
    },
    result: {
      type: 'SessionReportResultDto',
      isRequired: true,
    },
  },
} as const;
