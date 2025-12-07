/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NextActCharacterStatusChangeDto = {
  properties: {
    characterCode: {
      type: 'string',
      description: `캐릭터 코드`,
      isRequired: true,
    },
    hpChange: {
      type: 'number',
      description: `HP 변화량`,
      isRequired: true,
    },
    mentalChange: {
      type: 'number',
      description: `Mental 변화량`,
      isRequired: true,
    },
  },
} as const;
