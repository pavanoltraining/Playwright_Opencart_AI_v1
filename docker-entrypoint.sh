#!/bin/bash
# =============================================================================
# docker-entrypoint.sh — Playwright test suite selector
# =============================================================================
# Maps a human-readable suite name to the corresponding npm script defined in
# package.json.  Any additional arguments are forwarded to Playwright.
#
# Usage:  docker-entrypoint.sh [suite] [playwright-args...]
#
# Examples:
#   docker-entrypoint.sh                  → run all tests
#   docker-entrypoint.sh all              → run all tests
#   docker-entrypoint.sh sanity           → npm run test:sanity
#   docker-entrypoint.sh web --headed     → npm run test:web -- --headed
#   docker-entrypoint.sh api --workers 2  → npm run test:api -- --workers 2
# =============================================================================

set -e

SUITE="${1:-all}"

case "$SUITE" in
  all)
    shift 2>/dev/null || true
    echo "==> Running ALL tests (args: $@)"
    exec npx playwright test "$@"
    ;;
  sanity|regression|web|api|master|e2e|datadriven)
    shift
    echo "==> Running '$SUITE' tests (args: $@)"
    exec npm run "test:${SUITE}" -- "$@"
    ;;
  *)
    echo "Error: Unknown test suite '$SUITE'"
    echo ""
    echo "Usage: $0 {all|sanity|regression|web|api|master|e2e|datadriven} [playwright-args...]"
    echo ""
    echo "Available test suites:"
    echo "  all         Run all tests (default)"
    echo "  sanity      Run sanity tests  (@sanity)"
    echo "  regression  Run regression tests (@regression)"
    echo "  web         Run web tests     (@web)"
    echo "  api         Run API tests     (@api)"
    echo "  master      Run master tests  (@master)"
    echo "  e2e         Run e2e tests     (@e2e)"
    echo "  datadriven  Run data-driven tests (@datadriven)"
    exit 1
    ;;
esac