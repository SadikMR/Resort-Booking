# Sanctuary Cap Cana — Property Detail Page

A responsive, semantic, and SEO-friendly property detail webpage for the **Sanctuary Cap Cana — A Luxury Collection Adult All-Inclusive Resort**, built using raw **HTML** and **CSS** only (no JavaScript frameworks).

---

## 📁 Project Structure

```
assignment-1-sadik/
├── index.html      # Main HTML page (semantic, accessible markup)
├── styles.css      # All styling (variables, layout, components, responsive)
└── README.md       # Project documentation (this file)
```

---

## 🛠️ Technologies Used

| Technology         | Purpose                                      |
| ------------------ | -------------------------------------------- |
| **HTML5**          | Semantic page structure                      |
| **CSS3**           | Styling, layout (Flexbox & Grid), animations |
| **Google Fonts**   | Inter (body) + Playfair Display (headings)   |
| **Bootstrap Icons** | Icon library via CDN                        |
| **OpenStreetMap**  | Embedded interactive maps (iframe)           |

> No JavaScript, no CSS frameworks (Tailwind/Bootstrap), no build tools. Pure HTML + CSS.

---

## 📐 Page Sections

The page is structured as a **two-column layout** (content + sticky booking sidebar) with the following sections:

| # | Section                | Description                                                        |
|---|------------------------|--------------------------------------------------------------------|
| 1 | **Header**             | Fixed top bar with logo, navigation, phone, and search             |
| 2 | **Breadcrumbs**        | Semantic `<nav>` + `<ol>` navigation trail                        |
| 3 | **Hero / Title**       | Property name, rating, room count, and guest capacity              |
| 4 | **Image Gallery**      | Large hero image + 4 thumbnail grid                                |
| 5 | **Section Tabs**       | Sticky tab navigation for quick section jumping                    |
| 6 | **About**              | Two-column: description (left) + amenity icon grid (right) + 18+ badge |
| 7 | **Resort Highlights**  | Featured image card + 3 mini highlight cards                       |
| 8 | **All-Inclusive Amenities** | Three-column breakdown: Eat & Drink, Relax & Play, Other Perks |
| 9 | **CTA Banner**         | Contact a Booking Specialist with phone CTA                        |
| 10 | **Activities**        | 6 activity cards in 2-column grid (image left, text right)         |
| 11 | **Reviews**           | Review cards with ratings                                          |
| 12 | **Policies**          | Check-in/out, cancellation, and property rules                     |
| 13 | **FAQs**              | Expandable `<details>/<summary>` accordion                        |
| 14 | **Location**          | Two-column: interactive map (left) + airport distances (right)     |
| 15 | **Booking Sidebar**   | Sticky sidebar: date picker, pricing, CTA button, phone, hot deal |
| 16 | **Nearby Resorts**    | 6 resort cards (3-column grid) + sticky map                        |
| 17 | **Pre-Footer Banner** | CTA banner repeated before footer                                  |
| 18 | **Footer**            | Newsletter subscription, destination links, legal info             |

---

## 🎨 Design System

### CSS Variables (`:root`)

All design tokens are centralized in CSS custom properties for consistency and maintainability:

```css
:root {
  --bg: #c9f2f5;           /* Page background */
  --surface: #ffffff;       /* Card background */
  --text: #1f1f1f;          /* Primary text */
  --muted: #5a5a5a;         /* Secondary text */
  --line: #e6e6e6;          /* Border/divider */
  --brand: #00363a;         /* Brand dark teal */
  --brand-2: #003f45;       /* Brand darker teal */
  --accent: #ff9800;        /* Accent orange (buttons, badges) */
  --radius: 16px;           /* Large border radius */
  --radius-sm: 12px;        /* Small border radius (cards) */
  --card-border: 1px solid #ececec;  /* Card borders */
  --text-secondary: #444;   /* Secondary text color */
  --text-tertiary: #666;    /* Tertiary text color */
}
```

### Typography

- **Body**: Inter (sans-serif) — clean, modern readability
- **Headings**: Playfair Display (serif) — elegant, luxury feel
- **Icons**: Bootstrap Icons v1.11.3 (CDN)

### Layout Approach

- **CSS Grid**: Main content + sidebar layout (`content-with-rail`), gallery, activity cards, nearby resorts
- **Flexbox**: Header, breadcrumbs, badges, meta rows, banner CTAs
- **Sticky positioning**: Sidebar booking card and section tab navigation

---

## 📱 Responsive Breakpoints

The page is fully responsive with three breakpoints using a **desktop-first** approach:

| Breakpoint     | Target         | Key Changes                                                      |
|----------------|----------------|------------------------------------------------------------------|
| `≤ 1024px`     | Tablet         | Single-column layout, sidebar moves to top, grids collapse to 2-col |
| `≤ 768px`      | Mobile         | Smaller header, brand text hidden, banner stacks, 1-col grids    |
| `≤ 480px`      | Small Mobile   | Tighter padding, smaller fonts, compact navigation               |

### Tablet (≤ 1024px)
- Content grid switches from 2-column to single column
- Sidebar loses sticky position, moves above content
- Gallery thumbnails become 4 across
- Nearby/location grids stack vertically

### Mobile (≤ 768px)
- Header height reduces, brand subtitle hides
- Navigation links collapse (Groups & Weddings hidden)
- Phone number hidden from header
- Banner switches to vertical stack
- All grids become single column
- Footer stacks vertically

### Small Mobile (≤ 480px)
- Content cards get tighter padding
- Headings and meta text shrink further
- Brand text reduces to 1.3rem

---

## ✅ Best Practices Followed

### HTML Best Practices
- ✅ **Semantic elements**: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<details>`, `<summary>`
- ✅ **Single `<h1>`** with sequential heading hierarchy (h1 → h2 → h3)
- ✅ **Accessible markup**: `aria-label`, `aria-labelledby`, `aria-current="page"`, `<label for>`
- ✅ **Alt text** on all images
- ✅ **No inline CSS** — all styles in external stylesheet
- ✅ **No tables** for layout
- ✅ **Semantic breadcrumbs**: `<nav>` + `<ol>` with CSS-generated separators
- ✅ **Viewport meta tag** for mobile optimization
- ✅ **Descriptive class names** (BEM-inspired: `.content-card`, `.booking-card`, `.activity-grid`)

### CSS Best Practices
- ✅ **External CSS** — single stylesheet (`styles.css`)
- ✅ **Classes only** — no `#id` selectors for styling
- ✅ **CSS Variables** — all theme colors, spacing, and radii in `:root`
- ✅ **DRY** — reusable variables replace repeated values (`--radius-sm`, `--card-border`, `--text-secondary`)
- ✅ **`box-sizing: border-box`** — applied globally
- ✅ **Flexbox & Grid** — modern layout (no floats)
- ✅ **Consistent units** — `rem` for fonts/spacing, `px` for borders, `%`/`vw` for layout
- ✅ **Shorthand properties** used where appropriate
- ✅ **Responsive media queries** — 3 breakpoints (1024px, 768px, 480px)
- ✅ **No `!important`** used anywhere

### SEO Best Practices
- ✅ `<title>` tag with descriptive page title
- ✅ `<meta name="description">` with compelling summary
- ✅ `<meta name="keywords">` with relevant terms
- ✅ `lang="en"` attribute on `<html>`
- ✅ Proper heading hierarchy for crawlers
- ✅ Semantic landmarks for screen readers and search engines
- ✅ Descriptive `alt` attributes on all images
- ✅ `loading="lazy"` on map iframes for performance

---

## 🚀 How to Run

1. Clone or download the repository
2. Open `index.html` directly in any modern browser

```bash
# Option 1: Direct file open
open index.html

# Option 2: Local server (optional)
npx serve .
```

No build step, no dependencies to install — it's pure HTML + CSS.

---

## 🖼️ External Resources

| Resource           | URL                                                                 |
|--------------------|---------------------------------------------------------------------|
| Google Fonts       | `fonts.googleapis.com` (Inter, Playfair Display)                    |
| Bootstrap Icons    | `cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3`                      |
| Unsplash Images    | `images.unsplash.com` (resort/hotel stock photos)                   |
| OpenStreetMap      | `openstreetmap.org/export/embed.html` (location maps)              |

> All external resources are loaded via CDN. No local assets required.
