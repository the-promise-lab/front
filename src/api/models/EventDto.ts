/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EventDto = {
  id: number;
  actId: number;
  eventType: EventDto.eventType;
  order: number;
  speakerId?: number;
  script: string;
  position: string;
  emotion: string;
  bgImage: string;
};
export namespace EventDto {
  export enum eventType {
    SIMPLE = 'Simple',
    SYSTEM = 'System',
    STORY_CHOICE = 'StoryChoice',
    ITEM_CHOICE = 'ItemChoice',
    STATUS = 'Status',
  }
}
