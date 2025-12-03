/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $IntroResponseDto = {
  properties: {
    sessionId: {
      type: 'string',
      description: `Session ID`,
      isRequired: true,
    },
    introMode: {
      type: 'number',
      description: `Intro mode that was played`,
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
