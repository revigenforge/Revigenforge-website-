# Conversion playbook

Notes from a video walkthrough on conversion-rate-optimised websites, kept here
so the reasoning is available on future work rather than living in one chat.
Source: a practitioner's teardown drawn from ~30 client projects and ~200 pages
analysed. Treat it as a working hypothesis to argue with, not doctrine — none of
it has been A/B tested by us.

---

## 1. The core idea: answer the internal monologue

A visitor arrives mid-conversation with themselves. Every section either answers
the next question in that monologue or wastes the scroll.

The worked example was a supplement brand. Read as its actual customer — a woman
with a hormonal imbalance — the page is a call-and-response:

| Her internal question | What the page answers with |
| --- | --- |
| Is this for me? | "Get your old self back naturally" |
| Does it work? | 81,000+ five-star reviews |
| Is it credible? | Formulated by nutritional scientists |
| Is it real? | 3.3m customers, 36 countries, press logos |
| It's expensive… | "World's highest quality standards" |
| Do people like me get results? | Named testimonials describing a specific symptom resolving |
| Who says so besides you? | Doctors and nutritionists |

By the halfway point the objections are spent, so the buy is a formality. The
mechanism is not persuasion — it is **objection removal in the order objections
actually occur**.

**The test:** write the visitor's monologue down as a list of questions, then
map each section to the question it kills. Any section that maps to nothing is
decoration.

## 2. Do not sell to everyone

"I'd take 100% of $100 over 50% of $1,000." Niching down means nearly everyone
who lands is adjacent to the buyer — if not the customer, then their sister or
their mother. Copy written for one person outperforms copy written for anyone.

Sniper, not machine gunner.

## 3. Get into the buyer's head before writing a line

The research prompt, roughly:

> How does a person who is likely to buy **X** feel in their life? What does
> their day-to-day look like? Make the imagery vivid and concrete so I can feel
> it. Why would they choose to buy this?

The output is raw material for the page, and it converts directly into the
second-section shape: *Are you going through [pain]? Choose [product] and
relieve it.*

Used to take hours or days of interviews. An LLM gets you a usable first pass in
minutes — but it is a starting point, not the copy.

## 4. Structure — "keep it stupid simple"

```
Hero            → what you do / what you sell / how the visitor benefits
Problem         → name their problem, show how the product answers it
Testimonial     → video, ideally, placed early
Price justification → why it costs what it costs
Why us          → differentiation against the obvious alternative
Testimonial     → image/text based, placed late
CTA             → one action, no branching
```

Two content sections before the first proof block. Multiple proof blocks spread
down the page, not one clump — but not so many it reads as protesting too much.
Close with a single CTA, not a quiz or a choice.

The framework is a spine, not a cage. The order of *questions answered* matters
more than the order of section names.

## 5. Don't copy brands with equity you don't have

Clients ask for Dior, Shopify, Amazon. Those sites are vague and minimal because
they can afford to be — demand already exists and the site only has to not get
in the way. A brand nobody is searching for cannot borrow that posture. Say so
plainly and find the middle ground.

## 6. Price your work against the money it makes

The reason designers undercharge is a private suspicion that the site will not
return the fee. Fix the suspicion, not the price: if it reliably returns 5–10×,
the fee argues for itself.

---

## What we do NOT take from this

The source recommends generating **fake testimonial images and fake video
reviews with AI** when a client has none, and treating it as a temporary fix.

**We don't do that, on this project or any other.** Fabricated reviews are
lies told to the buyer, they are illegal in many jurisdictions (FTC rules in the
US, CMA/DMCC in the UK), and for a studio selling trust they are the single
worst thing to be caught doing. The downside is unbounded and the upside is a
placeholder.

The honest version of the same move, which the source also mentions and which
actually works:

- **Trade an incentive for a real review.** Give past clients something of value
  in exchange for an honest video or written testimonial.
- **Ship proof that isn't a testimonial.** A written diagnostic, a documented
  framework, a public teardown, a specific method — these are verifiable and
  they carry the same "this person knows what they're doing" signal.
- **Show the thinking.** Which is the bet the current Revigen Forge site makes.
- **Leave the section out until it's real.** An absent proof block is neutral. A
  fabricated one is a liability that compounds.

---

## How this applies to the Revigen Forge site

The site today is philosophy-led: it argues by showing how the studio thinks,
because there is no proof material yet. That is the right call for now, but it
is worth being clear about the trade.

**Where the site already agrees with the playbook**

- The hero answers "what do you do / who is it for / what do I do next" in one
  screen.
- The Approach map opens on "Brand problem" — the visitor's symptoms, in their
  words, before any pitch.
- Services are structured problem → approach → output, which is objection
  order.
- One CTA, repeated, with no competing action.

**Where it does not, deliberately**

- **No proof, anywhere.** No reviews, numbers, logos or named clients. By the
  playbook this is the biggest single gap, and it is a real cost — not a
  stylistic choice. It stays until there is something true to put there.
- **No price justification**, because there are no prices.
- **Interaction-led rather than objection-led.** The diagrams reward curiosity;
  they do not close a sceptic.

**The first things to add when material exists**, in order of expected impact:

1. One real video testimonial, placed after the Forge section.
2. Two or three written testimonials with names and roles, placed before the
   contact section.
3. One case study with a real before/after and a recorded baseline.
4. A price-justification block, once engagements are priced.

`src/content/site.ts` is the only file that needs to change for 1–3; the
components read everything from it.
