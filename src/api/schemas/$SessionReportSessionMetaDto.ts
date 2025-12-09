/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportSessionMetaDto = {
  properties: {
    id: {
      type: 'number',
      description: `게임 세션 ID`,
      isRequired: true,
    },
    userName: {
      type: 'string',
      description: `사용자 이름(카카오 로그인명)`,
      isRequired: true,
    },
    characterGroupCode: {
      type: 'string',
      description: `캐릭터 그룹 코드`,
    },
    characterGroupName: {
      type: 'string',
      description: `캐릭터 그룹 이름`,
    },
    status: {
      type: 'string',
      description: `세션 상태`,
      isRequired: true,
    },
    endedAt: {
      type: 'string',
      description: `종료 시각`,
      format: 'date-time',
    },
    createdAt: {
      type: 'string',
      description: `생성 시각`,
      isRequired: true,
      format: 'date-time',
    },
    totalPlayTimeSeconds: {
      type: 'number',
      description: `총 플레이 시간(초)`,
    },
    lifePoint: {
      type: 'number',
      description: `LifePoint 최종값`,
      isRequired: true,
    },
  },
} as const;
