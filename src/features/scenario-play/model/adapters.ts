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
  ScenarioEffect,
  ScenarioItemChange,
  ScenarioSessionEffect,
} from './types';

export function adaptNextActResponse(
  dto: NextActResponseDto
): ScenarioActBundle {
  return {
    sessionId: dto.sessionId,
    status: adaptStatus(dto.status),
    day: dto.day ? { ...dto.day } : null,
    act: dto.act ? { ...dto.act } : null,
    playingCharacters: dto.playingCharacters,
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

/**
 * outcome에서 발생한 effects를 서버 요청용 updates로 변환
 */
export function adaptOutcomeEffectsToUpdates(params: {
  characterEffects: ScenarioEffect[];
  itemChanges: ScenarioItemChange[];
  sessionEffects: ScenarioSessionEffect[];
  usedItemId?: number; // ItemChoice에서 사용한 아이템
}): SubmitChoiceParams['updates'] {
  const { characterEffects, itemChanges, sessionEffects, usedItemId } = params;

  // 1. characterEffects를 characterCode별로 그룹화하여 누적
  const characterMap = new Map<
    string,
    { hpChange: number; mentalChange: number }
  >();

  characterEffects.forEach(effect => {
    if (!effect.characterCode) return;

    const existing = characterMap.get(effect.characterCode) || {
      hpChange: 0,
      mentalChange: 0,
    };

    if (effect.effectType === 'health') {
      existing.hpChange += effect.change ?? 0;
    } else if (effect.effectType === 'mental') {
      existing.mentalChange += effect.change ?? 0;
    }

    characterMap.set(effect.characterCode, existing);
  });

  const characterStatusChanges = Array.from(characterMap.entries()).map(
    ([code, changes]) => ({
      characterCode: code,
      hpChange: changes.hpChange,
      mentalChange: changes.mentalChange,
    })
  );

  // 2. itemChanges 변환 + 사용한 아이템 추가
  const itemChangesList = itemChanges.map(ic => ({
    itemId: ic.itemId,
    quantityChange: ic.quantityChange,
  }));

  // ItemChoice에서 아이템을 사용한 경우 -1 추가
  if (usedItemId !== undefined) {
    // 이미 같은 itemId가 있는지 확인
    const existingItemChange = itemChangesList.find(
      ic => ic.itemId === usedItemId
    );

    if (existingItemChange) {
      // 이미 있으면 누적
      existingItemChange.quantityChange -= 1;
    } else {
      // 없으면 새로 추가
      itemChangesList.push({
        itemId: usedItemId,
        quantityChange: -1,
      });
    }
  }

  // 3. sessionEffects 변환
  const sessionStatChanges = sessionEffects.map(se => ({
    statType: 'LifePoint' as const,
    change: se.change,
  }));

  // 비어있으면 undefined 반환
  if (
    characterStatusChanges.length === 0 &&
    itemChangesList.length === 0 &&
    sessionStatChanges.length === 0
  ) {
    return undefined;
  }

  return {
    characterStatusChanges:
      characterStatusChanges.length > 0 ? characterStatusChanges : undefined,
    itemChanges: itemChangesList.length > 0 ? itemChangesList : undefined,
    sessionStatChanges:
      sessionStatChanges.length > 0 ? sessionStatChanges : undefined,
  };
}
