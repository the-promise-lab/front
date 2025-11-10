/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SelectCharacterSetResultDto = {
  properties: {
    id: {
      type: 'number',
      description: `플레이 중인 캐릭터 셋 ID`,
      isRequired: true,
    },
    gameSessionId: {
      type: 'number',
      description: `게임 세션 ID`,
      isRequired: true,
    },
    characterGroupId: {
      type: 'number',
      description: `캐릭터 그룹 ID`,
      isRequired: true,
    },
    playingCharacter: {
      type: 'array',
      contains: {
        type: 'PlayingCharacterDto',
      },
      isRequired: true,
    },
  },
} as const;
