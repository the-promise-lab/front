/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IntroRequestDto } from '../models/IntroRequestDto';
import type { IntroResponseDto } from '../models/IntroResponseDto';
import type { NextActRequestDto } from '../models/NextActRequestDto';
import type { NextActResponseDto } from '../models/NextActResponseDto';
import type { SessionReportResponseDto } from '../models/SessionReportResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SessionsService {
  /**
   * Intro 이벤트 조회
   * 캐릭터 그룹과 introMode에 맞는 Simple/System 이벤트 시퀀스를 반환합니다.
   * @param requestBody
   * @returns IntroResponseDto Intro 이벤트 번들
   * @throws ApiError
   */
  public static sessionsControllerPlayIntro(
    requestBody: IntroRequestDto
  ): CancelablePromise<IntroResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/sessions/intro',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Act 진행
   * 현재 세션 기준으로 다음 Act를 진행합니다. 직전 Act 결과를 보고한 뒤, 다음 Act 이벤트 번들을 반환합니다. 빈 객체를 보내면 현재 Act 번들을 불러옵니다.
   * @param requestBody
   * @returns NextActResponseDto 다음 Act 이벤트 번들
   * @throws ApiError
   */
  public static sessionsControllerExecuteNextAct(
    requestBody: NextActRequestDto
  ): CancelablePromise<NextActResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/sessions/active/next',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * 결과 보고서 조회
   * C001 결과 리포트 탭 데이터를 반환합니다.
   * @param sessionId
   * @param tab Report tab to fetch. Defaults to result.
   * @param includeInventory Include inventory details for result tab.
   * @returns SessionReportResponseDto 결과 보고서
   * @throws ApiError
   */
  public static sessionsControllerGetSessionReport(
    sessionId: string,
    tab: 'result' | 'ranking' | 'collection' | 'history' = 'result',
    includeInventory: boolean = true
  ): CancelablePromise<SessionReportResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/sessions/{sessionId}/report',
      path: {
        sessionId: sessionId,
      },
      query: {
        tab: tab,
        includeInventory: includeInventory,
      },
    });
  }
}
