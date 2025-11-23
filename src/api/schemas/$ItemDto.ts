/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ItemDto = {
  properties: {
    id: {
      type: 'number',
      description: `아이템 ID`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `아이템 이름`,
      isRequired: true,
    },
    image: {
      type: 'string',
      description: `아이템 이미지`,
      isRequired: true,
      isNullable: true,
    },
    capacityCost: {
      type: 'number',
      description: `가방 차지 용량`,
      isRequired: true,
    },
    isConsumable: {
      type: 'boolean',
      description: `소모성 아이템 여부`,
      isRequired: true,
      isNullable: true,
    },
    storeSectionId: {
      type: 'number',
      description: `상점 섹션 ID`,
      isRequired: true,
      isNullable: true,
    },
    isVisable: {
      type: 'boolean',
      description: `가방에서 보이는지 여부`,
      isRequired: true,
      isNullable: true,
    },
    positionX: {
      type: 'number',
      description: `X 좌표`,
      isRequired: true,
      isNullable: true,
    },
    positionY: {
      type: 'number',
      description: `Y 좌표`,
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
