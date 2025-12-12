import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 쿠키에서 특정 키의 값을 가져옵니다.
 * @param name 쿠키 키 이름
 * @returns 쿠키 값 또는 null
 */
export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

export function isDevEnv(): boolean {
  return import.meta.env.MODE === 'development';
}
