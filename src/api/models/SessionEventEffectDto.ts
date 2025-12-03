/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionEventEffectDto = {
  /**
   * Target character code
   */
  characterCode: string | null;
  /**
   * Affected stat type
   */
  effectType: string;
  /**
   * Delta applied to the stat
   */
  change: number | null;
  /**
   * Post-change value
   */
  newValue: number | null;
};
