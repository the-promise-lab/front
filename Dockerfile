FROM nginx:alpine

# 작업 디렉토리 설정 (선택)
WORKDIR /usr/share/nginx/html

# CI에서 이미 빌드된 dist를 그대로 복사
COPY dist /usr/share/nginx/html

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
