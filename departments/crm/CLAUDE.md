# CRM — the little black book

**Filled in by:** Round 6 "The Little Black Book" (`/crm-connect`)
**Status:** empty until Round 6

One record per person, from first form fill to paying customer. Every form on every page writes here, with where they came from (`source`).

| Reads from | Feeds into |
|---|---|
| Forms on `apps/landing/` and `apps/lead-magnet/`, personas (for the `source` / segment fields) | Emails, sales |

## Files (after Round 6)

- This file gets the schema (what we store about each lead) and how leads flow in
- Following along at home: leads are stored locally, no database account needed

## How forms connect

Every lead form sends one JSON object: `name`, `email`, `source` (e.g. `lead-magnet:{slug}`), `utm_source`, `utm_medium`, `utm_campaign`, `created_at`. Until Round 6 each page keeps its leads in the browser. `/crm-connect` writes the lead endpoint URL here and sets `LEAD_ENDPOINT` in each page's script.
