---
mode: 'agent'
model: GPT-5.5
description: 'Create the Node.js logic tier for the Octofit multi-tier application'
---

Create the logic tier in `octofit-tracker/backend` for the Octofit Tracker multi-tier application.

Requirements:

1. Do not change directories; use path-qualified commands.
2. Initialize a TypeScript Node.js API with Express.
3. Configure scripts for build/dev/start.
4. Add route handlers for:
   - `/api/users/`
   - `/api/teams/`
   - `/api/activities/`
   - `/api/leaderboard/`
   - `/api/workouts/`
5. Keep server port on `8000`.
6. Add Codespaces-aware API URL support using `CODESPACE_NAME`.

Implementation guidance:

- Use path-qualified commands that target `octofit-tracker/backend` directly, without `cd` operations.
- Initialize a Node.js TypeScript project in that folder and install `express`, `cors`, `dotenv`, `typescript`, `tsx`, `ts-node`, and the relevant type packages.
- Define `package.json` scripts so the project can be built, run in development mode, and started in production:
  - `build`: compile TypeScript
  - `dev`: run the API with hot reload / watch mode
  - `start`: run the compiled server from `dist`
- Create an Express app that listens on port `8000`.
- Add the required route handlers and return JSON payloads for each resource collection.
- Include a helper for generating the API base URL that is aware of GitHub Codespaces and reads `CODESPACE_NAME` when present, so it can build a forwarded public URL such as `https://<codespace-name>-8000.app.github.dev`.
- Ensure the generated API URL is available to the frontend or other services via environment configuration, while preserving a local fallback for non-Codespaces environments.
- Keep the implementation clean and minimal but production-ready for a multi-tier application setup.
