---
name: brand-voice
description: Work out how this business should sound (who's talking, personality, words to use and avoid, before/after examples) by reading the repo and asking the founder only what's missing, then write brand/voice.md for every page, email and post to follow. Use when the user says "brand voice", "tone of voice", "how should we sound", "voice guide", "make it sound like us", or invokes /brand-voice. Also run it when another skill needs a voice and brand/voice.md doesn't exist yet.
---

# Brand voice — how this business sounds

You're writing the voice guide every other skill reads before writing words: website, lead magnet, emails, posts, course. One file: `brand/voice.md`.

Follow **Filling the gaps** in the root `CLAUDE.md`: look first, ask only for what's missing, save answers straight away, never make up facts.

## 1. Look first

Read whichever of these exist:

- `company/case-file.md` — what the business does, for whom
- `customers/personas/*.md` — who's reading, the words they use, what worries them
- `brand/brand-guidelines.md` — name, vibe, any voice notes from Round 3
- `brand/voice.md` — if it exists, you're **updating** it, not starting again
- `votes/round-3.json` (brand vibe) and `votes/round-8.json` (email tone), if present

From those, fill in as much of the template below as you can. Note which parts are still blank.

## 2. The room has voted, or "quick"

If the votes cover tone, or the person says "quick" / "you pick": skip the interview. Base the voice on the vibe and tone votes, plus the main persona's situation. Mark guesses `_(assumed — change me)_`. Go to step 4.

## 3. Ask only for what's missing

At most 3 questions per message. Give 2–4 suggested answers for each, based on what you've read. Skip any question the files already answer.

**Round A — who's talking**
- Is it one person ("I", with a name) or a team ("we")? Or "we" by default, with "I" for personal stories?
- Who's reading? Confirm the main persona in one line, and how much they already know about the topic.

**Round B — the feel**
- Pick 3 traits, or name your own: *warm, blunt, calm, playful, expert, discreet, cheeky, reassuring, no-nonsense.* For each one, ask what it should **not** tip into (warm, not gushing; blunt, not rude).
- How formal is it, from 1 to 5? 1 = texting a friend, 5 = a letter from a lawyer.
- Is there a brand or person you'd love to sound like, and one you'd hate to?

**Round C — words**
- Words or phrases you love, or that your customers actually use?
- Words you never want to see?
- Anything sensitive? Topics to handle gently, never joke about, or never promise.

**Best signal, always offer it:** "Got something you've written that sounds like you? An email, a post, a voice note transcript. Paste it and I'll copy the patterns." If they paste something, take the rhythm, sentence length and favourite words from it. Don't take its facts.

## 4. Draft, test, adjust

1. Write `brand/voice.md` using the template below.
2. Show the person **3 sample lines** in the new voice: a website headline, an email opening line, a social post hook. Base them on the real business.
3. Ask: "More like this, or less like this? What would you change?" Adjust the file from their answer. One round is usually enough. Stop when they're happy, or after they say "you pick".

## 5. Connect it

- If `brand/brand-guidelines.md` exists, make sure its voice section is a short summary (3 traits + the formality level) that ends with `Full guide: brand/voice.md`. Don't keep two full copies that can disagree.
- Add or update the **Voice** row in the root `CLAUDE.md` "Business at a glance" table: the 3 traits, with source `brand/voice.md`.

## Template — `brand/voice.md`

```markdown
# Voice — {business name}

**In one line:** {e.g. "A calm expert friend who's seen it all and won't judge you."}

## Who's talking
- {I / we / we by default, I for personal stories} — {name, if it's a person}
- Speaking to: {main persona in one line} → `customers/personas/{file}.md`
- Reading level: {e.g. "age 13: short sentences, common words, active voice"}

## Personality
| We are | But never |
|---|---|
| {trait} | {what it shouldn't tip into} |
| {trait} | {…} |
| {trait} | {…} |

Formality: {1–5} — {what that means in practice}

## How we write
- {sentence length and rhythm}
- {structure, e.g. "name the worry before offering the fix"}
- {formatting: emoji? exclamation marks? headings? contractions?}

## Words we use
{list, including the customer's own words from the personas}

## Words we avoid
**Ours:** {the founder's never-list}

**AI tells (default — delete any you actually like):** "It's not X, it's Y" · "Here's the thing" · "isn't just X anymore" · "in today's fast-paced world" · unlock · leverage · supercharge · seamless · robust · empower · delve · game-changer · dramatic one-word sentences · stacked em-dashes · a punchy one-liner to end every paragraph.

## Handle with care
{sensitive topics, what we never promise, what we never joke about}

## Say it like this
| Not this | This |
|---|---|
| {generic line} | {same idea in our voice} |
| {…} | {…} |
| {…} | {…} |

## By channel
- **Website:** {e.g. "plainest version, value in 5 seconds"}
- **Emails:** {…}
- **Social posts:** {…}
- **Lead magnets and the course:** {e.g. "teach something real, scannable sections"}
```

## Rules

- Keep the voice true to the **customer's situation** from the personas. A business for people going through something hard should sound steady and kind, even if the founder voted "cheeky".
- Write the guide in its own voice: if the voice is plain, the file is plain.
- Examples in "Say it like this" must be about **this** business, not generic marketing.
- Don't invent the founder's backstory, credentials or customer quotes. Ask, or leave `[TODO: …]`.
- Finish with one line: what file you wrote, and "Every page, email and post will now follow it."
