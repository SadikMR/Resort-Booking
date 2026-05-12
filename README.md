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
✅ Date range picker (Hotel Datepicker) for booking availability
✅ Interactive Google Maps with location & nearby resorts
✅ Nearby resorts discovery with sorting (price, popularity, ratings)
✅ Favorites/Wishlist functionality with localStorage persistence
✅ Reviews and ratings system with guest testimonials
✅ Hotel policies, FAQs, and expandable sections
✅ Newsletter subscription and contact forms
✅ Image gallery with modal preview and thumbnails
✅ Completely responsive (mobile-first design)
✅ Zero JavaScript framework dependencies (vanilla JS)

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
    │   │   ├── hotel-datepicker.js     # Date picker component library
    │   │   └── fecha.js                # Date formatting utility
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
- **Hotel Datepicker:** Select check-in and check-out dates with visual calendar, keyboard navigation
- **Real-time Pricing:** Dynamic price calculation based on selected dates and stay duration
- **Availability Tracking:** Check availability for specific date ranges
- **Quick Actions:** Phone CTA, booking specialist contact, hot deal badge

### 🗺️ Interactive Maps
- **Google Maps Integration:** Property location map with drop-animation markers
- **Nearby Resorts Discovery:** Browse 6 nearby properties with sorting (most-popular, highest-price, lowest-price)
- **Map-Card Synchronization:** Hover on cards to highlight markers, click markers to highlight cards
- **Proximity Information:** Distances and locations for nearby properties

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
- **Property Cards:** Image, name, price, bedrooms, bathrooms, rating with quick details
- **Favorites/Wishlist:** Save favorite properties with heart icon, persists via localStorage
- **Responsive Loading:** 6 properties on desktop, 4 on mobile devices

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
| **fecha** | Date formatting | Lightweight date utility from [Hotel Datepicker](https://hoteldatepicker.org/) |
| **hotel-datepicker** | Date picker UI | Pure JavaScript date range picker from [Hotel Datepicker](https://hoteldatepicker.org/) |

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
