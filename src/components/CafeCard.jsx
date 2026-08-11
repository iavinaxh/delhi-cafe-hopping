import React from 'react';
import { MapPin, Utensils, Heart, Route, Globe, ShoppingBag } from 'lucide-react';

export default function CafeCard({ cafe, isWishlisted, onToggleWishlist, onSelectCafe }) {
  const hasDineout = Boolean(cafe.dineoutUrl);
  return (
    <article className="group rounded-3xl bg-[#F9F0E0] border border-[#A2AB73]/50 hover:border-[#CC3A63]/60 hover:-translate-y-1 shadow-[0_10px_30px_rgba(78,62,38,0.10)] hover:shadow-[0_18px_40px_rgba(78,62,38,0.16)] transition-all duration-300 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-[#A2AB73]/30 bg-[#FFF7EB]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#A2AB73]/20 border border-[#A2AB73]/50 text-[#56602E] flex items-center gap-1"><MapPin className="w-3 h-3" />{cafe.zone}</span>
            <span className="px-2.5 py-1 rounded-full text-xs bg-[#A2AB73]/10 text-[#56602E] border border-[#A2AB73]/30">{cafe.vibeTag}</span>
            {cafe.quickPickLabel && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#CC3A63] text-white shadow-sm">★ {cafe.quickPickLabel}</span>}
          </div>
          <button onClick={() => onToggleWishlist(cafe.id)} aria-label={`Save ${cafe.name}`} className="p-2.5 rounded-full bg-[#FFF7EB] border border-[#A2AB73]/40 hover:border-[#CC3A63]/50 transition-colors"><Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#CC3A63] text-[#CC3A63]' : 'text-[#6D7650]'}`} /></button>
        </div>
        <div className="flex items-baseline justify-between gap-2 mt-4"><h3 onClick={() => onSelectCafe(cafe)} className="font-serif text-xl font-bold text-[#332B23] hover:text-[#CC3A63] cursor-pointer transition-colors">{cafe.name}</h3><span className="text-sm font-bold px-2.5 py-1 rounded-full bg-[#A2AB73]/20 border border-[#A2AB73]/50 text-[#56602E] whitespace-nowrap">{cafe.budget}</span></div>
        <p className="text-xs text-[#786C5C] italic mt-1">Best for: {cafe.bestFor}</p>
      </div>
      <div className="p-5 space-y-3 text-xs sm:text-sm text-[#4E453B] flex-1">
        <div className="p-3.5 rounded-2xl bg-[#FFF7EB] border border-[#A2AB73]/25"><span className="text-[#CC3A63] font-bold flex items-center gap-1 mb-1"><Utensils className="w-3.5 h-3.5" /> WHAT TO ORDER</span><p>{cafe.whatToOrder}</p></div>
        <div className="p-3.5 rounded-2xl bg-[#FFF7EB] border border-[#A2AB73]/25"><span className="text-[#68713D] font-bold flex items-center gap-1 mb-1"><Route className="w-3.5 h-3.5" /> GETTING THERE</span><p>{cafe.metroRoute}</p></div>
        <div className="p-3.5 rounded-2xl bg-[#A2AB73]/15 border border-[#A2AB73]/35"><span className="text-[#56602E] font-bold block mb-1">REAL TALK</span><p>{cafe.curatorTake}</p></div>
      </div>
      <div className={`grid ${hasDineout ? 'grid-cols-4' : 'grid-cols-3'} gap-2 p-4 border-t border-[#A2AB73]/30 bg-[#F9F0E0]`}>
        <a href={cafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[#A2AB73] hover:bg-[#8F995F] text-white text-[10px] font-bold text-center transition-colors"><MapPin className="w-3 h-3 mx-auto mb-1" />MAPS</a>
        <a href={cafe.websiteUrl || cafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[#FFF7EB] hover:bg-white border border-[#A2AB73]/40 text-[#56602E] text-[10px] font-bold text-center transition-colors"><Globe className="w-3 h-3 mx-auto mb-1" />WEB</a>
        <a href={cafe.zomatoUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-[#CC3A63] hover:bg-[#B52F55] text-white text-[10px] font-bold text-center transition-colors"><Utensils className="w-3 h-3 mx-auto mb-1" />ZOMATO</a>
        {hasDineout && <a href={cafe.dineoutUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open Swiggy Dineout for ${cafe.name}`} className="p-2.5 rounded-xl bg-[#56602E] hover:bg-[#414923] text-white text-[10px] font-bold text-center transition-colors"><ShoppingBag className="w-3 h-3 mx-auto mb-1" />DINEOUT</a>}
      </div>
    </article>
  );
}
