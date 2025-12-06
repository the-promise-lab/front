/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $KakaoTokenDto = {
  properties: {
    code: {
      type: 'string',
      description: `카카오 인증 서버로부터 받은 인가 코드 (Authorization Code)`,
      isRequired: true,
    },
    redirectUri: {
      type: 'string',
      description: `인가 코드를 받을 때 사용했던 리다이렉트 URI`,
      isRequired: true,
    },
  },
} as const;
