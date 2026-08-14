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
  },
  {
    id: "plan-e",
    title: "PLAN E — CP Coffee + Dessert Walk",
    tag: "Best Budget CP Date",
    budget: "₹500–₹900",
    timing: "4:30 PM – 7:30 PM",
    timeline: [
      { time: "4:30 PM", detail: "Take the Yellow or Blue Line to Rajiv Chowk. CP is directly served by Rajiv Chowk station." },
      { time: "5:00 – 6:00 PM", detail: "Coffee and a light Italian cafe meal at Brew & Bites, C-19, Block C." },
      { time: "6:00 – 6:45 PM", detail: "Walk the C Block and Inner Circle, with Central Park as an easy detour." },
      { time: "6:45 – 7:30 PM", detail: "Finish with a low-cost shake or dessert at Shake Square around the A/C Block side of CP." }
    ],
    whyItWorks: "It keeps the spend controlled while still feeling like a proper date: one sit-down stop, a real walk and a dessert finish."
  },
  {
    id: "plan-f",
    title: "PLAN F — CP Dinner + Inner Circle",
    tag: "Best Easy Evening",
    budget: "₹1,000–₹1,800",
    timing: "6:00 PM – 9:00 PM",
    timeline: [
      { time: "6:00 PM", detail: "Arrive at Rajiv Chowk and walk into the Inner Circle. No interchange is needed if you are already on the Yellow or Blue Line." },
      { time: "6:15 – 7:45 PM", detail: "Choose a CP dinner from the catalogue, such as The Immigrant Cafe, with the current Dineout estimate shown in its venue card." },
      { time: "7:45 – 8:30 PM", detail: "Walk the Inner Circle, Central Park and nearby colonnades instead of immediately taking transport home." },
      { time: "8:30 – 9:00 PM", detail: "Optional coffee, shake or dessert stop if the group wants a second bite." }
    ],
    whyItWorks: "CP already concentrates restaurants, shops and walkable public spaces around Rajiv Chowk, so the plan does not depend on taxis between stops."
  }
];

export const METRO_ROUTES = [
  { destination: "Rajouri Garden", route: "Use the Blue Line to Rajouri Garden, or interchange to the Pink Line at Punjabi Bagh West when that is the more convenient direction from your starting station.", time: "Route varies", transfers: "Blue/Pink Line access" },
  { destination: "Pacific Mall (Tagore Garden)", route: "Blue Line → Tagore Garden → short walk/last-mile connection to Pacific Mall.", time: "Route varies", transfers: "Direct on Blue Line" },
  { destination: "CP (Connaught Place)", route: "Yellow Line or Blue Line → Rajiv Chowk → use the station exits for Connaught Place and walk into the Inner Circle.", time: "Central hub", transfers: "No interchange on Yellow/Blue Line" },
  { destination: "Vegas Mall (Dwarka)", route: "Blue Line → Dwarka Sector 14 → walk/short last-mile connection to Vegas Mall.", time: "Route varies", transfers: "Direct on Blue Line" },
  { destination: "Mandi House (Triveni / IGNCA)", route: "Blue Line or Violet Line → Mandi House → walk or take a short last-mile ride depending on the destination.", time: "Route varies", transfers: "Major Blue/Violet interchange" },
  { destination: "Brew & Bites — C-19 CP", route: "Yellow/Blue Line → Rajiv Chowk → walk through the Inner Circle toward C Block and Radial Road. The venue is at Ground Floor, C-19, Block C.", time: "Walk from Rajiv Chowk", transfers: "No interchange on Yellow/Blue Line" },
  { destination: "Shake Square — A/C Block CP", route: "Yellow/Blue Line → Rajiv Chowk → walk through the Inner/Middle Circle toward the A/C Block side. Check the venue card because current listings identify CP outlets by block.", time: "Walk from Rajiv Chowk", transfers: "No interchange on Yellow/Blue Line" },
  { destination: "Massala Singh — K-14 CP", route: "Yellow/Blue Line → Rajiv Chowk → walk around the Inner/Outer Circle toward K Block and K-14.", time: "Walk from Rajiv Chowk", transfers: "No interchange on Yellow/Blue Line" },
  { destination: "The Immigrant Cafe — B-45 CP", route: "Yellow/Blue Line → Rajiv Chowk → walk toward B Block / Inner Circle. Use the venue's Maps link for the final few minutes.", time: "Walk from Rajiv Chowk", transfers: "No interchange on Yellow/Blue Line" }
];
