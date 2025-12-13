/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $HistoryItemDto = {
  properties: {
    id: {
      type: 'string',
      description: `세션 ID`,
      isRequired: true,
    },
    characterName: {
      type: 'string',
      description: `캐릭터 이름(들)`,
      isRequired: true,
    },
    resultType: {
      type: 'string',
      description: `최종 결과 (등급)`,
      isRequired: true,
    },
    xp: {
      type: 'number',
      description: `XP 총합`,
      isRequired: true,
    },
    date: {
      type: 'string',
      description: `종료 날짜`,
      isRequired: true,
    },
    time: {
      type: 'string',
      description: `종료 시간`,
      isRequired: true,
    },
    characterImageUrl: {
      type: 'string',
      description: `캐릭터 구성 이미지 (또는 엔딩 이미지)`,
    },
    playReport: {
      type: 'all-of',
      description: `히스토리 상세 (리포트 데이터). 목록 조회 시에는 제외될 수 있음.`,
      contains: [
        {
          type: 'SessionReportResponseDto',
        },
      ],
    },
  },
} as const;
