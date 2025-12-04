/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionChoiceOptionDto = {
  properties: {
    choiceOptionId: {
      type: 'number',
      description: `선택지 ID`,
      isRequired: true,
    },
    text: {
      type: 'string',
      description: `선택지 문구`,
      isRequired: true,
    },
    itemCategoryId: {
      type: 'number',
      description: `요구 아이템 카테고리`,
      isRequired: true,
      isNullable: true,
    },
    itemId: {
      type: 'number',
      description: `사용될 아이템 ID`,
      isRequired: true,
      isNullable: true,
    },
    itemName: {
      type: 'string',
      description: `아이템 이름`,
      isRequired: true,
      isNullable: true,
    },
    itemImage: {
      type: 'string',
      description: `아이템 이미지 파일명`,
      isRequired: true,
      isNullable: true,
    },
    quantity: {
      type: 'number',
      description: `소모 수량`,
      isRequired: true,
      isNullable: true,
    },
    isSelectable: {
      type: 'boolean',
      description: `선택 가능 여부`,
      isRequired: true,
    },
  },
} as const;
