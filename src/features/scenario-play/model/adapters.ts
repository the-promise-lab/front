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

/**
 * choice DTO를 ScenarioChoice 도메인 타입으로 변환
 * @api 레이어 DTO는 건드리지 않고 as unknown을 통해 소극적으로 변환
 */
function adaptChoice(dto: resolveSessionChoiceDto): ScenarioChoice | null {
  // DTO가 빈 객체인 경우 (codegen 문제로 빈 타입일 때)
  if (!dto || Object.keys(dto).length === 0) {
    return null;
  }

  // as unknown을 통해 실제 서버 응답 구조로 접근
  const raw = dto as unknown as {
    title?: string;
    description?: string;
    thumbnail?: string | null;
    type?: 'StoryChoice' | 'ItemChoice';
    options?: Array<{
      choiceOptionId: number;
      text: string;
      itemCategoryId?: number | null;
      itemId?: number | null;
      itemName?: string | null;
      itemImage?: string | null;
      quantity?: number | null;
      isSelectable?: boolean;
    }>;
    fallback?: {
      choiceOptionId: number;
      text: string;
    } | null;
    outcomes?: Record<
      string,
      {
        resultType: string;
        events: SessionEventDto[];
      }
    > | null;
  };

  // 필수 필드가 없으면 null 반환
  if (!raw.title || !raw.type || !raw.options) {
    return null;
  }

  // options 변환
  const options: ScenarioChoiceOption[] = raw.options.map(opt => ({
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
  const fallback: ScenarioChoiceFallback | null = raw.fallback
    ? {
        choiceOptionId: raw.fallback.choiceOptionId,
        text: raw.fallback.text,
      }
    : null;

  // outcomes 변환 (events 내부도 adaptScenarioEvent로 변환)
  const outcomes: Record<string, ScenarioChoiceOutcome> | null = raw.outcomes
    ? Object.fromEntries(
        Object.entries(raw.outcomes).map(([key, value]) => [
          key,
          {
            resultType: value.resultType,
            events: value.events.map(adaptScenarioEvent),
          },
        ])
      )
    : null;

  return {
    title: raw.title,
    description: raw.description ?? '',
    thumbnail: raw.thumbnail ?? null,
    type: raw.type,
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
