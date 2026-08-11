# Delhi NCR Restaurant Finder

> A personalized Delhi NCR restaurant and cafe discovery website. Tell it your **location, budget, group size, occasion, cuisine, vibe and travel radius**, and it finds a short list of places that fit. Curated by **[@iavinaxh](https://instagram.com/iavinaxh)**.

## What the product does

Instead of making people browse a long restaurant directory, the homepage asks:

- Where are you?
- What is your total budget?
- How many people?
- What is the occasion?
- What vibe do you want?
- Which cuisine?
- How far are you willing to travel?
- Anything else, such as vegetarian, quiet, romantic, rooftop, birthday, dinner + walk, etc.

The site searches OpenStreetMap place data around the requested area and ranks the results against the request. When an OpenAI API key is configured, an AI ranking layer explains **why** each candidate fits without inventing current restaurant facts.

## Data architecture

```text
User preferences
      ↓
React planner
      ↓
/api/recommend
      ↓
Photon geocoding (OpenStreetMap)
      ↓
Overpass API (OpenStreetMap places)
      ↓
Distance + preference ranking
      ↓
OpenAI ranking + explanation (optional)
      ↓
Personalized recommendation cards
      ↓
Google Maps / website / Zomato search
```

The free OpenStreetMap layer is used for live place discovery, so the project does **not** require a paid Google Places API key. The local curated dataset remains as a fallback and powers the editorial sections such as quick picks, date plans and wishlist.

## Features

- **Personalized restaurant finder** for Delhi NCR
- Location input or browser **current location**
- Total budget for the whole group
- Group size
- Occasion and vibe filters
- Cuisine preference
- Maximum travel radius
- Free-text requirements
- OpenStreetMap live place discovery
- Photon location search
- Optional OpenAI ranking/explanation layer
- Google Maps links without Google Places API
- Zomato search links for dynamic results
- Verified Swiggy Dineout links for curated restaurants only
- 36+ curated Delhi NCR destinations
- Quick decision picks
- Ready-made date plans
- Metro route guide
- Wishlist saved in browser storage
- Warm cream / olive / pink visual theme

## Environment variables

Create a `.env` file locally or add these variables in Vercel. **Never commit real API keys.**

```env
# Optional. Restaurant discovery does not require a paid Google Places key.
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-mini
```

`OPENAI_API_KEY` is optional. Without it, the backend still returns OpenStreetMap candidates using deterministic ranking. With it, the site adds the AI explanation/ranking layer.

## Free place-data stack

The project uses public OpenStreetMap-based services:

- **Photon** for converting a neighbourhood, landmark or metro station into coordinates.
- **Overpass API** for finding mapped cafes, restaurants and fast-food places around those coordinates.
- **Google Maps links** only for opening the place in Maps. The site does not call the paid Google Places API.

These public services are free to access but are **not an unlimited commercial API**. Their infrastructure is shared and subject to fair-use, capacity and policy limits. The app therefore keeps searches user-triggered, bounded to a maximum discovery radius, limits the result set, caches repeated requests for a short period and has a fallback curated dataset. If usage becomes significant, the correct next step is to move to a dedicated/self-hosted OSM/Overpass stack or a commercial POI provider rather than increasing load on public servers. See the [Overpass usage guidance](https://dev.overpass-api.de/overpass-doc/en/preface/commons.html) and [OpenStreetMap service policies](https://operations.osmfoundation.org/policies/).

Place data is © OpenStreetMap contributors and available under the [ODbL](https://www.openstreetmap.org/copyright).

## OpenAI setup

1. Create an API key in the OpenAI Platform.
2. Add it to Vercel as `OPENAI_API_KEY`.
3. Optionally set `OPENAI_MODEL`.

The OpenAI key is used only by the server-side `/api/recommend` endpoint. It is never exposed in browser code.

## Local setup

```bash
node -v
npm -v
npm install
npm run dev
npm run build
```

For the serverless `/api` route locally, use a Vercel-compatible development environment such as `vercel dev`, or deploy to Vercel. The public OpenStreetMap discovery services do not require an API key for this MVP.

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

- `#FFF7EB` Cream background
- `#F9F0E0` Warm surface/card
- `#A2AB73` Olive secondary accent
- `#CC3A63` Pink primary accent

## Important product rule

The AI is **not the restaurant database**. OpenStreetMap supplies the discovered place facts. The AI only ranks and explains supplied candidates. The model is instructed not to invent current prices, offers, opening hours, reservation availability or restaurant facts.

Likewise, the app does not create fake Swiggy Dineout links for dynamically discovered places. Dineout is shown only for curated venues where a verified URL is already stored.

## CI

GitHub Actions runs `npm install` and `npm run build` on pushes and pull requests to `main` so frontend build regressions are caught automatically.

## Curator

**Avinash Singh — @iavinaxh**

Made for people who would rather answer a few questions than spend an hour deciding where to eat.
