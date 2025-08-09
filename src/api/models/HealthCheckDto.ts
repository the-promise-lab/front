/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HealthCheckDto = {
  /**
   * 서버 상태
   */
  status: HealthCheckDto.status;
  /**
   * 현재 시간 (ISO 8601 형식)
   */
  timestamp: string;
};
export namespace HealthCheckDto {
  /**
   * 서버 상태
   */
  export enum status {
    OK = 'OK',
    ERROR = 'ERROR',
  }
}
