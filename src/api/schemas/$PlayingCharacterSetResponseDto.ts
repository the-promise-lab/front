/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PlayingCharacterSetResponseDto = {
  properties: {
    id: {
      type: 'number',
      isRequired: true,
    },
    characterGroupId: {
      type: 'number',
      isRequired: true,
    },
    playingCharacter: {
      type: 'array',
      contains: {
        type: 'PlayingCharacterResponseDto',
      },
      isRequired: true,
    },
  },
} as const;
