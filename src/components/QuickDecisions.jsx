import React from 'react';
import { Zap, Sun, Moon, DollarSign, Compass, Utensils, Coffee, Pizza, GlassWater, CakeSlice } from 'lucide-react';

export default function QuickDecisions({ cafes, onSelectCafe }) {
  const picks = [
    ['Best Overall Day Date','California Burrito + Pacific Mall','₹600–₹900','california-burrito-pacific',Sun],
    ['Best Evening Date','Cine Tree Cafe + CP Walk','₹550–₹900','cine-tree',Moon],
    ['Best ₹1,000 Dinner','Kartoon Cafe + Rajouri Garden','₹850–₹1,000','kartoon-cafe',DollarSign],
    ['Quiet & Classy Vibe','Triveni Terrace Cafe','₹800–₹1,000','triveni-terrace',Compass],
    ['Best Budget CP Stop','Brew & Bites + CP Walk','₹500–₹900','brew-bites-cp',Pizza],
    ['Best Shake & Dessert Stop','Shake Square','₹500 for 2','shake-square-cp',CakeSlice],
    ['Best CP Dinner','The Immigrant Cafe + Inner Circle','₹1,100 for 2*','the-immigrant-cafe-cp',Utensils],
    ['Best Lively CP Night','The Darzi Bar & Kitchen','₹1,800 for 2*','the-darzi-bar-kitchen-cp',GlassWater],
    ['Best Coffee Stop','Nothing Before Coffee','₹400–₹700','nbc-cp',Coffee],
    ['Best Casual Multi-Cuisine','The Art House Restaurant','₹1,500 for 2*','the-art-house-restaurant-cp',Utensils]
  ];
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#CC3A63]">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl bg-[#A2AB73] border border-[#A2AB73] text-[#FFF7EB]"><Zap className="w-6 h-6"/></div>
      <div><h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241F1A]">10-Second Decision</h2><p className="text-sm text-[#F9F0E0]">Pick by date mood, location and budget.</p></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {picks.map(([label,place,target,id,Icon])=>{const cafe=cafes.find(c=>c.id===id);return <button key={id} onClick={()=>cafe&&onSelectCafe(cafe)} className="text-left p-6 rounded-2xl bg-[#F9F0E0] border border-[#A2AB73]/70 hover:border-[#FFF7EB] hover:-translate-y-1 shadow-[0_10px_28px_rgba(80,35,55,0.16)] transition-all">
        <span className="text-xs uppercase tracking-wider text-[#56602E] font-bold flex items-center gap-2"><Icon className="w-4 h-4"/>{label}</span>
        <h3 className="font-serif text-xl font-bold mt-3 text-[#241F1A]">{place}</h3>
        <p className="text-[#56602E] text-sm font-bold mt-2">{target}</p>
        <p className="text-xs text-[#6D5E55] mt-3">View order, route, post-meal plan and direct links.</p>
      </button>})}
    </div>
    <div className="mt-8 p-5 rounded-2xl bg-[#FFF7EB] border border-[#A2AB73]/60 text-[#4E453B] text-sm"><b className="text-[#CC3A63]">Budget rule:</b> Keep ₹200–₹300 buffer for tax, an extra drink, dessert or the last-mile auto/cab. *Dineout and delivery platforms can show different dining-context estimates.</div>
  </section>;
}
