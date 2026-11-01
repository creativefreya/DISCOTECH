---
name: lead-magnet
description: Turn a topic into a free resource page (checklist, template, question bank, guide) for this business. Teaser up top, email form to unlock the rest, every signup tagged with where it came from. Uses the business's own brand, voice and personas, and asks only for what's missing. Use when the user says "lead magnet", "free resource", "freebie", "opt-in page", "gated guide", or invokes /lead-magnet. Round 6 "The Bait" at the gameshow.
---

# Lead magnet — the bait

A lead magnet is something useful you give away in exchange for an email: a checklist, a template, a quiz, a short guide. The visitor gets real value. The business gets a lead, and knows which page it came from.

Follow **Filling the gaps** in the root `CLAUDE.md`: look first, ask only for what's missing, save answers straight away, never make up facts.

## What you'll make

| File | What |
|---|---|
| `departments/marketing/lead-magnets/{slug}.md` | The plan: who it's for, what it promises, the sections, the call to action |
| `departments/marketing/lead-magnets/{slug}.html` | The page: one self-contained HTML file, built from `template.html` in this skill's folder |

`{slug}` is the short title in lowercase with dashes (e.g. `plant-rescue-checklist`). Already have a lead magnet? Ask whether to replace it or add a new one next to it.

## 1. Look first

Read whichever exist:

- `company/case-file.md` — what we sell, and what we want leads to do next
- `customers/personas/*.md` — who it's for, what keeps them up at 2am, the words they use
- `brand/voice.md` — how to write. If it's missing, use the voice notes in `brand-guidelines.md`
- `brand/brand-guidelines.md` + `brand/design-tokens.json` — name, colours, fonts
- `departments/marketing/website.md` — the headline and promise, so the two pages match
- `departments/crm/CLAUDE.md` — whether there's a lead endpoint yet (Round 7)
- `votes/round-6.json` — the format the room picked

## 2. Fill the gaps

What you need, and where it usually comes from:

| Need | Usually from | If missing, ask |
|---|---|---|
| Who it's for | the client persona | "Which customer is this for?" (offer the personas you found) |
| Topic and format | `votes/round-6.json` | Suggest 3 ideas based on the persona's 2am worry, each in a different format: checklist / template / question bank / quiz / short guide. Let them pick. |
| The one promise | the case file + persona | "After using this, they'll be able to ___." Suggest 2 options. |
| Next step after reading | the case file / offer | "Where should readers go next: book a call, visit the website, or buy something?" plus the link. If there's no link yet, use `../../../apps/website/index.html`, or `#` with a `[TODO: link]`. |
| Brand and voice | brand files | If neither exists: offer to run `/brand-voice` quickly, or carry on with the neutral template and say so. |

If the room has voted (`votes/round-6.json` exists), or the person says "quick": don't ask. Pick from the files, then go to step 3.

## 3. Write the plan

Write `departments/marketing/lead-magnets/{slug}.md`:

```markdown
# Lead magnet — {title}

- **For:** {persona} → `customers/personas/{file}.md`
- **Their worry:** {the 2am worry, in their own words}
- **Promise:** after this, they can {outcome}
- **Format:** {checklist / template / …}
- **Slug:** {short-url-name}  ·  **Source tag:** `lead-magnet:{slug}`
- **Next step (CTA):** {what they do after reading} → {link}

## Sections
1. {name} — {one line} ← teaser (shown before the email form)
2. …

## Decisions
- {anything assumed, marked _(assumed — change me)_}
```

If you asked questions in step 2, show the section list and get a quick yes before building. Otherwise keep going.

## 4. Build the page

1. Copy `.claude/skills/lead-magnet/template.html` to the output path.
2. **Brand.** Set the `:root` variables from `design-tokens.json`. Map whatever names it uses onto `--bg`, `--surface`, `--text`, `--muted`, `--border`, `--accent`, `--accent-text`, `--font-heading`, `--font-body`. Add the Google Fonts `<link>` if the brand uses web fonts. If there are no tokens yet, keep the neutral defaults. Don't add colours anywhere else in the CSS.
3. **Fill every `{{…}}`.** Write the copy in the voice from `voice.md`, using the persona's own words.
   - **Intro:** 2–3 short paragraphs. Their worry → why it matters → what this resource does about it.
   - **Sections:** 3–6, each scannable. Use the `.items` list for checklists and question banks. Use plain paragraphs or numbered steps for guides. Section 1 goes in **both** the teaser and the unlocked content.
   - **Gate:** the title says what they unlock. The button says what they get ("Send me the checklist"), not "Submit". Fine print: "No spam. Unsubscribe any time."
   - **CTA:** one next step, matching the case file's offer.
   - **Footer:** business name, plus the tagline from the brand guidelines if there is one.
4. Set `SLUG` in the script. If `departments/crm/CLAUDE.md` gives a lead endpoint, set `LEAD_ENDPOINT` too. Otherwise leave it empty: leads stay in the browser until `/crm-connect`.
5. Delete the template's HTML comments once filled. No `{{` should be left: check with `grep -n '{{' <file>`.

## 5. Check it

- Open the file in a browser (`open departments/marketing/lead-magnets/{slug}.html` on Mac). Check the teaser fades out, the form unlocks the content, and a refresh keeps it unlocked.
- Narrow the window to phone width. Nothing should scroll sideways.
- Update the root `CLAUDE.md` "Business at a glance" table: **Lead magnet** → title + format, source `departments/marketing/lead-magnets/{slug}.md`.
- Finish with one line: the page path, and what happens to signups (kept in the browser for now, or sent to the CRM).

## Rules

- **Real value before the email form.** The teaser must be useful on its own, not just a tease.
- **Never invent proof.** No made-up statistics, testimonials, client stories or "as seen in". Use the person's real ones, or leave them out.
- **Topics that touch the law, health or money** (surveillance, custody, debt, medication…): keep it general, avoid promising outcomes, and add one plain line in a `.note`: "General information, not legal advice. Rules differ by location. Check with a professional." Adjust the wording to the topic.
- **The form never blocks the reader.** It unlocks even if saving fails.
- **Every signup carries its source** (`lead-magnet:{slug}` plus any `utm_*` from the URL). That's how the CRM knows which page earned the lead.
- **One self-contained file:** CSS inline, no build step, no external scripts, no API keys.
- Buttons are one flat brand colour. Readable contrast between `--accent` and `--accent-text`.
