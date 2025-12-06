/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionEventCharacterDto = {
  properties: {
    characterCode: {
      type: 'string',
      description: `Character code`,
      isRequired: true,
    },
    position: {
      type: 'string',
      description: `Placement on the stage`,
      isRequired: true,
      isNullable: true,
    },
    emotion: {
      type: 'string',
      description: `Emotion preset`,
      isRequired: true,
      isNullable: true,
    },
    imageUrl: {
      type: 'string',
      description: `Emotion image URL`,
      isRequired: true,
      isNullable: true,
    },
    isSpeaker: {
      type: 'boolean',
      description: `Speaks in this line`,
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
