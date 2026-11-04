# Homework — plug it in

In the gameshow you built the whole business on your laptop: the product, the brand, the lead magnet page, the CRM mockup and the emails. All of it is files, and none of it is on the internet yet.

The homework is **connecting** those files to real services, so strangers can find the site, sign up and pay. Do the steps in order, and stop after any of them. Claude does the building; you make the accounts and click the buttons.

Open this folder in Claude Code, start a new chat and paste this:

```
Read HOMEWORK.md and walk me through it, one step at a time.
```

Come back any time and paste it again: Claude checks what's done and picks up from there. Or copy the prompt for each step below.

| Step | What it does | Service | Cost to start |
|---|---|---|---|
| 0 | Reviews what you've built and what's left | — | free |
| 1 | Makes your private copy, for your personal use | GitHub | free |
| 2 | Saves real leads in a database | Neon | free plan |
| 3 | Sends your emails | Resend | free plan |
| 4 | Sets up products and checkout links | Stripe | no monthly fee; Stripe takes a cut of each sale |
| 5 | Gets the product to people who paid | depends what you sell | free to start |
| 6 | Gives it your own address | a domain | about $15 a year |
| 7 | Puts it online, last of all | Netlify | free plan |

You'll connect and test everything on your laptop first. Nothing is public until Step 7.

## The one rule: keys stay secret

Some steps give you an **API key**: a long password that lets code use your account. Anyone who has it can run up a bill on your account.

- Keys go in the `.env` file only. It's already set up so Git never uploads it.
- Never paste a key into a page, a markdown file or a chat message. When Claude needs one, it'll tell you which line of `.env` to paste it into.
- Keys never go in the website's code. Anything in a page can be read by anyone who visits it.
- Check for keys before every push.

If a key ever ends up somewhere public, make a new one in that service's settings straight away. Deleting the file doesn't make the old key safe again.

## Claude: how to walk someone through this

The person may never have used a terminal, and may be doing this days after the workshop. Be warm, plain-English and brief.

- **Check first, change only when they say yes.** Looking is always fine. Before you commit, push, create a repo or change a file, say what you're about to do and get a yes.
- **Start at Step 0 every time.** Then recommend the first step that isn't done. Before calling a step done, check it's really working, using its "It worked when" line. A key in `.env` doesn't prove anything is connected.
- **One step at a time.** Say what it does and what it costs, and ask whether to do it now. They make the accounts and click the dashboard buttons, so tell them exactly what to click, and wait. "That's enough for today" is a fine answer.
- **Before every push, check for keys.** Use `/security-check` if it's in this folder. If not, search every file Git would save for anything shaped like a key. If you find one, stop: don't push, and don't repeat the key back. Help them move it to `.env`, and if it has ever been pushed or shared, tell them to make a new one. Confirm `.env` and `departments/crm/leads.csv` are ignored by Git.
- **Never ask for a key, password, token or database address in chat, and never print one.** Don't read `.env` out. If they paste a key anyway, don't save it, and tell them to make a new one.
- **Use a matching skill if it's here** (such as `/security-check` or `/brand-voice`). If not, do the work directly from these steps and the `CLAUDE.md` in the folder that owns it.
- **Never push to Freya's repo, make their repo public, charge anyone or take Stripe live without asking.** Never make up prices, testimonials or results, or write legal wording as if it's been checked. Leave a visible `[TODO: …]`.
- **After each step,** add it to the "Business at a glance" table in `CLAUDE.md` and tick it off in `TODO.md`.

---

## Step 0 · See where you are

```
Review this folder and tell me, in plain English, what I've built so far using my real business name. Then tell me which rounds aren't finished, and which homework steps are left. Tell me about anything unsafe first, like a key in a file. Don't change anything.
```

**It worked when** you can see what's done, what's half-done and what's next. Want to finish a missing round first? Ask Claude to build it from your files.

## Step 1 · Make your private copy

Right now this folder is linked to Freya's public starter repo. Your copy holds your ideas, customers and plans, so it should be private and just for you. It's for your personal use, so please send anyone else to Freya's repo rather than sharing yours.

GitHub's Fork button can't make a private copy of a public repo, so this creates a new private one, and keeps Freya's connected so you can still get updates.

1. Make a free account at https://github.com if you don't have one.
2. Ask Claude:

```
Make a private copy of this repo for my personal use. Check for keys first, and stop if you find any. Show me what you're about to save and commit it. Rename origin to upstream and run: git remote set-url --push upstream no_push, so nothing can be pushed to Freya's repo by mistake. Then create a new PRIVATE GitHub repo as origin and push to it. Use the gh command if it's signed in. If not, walk me through github.com/new (choose Private and leave every "add a file" option off) and ask me to paste the repo's web address. Suggest a repo name first.
```

**It worked when** your repo shows on GitHub under your name with a **Private** label, and `git remote -v` shows `no_push` for `upstream`. Your leads file and `.env` should not be on GitHub.

To get Freya's updates later: `git pull upstream main`.

## Step 2 · Save real leads with Neon

Until now, the form saves sign-ups in your own browser, and the CRM shows sample leads. Neon (https://neon.com) gives you a real database, so every sign-up lands in one place, with where it came from and how far along they are. Your plan for this is already in `departments/crm/crm.md`.

Make a free account and a project, then ask Claude:

```
Follow the backend plan in departments/crm/crm.md and connect my form to a Neon database. Save through a Netlify Function, so the key stays on the server, and run it on my laptop with Netlify's local dev tool (ask me before installing it). Don't deploy anything yet. Tell me which line of .env to paste the connection string into. Show real leads in my CRM page instead of the sample ones, and keep that page off the public site.
```

**It worked when** you sign up on your laptop with your own email, and Claude can show you that row in the database with its `source` and `stage`.

## Step 3 · Send the emails with Resend

Resend (https://resend.com) sends the emails in `departments/emails/sequences/`. Until you verify a domain in Step 6, it only sends to your own address, which is fine for testing.

1. Make a free account, and create an API key (Resend dashboard → API Keys). Don't paste it anywhere yet.
2. Ask Claude:

```
Connect the sequence in departments/emails/sequences/ to Resend, testing on my laptop. A new lead gets email 1 straight away, and someone who becomes a Customer gets the onboarding emails. Add a Netlify Scheduled Function as the timer: it checks who's due, sends the next email, and records what each person has been sent so nobody gets one twice. Every email needs a working unsubscribe link and my sender details as a [TODO] for me to fill in. Stop emailing anyone who unsubscribes. Install the Resend package if it isn't there (ask me first). Tell me which line of .env to paste my API key into, never in the code. Don't deploy anything yet.
```

**It worked when** you sign up on your laptop with your own email and email 1 arrives.

Marketing emails have legal rules, like the unsubscribe link and honest sender details. They vary by country, so check the ones where you and your customers are.

## Step 4 · Set up products and checkout links with Stripe

Stripe (https://stripe.com) makes your Buy button real. Stay in **test mode** for this whole step: nobody gets charged, and you can try it as many times as you like.

1. Make an account and switch on test mode.
2. In the Stripe dashboard, add your **product** at the price in `departments/sales/offer.md`. If you charge monthly, choose a recurring price.
3. Make a **Payment Link** for it.
4. Ask Claude:

```
Here's my Stripe test payment link: [paste the link]. Connect it to the Buy button on my product page and add a thank-you page. Add a Stripe webhook using a Netlify Function: when someone pays, set their stage to Customer in my leads table, adding them if they're new. Verify the webhook signature, and test it on my laptop with the Stripe command-line tool (ask me before installing it). Tell me which line of .env to paste the signing secret into. If I charge monthly, also handle cancellations and tell me how customers can cancel. Don't deploy anything yet.
```

A payment link is safe to put on a page: it isn't a key. Test it with the card `4242 4242 4242 4242`, any future date and any 3 numbers.

**It worked when** a test purchase goes through and your own row in the database changes to `Customer`.

Want discount codes? Make them in the Stripe dashboard (Product catalog → Coupons), and turn on promotion codes on your Payment Link.

## Step 5 · Get the product to them

They've paid. Now what do they get? This depends on what you sell, and your plan is in `products/product-plan.md`.

```
Read products/product-plan.md and departments/sales/offer.md, and tell me the simplest way to get this to someone after they pay. A course needs a login. A template needs a download. A service needs a real booking calendar. A monthly plan needs access that stops if they cancel. Suggest one way, and wait for my yes before you build it. Replace the pretend parts of my product pages as you go.
```

**It worked when** you make a test purchase as a customer would and end up with the thing you're selling. A link in the thank-you page or a confirmation email is a fine place to start. Just remember anyone with that link can use it.

## Step 6 · Get your own domain

A domain gives your business its own address, like `yourbusiness.com`, and lets you send emails to other people. It costs about $15 a year, and you can buy it from any domain seller.

```
Help me choose a domain for this business, then walk me through verifying it in Resend so my emails send from it, one click at a time. I'll do the buying myself. We'll point it at the website in the next step.
```

**It worked when** Resend shows your domain as verified, and an email arrives from your own address. New domains can take a few hours to start working.

## Step 7 · Put it online with Netlify

Do this last, when everything works on your laptop. Netlify (https://www.netlify.com) hosts your site for free, and every push updates it. Make an account, then run `/security-check` and fix anything critical. Then ask Claude:

```
Put my site online with Netlify, connected to my private GitHub repo. Publish only the public pages: products/website, products/product, products/shared and brand/brand.css, keeping their paths, with the home address going to products/website. Never publish the repo root, products/crm or any markdown file, because they're private. Copy my .env values into Netlify's settings and walk me through it, never showing a value. Point my domain at the site. Set the Stripe webhook and the payment link's thank-you address to the live site. Check for keys before you push. Walk me through any clicks in the dashboard.
```

**It worked when** the site opens on your phone with the padlock showing, the buttons work, and a test sign-up and test purchase both reach your database. Then remove the test rows.

When that all works, go live:

```
Help me go live. Check for keys. Make sure no test sign-ups are in my database. Tell me everything still marked [TODO] across this folder, including a privacy note on my forms and my sender details, and which ones I need to fill in myself. Then walk me through switching Stripe to live mode: a new live product, Payment Link and webhook, with the new signing secret in Netlify. Ask me before changing anything.
```

**It worked when** a real purchase at full price goes all the way through: payment, `Customer` in the database, and the product delivered. You can refund yourself afterwards in the Stripe dashboard.

---

## Done?

Your business now has a website, its own address, a database, emails and a till, and you own every file.

**Stuck, or want help connecting yours?** Book a free call with Freya: https://calendar.app.google/4KvK9MxbF5WkVN3g8
