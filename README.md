# portfolios-for-all

Portfolio templates for everyone. Only frontend (HTML, CSS & JavaScript) — no build tools, no frameworks. Conveniently deployed to GitHub Pages.

Your portfolio content lives in two JSON files. Edit them, pick a theme, push to GitHub, and your website is live.

## Project structure

```
portfolios-for-all/
├── index.html        # The page skeleton + theme selection
├── script.js         # Reads the JSON files and renders the page
├── data.json         # Your personal info (name, email, links, about)
├── metadata.json     # Your portfolio content (education, work, projects, ...)
├── styling/            # 10 theme stylesheets — link any ONE in index.html
│   ├── aurora.css      # Northern lights: drifting gradients & glass cards
│   ├── cyberpunk.css   # Neon-noir: pink/cyan glow on a dark grid
│   ├── bubblegum.css   # Candy pastels: playful, squishy, rounded
│   ├── brutalist.css   # Neo-brutalism: yellow, thick borders, hard shadows
│   ├── velvet.css      # Old-money luxe: emerald, charcoal & gold serif
│   ├── newsprint.css   # Broadsheet: cream stock, serif headlines, press red
│   ├── terminal.css    # Amber CRT: monospace, scanlines, blinking cursor
│   ├── blueprint.css   # Drafting board: cyanotype blue, dashed frames
│   ├── swiss.css       # Typographic: white space, numbered grid, signal red
│   └── terrarium.css   # Greenhouse: moss & sage on warm paper
├── docs/               # Landing page for THIS repo's own GitHub Pages site
│   ├── index.html      # Redirects to the guide below
│   └── portfolio-guide.html  # "What is this project?" guide page
└── README.md
```

> The `docs/` folder is only the project's own promo/landing page. You don't
> need it for your portfolio — just publish `index.html` as described in
> [step 4](#4-publish-with-github-pages).

## 1. Set up the repo

1. **Fork** this repository on GitHub (or click **Use this template** if available).
2. Clone your fork:

   ```bash
   git clone https://github.com/ninadrathod/portfolios-for-all.git
   cd portfolios-for-all
   ```

3. Preview it locally. Because the page loads JSON via `fetch`, open it through a local server (not by double-clicking `index.html`):

   ```bash
   # Python 3 (pre-installed on macOS/Linux)
   python3 -m http.server 8000
   ```

   Then visit [http://localhost:8000](http://localhost:8000) in your browser.

## 2. Update your data

All content comes from two JSON files. The included dummy data (Luna Vega) shows the **canonical** format — replace it with your own. JSON does not support comments, so field rules live here.

CV tools that ingest a live GitHub Pages site (HTML plus same-origin `data.json` / `metadata.json`) expect the canonical names below. A few common aliases still render on the page.

### `data.json` — personal info

Canonical fields: `name`, `email`, `location`, `about`, plus optional `title`, `tagline`, `phone`, `linkedin`, `github`, `resumeUrl`.

**`about` is required for CV tools.** Write **2–4 sentences** (not a one-line tagline). `tagline` is a separate hero line and is **not** used as about-me if `about` is missing.

Use real `https://…` URLs for LinkedIn / GitHub (or omit the field). Dummy `"#"` placeholders are only for the sample site.

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "location": "City, Country",
  "linkedin": "https://www.linkedin.com/in/your-profile",
  "github": "https://github.com/your-username",
  "about": "Two to four sentences about you. This is the summary CV tools extract — not the one-line tagline."
}
```

### `metadata.json` — portfolio content

Seven categories. Canonical field names:

| Category | Canonical fields | Notes |
|---|---|---|
| `education` | `institution`, `degree`, `startYear`, `endYear` | Dates also accept a single `years` string (e.g. `"2022 - 2026"`). `score` and `details` are optional. Degree + institution + dates are what CV tools need. |
| `workExperience` | `company`, `role`, `location`, `startDate`, `endDate`, `role_summary`, `highlights` | `role_summary` is a short paragraph (about 40–50 words) covering the role and responsibilities. `highlights` is an array of bullet strings for recurring tasks and completed projects (≥1). `type` is `"full-time"` or `"internship"`. Leave the array empty if you have no jobs yet. |
| `projects` | `name`, `description`, `technologies`, `link`, `demo` | At least **two** projects with a `name`. `description` is a string **or** an array of paragraphs (write 2–4 sentences, not a one-liner). Optional `highlights` is an array of impact bullets. Code URL aliases: `link` **or** `codeLink` **or** `url`. Demo aliases: `demo` **or** `demoLink`. Use `https://…` or omit; dummy `"#"` is sample-only. |
| `skills` | array of strings | Skill **names only** — no proficiency labels like `"Python: expert"`. |
| `certificates` | `name`, `issuer`, `date`, `url` | Optional. |
| `extracurricular` | `activity`, `organization`, `duration`, `description` | Optional. |
| `positionsOfResponsibility` | `position`, `organization`, `duration`, `description` | Optional. |

**Missing data is fine.** If a category doesn't apply to you (e.g. no work experience yet), leave it as an empty array `[]` or remove it entirely — that section simply won't appear on the page. Optional fields inside an entry (like a certificate URL) can be left as `""` and will be skipped.

> Tip: after editing, validate your JSON at [jsonlint.com](https://jsonlint.com) — a missing comma is the most common reason for a blank page.

## 3. Select a theme

Open `index.html` and find the theme selection block near the top. Keep exactly **one** `<link>` uncommented:

```html
<link rel="stylesheet" href="styling/aurora.css" />
<!-- <link rel="stylesheet" href="styling/cyberpunk.css" /> -->
<!-- <link rel="stylesheet" href="styling/bubblegum.css" /> -->
<!-- <link rel="stylesheet" href="styling/brutalist.css" /> -->
<!-- <link rel="stylesheet" href="styling/velvet.css" /> -->
<!-- <link rel="stylesheet" href="styling/newsprint.css" /> -->
<!-- <link rel="stylesheet" href="styling/terminal.css" /> -->
<!-- <link rel="stylesheet" href="styling/blueprint.css" /> -->
<!-- <link rel="stylesheet" href="styling/swiss.css" /> -->
<!-- <link rel="stylesheet" href="styling/terrarium.css" /> -->
```

To switch themes, comment out the current one and uncomment the one you want. For example, to use the cyberpunk theme:

```html
<!-- <link rel="stylesheet" href="styling/aurora.css" /> -->
<link rel="stylesheet" href="styling/cyberpunk.css" />
```

| Theme | Vibe |
|---|---|
| `aurora.css` | Northern lights — drifting gradient blobs, frosted-glass cards, shimmering headline |
| `cyberpunk.css` | Neon-noir — hot pink & electric cyan glow, dark grid floor, flickering title |
| `bubblegum.css` | Candy pastels — squishy rounded cards, sprinkle-dot hero, rotating pill colours |
| `brutalist.css` | Neo-brutalism — electric yellow, thick black borders, hard offset shadows |
| `velvet.css` | Old-money luxe — emerald & charcoal with gilded gold serif type |
| `newsprint.css` | Broadsheet paper — cream stock, drop cap, hairline column rules, press red |
| `terminal.css` | Amber CRT — monospace throughout, scanlines, blinking block cursor |
| `blueprint.css` | Drafting board — cyanotype blue, dashed frames, crop marks, pencil-yellow labels |
| `swiss.css` | International typographic — white space, numbered grid, oversized tight type |
| `terrarium.css` | Greenhouse botanicals — moss & sage on warm paper, leaf-cut cards |

Each theme pulls a matching font pair from Google Fonts (with safe fallbacks), so no font installation is needed.

## 4. Publish with GitHub Pages

1. Commit and push your changes:

   ```bash
   git add .
   git commit -m "Personalize portfolio"
   git push origin main
   ```

2. On GitHub, open your repository and go to **Settings → Pages**.
3. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`, folder `/ (root)`
4. Click **Save**. After a minute or two, your site will be live at:

   ```
   https://<your-username>.github.io/portfolios-for-all/
   ```

Any push to `main` automatically redeploys the site.

## Troubleshooting

- **Blank page or "Could not load portfolio data"** — you probably opened `index.html` directly from the filesystem, or one of the JSON files has a syntax error. Serve it locally (step 1.3) and validate your JSON.
- **A section is missing** — that's by design when its category is empty in `metadata.json`. Add entries to make it appear.
- **Theme didn't change** — make sure only one stylesheet `<link>` is uncommented, then hard-refresh the browser (Ctrl/Cmd + Shift + R).
