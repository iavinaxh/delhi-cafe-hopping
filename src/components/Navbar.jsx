import React from 'react';
import { Coffee, Heart, QrCode, MapPin, Compass, Sparkles, Mail } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Navbar({ wishlistCount, onOpenWishlist, onOpenInstaModal, activeTab, setActiveTab, onOpenContact, onGoHome }) {
  const active = (tab) => activeTab === tab ? 'bg-[#FCE6D0] text-[#7A2E12] border border-[#E7B894]' : 'text-[#6F5041] hover:text-[#7A2E12] hover:bg-[#FFF4E6]';

  const goToSection = (tab) => {
    setActiveTab(tab);
    const scroll = () => document.getElementById(`section-${tab}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    requestAnimationFrame(scroll);
  };

  const findMyPlace = () => {
    setActiveTab('finder');
    document.getElementById('find-my-place')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goHome = () => {
    onGoHome?.();
  };

  return <header className="sticky top-0 z-40 bg-[#FFF4E6]/95 backdrop-blur-md border-b border-[#E7B894] text-[#3A1F14] shadow-[0_5px_22px_rgba(78,43,25,0.08)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between min-h-[72px] gap-3">
        <button type="button" className="flex items-center gap-3 cursor-pointer text-left min-w-0" onClick={goHome}>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#7A2E12] flex items-center justify-center shadow-lg shadow-[#7A2E12]/20 shrink-0"><Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFF4E6]" /></div>
          <div className="min-w-0"><span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#3A1F14] flex items-center gap-2">Delhi Date <span className="hidden lg:inline text-[#7A2E12] font-sans text-[10px] uppercase px-2 py-1 rounded-full bg-[#FCE6D0] border border-[#E7B894] tracking-wider">Delhi NCR</span></span><p className="text-[11px] text-[#806050] hidden sm:block">Find a cafe or restaurant that fits your plan</p></div>
        </button>
        <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
          <button type="button" onClick={findMyPlace} className="px-4 py-2.5 rounded-full transition-all flex items-center gap-2 text-[#FFF4E6] bg-[#F47B3A] hover:bg-[#D9682D] shadow-sm"><Sparkles className="w-4 h-4" /><span>Find My Place</span></button>
          <button type="button" onClick={()=>goToSection('explore')} className={`px-4 py-2.5 rounded-full transition-all flex items-center gap-2 ${active('explore')}`}><Compass className="w-4 h-4 text-[#F47B3A]" /><span>Explore</span></button>
          <button type="button" onClick={()=>goToSection('quick')} className={`px-4 py-2.5 rounded-full transition-all flex items-center gap-2 ${active('quick')}`}><span className="w-2 h-2 rounded-full bg-[#F47B3A]"></span><span>Quick Picks</span></button>
          <button type="button" onClick={()=>goToSection('plans')} className={`px-4 py-2.5 rounded-full transition-all ${active('plans')}`}>Date Plans</button>
          <button type="button" onClick={()=>goToSection('metro')} className={`px-4 py-2.5 rounded-full transition-all flex items-center gap-2 ${active('metro')}`}><MapPin className="w-4 h-4 text-[#7A2E12]" /><span>Metro</span></button>
          <button type="button" onClick={onOpenContact} className={`px-4 py-2.5 rounded-full transition-all flex items-center gap-2 ${active('contact')}`}><Mail className="w-4 h-4 text-[#CC3A63]" /><span>Contact</span></button>
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onOpenInstaModal} className="px-3 py-2.5 rounded-full bg-[#7A2E12] hover:bg-[#64240E] text-[#FFF4E6] font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors"><InstagramIcon className="w-4 h-4" /><span className="hidden sm:inline">@iavinaxh</span><QrCode className="w-3.5 h-3.5 opacity-80" /></button>
          <button type="button" onClick={onOpenWishlist} aria-label="Open saved places" className="relative p-2.5 rounded-full bg-[#FCE6D0] text-[#7A2E12] border border-[#E7B894] flex items-center gap-1.5 hover:border-[#F47B3A] transition-colors"><Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-[#F47B3A] fill-[#F47B3A]' : ''}`} />{wishlistCount > 0 && <span className="w-5 h-5 rounded-full bg-[#F47B3A] text-white text-xs font-bold flex items-center justify-center">{wishlistCount}</span>}</button>
        </div>
      </div>
      <div className="md:hidden flex items-center justify-around py-2.5 border-t border-[#E7B894] font-medium text-xs text-[#6F5041] overflow-x-auto">
        <button type="button" onClick={findMyPlace} className="text-[#F47B3A] font-bold px-3 py-2 rounded-full">Find</button><button type="button" onClick={()=>goToSection('explore')} className={`px-3 py-2 rounded-full ${active('explore')}`}>Explore</button><button type="button" onClick={()=>goToSection('quick')} className={`px-3 py-2 rounded-full ${active('quick')}`}>Quick</button><button type="button" onClick={()=>goToSection('plans')} className={`px-3 py-2 rounded-full ${active('plans')}`}>Plans</button><button type="button" onClick={()=>goToSection('metro')} className={`px-3 py-2 rounded-full ${active('metro')}`}>Metro</button><button type="button" onClick={onOpenContact} className={`px-3 py-2 rounded-full ${active('contact')}`}>Contact</button>
      </div>
    </div>
  </header>;
}
