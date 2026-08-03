# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An n8n community node (`n8n-nodes-hcloud`) that wraps the Hetzner Cloud API v1 (`https://api.hetzner.cloud/v1`). It is a fork of the abandoned `n8n-nodes-hetznercloud`, with added support for server backup toggling, protection settings, and datacenter/server-type info. Published to npm as `n8n-nodes-hcloud`.

The package ships **no runtime dependencies** — `package.json` only has `devDependencies`, and only `dist/` is published (see `"files"`). Every dependency exists purely to build (`typescript`, `gulp`) or lint (`eslint-plugin-n8n-nodes-base`, `@typescript-eslint/parser`) the node; none of it ships to end users.

## Commands

```bash
npm install
npm run build      # tsc && gulp build:icons -> emits to dist/
npm run dev        # tsc --watch, for local iteration
npm run format      # prettier --write on nodes/ and credentials/
npm run lintfix     # eslint --fix using .eslintrc.js
```

- `npm run lint` is intentionally a no-op (`""`). Real linting runs via `lintfix`, or via `prepublishOnly` (`build` + lint with the stricter `.eslintrc.prepublish.js`, which also enforces the package isn't left with the default n8n-starter package name).
- There is no automated test suite (no test script, no test files). The only verification loop is manual, against a real n8n instance:
  ```bash
  npm install -g n8n
  npm install && npm run build && npm link
  cd ~/.n8n/nodes && npm link n8n-nodes-hcloud
  # then, in two terminals in this repo:
  npm run dev     # tsc --watch, keeps dist/ current
  n8n start
  ```
- After any change, `npm run build` must succeed and `npx eslint nodes credentials package.json` must not crash (see the pinned-versions note below — it's the thing most likely to break silently).

## Architecture

### Request/response flow

`HetznerCloud.node.ts` is a thin `VersionedNodeType` wrapper (currently only version 1) around `v1/HetznerCloudV1.node.ts`, which wires together three pieces:

- **`v1/actions/versionDescription.ts`** — builds the node's UI: the top-level `resource` dropdown (Server, Image, Firewall, Network, SSH Keys, Volume, Certificate, Load Balancer, Primary IP, Floating IP, Server Action, Server Type, ...) plus `...resource.descriptions` spread in from every resource module.
- **`v1/actions/router.ts`** — the single dispatch point. At execution time it reads the `resource` and `operation` node parameters and calls `resourceModule[operation].execute.call(this, i)`. Adding a resource means adding an `else if` branch here.
- **`v1/methods/loadOptions.ts`** — backs dynamic dropdowns (`getServers`, `getImages`, `getFirewalls`, `getLocations`, `getVolumes`, `getSshkeys`, `getServertypes`) by live-querying the Hetzner API when a field's `typeOptions.loadOptionsMethod` fires.

### Per-resource layout

Each resource is a directory under `v1/actions/` (`server`, `image`, `firewall`, `network`, `ssh`, `volume`, `certificate`, `loadbalancer`, `primary_ip`, `floating_ip`, `server_actions`, `server_types`). Each has an `index.ts` that re-exports every operation submodule and assembles the resource's `operation` dropdown + `descriptions` array. Each operation is its own subdirectory (`create/`, `get/`, `list/`, `update/`, `remove/`, ...) containing:

- `description.ts` — `INodeProperties[]` for that operation's form fields, gated with `displayOptions.show.resource`/`operation`.
- `execute.ts` — the actual HTTP call via `this.helpers.requestWithAuthentication.call(this, 'hcloud', options)`, hitting a hardcoded `https://api.hetzner.cloud/v1/...` URL (there is no shared base-URL constant — every file repeats it).
- `index.ts` — re-exports `{ description, execute }`.

**`v1/actions/Interfaces.ts`** is the type-level source of truth: `HetznerCloudMap` maps each resource name to its allowed operation strings, and `router.ts`'s exhaustiveness relies on it via n8n-workflow's `AllEntities`/`Entity`/`PropertiesOf` helpers. Adding an operation means updating this map too, or the router's typed dispatch won't compile.

**`v1/Utils.ts`** holds two shared helpers: `createDynamicObject` (turns the `{key,value}[]` shape used by "labels" fixedCollection fields into a plain object) and `helpPaginate` (recursive pagination — walks Hetzner's `meta.pagination.next_page` until exhausted, used by every `list` operation and by `loadOptions.ts`).

**`credentials/HetznerCloudApi.credentials.ts`** — single `token` field, sent as `Authorization: Bearer {{token}}`; tested against `GET /v1/actions`.

### Pinned dependency versions — do not casually bump

`n8n-workflow` is pinned to `^1.14.1` (not `*`) and `typescript` to `~4.8.4`. This is deliberate, not neglect: bumping `n8n-workflow` to its 2.x line requires TypeScript modern enough to parse its transitive `zod` types, but any TypeScript new enough for that breaks `@typescript-eslint/parser@~5.45` outright (it hard-crashes parsing on TS 7's compiler API) — and the newer `n8n-workflow` line also pulls in `@n8n/expression-runtime`, which nets *more* vulnerable transitive dependencies, not fewer. The same trap applies to `n8n-core`: it isn't imported anywhere in `nodes/` or `credentials/` and should stay out of `devDependencies` — pulling it in only to get a newer transitive version drags in dozens of unrelated packages for no code benefit. If you're tempted to "fix" these versions, run `npm audit` and `npm run build` + `npx eslint nodes credentials package.json` before and after — a lower vulnerability count with a broken build or a crashing linter is not an improvement.

All HTTP request objects are typed as `OptionsWithUri` (from `@types/request`, imported as `import { OptionsWithUri } from 'request'`), matching the `n8n-workflow@1.x` signature of `requestWithAuthentication`. This type does not exist as such in `n8n-workflow@2.x` (it's `IRequestOptions`/`IHttpRequestOptions` there) — another reason the two majors don't mix.

### Hetzner API changelog awareness

This node hardcodes Hetzner Cloud API v1 endpoints and field names throughout `execute.ts`/`loadOptions.ts`. Hetzner deprecates and removes fields/endpoints on its own schedule (see `https://docs.hetzner.cloud/changelog`) independent of this codebase — e.g. the `datacenter` field/resource was phased out in favor of `location` (removed 2026-07-01, list/get endpoints deprecated, 410 after 2026-10-01), which required removing the whole `datacenter` action folder and switching `location` fields to a dedicated `/v1/locations`-backed dropdown. Use the `/hcloud-changelog-check` command to audit the codebase against current Hetzner changelog entries.
