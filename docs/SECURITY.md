# 보안 정책 (Security Policy)

이 문서는 프로젝트의 보안 정책과 취약점 신고 절차, 그리고 민감 정보 관리 방법을 설명합니다.

## 1. 지원되는 버전

현재 유지보수 중인 버전은 다음과 같습니다. 보안 패치는 최신 안정 버전에 대해서만 제공됩니다.

| 버전          | 지원 상태        |
| ------------- | ---------------- |
| main (Latest) | ✅ 지원됨        |
| 과거 릴리즈   | ❌ 지원되지 않음 |

## 2. 민감 정보 및 환경 변수 관리

### 환경 변수 (.env)

- **절대 커밋 금지**: `.env`, `.env.local` 등 실제 시크릿이 담긴 파일은 `.gitignore`에 포함되어야 하며, 절대 원격 저장소에 올리지 않습니다.
- **템플릿 제공**: `.env.example` 파일을 통해 필요한 환경 변수의 키(Key) 목록만 공유합니다.
- **공유 방법**: 개발에 필요한 실제 값은 팀 리더나 보안 담당자를 통해 안전한 채널(예: 암호화된 메신저, 사내 위키 등)로 전달받아야 합니다.

### API 키 및 인증 정보

- **코드 하드코딩 금지**: 소스 코드 내에 API Key, Password, Token 등을 직접 작성하지 마세요.
- **환경 변수 사용**: 모든 인증 정보는 `import.meta.env` (Vite) 또는 `process.env`를 통해 주입받아 사용합니다.
- **유출 사고 발생 시**: 즉시 해당 키를 폐기(Rotate)하고, 영향을 받는 서비스를 점검한 뒤 팀 전체에 공지합니다.

### SSH 키 관리

- 배포에 사용되는 PEM 키나 SSH Private Key는 **개인 로컬 머신**과 **GitHub Secrets**에만 저장되어야 합니다.
- 공용 컴퓨터나 공유 폴더에 키를 저장하지 마세요.

## 3. GitHub Secrets 관리

CI/CD 파이프라인에 사용되는 민감 정보는 GitHub Repository Settings > Secrets and variables > Actions에 등록하여 사용합니다.

| Secret 이름           | 설명                                       |
| --------------------- | ------------------------------------------ |
| `KAKAO_ENV_FILE`      | 배포 서버에서 사용될 `.env` 파일 내용 전체 |
| `KAKAO_CLOUD_HOST`    | 배포 서버 IP 또는 도메인                   |
| `KAKAO_CLOUD_USER`    | SSH 접속 사용자명 (예: ubuntu)             |
| `KAKAO_CLOUD_SSH_KEY` | SSH 접속을 위한 Private Key (PEM)          |
| `DOCKER_USERNAME`     | Docker Hub 아이디                          |
| `DOCKER_PASSWORD`     | Docker Hub 토큰 또는 비밀번호              |
