# Multi-stage build를 사용한 최적화된 Dockerfile
# 1단계: 빌드 단계
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치 (프로덕션 모드)
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 2단계: 프로덕션 단계
FROM nginx:alpine AS production

# 빌드된 파일들을 nginx 서버로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

# 포트 80 노출
EXPOSE 80

# nginx 서버 시작
CMD ["nginx", "-g", "daemon off;"]
