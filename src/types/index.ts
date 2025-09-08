// API 응답 타입
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
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

// Re-export other types
export * from '../features/shelf-selection/types/shelf';
export * from './kakao';
