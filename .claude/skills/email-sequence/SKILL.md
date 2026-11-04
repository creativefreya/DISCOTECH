---
name: email-sequence
description: Round 7. Asks for a subject line and a new customer's first step, then writes nurture and onboarding emails and previews them locally. Nothing is sent. Use when the user invokes /email-sequence or wants welcome, nurture or onboarding emails.
argument-hint: "[subject line]"
---

**First, run step 0 of How round skills work in the root `CLAUDE.md`: get to the DISCOTECH folder.** Then follow the rest of those steps.

## Read first, because the question uses it

`customers/personas/customer.md`, `departments/sales/offer.md`, `brand/brand.md`, `departments/marketing/lead-magnet.md`, `departments/crm/crm.md`

## Ask

Write 3 subject lines for the first email, in the brand voice. Ask exactly this, with yours filled in, and stop until they answer:

> **Two quick choices:**
> 1. Which subject line for your first email? Type what the room picked, or choose: {three options}. Or write your own.
> 2. What's the first thing a new customer should do after buying?

## Write

**`departments/emails/sequences/sequence.md`:** `# Email sequence`, then 5 emails. For each, give the subject, preview text, trigger, timing and body (under 120 words), in the brand voice:

| # | Journey | Trigger | Purpose |
|---|---|---|---|
| 1 | Nurture | Stage becomes `Lead` (send straight away) | Deliver the gift, using the chosen subject line |
| 2 | Nurture | 2 days later | One genuinely useful tip |
| 3 | Nurture | 4 days later | The offer, with its price, and a link to the product |
| 4 | Onboarding | Stage becomes `Customer` (send straight away) | Welcome, and what happens next |
| 5 | Onboarding | 2 days later | Their first win: the step they just gave you |

Use `{{first_name}}` in the greeting. Never invent testimonials, statistics or discounts.

**`departments/emails/sequences/preview.html`:** link `../../../brand/brand.css` and `../../../products/shared/base.css`. Include a heading, this exact note, then each email in `<article class="email">` with `<div class="email__meta">` showing the subject, trigger and timing. Group them under "After they sign up" and "After they buy". Replace `{{first_name}}` with a sample name.

```html
<p class="note">These are previews on your laptop. Nothing has been sent. The homework connects Resend to send them.</p>
```

## Finish

**Your question:** "Which email would you open first? Want any shorter or warmer, or say 'looks good'."
**Next round:** `/security-check`
