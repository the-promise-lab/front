/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionReportResultDto } from './SessionReportResultDto';
import type { SessionReportSessionMetaDto } from './SessionReportSessionMetaDto';
export type SessionReportDataDto = {
  session: SessionReportSessionMetaDto;
  tab: SessionReportDataDto.tab;
  result: SessionReportResultDto;
};
export namespace SessionReportDataDto {
  export enum tab {
    RESULT = 'result',
    RANKING = 'ranking',
    COLLECTION = 'collection',
    HISTORY = 'history',
  }
}
