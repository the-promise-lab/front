/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionEventDto = {
  properties: {
    eventId: {
      type: 'number',
      description: `이벤트 ID`,
      isRequired: true,
    },
    type: {
      type: 'Enum',
      isRequired: true,
    },
    script: {
      type: 'string',
      description: `대사/내레이션`,
    },
    characters: {
      type: 'array',
      contains: {
        type: 'SessionEventCharacterDto',
      },
      isRequired: true,
    },
    bgImage: {
      type: 'string',
      description: `배경 이미지`,
    },
    sceneEffect: {
      type: 'string',
      description: `장면 효과`,
    },
    bgm: {
      type: 'string',
      description: `배경음`,
    },
    bgmVolume: {
      type: 'number',
      description: `배경음 볼륨`,
    },
    se: {
      type: 'string',
      description: `효과음`,
    },
    seVolume: {
      type: 'number',
      description: `효과음 볼륨`,
    },
    seLoop: {
      type: 'boolean',
      description: `효과음 반복 여부`,
    },
    choice: {
      type: 'all-of',
      description: `선택지 정보`,
      contains: [
        {
          type: 'resolveSessionChoiceDto',
        },
      ],
    },
    effects: {
      type: 'array',
      contains: {
        type: 'SessionEventEffectDto',
      },
    },
    itemChanges: {
      type: 'array',
      contains: {
        type: 'SessionEventItemChangeDto',
      },
    },
    sessionEffects: {
      type: 'array',
      contains: {
        type: 'SessionEventSessionEffectDto',
      },
    },
  },
} as const;
