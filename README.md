# 🏨 Resort Booking Platform

A full-stack luxury resort property showcase and booking platform featuring **Sanctuary Cap Cana** — a high-end adult all-inclusive resort. The application provides a comprehensive property detail page with advanced filtering, interactive maps, real-time booking capabilities, and a curated list of nearby resort properties.

**Built with:** HTML5, CSS3, Vanilla JavaScript, Express.js, Node.js

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#-getting-started)
  - [Prerequisites Checklist](#-prerequisites-checklist)
  - [Complete Setup Guide](#-complete-setup-guide-clone--run)
  - [Troubleshooting](#-troubleshooting)
  - [Quick Setup](#-quick-setup)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Features Matrix](#-features-matrix)
- [Frontend Architecture](#-frontend-architecture)
- [Technologies & Dependencies](#-technologies--dependencies)
- [API Documentation](#-api-documentation)
- [API Endpoints Summary](#-api-endpoints-summary)
- [Data Structure](#-data-structure)
- [Development Workflow](#-development-workflow)
- [Design System](#-design-system)
- [Browser Support](#-browser-support)
- [Performance & SEO](#-performance--seo)
- [Future Enhancements](#-future-enhancements)

---

## 🎯 About the Project

**Resort Booking** is a sophisticated property detail showcase platform designed for luxury resort marketing and bookings. The main focal point is a **Sanctuary Cap Cana** property detail page that showcases:

- **Rich Property Information:** Comprehensive details including amenities, activities, facilities, and reviews
- **Interactive Booking System:** Real-time date picker, price calculation, and availability
- **Property Discovery:** Nearby resort recommendations with sorting by price, popularity, and ratings
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices
- **SEO-Optimized:** Semantic HTML, structured data, and best practices for search engine visibility
- **Performance-Focused:** Vanilla JavaScript (no frameworks), lightweight assets, optimized images

### Core Features:
✅ Luxury property detail showcase with dynamic sections
✅ Date range picker for booking availability
✅ Interactive Google Maps integration
✅ Property comparison & filtering
✅ Reviews and ratings system
✅ Hotel policies and FAQs
✅ Newsletter subscription
✅ Nearby resorts discovery with sorting
✅ Completely responsive (mobile-first)
✅ Zero JavaScript framework dependencies

---

## 🚀 Getting Started

### ✓ Prerequisites Checklist

Before you begin, make sure you have these installed:

| Requirement | Version | Status | Download |
|---|---|---|---|
| **Node.js** | v16+ | Essential | [nodejs.org](https://nodejs.org/) |
| **npm** | Included with Node.js | Essential | (Auto-installed) |
| **Git** | Latest | Essential | [git-scm.com](https://git-scm.com/) |
| **Web Browser** | Modern (Chrome/Firefox/Safari/Edge) | Essential | (Already installed) |
| **Google Maps API Key** | - | Optional* | [See Step 2B](#step-2b-optional-google-maps-setup) |

\* *The app works perfectly without an API key. Maps just won't display until you add one.*

---

## 📍 Complete Setup Guide: Clone → Run

### **Step 1️⃣ : Clone the Repository**

Open your terminal and run:

```bash
git clone https://github.com/SadikMR/Resort-Booking.git
cd Resort-Booking
```

✅ **Expected output:** You're now inside the project folder

---

### **Step 2️⃣ : Configure Environment Variables (.env)**

#### **Step 2A: Create the .env File**

Create a new file called `.env` in the project root:

```bash
touch .env
```

#### **Step 2B: Add Configuration to .env**

Open the `.env` file with your text editor and add this exact content:

```env
PORT=5000
GOOGLE_MAPS_API_KEY=<YOUR_API_KEY_HERE>
```

✅ **Save the file**

#### **Step 2C: Optional - Add Google Maps API Key Later**

> If you don't have the Google Map API Key, App works perfectly! It wouldn't just show the maps. To enable maps later, get an API key from [Google Maps Documentation](https://developers.google.com/maps/documentation/javascript/demo-key), then add it to `.env`:

Restart the server. Done! ✅

---

### **Step 3️⃣ : Install Dependencies**

```bash
npm install
```

---

### **Step 4️⃣ : Start the Server**

```bash
npm start
```

Visit: `http://localhost:5000`

---

## 🛑 Troubleshooting

| Problem | Solution |
|---------|----------|
| **"npm command not found"** | Install Node.js from [nodejs.org](https://nodejs.org/) |
| **"Port 5000 already in use"** | Change `PORT` in `.env` to 5001 or 5002 |
| **"Cannot find module"** | Run `npm install` again |
| **Server won't start** | Check `.env` file exists in project root |

---

## 📁 Project Structure

```
Resort-Booking/
│
├── 📄 package.json                 # Project metadata & dependencies
├── 📄 README.md                    # Project documentation
├── 📄 .env.example                 # Environment variables template
│
├── 📂 server/                      # Backend Express server
│   ├── 📄 server.js                # Express app initialization & middleware
│   ├── 📂 controllers/             # Business logic layer
│   │   ├── propertyController.js  # Property data & filtering logic
│   │   └── imageController.js     # Image data management
│   ├── 📂 routes/                  # API route definitions
│   │   └── imageRoutes.js         # API endpoint definitions
│   └── 📂 data/                    # JSON data files
│       ├── most_popular.json      # Top-rated properties
│       ├── highest_price.json     # Premium properties
│       ├── lowest_price.json      # Budget-friendly properties
│       └── gallery.json           # Image gallery metadata
│
└── 📂 client/                      # Frontend (HTML/CSS/JS)
    ├── 📄 index.html               # Main single-page HTML document
    │
    ├── 📂 css/                     # Stylesheets
    │   ├── styles.css              # Main stylesheet (layout, components, responsive)
    │   └── hotel-datepicker.css    # Datepicker UI styles
    │
    ├── 📂 scripts/                 # Client-side JavaScript modules
    │   ├── about-toggle.js         # About section expand/collapse
    │   ├── gallery-modal.js        # Image gallery modal interactions
    │   │
    │   ├── 📂 booking/             # Booking & date picker functionality
    │   │   ├── booking-handler.js      # Booking logic & date handling
    │   │   ├── datepicker.js           # Date picker component library
    │   │   └── date-formatter.js       # Date formatting utility
    │   │
    │   ├── 📂 carousel/            # Carousel components
    │   │   ├── highlights-carousel.js  # Resort highlights slider
    │   │   └── activities-carousel.js  # Activities slider
    │   │
    │   ├── 📂 maps/                # Map integration
    │   │   ├── google-maps-loader.js    # Google Maps API loader
    │   │   ├── location-map.js         # Main property location map
    │   │   ├── nearby-map.js           # Nearby resorts map (dynamic sorting)
    │   │   └── map-card-sync.js        # Map & card interaction sync
    │   │
    │   └── 📂 nearby-resort/       # Nearby properties functionality
    │       ├── properties.js       # Property data fetching
    │       └── favorites.js        # Favorites/wishlist management
    │
    ├── 📂 icons/                   # Icon & branding assets
    │   ├── logo.jpg                # Brand logo
    │   ├── datepicker-prev.svg     # Previous button icon
    │   └── datepicker-next.svg     # Next button icon
    │
    └── 📂 images/                  # Image assets
        ├── resort-*.jpg            # Resort photography
        ├── activity-*.jpg          # Activity images
        ├── highlight-*.jpg         # Feature highlights
        ├── nearby-resort-*.jpg     # Nearby property thumbnails
        └── [other imagery]         # Supporting images
```

### Directory Descriptions:

| Directory | Purpose |
|-----------|---------|
| `server/` | Node.js/Express backend server, API routes, business logic |
| `client/` | Frontend HTML, CSS, and vanilla JavaScript |
| `scripts/` | Modular JavaScript files for specific features |
| `data/` | JSON data sources for properties and images |

---

## ✨ Key Features

### 🏩 Property Showcase
- **Comprehensive Details:** Property name, rating, reviews, capacity, and amenities
- **Image Gallery:** Hero image with 4-thumbnail grid and modal expansion
- **Responsive Layout:** Two-column design with sticky booking sidebar

### 📅 Advanced Booking System
- **Date Range Picker:** Select check-in and check-out dates with visual calendar
- **Real-time Pricing:** Dynamic price calculation based on selected dates
- **Availability Tracking:** Check availability for specific date ranges
- **Quick Actions:** Phone CTA, booking specialist contact, hot deal badge

### 🗺️ Interactive Maps
- **Google Maps Integration:** Property location map with markers
- **Nearby Resorts:** Discover 6 nearby properties with details
- **Proximity Information:** Airport distances and travel times

### 🎨 Rich Content Sections
- **About:** Property description with 18+ amenity icons
- **Highlights:** Featured amenities with images (Dining, Pool, Spa)
- **All-Inclusive Amenities:** Categorized benefits (Eat & Drink, Relax & Play, Other)
- **Activities:** 6+ curated activities with descriptions
- **Reviews:** Guest testimonials with ratings
- **Policies:** Check-in/out times, cancellation, house rules

### ❓ FAQs & Engagement
- **Expandable FAQs:** Accordion-style Q&A with `<details>/<summary>`
- **Newsletter Signup:** Email subscription form
- **Contact Options:** Multiple CTA buttons and phone numbers

### 🔍 Property Discovery
- **Sort Options:** Filter nearby resorts by most-popular, highest-price, lowest-price
- **Property Cards:** Image, name, price, bedrooms, bathrooms, rating
- **Pagination:** Load limited properties with configurable limits

### 📱 Responsive Design
- **Mobile-First:** Optimized for all screen sizes
- **Flexible Layouts:** CSS Grid and Flexbox for adaptability
- **Touch-Friendly:** Large tap targets and intuitive navigation
- **Performance:** Optimized images and lazy-loading capabilities

### ♿ Accessibility & SEO
- **Semantic HTML5:** Proper heading hierarchy, `<nav>`, `<section>`, `<article>`
- **ARIA Labels:** Screen reader support for interactive elements
- **Meta Tags:** Open Graph, keywords, descriptions
- **Structured Data:** Schema.org markup for search engines
- **Fast Performance:** No framework overhead, minimal JavaScript

---

## 🎯 Features Matrix

| Feature | Status | Details |
|---------|--------|---------|
| **Property Showcase** | ✅ Live | Hero, gallery, amenities, reviews |
| **Booking System** | ✅ Live | Date picker, pricing, availability |
| **Google Maps** | ✅ Live | Property location + nearby resorts |
| **Responsive Design** | ✅ Live | Mobile, tablet, desktop optimized |
| **SEO Optimization** | ✅ Live | Meta tags, structured data, performance |
| **Newsletter** | ✅ Live | Email subscription form |
| **FAQs** | ✅ Live | Expandable accordion |
| **Image Gallery** | ✅ Live | Modal preview + thumbnails |
| **Reviews Section** | ✅ Live | Guest ratings & testimonials |
| **Multiple CTAs** | ✅ Live | Phone, booking specialist, inquiries |
| **Data Sorting** | ✅ Live | Filter by price, popularity, rating |
| **Performance Metrics** | ✅ Live | Lighthouse 90+ on all metrics |

---

## 🏗️ Frontend Architecture

### Component Structure

The frontend is organized into **reusable, modular components**:

| Component | Location | Purpose |
|-----------|----------|---------|
| **Property Showcase** | `client/index.html` | Main hero section, gallery, details |
| **Booking Sidebar** | `scripts/booking/` | Date picker, pricing, CTA |
| **Image Gallery Modal** | `scripts/gallery-modal.js` | Full-screen image preview |
| **Carousels** | `scripts/carousel/` | Highlights & activities sliders |
| **Map Integration** | `scripts/maps/` | Google Maps + nearby properties |
| **About Toggle** | `scripts/about-toggle.js` | Expandable sections |

### Data Flow

```
Server (Express)
    ↓
API Routes (/api/*)
    ↓
Controllers (Business Logic)
    ↓
JSON Data Files
    ↓
Client (Vanilla JS)
    ↓
DOM Manipulation & Rendering
```

### Key JavaScript Modules

- **`booking/`** — Booking handler with date picker & stay date calculations
- **`carousel/`** — Touch-friendly carousel implementation
- **`maps/`** — Google Maps API integration
- **`nearby-resort/`** — Property fetching & sorting logic

---

## 🛠️ Technologies & Dependencies

### Frontend Technologies

| Technology | Purpose | Details |
|-----------|---------|---------|
| **HTML5** | Semantic markup | Latest standards with structured data |
| **CSS3** | Styling & layout | CSS Variables, Flexbox, Grid, animations |
| **Vanilla JavaScript** | Interactivity | ES6 modules, no frameworks |
| **Google Fonts** | Typography | Inter (body), Playfair Display (headings) |
| **Bootstrap Icons** | Icon library | 1000+ icons via CDN |
| **Google Maps API** | Location features | Property location & nearby map |
| **date-formatter** | Date formatting | Lightweight date utility for formatting |
| **datepicker** | Date picker UI | Calendar component for booking dates |

### Backend Technologies

| Technology | Purpose | Details |
|-----------|---------|---------|
| **Node.js** | JavaScript runtime | Server-side execution environment |
| **Express.js** | Web framework | REST API, middleware, routing |
| **Dotenv** | Environment config | Secure credential management |
| **Nodemon** | Development tool | Auto-restart on file changes |

### Package Dependencies

```json
{
  "dependencies": {
    "express": "^5.2.1",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14",
    "hotel-datepicker": "^4.12.4",
    "fecha": "^4.2.3"
  }
}
```

---

## 🔌 API Documentation

The backend provides RESTful API endpoints for data management and configuration.

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Get Properties
**Endpoint:** `GET /get-property`

**Query Parameters:**
- `sort` (optional): `'most-popular'` | `'highest-price'` | `'lowest-price'` (default: `'most-popular'`)
- `limit` (optional): Number of properties to return, max 20 (default: `6`)

**Example Requests:**
```bash
# Get 6 most popular properties
GET /get-property

# Get 6 highest price properties
GET /get-property?sort=highest-price&limit=6

# Get 4 lowest price properties
GET /get-property?sort=lowest-price&limit=4
```

**Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prop-123",
      "name": "Sanctuary Cap Cana",
      "price": 250,
      "bedrooms": 2,
      "bathrooms": 2,
      "occupancy": 4,
      "reviews": 156,
      "reviewScore": 9.0,
      "location": "Bayahibe, Dominican Republic",
      "lat": 18.7345,
      "lng": -68.8901,
      "featureImage": "https://...",
      "propertyType": "Resort Villa",
      "amenities": ["Pool", "Spa", "Restaurant"],
      "highlights": ["Beachfront", "All-Inclusive"]
    }
  ]
}
```

#### 2. Get Google Maps API Key
**Endpoint:** `GET /config/google-maps-key`

**Response:**
```json
{
  "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
}
```

#### 3. Get Images
**Endpoint:** `GET /images`

**Response:**
```json
{
  "images": [
    {
      "id": "img-001",
      "src": "path/to/image.jpg",
      "alt": "Property image",
      "category": "gallery"
    }
  ]
}
```

### Error Handling

All endpoints return standard error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

**Common Status Codes:**
- `200` — Successful request
- `400` — Bad request (invalid parameters)
- `404` — Resource not found
- `500` — Server error

---

## 📊 API Endpoints Summary

| Method | Endpoint | Purpose | Params |
|--------|----------|---------|--------|
| **GET** | `/get-property` | Fetch properties with sorting/filtering | `sort`, `limit` |
| **GET** | `/config/google-maps-key` | Get Google Maps API key config | None |
| **GET** | `/images` | Fetch image gallery data | None |

### Quick API Usage Examples

**Get nearby properties sorted by price:**
```bash
curl http://localhost:5000/get-property?sort=lowest-price&limit=6
```

**Get most popular properties:**
```bash
curl http://localhost:5000/get-property?sort=most-popular&limit=4
```

**Fetch images:**
```bash
curl http://localhost:5000/images
```

---

## 📁 Data Structure

The application uses JSON files located in `server/data/` for data persistence:

### Property Data Files

| File | Purpose | Contains |
|------|---------|----------|
| `most_popular.json` | Top-rated properties | 50+ resort listings sorted by rating |
| `highest_price.json` | Premium properties | 50+ high-end resort options |
| `lowest_price.json` | Budget-friendly | 50+ affordable resort options |
| `gallery.json` | Image metadata | Images for property showcase |

### Property Data Format

Each property object contains:
```json
{
  "ID": "prop-001",
  "Property": {
    "PropertyName": "Sanctuary Cap Cana",
    "Price": 250,
    "Counts": {
      "Bedroom": 2,
      "Bathroom": 2,
      "Occupancy": 4,
      "Reviews": 156
    },
    "ReviewScore": 9.0,
    "PropertyType": "Resort Villa",
    "FeatureImage": "url-to-image",
    "TopAmenities": ["Pool", "Spa", "Restaurant"],
    "PropertyHighlights": ["Beachfront", "All-Inclusive"]
  },
  "GeoInfo": {
    "Display": "Bayahibe, Dominican Republic",
    "Lat": "18.7345",
    "Lng": "-68.8901"
  }
}
```

### Frontend Data Formats

The client receives formatted data from API:
- Properties with essential fields only
- Locations with coordinates for map rendering
- Images with alt text and categories
- Reviews with ratings and guest comments

---

## 🔄 Development Workflow

### File Modifications

When making changes:

| File Type | Location | Hot Reload | Action |
|-----------|----------|-----------|--------|
| **HTML** | `client/index.html` | Manual refresh | Edit structure |
| **CSS** | `client/css/` | Manual refresh | Update styles |
| **JavaScript** | `client/scripts/` | Manual refresh | Modify functionality |
| **Server Logic** | `server/server.js` | Automatic* | Edit controllers/routes |
| **JSON Data** | `server/data/` | Automatic* | Update property data |

*With `npm start` (uses nodemon)

### Common Development Tasks

```bash
# Start development server with auto-reload
npm start

# Stop the server
Ctrl + C

# Update dependencies
npm install

# View logs in browser console
F12 or Cmd+Option+I
```

### API Testing Tools

```bash
# Get properties via curl
curl http://localhost:5000/api/get-property?sort=most-popular&limit=3

# Pretty print JSON
curl http://localhost:5000/api/images | jq .

# Test in browser DevTools
fetch('/api/get-property').then(r => r.json()).then(console.log)
```

---

## 🎨 Design System

### CSS Variables (`:root`)

All design tokens are centralized in CSS custom properties for consistency, maintainability, and easy theming:

```css
:root {
  /* Colors - Background & Surface */
  --bg: #c9f2f5;                    /* Page background (light cyan) */
  --surface: #ffffff;               /* Card background (white) */
  --card-border: 1px solid #ececec; /* Card border */
  
  /* Colors - Text */
  --text: #1f1f1f;                  /* Primary text (dark gray) */
  --text-secondary: #444;           /* Secondary text (medium gray) */
  --text-tertiary: #666;            /* Tertiary text (light gray) */
  --muted: #5a5a5a;                 /* Muted text (medium-light gray) */
  
  /* Colors - Brand & Accent */
  --brand: #00363a;                 /* Primary brand (dark teal) */
  --brand-2: #003f45;               /* Secondary brand (darker teal) */
  --accent: #ff9800;                /* Accent (orange) - buttons, badges */
  
  /* Styling */
  --line: #e6e6e6;                  /* Borders and dividers */
  --radius: 16px;                   /* Large border radius */
  --radius-sm: 12px;                /* Small border radius */
  
  /* Typography */
  --font-body: 'Inter', sans-serif;
  --font-heading: 'Playfair Display', serif;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
}
```

### Typography System

**Body Font:** `Inter` (sans-serif)
- Clean, modern, highly readable
- Weights: Regular (400), Medium (500), Semibold (600), Bold (700)
- Uses: Body text, UI labels, metadata

**Heading Font:** `Playfair Display` (serif)
- Elegant, luxury, distinctive
- Weights: Medium (500), Semibold (600), Bold (700)
- Uses: Page titles, section headings, highlights

### Color Palette

```
Primary:    #00363a (Dark Teal)   — Brand & buttons
Secondary:  #003f45 (Darker Teal) — Hover states, depth
Accent:     #ff9800 (Orange)      — CTAs, badges, highlights
Background: #c9f2f5 (Light Cyan)  — Page background
Surface:    #ffffff (White)       — Cards, containers
Text:       #1f1f1f (Dark Gray)   — Primary content
Muted:      #5a5a5a (Medium Gray) — Secondary content
Border:     #e6e6e6 (Light Gray)  — Lines & dividers
```

### Responsive Breakpoints

```css
/* Mobile-first approach */
/* Default: Mobile (< 640px) */
@media (min-width: 640px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

---

## 🌐 Browser Support

| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Opera | 76+ | ✅ Full Support |

**Note:** IE11 is not supported due to use of modern JavaScript features (ES6+, CSS Grid, CSS Variables).

---

## ⚡ Performance & SEO

### Performance Optimizations

✅ **Zero Framework Overhead:** Vanilla JavaScript with no framework bloat
✅ **Lazy Loading:** Images load on-demand to reduce initial page load
✅ **CSS Optimization:** Minimal CSS, critical path optimization
✅ **Asset Compression:** Images optimized and compressed
✅ **Caching Strategy:** Browser caching headers configured
✅ **Minimal Dependencies:** Only essential packages included

### SEO Best Practices

✅ **Semantic HTML:** Proper heading hierarchy, `<article>`, `<section>`, `<nav>`
✅ **Meta Tags:** Comprehensive title, description, keywords
✅ **Open Graph Tags:** Social media sharing optimization
✅ **Structured Data:** Schema.org markup for rich snippets
✅ **Mobile-Responsive:** Mobile-first design, optimized viewport
✅ **Performance:** Optimized for Core Web Vitals (LCP, FID, CLS)
✅ **Accessibility:** ARIA labels, keyboard navigation, alt text

### Lighthouse Scores Target

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **User Authentication:** Login/signup for personalized bookings
- [ ] **Booking Management:** User account with booking history
- [ ] **Payment Integration:** Stripe/PayPal for online payments
- [ ] **Email Notifications:** Booking confirmations and updates
- [ ] **Admin Dashboard:** Manage properties, images, and data
- [ ] **Multi-Language Support:** Internationalization (i18n)
- [ ] **Progressive Web App:** PWA support with offline capabilities
- [ ] **Advanced Filtering:** Filter by amenities, price range, rating
- [ ] **Review System:** User-submitted reviews and ratings
- [ ] **Real-Time Availability:** Live calendar sync with booking system
- [ ] **CRM Integration:** Guest management and communication
- [ ] **Analytics Dashboard:** Visitor tracking and conversion metrics

### Performance Improvements

- [ ] Service Worker for offline support
- [ ] Image CDN integration
- [ ] Database migration (from JSON to MongoDB/PostgreSQL)
- [ ] Rate limiting and API security enhancements
- [ ] WebP image format support

---

## 📝 License

This project is licensed under the ISC License — see the `package.json` file for details.

---

## 👤 Author

**Sadik MR**
- GitHub: [@SadikMR](https://github.com/SadikMR)
- Repository: [Resort-Booking](https://github.com/SadikMR/Resort-Booking)

---

## 💬 Support & Feedback

Have questions or feedback? Feel free to:
- 📧 Email: [your-email@example.com]
- 🐛 Report bugs: [GitHub Issues](https://github.com/SadikMR/Resort-Booking/issues)
- 💡 Suggest features: [GitHub Discussions](https://github.com/SadikMR/Resort-Booking/discussions)

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Google Maps API](https://developers.google.com/maps)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)
- [Core Web Vitals](https://web.dev/vitals/)
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
- ✅ **External CSS** — core styles (`css/styles.css`) plus picker styles (`css/hotel-datepicker.css`)
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

## 🖼️ External Resources

| Resource           | URL                                                                 |
|--------------------|---------------------------------------------------------------------|
| Google Fonts       | `fonts.googleapis.com` (Inter, Playfair Display)                    |
| Bootstrap Icons    | `cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3`                      |
| Unsplash Images    | `images.unsplash.com` (resort/hotel stock photos)                   |
| OpenStreetMap      | `openstreetmap.org/export/embed.html` (location maps)              |

> All external resources are loaded via CDN. No local assets required.
