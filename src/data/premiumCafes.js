const q = (value) => encodeURIComponent(value);
const maps = (name, address) => `https://www.google.com/maps/search/?api=1&query=${q(`${name}, ${address}`)}`;
const zomatoSearch = (name) => `https://www.zomato.com/ncr/restaurants?q=${q(name)}`;
const swiggySearch = (name) => `https://www.swiggy.com/dineout/search?q=${q(name)}`;

// Premium / experience-first venues. Prices are approximate for 2 people and are intentionally not capped at ₹1,000.
export const PREMIUM_CAFES = [
  {
    id:'sly-granny-khan-market', name:'Sly Granny', zone:'Khan Market', budget:'₹3,500', costPerPerson:'₹1,750', budgetCategory:'premium-3000-plus',
    bestFor:'Stylish Italian/European meal, date night and polished Khan Market ambience', vibeTag:'Quiet & Classy', whatToOrder:'Biscuits and Gravy, Barley Salad, Tamarind Chicken, Lamb Bolognaise or Apple Crumble. Pick according to dietary preference and share where practical.',
    metroRoute:'Khan Market Metro (Violet Line) → walk through Khan Market to Flat 4.', afterFood:'Khan Market walk, bookstores and nearby Lodhi Garden if you want a longer post-meal walk.',
    curatorTake:'A strong premium pick when ambience matters as much as the food. Zomato currently lists about ₹3,500 for two.',
    mapsUrl:maps('Sly Granny','Flat 4, 1st & 2nd Floor, Khan Market, New Delhi'), zomatoUrl:'https://www.zomato.com/ncr/sly-granny-khan-market-new-delhi', swiggyUrl:swiggySearch('Sly Granny Khan Market'),
    websiteUrl:'https://slygranny.com'
  },
  {
    id:'mamagoto-khan-market', name:'Mamagoto', zone:'Khan Market', budget:'₹3,000', costPerPerson:'₹1,500', budgetCategory:'premium-3000-plus',
    bestFor:'Asian/Japanese/Thai dinner with lively interiors', vibeTag:'Casual Dining', whatToOrder:'Start with one shared Asian starter, then choose a sushi/noodle or rice main according to preference. Check the current menu before ordering.',
    metroRoute:'Khan Market Metro (Violet Line) → walk to Khan Market.', afterFood:'Khan Market shopping/bookstore walk or Lodhi Garden for a quieter finish.',
    curatorTake:'A good premium Asian option for a lively dinner. Current Delhi NCR listings put it around ₹2,500–₹3,000 for two depending on listing and offers.',
    mapsUrl:maps('Mamagoto','Khan Market, New Delhi'), zomatoUrl:zomatoSearch('Mamagoto Khan Market Delhi'), swiggyUrl:swiggySearch('Mamagoto Khan Market Delhi')
  },
  {
    id:'wok-in-the-clouds-khan-market', name:'Wok In The Clouds', zone:'Khan Market', budget:'₹2,800', costPerPerson:'₹1,400', budgetCategory:'premium-2000-3000',
    bestFor:'Pan-Asian variety and a more energetic premium dinner', vibeTag:'Casual Dining', whatToOrder:'Choose one shared starter plus two Asian mains for the table. Sushi, Chinese or Thai options are the natural starting points.',
    metroRoute:'Khan Market Metro (Violet Line) → walk to Khan Market.', afterFood:'Khan Market market walk or Lodhi Garden.', curatorTake:'Useful when the group has mixed Asian-food preferences and wants a more energetic setting.',
    mapsUrl:maps('Wok In The Clouds','Khan Market, New Delhi'), zomatoUrl:zomatoSearch('Wok In The Clouds Khan Market Delhi'), swiggyUrl:swiggySearch('Wok In The Clouds Khan Market Delhi')
  },
  {
    id:'klap-khan-market', name:'KLAP', zone:'Khan Market', budget:'₹3,500', costPerPerson:'₹1,750', budgetCategory:'premium-3000-plus',
    bestFor:'Modern Indian, Asian and Japanese food in a premium setting', vibeTag:'Quiet & Classy', whatToOrder:'Build the meal around one shared starter and two mains; the current listing covers Modern Indian, Asian and Japanese options.',
    metroRoute:'Khan Market Metro (Violet Line) → walk to Khan Market.', afterFood:'Khan Market shopping and bookstore walk.', curatorTake:'A premium, cuisine-flexible option for people who care about presentation and ambience as much as the bill.',
    mapsUrl:maps('KLAP','Khan Market, New Delhi'), zomatoUrl:zomatoSearch('KLAP Khan Market Delhi'), swiggyUrl:swiggySearch('KLAP Khan Market Delhi')
  },
  {
    id:'fat-lulus-khan-market', name:"Fat Lulu's Cafe & Bar", zone:'Khan Market', budget:'₹2,700', costPerPerson:'₹1,350', budgetCategory:'premium-2000-3000',
    bestFor:'Italian comfort food, pasta and pizza in Khan Market', vibeTag:'Casual Dining', whatToOrder:'Share a pizza or pasta with a starter. If you want a lighter bill, skip alcohol and keep to food + soft drinks.',
    metroRoute:'Khan Market Metro (Violet Line) → walk to Khan Market.', afterFood:'Khan Market walk and nearby Lodhi Garden.', curatorTake:'A good middle ground between casual cafe food and a full premium dinner. Community discussions also frequently mention its pasta.',
    mapsUrl:maps("Fat Lulu's Cafe & Bar",'Khan Market, New Delhi'), zomatoUrl:zomatoSearch("Fat Lulu's Khan Market Delhi"), swiggyUrl:swiggySearch("Fat Lulu's Khan Market Delhi")
  },
  {
    id:'pour-over-khan-market', name:'Pour Over', zone:'Khan Market', budget:'₹2,000', costPerPerson:'₹1,000', budgetCategory:'premium-1500-2500',
    bestFor:'Specialty coffee, brunch and a polished cafe date', vibeTag:'Coffee & Dessert', whatToOrder:'Australian Mocha, Blended Tiramisu, Spanish Latte or a manual brew. For food, choose from the current pizza, pasta, toastie or small-plate menu.',
    metroRoute:'Khan Market Metro (Violet Line) → walk to Shop 11B, First Floor, Rabindra Nagar.', afterFood:'Khan Market shopping and bookstore walk.', curatorTake:'One of the strongest cafe choices here for coffee-first dates. Zomato currently lists about ₹2,000 for two, while Swiggy Dineout has a separate current listing.',
    mapsUrl:maps('Pour Over','Shop 11B, First Floor, Rabindra Nagar, Khan Market, New Delhi'), zomatoUrl:'https://www.zomato.com/ncr/pour-over-khan-market-new-delhi', swiggyUrl:'https://www.swiggy.com/city/delhi/pour-over-khan-market-rest1373456', dineoutUrl:'https://www.swiggy.com/restaurants/delhi/khan-market/pour-over-962101/dineout'
  },
  {
    id:'green-mantis-khan-market', name:'Green Mantis', zone:'Khan Market', budget:'₹3,500', costPerPerson:'₹1,750', budgetCategory:'premium-3000-plus',
    bestFor:'All-vegetarian Pan-Asian dining', vibeTag:'Quiet & Classy', whatToOrder:'The Green Mantis Signature Box is a useful starting point for two; Swiggy currently lists it at ₹1,390 and says it serves two. Add drinks only if the budget allows.',
    metroRoute:'Khan Market Metro (Violet Line) → walk to Khan Market.', afterFood:'Khan Market walk or Lodhi Garden.', curatorTake:'A particularly useful premium option for vegetarian Asian food. Swiggy currently lists the venue and a signature box for two.',
    mapsUrl:maps('Green Mantis','Khan Market, New Delhi'), zomatoUrl:zomatoSearch('Green Mantis Khan Market Delhi'), swiggyUrl:'https://www.swiggy.com/city/delhi/green-mantis-khan-market-rest435110', dineoutUrl:'https://www.swiggy.com/restaurants/delhi/khan-market/green-mantis-435110/dineout'
  },
  {
    id:'rasayyah-lodhi-colony', name:'Rasayyah', zone:'Lodhi Colony / Mehar Chand Market', budget:'₹2,000', costPerPerson:'₹1,000', budgetCategory:'premium-1500-2500',
    bestFor:'North Indian, Lucknowi and Kashmiri flavours', vibeTag:'Casual Dining', whatToOrder:'Choose one kebab/BBQ starter and one North Indian or Lucknowi main to share; add dessert if the bill permits.',
    metroRoute:'Jor Bagh Metro (Yellow Line) → short auto/e-rickshaw to Mehar Chand Market.', afterFood:'Mehar Chand Market walk or Lodhi Garden.', curatorTake:'A strong food-first premium pick. Zomato currently lists around ₹2,000 for two and confirms lunch, dinner and home delivery.',
    mapsUrl:maps('Rasayyah','Shop 12 and 13, Mehar Chand Market, Defence Colony, Lodhi Colony, New Delhi'), zomatoUrl:'https://www.zomato.com/ncr/rasayyah-2-lodhi-colony-new-delhi/info', swiggyUrl:swiggySearch('Rasayyah Lodhi Colony Delhi')
  },
  {
    id:'out-of-the-box-courtyard-cp', name:'Out Of The Box Courtyard', zone:'CP / Central Delhi', budget:'₹3,000', costPerPerson:'₹1,500', budgetCategory:'premium-3000-plus',
    bestFor:'Large-group ambience, multi-cuisine dinner and CP nightlife', vibeTag:'Casual Dining', whatToOrder:'Pick one shared starter and two mains across the group. Cuisine spans Continental, North Indian, Italian, Pizza, Chinese and Asian.',
    metroRoute:'Rajiv Chowk Metro (Blue/Yellow Line) → walk to B 14/1-6, Middle Circle.', afterFood:'CP Inner Circle, Central Park and Janpath.', curatorTake:'A useful premium CP option when ambience and group flexibility matter. Zomato currently lists about ₹3,000 for two.',
    mapsUrl:maps('Out Of The Box Courtyard','B 14/1-6, Middle Circle, Connaught Place, New Delhi'), zomatoUrl:'https://www.zomato.com/ncr/out-of-the-box-courtyard-1-connaught-place-new-delhi', swiggyUrl:swiggySearch('Out Of The Box Courtyard Connaught Place Delhi')
  },
  {
    id:'ce-la-vie-cp', name:'Cé La Vie Kitchen & Bar', zone:'CP / Central Delhi', budget:'₹3,300', costPerPerson:'₹1,650', budgetCategory:'premium-3000-plus',
    bestFor:'Romantic dining, lounge seating, live entertainment and broad cuisine choices', vibeTag:'Quiet & Classy', whatToOrder:'Build around one shared starter and two mains from the Mediterranean, Continental, Lebanese, Italian or Asian sections. Keep alcohol separate from the food budget.',
    metroRoute:'Rajiv Chowk Metro → walk to H-11, Connaught Circle, Block H.', afterFood:'Central Park, CP Inner Circle and Janpath.', curatorTake:'A stronger choice when the ambience itself is part of the date. Zomato currently lists about ₹3,300 for two without alcohol.',
    mapsUrl:maps('Cé La Vie Kitchen & Bar','H-11, Ground Floor, Connaught Circle, Block H, Connaught Place, New Delhi'), zomatoUrl:'https://www.zomato.com/ncr/c%C3%A9-la-vie-kitchen-bar-connaught-place-new-delhi', swiggyUrl:swiggySearch('Cé La Vie Kitchen Bar Connaught Place Delhi')
  },
  {
    id:'the-darzi-bar-cp', name:'The Darzi Bar & Kitchen', zone:'CP / Central Delhi', budget:'₹4,000', costPerPerson:'₹2,000', budgetCategory:'premium-4000-plus',
    bestFor:'High-energy premium CP dinner with Indian and Asian variety', vibeTag:'Casual Dining', whatToOrder:'Choose a shared starter plus two mains; the current listing covers North Indian, Chinese, Asian, Italian and Mughlai options.',
    metroRoute:'Rajiv Chowk Metro → walk to H-55, Outer Circle, Connaught Place.', afterFood:'CP Inner Circle, Central Park or Janpath.', curatorTake:'This is intentionally in the high-price tier. Zomato currently lists about ₹4,000 for two, so it is for users prioritising experience over budget.',
    mapsUrl:maps('The Darzi Bar & Kitchen','H 55, 1st Floor, Outer Circle, Connaught Place, New Delhi'), zomatoUrl:'https://www.zomato.com/TheDarziBar/info', swiggyUrl:swiggySearch('The Darzi Bar Kitchen Connaught Place Delhi')
  },
  {
    id:'eleved-chanakyapuri', name:'eleved', zone:'Chanakyapuri', budget:'₹2,600', costPerPerson:'₹1,300', budgetCategory:'premium-2000-3000',
    bestFor:'Premium cafe breakfast, coffee and modern Indian/Continental meals', vibeTag:'Quiet & Classy', whatToOrder:'Use the all-day breakfast or coffee menu as the starting point; choose one substantial dish to share if you want to control spend.',
    metroRoute:'Lok Kalyan Marg Metro (Yellow Line) → short auto to Malcha Marg.', afterFood:'Malcha Marg and Chanakyapuri diplomatic-area drive/walk.', curatorTake:'A polished cafe rather than a loud nightlife venue. Zomato currently lists about ₹2,600 for two and notes all-day breakfast plus vegan/gluten-free options.',
    mapsUrl:maps('eleved','Shop 16/48, Malcha Marg, Chanakyapuri, New Delhi'), zomatoUrl:'https://www.zomato.com/hi/ncr/eleved-chanakyapuri-new-delhi', swiggyUrl:swiggySearch('eleved Chanakyapuri Delhi')
  },
  {
    id:'turkey-project-defence-colony', name:'The Turkey Project - Pizzeria And Sangria Bar', zone:'Defence Colony', budget:'₹1,700', costPerPerson:'₹850', budgetCategory:'premium-1500-2500',
    bestFor:'Pizza, Italian food and a casual premium date', vibeTag:'Casual Dining', whatToOrder:'Magic Of The Shrooms Pizza, A Truffled Affair Pasta or Trio Tomato Arrabbiata Pasta are among the dishes currently surfaced by Swiggy.',
    metroRoute:'Moolchand Metro (Yellow/Violet interchange access) → short auto toward Defence Colony Market.', afterFood:'Defence Colony Market walk and nearby cafes/dessert spots.', curatorTake:'A more approachable premium option. Swiggy currently confirms delivery and highlights its Italian dishes and several popular menu items.',
    mapsUrl:maps('The Turkey Project','C-27, DDA Commercial Complex, Defence Colony, New Delhi'), zomatoUrl:zomatoSearch('The Turkey Project Defence Colony Delhi'), swiggyUrl:'https://www.swiggy.com/city/delhi/the-turkey-project-lajpat-nagar-defence-colony-rest980748'
  },
  {
    id:'elan-the-lodhi', name:'Elan - The Lodhi', zone:'Lodhi Road', budget:'₹3,600', costPerPerson:'₹1,800', budgetCategory:'premium-3000-plus',
    bestFor:'Hotel dining, polished ambience and Italian/Asian/Continental food', vibeTag:'Quiet & Classy', whatToOrder:'Choose one shared starter and mains from the Italian, Continental or Asian sections. For a controlled bill, skip alcohol.',
    metroRoute:'JLN Stadium Metro (Violet Line) → short auto to The Lodhi on Lodhi Road.', afterFood:'Lodhi Garden is the obvious post-meal walk if weather and timing allow.', curatorTake:'A genuine premium hotel-dining choice. Zomato currently lists about ₹3,600 for two and shows table-booking offers.',
    mapsUrl:maps('Elan - The Lodhi','The Lodhi, Pragati Vihar, Near CGO Complex, Lodhi Road, New Delhi'), zomatoUrl:'https://www.zomato.com/ncr/elan-the-lodhi-lodhi-road-new-delhi/info', swiggyUrl:swiggySearch('Elan The Lodhi Delhi')
  },
  {
    id:'bella-cucina-le-meridien-gurgaon', name:'Bella Cucina - Le Meridien Gurgaon', zone:'MG Road, Gurgaon', budget:'₹3,500', costPerPerson:'₹1,750', budgetCategory:'premium-3000-plus',
    bestFor:'Hotel-style Italian and Continental dining in Gurgaon', vibeTag:'Quiet & Classy', whatToOrder:'Start with a shared Italian starter and choose one pasta/pizza or main per person. Confirm the live menu before visiting.',
    metroRoute:'Guru Dronacharya Metro (Yellow Line) → short auto toward Le Méridien Gurgaon.', afterFood:'MG Road / hotel area walk or continue toward nearby malls.', curatorTake:'A premium Gurgaon option for users who explicitly prioritise food and ambience over keeping the bill low. Current Zomato fine-dining collections list it among luxury dining options.',
    mapsUrl:maps('Bella Cucina - Le Meridien Gurgaon','MG Road, Gurgaon, Haryana'), zomatoUrl:zomatoSearch('Bella Cucina Le Meridien Gurgaon'), swiggyUrl:swiggySearch('Bella Cucina Le Meridien Gurgaon')
  },
  {
    id:'dum-pukht-itc-maurya', name:'Dum Pukht - ITC Maurya', zone:'Chanakyapuri', budget:'₹4,500+', costPerPerson:'₹2,250+', budgetCategory:'premium-4000-plus',
    bestFor:'Luxury North Indian/Mughlai dining and special occasions', vibeTag:'Quiet & Classy', whatToOrder:'A full Mughlai meal is the point here. Choose a kebab/starter and a signature North Indian main with breads/rice to share.',
    metroRoute:'Dhaula Kuan Metro (Airport Express/Pink Line access) → short auto to ITC Maurya.', afterFood:'Chanakyapuri diplomatic area; use a cab for the next destination rather than planning a long walk.', curatorTake:'This is the top-end category for people who explicitly do not care about budget. Zomato currently includes Dum Pukht in its Delhi luxury/fine-dining collection.',
    mapsUrl:maps('Dum Pukht - ITC Maurya','Sardar Patel Marg, Diplomatic Enclave, Chanakyapuri, New Delhi'), zomatoUrl:zomatoSearch('Dum Pukht ITC Maurya Delhi'), swiggyUrl:swiggySearch('Dum Pukht ITC Maurya Delhi')
  }
];

export default PREMIUM_CAFES;
