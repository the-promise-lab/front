/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RankingCharacterResultDto = {
  properties: {
    characterGroupName: {
      type: 'string',
      description: `캐릭터 그룹 이름`,
    },
    characterNames: {
      type: 'string',
      description: `캐릭터 이름(들)`,
      isRequired: true,
    },
    result: {
      type: 'string',
      description: `결과 텍스트 (엔딩 제목 등)`,
      isRequired: true,
    },
    grade: {
      type: 'string',
      description: `엔딩 등급`,
    },
    imageUrl: {
      type: 'string',
      description: `결과 이미지 URL`,
    },
  },
} as const;
