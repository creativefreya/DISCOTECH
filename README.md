# An Unlikely Gameshow — build a business in under 90 minutes with AI

Starter repo for Freya Stockman's talk at **DISCOTECH**. The room picks a business, votes on every big decision, and Claude Code builds it live: problem → product → price → name and brand → lead magnet → CRM → emails → security.

> 🎁 **A gift from Freya, workshop or not.** You don't need a DISCOTECH ticket to use this. Clone it, build your own business in it, and make it yours.

Coming to the talk? You can just watch and vote on your phone, or build along. Not coming? This repo is everything you need to do it at home: open it in Claude Code and ask *"read CLAUDE.md and help me start Round 1 for my own business idea"*. Each round's skill gets added after the event, so `git pull` later to play the whole gameshow yourself.

Step-by-step setup page: [augmenteddesigner.com/resources/discotech-gameshow](https://augmenteddesigner.com/resources/discotech-gameshow/)

## Before the event

Follow [PREP.md](PREP.md), then open this folder in Claude Code and type:

```
/preflight
```

Green ticks = you're ready.

## On the day

```bash
git pull
```

This gets the round skills. Then each round is one skill and one question, and everything you make appears at `localhost:3000`.

## Why this exists

With AI as your executor, you get to be the wacky ideas person. You make the calls; Claude Code builds the business and every asset in it.

And because it's all files you own, you stop paying to play: no stack of subscriptions for a website builder, CRM, email tool and course platform. Use Claude Code to build it, and once you own the assets, the business runs cheap.

## The idea: the repo is the company

Most small businesses run on 8+ disconnected apps. None of them know about each other, so AI can't see the whole business either.

Here, every department is a folder. Every decision is a markdown file. Each round reads the files before it, so the business **compounds**: by the time we write the welcome emails, Claude already knows the customer's 2am worry, the brand voice and the lead magnet they downloaded.

## Round → file map

| Round | Name | Skill | Writes |
|---|---|---|---|
| 1 | Problem | `/pain-point` | `company/business.md`, `customers/personas/customer.md` |
| 2 | Product | `/product` | `departments/sales/offer.md`, `products/product-plan.md`, `products/product/` |
| 3 | Price | `/pricing` | Updates `departments/sales/offer.md` and the product page |
| 4 | Name + brand | `/brand-kit` | `brand/brand.md`, `brand/brand.css` |
| 5 | Lead Magnet | `/lead-magnet` | `departments/marketing/lead-magnet.md`, `products/website/` |
| 6 | CRM | `/crm-setup` | `departments/crm/crm.md`, `products/crm/` |
| 7 | Emails | `/email-sequence` | `departments/emails/sequences/` |
| 8 | Security | `/security-check` | A report in the chat |

## Folder structure

```
CLAUDE.md            ← the business's memory: AI reads this first
TODO.md              ← what's next, for everyone
company/             ← what the business is (Round 1)
customers/           ← who we serve (Round 1)
brand/               ← how we look and sound (Round 4)
departments/
  sales/             ← the offer and price (Rounds 2 and 3)
  marketing/         ← the lead magnet (Round 5)
  crm/               ← the CRM and backend plan (Round 6)
  emails/            ← nurture and onboarding emails (Round 7)
  content/           ← course material, after the talk
  automation/        ← agents that run it, after the talk
products/            ← the pages people see (Rounds 2, 5 and 6)
scripts/             ← the home page and the laptop check
```

## After the show: homework

Everything you build in the gameshow runs on your laptop. [HOMEWORK.md](HOMEWORK.md) reviews what you've built, makes a private copy of this repo for your personal use, then connects it to the real world: hosting (Netlify), your own domain, a database (Neon), emails (Resend) and payments (Stripe). Open this folder in Claude Code and paste:

```
Read HOMEWORK.md and walk me through it, one step at a time.
```

## Want to take it further?

- **Got a business or an idea you want to run with AI?** [Book a free intro call with Freya](https://calendar.app.google/4KvK9MxbF5WkVN3g8). Talk it through and see a demo of the Company OS web app.
- **Want agents to run it for you?** That's the next step after today: see the end of the talk.
