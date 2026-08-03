---
description: Audit this node against the Hetzner Cloud API changelog for breaking/deprecated changes
---

Check whether the Hetzner Cloud API has changed in ways that require code changes in this repository.

## Context

This node hardcodes Hetzner Cloud API v1 endpoints, field names, and enum values throughout `nodes/HetznerCloud/v1/actions/**/execute.ts` and `nodes/HetznerCloud/v1/methods/loadOptions.ts`. Hetzner deprecates and removes API surface on its own schedule, independent of this codebase (see the "Pinned dependency versions" and "Hetzner API changelog awareness" sections of `CLAUDE.md` for the last known example: the `datacenter` field/resource phase-out).

## Steps

1. Fetch `https://docs.hetzner.cloud/changelog` and get an exhaustive list of entries, with a particular focus on:
   - Entries dated after the last time this command was run (if unknown, cover at least the last 12 months plus anything scheduled in the future relative to today)
   - Deprecations, removals, breaking changes, renamed/restructured fields, new required fields, and endpoint replacements
   - Resources this node actually touches: servers, images, primary IPs, floating IPs, firewalls, certificates, load balancers, networks, SSH keys, volumes, server types, locations/datacenters, actions
   - If one fetch doesn't seem to cover the full page (the changelog is long), fetch again with a narrower prompt (e.g. "entries from the last 6 months" or "entries dated after 2026-08-01") to fill in gaps rather than assuming the first pass was complete.

2. For every entry found, check this codebase to see if it's actually relevant:
   - `grep -rn` for the specific field/endpoint/enum name across `nodes/` and `credentials/`
   - Only flag entries that correspond to something this code actually sends, reads, or depends on. A changelog entry about a resource this node doesn't touch (e.g. Object Storage, Load Balancer Types pricing internals, ISOs, Robot API) is not relevant — don't report it.
   - For fields that are only read from API responses and passed through untouched (most `list`/`get` actions just do `this.helpers.returnJsonArray(responseData)`), a renamed/removed response field is usually NOT a required code change — note it only if it's actually parsed/branched on in code.

3. Categorize each relevant finding:
   - **Breaking now**: the removal/deadline date has already passed relative to today's date — this is likely the actual cause of a bug report, fix it.
   - **Scheduled**: a firm removal date exists in the future — note the date, no code change needed yet unless the user wants to get ahead of it.
   - **Behavioral change, no removal date**: something changed silently (e.g. a field now returns a different value) — check if code logic depends on the old behavior.

4. Report back concisely: what's breaking now (with file:line references), what's scheduled and when, and what you checked but ruled out as not applicable. Do not make code changes without confirming with the user first, unless they explicitly ask you to just fix it in the same request.
