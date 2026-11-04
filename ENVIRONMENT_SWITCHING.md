# 🔄 Environment Switching Guide

## Quick Commands

### Switch Environment Only
```bash
npm run env:local     # Switch to local Docker OpenCart
npm run env:remote    # Switch to remote awesomeqa.com
```

### Run Tests with Specific Environment
```bash
# Local Environment (Docker OpenCart)
npm run test:local           # All tests
npm run test:local:web       # Web tests only
npm run test:local:db        # DB tests only

# Remote Environment (awesomeqa.com)
npm run test:remote          # All tests
npm run test:remote:web      # Web tests only
npm run test:remote:sanity   # Sanity tests only
```

### Manual Override (One-time)
```bash
# Run with specific URL without changing .env
WEB_APP_URL=https://awesomeqa.com/ui/ npx playwright test
WEB_APP_URL=http://localhost:8081/ npx playwright test tests/web/valid-login.spec.ts
```

---

## Environment Files

| File | Environment | URL | DB Access |
|------|-------------|-----|----------|
| `.env.local` | Local Docker | http://localhost:8081/ | ✅ Yes |
| `.env.remote` | Remote Demo | https://awesomeqa.com/ui/ | ❌ No |
| `.env` | Active (copied from above) | - | - |

---

## When to Use Which Environment

### Use **Local** (`.env.local`) when:
- ✅ Testing DB validation (`@db` tests)
- ✅ Testing admin panel features
- ✅ Need full control over test data
- ✅ Offline development

### Use **Remote** (`.env.remote`) when:
- ✅ Quick testing without Docker
- ✅ Testing against stable demo site
- ✅ Don't need DB validation
- ✅ Pre-existing test data available

---

## Current Active Environment

Check which environment is active:
```bash
grep WEB_APP_URL .env
```

---

## Tips

1. **Always check active environment** before running tests
2. **DB tests only work with local** environment
3. **Registration tests create new customers** in whichever environment is active
4. **Switch back to remote** after DB testing to avoid affecting local data
