/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionChoiceOutcomeDto = {
  properties: {
    resultType: {
      type: 'Enum',
      isRequired: true,
    },
    events: {
      type: 'array',
      contains: {
        type: 'SessionEventDto',
      },
      isRequired: true,
    },
  },
} as const;
