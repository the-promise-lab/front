/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SelectCharacterSetDto } from '../models/SelectCharacterSetDto';
import type { SubmitInventoryDto } from '../models/SubmitInventoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameService {
  /**
   * 게임 세션 조회
   * @returns any 게임 세션 조회 성공
   * @throws ApiError
   */
  public static gameControllerFindGameSession(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/game/session',
      errors: {
        404: `게임 세션을 찾을 수 없습니다.`,
      },
    });
  }
  /**
   * 게임 세션 생성
   * @returns any 게임 세션 생성 성공
   * @throws ApiError
   */
  public static gameControllerCreateGameSession(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/game/session',
      errors: {
        409: `이미 진행 중인 게임 세션이 존재합니다.`,
      },
    });
  }
  /**
   * 캐릭터 그룹 목록 조회
   * @returns any 캐릭터 그룹 목록 조회 성공
   * @throws ApiError
   */
  public static gameControllerGetCharacterGroups(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/game/character-groups',
    });
  }
  /**
   * 캐릭터 셋 선택
   * @param requestBody
   * @returns any 캐릭터 셋 선택 성공
   * @throws ApiError
   */
  public static gameControllerSelectCharacterSet(
    requestBody: SelectCharacterSetDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/game/session/character-set',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `리소스를 찾을 수 없습니다.`,
      },
    });
  }
  /**
   * 게임 설정 정보 조회
   * @returns any 게임 설정 정보 조회 성공
   * @throws ApiError
   */
  public static gameControllerGetSetupInfo(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/game/setup-info',
    });
  }
  /**
   * 인벤토리 제출
   * @param requestBody
   * @returns any 인벤토리 제출 성공
   * @throws ApiError
   */
  public static gameControllerSubmitInventory(
    requestBody: SubmitInventoryDto
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/game/session/inventory',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `게임 세션을 찾을 수 없습니다.`,
      },
    });
  }
}
