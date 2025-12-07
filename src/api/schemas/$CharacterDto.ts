/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CharacterDto = {
  properties: {
    id: {
      type: 'number',
      description: `캐릭터 ID`,
      isRequired: true,
    },
    code: {
      type: 'string',
      description: `캐릭터 코드`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `캐릭터 이름`,
      isNullable: true,
    },
    age: {
      type: 'number',
      description: `캐릭터 나이`,
      isNullable: true,
    },
    description: {
      type: 'string',
      description: `캐릭터 설명`,
      isNullable: true,
    },
    selectImage: {
      type: 'string',
      description: `캐릭터 선택 이미지`,
      isNullable: true,
    },
    portraitImage: {
      type: 'string',
      description: `캐릭터 포트레잇 이미지`,
      isNullable: true,
    },
    defaultHp: {
      type: 'number',
      description: `기본 체력`,
      isNullable: true,
    },
    defaultMental: {
      type: 'number',
      description: `기본 정신력`,
      isNullable: true,
    },
    bgColor: {
      type: 'string',
      description: `배경 색상`,
      isNullable: true,
    },
    borderColor: {
      type: 'string',
      description: `테두리 색상`,
      isNullable: true,
    },
  },
} as const;
