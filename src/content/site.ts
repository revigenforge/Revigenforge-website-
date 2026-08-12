/* ------------------------------------------------------------------------
   REVIGEN FORGE — SINGLE SOURCE OF TRUTH FOR ALL SITE COPY
   ------------------------------------------------------------------------
   Every word on the page comes from this file. Components read it; they
   never hardcode copy. To change the site, change this file.

   Contact details are confirmed: revigenforge@gmail.com and Instagram only.
   If a branded address or another channel comes later, both live in
   `contact` below and nothing else needs touching.

   Nothing on this site is invented proof. There are no case studies,
   testimonials, metrics or prices anywhere, because none were supplied —
   sections that would have needed them were left out rather than filled
   with placeholders. When real proof exists, add a Proof section here and
   a matching component; do not soften that rule.

   `services` and `engagements` are written to match the studio's stated
   positioning (positioning / content / conversion). Confirm the wording
   matches how you actually sell before launch.
------------------------------------------------------------------------- */

export const brand = {
  name: 'Revigen Forge',
  short: 'Revigen',
  tagline: 'Creative growth studio',
  descriptor:
    'Positioning, content and conversion systems for founders, creators and brands.',
} as const;

export const contact = {
  email: 'revigenforge@gmail.com',
  emailSubject: 'Project enquiry — Revigen Forge',
  // Instagram only — confirmed. The footer renders whatever is in this
  // array, so adding a channel later needs no component change.
  social: [{ label: 'Instagram', href: 'https://instagram.com/revigenforge' }],
} as const;

export const nav = {
  links: [
    { label: 'Approach', href: '#approach' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Engagements', href: '#engagements' },
  ],
  cta: { label: 'Start a project', href: '#contact' },
} as const;

export const hero = {
  eyebrow: 'Creative growth studio',
  headline: [
    { text: 'Anyone can' },
    { text: 'get seen.' },
    { text: 'Almost no one' },
    { text: 'gets ', accent: 'chosen.' },
  ],
  lede: 'Revigen Forge builds the positioning, content and conversion systems that turn attention into revenue — for founders, creators and brands who are done guessing.',
  primaryCta: { label: 'Book a strategy call', href: '#contact' },
  secondaryCta: { label: 'See how we work', href: '#process' },
  meta: [
    { k: '01', v: 'Positioning' },
    { k: '02', v: 'Content systems' },
    { k: '03', v: 'Conversion' },
  ],
} as const;

export const marquee = [
  'Brand positioning',
  'Short-form systems',
  'Founder brand',
  'Creative production',
  'Offer design',
  'Landing pages',
  'Content strategy',
  'Conversion paths',
] as const;

export const reality = {
  index: '01',
  label: 'The current reality',
  headline: ['The content is fine.', 'The system around it', 'is missing.'],
  lede: 'Most brands we meet are not lazy and not untalented. They are publishing into a structure that was never designed to convert.',
  items: [
    {
      n: '01',
      title: 'You post consistently and cannot trace a single sale to it.',
      body: 'Reach goes up. Revenue does not move. Nobody can say which piece of content did any work, so every month starts from zero.',
    },
    {
      n: '02',
      title: 'Your best-performing posts attract the wrong people.',
      body: 'Volume without a position pulls in an audience that will never buy. A large, wrong audience is more expensive than a small, right one.',
    },
    {
      n: '03',
      title: 'You look like a different company on every platform.',
      body: 'Different voice, different promise, different visual language. Nothing stacks, so you pay full price for attention every single time.',
    },
    {
      n: '04',
      title: 'Everything waits on one person.',
      body: 'The founder is the strategist, the scriptwriter and the approval queue. Output collapses the week that person gets busy.',
    },
  ],
  kicker: 'None of that is a content problem. It is an architecture problem.',
} as const;

export const approach = {
  index: '02',
  label: 'What we do',
  headline: ['We build the machine,', 'not just the media.'],
  lede: 'Deliverables stop working the day you stop paying for them. We build the layer underneath: a position worth remembering, an engine that ships without heroics, and a path from first view to signed client.',
  pillars: [
    {
      n: '01',
      title: 'Position',
      body: 'Decide what you are known for and make it impossible to confuse you with anyone else in your category.',
      detail: 'Narrative, messaging, proof points, visual direction.',
    },
    {
      n: '02',
      title: 'Produce',
      body: 'Turn that position into content your team can ship every week without waiting on the founder.',
      detail: 'Formats, scripts, production cadence, publishing.',
    },
    {
      n: '03',
      title: 'Convert',
      body: 'Give the attention somewhere to go — offers, pages and follow-up built to close, not to look busy.',
      detail: 'Offer design, landing pages, funnel and follow-up.',
    },
  ],
} as const;

export type Service = {
  n: string;
  title: string;
  summary: string;
  who: string;
  problem: string;
  matters: string;
  includes: readonly string[];
};

export const services = {
  index: '03',
  label: 'Services',
  headline: ['Five ways', 'we work.'],
  lede: 'Engaged individually, or stacked into one system. Most teams start with the first and grow into the rest.',
  items: [
    {
      n: '01',
      title: 'Positioning & Messaging',
      summary: 'Decide what you are known for before you spend another month producing.',
      who: 'Founders and brands whose content performs unevenly and whose audience cannot repeat what they do.',
      problem:
        'Without a sharp position, every piece of content restates the category instead of claiming a place in it — so nothing compounds and price becomes the only differentiator.',
      matters:
        'Positioning is the highest-leverage change available. It costs nothing to distribute and it makes every asset produced after it work harder.',
      includes: ['Category & competitor read', 'Core narrative', 'Message hierarchy', 'Proof architecture', 'Voice guide'],
    },
    {
      n: '02',
      title: 'Content Strategy & Short-Form Systems',
      summary: 'A repeatable engine: formats, hooks, cadence and a pipeline that runs weekly.',
      who: 'Teams already posting who need output to become predictable instead of heroic.',
      problem:
        'Content built one post at a time burns the founder out and produces work that cannot be evaluated, repeated or handed to anyone else.',
      matters:
        'A system turns content from a recurring cost into an asset. Formats compound, the team gets faster, and performance becomes something you can actually diagnose.',
      includes: ['Format architecture', 'Hook & script frameworks', 'Editorial calendar', 'Platform strategy', 'Performance review loop'],
    },
    {
      n: '03',
      title: 'Creative Production',
      summary: 'Short-form video, design and brand assets produced to a standard your category is not meeting.',
      who: 'Brands and creators who need volume without the quality drop that usually comes with it.',
      problem:
        'Production is where most strategies quietly die — either the quality is too low to be taken seriously or the process is too slow to stay consistent.',
      matters:
        'Craft is a positioning signal. Before a single word is read, production quality tells the viewer what tier of business they are looking at.',
      includes: ['Short-form video editing', 'Motion & graphics', 'Thumbnails & covers', 'Visual system', 'Asset library'],
    },
    {
      n: '04',
      title: 'Conversion & Funnel Design',
      summary: 'Offers, landing pages and follow-up that turn viewers into enquiries.',
      who: 'Anyone with real attention and no reliable path from that attention to a conversation.',
      problem:
        'Audience without a conversion path is an unpaid media company. The traffic arrives, finds nothing built for it, and leaves.',
      matters:
        'This is where content stops being a brand exercise and starts being pipeline. It is usually the fastest revenue unlock in the whole engagement.',
      includes: ['Offer design', 'Landing pages', 'Lead capture & nurture', 'Funnel instrumentation', 'Conversion copy'],
    },
    {
      n: '05',
      title: 'Embedded Growth Partner',
      summary: 'One team owning positioning, production and conversion end to end.',
      who: 'Companies that want the outcome without assembling and managing four separate vendors.',
      problem:
        'Split the work across a strategist, an editor, a designer and a media buyer and you inherit the coordination job — and the gaps between them.',
      matters:
        'One team holding the whole thread means the strategy actually reaches the edit, and the edit actually reaches the offer. Nothing is lost in translation.',
      includes: ['Owned strategy & roadmap', 'Weekly production', 'Conversion assets', 'Monthly reporting', 'Direct team access'],
    },
  ] as const satisfies readonly Service[],
} as const;

export const difference = {
  index: '04',
  label: 'Why Revigen Forge',
  headline: ['Why teams', 'bring us in.'],
  items: [
    {
      n: '01',
      title: 'One team, one thread',
      body: 'Strategy, production and conversion sit in the same room. No brief survives three hand-offs intact, so we removed the hand-offs.',
    },
    {
      n: '02',
      title: 'Built to compound',
      body: 'We optimise for assets that keep returning — formats, positioning and pages — over posts that spike once and die by Friday.',
    },
    {
      n: '03',
      title: 'Operators, not observers',
      body: 'We ship the work. A strategy deck nobody can execute is an expensive opinion, and we do not sell opinions.',
    },
    {
      n: '04',
      title: 'You keep the system',
      body: 'Frameworks, templates and documentation are handed over as we build. The goal is capability, not dependency.',
    },
  ],
} as const;

export const process = {
  index: '05',
  label: 'How it works',
  headline: ['Four moves,', 'in order.'],
  lede: 'The sequence matters. Producing before positioning is the single most common and most expensive mistake we are asked to undo.',
  steps: [
    {
      n: '01',
      title: 'Diagnose',
      duration: 'Week 1',
      body: 'We audit what you have published, what actually converted and where attention leaks. You get a written read of the gap between the two, whether or not we work together.',
    },
    {
      n: '02',
      title: 'Position',
      duration: 'Weeks 2–3',
      body: 'We lock the narrative: what you are known for, who it is for, what you claim and how you prove it. Everything downstream is built from this document.',
    },
    {
      n: '03',
      title: 'Build',
      duration: 'Weeks 4–6',
      body: 'Formats, scripts, production cadence and conversion assets go live. The engine starts running and your team starts operating it with us.',
    },
    {
      n: '04',
      title: 'Compound',
      duration: 'Ongoing',
      body: 'Monthly review against pipeline, not impressions. Winners get systematised, losers get cut, and the position sharpens as the market answers back.',
    },
  ],
} as const;

export const engagements = {
  index: '06',
  label: 'Engagements',
  headline: ['Three ways', 'to start.'],
  lede: 'Scope is set after the diagnostic, so you are never quoted before anyone understands the problem.',
  tiers: [
    {
      name: 'Positioning Sprint',
      shape: 'Fixed scope · 2–3 weeks',
      pitch: 'Clarity before volume.',
      for: 'Teams producing steadily with nothing to show for it.',
      includes: [
        'Content & conversion audit',
        'Category and competitor read',
        'Core narrative and messaging',
        'Message hierarchy and proof map',
        'Content direction for the next quarter',
      ],
      featured: false,
    },
    {
      name: 'Content Engine',
      shape: 'Monthly · rolling',
      pitch: 'The system, running.',
      for: 'Brands that need consistent, high-standard output without building a team.',
      includes: [
        'Everything in Positioning Sprint',
        'Format architecture and scripting',
        'Weekly short-form production',
        'Editorial calendar and publishing',
        'Monthly performance review',
      ],
      featured: true,
    },
    {
      name: 'Growth Partner',
      shape: 'Embedded · quarterly',
      pitch: 'The whole thread, owned.',
      for: 'Companies treating content as a primary revenue channel.',
      includes: [
        'Everything in Content Engine',
        'Offer and funnel design',
        'Landing pages and conversion assets',
        'Founder brand programme',
        'Direct access to the team',
      ],
      featured: false,
    },
  ],
  note: 'Pricing is set against scope after the diagnostic call. No retainers before we both know what the work is.',
} as const;

export const cta = {
  index: '07',
  label: 'Start here',
  headline: ['You are going to be', 'posting anyway.'],
  accentLine: 'Make it compound.',
  lede: 'Tell us what you are building and where it is stalling. If we are the wrong fit, we will say so on the first call and point you somewhere better.',
  form: {
    fields: {
      name: 'Your name',
      company: 'Company or handle',
      links: 'Where can we see your work?',
      message: 'What is stalling?',
    },
    submit: 'Send enquiry',
    hint: 'Opens in your mail app — nothing is stored on this site.',
  },
  reassure: [
    'Reply within two working days',
    'No pitch deck, no pressure',
    'Straight answer on fit',
  ],
} as const;

export const footer = {
  statement: 'Positioning, content and conversion for people who intend to be chosen.',
  columns: [
    {
      title: 'Studio',
      links: [
        { label: 'Approach', href: '#approach' },
        { label: 'Services', href: '#services' },
        { label: 'Process', href: '#process' },
        { label: 'Engagements', href: '#engagements' },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} Revigen Forge. All rights reserved.`,
} as const;
