import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecommendationPlanner from './components/RecommendationPlanner';
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
    } catch { return ['cine-tree', 'kartoon-cafe']; }
  });

  useEffect(() => {
    try { localStorage.setItem('delhi_cafe_wishlist', JSON.stringify(wishlist)); }
    catch (e) { console.error('LocalStorage error:', e); }
  }, [wishlist]);

  const toggleWishlist = (cafeId) => setWishlist(prev => prev.includes(cafeId) ? prev.filter(id => id !== cafeId) : [...prev, cafeId]);

  return (
    <div className="min-h-screen bg-[#CC3A63] text-[#241F1A] font-sans selection:bg-[#A2AB73] selection:text-white flex flex-col justify-between">
      <div>
        <Navbar wishlistCount={wishlist.length} onOpenWishlist={() => setIsWishlistOpen(true)} onOpenInstaModal={() => setIsInstaModalOpen(true)} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Hero searchQuery={searchQuery} setSearchQuery={(q) => { setSearchQuery(q); if (activeTab !== 'explore') setActiveTab('explore'); }} onOpenInstaModal={() => setIsInstaModalOpen(true)} setActiveTab={setActiveTab} />
        <main className="bg-[#CC3A63] pb-16">
          <RecommendationPlanner cafes={cafesData} wishlist={wishlist} onToggleWishlist={toggleWishlist} onSelectCafe={setSelectedCafe} />
          {activeTab === 'explore' && <CafeExplorer cafes={cafesData} searchQuery={searchQuery} wishlist={wishlist} onToggleWishlist={toggleWishlist} onSelectCafe={(cafe) => setSelectedCafe(cafe)} />}
          {activeTab === 'quick' && <QuickDecisions cafes={cafesData} onSelectCafe={(cafe) => setSelectedCafe(cafe)} />}
          {activeTab === 'plans' && <DatePlansSection />}
          {activeTab === 'metro' && <MetroGuideSection />}
        </main>
      </div>
      <Footer onOpenInstaModal={() => setIsInstaModalOpen(true)} />
      <InstaModal isOpen={isInstaModalOpen} onClose={() => setIsInstaModalOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} wishlist={wishlist} cafes={cafesData} onToggleWishlist={toggleWishlist} onSelectCafe={(cafe) => setSelectedCafe(cafe)} />

      {selectedCafe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241F1A]/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#FFF7EB] border border-[#A2AB73]/60 p-6 sm:p-8 shadow-2xl text-[#332B23] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedCafe(null)} className="absolute top-4 right-4 p-2 rounded-full bg-[#F9F0E0] text-[#6D7650] hover:text-[#CC3A63] border border-[#A2AB73]/40 transition-all"><X className="w-5 h-5" /></button>
            <div className="flex flex-wrap items-center gap-2 mb-3"><span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#A2AB73]/20 border border-[#A2AB73]/50 text-[#56602E]">{selectedCafe.zone}</span><span className="px-3 py-1 rounded-lg text-xs font-medium bg-[#F9F0E0] text-[#56602E] border border-[#A2AB73]/30">{selectedCafe.vibeTag}</span></div>
            <div className="flex items-baseline justify-between gap-3 mb-2"><h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332B23]">{selectedCafe.name}</h2><span className="text-sm font-bold px-3 py-1 rounded-full bg-[#A2AB73]/20 border border-[#A2AB73]/50 text-[#56602E] whitespace-nowrap">{selectedCafe.budget} for 2</span></div>
            <p className="text-xs sm:text-sm text-[#786C5C] italic mb-6">Best for: {selectedCafe.bestFor}</p>
            <div className="space-y-4 text-xs sm:text-sm text-[#4E453B] mb-8">
              {selectedCafe.whatToOrder && <div className="p-4 rounded-2xl bg-[#F9F0E0] border border-[#A2AB73]/30"><span className="text-[#CC3A63] font-bold uppercase tracking-wider text-xs block mb-1">Recommended Order</span><p>{selectedCafe.whatToOrder}</p></div>}
              {selectedCafe.metroRoute && <div className="p-4 rounded-2xl bg-[#F9F0E0] border border-[#A2AB73]/30"><span className="text-[#68713D] font-bold uppercase tracking-wider text-xs block mb-1">Getting There</span><p>{selectedCafe.metroRoute}</p></div>}
              {selectedCafe.afterFood && <div className="p-4 rounded-2xl bg-[#F9F0E0] border border-[#A2AB73]/30"><span className="text-[#68713D] font-bold uppercase tracking-wider text-xs block mb-1">Post-Meal Walk & Activity</span><p>{selectedCafe.afterFood}</p></div>}
              {selectedCafe.curatorTake && <div className="p-4 rounded-2xl bg-[#A2AB73]/15 border border-[#A2AB73]/35 italic text-[#56602E]"><strong className="not-italic text-[#CC3A63] block mb-1">Avinash's Take:</strong>"{selectedCafe.curatorTake}"</div>}
            </div>
            <div className={`grid ${selectedCafe.dineoutUrl ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'} gap-2 pt-4 border-t border-[#A2AB73]/30`}>
              <a href={selectedCafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#A2AB73] hover:bg-[#8F995F] text-white text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><MapPin className="w-4 h-4" /><span>Google Maps</span></a>
              {selectedCafe.websiteUrl && <a href={selectedCafe.websiteUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#F9F0E0] hover:bg-white border border-[#A2AB73]/40 text-[#56602E] text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><Globe className="w-4 h-4" /><span>Website</span></a>}
              <a href={selectedCafe.zomatoUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#CC3A63] hover:bg-[#B52F55] text-white text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><Utensils className="w-4 h-4" /><span>Zomato</span></a>
              {selectedCafe.dineoutUrl && <a href={selectedCafe.dineoutUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#56602E] hover:bg-[#414923] text-white text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><ShoppingBag className="w-4 h-4" /><span>Swiggy Dineout</span></a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
