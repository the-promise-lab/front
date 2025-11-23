/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PlayingCharacterDto = {
  properties: {
    id: {
      type: 'number',
      description: `플레이 중인 캐릭터 ID`,
      isRequired: true,
    },
    playingCharacterSetId: {
      type: 'number',
      description: `플레이 중인 캐릭터 셋 ID`,
      isRequired: true,
    },
    characterId: {
      type: 'number',
      description: `캐릭터 ID`,
      isRequired: true,
    },
    character: {
      type: 'CharacterDto',
      isRequired: true,
    },
    currentHp: {
      type: 'number',
      description: `현재 체력`,
      isRequired: true,
    },
    currentMental: {
      type: 'number',
      description: `현재 정신력`,
      isRequired: true,
    },
  },
} as const;
