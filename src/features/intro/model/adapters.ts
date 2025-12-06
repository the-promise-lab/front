import { SessionEventDto, type IntroResponseDto } from '@api';
import type { IntroEvent, IntroEventBundle, IntroEventType } from './types';

const EVENT_TYPE_MAP: Partial<
  Record<SessionEventDto.type, IntroEventType>
> = {
  [SessionEventDto.type.SIMPLE]: 'Simple',
  [SessionEventDto.type.SYSTEM]: 'System',
};

function adaptEventType(type: SessionEventDto.type): IntroEventType {
  return EVENT_TYPE_MAP[type] ?? 'Simple';
}

export function adaptSessionEventToIntroEvent(
  event: SessionEventDto
): IntroEvent {
  const [char1, char2, char3] = event.characters;
  const eventType = adaptEventType(event.type);

  return {
    EventID: event.eventId,
    Event: eventType,
    Script: event.script ?? undefined,
    SystemScript:
      eventType === 'System' ? event.script ?? undefined : undefined,
    BGImage: event.bgImage ?? undefined,
    CharID1: char1?.characterCode ?? undefined,
    CharPosition1: char1?.position ?? undefined,
    CharEmotion1: char1?.emotion ?? undefined,
    CharImageUrl1: char1?.imageUrl ?? undefined,
    CharSpeakerOX1: char1?.isSpeaker ?? undefined,
    CharID2: char2?.characterCode ?? undefined,
    CharPosition2: char2?.position ?? undefined,
    CharEmotion2: char2?.emotion ?? undefined,
    CharImageUrl2: char2?.imageUrl ?? undefined,
    CharSpeakerOX2: char2?.isSpeaker ?? undefined,
    CharID3: char3?.characterCode ?? undefined,
    CharPosition3: char3?.position ?? undefined,
    CharEmotion3: char3?.emotion ?? undefined,
    CharImageUrl3: char3?.imageUrl ?? undefined,
    CharSpeakerOX3: char3?.isSpeaker ?? undefined,
  };
}

export function adaptIntroResponse(
  response: IntroResponseDto
): IntroEventBundle {
  return {
    sessionId: response.sessionId,
    introMode: response.introMode,
    events: response.events.map(adaptSessionEventToIntroEvent),
  };
}

