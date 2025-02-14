# Monorepo starter template with design system

> **Note**
> This project is under active development. APIs, features, and documentation are subject to frequent changes and updates.

## Applications workspace

- [api](apps/api): Hono API
- [web-app](apps/web-app): Vitejs + React + Tanstack Router app

## Packages workspace

### Design system scope (@design-system)

- Shared components:
  - [@design-system/shadcn](packages/@design-system/components/shadcn): Shadcn components
- [@design-system/design-tokens](packages/@design-system/design-tokens): Design tokens library
- [@design-system/docs](packages/@design-system/docs): Design System documentation (Storybook)
- [@design-system/core](packages/@design-system/core): Utilities and helpers

### Configuration scope (@configs)

Monorepo/workflow specific configurations:

- [@configs/eslint](packages/@configs/eslint): `ESLint` configurations
- [@configs/typescript](packages/@configs/typescript): `TypeScript` configurations
- [@configs/prettier](packages/@configs/prettier): `Prettier` configurations

## Requirements

- [Node.js](https://nodejs.org/en/download/) > 20.10.0
- [pnpm](https://pnpm.io/installation) > 9.0.4

## Install

Clone repository and run under the monorepo root path:

```
pnpm i -r
```

## Run development server

```
pnpm dev
```

By default, web app will be available at `http://localhost:5173`, API at `http://localhost:3001` (can be changed by renaming `.env.example` to `.env` for [api](apps/api/.env.example) and [web-app](apps/web-app/.env.example) and providing your own settings), and design system docs at `http://localhost:6006`,
be sure to have all the ports available.

## Build

```
pnpm build
```
