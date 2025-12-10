/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionReportCharacterDto = {
  properties: {
    characterCode: {
      type: 'string',
      description: `캐릭터 코드`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `캐릭터 이름`,
      isRequired: true,
    },
    finalHp: {
      type: 'number',
      description: `최종 HP`,
      isRequired: true,
    },
    finalMental: {
      type: 'number',
      description: `최종 Mental`,
      isRequired: true,
    },
    maxHp: {
      type: 'number',
      description: `최대 HP`,
    },
    maxMental: {
      type: 'number',
      description: `최대 Mental`,
    },
    survivalStatus: {
      type: 'string',
      description: `생존 상태 예: ALIVE/DEAD`,
      isRequired: true,
    },
  },
} as const;
