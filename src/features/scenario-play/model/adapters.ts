import {
  type NextActRequestDto,
  type NextActUpdatesDto,
  type SessionChoiceDto,
  NextActResponseDto,
  SessionEventDto,
} from '@api';
import { getCharacterDetailByCode } from '@entities/character-data';

import type {
  ScenarioActBundle,
  ScenarioEvent,
  ScenarioEventType,
  ScenarioStatus,
  ScenarioChoice,
  ScenarioChoiceOption,
  ScenarioChoiceFallback,
  ScenarioChoiceOutcome,
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
    characters: dto.characters.map(c => ({
      ...c,
      characterDetail: getCharacterDetailByCode(c.characterCode),
    })),
    bgImage: dto.bgImage,
    sceneEffect: dto.sceneEffect,
    bgm: dto.bgm,
    bgmVolume: dto.bgmVolume,
    se: dto.se,
    seVolume: dto.seVolume,
    seLoop: dto.seLoop,
    choice: dto.choice ? adaptChoice(dto.choice) : undefined,
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

/**
 * SessionChoiceDto를 ScenarioChoice 도메인 타입으로 변환
 */
function adaptChoice(dto: SessionChoiceDto): ScenarioChoice {
  // options 변환
  const options: ScenarioChoiceOption[] = dto.options.map(opt => ({
    choiceOptionId: opt.choiceOptionId,
    text: opt.text,
    itemCategoryId: opt.itemCategoryId,
    itemId: opt.itemId,
    itemName: opt.itemName,
    itemImage: opt.itemImage,
    quantity: opt.quantity,
    isSelectable: opt.isSelectable,
  }));

  // fallback 변환
  const fallback: ScenarioChoiceFallback | null = dto.fallback
    ? {
        choiceOptionId: dto.fallback.choiceOptionId,
        text: dto.fallback.text,
      }
    : null;

  // outcomes 변환 (events 내부도 adaptScenarioEvent로 변환)
  const outcomes: Record<string, ScenarioChoiceOutcome> | null = dto.outcomes
    ? Object.fromEntries(
        Object.entries(dto.outcomes).map(([key, value]) => [
          key,
          {
            resultType: value.resultType,
            events: value.events.map(adaptScenarioEvent),
          },
        ])
      )
    : null;

  return {
    title: dto.title,
    description: dto.description ?? '',
    thumbnail: dto.thumbnail ?? null,
    type: dto.type,
    options,
    fallback,
    outcomes,
  };
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
