# Delhi NCR Restaurant Finder

> A curated Delhi NCR cafe and restaurant discovery website that helps people choose where to eat based on **area, budget, group size and vibe** instead of browsing hundreds of listings manually.

Curated by **[@iavinaxh](https://instagram.com/iavinaxh)**.

## What the product does

The website is built around a simple idea: users should answer a few useful questions and immediately get a practical shortlist from a curated Delhi NCR restaurant database.

Users can select:

- **Delhi NCR area** from the supported location list
- **Total budget** for the group
- **Number of people**
- **Vibe**, such as romantic, quiet, aesthetic, casual, youthful, rooftop, outdoor or lively

The recommendation engine ranks restaurants and cafes from the project's curated catalogue. It does not invent new restaurants or depend on live place-discovery APIs for the core recommendation flow.

## Recommendation flow

```text
User preferences
      ↓
React recommendation planner
      ↓
Curated Delhi NCR restaurant catalogue
      ↓
Area + vibe + budget + group-size ranking
      ↓
Group budget calculation
      ↓
Personalized recommendation cards
      ↓
Maps / Zomato / verified venue links
```

## Budget model

Restaurant prices in the catalogue are stored as an **approximate cost for 2 people** unless the source provides another clear basis.

The planner automatically scales the estimate with the selected group size.

For example:

```text
Catalogue estimate: ₹800–₹1,200 for 2 people

2 people → ₹800–₹1,200
4 people → ₹1,600–₹2,400
6 people → ₹2,400–₹3,600
```

The recommendation cards clearly distinguish the original **2-person listing** from the calculated estimate for the user's selected group size.

The planner also shows when the selected budget is below the estimated minimum spend for a venue, for example:

> Minimum recommended budget: ₹1,600 for 4 people.

These are planning estimates, not guaranteed bills. Restaurant prices, menus, taxes, offers and ordering choices can change.

## Features

- **Curated Delhi NCR restaurant finder**
- Fixed area/location selection instead of unreliable free-text location search
- Total group budget
- Group-size aware recommendations
- Automatic budget scaling from the catalogue's 2-person baseline
- Minimum recommended budget guidance
- Vibe-based ranking
- Curated restaurant and cafe catalogue covering major Delhi NCR areas
- Google Maps links for venue navigation
- Zomato links/searches where available
- Verified dining links only when an actual verified URL is stored
- Quick decision recommendations
- Ready-made date plans
- Metro route guidance
- Wishlist saved in browser storage
- Responsive design
- Warm cream / olive / pink visual theme

## Data philosophy

The curated database is the core product data source.

The project does **not** create fictional venues to fill search results. Restaurants and cafes are added to the catalogue based on known venues and researched listings. Each entry can contain information such as:

- Name
- Area / zone
- Approximate price for two
- Vibe / use case
- What to order
- Curator notes
- Maps link
- Zomato link
- Website or verified dining link when available

Because restaurant information changes, prices and availability should always be treated as approximate and checked with the venue before visiting.

## Why the project does not use Google Places API

The core recommendation experience does not require a paid Google Places API key.

Google Maps is used as a navigation destination through links. Restaurant recommendations themselves come from the project's curated catalogue.

This keeps the MVP predictable, avoids API-cost surprises and prevents a third-party place-search failure from producing an empty recommendation screen.

## AI integration

AI can be added as a ranking/explanation layer in the future, but **AI is not the restaurant database**.

The product rule is simple:

> The system may explain and rank known restaurant data. It must not invent restaurants, prices, offers, opening hours, reservation availability or other current facts.

If an AI provider is enabled, its role should remain constrained to the supplied catalogue and user preferences.

## Environment variables

Create a `.env` file locally or add variables in your deployment environment. **Never commit real API keys.**

```env
# Optional AI layer
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-mini
```

The core curated recommendation flow does not require a paid Google Places API key.

## Local setup

```bash
node -v
npm -v
npm install
npm run dev
npm run build
```

If serverless API routes are enabled in a deployment, use the deployment platform's compatible development command or deploy to the configured hosting environment.

## Project structure

```text
delhi-cafe-hopping/
├── api/
│   └── recommend.js
├── public/
│   ├── insta-qr.jpg
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── RecommendationPlanner.jsx
│   │   ├── CafeCard.jsx
│   │   ├── CafeExplorer.jsx
│   │   ├── DatePlansSection.jsx
│   │   ├── Hero.jsx
│   │   ├── MetroGuideSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── QuickDecisions.jsx
│   │   └── ...
│   ├── data/
│   │   ├── cafes.js
│   │   ├── discoveryCafes.js
│   │   └── datePlans.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Visual theme

The current interface uses four core colours:

- `#FFF7EB` — Cream background
- `#F9F0E0` — Warm surface / cards
- `#A2AB73` — Olive secondary accent
- `#CC3A63` — Pink primary accent

## Product principles

### 1. Do not show features that do not work reliably

If a data source cannot support a feature properly, the feature should be removed or simplified rather than shown as a broken control.

### 2. Recommendations must come from known data

The finder recommends from the curated catalogue. It should never manufacture restaurants simply because the user entered a difficult combination of filters.

### 3. Budget must mean something

The displayed budget is the user's **total target for the selected group**, while catalogue prices are based on **2 people**. Estimates are scaled with group size and the UI explains the difference clearly.

### 4. No fake booking links

The project does not generate fake Swiggy Dineout or reservation URLs. A dining/booking link is shown only when a verified URL is available. Otherwise, the user gets the appropriate venue/search destination.

### 5. Accuracy over pretending

Current prices, offers, opening hours and availability can change. The site presents them as planning information rather than guaranteed facts.

## CI

GitHub Actions runs the project build on pushes and pull requests to `main` so frontend build regressions are caught automatically.

## Curator

**Avinash Singh — @iavinaxh**

Made for people who would rather answer a few useful questions than spend an hour deciding where to eat.
