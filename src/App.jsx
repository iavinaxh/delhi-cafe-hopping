import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuickDecisions from './components/QuickDecisions';
import CafeExplorer from './components/CafeExplorer';
import DatePlansSection from './components/DatePlansSection';
import MetroGuideSection from './components/MetroGuideSection';
import InstaModal from './components/InstaModal';
import WishlistDrawer from './components/WishlistDrawer';
import Footer from './components/Footer';
import { cafesData } from './data/cafes';
import { MapPin, Utensils, Globe, X, ShoppingBag } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [isInstaModalOpen, setIsInstaModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('delhi_cafe_wishlist');
      return saved ? JSON.parse(saved) : ['cine-tree', 'kartoon-cafe'];
    } catch {
      return ['cine-tree', 'kartoon-cafe'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('delhi_cafe_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error("LocalStorage error:", e);
    }
  }, [wishlist]);

  const toggleWishlist = (cafeId) => {
    setWishlist(prev => prev.includes(cafeId) ? prev.filter(id => id !== cafeId) : [...prev, cafeId]);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-700 selection:text-white flex flex-col justify-between">
      <div>
        <Navbar wishlistCount={wishlist.length} onOpenWishlist={() => setIsWishlistOpen(true)} onOpenInstaModal={() => setIsInstaModalOpen(true)} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Hero searchQuery={searchQuery} setSearchQuery={(q) => { setSearchQuery(q); if (activeTab !== 'explore') setActiveTab('explore'); }} onOpenInstaModal={() => setIsInstaModalOpen(true)} setActiveTab={setActiveTab} />
        <main className="pb-16">
          {activeTab === 'explore' && <CafeExplorer cafes={cafesData} searchQuery={searchQuery} wishlist={wishlist} onToggleWishlist={toggleWishlist} onSelectCafe={(cafe) => setSelectedCafe(cafe)} />}
          {activeTab === 'quick' && <QuickDecisions cafes={cafesData} onSelectCafe={(cafe) => setSelectedCafe(cafe)} />}
          {activeTab === 'plans' && <DatePlansSection cafes={cafesData} onSelectCafe={(cafe) => setSelectedCafe(cafe)} />}
          {activeTab === 'metro' && <MetroGuideSection />}
        </main>
      </div>

      <Footer onOpenInstaModal={() => setIsInstaModalOpen(true)} />
      <InstaModal isOpen={isInstaModalOpen} onClose={() => setIsInstaModalOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} wishlist={wishlist} cafes={cafesData} onToggleWishlist={toggleWishlist} onSelectCafe={(cafe) => setSelectedCafe(cafe)} />

      {selectedCafe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-amber-800/50 p-6 sm:p-8 shadow-2xl text-stone-100 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedCafe(null)} className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-stone-100 transition-all"><X className="w-5 h-5" /></button>
            <div className="flex flex-wrap items-center gap-2 mb-3"><span className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-950 border border-amber-800 text-amber-300">{selectedCafe.zone}</span><span className="px-3 py-1 rounded-lg text-xs font-medium bg-stone-800 text-stone-300">{selectedCafe.vibeTag}</span></div>
            <div className="flex items-baseline justify-between gap-3 mb-2"><h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">{selectedCafe.name}</h2><span className="text-sm font-bold px-3 py-1 rounded-md bg-stone-950 border border-emerald-800 text-emerald-400 whitespace-nowrap">{selectedCafe.budget} for 2</span></div>
            <p className="text-xs sm:text-sm text-stone-400 italic mb-6">Best for: {selectedCafe.bestFor}</p>
            <div className="space-y-4 text-xs sm:text-sm text-stone-300 mb-8">
              {selectedCafe.whatToOrder && <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800"><span className="text-amber-400 font-bold uppercase tracking-wider text-xs block mb-1">🍽️ Recommended Order</span><p className="text-stone-200">{selectedCafe.whatToOrder}</p></div>}
              {selectedCafe.metroRoute && <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800"><span className="text-emerald-400 font-bold uppercase tracking-wider text-xs block mb-1">🚇 Metro Route (From Paschim Vihar)</span><p className="text-stone-300">{selectedCafe.metroRoute}</p></div>}
              {selectedCafe.afterFood && <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800"><span className="text-sky-400 font-bold uppercase tracking-wider text-xs block mb-1">📍 Post-Meal Walk & Activity</span><p className="text-stone-300">{selectedCafe.afterFood}</p></div>}
              {selectedCafe.curatorTake && <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/50 italic text-amber-200"><strong className="not-italic text-amber-400 block mb-1">Avinash's Take:</strong>"{selectedCafe.curatorTake}"</div>}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-stone-800">
              <a href={selectedCafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-amber-700/30 hover:bg-amber-600/40 border border-amber-600/50 text-amber-200 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><MapPin className="w-4 h-4 text-amber-400" /><span>Google Maps</span></a>
              <a href={selectedCafe.websiteUrl || selectedCafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><Globe className="w-4 h-4 text-sky-400" /><span>Website</span></a>
              <a href={selectedCafe.zomatoUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><Utensils className="w-4 h-4 text-red-400" /><span>Zomato</span></a>
              <a href={selectedCafe.swiggyUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-orange-950/50 hover:bg-orange-900/60 border border-orange-800/50 text-orange-300 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><ShoppingBag className="w-4 h-4 text-orange-400" /><span>Swiggy</span></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
