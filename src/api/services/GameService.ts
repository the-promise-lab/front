/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharacterGroupDto } from '../models/CharacterGroupDto';
import type { CreateGameSessionDto } from '../models/CreateGameSessionDto';
import type { GameSessionDto } from '../models/GameSessionDto';
import type { SelectCharacterSetDto } from '../models/SelectCharacterSetDto';
import type { SelectCharacterSetResultDto } from '../models/SelectCharacterSetResultDto';
import type { SetupInfoDto } from '../models/SetupInfoDto';
import type { SubmitInventoryDto } from '../models/SubmitInventoryDto';
import type { SubmitInventoryResultDto } from '../models/SubmitInventoryResultDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GameService {
  /**
   * 게임 세션 조회
   * @returns GameSessionDto 게임 세션 조회 성공
   * @throws ApiError
   */
  public static gameControllerFindGameSession(): CancelablePromise<GameSessionDto> {
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
   * @returns CreateGameSessionDto 게임 세션 생성 성공
   * @throws ApiError
   */
  public static gameControllerCreateGameSession(): CancelablePromise<CreateGameSessionDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/game/session',
    });
  }
  /**
   * 캐릭터 그룹 목록 조회
   * @returns CharacterGroupDto 캐릭터 그룹 목록 조회 성공
   * @throws ApiError
   */
  public static gameControllerGetCharacterGroups(): CancelablePromise<
    Array<CharacterGroupDto>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/game/character-groups',
    });
  }
  /**
   * 캐릭터 셋 선택
   * @param requestBody
   * @returns SelectCharacterSetResultDto 캐릭터 셋 선택 성공
   * @throws ApiError
   */
  public static gameControllerSelectCharacterSet(
    requestBody: SelectCharacterSetDto
  ): CancelablePromise<SelectCharacterSetResultDto> {
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
   * @returns SetupInfoDto 게임 설정 정보 조회 성공
   * @throws ApiError
   */
  public static gameControllerGetSetupInfo(): CancelablePromise<SetupInfoDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/game/setup-info',
    });
  }
  /**
   * 인벤토리 제출
   * @param requestBody
   * @returns SubmitInventoryResultDto 인벤토리 제출 성공
   * @throws ApiError
   */
  public static gameControllerSubmitInventory(
    requestBody: SubmitInventoryDto
  ): CancelablePromise<SubmitInventoryResultDto> {
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
