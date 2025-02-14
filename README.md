# Challenge Monorepo

I've decided to use my personalmonorepo starter template for this project since it offers many reusable features. These include an API web server, linter configurations, formatters, sharable components with a design system, type safe API client, and more.

<details>
<summary><h2>Applications workspace</h2></summary>

- [api](apps/api): Hono API
- [web-app](apps/web-app): Vitejs + React + Tanstack Router app

</details>

<details>
<summary><h2>Packages workspace</h2></summary>

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

</details>

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

By default, web app will be available at `http://localhost:5173`

API at `http://localhost:3001` (can be changed by renaming `.env.example` to `.env` for [api](apps/api/.env.example) and [web-app](apps/web-app/.env.example) and providing your own settings)

Design system docs at `http://localhost:6006`,

Be sure to have all the ports available.

## Implementation notes and considerations

Of course I was not able to implement all the features and requirements, but I've tried to cover the most important ones.

- List performance optimizations - pagination, infinite scroll, etc. On an API side - rate limiting could be applied.
- Offline capabilities - could be achieved by PWA plus persistent storage (indexedDB, [OPFS](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system), or alternatives that [Local-first software](https://localfirstweb.dev/) can provide for us). There are also persistent connectors for Tanstack Query.
- Real-time capabilities - could be achieved by WebSocket
- Ideally I should move filters to the query params and handle it using Router.
