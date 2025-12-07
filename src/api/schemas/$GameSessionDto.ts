/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameSessionDto = {
  properties: {
    id: {
      type: 'number',
      description: `게임 세션 ID`,
      isRequired: true,
    },
    userId: {
      type: 'number',
      description: `유저 ID`,
      isRequired: true,
    },
    bag: {
      type: 'all-of',
      description: `가방 정보`,
      contains: [
        {
          type: 'BagDto',
        },
      ],
      isRequired: true,
    },
    bagCapacityUsed: {
      type: 'number',
      description: `가방 사용량`,
      isRequired: true,
      isNullable: true,
    },
    bagConfirmedAt: {
      type: 'string',
      description: `가방 확정 시각`,
      isRequired: true,
      isNullable: true,
      format: 'date-time',
    },
    status: {
      type: 'string',
      description: `게임 세션 상태`,
      isRequired: true,
      isNullable: true,
    },
    lifePoint: {
      type: 'number',
      description: `생존 점수`,
      isRequired: true,
    },
    currentDayId: {
      type: 'number',
      description: `현재 날짜 ID`,
      isRequired: true,
      isNullable: true,
    },
    currentActId: {
      type: 'number',
      description: `현재 액트 ID`,
      isRequired: true,
      isNullable: true,
    },
    endingId: {
      type: 'number',
      description: `엔딩 ID`,
      isRequired: true,
      isNullable: true,
    },
    endedAt: {
      type: 'string',
      description: `게임 종료 시각`,
      isRequired: true,
      isNullable: true,
      format: 'date-time',
    },
    createdAt: {
      type: 'string',
      description: `생성 시각`,
      isRequired: true,
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      description: `수정 시각`,
      isRequired: true,
      format: 'date-time',
    },
    playingCharacterSet: {
      type: 'all-of',
      description: `플레이 중인 캐릭터 셋`,
      contains: [
        {
          type: 'PlayingCharacterSetDto',
        },
      ],
      isRequired: true,
      isNullable: true,
    },
    gameSessionInventory: {
      type: 'array',
      contains: {
        type: 'GameSessionInventoryDto',
      },
      isRequired: true,
    },
  },
} as const;
