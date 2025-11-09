/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateGameSessionResponseDto = {
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
  },
} as const;
