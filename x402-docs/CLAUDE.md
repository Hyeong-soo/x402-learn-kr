# Claude Code Instructions

## 이 프로젝트 개발 서버

**이 프로젝트는 포트 3010을 사용합니다.**

```bash
# 서버 시작
npm run dev -- -p 3010 &
```

## 서버 재시작 규칙

서버를 재시작할 때 **절대로** `pkill -f "next dev"` 같은 명령어로 모든 Next.js 서버를 종료하지 마세요.

특정 포트의 서버만 종료하려면:

```bash
# 3010 포트 서버만 종료 후 재시작
lsof -ti :3010 | xargs kill -9 2>/dev/null; npm run dev -- -p 3010 &
```

다른 프로젝트의 Next.js 서버가 영향받을 수 있으므로 포트 기반으로 종료해야 합니다.
