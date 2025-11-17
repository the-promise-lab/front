/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StoreSectionDto = {
  properties: {
    id: {
      type: 'number',
      isRequired: true,
    },
    name: {
      type: 'string',
      isRequired: true,
    },
    backgroundImage: {
      type: 'string',
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'ItemDto',
      },
      isRequired: true,
    },
  },
} as const;
