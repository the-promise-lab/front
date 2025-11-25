export type IntroEventType = 'Simple' | 'System';

export interface IntroEvent {
  EventID: number;
  Event: IntroEventType;
  Script?: string;
  SystemScript?: string;
  BGImage?: string;
  CharID1?: string;
  CharPosition1?: string;
  CharEmotion1?: string;
  CharSpeakerOX1?: number | boolean;
  CharID2?: string;
  CharPosition2?: string;
  CharEmotion2?: string;
  CharSpeakerOX2?: number | boolean;
  CharID3?: string;
  CharPosition3?: string;
  CharEmotion3?: string;
  CharSpeakerOX3?: number | boolean;
}
