

```bash
# 1. 의존성 설치
pnpm install

# 2. DB 초기화 (최초 1회)
pnpm db:generate
pnpm db:push
pnpm db:seed

# 3. 서버 실행 (터미널 1)
pnpm dev
# → http://localhost:3001

# 4. 웹앱 실행 (터미널 2)
pnpm dev:web
# → http://localhost:5173
```