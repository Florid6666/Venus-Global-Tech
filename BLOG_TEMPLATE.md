# Blog post template

Structure every new blog post the same way so posts stay consistent and the
Table of Contents / SEO fields actually do their job. There's a live example
built to this exact template — see "Agentic AI for the Enterprise" in the
admin panel's Blogs list, or `/blog/agentic-ai-for-the-enterprise` on the site.

## 1. Basics

- **Title** — the H1. Keep it specific (not just a topic name).
- **Subtitle** — one sentence, optional. Shown under the title.
- **Excerpt** — 1–2 sentences. Used on the `/blogs` listing card, and as the
  fallback for Meta Description if that's left blank.
- **Category** — pick from the existing dropdown; don't invent new ones ad hoc.
- **Image** — a featured/hero image. Reuse images already in
  `client/public/images/` where one fits (check there before sourcing a new one).
- **Date**, **Slug**, **Featured** — slug auto-generates from the title; only
  override it if you need a specific URL.

## 2. SEO (the "SEO" section in the blog form)

- **Meta Title** — under 60 characters, plain text (no formatting). If blank,
  falls back to Title.
- **Meta Description** — under 155 characters, plain text, a genuine summary
  (not just the excerpt reworded to be salesy). If blank, falls back to Excerpt.

These are plain `<input>`/`<textarea>` fields on purpose — they render into
`document.title` and a `<meta name="description">` tag, which can't contain
HTML. Don't paste rich text into them.

## 3. Content Blocks — this drives the Table of Contents

The Table of Contents on the live post is generated automatically from every
**Heading** block in Content Blocks — there's no separate field to fill in for
it. That means heading discipline matters:

- Start with 1–2 short **paragraph** blocks introducing the topic (no heading
  needed above the intro).
- Break the body into **3–6 H2 heading blocks**, each a distinct
  subtopic — these become the Table of Contents entries. Use H3 only for a
  sub-point nested under an H2, sparingly.
- Under each H2, use paragraph / image / list blocks as the topic calls for.
  Drop in an image block where it breaks up a long stretch of text — every
  post shouldn't be a wall of paragraphs.
- End with a **Conclusion** (or similarly named) H2 heading summarizing the
  takeaway — readers scanning the Table of Contents expect to find one.

Fewer than 2 headings and the Table of Contents won't render at all (not
useful for a very short post) — so don't skip the heading structure even on
shorter pieces if you want the Table of Contents to show.

## 4. FAQ (the "FAQ" section in the blog form)

Add 3–5 question/answer pairs addressing what a reader would still be
wondering after the article — not a rehash of the headings. Renders as a
click-to-expand accordion at the end of the post. Skip it if you genuinely
have nothing to add here (the section just doesn't render if empty); don't
pad it with filler questions.

## 5. Checklist before publishing

- [ ] Meta Title and Meta Description filled in (or deliberately left blank
      to fall back)
- [ ] 3–6 H2 headings structuring the body
- [ ] At least one image in the body, plus a featured image
- [ ] FAQ section with genuinely useful questions
- [ ] Read the Live Preview in the admin panel before saving
