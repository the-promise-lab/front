/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NextActRequestDto = {
  properties: {
    lastActId: {
      type: 'number',
      description: `직전 Act ID`,
    },
    choice: {
      type: 'all-of',
      description: `선택지 보고 (선택지를 보여준 경우에만 전송)`,
      contains: [
        {
          type: 'NextActChoicePayloadDto',
        },
      ],
    },
    updates: {
      type: 'all-of',
      description: `프론트 처리 업데이트(인벤토리/스탯 변화 보고)`,
      contains: [
        {
          type: 'NextActUpdatesDto',
        },
      ],
    },
  },
} as const;
