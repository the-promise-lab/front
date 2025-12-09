/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionReportBagDto } from './SessionReportBagDto';
import type { SessionReportCharacterDto } from './SessionReportCharacterDto';
import type { SessionReportEndingDto } from './SessionReportEndingDto';
import type { SessionReportExperienceBreakdownDto } from './SessionReportExperienceBreakdownDto';
import type { SessionReportFinalStatsDto } from './SessionReportFinalStatsDto';
import type { SessionReportHiddenStatDto } from './SessionReportHiddenStatDto';
import type { SessionReportInventoryItemDto } from './SessionReportInventoryItemDto';
import type { SessionReportPointDto } from './SessionReportPointDto';
export type SessionReportResultDto = {
  ending: SessionReportEndingDto;
  finalStats: SessionReportFinalStatsDto;
  characters: Array<SessionReportCharacterDto>;
  hiddenStats: Array<SessionReportHiddenStatDto>;
  survivalBag: SessionReportBagDto;
  inventory?: Array<SessionReportInventoryItemDto>;
  points: Array<SessionReportPointDto>;
  experiencePoints: SessionReportExperienceBreakdownDto;
};
