# CI/CD 설정 가이드 - 대화 내용 정리

## 📋 프로젝트 개요

- **프로젝트**: React 19 + TypeScript + Vite + Tailwind CSS
- **목표**: 카카오 클라우드에 Docker 이미지를 통한 자동 배포
- **CI/CD**: GitHub Actions(`.github/workflows/kakao_ci.yml`, `.github/workflows/kakao_cd.yml`)

## 🏗️ 생성된 파일들

### **CI/CD 설정 파일**

- `.github/workflows/kakao_ci.yml` - CI(빌드/태깅/도커 푸시)
- `.github/workflows/kakao_cd.yml` - CD(카카오 클라우드 배포)
- `Dockerfile` - Docker 이미지 빌드 설정
- `nginx.conf` - Nginx 웹 서버 설정
- `.dockerignore` - Docker 빌드 시 제외할 파일들

### **PR/Issue 템플릿**

- `.github/pull_request_template.md` - Pull Request 템플릿
- `.github/ISSUE_TEMPLATE/bug_report.md` - 버그 리포트 템플릿

### **브랜치 관리 가이드**

- `.github/BRANCH_PROTECTION.md` - 브랜치 보호 규칙 설정 가이드

### **프로젝트 구조**

```
프로젝트/
├── .github/
│   └── workflows/
│       ├── kakao_ci.yml        # CI: lint/build, Docker build/push, tag/release
│       └── kakao_cd.yml        # CD: SSH 배포, Blue/Green 전환
├── src/                        # React 소스 코드
├── Dockerfile                  # Docker 이미지 설정
├── nginx.conf                  # Nginx 서버 설정
├── .dockerignore               # Docker 제외 파일
└── CI_CD_SETUP_GUIDE.md       # 이 가이드 (현재 파일)
```

## 🚀 CI/CD 워크플로우 설명

### **트리거 조건**

- **Kakao CI (`kakao_ci.yml`)**
  - `pull_request` → main: lint/build + Docker 빌드 테스트(푸시 없음)
  - `push` → main: lint/build → 버전 자동 증가(tag/release) → Docker Hub 푸시(`thepromise2025/thefrontmise:latest` + `vX.Y.Z`)
  - `workflow_dispatch`: 수동 실행 시 `version_bump`(major/minor/patch) 선택 후 동일 파이프라인
- **Kakao CD (`kakao_cd.yml`)**
  - Kakao CI(main) 성공 시 `workflow_run`으로 자동 실행
  - `workflow_dispatch`로 수동 실행 가능(`image_tag` 입력, 기본 latest)

### **작업 단계 (요약)**

- Kakao CI
  1. Checkout → Node 22 → `npm ci`(리트라이)
  2. `npm run lint` → `.env` 생성(`KAKAO_ENV_FILE`) → `npm run build`
  3. main push 시 Docker build/push → Git tag & Release(`vX.Y.Z`)
  4. PR 은 Docker build 테스트만 수행
- Kakao CD
  1. 최신 Release tag 또는 입력 tag 선택 → Docker pull
  2. Blue/Green 배포(호스트 포트 3010/3011) → `/opt/thepromise/scripts/switch-frontend.sh`로 Nginx 업스트림 전환
  3. `/` 헬스체크 실패 시 새 컨테이너 제거 후 실패 처리, 성공 시 이전 컨테이너 정리

## 🔑 필요한 GitHub Secrets

```
DOCKER_USERNAME, DOCKER_PASSWORD   # Docker Hub push (CI)
KAKAO_ENV_FILE                     # 배포용 .env 내용 (CI 빌드 & CD 컨테이너 env-file)
KAKAO_CLOUD_HOST                   # 배포 대상 호스트
KAKAO_CLOUD_USER                   # SSH 사용자
KAKAO_CLOUD_SSH_KEY                # SSH private key
```

## 📝 다음 단계 체크리스트

### **GitHub 설정**

- [ ] GitHub 저장소 생성
- [ ] 로컬 Git 초기화 및 원격 저장소 연결
- [ ] 코드 푸시
- [ ] GitHub Secrets 설정

### **카카오 클라우드 설정**

- [ ] 배포 대상 호스트에 Docker 설치
- [ ] SSH 접속 확인(포트 22) 및 `KAKAO_CLOUD_SSH_KEY` 등록
- [ ] Nginx 리버스 프록시 구성 및 `/opt/thepromise/scripts/switch-frontend.sh` 배치/실행권한
- [ ] 호스트 포트 3010/3011 열림(Blue/Green), 외부 접근은 Nginx 80 포트로 노출

### **배포 테스트**

- [ ] 코드 수정 및 푸시
- [ ] GitHub Actions 모니터링
- [ ] 배포 결과 확인

## 🎯 주요 명령어들

### **Git 명령어**

```bash
git init
git add .
git commit -m "Initial commit: React app with CI/CD setup"
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

### **Docker 명령어**

```bash
# 이미지 빌드
docker build -t my-react-app .

# 컨테이너 실행
docker run -d --name my-react-app -p 80:80 my-react-app

# 컨테이너 관리
docker stop my-react-app
docker rm my-react-app
docker ps
```

### **EC2 접속**

```bash
ssh -i key.pem ubuntu@[EC2_PUBLIC_IP]
```

## ❓ 자주 묻는 질문

### **Q: PR만 올라와도 자동 배포되나요?**

A: 아니요! PR에서는 테스트와 빌드만 실행되고, main에 머지된 후에만 배포됩니다.

### **Q: CI/CD의 장점은?**

A: 자동화, 빠른 배포, 일관성, 실수 방지, 협업 효율성 향상

### **Q: 배포 실패 시 어떻게 하나요?**

A: GitHub Actions에서 실패한 단계를 확인하고 수정 후 다시 푸시하면 자동으로 재시도됩니다.

## 📚 참고 자료

- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Docker 공식 문서](https://docs.docker.com/)
- [Nginx 공식 문서](https://nginx.org/en/docs/)
- [카카오 클라우드 공식 문서](https://docs.kakaoi.com/)

## 🔄 업데이트 기록

- **2024-XX-XX**: 초기 CI/CD 설정 가이드 작성
- **2024-XX-XX**: GitHub Actions 워크플로우 설정
- **2024-XX-XX**: Docker 및 Nginx 설정
- **2024-XX-XX**: 배포 테스트 완료

---

**참고**: 이 문서는 AI 어시스턴트와의 대화를 바탕으로 작성되었습니다.
Cursor를 끄더라도 이 파일을 통해 설정 과정을 확인할 수 있습니다.
