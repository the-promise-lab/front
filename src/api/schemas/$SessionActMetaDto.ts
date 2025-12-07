/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionActMetaDto = {
  properties: {
    id: {
      type: 'number',
      description: `Act ID`,
      isRequired: true,
    },
    sequenceNumber: {
      type: 'number',
      description: `Act sequence number`,
      isRequired: true,
    },
    title: {
      type: 'string',
      description: `Act 제목`,
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
