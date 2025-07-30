// API 응답 타입
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
}

// 사용자 타입
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API 에러 타입
export interface ApiError {
  message: string;
  code: string;
  status: number;
}
