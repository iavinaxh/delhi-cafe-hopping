import React, { useMemo, useState } from 'react';
import { Search, MapPin, Users, Wallet, Sparkles, Navigation, Loader2, Globe } from 'lucide-react';

const DEFAULT_FORM = { location:'', budget:'1000', people:'2', occasion:'Date', vibe:'Any vibe', cuisine:'Any cuisine', distance:'5', requirements:'' };
const fallbackOrder = ['Best overall match','Best value','Best ambience','Best for food'];

export default function RecommendationPlanner({ cafes }) {
  const [form,setForm]=useState(DEFAULT_FORM);
  const [useLocation,setUseLocation]=useState(false);
  const [loading,setLoading]=useState(false);
  const [locationLoading,setLocationLoading]=useState(false);
  const [error,setError]=useState('');
  const [results,setResults]=useState([]);
  const [source,setSource]=useState('');

  const localMatches=useMemo(()=>{
    const budget=Number(form.budget||1000), people=Number(form.people||2), location=form.location.toLowerCase().trim();
    return cafes.filter(c=>{
      const text=`${c.name} ${c.zone} ${c.bestFor||''} ${c.vibeTag||''} ${c.whatToOrder||''}`.toLowerCase();
      const locationMatch=!location || location==='current location' || text.includes(location.split(',')[0]);
      const perTwo=Number(String(c.budget||'').replace(/[^0-9]/g,''))||1000;
      return locationMatch && perTwo*(people/2)<=budget*1.15;
    }).slice(0,6);
  },[cafes,form]);

  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}));

  const getCurrentLocation=()=>{
    if(!navigator.geolocation){setError('Your browser does not support location access. Enter an area or landmark instead.');return;}
    setLocationLoading(true);setError('');
    navigator.geolocation.getCurrentPosition(position=>{
      setUseLocation(true);
      setForm(prev=>({...prev,location:'Current location'}));
      sessionStorage.setItem('planner_coords',JSON.stringify({lat:position.coords.latitude,lng:position.coords.longitude}));
      setLocationLoading(false);
    },()=>{setError('Location access was blocked. You can still type your Delhi NCR area manually.');setLocationLoading(false);},{enableHighAccuracy:true,timeout:8000,maximumAge:300000});
  };

  const findPlaces=async(event)=>{
    event.preventDefault();setLoading(true);setError('');setResults([]);
    try{
      const coords=sessionStorage.getItem('planner_coords');
      const response=await fetch('/api/recommend',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,coords:coords?JSON.parse(coords):null})});
      const payload=await response.json();
      if(!response.ok) throw new Error(payload.error||'Could not find recommendations right now.');
      setResults(payload.results||[]);setSource(payload.source||'OpenStreetMap');
      if(!payload.results?.length) setError(payload.message||'No places matched. Try a nearby landmark or increase the travel distance.');
    }catch(err){
      setError(err.message||'Something went wrong. Showing the curated guide instead.');
      setResults(localMatches.map((cafe,index)=>({...cafe,matchLabel:fallbackOrder[index]||'Good match',reason:cafe.curatorTake||cafe.bestFor||'Fits your current shortlist.',source:'Curated Delhi NCR guide'})));
      setSource('Curated Delhi NCR guide');
    }finally{setLoading(false);}
  };

  return <section id="find-my-place" className="bg-[#CC3A63] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <div className="max-w-6xl mx-auto">
      <div className="max-w-3xl mb-8"><div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFF7EB]/80 mb-3"><Sparkles className="w-4 h-4"/> Personalized restaurant finder</div><h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#241F1A]">Tell us what you want. We'll find the place.</h2><p className="mt-3 text-sm sm:text-base text-[#FFF7EB]/90 leading-relaxed">Choose your location, budget, group size and mood. We search OpenStreetMap's live place data and use your preferences to return a short list instead of making you scroll through hundreds of restaurants.</p></div>
      <form onSubmit={findPlaces} className="rounded-[28px] bg-[#F9F0E0] border border-[#A2AB73]/60 p-5 sm:p-7 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="lg:col-span-2 block"><span className="text-xs font-bold uppercase tracking-wider text-[#56602E]">Where?</span><div className="mt-2 flex gap-2"><div className="relative flex-1"><MapPin className="absolute left-3 top-3.5 w-4 h-4 text-[#CC3A63]"/><input value={form.location} onChange={e=>{update('location',e.target.value);setUseLocation(false);}} placeholder="CP, Saket, Rajouri Garden, Noida..." className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 outline-none focus:ring-2 focus:ring-[#CC3A63]/30" required={!useLocation}/></div><button type="button" onClick={getCurrentLocation} className="px-3 rounded-xl bg-[#A2AB73] text-white hover:bg-[#8F995F]" title="Use current location">{locationLoading?<Loader2 className="w-4 h-4 animate-spin"/>:<Navigation className="w-4 h-4"/>}</button></div></label>
          <label><span className="text-xs font-bold uppercase tracking-wider text-[#56602E]">Budget for everyone</span><div className="relative mt-2"><Wallet className="absolute left-3 top-3.5 w-4 h-4 text-[#CC3A63]"/><select value={form.budget} onChange={e=>update('budget',e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 outline-none"><option value="700">₹700</option><option value="1000">₹1,000</option><option value="1500">₹1,500</option><option value="2000">₹2,000</option><option value="3000">₹3,000+</option></select></div></label>
          <label><span className="text-xs font-bold uppercase tracking-wider text-[#56602E]">People</span><div className="relative mt-2"><Users className="absolute left-3 top-3.5 w-4 h-4 text-[#CC3A63]"/><select value={form.people} onChange={e=>update('people',e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 outline-none"><option value="1">1 person</option><option value="2">2 people</option><option value="3">3 people</option><option value="4">4 people</option><option value="6">5–6 people</option><option value="8">7–8 people</option><option value="10">9–10 people</option></select></div></label>
          <label><span className="text-xs font-bold uppercase tracking-wider text-[#56602E]">Occasion</span><select value={form.occasion} onChange={e=>update('occasion',e.target.value)} className="mt-2 w-full px-3 py-3 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 outline-none"><option>Date</option><option>Friends</option><option>Family</option><option>Birthday</option><option>Casual meal</option><option>Business dinner</option><option>Solo</option></select></label>
          <label><span className="text-xs font-bold uppercase tracking-wider text-[#56602E]">Vibe</span><select value={form.vibe} onChange={e=>update('vibe',e.target.value)} className="mt-2 w-full px-3 py-3 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 outline-none"><option>Any vibe</option><option>Romantic</option><option>Quiet</option><option>Aesthetic</option><option>Casual</option><option>Youthful</option><option>Rooftop</option><option>Outdoor</option><option>Lively</option></select></label>
          <label><span className="text-xs font-bold uppercase tracking-wider text-[#56602E]">Cuisine</span><select value={form.cuisine} onChange={e=>update('cuisine',e.target.value)} className="mt-2 w-full px-3 py-3 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 outline-none"><option>Any cuisine</option><option>North Indian</option><option>South Indian</option><option>Chinese</option><option>Italian</option><option>Mexican</option><option>Asian</option><option>Continental</option><option>Cafe / Coffee</option><option>Fast food</option><option>Multi-cuisine</option></select></label>
          <label><span className="text-xs font-bold uppercase tracking-wider text-[#56602E]">Max travel</span><select value={form.distance} onChange={e=>update('distance',e.target.value)} className="mt-2 w-full px-3 py-3 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 outline-none"><option value="2">2 km</option><option value="5">5 km</option><option value="10">10 km</option><option value="20">20 km</option><option value="50">Anywhere in NCR</option></select></label>
          <label className="md:col-span-2 lg:col-span-3"><span className="text-xs font-bold uppercase tracking-wider text-[#56602E]">Anything else?</span><input value={form.requirements} onChange={e=>update('requirements',e.target.value)} placeholder="e.g. romantic, not too loud, dinner + walk, vegetarian, birthday cake..." className="mt-2 w-full px-3 py-3 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 outline-none focus:ring-2 focus:ring-[#CC3A63]/30"/></label>
          <div className="flex items-end"><button disabled={loading} className="w-full py-3.5 rounded-xl bg-[#CC3A63] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#B52F55] disabled:opacity-60 transition-all shadow-md">{loading?<Loader2 className="w-5 h-5 animate-spin"/>:<Search className="w-5 h-5"/>}{loading?'Finding your places...':'Find My Places'}</button></div>
        </div>
        {error&&<p className="mt-4 text-sm font-medium text-[#8F2E46] bg-[#FFF7EB] border border-[#CC3A63]/25 rounded-xl p-3">{error}</p>}
      </form>
      {results.length>0&&<div className="mt-9"><div className="flex flex-wrap items-end justify-between gap-3 mb-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FFF7EB]/80">{source}</p><h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241F1A]">Your best matches</h3></div><span className="text-xs bg-[#F9F0E0] text-[#56602E] px-3 py-1.5 rounded-full border border-[#A2AB73]/50">{results.length} suggestions</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map((place,index)=><article key={place.id||`${place.name}-${index}`} className="rounded-3xl bg-[#F9F0E0] border border-[#A2AB73]/50 overflow-hidden shadow-lg flex flex-col"><div className="p-5 flex-1"><span className="text-[10px] uppercase tracking-wider font-bold text-[#CC3A63]">{place.matchLabel||`Match ${index+1}`}</span><h4 className="font-serif text-xl font-bold text-[#332B23] mt-1">{place.name}</h4><p className="text-xs text-[#786C5C] mt-2">{place.address||'Address not listed'}</p><div className="flex flex-wrap gap-2 mt-3"><span className="text-xs font-bold text-[#56602E]">{place.budgetLabel||'Price not listed'}</span>{place.distanceKm!=null&&<span className="text-xs text-[#786C5C]">{place.distanceKm} km</span>}{place.cuisine&&<span className="text-xs text-[#786C5C]">{place.cuisine}</span>}</div><p className="mt-4 text-sm text-[#4E453B] leading-relaxed">{place.reason}</p>{place.budgetFit&&<p className="mt-2 text-xs text-[#56602E]"><b>Budget:</b> {place.budgetFit}</p>}{place.vibeFit&&<p className="mt-1 text-xs text-[#56602E]"><b>Vibe:</b> {place.vibeFit}</p>}{place.orderAdvice&&<p className="mt-2 text-xs text-[#786C5C]"><b>Order idea:</b> {place.orderAdvice}</p>}{place.caution&&<p className="mt-3 text-xs text-[#8F2E46]">{place.caution}</p>}</div><div className="grid grid-cols-2 gap-2 p-4 pt-0"><a href={place.mapsUrl} target="_blank" rel="noopener noreferrer" className="py-2.5 rounded-xl bg-[#A2AB73] text-white text-xs font-bold text-center flex items-center justify-center gap-1"><MapPin className="w-3.5 h-3.5"/> Maps</a>{place.websiteUrl&&<a href={place.websiteUrl} target="_blank" rel="noopener noreferrer" className="py-2.5 rounded-xl bg-[#FFF7EB] text-[#56602E] border border-[#A2AB73]/40 text-xs font-bold text-center flex items-center justify-center gap-1"><Globe className="w-3.5 h-3.5"/> Website</a>}<a href={`https://www.zomato.com/ncr/restaurants?q=${encodeURIComponent(place.name)}`} target="_blank" rel="noopener noreferrer" className="py-2.5 rounded-xl bg-[#CC3A63] text-white text-xs font-bold text-center flex items-center justify-center gap-1">Zomato search</a></div></article>)}
      </div></div>}
    </div>
  </section>;
}
