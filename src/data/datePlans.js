export const DATE_PLANS = [
  {
    id: "plan-a",
    title: "PLAN A — Pacific Mall",
    tag: "Best Overall Day Date",
    budget: "₹600–₹900",
    timing: "12:00 PM – 4:30 PM",
    timeline: [
      { time: "12:00 PM", detail: "Head to Tagore Garden / Pacific Mall from the metro station closest to you" },
      { time: "1:00 PM", detail: "Arrive at Tagore Garden / Pacific Mall" },
      { time: "1:15 – 2:15 PM", detail: "Lunch at California Burrito (2 bowls/burritos)" },
      { time: "2:15 – 3:30 PM", detail: "Mall walk, window shopping & exploring" },
      { time: "3:30 – 4:30 PM", detail: "Coffee/dessert at Kenangan Coffee OR optional movie" }
    ],
    whyItWorks: "Food, walking, shopping and a movie all happen in one climate-controlled location, so the date stays simple and flexible."
  },
  {
    id: "plan-b",
    title: "PLAN B — Cine Tree + CP",
    tag: "Best Evening Date",
    budget: "₹550–₹900",
    timing: "4:30 PM – 8:15 PM",
    timeline: [
      { time: "4:30 PM", detail: "Travel toward Central Delhi using the metro route closest to you" },
      { time: "5:30 PM", detail: "Reach Cine Tree Cafe (Constitution Club)" },
      { time: "5:45 – 7:00 PM", detail: "Open-air pizza (~₹300) & drinks (~₹125 each)" },
      { time: "7:00 – 8:15 PM", detail: "Stroll through CP Inner Circle, Central Park & Janpath night market" }
    ],
    whyItWorks: "Relaxed open-air atmosphere followed by a lively Central Delhi walk gives you both conversation time and something to do after dinner."
  },
  {
    id: "plan-c",
    title: "PLAN C — Kartoon Cafe + Rajouri",
    tag: "Fun & Casual Evening",
    budget: "₹850–₹1,000",
    timing: "5:00 PM – 8:15 PM",
    timeline: [
      { time: "5:00 PM", detail: "Travel toward Rajouri Garden on the nearest convenient metro route" },
      { time: "5:30 PM", detail: "Arrive in Rajouri Garden and walk toward the cafe" },
      { time: "5:45 – 7:15 PM", detail: "Kartoon Cafe: Honey Chilli Potato + Pink Panther Pasta + drinks" },
      { time: "7:15 – 8:15 PM", detail: "Rajouri Garden market walk + ice cream/dessert" }
    ],
    whyItWorks: "A fun cafe plus a busy market gives the date a youthful, casual feel without needing a second destination."
  },
  {
    id: "plan-d",
    title: "PLAN D — Triveni Terrace",
    tag: "Quiet Artsy & Classy Date",
    budget: "₹800–₹1,000",
    timing: "4:00 PM – 7:45 PM",
    timeline: [
      { time: "4:00 PM", detail: "Travel toward Mandi House from the metro station closest to you" },
      { time: "5:00 PM", detail: "Arrive at Mandi House Arts District" },
      { time: "5:00 – 6:45 PM", detail: "Triveni Terrace Cafe: Palak Patta Chaat + Bun Tikki + 2 Chai/Coffee" },
      { time: "6:45 – 7:45 PM", detail: "Explore Mandi House art galleries or walk toward Kartavya Path / India Gate" }
    ],
    whyItWorks: "A calm courtyard and nearby arts district make this the strongest option for an unhurried conversation-first date."
  }
];

export const METRO_ROUTES = [
  { destination: "Rajouri Garden", route: "Green Line → Punjabi Bagh West → interchange to Pink Line → Rajouri Garden", time: "Route varies", transfers: "1 interchange" },
  { destination: "Pacific Mall (Tagore Garden)", route: "Blue Line → Tagore Garden → short walk to Pacific Mall", time: "Route varies", transfers: "Direct on Blue Line" },
  { destination: "CP (Connaught Place)", route: "Blue Line → Rajiv Chowk → walk to Inner Circle", time: "Route varies", transfers: "Direct on Blue Line" },
  { destination: "Vegas Mall (Dwarka)", route: "Blue Line → Dwarka Sector 14 → walk to Vegas Mall", time: "Route varies", transfers: "Direct on Blue Line" },
  { destination: "Mandi House (Triveni / IGNCA)", route: "Blue Line / Violet Line → Mandi House → walk or short auto", time: "Route varies", transfers: "Central interchange station" }
];
