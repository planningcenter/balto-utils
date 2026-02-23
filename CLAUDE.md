# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Collection of reusable GitHub Actions and composite workflows for Planning Center repos. Provides setup actions for Node.js package managers (yarn, npm) and a TypeScript-based ncc build-and-commit action.

## Project Structure

```
ncc/          TypeScript action - compiles with @vercel/ncc and commits dist/
npm/          Composite action - checkout + setup-node + npm ci
yarn/         Composite action - checkout + setup-node + yarn install
.github/
  workflows/  Reusable workflows (ncc.yml, release-tagger.yml) + internal CI
```

## Essential Commands

From `ncc/`:

- `npm ci` - Install dependencies
- `npm run build` - Build with ncc (outputs `dist/index.js`)

## Development Practices

- The `ncc` action is the only TypeScript action; `npm` and `yarn` are pure composite actions (no build step)
- After editing `ncc/src/main.ts`, rebuild with `npm run build` from the `ncc/` directory — the compiled `dist/index.js` must be committed
- Reusable workflows live in `.github/workflows/`; consumer repos reference them via `uses: planningcenter/balto-utils/.github/workflows/<name>.yml@v2`
- Actions are versioned with semver tags; major/minor tags (e.g. `v2`, `v2.3`) are moved by the release-tagger workflow on each fully-qualified tag push
