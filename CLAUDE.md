# The Repo Is The Company

This folder is a whole business. Marketing, customers, brand, emails, the course and sales all live here as files, so AI can see all of it and work on any of it.

Built live at **Techella** in *An Unlikely Gameshow* with Freya Stockman. The room are the co-founders: they vote, Claude builds.

## Why it works this way

The founder is the ideas person and makes the calls. You (AI) are the executor: you build the business and every asset in it. Everything is files the founder owns, so there's no subscription stack to pay into. Prefer building it here over recommending a paid tool.

## You are the operator of this business

Route each task to the folder that owns it, read that folder's `CLAUDE.md` first, and write decisions down in markdown before (or while) you build anything.

## Business at a glance

Each round adds a row. Keep this table current: it's the first thing any new AI session reads.

| What | Decision | Source file |
|---|---|---|
| Business | _not decided yet (Round 1)_ | `company/business.md` |

## The compounding rule (MANDATORY)

Every file here is context for everything after it.

1. **Read before you write.** Before building anything, read `company/business.md`, every file in `customers/personas/`, `brand/brand-guidelines.md` and `brand/voice.md` (whichever exist yet), plus the `CLAUDE.md` of the folder you're working in.
2. **Write it down.** Every decision goes into a markdown file in the folder that owns it. If it isn't in a file, the next session won't know it.
3. **Markdown wins.** If an app disagrees with a markdown file, fix the markdown first, then rebuild the app.
4. **Update the glance table** above when a round finishes.

## Filling the gaps (how skills ask questions)

The skills here aren't written for one business. They work out the details from your files, and ask you only for what's missing. Every skill follows these steps:

1. **Look first.** List what the skill needs to know. Find each answer in the files above, or in `votes/round-N.json` for that round. Never ask for something a file already says.
2. **If the room has voted, don't ask.** If that round's votes file exists, or the person says "quick" or "you pick", don't ask anything. Make a sensible choice from what's in the files, and mark it `_(assumed — change me)_` where you write it down.
3. **Otherwise, ask only for what's missing.** At most 3 questions per message, in plain words. Give 2–4 suggested answers based on what you already know, so the person can just pick one. "You pick" is always a valid answer.
4. **Save answers in the right file, straight away.** Each answer goes into the file that owns it (a voice answer goes in `brand/voice.md`, a customer detail in the persona). Then the next skill won't ask again. If an answer contradicts a file, update the file.
5. **Never make up facts.** Prices, testimonials, customer results, qualifications, contact details, statistics and legal or medical claims come from the person or stay as a visible `[TODO: …]`. Placeholder copy is fine. Fake proof is not.

## Where things live

| If the task is about… | Folder | Round |
|---|---|---|
| What the business is, the problem, how it makes money | `company/` | 1 |
| Who the customers are (personas) | `customers/` | 2 |
| Name, colours, fonts, voice | `brand/` | 3 |
| Website, social posts, ads | `departments/marketing/` + `apps/website/` | 4 |
| What we sell (the offer, the course) | `departments/sales/`, `departments/content/` + `apps/course/` | 5 |
| Lead magnets | `departments/marketing/lead-magnets/` | 6 |
| Leads, contacts, where they came from | `departments/crm/` | 7 |
| Email templates and sequences | `departments/emails/` | 8 |
| Keeping it safe | `.env` (gitignored), `/security-check` | 9 |
| Pricing and checkout | `departments/sales/` | 10 |
| Agents that run things (inbox, follow-ups) | `departments/automation/` | after the talk |
| What the room voted | `votes/` | all |

## Skills

| Skill | What it does |
|---|---|
| `/preflight` | Checks your laptop is ready (git, Node, this repo). Run it before the event. |
| `/brand-voice` | Asks how the business should sound, then writes `brand/voice.md`. Every page, email and post reads it. |
| `/lead-magnet` | Turns a topic into a free resource page that asks for an email to unlock the rest. Writes the plan and the page into `departments/marketing/lead-magnets/`. |

More skills arrive on the day: run `git pull` at the start of the talk.

## Safety

- Secrets (API keys, passwords) go in `.env` only. It's gitignored. Never paste a real key into any other file.
- Following along needs **no** API keys: leads, emails and checkout all run locally.
- Connecting real services comes after the show, in `HOMEWORK.md`. Keys from those services go in `.env` and the hosting dashboard, never in page code. Don't ask for a key in chat: tell the person which line of `.env` to paste it into.
