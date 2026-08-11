import React, { useMemo, useState } from 'react';
import { Search, MapPin, Users, Wallet, Sparkles, Globe, Calculator, ChevronDown, Utensils, Route, ShoppingBag, Heart } from 'lucide-react';
import { DISCOVERY_CAFES } from '../data/discoveryCafes';

const DEFAULT_FORM={location:'All Delhi NCR',budget:'1000',people:'2',vibe:'Any vibe'};
const labels=['Best overall match','Best value','Best ambience','Best food option','Strong match','Good alternative'];
const LOCATION_OPTIONS=['All Delhi NCR','Connaught Place','Khan Market','Saket','Hauz Khas','Greater Kailash','Defence Colony','Malviya Nagar','Lajpat Nagar','Nehru Place','Chanakyapuri','Chhatarpur','Rajouri Garden','Punjabi Bagh','Janakpuri','Dwarka','Noida','Gurgaon'];
const LOCATION_ALIASES={'Connaught Place':['cp','connaught place','central delhi','barakhamba','janpath'],'Khan Market':['khan market'],'Saket':['saket'],'Hauz Khas':['hauz khas','hkv'],'Greater Kailash':['gk1','gk2','gk3','greater kailash'],'Defence Colony':['defence colony'],'Malviya Nagar':['malviya nagar'],'Lajpat Nagar':['lajpat nagar'],'Nehru Place':['nehru place'],'Chanakyapuri':['chanakyapuri'],'Chhatarpur':['chhatarpur'],'Rajouri Garden':['rajouri garden'],'Punjabi Bagh':['punjabi bagh'],'Janakpuri':['janakpuri'],'Dwarka':['dwarka'],'Noida':['noida'],'Gurgaon':['gurgaon','gurugram','cyber city','golf course road']};
const moneyNumbers=(value)=>{const nums=String(value||'').match(/[0-9][0-9,]*/g)||[];return nums.map(n=>Number(n.replace(/,/g,''))).filter(Number.isFinite);};
const priceRange=(value)=>{const nums=moneyNumbers(value);if(!nums.length)return null;return {min:nums[0],max:nums[nums.length-1]};};
const formatMoney=(value)=>`₹${Math.round(value).toLocaleString('en-IN')}`;
const matchesLocation=(cafe,location)=>{if(location==='All Delhi NCR')return true;const hay=`${cafe.name} ${cafe.zone||''}`.toLowerCase();const aliases=LOCATION_ALIASES[location]||[location.toLowerCase()];return aliases.some(alias=>hay.includes(alias));};

function getZomatoUrl(place){
  if(typeof place.zomatoUrl==='string' && /^https:\/\/([a-z0-9-]+\.)?zomato\.com\//i.test(place.zomatoUrl)) return place.zomatoUrl;
  return `https://www.zomato.com/ncr/restaurants?q=${encodeURIComponent(place.name)}`;
}

function Detail({label,children,icon}){if(!children)return null;return <div className="rounded-2xl bg-[#FFF4E6] border border-[#E7B894] p-3 sm:p-3.5"><span className="text-[#F47B3A] font-bold flex items-center gap-1 mb-1 text-[10px] uppercase tracking-wider">{icon}{label}</span><p className="text-xs sm:text-sm text-[#5D4639] leading-relaxed">{children}</p></div>;}

function RecommendationCard({p,people,index}){
  const [open,setOpen]=useState(false);
  const [hovered,setHovered]=useState(false);
  const expanded=open||hovered;
  const hasDineout=Boolean(p.dineoutUrl);
  const zomatoUrl=getZomatoUrl(p);
  const showDetails=(event)=>{event.preventDefault();event.stopPropagation();setOpen(true);};
  const hideDetails=(event)=>{event.preventDefault();event.stopPropagation();setOpen(false);};
  const stopLinkClick=(event)=>event.stopPropagation();

  return <article
    onPointerEnter={(event)=>{if(event.pointerType==='mouse')setHovered(true);}}
    onPointerLeave={(event)=>{if(event.pointerType==='mouse')setHovered(false);}}
    onClick={()=>setOpen(value=>!value)}
    className={`self-start w-full rounded-[28px] bg-[#FCE6D0] border overflow-hidden cursor-pointer transition-all duration-300 ${expanded?'border-[#F47B3A] shadow-[0_24px_55px_rgba(89,37,15,0.20)]':'border-[#E7B894] shadow-[0_10px_30px_rgba(89,37,15,0.10)] hover:-translate-y-1'}`}
    aria-expanded={expanded}
  >
    <div className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0"><span className="text-[9px] sm:text-[10px] uppercase tracking-[0.16em] font-bold text-[#F47B3A]">{p.matchLabel}</span><h4 className="font-serif text-lg sm:text-xl font-bold text-[#3A1F14] mt-1 leading-tight break-words">{p.name}</h4><p className="text-[11px] sm:text-xs text-[#806050] mt-1 flex items-center gap-1"><MapPin className="w-3 h-3 shrink-0"/>{p.zone}</p></div>
        <span className="shrink-0 text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FFF4E6] border border-[#E7B894] text-[#7A2E12]">2 people</span>
      </div>
      <div className="mt-4"><p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#806050]">Listed budget</p><p className="text-sm sm:text-base font-bold text-[#7A2E12]">{p.budget} <span className="font-normal text-[#806050]">/ 2 people</span></p></div>
    </div>

    <div className={`grid transition-[grid-template-rows] duration-300 ${expanded?'grid-rows-[1fr]':'grid-rows-[0fr]'}`}>
      <div className="overflow-hidden min-h-0"><div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-2.5 sm:space-y-3 border-t border-[#E7B894] pt-3 sm:pt-4">
        <div className="rounded-2xl bg-[#F47B3A]/10 border border-[#E7B894] p-3 sm:p-3.5"><p className="text-[10px] uppercase tracking-wider font-bold text-[#7A2E12]">Budget for {people} {people===1?'person':'people'}</p><p className="text-xs sm:text-sm text-[#5D4639] mt-1 leading-relaxed">{p.budgetFit}</p><p className="text-[10px] text-[#806050] mt-2 leading-relaxed">The catalogue price above is the original 2-person estimate. This estimate is scaled to your selected group size.</p></div>
        <Detail label="BEST KNOWN FOR" icon={<Sparkles className="w-3.5 h-3.5"/>}>{p.bestFor}</Detail><Detail label="VIBE" icon={<Heart className="w-3.5 h-3.5"/>}>{p.vibeTag}</Detail><Detail label="WHAT TO ORDER" icon={<Utensils className="w-3.5 h-3.5"/>}>{p.whatToOrder}</Detail><Detail label="GETTING THERE" icon={<Route className="w-3.5 h-3.5"/>}>{p.metroRoute}</Detail><Detail label="REAL TALK">{p.curatorTake||p.reason}</Detail>
        {p.caution&&<p className="text-[10px] text-[#8F3E22] leading-relaxed">{p.caution}</p>}
      </div></div>
    </div>

    <div className="px-4 sm:px-5 pb-3 sm:pb-4"><button type="button" onClick={expanded?hideDetails:showDetails} aria-expanded={expanded} className="w-full min-h-[42px] rounded-xl text-[10px] sm:text-xs font-bold text-[#7A2E12] hover:bg-[#FFF4E6] transition-colors flex items-center justify-center gap-1">{expanded?'Hide details':'View cafe details'}<ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded?'rotate-180':''}`}/></button></div>

    <div onClick={stopLinkClick} className={`grid ${hasDineout?'grid-cols-4':'grid-cols-3'} gap-2 px-4 sm:px-5 pb-4 sm:pb-5 border-t border-[#E7B894] pt-3`}>
      <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={stopLinkClick} className="min-h-[44px] rounded-xl bg-[#7A2E12] hover:bg-[#64240E] text-[#FFF4E6] text-[9px] sm:text-[10px] font-bold text-center flex flex-col items-center justify-center gap-0.5"><MapPin className="w-3 h-3"/>MAPS</a>
      <a href={zomatoUrl} target="_blank" rel="noopener noreferrer" onClick={stopLinkClick} className="min-h-[44px] rounded-xl bg-[#F47B3A] hover:bg-[#D9682D] text-white text-[9px] sm:text-[10px] font-bold text-center flex flex-col items-center justify-center gap-0.5"><Utensils className="w-3 h-3"/>ZOMATO</a>
      {p.websiteUrl&&<a href={p.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={stopLinkClick} className="min-h-[44px] rounded-xl bg-[#FFF4E6] text-[#7A2E12] border border-[#E7B894] text-[9px] sm:text-[10px] font-bold text-center flex flex-col items-center justify-center gap-0.5"><Globe className="w-3 h-3"/>WEB</a>}
      {hasDineout&&<a href={p.dineoutUrl} target="_blank" rel="noopener noreferrer" onClick={stopLinkClick} className="min-h-[44px] rounded-xl bg-[#C15A2C] hover:bg-[#A94C23] text-white text-[9px] sm:text-[10px] font-bold text-center flex flex-col items-center justify-center gap-0.5"><ShoppingBag className="w-3 h-3"/>DINEOUT</a>}
    </div>
  </article>;
}

export default function RecommendationPlanner({cafes=[]}){
  const [form,setForm]=useState(DEFAULT_FORM);const [results,setResults]=useState([]);const [searched,setSearched]=useState(false);
  const catalogue=useMemo(()=>{const m=new Map();[...cafes,...DISCOVERY_CAFES].forEach(c=>m.set(c.id||c.name,c));return [...m.values()];},[cafes]);
  const update=(k,v)=>setForm(p=>({...p,[k]:v}));
  const selectedBudget=Number(form.budget);const people=Number(form.people);const budgetPerPerson=selectedBudget/people;

  const findPlaces=(e)=>{e.preventDefault();const budget=selectedBudget;const vibe=form.vibe.toLowerCase();
    const ranked=catalogue.map(c=>{const hay=`${c.name} ${c.zone||''} ${c.bestFor||''} ${c.vibeTag||''} ${c.whatToOrder||''}`.toLowerCase();const range=priceRange(c.budget);const minForGroup=range?(range.min*people/2):Infinity;const maxForGroup=range?(range.max*people/2):Infinity;const area=matchesLocation(c,form.location);let score=c.isTopPick?8:0;if(area)score+=form.location==='All Delhi NCR'?0:35;if(vibe!=='any vibe'){if(hay.includes(vibe))score+=14;else if(vibe==='romantic'&&/aesthetic|quiet|outdoor/.test(hay))score+=6;}if(Number.isFinite(maxForGroup)){if(maxForGroup<=budget)score+=24;else if(minForGroup<=budget)score+=10;else if(minForGroup<=budget*1.15)score+=2;else score-=20;}return {...c,_score:score,_area:area,_range:range,_minForGroup:minForGroup,_maxForGroup:maxForGroup};}).sort((a,b)=>b._score-a._score);
    const areaPool=form.location!=='All Delhi NCR'&&ranked.some(c=>c._area)?ranked.filter(c=>c._area):ranked;const affordable=areaPool.filter(c=>!Number.isFinite(c._minForGroup)||c._minForGroup<=budget*1.15);const pool=(affordable.length>=3?affordable:areaPool).slice(0,6);
    setResults(pool.map((c,i)=>{let budgetStatus='';if(!c._range)budgetStatus='Price is not reliably listed for this venue.';else if(c._minForGroup>budget)budgetStatus=`Minimum recommended budget: ${formatMoney(c._minForGroup)} for ${people} ${people===1?'person':'people'}.`;else if(c._maxForGroup<=budget)budgetStatus=`Fits your target. Approx. ${formatMoney(c._minForGroup)}–${formatMoney(c._maxForGroup)} for ${people} ${people===1?'person':'people'}.`;else budgetStatus=`Possible at the lower end. Approx. ${formatMoney(c._minForGroup)}–${formatMoney(c._maxForGroup)} for ${people} ${people===1?'person':'people'}.`;return {...c,matchLabel:labels[i]||'Good alternative',reason:form.location!=='All Delhi NCR'&&c._area?`${c.zone} matches your selected area. ${c.curatorTake||c.bestFor||'A strong fit for your preferences.'}`:`${c.curatorTake||c.bestFor||'A strong fit for your preferences.'}`,budgetFit:budgetStatus,caution:'Prices are approximate and based on the catalogue listing for 2 people. Actual spend can change with orders, taxes and offers.'};}));
    setSearched(true);
  };

  return <section id="find-my-place" className="bg-[#F47B3A] px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><div className="max-w-6xl mx-auto"><div className="max-w-3xl mb-8"><div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFF4E6]/85 mb-3"><Sparkles className="w-4 h-4"/> Personalized restaurant finder</div><h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#3A1F14]">Tell us what you want. We'll pick the places.</h2><p className="mt-3 text-sm sm:text-base text-[#FFF4E6]/90 leading-relaxed">Choose a fixed Delhi NCR area, your total budget, group size and mood. Recommendations come only from our manually curated restaurant and cafe catalogue.</p></div>
    <form onSubmit={findPlaces} className="rounded-[30px] bg-[#FFF4E6] border border-[#E7B894] p-4 sm:p-7 shadow-[0_18px_50px_rgba(89,37,15,0.16)]"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <label className="lg:col-span-2"><span className="text-xs font-bold uppercase tracking-wider text-[#7A2E12]">Where?</span><div className="relative mt-2"><MapPin className="absolute left-3 top-3.5 w-4 h-4 text-[#F47B3A]"/><select value={form.location} onChange={e=>update('location',e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/70 border border-[#E7B894] outline-none focus:ring-2 focus:ring-[#F47B3A]/30 appearance-none"><option value="All Delhi NCR">All Delhi NCR</option>{LOCATION_OPTIONS.filter(x=>x!=='All Delhi NCR').map(x=><option key={x} value={x}>{x}</option>)}</select></div></label>
      <label><span className="text-xs font-bold uppercase tracking-wider text-[#7A2E12]">Budget target</span><div className="relative mt-2"><Wallet className="absolute left-3 top-3.5 w-4 h-4 text-[#F47B3A]"/><select value={form.budget} onChange={e=>update('budget',e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/70 border border-[#E7B894]"><option value="700">₹700</option><option value="1000">₹1,000</option><option value="1500">₹1,500</option><option value="2000">₹2,000</option><option value="3000">₹3,000+</option></select></div></label>
      <label><span className="text-xs font-bold uppercase tracking-wider text-[#7A2E12]">People</span><div className="relative mt-2"><Users className="absolute left-3 top-3.5 w-4 h-4 text-[#F47B3A]"/><select value={form.people} onChange={e=>update('people',e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/70 border border-[#E7B894]"><option value="1">1 person</option><option value="2">2 people</option><option value="3">3 people</option><option value="4">4 people</option><option value="6">5–6 people</option><option value="8">7–8 people</option><option value="10">9–10 people</option></select></div></label>
      <label><span className="text-xs font-bold uppercase tracking-wider text-[#7A2E12]">Vibe</span><select value={form.vibe} onChange={e=>update('vibe',e.target.value)} className="mt-2 w-full px-3 py-3 rounded-xl bg-white/70 border border-[#E7B894]"><option>Any vibe</option><option>Romantic</option><option>Quiet</option><option>Aesthetic</option><option>Casual</option><option>Youthful</option><option>Rooftop</option><option>Outdoor</option><option>Lively</option></select></label>
      <div className="md:col-span-2 lg:col-span-3 rounded-2xl bg-[#FCE6D0] border border-[#E7B894] p-4 flex items-center gap-4"><div className="shrink-0 w-10 h-10 rounded-xl bg-[#F47B3A]/15 flex items-center justify-center"><Calculator className="w-5 h-5 text-[#F47B3A]"/></div><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A2E12]">Your budget plan</p><p className="text-sm sm:text-base font-bold text-[#3A1F14] mt-0.5">{formatMoney(selectedBudget)} total for {people} {people===1?'person':'people'} <span className="font-normal text-[#806050]">• {formatMoney(budgetPerPerson)} per person</span></p><p className="text-xs text-[#806050] mt-1">Venue prices in this guide are listed for 2 people. We scale the estimate automatically when your group size changes.</p></div></div>
      <div className="flex items-end"><button type="submit" className="w-full min-h-[48px] py-3.5 rounded-full bg-[#F47B3A] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#D9682D] shadow-md"><Search className="w-5 h-5"/>Find My Places</button></div>
    </div></form>

    {searched&&<div className="mt-10"><div className="flex flex-wrap items-end justify-between gap-3 mb-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFF4E6]/85">CURATED DELHI NCR GUIDE</p><h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3A1F14]">Your best matches</h3><p className="text-xs text-[#FFF4E6]/85 mt-1">Budget shown below is recalculated for {people} {people===1?'person':'people'}.</p></div><span className="text-xs bg-[#FFF4E6] text-[#7A2E12] px-3 py-1.5 rounded-full border border-[#E7B894]">{results.length} suggestions</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">{results.map((p,i)=><RecommendationCard key={p.id||`${p.name}-${i}`} p={p} people={people} index={i}/>)}</div></div>}
  </div></section>;
}
