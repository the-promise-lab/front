/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PlayingCharacterStatusDto = {
  properties: {
    characterCode: {
      type: 'string',
      description: `캐릭터 코드`,
      isRequired: true,
    },
    characterId: {
      type: 'number',
      description: `캐릭터 ID`,
      isRequired: true,
    },
    currentHp: {
      type: 'number',
      description: `현재 HP`,
      isRequired: true,
    },
    currentMental: {
      type: 'number',
      description: `현재 멘탈`,
      isRequired: true,
    },
  },
} as const;
