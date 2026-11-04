---
name: preflight
description: Check this laptop is ready for the DISCOTECH gameshow (Git, Node.js, this repo, GitHub connection) and help fix anything that isn't. Use when the user says "preflight", "am I ready", "check my setup", "is my laptop ready for the workshop", or invokes /preflight.
---

# Preflight — are you ready for the Gameshow?

The person running this may never have used a terminal. Be warm, plain-English, and brief. No jargon without a one-line explanation.

**Golden rule: check first, fix only when they say so.** Running the check is fine. Never install, change or fix anything until the person has said yes.

## 1. Run the check

From the repo root:

```bash
bash scripts/preflight.sh
```

If that fails because you're not in the repo, find the `DISCOTECH` folder, or `techella-unlikely-gameshow` if it was cloned before the rename (usually in Documents) and run it from there.

Also check whether this is a Mac or Windows (`uname -s`: `Darwin` = Mac). On a Mac, check whether Homebrew is installed (`command -v brew`). You'll need both for the fix commands.

## 2. Show the results

A short checklist, one line each, in plain English (e.g. "Node.js: installed", not "node v22.1.0 detected"):

- ✅ PASS · ⚠️ WARN · ❌ FAIL · ℹ️ INFO

All ✅ (ℹ️ is fine)? Go to step 5.

## 3. Ask how they want to fix it

List what needs fixing, one line each: what's wrong, and what the fix does. Then ask exactly this, and wait for the answer:

> **Want me to fix all of these for you?** Or I can give you one command at a time to run yourself.

If something needs their name or email (Git identity), ask for both in the same message. Never make them up.

## 4. Fix it, their way

### "Yes, fix them" → you run the fixes

- Go one at a time. Before each one, say in one line what you're about to do. Then run it, and say whether it worked.
- Some fixes open a pop-up or need their computer password (see the table). Run the command, then tell them exactly what to click. If a command needs a password, don't ask for it in chat. Switch to the one-at-a-time way for that step, so they type it into their own terminal.

### "One at a time" → they run each command

For each fix, in order:

1. One sentence on what it does.
2. The command on its own in a `bash` code block. One command per block, nothing else in it.
3. "Click the ▶ play button on the box to run it." (The Claude desktop app shows that button on command boxes. If they're using Claude Code in a terminal instead, say "copy it into your terminal and press Enter.")
4. Wait for them to say it's done, or ask what they see, before giving the next command.

### The fix for each problem

| Problem | Mac | Windows | Note |
|---|---|---|---|
| Git not installed | `xcode-select --install` | `winget install --id Git.Git -e` | Mac: an Apple pop-up opens. Click **Install** and wait 5–10 minutes. Windows: click **Yes** if asked. |
| Git doesn't know their name/email | `git config --global user.name "Their Name"` then `git config --global user.email "their@email.com"` | same | Two separate commands. Use their real answers. |
| Node.js missing or too old | Homebrew installed: `brew install node`. No Homebrew: run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh \| bash`, then close and reopen Claude Code, then run `nvm install --lts` | `winget install --id OpenJS.NodeJS.LTS -e` | The no-Homebrew Mac route needs no password. Fallback for anyone: the LTS installer from https://nodejs.org (big green button). Close and reopen Claude Code after installing. |
| npx not found | comes with Node.js: fix Node first | same | |
| Not inside the gameshow repo | no command | | Explain how to open the `DISCOTECH` folder in Claude Code (PREP.md step 3). |
| Some folders missing | `git checkout -- <the missing folders from the check>` | same | Restores only those folders. |
| Copy is behind GitHub | `git pull` | same | |
| Couldn't reach GitHub | no command | | Check the wifi, then run `/preflight` again. |
| Not connected to GitHub (no "origin") | no command | | They downloaded a zip. Walk them through cloning instead (PREP.md step 3). |

**Then run the check again** (step 1) to confirm everything's fixed.

## 5. Finish with one line

- All PASS → "You're ready for the Gameshow. See you at DISCOTECH!"
- Only WARN → "You're ready. The ⚠️ items are nice-to-haves."
- Any FAIL → what's left, then "If you can't fix it before the day, come anyway: you can vote on your phone and follow on screen."

## Don't

- Don't fix, install or change anything before they say yes (step 3).
- Never use `sudo`, and never ask for a password, API key or GitHub token in chat. Following along needs none.
- Don't change any files in the repo except restoring missing folders.
- Write every web address as a clickable markdown link, including any the check prints.
- Don't give more than one command per box, or more than one command at a time in the one-at-a-time way.
