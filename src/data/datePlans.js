export const DATE_PLANS = [
  {
    id: "plan-a",
    title: "PLAN A — Pacific Mall",
    tag: "Best Overall Day Date",
    budget: "₹600–₹900",
    timing: "12:00 PM – 4:30 PM",
    timeline: [
      { time: "12:00 PM", detail: "Leave Paschim Vihar West Metro station" },
      { time: "1:00 PM", detail: "Arrive at Tagore Garden / Pacific Mall" },
      { time: "1:15 – 2:15 PM", detail: "Lunch at California Burrito (2 bowls/burritos)" },
      { time: "2:15 – 3:30 PM", detail: "Mall walk, window shopping & exploring" },
      { time: "3:30 – 4:30 PM", detail: "Coffee/dessert at Kenangan Coffee OR optional movie" }
    ],
    whyItWorks: "All activities (food + walk + shopping + movie) happen in one climate-controlled location. Minimal travel hassle!"
  },
  {
    id: "plan-b",
    title: "PLAN B — Cine Tree + CP",
    tag: "Best Evening Date",
    budget: "₹550–₹900",
    timing: "4:30 PM – 8:15 PM",
    timeline: [
      { time: "4:30 PM", detail: "Leave Paschim Vihar West Metro" },
      { time: "5:30 PM", detail: "Reach Cine Tree Cafe (Constitution Club)" },
      { time: "5:45 – 7:00 PM", detail: "Open-air pizza (~₹300) & drinks (~₹125 each)" },
      { time: "7:00 – 8:15 PM", detail: "Stroll through CP Inner Circle, Central Park & Janpath night market" }
    ],
    whyItWorks: "Incredible value! Relaxing open-air green atmosphere followed by a romantic walk in Central Park."
  },
  {
    id: "plan-c",
    title: "PLAN C — Kartoon Cafe + Rajouri",
    tag: "Fun & Casual Evening",
    budget: "₹850–₹1,000",
    timing: "5:00 PM – 8:15 PM",
    timeline: [
      { time: "5:00 PM", detail: "Leave Paschim Vihar West Metro" },
      { time: "5:30 PM", detail: "Arrive in Rajouri Garden (~21 min via Green/Pink line)" },
      { time: "5:45 – 7:15 PM", detail: "Kartoon Cafe: Honey Chilli Potato + Pink Panther Pasta + drinks" },
      { time: "7:15 – 8:15 PM", detail: "Rajouri Garden market walk + ice cream/dessert" }
    ],
    whyItWorks: "Super quick 20-minute metro travel time from Paschim Vihar with vibrant market energy."
  },
  {
    id: "plan-d",
    title: "PLAN D — Triveni Terrace",
    tag: "Quiet Artsy & Classy Date",
    budget: "₹800–₹1,000",
    timing: "4:00 PM – 7:45 PM",
    timeline: [
      { time: "4:00 PM", detail: "Leave Paschim Vihar West" },
      { time: "5:00 PM", detail: "Arrive at Mandi House Arts District" },
      { time: "5:00 – 6:45 PM", detail: "Triveni Terrace Cafe: Palak Patta Chaat + Bun Tikki + 2 Chai/Coffee" },
      { time: "6:45 – 7:45 PM", detail: "Explore Mandi House art galleries or walk toward Kartavya Path / India Gate" }
    ],
    whyItWorks: "Unmatched serene courtyard ambience for deep, calm conversations far away from city noise."
  }
];

export const METRO_ROUTES = [
  { destination: "Rajouri Garden", route: "Paschim Vihar West → Green Line → Punjabi Bagh West → Pink Line → Rajouri Garden", time: "~20–21 min", transfers: "1 interchange" },
  { destination: "Pacific Mall (Tagore Garden)", route: "Paschim Vihar West → Green Line → Kirti Nagar → Blue Line → Tagore Garden → Walk to Mall", time: "~30 min", transfers: "1 interchange" },
  { destination: "CP (Connaught Place)", route: "Paschim Vihar West → Green Line → Kirti Nagar → Blue Line → Rajiv Chowk → Walk", time: "~35–40 min", transfers: "1 interchange" },
  { destination: "Vegas Mall (Dwarka)", route: "Paschim Vihar West → Green Line → Kirti Nagar → Blue Line → Dwarka Sector 14 → Walk", time: "~45 min", transfers: "1 interchange" },
  { destination: "Mandi House (Triveni / IGNCA)", route: "Paschim Vihar West → Green Line → Kirti Nagar → Blue Line → Mandi House → Walk/Auto", time: "~40 min", transfers: "1 interchange" }
];
