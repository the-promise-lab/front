// src/processes/game-flow/data/dayFlowData.ts
// DAY_FLOW 이벤트 데이터

import type { DayStep } from '../types';
import dayFlowDataJson from './dayFlowData.json';

// JSON 데이터 타입 정의
type PortraitData = {
  speaker: string;
  text: string;
};

type DayFlowDataItem = {
  id: number;
  title: string;
  descriptions: string[];
  image: string;
  portraits?: PortraitData[];
  options?: {
    text: string;
    value: string;
    statChanges?: {
      mentality?: number;
      hp?: number;
    };
  }[];
  candidateItems?: string[];
  changeStatsValue?: {
    success?: {
      mentality?: number;
      hp?: number;
    };
    fail?: {
      mentality?: number;
      hp?: number;
    };
  };
};

// JSON 데이터에서 특정 DAY_STEP에 해당하는 이벤트 찾기 (EVENT_RESULT_SCREEN 제외)
export const getEventDataByDayStep = (
  dayStep: Exclude<DayStep, 'EVENT_RESULT_SCREEN'>
): DayFlowDataItem | undefined => {
  return dayFlowDataJson.dayFlowData[dayStep] as DayFlowDataItem;
};

// JSON 데이터에서 모든 이벤트 가져오기
export const getAllDayFlowData = () => {
  return dayFlowDataJson.dayFlowData;
};
