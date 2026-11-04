# CRM — the little black book

**Filled in by:** Round 6 "The Little Black Book" (`/crm-connect`)
**Status:** empty until Round 6

One record per person, from first form fill to paying customer. Every form on every page writes here, with where they came from (`source`).

| Reads from | Feeds into |
|---|---|
| Forms on `products/website/` and `departments/marketing/lead-magnets/`, personas (for the `source` / segment fields) | Emails, sales |

## Files (after Round 6)

- `leads.csv` — one row per lead: who signed up, and from where. **Stays on this computer**: it's gitignored, because it holds real people's names and emails. Create it from `leads.example.csv` (the column headings). Never commit it, and never copy lead details into a tracked file
- `leads.example.csv` — the column headings only, committed so everyone's leads file has the same shape
- `sequences.md` — which leads get which emails
- This file gets the schema (what we store about each lead) and how leads flow in
- Following along at home: leads are stored locally, no database account needed

## Stage

How far along each person is: `Lead` when they sign up, `Signed up` when they've taken the next step, `Customer` when they've paid. Forms don't send it: new rows start at `Lead`.

## How forms connect

Every lead form sends one JSON object: `name`, `email`, `source` (e.g. `lead-magnet:{slug}`), `utm_source`, `utm_medium`, `utm_campaign`, `created_at`. Until Round 6 each page keeps its leads in the browser. `/crm-connect` writes the lead endpoint URL here and sets `LEAD_ENDPOINT` in each page's script.
