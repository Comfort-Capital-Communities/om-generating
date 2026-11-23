# Comfort Capital — Brand Guidelines (v1.0, 2026)

The written companion to `brand.css` and `styleguide.html`. This system blends the **Conroe
Estates** editorial deck (warm paper, serif headlines, whitespace) with Comfort's **heritage
brand** (official navy + cyan, the house-C logo). Render `styleguide.html` to PDF to see it.

---

## Color

Sampled from the master logo file — these are the official values.

| Token | Hex | Role |
|---|---|---|
| Comfort Cyan | `#08A4DB` | Accent only: italic headline words, eyebrows, stat figures, rules, net-return columns, links |
| Comfort Navy | `#172331` | Section dividers, dark emphasis pages, footers, photo scrims |
| Comfort Charcoal | `#221E1F` | Primary ink (body + headlines on light) |
| White | `#FFFFFF` | Cards / reversed type |
| Paper | `#F5F2EA` | Warm page ground (Conroe editorial base) |
| Navy Lift | `#223247` | Panels/cards on navy pages |
| Ink Muted | `#6A6459` | Secondary/body copy on paper |
| Hairline | `#DED8CA` | Borders, rules, dividers |

**Rule of thumb:** cyan is a *spice*, not a base. If a page looks 50% cyan, it's wrong — that
was the dated look of the old decks. Cyan highlights; navy grounds; charcoal reads; paper breathes.

---

## Typography

**One typeface — Montserrat — does everything.** Titles and body share the same family;
hierarchy comes from weight, size, tracking and color (never a second font). Titles are
heavy (800) with tight negative tracking; body is regular (400). The `--display` and `--serif`
CSS tokens both alias Montserrat, so a future serif could be swapped in one place if ever wanted.

**Italics are reserved** for exactly two spots — the cover title accent and the back-cover
line. Everywhere else (headlines, dividers, quotes, accents) is upright; the cyan accent is a
**color** cue, not an italic one.

| Style | Font / weight | Notes |
|---|---|---|
| Headline (`.headline`) | Montserrat 800, ~40–50px, tracking −.022em | `<span class="accent">` = upright cyan |
| Cover title (`.cover__title`) | Montserrat 800, ~84px | white + *italic cyan* accent (the one flourish) |
| Eyebrow (`.eyebrow`) | Montserrat 600, 12px, .22em tracking, UPPER, cyan | leading cyan rule via `::before` |
| Dek (`.dek`) | Montserrat 400, 17px, muted | one-line intro under a headline |
| Body (`.body`) | Montserrat 400, ~14.5px, muted | paragraphs |
| Label (`.label`) | Montserrat 600, 11px, tracked, UPPER | stat labels, meta |
| Quote (`.quote`) | Montserrat 600, upright | add `.quote--italic` only for the back-cover flourish |
| Stat number (`.stat__num`) | Montserrat 800, ~46px, cyan | "big number + small caption" device |

---

## Logo

Assets live in `Design File/brand/logo/` (extracted from the master `.ai`; swap in official
vector SVGs when available). Variants: `mark`, `wordmark`, `lockup-h` (horizontal),
`lockup-v` (vertical) — each in `cyan`, `white`, `navy`, `charcoal`.

- **On paper:** charcoal or navy lockup/mark. **On navy or photography:** white lockup/mark.
  Cyan mark for the oversized graphic on section dividers.
- **Clear space:** ≥ the height of the house-mark on all sides.
- **Don't:** recolor outside the four brand colors, stretch/skew, add shadows/gradients/outlines,
  or place a busy photo directly behind the lockup without a scrim.
- Sister brand **Comfort Communities** (property-management arm) appears on the Vertical
  Integration page only.

---

## Photography

- Prefer **aerial park shots and clean home/renovation photos**. Cover & dividers use a photo
  under a navy gradient scrim (`.cover__scrim` / the divider's built-in gradient) so white type
  stays legible.
- Frame photos with the small `--radius` (4px) corner; label with `.thumb-lab` / `.figure__cap`.
- Where a real photo isn't available yet, use `.placeholder` — it renders a labeled dashed
  tile so the template clearly shows "drop image here."

---

## Voice & recurring lines

Confident, warm, family-business, faith-rooted; benefit-led plain English backed by detailed
tables. Reassurance is central. Sanctioned taglines / proof points:

- "Cash-flowing real estate, family-owned since 2009."
- "A rock-solid foundation." (mission)
- "Never had an investor capital call, nor lost investor capital."
- "Vertically integrated" · "white-glove service"
- Proof numbers: 17-year track record · 40+ communities · 400+ investors · 65+ team members.

Keep securities disclosures and the confidential notice intact on every deck (auto-footer +
the Disclosures page).

---

## Component quick-reference (classes in `brand.css`)

`.slide` / `.slide--navy` / `.slide no-footer` · `.slide__body` · `.cover` (+`__bg __scrim
__in __title __sub __foot`) · `.divider` (+`__media __body __mark __title __eyebrow __inthis`)
· `.eyebrow` · `.headline` (+`.accent .headline--h2 .headline--h3`) · `.dek` · `.body` ·
`.label` · `.stat` (+`__num __label __desc`, `.stat--sm .stat--ink`) · `.card`
(+`__title __body`, `.card--flat .card--pad-sm`) · `.chip` · `.tag` (+`.tag--navy`) · `.btn`
· `.rule` / `.rule-cyan` · `.ul` (+`.ul--check`) · `.steps/.step` · `.table` (+`.net .table--totals`)
· `.kv` (+`.kv__head`) · `.figure` (+`__cap`) · `.placeholder` · `.quote` · `.toc__item`
(+`__num __title __meta`) · `.footer` (auto-injected).
