import React from 'react';
import { Search, Sparkles, QrCode, MapPin, Compass, ShieldCheck } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Hero({ searchQuery, setSearchQuery, onOpenInstaModal, setActiveTab }) {
  return (
    <div className="relative overflow-hidden bg-stone-950 text-stone-100 py-12 sm:py-20 border-b border-amber-900/30">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-900/30 via-amber-700/15 to-transparent blur-3xl rounded-full pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-800/40 text-amber-300 text-xs sm:text-sm font-medium mb-6 shadow-xl backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" /><span>Paschim Vihar & Delhi NCR Date Guide</span><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <button onClick={onOpenInstaModal} className="hover:underline flex items-center gap-1 text-pink-400 font-semibold"><InstagramIcon className="w-3.5 h-3.5" /> @iavinaxh</button>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-tight">Find Cozy, Elegant & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Budget-Friendly</span> Date Spots</h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-sans leading-relaxed">Curated destinations starting from <span className="text-amber-300 font-semibold">Paschim Vihar</span>. Target budget <span className="text-emerald-400 font-semibold">₹1,000 for 2 people</span> including food, ambience, direct metro routes, & post-meal walks.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-400">
          <span className="px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Tested Budgets & Menus</span>
          <span className="px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Direct Map & Metro Links</span>
          <span className="px-3 py-1 rounded-lg bg-stone-900/80 border border-stone-800 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-sky-400" /> Zomato & Swiggy Dining</span>
        </div>
        <div className="mt-8 max-w-2xl mx-auto"><div className="relative flex items-center"><Search className="absolute left-4 w-5 h-5 text-amber-500/80 pointer-events-none" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search cafes, zones (CP, Rajouri, Mandi House), vibes, or dish recommendations..." className="w-full pl-12 pr-10 py-4 rounded-2xl bg-stone-900/90 border border-amber-900/50 text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-transparent text-sm sm:text-base shadow-2xl transition-all" />{searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 text-xs font-semibold text-stone-400 hover:text-stone-200 bg-stone-800 px-2 py-1 rounded-md">Clear</button>}</div></div>
        <div className="mt-6 flex justify-center"><button onClick={() => setActiveTab('quick')} className="text-xs sm:text-sm text-amber-300 hover:text-amber-200 bg-amber-950/70 border border-amber-800/60 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-amber-900/50 transition-all shadow-md"><span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>Want a decision in 10 seconds? <span className="underline font-semibold">Click here for quick picks →</span></button></div>
      </div>
    </div>
  );
}
