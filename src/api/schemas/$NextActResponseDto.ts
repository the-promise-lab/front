/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NextActResponseDto = {
  properties: {
    sessionId: {
      type: 'string',
      description: `세션 ID`,
      isRequired: true,
    },
    status: {
      type: 'Enum',
      isRequired: true,
    },
    day: {
      type: 'all-of',
      description: `현재 Day 정보`,
      contains: [
        {
          type: 'SessionDayMetaDto',
        },
      ],
      isRequired: true,
      isNullable: true,
    },
    act: {
      type: 'all-of',
      description: `현재 Act 정보`,
      contains: [
        {
          type: 'SessionActMetaDto',
        },
      ],
      isRequired: true,
      isNullable: true,
    },
    playingCharacters: {
      type: 'array',
      contains: {
        type: 'PlayingCharacterStatusDto',
      },
      isRequired: true,
    },
    events: {
      type: 'array',
      contains: {
        type: 'SessionEventDto',
      },
      isRequired: true,
    },
    ending: {
      type: 'all-of',
      description: `엔딩 정보`,
      contains: [
        {
          type: 'SessionEndingMetaDto',
        },
      ],
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
