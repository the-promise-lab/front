/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CharacterDto = {
  /**
   * 캐릭터 ID
   */
  id: number;
  /**
   * 캐릭터 코드
   */
  code: string;
  /**
   * 캐릭터 이름
   */
  name?: string | null;
  /**
   * 캐릭터 나이
   */
  age?: number | null;
  /**
   * 캐릭터 설명
   */
  description?: string | null;
  /**
   * 캐릭터 선택 이미지
   */
  selectImage?: string | null;
  /**
   * 캐릭터 포트레잇 이미지
   */
  portraitImage?: string | null;
  /**
   * 기본 체력
   */
  defaultHp?: number | null;
  /**
   * 기본 정신력
   */
  defaultMental?: number | null;
  /**
   * 배경 색상
   */
  bgColor?: string | null;
  /**
   * 테두리 색상
   */
  borderColor?: string | null;
};
