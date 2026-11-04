# CRM: who's signed up

**Filled in by:** Round 6 (`/crm-setup`)

One record per person, from first sign-up to paying customer, with where they came from (`source`).

| Reads from | Feeds into |
|---|---|
| Customer, offer, lead magnet | Emails |

## Files

- `crm.md`: form fields, stages and the backend plan. The plan isn't built until the homework.
- `leads.example.csv`: the column names a real database or export would use.
- `leads.csv`, if you ever export one: **stays on this computer** (gitignored), because it holds real people's details.

The mockup is `products/crm/`. It shows sample data plus your own test sign-ups, which stay in your browser.

## Stage

`Lead` when they sign up, `Signed up` when they've taken the next step, `Customer` when they've paid.
