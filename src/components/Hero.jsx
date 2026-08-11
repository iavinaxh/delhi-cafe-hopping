import React from 'react';
import { Search, Sparkles, QrCode, MapPin, Compass, ShieldCheck } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Hero({ searchQuery, setSearchQuery, onOpenInstaModal, setActiveTab }) {
  return (
    <div className="relative overflow-hidden bg-[#FFF7EB] text-[#332B23] py-12 sm:py-20 border-b border-[#A2AB73]/35">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#A2AB73]/25 via-[#CC3A63]/10 to-transparent blur-3xl rounded-full pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F9F0E0] border border-[#A2AB73]/45 text-[#56602E] text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#CC3A63]" /><span>Paschim Vihar & Delhi NCR Date Guide</span><span className="w-1.5 h-1.5 rounded-full bg-[#A2AB73]"></span>
          <button onClick={onOpenInstaModal} className="hover:underline flex items-center gap-1 text-[#CC3A63] font-semibold"><InstagramIcon className="w-3.5 h-3.5" /> @iavinaxh</button>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#332B23] leading-tight">Find Cozy, Elegant & <span className="text-[#CC3A63]">Budget-Friendly</span> Date Spots</h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[#685D50] max-w-2xl mx-auto font-sans leading-relaxed">Curated destinations starting from <span className="text-[#CC3A63] font-semibold">Paschim Vihar</span>. Target budget <span className="text-[#56602E] font-semibold">₹1,000 for 2 people</span> including food, ambience, direct metro routes, & post-meal walks.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[#685D50]">
          <span className="px-3 py-1 rounded-full bg-[#F9F0E0] border border-[#A2AB73]/35 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#CC3A63]" /> Tested Budgets & Menus</span>
          <span className="px-3 py-1 rounded-full bg-[#F9F0E0] border border-[#A2AB73]/35 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#56602E]" /> Direct Map & Metro Links</span>
          <span className="px-3 py-1 rounded-full bg-[#F9F0E0] border border-[#A2AB73]/35 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-[#CC3A63]" /> Zomato & Swiggy Dining</span>
        </div>
        <div className="mt-8 max-w-2xl mx-auto"><div className="relative flex items-center"><Search className="absolute left-4 w-5 h-5 text-[#CC3A63] pointer-events-none" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search cafes, zones (CP, Rajouri, Mandi House), vibes, or dish recommendations..." className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/80 border border-[#A2AB73]/50 text-[#332B23] placeholder-[#958876] focus:outline-none focus:ring-2 focus:ring-[#CC3A63]/35 focus:border-[#CC3A63] text-sm sm:text-base shadow-[0_8px_24px_rgba(78,62,38,0.08)] transition-all" />{searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 text-xs font-semibold text-[#56602E] hover:text-[#CC3A63] bg-[#F9F0E0] px-2 py-1 rounded-lg">Clear</button>}</div></div>
        <div className="mt-6 flex justify-center"><button onClick={() => setActiveTab('quick')} className="text-xs sm:text-sm text-white bg-[#CC3A63] border border-[#CC3A63] px-4 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#B52F55] transition-all shadow-md"><span className="w-2 h-2 rounded-full bg-[#FFF7EB]"></span>Want a decision in 10 seconds? <span className="underline font-semibold">Click here for quick picks →</span></button></div>
      </div>
    </div>
  );
}
