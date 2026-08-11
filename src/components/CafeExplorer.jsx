import React, { useMemo, useState } from 'react';
import { Filter } from 'lucide-react';
import CafeCard from './CafeCard';
import { ZONES, VIBES } from '../data/cafes';

export default function CafeExplorer({ cafes, searchQuery, wishlist, onToggleWishlist, onSelectCafe }) {
  const [zone, setZone] = useState('All Zones');
  const [vibe, setVibe] = useState('All Vibes');
  const filtered = useMemo(() => cafes.filter(c => {
    const q = searchQuery.toLowerCase();
    const text = [c.name, c.zone, c.vibeTag, c.bestFor, c.whatToOrder].join(' ').toLowerCase();
    return (!q || text.includes(q)) && (zone === 'All Zones' || c.zone === zone) && (vibe === 'All Vibes' || c.vibeTag === vibe);
  }), [cafes, searchQuery, zone, vibe]);

  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#FFF4E6]">
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">
      <div><p className="text-xs uppercase tracking-[0.18em] text-[#CC3A63] font-bold">Explore the catalogue</p><h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3A1F14]">Cafes & restaurants worth knowing</h2><p className="text-sm text-[#6F5041] mt-2 max-w-2xl">Browse compact cards. Click a cafe or restaurant to open its full details.</p></div>
      <div className="flex flex-wrap gap-2"><select value={zone} onChange={e => setZone(e.target.value)} className="bg-[#FCE6D0] border border-[#E7B894] rounded-full px-4 py-2.5 text-xs text-[#3A1F14] focus:outline-none focus:ring-2 focus:ring-[#CC3A63]/30"><option>All Zones</option>{ZONES.filter(x => x !== 'All Zones').map(x => <option key={x}>{x}</option>)}</select><select value={vibe} onChange={e => setVibe(e.target.value)} className="bg-[#FCE6D0] border border-[#E7B894] rounded-full px-4 py-2.5 text-xs text-[#3A1F14] focus:outline-none focus:ring-2 focus:ring-[#CC3A63]/30"><option>All Vibes</option>{VIBES.filter(x => x !== 'All Vibes').map(x => <option key={x}>{x}</option>)}</select><span className="px-4 py-2.5 rounded-full bg-[#7A2E12] text-[#FFF4E6] text-xs flex items-center gap-1"><Filter className="w-3 h-3" />{filtered.length} places</span></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">{filtered.map(c => <CafeCard key={c.id} cafe={c} isWishlisted={wishlist.includes(c.id)} onToggleWishlist={onToggleWishlist} onSelectCafe={onSelectCafe} />)}</div>
  </section>;
}
