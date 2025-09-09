/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerGetProfile(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/auth/profile',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerKakaoLogin(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/auth/kakao',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerKakaoLoginCallback(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/auth/kakao/callback',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static authControllerLogout(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/logout',
    });
  }
}
