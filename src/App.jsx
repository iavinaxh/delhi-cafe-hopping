import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecommendationPlanner from './components/RecommendationPlanner';
import QuickDecisions from './components/QuickDecisions';
import CafeExplorer from './components/CafeExplorer';
import DatePlansSection from './components/DatePlansSection';
import MetroGuideSection from './components/MetroGuideSection';
import ContactPage from './components/ContactPage';
import InstaModal from './components/InstaModal';
import WishlistDrawer from './components/WishlistDrawer';
import Footer from './components/Footer';
import { cafesData } from './data/cafes';
import { PREMIUM_CAFES } from './data/premiumCafes';
import { MapPin, Utensils, Globe, X, ShoppingBag } from 'lucide-react';

const allCafes = [...cafesData, ...PREMIUM_CAFES];
// RecommendationPlanner already has its own ranking logic. Feed it a neutral catalogue order
// so legacy `isTopPick` flags cannot overpower the user's selected budget/location/vibe.
// Premium venues are placed first only to break genuine score ties in favour of catalogue coverage.
const recommendationCafes = [...PREMIUM_CAFES, ...cafesData].map(cafe => ({ ...cafe, isTopPick: false }));

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('explore');
  const [isInstaModalOpen, setIsInstaModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [isContactPage, setIsContactPage] = useState(() => window.location.pathname === '/contact');

  useEffect(() => {
    const handlePopState = () => setIsContactPage(window.location.pathname === '/contact');
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openContactPage = () => {
    window.history.pushState({}, '', '/contact');
    setIsContactPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    if (window.location.pathname !== '/') window.history.pushState({}, '', '/');
    setIsContactPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const navigateHomeSection = (tab) => {
    setActiveTab(tab);
    goHome();
  };

  if (isContactPage) {
    return (
      <div className="min-h-screen bg-[#F47B3A] text-[#3A1F14] font-sans flex flex-col">
        <Navbar wishlistCount={wishlist.length} onOpenWishlist={() => setIsWishlistOpen(true)} onOpenInstaModal={() => setIsInstaModalOpen(true)} activeTab="contact" setActiveTab={navigateHomeSection} onOpenContact={openContactPage} onGoHome={goHome} />
        <ContactPage />
        <Footer onOpenInstaModal={() => setIsInstaModalOpen(true)} onOpenContact={openContactPage} />
        <InstaModal isOpen={isInstaModalOpen} onClose={() => setIsInstaModalOpen(false)} />
        <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} wishlist={wishlist} cafes={allCafes} onToggleWishlist={toggleWishlist} onSelectCafe={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F47B3A] text-[#3A1F14] font-sans flex flex-col justify-between site-shell">
      <div>
        <Navbar wishlistCount={wishlist.length} onOpenWishlist={() => setIsWishlistOpen(true)} onOpenInstaModal={() => setIsInstaModalOpen(true)} activeTab={activeTab} setActiveTab={setActiveTab} onOpenContact={openContactPage} onGoHome={goHome} />
        <Hero searchQuery={searchQuery} setSearchQuery={(q) => { setSearchQuery(q); if (activeTab !== 'explore') setActiveTab('explore'); }} onOpenInstaModal={() => setIsInstaModalOpen(true)} setActiveTab={setActiveTab} />
        <main className="bg-[#F47B3A] pb-16 site-main">
          <RecommendationPlanner cafes={recommendationCafes} wishlist={wishlist} onToggleWishlist={toggleWishlist} onSelectCafe={setSelectedCafe} />
          {activeTab === 'explore' && <div id="section-explore" className="scroll-mt-24"><CafeExplorer cafes={allCafes} searchQuery={searchQuery} wishlist={wishlist} onToggleWishlist={toggleWishlist} onSelectCafe={(cafe) => setSelectedCafe(cafe)} /></div>}
          {activeTab === 'quick' && <div id="section-quick" className="scroll-mt-24"><QuickDecisions cafes={allCafes} onSelectCafe={(cafe) => setSelectedCafe(cafe)} /></div>}
          {activeTab === 'plans' && <div id="section-plans" className="scroll-mt-24"><DatePlansSection /></div>}
          {activeTab === 'metro' && <div id="section-metro" className="scroll-mt-24"><MetroGuideSection /></div>}
        </main>
      </div>
      <Footer onOpenInstaModal={() => setIsInstaModalOpen(true)} onOpenContact={openContactPage} />
      <InstaModal isOpen={isInstaModalOpen} onClose={() => setIsInstaModalOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} wishlist={wishlist} cafes={allCafes} onToggleWishlist={toggleWishlist} onSelectCafe={(cafe) => setSelectedCafe(cafe)} />

      {selectedCafe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A1F14]/75 backdrop-blur-md animate-fadeIn" onClick={() => setSelectedCafe(null)}>
          <div className="relative w-full max-w-2xl rounded-[28px] bg-[#FFF4E6] border border-[#E7B894] p-5 sm:p-8 shadow-2xl text-[#3A1F14] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setSelectedCafe(null)} aria-label="Close cafe details" className="absolute top-4 right-4 p-2.5 rounded-full bg-[#FCE6D0] text-[#7A2E12] hover:text-[#CC3A63] border border-[#E7B894] transition-all"><X className="w-5 h-5" /></button>
            <div className="flex flex-wrap items-center gap-2 mb-3"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FCE6D0] border border-[#E7B894] text-[#7A2E12]">{selectedCafe.zone}</span><span className="px-3 py-1 rounded-full text-xs font-medium bg-white/70 text-[#7A2E12] border border-[#E7B894]">{selectedCafe.vibeTag}</span></div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-2"><h2 className="font-serif text-3xl font-bold text-[#3A1F14]">{selectedCafe.name}</h2><span className="text-sm font-bold px-3 py-1 rounded-full bg-[#CC3A63] text-white whitespace-nowrap">{selectedCafe.budget} for 2</span></div>
            <p className="text-xs sm:text-sm text-[#806050] italic mb-6">Best for: {selectedCafe.bestFor}</p>
            <div className="space-y-3 text-xs sm:text-sm text-[#5D4639] mb-8">
              {selectedCafe.whatToOrder && <div className="p-4 rounded-2xl bg-[#FCE6D0] border border-[#E7B894]"><span className="text-[#CC3A63] font-bold uppercase tracking-wider text-xs block mb-1">Recommended Order</span><p>{selectedCafe.whatToOrder}</p></div>}
              {selectedCafe.metroRoute && <div className="p-4 rounded-2xl bg-[#FCE6D0] border border-[#E7B894]"><span className="text-[#7A2E12] font-bold uppercase tracking-wider text-xs block mb-1">Getting There</span><p>{selectedCafe.metroRoute}</p></div>}
              {selectedCafe.afterFood && <div className="p-4 rounded-2xl bg-[#FCE6D0] border border-[#E7B894]"><span className="text-[#7A2E12] font-bold uppercase tracking-wider text-xs block mb-1">Post-Meal Walk & Activity</span><p>{selectedCafe.afterFood}</p></div>}
              {selectedCafe.curatorTake && <div className="p-4 rounded-2xl bg-[#7A2E12]/8 border border-[#E7B894] italic text-[#7A2E12]"><strong className="not-italic text-[#CC3A63] block mb-1">Avinash's Take:</strong>"{selectedCafe.curatorTake}"</div>}
            </div>
            <div className={`grid ${selectedCafe.dineoutUrl ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'} gap-2 pt-4 border-t border-[#E7B894]`}>
              <a href={selectedCafe.mapsUrl} target="_blank" rel="noopener noreferrer" className="min-h-[48px] p-3 rounded-xl bg-[#7A2E12] hover:bg-[#64240E] text-[#FFF4E6] text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><MapPin className="w-4 h-4" /><span>Google Maps</span></a>
              {selectedCafe.websiteUrl && <a href={selectedCafe.websiteUrl} target="_blank" rel="noopener noreferrer" className="min-h-[48px] p-3 rounded-xl bg-white/70 hover:bg-white border border-[#E7B894] text-[#7A2E12] text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><Globe className="w-4 h-4" /><span>Website</span></a>}
              <a href={selectedCafe.zomatoUrl || `https://www.zomato.com/ncr/restaurants?q=${encodeURIComponent(selectedCafe.name)}`} target="_blank" rel="noopener noreferrer" className="min-h-[48px] p-3 rounded-xl bg-[#CC3A63] hover:bg-[#B52F55] text-white text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><Utensils className="w-4 h-4" /><span>Zomato</span></a>
              {selectedCafe.dineoutUrl && <a href={selectedCafe.dineoutUrl} target="_blank" rel="noopener noreferrer" className="min-h-[48px] p-3 rounded-xl bg-[#56602E] hover:bg-[#414923] text-white text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all"><ShoppingBag className="w-4 h-4" /><span>Swiggy Dineout</span></a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
