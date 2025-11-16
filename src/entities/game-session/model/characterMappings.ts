/**
 * FIXME: 백엔드에서 다음 정보들을 API 응답에 포함하도록 수정 요청 중
 * - fullImage (전신 이미지)
 * - thumbnailImage (썸네일 이미지)
 * - colors (backgroundColor, borderColor)
 * - name
 *
 * 현재는 characterId 기반 매핑 테이블로 임시 처리
 * 백엔드 수정 완료 후 이 파일 및 관련 로직 제거 예정
 */

interface CharacterMetadata {
  name: string;
  fullImage: string;
  thumbnailImage: string;
  colors: {
    backgroundColor: string;
    borderColor: string;
  };
}

/**
 * characterId를 키로 하는 메타데이터 매핑 테이블
 * FIXME: 서버 팀에게 실제 characterId 확인 필요
 */
export const CHARACTER_METADATA: Record<number, CharacterMetadata> = {
  1: {
    name: '헴',
    fullImage: '/헴.svg',
    thumbnailImage: '/헴.svg', // FIXME: 썸네일 별도 이미지 필요
    colors: {
      backgroundColor: '#593B8F',
      borderColor: '#CC92FB',
    },
  },
  2: {
    name: '병철',
    fullImage: '/뱅철.svg',
    thumbnailImage: '/뱅철.svg', // FIXME: 썸네일 별도 이미지 필요
    colors: {
      backgroundColor: '#5B707E',
      borderColor: '#9FEFD2',
    },
  },
};
