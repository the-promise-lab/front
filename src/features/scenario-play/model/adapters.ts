import {
  type NextActRequestDto,
  type NextActUpdatesDto,
  type resolveSessionChoiceDto,
  NextActResponseDto,
  SessionEventDto,
} from '@api';

import type {
  ScenarioActBundle,
  ScenarioEvent,
  ScenarioEventType,
  ScenarioStatus,
  ScenarioChoice,
  SubmitChoiceParams,
} from './types';

export function adaptNextActResponse(
  dto: NextActResponseDto
): ScenarioActBundle {
  return {
    sessionId: dto.sessionId,
    status: adaptStatus(dto.status),
    day: dto.day ? { ...dto.day } : null,
    act: dto.act ? { ...dto.act } : null,
    events: dto.events.map(adaptScenarioEvent),
    ending: dto.ending ? { ...dto.ending } : null,
  };
}

function adaptStatus(status: NextActResponseDto.status): ScenarioStatus {
  const statusMap: Record<NextActResponseDto.status, ScenarioStatus> = {
    [NextActResponseDto.status.IN_PROGRESS]: 'IN_PROGRESS',
    [NextActResponseDto.status.DAY_END]: 'DAY_END',
    [NextActResponseDto.status.GAME_END]: 'GAME_END',
    [NextActResponseDto.status.GAME_OVER]: 'GAME_OVER',
    [NextActResponseDto.status.SUDDEN_DEATH]: 'SUDDEN_DEATH',
  };
  return statusMap[status];
}

export function adaptScenarioEvent(dto: SessionEventDto): ScenarioEvent {
  return {
    eventId: dto.eventId,
    type: adaptEventType(dto.type),
    script: dto.script,
    characters: dto.characters,
    bgImage: dto.bgImage,
    sceneEffect: dto.sceneEffect,
    bgm: dto.bgm,
    bgmVolume: dto.bgmVolume,
    se: dto.se,
    seVolume: dto.seVolume,
    seLoop: dto.seLoop,
    choice: dto.choice ? (adaptChoice(dto.choice) ?? undefined) : undefined,
    effects: dto.effects,
    itemChanges: dto.itemChanges,
    sessionEffects: dto.sessionEffects,
  };
}

/**
 * 서버 event type enum → 도메인 ScenarioEventType 변환
 */
function adaptEventType(type: SessionEventDto.type): ScenarioEventType {
  const typeMap: Record<SessionEventDto.type, ScenarioEventType> = {
    [SessionEventDto.type.SIMPLE]: 'Simple',
    [SessionEventDto.type.STORY_CHOICE]: 'StoryChoice',
    [SessionEventDto.type.ITEM_CHOICE]: 'ItemChoice',
    [SessionEventDto.type.STATUS]: 'Status',
    [SessionEventDto.type.SYSTEM]: 'System',
  };
  return typeMap[type];
}

function adaptChoice(_dto: resolveSessionChoiceDto): ScenarioChoice | null {
  // TODO: 서버 codegen 수정 후 구현
  // choice 구조: { title, description, thumbnail, type, options, fallback, outcomes }
  return null;
}

export function adaptChoiceToRequest(
  params: SubmitChoiceParams
): NextActRequestDto {
  return {
    lastActId: params.lastActId,
    choice: {
      choiceOptionId: params.choice.optionId,
      chosenItemId: params.choice.itemId,
    },
    updates: params.updates as NextActUpdatesDto | undefined,
  };
}
