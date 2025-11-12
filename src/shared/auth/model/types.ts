export interface KakaoAuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export interface KakaoUserInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
      is_default_image: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email?: string;
  };
}

export interface KakaoLoginSuccess {
  (authObj: KakaoAuthResponse): void;
}

export interface KakaoLoginFail {
  (error: KakaoError): void;
}

export interface KakaoError {
  error: string;
  error_description?: string;
  error_code?: string;
  status?: number;
}

declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          success: KakaoLoginSuccess;
          fail: KakaoLoginFail;
        }) => void;
        logout: (callback?: () => void) => void;
        getAccessToken: () => string | null;
      };
      API: {
        request: (options: {
          url: string;
          success: (res: KakaoUserInfo) => void;
          fail: (error: KakaoError) => void;
        }) => void;
      };
    };
  }
}
