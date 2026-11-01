# An Unlikely Gameshow — build a business in under 90 minutes with AI

Starter repo for Freya Stockman's talk at **Techella**. The room picks a business, votes on every big decision, and Claude Code builds it live: pain point → customers → brand → website → product → lead magnet → CRM → emails → security → checkout.

> 🎁 **A gift from Freya, workshop or not.** You don't need a Techella ticket to use this. Clone it, build your own business in it, and make it yours.

Coming to the talk? You can just watch and vote on your phone, or build along. Not coming? This repo is everything you need to do it at home: open it in Claude Code and ask *"read CLAUDE.md and help me start Round 1 for my own business idea"*. Each round's skill gets added after the event, so `git pull` later to play the whole gameshow yourself.

Step-by-step setup page: [augmenteddesigner.com/resources/techella-gameshow](https://augmenteddesigner.com/resources/techella-gameshow/)

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

This gets the round skills and the room's votes as they happen.

## Why this exists

With AI as your executor, you get to be the wacky ideas person. You make the calls; Claude Code builds the business and every asset in it.

And because it's all files you own, you stop paying to play: no stack of subscriptions for a website builder, CRM, email tool and course platform. Use Claude Code to build it, and once you own the assets, the business runs cheap.

## The idea: the repo is the company

Most small businesses run on 8+ disconnected apps. None of them know about each other, so AI can't see the whole business either.

Here, every department is a folder. Every decision is a markdown file. Each round reads the files before it, so the business **compounds**: by the time we write the welcome emails, Claude already knows the customer's 2am worry, the brand voice and the lead magnet they downloaded.

## Round → file map

| Round | Name | Skill | Writes |
|---|---|---|---|
| 1 | The Problem | `/pain-point` + `/customer-profile` | `company/business.md`, `customers/personas/customer.md` (+ `referral-partner.md`, `student.md`) |
| 2 | Something to Sell | `/course-platform` | `departments/sales/offer.md`, `products/product.md` (+ `departments/content/`, `products/course/` if it's a course) |
| 3 | Name That Brand | `/brand-kit` + `/brand-voice` | `brand/brand-guidelines.md`, `design-tokens.json`, `voice.md` |
| 4 | Front Door | `/landing-page` | `departments/marketing/website.md`, `products/website/` |
| 5 | The Bait | `/lead-magnet` | `departments/marketing/lead-magnets/` |
| 6 | The Little Black Book | `/crm-connect` | `departments/crm/leads.csv` |
| 7 | You've Got Mail | `/email-sequence` | `departments/emails/welcome-sequence/` |
| 8 | Don't Get Robbed | `/security-check` | a report (nothing to commit) |
| 9 | Show Me the Money | `/checkout` | the price in `departments/sales/offer.md`, buy button on the website |

Skills for the rounds land on the day via `git pull`.

## Folder structure

```
CLAUDE.md            ← the business's memory: AI reads this first
TODO.md              ← what's next, for everyone
company/             ← what the business is (Round 1)
customers/           ← who we serve: personas/ (Round 1)
brand/               ← how we look and sound (Round 3)
departments/
  marketing/         ← website plan (Round 4), lead-magnets/ (Round 5)
  sales/             ← the offer (Round 2) and price (Round 9)
  content/           ← the course, if that's the product (Round 2)
  crm/               ← every lead, and where they came from (Round 6)
  emails/            ← what we send (Round 7)
  automation/        ← agents that run it, after the talk
products/            ← what we make and sell (Round 2), and the pages people see: website/, course/
votes/               ← what the room voted, per round
```

## After the show: homework

Everything you build in the gameshow runs on your laptop. [HOMEWORK.md](HOMEWORK.md) connects it to the real world: hosting (Netlify or Cloudflare), a database (Neon), emails (Resend) and payments (Stripe).

## Want to take it further?

- **Got a business or an idea you want to run with AI?** [Book a free intro call with Freya](https://calendar.app.google/4KvK9MxbF5WkVN3g8). Talk it through and see a demo of the Company OS web app.
- **Want agents to run it for you?** That's the next step after today: see the end of the talk.
