/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RankingCharacterResultDto = {
  /**
   * 캐릭터 그룹 이름
   */
  characterGroupName?: string;
  /**
   * 캐릭터 이름(들)
   */
  characterNames: string;
  /**
   * 결과 텍스트 (엔딩 제목 등)
   */
  result: string;
  /**
   * 엔딩 등급
   */
  grade?: string;
  /**
   * 결과 이미지 URL
   */
  imageUrl?: string;
};
