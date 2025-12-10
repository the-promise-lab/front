/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportPointDto = {
  properties: {
    type: {
      type: 'string',
      description: `GOOD/BAD 등 포인트 유형`,
      isRequired: true,
    },
    category: {
      type: 'string',
      description: `카테고리`,
      isRequired: true,
    },
    title: {
      type: 'string',
      description: `제목`,
      isRequired: true,
    },
    description: {
      type: 'string',
      description: `설명`,
      isRequired: true,
    },
    dayNumber: {
      type: 'number',
      description: `Day 번호`,
    },
    actId: {
      type: 'number',
      description: `Act ID`,
    },
    points: {
      type: 'number',
      description: `점수`,
      isRequired: true,
    },
  },
} as const;
