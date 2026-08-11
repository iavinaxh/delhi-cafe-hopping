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

The site then searches Google Places and ranks the results against the request. When an OpenAI API key is configured, an AI ranking layer explains **why** each candidate fits without inventing current restaurant facts.

## Data architecture

```text
User preferences
      ↓
React planner
      ↓
/api/recommend
      ↓
Google Places API (New)
      ↓
Candidate restaurants / cafes
      ↓
Rule-based budget + relevance ranking
      ↓
OpenAI ranking + explanation (optional)
      ↓
Personalized recommendation cards
      ↓
Google Maps / website / Zomato search
```

Google is the live source for current place facts. The local curated dataset remains as a fallback and for the editorial sections such as quick picks, date plans and wishlist.

## Features

- **Personalized restaurant finder** for Delhi NCR
- Location input or browser **current location**
- Total budget for the whole group
- Group size
- Occasion and vibe filters
- Cuisine preference
- Maximum travel radius
- Free-text requirements
- Google Places live search
- Optional OpenAI ranking/explanation layer
- Google Maps links
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
GOOGLE_PLACES_API_KEY=your_google_places_api_key
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-mini
```

`OPENAI_API_KEY` is optional. Without it, the backend still returns Google Places candidates using deterministic ranking. With it, the site adds the AI explanation/ranking layer.

## Google Places setup

1. Create or select a Google Cloud project.
2. Attach a billing account.
3. Enable **Places API (New)**.
4. Create an API key.
5. Restrict the key to the required Google Maps Platform APIs and your server environment.
6. Add the key as `GOOGLE_PLACES_API_KEY` in Vercel.

Google Maps Platform is **not unlimited/free forever**. India has free monthly usage thresholds for eligible Core Service SKUs, and usage above those thresholds is billed. Keep budget alerts and usage limits enabled.

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

For the serverless `/api` route locally, use a Vercel-compatible development environment such as `vercel dev`, or deploy to Vercel and configure the environment variables there.

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

The AI is **not the restaurant database**. Google Places supplies current place data. The AI ranks and explains supplied candidates. The model is instructed not to invent current prices, offers, opening hours, reservation availability or restaurant facts.

## Curator

**Avinash Singh — @iavinaxh**

Made for people who would rather answer a few questions than spend an hour deciding where to eat.
