/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CharacterDto = {
  properties: {
    id: {
      type: 'number',
      isRequired: true,
      format: 'int64',
    },
    name: {
      type: 'string',
      isNullable: true,
    },
    age: {
      type: 'number',
      isNullable: true,
    },
    description: {
      type: 'string',
      isNullable: true,
    },
    selectImage: {
      type: 'string',
      isNullable: true,
    },
    potraitImage: {
      type: 'string',
      isNullable: true,
    },
    defaultHp: {
      type: 'number',
      isNullable: true,
    },
    defaultSp: {
      type: 'number',
      isNullable: true,
    },
    characterGroupId: {
      type: 'number',
      isNullable: true,
      format: 'int64',
    },
    bgColor: {
      type: 'string',
      isNullable: true,
    },
    borderColor: {
      type: 'string',
      isNullable: true,
    },
  },
} as const;
