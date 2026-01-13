# CI/CD 설정 및 배포 가이드

이 문서는 프로젝트의 자동화된 배포 파이프라인(CI/CD) 설정 방법과, 초보자를 위한 인프라 구성 방법을 상세히 설명합니다.

## 📋 개요

- **CI (지속적 통합)**: 코드가 `main` 브랜치에 푸시되면 자동으로 빌드하고 Docker 이미지를 생성합니다.
- **CD (지속적 배포)**: 생성된 이미지를 카카오 클라우드 서버에 배포하고, 무중단 배포(Blue/Green)를 수행합니다.

---

## 🏗️ 인프라 사전 준비 (필수)

배포 자동화를 위해 서버와 GitHub에 몇 가지 설정이 필요합니다.

### 1. SSH 키 생성 (로컬 컴퓨터에서 수행)

서버에 안전하게 접속하기 위해 SSH 키 쌍을 생성합니다.

```bash
# 터미널(Terminal) 또는 Git Bash 실행
# -t: 암호화 방식(rsa), -b: 비트 수(4096), -C: 주석(이메일 등)
ssh-keygen -t rsa -b 4096 -C "deploy-key" -f ./kakao_deploy_key

# 비밀번호(Passphrase)는 엔터를 쳐서 없이 생성하는 것을 권장합니다 (CI 자동화용).
```

- 생성된 `kakao_deploy_key` (Private Key): **절대 공개 금지**. GitHub Secrets에 등록합니다.
- 생성된 `kakao_deploy_key.pub` (Public Key): 서버의 `~/.ssh/authorized_keys`에 등록합니다.

### 2. 카카오 클라우드 서버 설정

1. **인스턴스 생성**: Ubuntu 22.04 LTS 권장.
2. **공인 IP 확인**: 생성된 인스턴스의 Public IP를 기록해둡니다. (예: `123.45.67.89`)
3. **포트 개방 (Security Group)**:
   - `22` (SSH): 관리자 접속용
   - `80` (HTTP): 웹 서비스용
   - `3010`, `3011`: Blue/Green 배포 컨테이너용 (내부에서만 접근하면 되지만, 테스트를 위해 열어둘 수 있음)

4. **Docker 설치 (서버 접속 후 수행)**

   ```bash
   # 서버 접속
   ssh -i [기존키.pem] ubuntu@[서버IP]

   # Docker 설치 스크립트 실행
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   # 현재 사용자를 docker 그룹에 추가 (sudo 없이 docker 실행)
   sudo usermod -aG docker $USER
   # (로그아웃 후 다시 로그인해야 적용됨)
   ```

5. **배포용 SSH 키 등록**
   서버의 `~/.ssh/authorized_keys` 파일에 아까 생성한 `kakao_deploy_key.pub` 내용을 붙여넣습니다.
   ```bash
   nano ~/.ssh/authorized_keys
   # 맨 아래줄에 붙여넣고 Ctrl+O(저장), Enter, Ctrl+X(종료)
   ```

### 3. Nginx 및 배포 스크립트 설정

서버에 Nginx를 설치하고 Blue/Green 전환 스크립트를 배치합니다.

1. **Nginx 설치**: `sudo apt update && sudo apt install -y nginx`
2. **배포 스크립트 위치**: `/opt/thepromise/scripts/switch-frontend.sh`
   - 이 스크립트는 Nginx 설정을 변경하여 3010번 포트와 3011번 포트 사이를 전환합니다.
   - 상세 스크립트 내용은 프로젝트 관리자에게 요청하거나 저장소 내 `scripts/` 폴더(있다면)를 확인하세요.

---

## 🔑 GitHub Secrets 설정

GitHub Repository > **Settings** > **Secrets and variables** > **Actions** > **New repository secret** 클릭하여 아래 값들을 등록합니다.

| Secret 이름           | 설명                             | 예시 값                                    |
| --------------------- | -------------------------------- | ------------------------------------------ |
| `DOCKER_USERNAME`     | Docker Hub 아이디                | `myname`                                   |
| `DOCKER_PASSWORD`     | Docker Hub 비밀번호/토큰         | `dckr_pat_...`                             |
| `KAKAO_CLOUD_HOST`    | 서버 공인 IP                     | `123.45.67.89`                             |
| `KAKAO_CLOUD_USER`    | 서버 접속 계정명                 | `ubuntu`                                   |
| `KAKAO_CLOUD_SSH_KEY` | **Private Key** 내용 전체        | `-----BEGIN RSA PRIVATE KEY----- ...`      |
| `KAKAO_ENV_FILE`      | 프로덕션용 `.env` 파일 내용 전체 | `VITE_API_BASE_URL=...` (줄바꿈 포함 가능) |

> **주의**: `KAKAO_CLOUD_SSH_KEY` 등록 시 `-----BEGIN...` 부터 `...END...` 까지 전체를 복사해서 넣어야 합니다.

---

## 🚀 배포 워크플로우

### 1. Kakao CI (`.github/workflows/kakao_ci.yml`)

- **언제 실행되나요?**
  - `main` 브랜치로 코드가 Push 될 때
  - PR이 열리거나 업데이트 될 때 (테스트만 수행)
- **무엇을 하나요?**
  - 의존성 설치 및 린트 검사 (`npm run lint`)
  - 프로덕션 빌드 (`npm run build`)
  - Docker 이미지 빌드 및 Docker Hub 푸시 (태그: `latest` 및 `vX.Y.Z`)
  - GitHub Release 자동 생성

### 2. Kakao CD (`.github/workflows/kakao_cd.yml`)

- **언제 실행되나요?**
  - CI 워크플로우가 성공적으로 끝나면 자동으로 시작됩니다.
  - 또는 Actions 탭에서 수동으로 실행할 수 있습니다.
- **무엇을 하나요?**
  - 서버에 SSH로 접속합니다.
  - 최신 Docker 이미지를 다운로드(Pull)합니다.
  - 현재 실행 중이지 않은 포트(Blue/Green)에 새 컨테이너를 띄웁니다.
  - 헬스체크(Health Check)를 통해 정상 구동을 확인합니다.
  - Nginx 설정을 변경하여 트래픽을 새 컨테이너로 돌립니다.
  - 이전 컨테이너를 중지하고 삭제합니다.

---

## ❓ 트러블슈팅 (자주 묻는 질문)

### Q. 배포가 실패했는데 로그는 어디서 보나요?

GitHub Repository 상단의 **Actions** 탭에서 실패한 워크플로우를 클릭하면 단계별 상세 로그를 볼 수 있습니다.

### Q. "Permission denied (publickey)" 에러가 나요.

`KAKAO_CLOUD_SSH_KEY` 시크릿이 올바른지, 그리고 해당 키의 **Public Key**가 서버의 `authorized_keys`에 제대로 등록되었는지 확인하세요.

### Q. 배포 후 사이트가 안 열려요.

1. 서버의 방화벽(Security Group)에서 80번 포트가 열려있는지 확인하세요.
2. Nginx가 실행 중인지 확인하세요 (`sudo systemctl status nginx`).
3. 컨테이너가 떠있는지 확인하세요 (`docker ps`).

### Q. Docker Hub 로그인 실패

`DOCKER_USERNAME`과 `DOCKER_PASSWORD` 시크릿을 확인하세요. 비밀번호 변경 시 시크릿도 갱신해야 합니다.
