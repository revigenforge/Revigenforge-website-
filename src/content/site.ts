/* ------------------------------------------------------------------------
   REVIGEN FORGE — SINGLE SOURCE OF TRUTH FOR ALL SITE COPY
   ------------------------------------------------------------------------
   Every word on the page comes from this file. Components read it; they
   never hardcode copy. To change the site, change this file.

   Contact details are confirmed: revigenforge@gmail.com and Instagram only.

   Nothing on this site is invented proof. There are no case studies,
   testimonials, metrics, client names, client work or prices anywhere,
   because none were supplied — sections that would have needed them were
   left out rather than filled with placeholders. When real material
   exists, add it here with a matching component; do not soften that rule.

   The diagrams are the argument: instead of claiming the studio thinks in
   systems, the site hands the visitor the system and lets them take it
   apart. Node copy therefore has to teach something. If a node's text
   could be swapped for any other agency's, it is not finished.
------------------------------------------------------------------------- */

export const brand = {
  name: 'Revigen Forge',
  tagline: 'Creative growth studio',
} as const;

export const contact = {
  email: 'revigenforge@gmail.com',
  emailSubject: 'Project enquiry — Revigen Forge',
  // The footer renders whatever is in this array, so adding a channel
  // later needs no component change.
  social: [{ label: 'Instagram', href: 'https://instagram.com/revigenforge' }],
} as const;

export const nav = {
  links: [
    { label: 'The Forge', href: '#forge' },
    { label: 'What we do', href: '#services' },
    { label: 'Approach', href: '#approach' },
    { label: 'Studio', href: '#studio' },
    { label: 'System', href: '#system' },
  ],
  cta: { label: 'Start a project', href: '#contact' },
} as const;

/* ── 01 HOME ─────────────────────────────────────────────────────────── */

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
  secondaryCta: { label: 'Explore the forge', href: '#forge' },
  chainLabel: 'The chain',
  chainHint: 'Select a link',
  /** The spine the whole studio is organised around. */
  chain: [
    {
      id: 'attention',
      label: 'Attention',
      line: 'Won in under a second, or not at all.',
      body: 'Nothing downstream matters if the first frame loses. Attention is the tax every idea pays before it is allowed to be judged on merit.',
    },
    {
      id: 'content',
      label: 'Content',
      line: 'The vehicle the idea travels in.',
      body: 'Content is not the strategy. It is the form the strategy takes so that a stranger can receive it in six seconds while doing something else.',
    },
    {
      id: 'positioning',
      label: 'Positioning',
      line: 'Why you, and not the next one.',
      body: 'The decision you make about what you are known for. Get it right and every asset after it works harder; get it wrong and volume just spreads the confusion faster.',
    },
    {
      id: 'distribution',
      label: 'Distribution',
      line: 'Where the work goes to find people.',
      body: 'Reach is a channel design problem, not a posting frequency problem. The same asset performs differently depending on where and how it lands.',
    },
    {
      id: 'conversion',
      label: 'Conversion',
      line: 'Where interest becomes revenue.',
      body: 'Attention with nowhere to go is an unpaid media company. Conversion is the path from the first view to a conversation you can actually invoice.',
    },
  ],
} as const;

export const marquee = [
  'Brand positioning',
  'Short-form systems',
  'Founder brand',
  'Creative direction',
  'Offer design',
  'Content systems',
  'Attention design',
  'Conversion paths',
] as const;

/* ── 02 THE FORGE ────────────────────────────────────────────────────── */

export type MindNode = {
  id: string;
  label: string;
  summary: string;
  children?: ReadonlyArray<{ id: string; label: string; summary: string }>;
};

export const forge = {
  index: '01',
  label: 'The Forge',
  headline: ['Take the studio', 'apart.'],
  lede: 'Five disciplines, one system. Select any branch to open it, then select a node to read what we actually mean by it.',
  centre: { id: 'root', label: 'Revigen Forge', summary: 'A creative growth studio organised around one chain: earn attention, shape it with content, anchor it with positioning, move it through distribution, and land it in conversion. The five branches below are the disciplines that chain is built from.' },
  branches: [
    {
      id: 'content',
      label: 'Content',
      summary: 'What you actually publish, and whether it can carry an idea.',
      children: [
        { id: 'short-form', label: 'Short form', summary: 'Vertical video built to survive the first second. Structure, pacing and edit rhythm decided before anything is shot, because short form is an engineering problem wearing a creative costume.' },
        { id: 'campaigns', label: 'Campaigns', summary: 'A run of connected work with one argument, released in sequence. Campaigns exist so an idea gets more than one chance to land and compounds instead of resetting.' },
        { id: 'creative-direction', label: 'Creative direction', summary: 'The taste layer: what the work looks like, sounds like and refuses to do. Direction is mostly a series of decisions about what to leave out.' },
        { id: 'storytelling', label: 'Storytelling', summary: 'Sequencing information so tension exists. Most brand content fails because it answers a question the viewer had not yet been made to ask.' },
      ],
    },
    {
      id: 'attention',
      label: 'Attention',
      summary: 'Whether anyone stays past the first second.',
      children: [
        { id: 'hooks', label: 'Hooks', summary: 'The opening claim, framing or image that buys the next three seconds. A hook is a promise; the rest of the piece is the repayment.' },
        { id: 'psychology', label: 'Psychology', summary: 'Why people stop, keep watching and pass things on. Curiosity gaps, status, specificity, pattern breaks — used as design constraints, not tricks.' },
        { id: 'retention', label: 'Retention', summary: 'Holding attention across the middle, where almost everything is lost. Retention is designed in the edit: every cut either earns the next second or spends it.' },
        { id: 'visual-language', label: 'Visual language', summary: 'A consistent visual signature so your work is recognisable before the name appears. Recognition is compounding attention — it costs less every time.' },
      ],
    },
    {
      id: 'positioning',
      label: 'Positioning',
      summary: 'What you are known for, and who it is not for.',
      children: [
        { id: 'brand-identity', label: 'Brand identity', summary: 'The visual and verbal system that makes you legible at a glance. Identity is not a logo; it is the set of consistent decisions a logo sits on top of.' },
        { id: 'messaging', label: 'Messaging', summary: 'The words that survive being repeated back to you. If your audience cannot describe what you do in their own sentence, the messaging is not finished.' },
        { id: 'differentiation', label: 'Differentiation', summary: 'The specific claim your competitors cannot copy without lying. Differentiation usually means giving something up, which is why most brands avoid it.' },
      ],
    },
    {
      id: 'distribution',
      label: 'Distribution',
      summary: 'How the work travels once it exists.',
      children: [
        { id: 'creators', label: 'Creators', summary: 'Borrowing trust that has already been built. The right creator is a distribution channel with an editorial position attached, which is why fit matters more than follower count.' },
        { id: 'social', label: 'Social', summary: 'Platform-native decisions: what each surface rewards, what it punishes, and which format belongs where. The same idea is re-cut per platform, never re-posted.' },
        { id: 'collaborations', label: 'Collaborations', summary: 'Partnerships that put you in front of an audience you have not earned yet, in a context where being there makes sense.' },
        { id: 'content-systems', label: 'Content systems', summary: 'The pipeline that turns strategy into weekly output without the founder as the bottleneck. Formats, briefs, cadence and review, documented and handed over.' },
      ],
    },
    {
      id: 'conversion',
      label: 'Conversion',
      summary: 'What the attention is actually worth.',
      children: [
        { id: 'offers', label: 'Offers', summary: 'What you sell, framed so the value is obvious before the price is. Most conversion problems are offer problems wearing a marketing disguise.' },
        { id: 'funnels', label: 'Funnels', summary: 'The route from stranger to conversation, with the leaks found and closed. A funnel is a diagnosis tool first and a sales tool second.' },
        { id: 'ctas', label: 'CTAs', summary: 'The single next step, made obvious and low-friction. Every additional choice at the point of action costs you conversions.' },
        { id: 'customer-journey', label: 'Customer journey', summary: 'What happens between the first view and the decision — including the weeks of silence most brands never design for.' },
      ],
    },
  ] as const satisfies readonly MindNode[],
} as const;

/* ── 03 WHAT WE DO ───────────────────────────────────────────────────── */

export type Service = {
  n: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  output: string;
  includes: readonly string[];
};

export const services = {
  index: '02',
  label: 'What we do',
  headline: ['Five ways', 'we work.'],
  lede: 'Engaged on their own, or stacked into one system. Open any service to see the problem it solves, how we approach it and what you actually receive.',
  fields: { problem: 'The problem', approach: 'How we approach it', output: 'What you get' },
  items: [
    {
      n: '01',
      title: 'Positioning & Messaging',
      summary: 'Decide what you are known for before spending another month producing.',
      problem:
        'Without a sharp position every piece of content restates the category instead of claiming a place in it, so nothing compounds and price becomes the only thing separating you from the next option.',
      approach:
        'We read the category and the competitors first, then find the claim you can defend and they cannot copy. That claim is pressure-tested against real objections before it becomes a message hierarchy.',
      output:
        'A written narrative, a message hierarchy, the proof each claim rests on, and a voice guide — enough that a new writer or editor could produce on-brand work without you in the room.',
      includes: ['Category read', 'Core narrative', 'Message hierarchy', 'Proof map', 'Voice guide'],
    },
    {
      n: '02',
      title: 'Content Strategy & Short-Form Systems',
      summary: 'A repeatable engine: formats, hooks, cadence and a pipeline that runs weekly.',
      problem:
        'Content built one post at a time burns out the founder and produces work nobody can evaluate, repeat or hand over. Output collapses the week the person holding it gets busy.',
      approach:
        'We design a small set of formats that carry the position, write the hook and script frameworks behind them, then build the calendar and review loop that keeps them running.',
      output:
        'A format architecture, scripting frameworks, an editorial calendar and a monthly review loop — a system your team operates, documented as we build it.',
      includes: ['Format architecture', 'Hook frameworks', 'Editorial calendar', 'Platform strategy', 'Review loop'],
    },
    {
      n: '03',
      title: 'Creative Production',
      summary: 'Short-form video, design and brand assets made to a standard your category is not meeting.',
      problem:
        'Production is where most strategies quietly die — either the quality is too low to be taken seriously, or the process is too slow to stay consistent. Usually both.',
      approach:
        'Production runs against the format architecture rather than against taste on the day, so quality is a property of the system instead of a property of the mood.',
      output:
        'Edited short-form video, motion and graphics, covers and thumbnails, and a maintained asset library your team can pull from.',
      includes: ['Short-form editing', 'Motion & graphics', 'Thumbnails & covers', 'Visual system', 'Asset library'],
    },
    {
      n: '04',
      title: 'Conversion & Funnel Design',
      summary: 'Offers, pages and follow-up that turn viewers into enquiries.',
      problem:
        'Audience without a conversion path is an unpaid media company. Traffic arrives, finds nothing built for it, and leaves without anyone noticing what it cost.',
      approach:
        'We start at the offer, because most conversion problems are offer problems. Then we build the shortest honest path from attention to conversation and instrument it so the leaks are visible.',
      output:
        'A reframed offer, landing pages, lead capture and follow-up, and the tracking that shows where people actually drop.',
      includes: ['Offer design', 'Landing pages', 'Lead capture', 'Funnel instrumentation', 'Conversion copy'],
    },
    {
      n: '05',
      title: 'Embedded Growth Partner',
      summary: 'One team owning positioning, production and conversion end to end.',
      problem:
        'Split the work across a strategist, an editor, a designer and a media buyer and you inherit the coordination job — plus every gap between them.',
      approach:
        'We hold the whole chain, so the strategy actually reaches the edit and the edit actually reaches the offer. One team, one thread, one set of decisions.',
      output:
        'An owned roadmap, weekly production, conversion assets, monthly reporting against pipeline, and direct access to the people doing the work.',
      includes: ['Owned roadmap', 'Weekly production', 'Conversion assets', 'Monthly reporting', 'Direct access'],
    },
  ] as const satisfies readonly Service[],
} as const;

/* ── 04 OUR APPROACH ─────────────────────────────────────────────────── */

export const approach = {
  index: '03',
  label: 'Our approach',
  headline: ['How we get', 'from problem', 'to action.'],
  lede: 'Six stages, in order. The sequence is the point — producing before diagnosing is the most common and most expensive mistake we are asked to undo.',
  hint: 'Select a stage',
  stages: [
    {
      id: 'problem',
      n: '01',
      label: 'Brand problem',
      line: 'What is actually wrong.',
      body: 'Almost nobody arrives with the real problem. They arrive with a symptom — "our reach dropped", "the content is not converting" — and a theory about it. The first job is separating the two.',
      points: [
        'Reach rises but revenue does not move',
        'The best-performing work attracts the wrong audience',
        'The brand reads differently on every platform',
        'Everything waits on one person to approve it',
      ],
    },
    {
      id: 'diagnosis',
      n: '02',
      label: 'Diagnosis',
      line: 'Evidence before opinions.',
      body: 'We read what has already been published against what actually converted, and find where attention leaks. You get the written read whether or not we end up working together.',
      points: [
        'Audit of published work against outcomes',
        'Where attention enters, and where it drains',
        'A recorded baseline to measure against',
      ],
    },
    {
      id: 'attention',
      n: '03',
      label: 'Attention',
      line: 'Earn the first second.',
      body: 'Before anything can be understood it has to be noticed. This stage decides the hooks, the openings and the visual signature — the mechanics of not being scrolled past.',
      points: ['Hook and opening structure', 'Visual signature and recognition', 'Retention shape across the middle'],
    },
    {
      id: 'perception',
      n: '04',
      label: 'Perception',
      line: 'Control what it means.',
      body: 'Attention without a frame is noise. Perception is the work of deciding what the viewer should conclude about you, and removing everything that leads somewhere else.',
      points: ['The claim you can defend', 'Proof that makes it credible', 'What you deliberately give up'],
    },
    {
      id: 'content',
      n: '05',
      label: 'Content',
      line: 'Build the engine.',
      body: 'The position becomes formats, scripts and a production cadence your team can run weekly. This is where thinking turns into something that ships without heroics.',
      points: ['Formats that carry the position', 'Scripts and briefs your team can run', 'Cadence that survives a busy week'],
    },
    {
      id: 'action',
      n: '06',
      label: 'Action',
      line: 'Turn it into pipeline.',
      body: 'The last stage is the one most content strategies never reach: giving the attention somewhere to go, and reporting on enquiries rather than impressions.',
      points: ['A path from view to conversation', 'Offers and pages built to close', 'Reporting against pipeline, not reach'],
    },
  ],
} as const;

/* ── 05 THE STUDIO ───────────────────────────────────────────────────── */

export const studio = {
  index: '04',
  label: 'The studio',
  headline: ['A small studio', 'built around', 'one chain.'],
  lede: 'Revigen Forge is a creative growth studio. We work on positioning, content and conversion as one connected problem, because that is how they behave in reality.',
  statement:
    'We are not a content mill and we are not a strategy shop that hands over a deck. We build the thing, run it with you, and document it as we go so you are not renting your own system back from us.',
  principles: [
    { n: '01', title: 'One team, one thread', body: 'Strategy, production and conversion sit together. No brief survives three hand-offs intact, so we removed the hand-offs.' },
    { n: '02', title: 'Built to compound', body: 'We optimise for assets that keep returning — positions, formats, pages — over posts that spike once and are gone by Friday.' },
    { n: '03', title: 'Operators, not observers', body: 'We ship the work. A strategy nobody can execute is an expensive opinion, and we do not sell opinions.' },
    { n: '04', title: 'You keep the system', body: 'Frameworks, templates and documentation are handed over as they are built. The goal is capability, not dependency.' },
  ],
  /** Deliberately honest about scale and stage. No invented credentials. */
  facts: [
    { k: 'Discipline', v: 'Positioning · Content · Conversion' },
    { k: 'Formats', v: 'Short-form video, brand systems, pages' },
    { k: 'Works with', v: 'Founders, creators and brands' },
    { k: 'Engagements', v: 'Project or embedded, scoped per brief' },
  ],
} as const;

/* ── 06 THE SYSTEM ───────────────────────────────────────────────────── */

export const system = {
  index: '05',
  label: 'The system',
  headline: ['It is a loop,', 'not a funnel.'],
  lede: 'Every stage feeds the next and the last one feeds the first. Select a stage to see what it takes in, what it hands on, and what breaks when it is weak.',
  hint: 'Select a stage',
  stages: [
    { id: 'idea', label: 'Idea', body: 'The argument worth making. Everything downstream is a delivery mechanism for this, which is why a weak idea cannot be edited into a strong one.', takes: 'Positioning and evidence', gives: 'A brief worth producing', breaks: 'Volume with nothing to say' },
    { id: 'creative', label: 'Creative', body: 'The form the idea takes: the angle, the structure, the visual decision. This is where an idea either becomes watchable or stays a memo.', takes: 'A brief worth producing', gives: 'A format that can be made repeatedly', breaks: 'Work that looks like the category' },
    { id: 'content', label: 'Content', body: 'The asset itself, produced to a standard and on a cadence. Consistency here is a systems property, not a discipline problem.', takes: 'A repeatable format', gives: 'Assets ready to travel', breaks: 'Output that stops when people get busy' },
    { id: 'distribution', label: 'Distribution', body: 'Where the asset goes and how it is cut for each surface. The same idea, re-shaped per platform, never simply re-posted.', takes: 'Assets ready to travel', gives: 'Reach in the right places', breaks: 'Good work nobody sees' },
    { id: 'attention', label: 'Attention', body: 'What you actually earned: who stopped, who stayed, who came back. This is the first honest signal in the loop.', takes: 'Reach in the right places', gives: 'Evidence about what works', breaks: 'Reach without recognition' },
    { id: 'conversion', label: 'Conversion', body: 'Where attention becomes revenue — and where the loop closes, because what converts tells you which idea to make next.', takes: 'Evidence about what works', gives: 'Revenue, and a sharper next idea', breaks: 'An audience that never gets asked' },
  ],
} as const;

/* ── 07 CONTACT ──────────────────────────────────────────────────────── */

export const cta = {
  index: '06',
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
  reassure: ['Reply within two working days', 'No pitch deck, no pressure', 'Straight answer on fit'],
} as const;

export const footer = {
  statement: 'Positioning, content and conversion for people who intend to be chosen.',
  columns: [
    {
      title: 'Studio',
      links: [
        { label: 'The Forge', href: '#forge' },
        { label: 'What we do', href: '#services' },
        { label: 'Approach', href: '#approach' },
        { label: 'Studio', href: '#studio' },
        { label: 'System', href: '#system' },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} Revigen Forge. All rights reserved.`,
} as const;
