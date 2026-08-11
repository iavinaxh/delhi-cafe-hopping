import React, { useState } from 'react';
import { MapPin, Utensils, Heart, Route, Globe, ShoppingBag, ChevronDown } from 'lucide-react';

export default function CafeCard({ cafe, isWishlisted, onToggleWishlist }) {
  const [expanded, setExpanded] = useState(false);
  const hasDineout = Boolean(cafe.dineoutUrl);
  const toggleCard = () => setExpanded(value => !value);
  const stop = (event) => event.stopPropagation();

  return (
    <article
      className={`group w-full rounded-[28px] bg-[#FFF4E6] border overflow-hidden transition-all duration-300 cursor-pointer self-start ${expanded ? 'border-[#CC3A63] shadow-[0_18px_42px_rgba(89,37,15,0.16)]' : 'border-[#E7B894] shadow-[0_8px_24px_rgba(89,37,15,0.08)] hover:-translate-y-1'}`}
      onClick={toggleCard}
      aria-expanded={expanded}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FCE6D0] border border-[#E7B894] text-[#7A2E12] flex items-center gap-1"><MapPin className="w-3 h-3" />{cafe.zone}</span>
              {cafe.quickPickLabel && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#CC3A63] text-white">★ {cafe.quickPickLabel}</span>}
            </div>
            <h3 className="font-serif text-2xl sm:text-[28px] font-bold leading-[1.05] text-[#3A1F14] break-words">{cafe.name}</h3>
            <p className="text-xs text-[#806050] mt-2">{cafe.vibeTag}</p>
          </div>
          <button onClick={(event) => { stop(event); onToggleWishlist(cafe.id); }} aria-label={`Save ${cafe.name}`} className="shrink-0 p-2.5 rounded-full bg-[#FCE6D0] border border-[#E7B894] hover:border-[#CC3A63]/60 transition-colors"><Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#CC3A63] text-[#CC3A63]' : 'text-[#7A2E12]'}`} /></button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div><p className="text-[10px] uppercase tracking-wider text-[#806050]">Listed budget</p><p className="text-base font-bold text-[#7A2E12] mt-0.5">{cafe.budget} <span className="font-normal text-[#806050]">/ 2 people</span></p></div>
          <span className="text-[10px] font-semibold text-[#7A2E12] flex items-center gap-1">{expanded ? 'Hide details' : 'View details'}<ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} /></span>
        </div>
      </div>

      <div className={`grid transition-[grid-template-rows] duration-300 ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden min-h-0">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-4 border-t border-[#E7B894] bg-[#FCE6D0]/45 space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#FFF4E6] border border-[#E7B894]"><span className="text-[#CC3A63] font-bold flex items-center gap-1 mb-1 text-[10px] uppercase tracking-wider"><Utensils className="w-3.5 h-3.5" /> WHAT TO ORDER</span><p className="text-xs sm:text-sm text-[#4E382E] leading-relaxed">{cafe.whatToOrder}</p></div>
            <div className="p-3.5 rounded-2xl bg-[#FFF4E6] border border-[#E7B894]"><span className="text-[#7A2E12] font-bold flex items-center gap-1 mb-1 text-[10px] uppercase tracking-wider"><Route className="w-3.5 h-3.5" /> GETTING THERE</span><p className="text-xs sm:text-sm text-[#4E382E] leading-relaxed">{cafe.metroRoute}</p></div>
            <div className="p-3.5 rounded-2xl bg-[#FCE6D0] border border-[#E7B894]"><span className="text-[#7A2E12] font-bold block mb-1 text-[10px] uppercase tracking-wider">BEST KNOWN FOR</span><p className="text-xs sm:text-sm text-[#4E382E] leading-relaxed">{cafe.bestFor}</p></div>
            {cafe.curatorTake && <div className="p-3.5 rounded-2xl bg-[#7A2E12]/5 border border-[#E7B894]"><span className="text-[#CC3A63] font-bold block mb-1 text-[10px] uppercase tracking-wider">REAL TALK</span><p className="text-xs sm:text-sm text-[#4E382E] leading-relaxed">{cafe.curatorTake}</p></div>}
          </div>
        </div>
      </div>

      {expanded && <div onClick={stop} className={`grid ${hasDineout ? 'grid-cols-4' : 'grid-cols-3'} gap-2 p-4 border-t border-[#E7B894] bg-[#FCE6D0]`}>
        <a href={cafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="min-h-[44px] rounded-xl bg-[#7A2E12] hover:bg-[#64240E] text-[#FFF4E6] text-[10px] font-bold text-center flex flex-col items-center justify-center gap-0.5"><MapPin className="w-3.5 h-3.5"/>MAPS</a>
        <a href={cafe.zomatoUrl || `https://www.zomato.com/ncr/restaurants?q=${encodeURIComponent(cafe.name)}`} target="_blank" rel="noopener noreferrer" className="min-h-[44px] rounded-xl bg-[#CC3A63] hover:bg-[#B52F55] text-white text-[10px] font-bold text-center flex flex-col items-center justify-center gap-0.5"><Utensils className="w-3.5 h-3.5"/>ZOMATO</a>
        <a href={cafe.websiteUrl || cafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="min-h-[44px] rounded-xl bg-[#FFF4E6] hover:bg-white border border-[#E7B894] text-[#7A2E12] text-[10px] font-bold text-center flex flex-col items-center justify-center gap-0.5"><Globe className="w-3.5 h-3.5"/>WEB</a>
        {hasDineout && <a href={cafe.dineoutUrl} target="_blank" rel="noopener noreferrer" className="min-h-[44px] rounded-xl bg-[#56602E] hover:bg-[#414923] text-white text-[10px] font-bold text-center flex flex-col items-center justify-center gap-0.5"><ShoppingBag className="w-3.5 h-3.5"/>DINEOUT</a>}
      </div>}
    </article>
  );
}
