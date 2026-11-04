---
name: pricing
description: Round 3. Asks what to charge, then adds the price and a value comparison to the offer and the product page. No real payments. Use when the user invokes /pricing or wants to set a price.
argument-hint: "[price]"
---

**First, run step 0 of How round skills work in the root `CLAUDE.md`: get to the DISCOTECH folder.** Then follow the rest of those steps.

## Ask

If the person hasn't already said, ask exactly this and stop until they answer:

> **What do we charge?** $29, $299, $1,500, or your own price. Type what the room picked, or your own.

## Read

`departments/sales/offer.md`, `customers/personas/customer.md`

## Write

Replace `Price: not set yet` in **`departments/sales/offer.md`** with a section headed exactly `## Price`: the price, one line on why it suits this customer, and a short comparison of what they'd otherwise pay or do. Comparison figures are rough and labelled `(rough estimate)`. Never invent reviews, results or real competitors' prices.

Then update the text inside every `data-price` element in `products/product/`, and add a one-line comparison below the price on `index.html`. If those pages don't exist yet, only change `offer.md`: `/product` reads the price before it finishes.

Taking real money comes after the workshop. Don't add a Stripe link or real payment step.

## Finish

**Your question:** "Does this feel like good value next to the alternatives? Want to try a different price, or say 'looks good'."
**Next round:** `/brand-kit`
