# CI/CD 설정 가이드 - 대화 내용 정리

## 📋 프로젝트 개요

- **프로젝트**: React 19 + TypeScript + Vite + Tailwind CSS
- **목표**: 카카오 클라우드 | AWS 에 Docker를 이용한 자동 배포
- **CI/CD**: GitHub Actions를 통한 자동화

## 🏗️ 생성된 파일들

### **CI/CD 설정 파일**

- `.github/workflows/deploy.yml` - GitHub Actions 워크플로우
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
│       └── deploy.yml          # CI/CD 워크플로우
├── src/                        # React 소스 코드
├── Dockerfile                  # Docker 이미지 설정
├── nginx.conf                  # Nginx 서버 설정
├── .dockerignore               # Docker 제외 파일
└── CI_CD_SETUP_GUIDE.md       # 이 가이드 (현재 파일)
```

## 🚀 CI/CD 워크플로우 설명

### **트리거 조건**

- `push` to `main` 브랜치 → 전체 워크플로우 실행 (테스트 + 빌드 + 배포)
- `push` to `develop` 브랜치 → 테스트 + 빌드만 실행 (배포 안됨)
- `pull_request` to `main` 브랜치 → 테스트 + 빌드만 실행 (배포 안됨)
- `pull_request` to `develop` 브랜치 → 테스트 + 빌드만 실행 (배포 안됨)

### **작업 단계**

1. **test-and-build**: 코드 테스트, 빌드, 결과물 저장
2. **deploy**: Docker 이미지 생성, 레지스트리 업로드, 서버 배포 (main 브랜치에서만 실행)

## 🔑 필요한 GitHub Secrets

```
REGISTRY_URL: 카카오 클라우드 컨테이너 레지스트리 주소
REGISTRY_USERNAME: 레지스트리 사용자명
REGISTRY_PASSWORD: 레지스트리 비밀번호
SERVER_USER: 서버 접속 사용자명 (보통 ubuntu)
SERVER_HOST: 서버 IP 주소 또는 도메인
```

## 📝 다음 단계 체크리스트

### **GitHub 설정**

- [ ] GitHub 저장소 생성
- [ ] 로컬 Git 초기화 및 원격 저장소 연결
- [ ] 코드 푸시
- [ ] GitHub Secrets 설정

### **카카오 클라우드 설정**

- [ ] Container Registry 생성
- [ ] EC2 인스턴스 생성
- [ ] 보안 그룹 설정 (HTTP 80, SSH 22 포트)
- [ ] EC2에 Docker 설치

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
