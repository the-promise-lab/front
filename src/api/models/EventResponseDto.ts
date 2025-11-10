/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EventResponseDto = {
  id: number;
  actId: number;
  eventType: EventResponseDto.eventType;
  order: number;
  speakerId?: number;
  script: string;
  position: string;
  emotion: string;
  bgImage: string;
};
export namespace EventResponseDto {
  export enum eventType {
    SIMPLE = 'Simple',
    SYSTEM = 'System',
    STORY_CHOICE = 'StoryChoice',
    ITEM_CHOICE = 'ItemChoice',
    STATUS = 'Status',
  }
}
