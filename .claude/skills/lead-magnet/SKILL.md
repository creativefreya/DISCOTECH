---
name: lead-magnet
description: Round 5. Asks what free gift to offer, then builds one page with one goal, swapping that gift for an email address. Use when the user invokes /lead-magnet or wants a free gift, freebie or sign-up page.
argument-hint: "[the free gift]"
---

**First, run step 0 of How round skills work in the root `CLAUDE.md`: get to the DISCOTECH folder.** Then follow the rest of those steps.

## Ask

If the person hasn't already said, ask exactly this and stop until they answer:

> **What's the free gift, and what's it about?**
> Checklist, template, quiz or mini-guide. Type what the room picked, or your own. For example: a checklist of what every good speech covers.

## Read

`customers/personas/customer.md`, `departments/sales/offer.md`, `brand/brand.md`, `products/shared/base.css` (the page parts you can use)

## Write

**`departments/marketing/lead-magnet.md`** (under 30 lines): `# The lead magnet`, then the gift's title and format, who it's for, the promise, and the gift's full content. End with `Source: lead-magnet` and `Form: not added yet (Round 6)`.

**`products/website/index.html`:** one page with one goal. Link `../../brand/brand.css`, then `../shared/base.css`, and put `<script src="../shared/lead-form.js"></script>` before `</body>`. Never set colours or fonts. Write in the voice from `brand.md`. Use this structure:

1. **Hero:** who it's for, their problem in their words, what the gift does, and `<a class="btn" href="#get" data-get-gift>Get it free</a>`. One button only, with no other navigation.
2. **What's inside:** 3 short points, so the page is useful before anyone signs up.
3. `<section id="get" data-hide-after><!-- FORM GOES HERE: Round 6 --></section>`
4. `<section data-gift>`: the gift itself, fully written and working. A quiz needs 3 questions and a result, using a small inline script. After the gift, add "Want the real thing?" with the offer, the price from `offer.md`, and a link to `../product/`.

Never invent testimonials or statistics. For anything touching law, health or money, add one plain line saying this is general information, not professional advice.

## Finish

Tell them to click "Get it free" to see the gift, and that Round 6 adds the email form.

**Your question:** "Would your customer swap their email for this? Want a stronger headline, or say 'looks good'."
**Next round:** `/crm-setup`
