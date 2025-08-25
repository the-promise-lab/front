# 🌿 브랜치 보호 규칙 설정 가이드

## 📋 Git Flow 브랜치 전략

```
main (프로덕션)
  ↑
develop (개발)
  ↑
feature/기능명 (기능 개발)
```

## 🔒 브랜치별 보호 규칙

### **1. main 브랜치 보호**

#### **설정 위치**

GitHub 저장소 → Settings → Branches → Add rule → Branch name pattern: `main`

#### **보호 규칙 설정**

- [x] **Require a pull request before merging**
  - [x] Require approvals: `2` (최소 2명의 승인 필요)
  - [x] Dismiss stale PR approvals when new commits are pushed
  - [x] Require review from code owners

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - [x] Status checks: `test-and-build` (CI 워크플로우)

- [x] **Require conversation resolution before merging**
- [x] **Require signed commits**
- [x] **Require linear history**
- [x] **Include administrators**

#### **설정 이유**

- 프로덕션 코드의 품질 보장
- 실수로 인한 직접 푸시 방지
- 코드 리뷰 의무화

### **2. develop 브랜치 보호**

#### **설정 위치**

GitHub 저장소 → Settings → Branches → Add rule → Branch name pattern: `develop`

#### **보호 규칙 설정**

- [x] **Require a pull request before merging**
  - [x] Require approvals: `1` (최소 1명의 승인 필요)
  - [x] Dismiss stale PR approvals when new commits are pushed

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - [x] Status checks: `test-and-build` (CI 워크플로우)

- [x] **Require conversation resolution before merging**
- [x] **Include administrators**

#### **설정 이유**

- 개발 브랜치의 안정성 확보
- CI/CD 파이프라인 통과 확인
- 기본적인 코드 리뷰 의무화

### **3. feature 브랜치**

#### **보호 규칙 없음**

- 개발자가 자유롭게 작업
- 필요시 develop에서 분기하여 작업

## 🚀 브랜치 생성 및 작업 흐름

### **1. 기능 개발 시작**

```bash
# develop 브랜치에서 feature 브랜치 생성
git checkout develop
git pull origin develop
git checkout -b feature/새로운기능

# 작업 진행
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin feature/새로운기능
```

### **2. Pull Request 생성**

1. GitHub에서 `feature/새로운기능` → `develop` PR 생성
2. PR 템플릿에 따라 내용 작성
3. 리뷰어 지정 및 리뷰 요청

### **3. 코드 리뷰 및 승인**

1. 리뷰어가 코드 검토
2. 필요한 수정사항 코멘트
3. 모든 체크리스트 완료 후 승인

### **4. develop에 머지**

1. PR 승인 후 develop에 머지
2. feature 브랜치 삭제
3. develop에서 CI/CD 실행 (테스트 + 빌드)

### **5. 프로덕션 배포**

```bash
# develop → main 머지 (릴리즈 준비 완료 시)
git checkout main
git merge develop
git push origin main

# main 푸시 시 자동으로 CI/CD 실행
# test-and-build + deploy 모두 실행
```

## 📝 CODEOWNERS 파일 생성

### **.github/CODEOWNERS**

```
# 전체 프로젝트 소유자
* @프로젝트소유자

# 프론트엔드 관련
src/components/ @프론트엔드팀
src/hooks/ @프론트엔드팀
src/services/ @프론트엔드팀

# CI/CD 관련
.github/ @DevOps팀
Dockerfile @DevOps팀
nginx.conf @DevOps팀

# 문서
*.md @문서팀
```

## 🔧 GitHub 설정 단계

### **1단계: 브랜치 보호 규칙 설정**

1. GitHub 저장소 → Settings
2. 왼쪽 메뉴 → Branches
3. Add rule 클릭
4. Branch name pattern 입력 (`main`, `develop`)
5. 보호 규칙 체크박스 선택
6. Create 클릭

### **2단계: CODEOWNERS 파일 생성**

1. `.github/CODEOWNERS` 파일 생성
2. 팀원별 소유권 설정
3. main 브랜치에 푸시

### **3단계: 팀 권한 설정**

1. GitHub 저장소 → Settings → Collaborators and teams
2. 팀별 권한 설정
3. Code review 권한 부여

## ⚠️ 주의사항

### **브랜치 보호 규칙 활성화 후**

- **main/develop에 직접 푸시 불가**
- **PR을 통한 머지만 가능**
- **CI/CD 통과 필수**
- **코드 리뷰 승인 필수**

### **긴급 상황 시**

- 브랜치 보호 규칙 일시 비활성화
- 문제 해결 후 즉시 재활성화
- 관리자 권한으로 임시 머지

## 📚 참고 자료

- [GitHub Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [GitHub CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [Git Flow Workflow](https://nvie.com/posts/a-successful-git-branching-model/)

---
