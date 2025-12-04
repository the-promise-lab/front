/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionChoiceDto = {
  properties: {
    title: {
      type: 'string',
      description: `선택지 제목`,
      isRequired: true,
    },
    description: {
      type: 'string',
      description: `설명`,
    },
    thumbnail: {
      type: 'string',
      description: `선택지 썸네일`,
    },
    type: {
      type: 'Enum',
      isRequired: true,
    },
    options: {
      type: 'array',
      contains: {
        type: 'SessionChoiceOptionDto',
      },
      isRequired: true,
    },
    fallback: {
      type: 'all-of',
      description: `아이템 미보유 시 기본 선택`,
      contains: [
        {
          type: 'SessionChoiceFallbackDto',
        },
      ],
    },
    outcomes: {
      type: 'dictionary',
      contains: {
        type: 'SessionChoiceOutcomeDto',
      },
    },
  },
} as const;
