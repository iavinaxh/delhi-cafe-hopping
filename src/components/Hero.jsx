import React from 'react';
import { Search, Sparkles, MapPin, Compass, ShieldCheck, SlidersHorizontal, Bike, Utensils } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

function EatingCouple() {
  return (
    <div className="date-dinner-sticker" aria-hidden="true">
      <div className="date-dinner-art">
        <span className="date-dinner-head head-one" />
        <span className="date-dinner-head head-two" />
        <span className="date-dinner-body body-one" />
        <span className="date-dinner-body body-two" />
        <span className="date-dinner-table" />
        <span className="date-dinner-plate" />
        <span className="food-steam steam-one" />
        <span className="food-steam steam-two" />
      </div>
    </div>
  );
}

function FoodDeliverySticker() {
  return (
    <div className="food-delivery-sticker" aria-hidden="true">
      <Bike className="food-delivery-bike" />
      <span className="food-bag"><Utensils /></span>
      <span className="delivery-spark spark-one">✦</span>
      <span className="delivery-spark spark-two">•</span>
    </div>
  );
}

export default function Hero({ searchQuery, setSearchQuery, onOpenInstaModal, setActiveTab }) {
  const jumpToPlanner = () => document.getElementById('find-my-place')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="relative overflow-hidden bg-[#FFF4E6] text-[#3A1F14] py-14 sm:py-24 border-b border-[#E7B894]">
      <style>{`
        .date-dinner-art { animation: dinner-bob 2.8s ease-in-out infinite; }
        .food-steam { animation: food-steam 2.2s ease-in-out infinite; opacity: .45; }
        .food-delivery-sticker { animation: delivery-float 3.2s ease-in-out infinite; }
        .delivery-spark { animation: spark-pop 2.4s ease-in-out infinite; }
        .spark-two { animation-delay: .7s; }
        @keyframes dinner-bob { 0%,100% { transform: translateY(1px) rotate(-1deg); } 50% { transform: translateY(-3px) rotate(1deg); } }
        @keyframes food-steam { 0%,100% { opacity: .15; transform: translateY(2px); } 50% { opacity: .8; transform: translateY(-3px); } }
        @keyframes delivery-float { 0%,100% { transform: translateY(1px) rotate(-1deg); } 50% { transform: translateY(-4px) rotate(1deg); } }
        @keyframes spark-pop { 0%,100% { opacity: .2; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.15); } }
        @media (prefers-reduced-motion: reduce) { .date-dinner-art,.food-steam,.food-delivery-sticker,.delivery-spark { animation: none !important; } }
      `}</style>
      <div className="absolute -top-32 right-[-10%] w-[560px] h-[560px] bg-[#CC3A63]/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-35%] left-[-8%] w-[460px] h-[460px] bg-[#7A2E12]/8 blur-3xl rounded-full pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_.85fr] items-center gap-10 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCE6D0] border border-[#E7B894] text-[#7A2E12] text-xs sm:text-sm font-semibold mb-6 shadow-sm"><Sparkles className="w-4 h-4 text-[#CC3A63]"/><span>Delhi NCR cafe & restaurant guide</span><span className="w-1.5 h-1.5 rounded-full bg-[#CC3A63]"></span><button onClick={onOpenInstaModal} className="hover:underline flex items-center gap-1"><InstagramIcon className="w-3.5 h-3.5"/>@iavinaxh</button></div>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#3A1F14] leading-[0.98]">Good food.<br/><span className="text-[#7A2E12]">Better plans.</span></h1>
            <p className="mt-5 sm:mt-7 text-base sm:text-lg text-[#725344] max-w-2xl leading-relaxed">Find a cafe or restaurant that fits your budget, group size and vibe. We turn a city full of choices into a shortlist you can actually use.</p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs text-[#6F5041]"><span className="px-3 py-2 rounded-full bg-white/70 border border-[#E7B894] flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#CC3A63]"/>Curated venues</span><span className="px-3 py-2 rounded-full bg-white/70 border border-[#E7B894] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#7A2E12]"/>Delhi NCR areas</span><span className="px-3 py-2 rounded-full bg-white/70 border border-[#E7B894] flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-[#CC3A63]"/>Budget-aware picks</span></div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3"><button onClick={jumpToPlanner} className="text-sm text-white bg-[#CC3A63] border border-[#CC3A63] px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#B52F55] transition-all shadow-md"><SlidersHorizontal className="w-4 h-4"/>Find my place<span className="font-semibold">→</span></button><button onClick={()=>setActiveTab('quick')} className="text-sm text-[#7A2E12] bg-white/70 border border-[#E7B894] px-6 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#FCE6D0] transition-all"><span className="w-2 h-2 rounded-full bg-[#CC3A63]"></span>10-second picks</button></div>
          </div>
          <div className="relative overflow-visible py-4 sm:py-6 px-2 sm:px-4">
            <div className="relative rounded-[34px] bg-[#7A2E12] p-3 shadow-[0_28px_70px_rgba(89,37,15,0.22)] rotate-1">
              <div className="rounded-[26px] bg-[#FCE6D0] min-h-[310px] sm:min-h-[380px] p-6 sm:p-8 flex flex-col justify-between border border-[#E7B894]">
                <div><p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#CC3A63]">Start here</p><h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1F14] mt-2">Where should we eat?</h2><p className="text-sm text-[#725344] mt-3">Pick an area, set your budget and tell us who you're with.</p></div>
                <div className="space-y-3"><div className="rounded-2xl bg-[#FFF4E6] border border-[#E7B894] px-4 py-3 flex items-center gap-3"><MapPin className="w-5 h-5 text-[#CC3A63]"/><span className="text-sm font-semibold text-[#5A3C2D]">Connaught Place</span></div><div className="rounded-2xl bg-[#FFF4E6] border border-[#E7B894] px-4 py-3 flex items-center gap-3"><span className="w-5 h-5 rounded-full bg-[#CC3A63]/15 text-[#CC3A63] flex items-center justify-center text-xs font-bold">₹</span><span className="text-sm font-semibold text-[#5A3C2D]">₹1,000 • 2 people</span></div><div className="hero-search-row"><div className="hero-search-button flex-1 rounded-2xl bg-[#CC3A63] text-white px-4 py-3 flex items-center justify-center gap-2 font-bold text-sm"><Search className="w-4 h-4"/>Show me the best matches</div><EatingCouple /></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-support-row mt-10 max-w-3xl"><div className="hero-support-search"><Search className="absolute left-4 w-5 h-5 text-[#CC3A63] pointer-events-none"/><input type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder="Browse by cafe, restaurant, area or vibe..." className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/80 border border-[#E7B894] text-[#3A1F14] placeholder-[#A4816E] focus:outline-none focus:ring-2 focus:ring-[#CC3A63]/30 focus:border-[#CC3A63] text-sm sm:text-base shadow-[0_8px_24px_rgba(78,43,25,0.08)]"/>{searchQuery&&<button onClick={()=>setSearchQuery('')} className="absolute right-4 text-xs font-semibold text-[#7A2E12] bg-[#FCE6D0] px-2 py-1 rounded-lg">Clear</button>}</div><FoodDeliverySticker /></div>
      </div>
    </div>
  );
}
