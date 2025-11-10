/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EventResponseDto = {
  properties: {
    id: {
      type: 'number',
      isRequired: true,
      format: 'int64',
    },
    actId: {
      type: 'number',
      isRequired: true,
      format: 'int64',
    },
    eventType: {
      type: 'Enum',
      isRequired: true,
    },
    order: {
      type: 'number',
      isRequired: true,
    },
    speakerId: {
      type: 'number',
    },
    script: {
      type: 'string',
      isRequired: true,
    },
    position: {
      type: 'string',
      isRequired: true,
    },
    emotion: {
      type: 'string',
      isRequired: true,
    },
    bgImage: {
      type: 'string',
      isRequired: true,
    },
  },
} as const;
