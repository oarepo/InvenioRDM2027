# InvenioRDM Partner Meeting 2027 – Prague

Static site for the InvenioRDM 2027 partner meeting hosted by CESNET (March 15–19, 2027).

## Editing

All content lives in `content/index.md` (Pandoc Markdown):

- Hero fields (dates, tagline, venue, hours) are in the YAML front matter.
- Layout blocks use fenced divs: `::: card`, `::: {.grid .grid-3}` … `:::`.
  Outer blocks need more colons than inner ones (`::::` around `:::`).
- Buttons: `[Book](https://…){.btn}`.
- Sections use the class `.band` (not `.section` – Pandoc swallows that class).
- The hero countdown counts to `start:` in the front matter.

`assets/site.js` adds the hero animations (binary rain, countdown) and the navbar highlighting.
All motion is disabled for visitors with "reduce motion" set; without JS the page is still complete.

The previous, static design is kept in `archive/v1/`.

`template.html` holds the header, hero and footer; `assets/style.css` holds the CESNET styling.

## Build

```sh
sh build.sh        # needs pandoc; output in _site/
open _site/index.html
```

## Deploy

`.github/workflows/pages.yml` builds with Pandoc and publishes to GitHub Pages on every push to `main`.
In the repo settings set **Pages → Source: GitHub Actions**.
