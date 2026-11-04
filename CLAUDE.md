# The Repo Is The Company

This folder is a whole business. Marketing, customers, brand, emails, the course and sales all live here as files, so AI can see all of it and work on any of it.

Built live at **DISCOTECH** in *An Unlikely Gameshow* with Freya Stockman. The room are the co-founders: they vote, Claude builds.

## Why it works this way

The founder is the ideas person and makes the calls. You (AI) are the executor: you build the business and every asset in it. Everything is files the founder owns, so there's no subscription stack to pay into. Prefer building it here over recommending a paid tool.

## You are the operator of this business

Route each task to the folder that owns it, read that folder's `CLAUDE.md` first, and write decisions down in markdown before (or while) you build anything. During a round skill, read only what the skill lists.

## Business at a glance

The homework keeps this table current. Round skills leave it alone, and write to their own files.

| What | Decision | Source file |
|---|---|---|
| Business | See `company/business.md` once Round 1 is done | `company/business.md` |

## The compounding rule (MANDATORY)

Every file here is context for everything after it. Write decisions into the markdown file that owns them, and read before you build. If it isn't in a file, the next chat won't know it. If a page disagrees with a markdown file, fix the markdown first, then the page.

## How round skills work

Every round skill follows these steps, in this order. They exist so nobody can get lost.

0. **Get to the right folder, before anything else.** Run `git rev-parse --show-toplevel`, then check that folder contains `scripts/preview.mjs`. That top folder is the DISCOTECH folder, whatever it's called on this laptop. If the chat started in a subfolder, `cd` to it and say in one line: "Moved to your DISCOTECH folder." Every path below starts from there. If it isn't a git folder but `scripts/preview.mjs` is here, carry on from here. Otherwise say: "This chat isn't in your DISCOTECH folder. Start a new chat and choose that folder." Then stop, and write nothing.
1. **Ask one question.** Use the skill's exact wording, then stop and wait. Don't read, write or plan first unless the skill says to. If their message already answers it, skip the question. If they say "you pick", choose sensibly and mark it `_(assumed)_`.
2. **Read only the listed files.** Start your next message with `Reading: ` and their short names. If a file is missing, say so in one line, make a sensible assumption from their answer, mark it `_(assumed)_` and carry on. Never stop to send them back.
3. **Write only the listed files, to the exact paths.** Ignore any other location or file name they suggest. Create a missing folder. Running a skill again overwrites its own files, with no `-v2` copies. Don't change anything else, including this file.
4. **Keep it simple and local.** No web browsing, installs, build tools, accounts or API keys during a round. The only git commands are the read-only ones in step 0 and `/security-check`.
5. **Update the home page.** Run `node scripts/preview.mjs --ensure`. It prints the address and opens the browser the first time. Pages then refresh themselves, so never tell people to refresh or open files. If it prints `PREVIEW_FAILED`, give them the file path to open instead.
6. **Check your work.** Confirm every listed file exists. Write any that's missing.
7. **Finish in exactly this format,** then stop:

```
**You told me:** {their answer, in a few words}
**I read:** {short file names, or "nothing yet"}
**I made:** {each path, with a few plain words on what it is}
**See it:** {the home page address, plus anything the skill's Finish section says to point out}

{the skill's "Your question"}

**Next:** when the next round starts, open a new chat in this folder and run {the skill's "Next round"}.
```

If they answer your question, make the change in the same files, then repeat the format.

**Never make up facts.** Testimonials, customer results, qualifications, contact details, statistics, and legal or medical claims come from the person or get left out. Sample data is always labelled as sample.

## Where things live

| Round | Skill | Folder |
|---|---|---|
| 1 Problem | `/pain-point` | `company/`, `customers/personas/` |
| 2 Product | `/product` | `departments/sales/`, `products/` |
| 3 Price | `/pricing` | `departments/sales/` |
| 4 Name + brand | `/brand-kit` | `brand/` |
| 5 Lead Magnet | `/lead-magnet` | `departments/marketing/`, `products/website/` |
| 6 CRM | `/crm-setup` | `departments/crm/`, `products/crm/` |
| 7 Emails | `/email-sequence` | `departments/emails/sequences/` |
| 8 Security | `/security-check` | Writes nothing |

Everything people make appears on the home page, `node scripts/preview.mjs --ensure`, usually `http://localhost:3000`. Agents that run things (inbox, follow-ups) go in `departments/automation/` after the talk.

## Other skills

| Skill | What it does |
|---|---|
| `/preflight` | Checks your laptop is ready (git, Node, this repo). Run it before the event. |
| `/brand-voice` | For after the workshop: a longer interview about your real business, written to `brand/voice.md`. |

## The activity guide

`activity-guide.html` in the root of this folder has the copy-paste prompt for every round. When the person asks to open the activity guide, open that file in their default browser: `open activity-guide.html` on Mac, `start activity-guide.html` on Windows. Then tell them to keep it next to Claude. Don't run its prompts or change the file unless they ask.

## Safety

- Secrets (API keys, passwords) go in `.env` only. It's gitignored. Never paste a real key into any other file.
- Following along needs **no** API keys or accounts: everything runs on this laptop, with sample data and pretend actions.
- Connecting real services comes after the show, in `HOMEWORK.md`. When the person asks about the homework or what to do after the workshop, read that file and follow its "Claude: how to walk someone through this" section. Keys from those services go in `.env` and the hosting dashboard, never in page code. Don't ask for a key in chat: tell the person which line of `.env` to paste it into.
