import React from 'react';
import { Coffee, QrCode, Heart, Linkedin, Mail } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Footer({ onOpenInstaModal, onOpenContact }) {
  return <footer className="bg-[#FCE6D0] border-t border-[#E7B894] text-[#6D5143] py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#E7B894]">
        <div>
          <div className="flex items-center space-x-3 mb-3"><div className="w-10 h-10 rounded-xl bg-[#CC3A63] flex items-center justify-center text-[#FFF4E6]"><Coffee className="w-5 h-5"/></div><span className="font-serif text-xl font-bold text-[#3A1F14]">Delhi NCR Restaurant Finder</span></div>
          <p className="text-xs text-[#6D5143] leading-relaxed">Tell us your location, budget, people and vibe. Get a focused shortlist of cafes and restaurants worth considering.</p>
        </div>
        <div>
          <h4 className="text-xs uppercase font-bold tracking-wider text-[#CC3A63] mb-3">Curator</h4>
          <div className="space-y-2 text-xs">
            <p className="text-[#4E382E]">Curated by <strong className="text-[#7A2E12]">Avinash</strong></p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={onOpenInstaModal} className="min-h-11 px-3.5 py-2 rounded-xl bg-[#CC3A63] text-white font-semibold text-xs inline-flex items-center justify-center gap-2 hover:bg-[#B52F55] transition-all"><InstagramIcon className="w-4 h-4"/><span>@iavinaxh</span><QrCode className="w-3.5 h-3.5 opacity-80"/></button>
              <a href="https://www.linkedin.com/in/avinash-singh-232522254/" target="_blank" rel="noopener noreferrer" aria-label="Avinash Singh on LinkedIn" className="min-h-11 px-3.5 py-2 rounded-xl bg-[#FFF4E6] border border-[#E7B894] text-[#7A2E12] font-semibold text-xs inline-flex items-center justify-center gap-2 hover:border-[#CC3A63] hover:text-[#CC3A63] transition-all"><Linkedin className="w-4 h-4"/><span>LinkedIn</span></a>
              <button type="button" onClick={onOpenContact} className="min-h-11 px-3.5 py-2 rounded-xl bg-[#FFF4E6] border border-[#E7B894] text-[#7A2E12] font-semibold text-xs inline-flex items-center justify-center gap-2 hover:border-[#CC3A63] hover:text-[#CC3A63] transition-all"><Mail className="w-4 h-4"/><span>Contact</span></button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase font-bold tracking-wider text-[#CC3A63] mb-3">Built for better decisions</h4>
          <p className="text-xs text-[#6D5143] mb-2 leading-relaxed">Curated Delhi NCR venue data and practical budget guidance help narrow the choices without pretending uncertain facts are certain.</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FFF4E6] border border-[#E7B894] text-xs text-[#7A2E12]"><span className="w-2 h-2 rounded-full bg-[#A2AB73]"></span><span>Delhi NCR ready</span></div>
        </div>
      </div>
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6D5143] gap-4"><div><p>© {new Date().getFullYear()} Delhi NCR Restaurant Finder. Curated by @iavinaxh.</p></div><div className="flex items-center space-x-1"><span>Made with</span><Heart className="w-3.5 h-3.5 text-[#CC3A63] fill-[#CC3A63] inline"/><span>for people who hate choosing where to eat.</span></div></div>
    </div>
  </footer>;
}
