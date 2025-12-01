/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type NextActSessionStatChangeDto = {
  /**
   * 세션 스탯 타입
   */
  statType: NextActSessionStatChangeDto.statType;
  /**
   * 변화량
   */
  change: number;
};
export namespace NextActSessionStatChangeDto {
  /**
   * 세션 스탯 타입
   */
  export enum statType {
    LIFE_POINT = 'LifePoint',
  }
}
