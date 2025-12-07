/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CharacterGroupDto = {
  properties: {
    id: {
      type: 'number',
      description: `캐릭터 그룹 ID`,
      isRequired: true,
    },
    code: {
      type: 'string',
      description: `캐릭터 그룹 코드`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `캐릭터 그룹 이름`,
      isRequired: true,
    },
    groupSelectImage: {
      type: 'string',
      description: `캐릭터 그룹 선택 이미지`,
      isRequired: true,
    },
    deathEndingIndex: {
      type: 'number',
      description: `서든데스 엔딩 인덱스`,
      isRequired: true,
      isNullable: true,
    },
    prologActId: {
      type: 'number',
      description: `프롤로그 ID`,
      isRequired: true,
      isNullable: true,
    },
    description: {
      type: 'string',
      description: `캐릭터 그룹 설명`,
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
