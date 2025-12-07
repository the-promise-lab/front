/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $NextActUpdatesDto = {
  properties: {
    itemChanges: {
      type: 'array',
      contains: {
        type: 'NextActItemChangeDto',
      },
    },
    characterStatusChanges: {
      type: 'array',
      contains: {
        type: 'NextActCharacterStatusChangeDto',
      },
    },
    sessionStatChanges: {
      type: 'array',
      contains: {
        type: 'NextActSessionStatChangeDto',
      },
    },
  },
} as const;
