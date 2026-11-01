# Homework — plug it in

In the gameshow you built the whole business on your laptop: the website, the lead magnet, the leads list, the emails and the checkout. All of it is files, and none of it is on the internet yet.

The homework is **connecting** those files to real services, so strangers can find the site, sign up and pay. Do the steps in order. Each one works on its own, so you can stop after any of them.

Open this folder in Claude Code and copy the prompt for each step. Claude does the building; you make the accounts and click the buttons.

| Step | What it does | Service | Cost to start |
|---|---|---|---|
| 0 | Makes the repo yours | GitHub | free |
| 1 | Checks nothing is about to leak | `/security-check` | free |
| 2 | Puts the website online | Netlify **or** Cloudflare Pages | free plan |
| 3 | Saves real leads in a database | Neon | free plan |
| 4 | Sends the welcome emails (optional) | Resend (plus its package, `npm install resend`) | free plan |
| 5 | Takes real payments | Stripe | no monthly fee; Stripe takes a cut of each sale |

## The one rule: keys stay secret

Some steps give you an **API key**: a long password that lets code use your account. Anyone who has it can run up a bill on your account.

- Keys go in the `.env` file only. It's already set up so Git never uploads it.
- Never paste a key into a page, a markdown file or a chat message. When Claude needs one, it'll tell you which line of `.env` to paste it into.
- Keys never go in the website's code. Anything in a page can be read by anyone who visits it.
- Run `/security-check` before every push.

If a key ever ends up somewhere public, make a new one in that service's settings straight away. Deleting the file doesn't make the old key safe again.

---

## Step 0 · Make it yours on GitHub

Right now this folder is a copy of Freya's repo, so you can't save your changes back to GitHub. Give it a home of your own.

1. Make a free account at https://github.com if you don't have one.
2. Ask Claude:

```
Make this folder my own repo. Create a new PRIVATE GitHub repo for it, point this folder at it instead of Freya's, and push. Run /security-check before you push.
```

**Keep it private.** Once real people sign up, your leads list holds their names and emails.

## Step 1 · Check it's safe

```
/security-check
```

Fix anything it marks as critical before going on.

## Step 2 · Put it online

Pick **one**: Netlify (https://www.netlify.com) or Cloudflare Pages (https://pages.cloudflare.com). Both have a free plan and both are fine for this.

Make an account, then ask Claude:

```
Put apps/website/ online with [Netlify / Cloudflare Pages]. Connect it to my GitHub repo so every push updates the site. Include the lead magnet pages in departments/marketing/lead-magnets/. Walk me through any clicks I need to do in the dashboard.
```

**It worked when** you can open the site on your phone, and the buttons between the pages still work.

## Step 3 · Save real leads

Until now, the lead magnet form saves sign-ups in the visitor's own browser. Neon (https://neon.com) gives you a real database, so every sign-up lands in one place with where it came from.

Make a free account and a project, then ask Claude:

```
/crm-connect with Neon. Store leads in the database instead of the browser. The key must stay on the server: use a [Netlify Function / Cloudflare Worker], and tell me which line of .env (and which setting in the hosting dashboard) to paste the connection string into.
```

**It worked when** you sign up on your live lead magnet page with your own email, and Claude can show you that row in the database with its `source`.

## Step 4 · Send the emails (optional)

Resend (https://resend.com) sends the welcome sequence from `departments/emails/welcome-sequence/` to each new lead.

1. Make a free account and create an API key (Resend dashboard → API Keys). Don't paste it anywhere yet.
2. Your project needs the **Resend package** installed: the bit of code that talks to Resend. It needs Node.js, which `/preflight` already checked. Claude can install it, or you can run it yourself:

```bash
npm install resend
```

3. Ask Claude:

```
Connect the welcome sequence to Resend so each new lead gets email 1 straight away. Install the Resend package if it isn't there yet (ask me first). Tell me which line of .env and which hosting dashboard setting to paste my API key into, never in the code. Then tell me what I need to set up to send from my own domain.
```

**It worked when** you sign up again and the welcome email arrives.

## Step 5 · Take payments

Stripe (https://stripe.com) turns the pretend checkout into a real one. Start in **test mode**: nobody gets charged, and you can try it as many times as you like.

1. Make an account and switch on test mode.
2. In the Stripe dashboard, make a **Payment Link** for your offer, at the price in `departments/sales/offer.md`.
3. Ask Claude:

```
/checkout with this Stripe payment link: [paste the link]. Swap the pretend checkout for it on the website and the offer page.
```

A payment link is safe to put on a page: it isn't a key. Test it with the card `4242 4242 4242 4242`, any future date and any 3 numbers. When it works, make the same link in live mode and swap it in.

---

## Done?

Your business now has a website, a database, emails and a till, and you own every file. Write what you set up in the root `CLAUDE.md` "Business at a glance" table so future sessions know.

**Stuck, or want help connecting yours?** Book a free call with Freya: https://calendar.app.google/4KvK9MxbF5WkVN3g8
