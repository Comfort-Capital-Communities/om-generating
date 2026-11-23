# Comfort Capital — OM & Overview Deck Generation

This repository is where Comfort Capital builds its investor-facing marketing decks:
**Deal Offering Memorandums (OMs)** and **Corporate Overview Decks**. Decks are authored
in **HTML/CSS**, then rendered to **PDF** (the format we email to investors and print at
FedEx). Every deck draws from one shared brand design system so output stays on-brand.

Comfort Capital is a family-owned mobile-home-park (MHC) syndicator: we raise investor
capital and acquire, improve, and operate manufactured-housing communities through our
in-house manager, Comfort Communities.

---

## 1. The two deliverable types

| | **Deal OM** | **Overview Deck** |
|---|---|---|
| Purpose | Market **one specific deal** currently being raised | Introduce **the company** to prospects/investors |
| Trigger | A new acquisition goes to raise | Annually / semi-annually, or for intros |
| Audience | Invited, accredited investors for that deal | Prospects, referral partners, new LPs |
| Cadence | Per deal (Fiesta Village, Conroe Estates, …) | ~1–2× per year (e.g. "Overview 2026") |
| Financials | Deal-specific proforma, returns, sources/uses | Portfolio-level track record only |
| Length | ~34–40 pages | ~28–32 pages |
| Gold-standard reference | `Past Decks/Conroe Estates/…OM.pdf` | `decks/overviews/2026/` (this repo) |

### Deal OM — canonical section order
Cover → Important Information (disclosures) → Table of Contents → **Part 01 · Comfort Capital**
(Mission, Executive Summary, Core Values, Vertical Integration, Acquisition Criteria) →
**Part 02 · The Deal** (Investment Summary "at a glance", Property Gallery, Aerial/Location,
Business Plan, Capital Improvements, Investment Highlights) → **Part 03 · The Investment & Market**
(Operating Pro Forma, Cash Flow & Distributions/LP waterfall, Tax Strategy, Illustrative Tax
Impact, Rent Comps, Affordability, Supply/Demand, The Market/MSA, Submarket, Market Drivers,
Employers, Maps) → **Part 04 · Track Record & Portfolio** (Realized Performance, Current
Portfolio) → **Our Team** (Leadership, Sponsorship Team) → **FAQs & Next Steps** (Investor
Timeline, Contact) → **Definitions & Calculations**.

### Overview Deck — canonical section order
Cover → Disclosures → Table of Contents → **Part 01 · Comfort Capital Overview** (Mission,
Executive Summary, Core Values, Vertical Integration, Acquisition Criteria) → **Part 02 · The
MHC Opportunity** (Why MHCs, Affordability, Renovations, Tax Benefits, Risk/Return,
Distributions) → **Part 03 · Track Record & Portfolio** (Assets Sold & Recapped, Assets Under
Management, portfolio gallery, Case Studies) → **Part 04 · The Team** (Leadership, Sponsorship
Team, FAQs, Next Steps) → Definitions → Back cover.

**The difference in one line:** an Overview sells *the firm*; a Deal OM inserts a full
deal + market + deal-financials block (Part 02–03 above) between the firm intro and the
track record, and closes with a deal-specific investor timeline.

---

## 2. Design system — the single source of truth

Everything visual lives in **`Design File/`**:

```
Design File/
  brand/
    brand.css        <- design tokens + full component library (import this in every deck)
    fonts.css        <- @font-face for Montserrat (local, offline) — single-typeface system
    fonts/           <- the .woff2 files
    logo/            <- extracted logo assets (mark / wordmark / lockups × cyan/white/navy/charcoal)
  styleguide.html    <- visual reference SOURCE: palette, type, logo, components
  Comfort Capital - Brand Styleguide.pdf  <- rendered styleguide (the template guide to open)
  BRAND_GUIDELINES.md<- written brand spec (colors, type, logo rules, voice)
  Logo File/         <- original master .ai + the Acacia asset report (branding reference)
```

Direction: **Conroe editorial base** (warm paper, generous whitespace)
**+ Comfort brand injection** (official navy `#172331` / cyan `#08A4DB`, house-C logo,
navy section dividers). Type: **one typeface — Montserrat** for both titles and body
(hierarchy via weight/size/color; italics reserved for the cover + back-cover only).
Canvas: **1280 × 720 px** (16:9) → **13.333in × 7.5in** at print.

To use it, a deck's HTML just needs (path depth depends on how deep the deck sits — a deck at
`decks/overviews/2026/` or `decks/deal-oms/<deal>/` is three levels down):
```html
<link rel="stylesheet" href="../../../Design File/brand/brand.css">
```
(`brand.css` `@import`s `fonts.css` automatically.) See `Design File/BRAND_GUIDELINES.md`
for the component cheat-sheet and class names.

---

## 3. Repo layout

```
OM Generating/
  CLAUDE.md                       <- this file
  Design File/                    <- shared brand system (see above); every deck links this
  decks/                          <- deck SOURCE files, one self-contained folder per project
    README.md                     <- folder conventions
    deal-oms/
      <deal-name>/                <- e.g. conroe-estates/
        <deal>.html               <- the OM (links ../../../Design File/brand/brand.css)
        assets/                   <- photos USED IN the OM (optimized JPEGs)
        source/                   <- raw inputs: proforma .xls, research, raw photos, legal
    overviews/
      2026/
        overview.html             <- the 2026 Overview deck (TEMPLATE to duplicate/update)
        assets/                   <- photos used by that deck
        source/                   <- raw inputs behind the deck
    scripts/
      render.mjs                  <- HTML -> PDF renderer (Chrome headless, no npm deps)
      package.json
  output/                         <- rendered PDFs (what you send / print) — pooled here
  Past Decks/                     <- prior PDFs incl. the Conroe gold standard + proformas
  Overview Deck/                  <- prior Canva overview PDFs (reference)
```

**Folder roles in one line:** `Design File` = brand (shared) · `decks` = content you edit
(deal OMs vs overviews, each self-contained with `assets/` + `source/`; the HTML→PDF tool
lives in `decks/scripts/`) · `output` = the finished PDFs (disposable; re-generate anytime).

---

## 4. Build & render workflow

1. **Author** the deck as one HTML file under `decks/deal-oms/<deal>/` (or
   `decks/overviews/<year>/`), linking `brand.css`. Each page is a
   `<section class="slide">…</section>`; put content in `.slide__body`.
2. **Drop photos** in that deck's `assets/` folder and reference them relatively.
3. **Render to PDF**:
   ```bash
   node decks/scripts/render.mjs "decks/<name>/<file>.html" "output/<Name>.pdf"
   ```
   Or run `node decks/scripts/render.mjs` with no args to render the default set
   (styleguide + 2026 overview).
4. The renderer uses **Chrome headless `--print-to-pdf`** (falls back to Edge). No npm
   install needed — `render.mjs` is self-contained. Fonts are loaded locally from
   `Design File/brand/fonts`, so rendering is deterministic and works offline.

**QA tip:** to eyeball pages without opening the PDF, render pages to PNG with the
scratchpad `render.py` helper, or just open the PDF.

---

## 5. Page conventions (how the HTML is structured)

- `<section class="slide">` — a standard cream content page. Put content in a
  `<div class="slide__body">`.
- `class="slide slide--navy"` — dark navy emphasis page (Vertical Integration,
  Distributions, Definitions).
- `class="slide no-footer"` — full-bleed pages (cover, dividers, back cover) that
  should NOT get the auto footer.
- **Section dividers** use `.divider` (photo half + navy half, big cyan mark, PART 0X).
- **Cover** uses `.cover` (full-bleed image + `.cover__scrim` navy gradient + serif title).
- **Footer is auto-injected** by a small script at the bottom of each deck: it numbers every
  slide `NN / TT`, adds the disclaimer, and drops the logo (white on navy pages, charcoal on
  paper). Override a single page's disclaimer with `data-disc="…"` on that `.slide`.
- Keep the footer script + the icon `<svg><defs>` sprite from `overview-2026.html` when
  starting a new deck (copy it as a skeleton).

Component classes (full list in `BRAND_GUIDELINES.md`): `.eyebrow`, `.headline`
(+`.accent` for the cyan italic words), `.dek`, `.body`, `.stat` (`.stat__num/__label/__desc`),
`.card`, `.value-card`, `.tag`, `.btn`, `.chip`, `.table` (+`.net` cyan columns), `.kv`,
`.steps/.step`, `.toc__item`, `.figure`, `.placeholder`.

---

## 6. Financials (per deal)

Deal OM financial pages (pro forma, returns, sources/uses, LP cash-flow waterfall, rent
comps) are **left blank / placeholder in the template**. For each real deal, Jonathan
provides the numbers as an **Excel (.xls/.xlsm)** file (like
`Past Decks/Fiesta Village/…Pro Forma….xlsm`). Populate the deal's data into the OM's
financial pages from that file. Automated parsing of the proforma / Rent Manager / Juniper
Square is a **future phase**, not wired up yet.

Return-metric conventions (defined on the Definitions page): we always show **gross vs. net**
(net = investor-level, after fees + sponsor promotes). Headline metrics: **AAR** (avg annual
return), **EM** (equity multiple), **CoC** (cash-on-cash), plus IRR on deal proformas.

---

## 7. Print / FedEx notes

- Pages are exactly **13.333in × 7.5in** (16:9). Backgrounds and colors print (color-adjust
  is forced on).
- The rendered PDF in `output/` is the file to both **email to investors** and **print at
  FedEx** (landscape, borderless/fit-to-page).
- Keep the confidential/disclosure language intact — these are securities marketing
  materials.

---

## 8. Making a new deck

- **New Overview (e.g. 2027):** duplicate `decks/overviews/2026/` → `decks/overviews/2027/`,
  update copy/photos/numbers, re-render. This is the intended "template to work with."
- **New Deal OM:** copy the nearest existing deal folder (or the overview) into
  `decks/deal-oms/<deal>/`, reorder to the Deal OM section list in §1, insert the
  deal + market + deal-financials block, and drop the proforma/research in that folder's
  `source/`. (A reusable `decks/deal-oms/_template/` is the next planned deliverable.)
- Paths depend on depth: a deck 3 levels deep links the brand as
  `../../../Design File/brand/brand.css`. Copying an existing deck carries the correct paths.

Always sanity-check portfolio stats before sending — a few figures differ between historical
decks (e.g. active community count, total AUM). Confirm the current numbers each build.

---

## 9. The Sunday Special (weekly investor newsletter)

A **third deliverable type**, separate from the decks above. "The Sunday Special" is a
**weekly email brief** from a Comfort Capital team member (Ben Schuster is the regular author;
other team members guest-write — e.g. Morgan Hampel). Each edition is a personal, essay-style
note tying a story/analogy to an investing or MHC theme, then a deeper explainer, then a
call-to-action. We render it to **PDF** to email/print alongside the email send.

**This is NOT a 16:9 deck.** It is a **portrait, US-Letter reading document (8.5in × 11in)**
on a **white** background — a totally different format from the cream 1280×720 slides. Do not
use the `.slide` model, dividers, or the deck footer script. It still links `brand.css` for the
Montserrat faces + color tokens (`--navy #172331`, `--cyan #08A4DB`), then overrides layout in
its own `<style>` block.

### Where it lives
```
decks/newsletters/<YYYY-MM-DD>-sunday-special/
  sunday-special.html      <- the edition (links ../../../Design File/brand/brand.css)
  assets/                  <- author headshot + logo pngs (mark-cyan, logo-white, logo-charcoal)
```
Rendered PDF pools in **`output/Sunday Special/`** named
`The Sunday Special - <Title> (<Mon DD YYYY>).pdf`.
**Gold-standard reference:** `output/Sunday Special/The Sunday Special - ROAD Act.pdf`
(the Morgan Hampel edition — match its look exactly).
Working template to duplicate: `decks/newsletters/2026-08-30-sunday-special/`.

### The house format (match it exactly)
1. **Hero masthead — page 1 only, full-bleed navy band** (radial cyan glow top-right). Contains:
   white Comfort lockup (top-left) + outlined **"WEEKLY BRIEF"** pill (top-right); big title
   **"The Sunday _Special_"** — "Special" in **cyan bold _italic_** (the one sanctioned italic,
   per brand); tagline **"Markets. Strategy. Leadership."** (bold white) + "A weekly brief from
   Comfort Capital." (muted); **"By <Author>"** in cyan; the **author's circular headshot**
   floated right, overlapping; a hairline; then an **"IN THIS ISSUE · A · B"** contents line
   (first item cyan). The masthead does **not** repeat on later pages.
2. **Clean white body pages** after that — **no running header/footer** on interior pages.
   Body copy is dark on white, ~14.6px, line-height ~1.7.
3. **Numbered sections:** a small **cyan rounded square with a white number** ("01", "02", …)
   next to a **cyan letterspaced eyebrow** ("THE BRIEF", "THE PLAYBOOK", "POLICY", "ONE LAST
   THING"), then a large headline **with part of it in cyan**. Sections after the first are
   preceded by a **full-width dark 2px rule**.
4. **Subheads within a section:** a **short cyan dash** + bold near-black label.
5. **Pull quotes:** **cyan left bar** + large bold near-black text (not italic).
6. **"MY TAKE" / aside callouts:** pale-cyan box (`#EAF6FB`) with cyan left border and a small
   cyan uppercase label. (Also used for a boxed "question to ask your CPA," a stat/goal card, etc.)
7. **Close:** full-width dark rule → bold sign-off line → "Until next Sunday," → author
   **headshot** → **name** (bold) + **title in cyan** → **navy pill CTA** ("BOOK A CALL WITH
   <FIRST> →") → **contact line** with cyan bullet dots (phone · email · address) → tiny 3-part
   footer (charcoal lockup · "THE SUNDAY SPECIAL" · "COMFORT CAPITAL") → fine-print disclaimer.
   Wrap this whole closing in one `break-inside:avoid` block so it never splits across pages.

### Build mechanics / gotchas
- `@page{ size:8.5in 11in; margin:0.5in 0; }` — **zero side page-margins**; wrap all body
  content in a `.content-wrap{ padding:0 0.6in }`. The masthead uses `margin:-0.5in 0 …` to
  full-bleed to the top/sides. (Do **not** try negative side margins to bleed — Chrome clips
  content into the unprintable edge. Bleed horizontally by giving the page 0 side margin and
  padding the inner wrapper instead.)
- Repeating running headers/footers via `position:fixed` are unreliable in Chrome
  print-to-pdf (they swap top/bottom on continuation pages). This format sidesteps that by
  putting the masthead on page 1 only and having no running furniture. If a future variant
  needs a repeating header, use a `<table>` `thead`/`tfoot` instead of `position:fixed`.
- Add `break-inside:avoid` to callouts, the calc/stat card, figures, and the closing block;
  `break-after:avoid` on section heads and subheads so they don't strand from their body.

### Content mapping (from the author's raw email/doc)
The doc is usually one flowing essay + a deeper explainer + CTA. Map the essay to **Part 01**
(essay title becomes the cyan-accented headline, eyebrow "THE BRIEF"), the deep-dive to
**Part 02** (eyebrow "THE PLAYBOOK", its internal headers → cyan-dash subheads), and any
"one last thing" to a short **Part 03** or fold the closing ask into the sign-off. Keep the
author's wording; add the disclaimer. **Confirm the author's exact title** for the cyan
sign-off line (don't invent one — use the org line "Comfort Capital · Comfort Communities" if
unknown) and get their **book-a-call / calendar link** for the CTA + contact line.

### Render
```bash
node decks/scripts/render.mjs \
  "decks/newsletters/<YYYY-MM-DD>-sunday-special/sunday-special.html" \
  "output/Sunday Special/The Sunday Special - <Title> (<Mon DD YYYY>).pdf"
```
