/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HealthCheckDto } from '../models/HealthCheckDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AppService {
  /**
   * Hello World 메시지 반환
   * 기본 환영 메시지를 반환합니다.
   * @returns string 성공적으로 메시지를 반환
   * @throws ApiError
   */
  public static appControllerGetHello(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api',
    });
  }
  /**
   * 서버 상태 확인
   * 서버의 현재 상태와 타임스탬프를 반환합니다.
   * @returns HealthCheckDto 서버 상태 정보
   * @throws ApiError
   */
  public static appControllerGetHealth(): CancelablePromise<HealthCheckDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/health',
    });
  }
}
