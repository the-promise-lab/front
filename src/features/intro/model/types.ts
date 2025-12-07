export type IntroEventType = 'Simple' | 'System';

export interface IntroEvent {
  EventID: number;
  Event: IntroEventType;
  Script?: string;
  SystemScript?: string;
  BGImage?: string;
  CharID1?: string;
  CharPosition1?: string | null;
  CharEmotion1?: string | null;
  CharImageUrl1?: string | null;
  CharSpeakerOX1?: number | boolean | null;
  CharID2?: string;
  CharPosition2?: string | null;
  CharEmotion2?: string | null;
  CharImageUrl2?: string | null;
  CharSpeakerOX2?: number | boolean | null;
  CharID3?: string;
  CharPosition3?: string | null;
  CharEmotion3?: string | null;
  CharImageUrl3?: string | null;
  CharSpeakerOX3?: number | boolean | null;
}

export interface IntroEventBundle {
  sessionId: string;
  introMode: number;
  events: IntroEvent[];
}

