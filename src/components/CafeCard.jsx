import React from 'react';
import { MapPin, Utensils, Heart, Route, Globe, ShoppingBag } from 'lucide-react';

export default function CafeCard({ cafe, isWishlisted, onToggleWishlist, onSelectCafe }) {
  const hasDineout = Boolean(cafe.dineoutUrl);
  const zomatoUrl = cafe.zomatoUrl || `https://www.zomato.com/ncr/restaurants?q=${encodeURIComponent(cafe.name)}`;
  return (
    <article className="group rounded-[28px] bg-[#FCE6D0] border border-[#E7B894] hover:border-[#F47B3A] hover:-translate-y-1 shadow-[0_12px_34px_rgba(89,37,15,0.10)] hover:shadow-[0_22px_48px_rgba(89,37,15,0.16)] transition-all duration-300 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-[#E7B894] bg-[#FFF4E6]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2"><span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FCE6D0] border border-[#E7B894] text-[#7A2E12] flex items-center gap-1"><MapPin className="w-3 h-3"/>{cafe.zone}</span>{cafe.quickPickLabel&&<span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F47B3A] text-white">★ {cafe.quickPickLabel}</span>}</div>
          <button onClick={()=>onToggleWishlist(cafe.id)} aria-label={`Save ${cafe.name}`} className="p-2.5 rounded-full bg-[#FCE6D0] border border-[#E7B894] hover:border-[#F47B3A] transition-colors"><Heart className={`w-4 h-4 ${isWishlisted?'fill-[#F47B3A] text-[#F47B3A]':'text-[#7A2E12]'}`}/></button>
        </div>
        <div className="flex items-baseline justify-between gap-2 mt-5"><h3 onClick={()=>onSelectCafe(cafe)} className="font-serif text-xl font-bold text-[#3A1F14] hover:text-[#F47B3A] cursor-pointer transition-colors">{cafe.name}</h3><span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#7A2E12] text-[#FFF4E6] whitespace-nowrap">{cafe.budget}</span></div>
        <p className="text-xs text-[#806050] italic mt-1">Best for: {cafe.bestFor}</p>
      </div>
      <div className="p-5 space-y-3 text-xs sm:text-sm text-[#5D4639] flex-1">
        <div className="p-3.5 rounded-2xl bg-[#FFF4E6] border border-[#E7B894]"><span className="text-[#F47B3A] font-bold flex items-center gap-1 mb-1"><Utensils className="w-3.5 h-3.5"/> WHAT TO ORDER</span><p>{cafe.whatToOrder}</p></div>
        <div className="p-3.5 rounded-2xl bg-[#FFF4E6] border border-[#E7B894]"><span className="text-[#7A2E12] font-bold flex items-center gap-1 mb-1"><Route className="w-3.5 h-3.5"/> GETTING THERE</span><p>{cafe.metroRoute}</p></div>
        <div className="p-3.5 rounded-2xl bg-[#7A2E12]/8 border border-[#E7B894]"><span className="text-[#7A2E12] font-bold block mb-1">REAL TALK</span><p>{cafe.curatorTake}</p></div>
      </div>
      <div className={`grid ${hasDineout?'grid-cols-4':'grid-cols-3'} gap-2 p-4 border-t border-[#E7B894] bg-[#FCE6D0]`}>
        <a href={cafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="min-h-[44px] rounded-xl bg-[#7A2E12] hover:bg-[#64240E] text-[#FFF4E6] text-[10px] font-bold text-center transition-colors flex flex-col items-center justify-center"><MapPin className="w-3 h-3 mb-1"/>MAPS</a>
        <a href={cafe.websiteUrl || cafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="min-h-[44px] rounded-xl bg-[#FFF4E6] hover:bg-white border border-[#E7B894] text-[#7A2E12] text-[10px] font-bold text-center transition-colors flex flex-col items-center justify-center"><Globe className="w-3 h-3 mb-1"/>WEB</a>
        <a href={zomatoUrl} target="_blank" rel="noopener noreferrer" className="min-h-[44px] rounded-xl bg-[#F47B3A] hover:bg-[#D9682D] text-white text-[10px] font-bold text-center transition-colors flex flex-col items-center justify-center"><Utensils className="w-3 h-3 mb-1"/>ZOMATO</a>
        {hasDineout&&<a href={cafe.dineoutUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open Swiggy Dineout for ${cafe.name}`} className="min-h-[44px] rounded-xl bg-[#C15A2C] hover:bg-[#A94C23] text-white text-[10px] font-bold text-center transition-colors flex flex-col items-center justify-center"><ShoppingBag className="w-3 h-3 mb-1"/>DINEOUT</a>}
      </div>
    </article>
  );
}
