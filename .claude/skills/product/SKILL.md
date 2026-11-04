---
name: product
description: Round 2. Asks what the business sells, writes the offer and a step-by-step plan, then builds the customer-facing pages while the person moves on. Works for any product or service. Use when the user invokes /product or wants to plan and build what they sell.
argument-hint: "[what we sell]"
---

**First, run step 0 of How round skills work in the root `CLAUDE.md`: get to the DISCOTECH folder.** Then follow the rest of those steps. This works for anything: a service, coaching, a course, a template, a membership, a physical product. Never ask what kind it is. Work it out.

## Ask

If the person hasn't already said, ask exactly this and stop until they answer:

> **What do we sell them, and what should they walk away with?**
> Type what the room picked, or your own idea. For example: a fill-in-the-blanks speech template, so they walk away with a speech they're proud of.

## Read

`company/business.md`, `customers/personas/customer.md`

## Write the plan first

**`departments/sales/offer.md`** (under 30 lines): `# The offer`, then what it is, who it's for, the result they get, and what's included. Write `Price: not set yet` for now.

**`products/product-plan.md`** with exactly these headings:

```markdown
# Product plan
## What they get
## How they get it
## What the customer does, step by step
## Screens to build (3 at most)
## Build checklist
- [ ] ...
```

Choose screens from what this product needs. The first is always `products/product/index.html`, the page that explains and sells it. Others go beside it as `step-2.html` and `step-3.html`. For example: choosing a time slot for coaching, a lesson for a course, or the template itself.

## Tell them to move on

Say exactly this, then keep working without waiting for a reply:

> Your offer and plan are saved. **I'll keep building your pages here.** When Freya starts the next round, open a new chat for it.

## Build

Work through the checklist, one screen at a time, ticking each item in `products/product-plan.md` as you finish it. Start the home page first (see the root `CLAUDE.md`).

Page rules:
- Plain HTML with `<link rel="stylesheet" href="../../brand/brand.css">` then `<link rel="stylesheet" href="../shared/base.css">`. Use the classes in `base.css`, with a small `<style>` block only for layout. Never set colours or fonts: `brand.css` owns those.
- Put the price in `<span data-price>`, and fill it from `offer.md`.
- Bookings, payments, logins and downloads are pretend. They show a message that says this part connects after the workshop. Never collect real payment details.
- Write real, useful content, not placeholder text. Before finishing, read `offer.md` again in case a price has been set, and update `data-price`.

## Finish

**Your question:** "Would you buy this? Tell me which screen feels least clear and I'll fix it, or say 'looks good'."
**Next round:** `/pricing`
