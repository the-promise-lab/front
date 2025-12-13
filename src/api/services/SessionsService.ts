/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EndingCollectionResponseDto } from '../models/EndingCollectionResponseDto';
import type { HistoryResponseDto } from '../models/HistoryResponseDto';
import type { IntroRequestDto } from '../models/IntroRequestDto';
import type { IntroResponseDto } from '../models/IntroResponseDto';
import type { NextActRequestDto } from '../models/NextActRequestDto';
import type { NextActResponseDto } from '../models/NextActResponseDto';
import type { RankingResponseDto } from '../models/RankingResponseDto';
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
   * @returns SessionReportResponseDto 결과 보고서
   * @throws ApiError
   */
  public static sessionsControllerGetSessionReport(
    sessionId: string
  ): CancelablePromise<SessionReportResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/sessions/{sessionId}/report',
      path: {
        sessionId: sessionId,
      },
    });
  }
  /**
   * 랭킹 및 결과 요약 조회
   * 사용자의 누적 랭킹 정보와 캐릭터 그룹별 최고 기록을 반환합니다.
   * @returns RankingResponseDto 랭킹 및 결과 요약
   * @throws ApiError
   */
  public static sessionsControllerGetRankingSummary(): CancelablePromise<RankingResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/sessions/ranking/summary',
    });
  }
  /**
   * 엔딩 수집 현황 조회
   * 캐릭터 그룹별 엔딩 수집 리스트를 반환합니다.
   * @returns EndingCollectionResponseDto 엔딩 수집 리스트
   * @throws ApiError
   */
  public static sessionsControllerGetEndingCollection(): CancelablePromise<EndingCollectionResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/sessions/collections',
    });
  }
  /**
   * 게임 히스토리 조회
   * 사용자의 게임 플레이 히스토리 목록을 반환합니다.
   * @param page 페이지 번호
   * @param limit 페이지 당 개수 (기본값: 10 - 전체 조회에 가깝게 설정됨)
   * @returns HistoryResponseDto 게임 히스토리 목록
   * @throws ApiError
   */
  public static sessionsControllerGetHistory(
    page: number = 1,
    limit: number = 10
  ): CancelablePromise<HistoryResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/sessions/history',
      query: {
        page: page,
        limit: limit,
      },
    });
  }
}
