---
name: crm-setup
description: Round 6. Plans the sign-up form and backend, adds the working form to the Lead Magnet page, and builds a local CRM mockup with dummy data. No database today. Use when the user invokes /crm-setup or wants to plan the CRM or sign-up form.
---

**First, run step 0 of How round skills work in the root `CLAUDE.md`: get to the DISCOTECH folder.** Then follow the rest of those steps.

## Read first, because the question uses it

`customers/personas/customer.md`, `departments/sales/offer.md`, `departments/marketing/lead-magnet.md`

## Ask

Suggest one optional question that would help sell to this customer. Ask exactly this, with your suggestion filled in, and stop until they answer:

> **What should we collect on the sign-up form?** We'll always ask for first name and email.
> 1. Extra question: "{your suggestion}". Keep it, change it, or say "skip" (fewer questions usually means more sign-ups).
> 2. Where will people mostly find this page? LinkedIn, Instagram, friends, or somewhere else.

## Write

**`departments/crm/crm.md`** (under 40 lines): `# The CRM`, then:
- **Form fields:** `first_name`, `email`, and the extra question if kept.
- **Added automatically:** `source` (their main answer as one lowercase word, e.g. `linkedin`), `stage`, `date`.
- **Stages:** `Lead` when they sign up, `Signed up` when they take the next step, `Customer` when they pay.
- **Backend plan: not built today.** Plain steps for after the workshop: a Neon database table with these columns, a small server function that receives the form, the connection string kept in `.env`, then replacing the browser saving in `products/shared/lead-form.js`.

**`products/website/index.html`:** in `#get`, replace the comment with a heading and:

```html
<form class="form" data-lead-form data-source="{source}">
  <label class="field">First name <input name="first_name" required autocomplete="given-name"></label>
  <label class="field">Email <input name="email" type="email" required autocomplete="email"></label>
  <button class="btn" type="submit">Send me the {gift}</button>
</form>
```

Add the extra question as another `.field`, not required, named in lowercase with underscores. Just after the `#get` section add `<p class="note" data-saved-row hidden></p>`. In `lead-magnet.md`, change those lines to `Source: {source}` and `Form: {the field names}`.

**`products/crm/dummy-data.js`:** `window.DUMMY_LEADS = [...]` with exactly 8 invented leads that fit this customer. Use the same fields as the form plus `source`, `stage`, `date`, with a mix of sources and stages. Emails must end in `@example.com`. Use names that are different from the customer's name in `customer.md`.

**`products/crm/index.html`:** link `../../brand/brand.css` and `../shared/base.css`. Include a heading, this exact note, a table and these scripts:

```html
<p class="note">Sample data: these people aren't real. Today this is a mockup on your laptop, and the homework connects a real database.</p>
<p class="muted" id="crm-count"></p>
<div class="table-wrap"><table class="table"><thead id="crm-head"></thead><tbody id="crm-body"></tbody></table></div>
<p><button class="btn btn--ghost" id="crm-clear" hidden>Clear my test sign-ups</button></p>
<script src="dummy-data.js"></script>
<script src="../shared/crm.js"></script>
```

## Finish

**Your question:** "Try the form on your Lead Magnet page with your own name. Did you appear in the CRM? Want to change a field or a stage, or say 'looks good'."
**Next round:** `/email-sequence`
