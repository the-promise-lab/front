/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NextActChoicePayloadDto = {
  properties: {
    choiceOptionId: {
      type: 'number',
      description: `선택한 옵션 ID`,
      isRequired: true,
    },
    chosenItemId: {
      type: 'number',
      description: `아이템 선택지에서 소비한 아이템 ID`,
    },
  },
} as const;
