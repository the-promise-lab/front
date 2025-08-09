/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $HealthCheckDto = {
  properties: {
    status: {
      type: 'Enum',
      isRequired: true,
    },
    timestamp: {
      type: 'string',
      description: `현재 시간 (ISO 8601 형식)`,
      isRequired: true,
      format: 'date-time',
    },
  },
} as const;
