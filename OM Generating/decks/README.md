# decks/

Source files for every deck. One self-contained folder per project.

```
decks/
  deal-oms/
    <deal-name>/           e.g. conroe-estates/
      <deal>.html          the OM (edit this; links ../../../Design File/brand/brand.css)
      assets/              photos/headshots USED IN the OM (optimized JPEGs)
      source/              raw inputs: proforma .xls, market research, raw photos, legal
  overviews/
    <year>/                e.g. 2026/
      overview.html        the overview deck
      assets/
      source/
```

## Rules of thumb
- **Brand comes from `Design File/`** — never copy brand CSS/logos into a deck folder; link them.
- **`assets/`** = images the deck displays (kept small/optimized). **`source/`** = the raw
  material behind the deck (heavy files, working docs) — never referenced by the HTML.
- **Finished PDFs go to `/output/`**, not inside the deck folder. Render with:
  `node decks/scripts/render.mjs "decks/.../<file>.html" "output/<Name>.pdf"`
- **Relative-path depth matters:** a deck at `decks/deal-oms/<deal>/x.html` is 3 levels deep,
  so it links the brand as `../../../Design File/brand/brand.css`. Copy an existing deck as
  your starting point and the paths come along correctly.
- **New deal:** copy the nearest existing deal folder (or the overview) as a skeleton, drop the
  proforma/research into `source/`, then build.
