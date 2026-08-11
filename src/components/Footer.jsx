import React from 'react';
import { Coffee, QrCode, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Footer({ onOpenInstaModal }) {
  return <footer className="bg-[#F9F0E0] border-t border-[#A2AB73]/50 text-[#6D5E55] py-12"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#A2AB73]/30">
      <div><div className="flex items-center space-x-3 mb-3"><div className="w-10 h-10 rounded-xl bg-[#CC3A63] flex items-center justify-center text-[#FFF7EB]"><Coffee className="w-5 h-5"/></div><span className="font-serif text-xl font-bold text-[#241F1A]">Delhi NCR Restaurant Finder</span></div><p className="text-xs text-[#6D5E55] leading-relaxed">Tell us your location, budget, people and vibe. Get a focused shortlist of cafes and restaurants worth considering.</p></div>
      <div><h4 className="text-xs uppercase font-bold tracking-wider text-[#CC3A63] mb-3">Curator & Instagram</h4><div className="space-y-2 text-xs"><p className="text-[#4E453B]">Curated by <strong className="text-[#56602E]">Avinash</strong></p><button onClick={onOpenInstaModal} className="px-3.5 py-2 rounded-xl bg-[#CC3A63] text-white font-semibold text-xs inline-flex items-center gap-2 hover:bg-[#B52F55] transition-all"><InstagramIcon className="w-4 h-4"/><span>@iavinaxh on Instagram</span><QrCode className="w-3.5 h-3.5 opacity-80"/></button></div></div>
      <div><h4 className="text-xs uppercase font-bold tracking-wider text-[#CC3A63] mb-3">Built for better decisions</h4><p className="text-xs text-[#6D5E55] mb-2 leading-relaxed">OpenStreetMap powers live place discovery; the curated guide and optional AI layer help narrow the choices without pretending uncertain facts are certain.</p><div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FFF7EB] border border-[#A2AB73]/50 text-xs text-[#56602E]"><span className="w-2 h-2 rounded-full bg-[#A2AB73]"></span><span>Delhi NCR ready</span></div></div>
    </div>
    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6D5E55] gap-4"><div><p>© {new Date().getFullYear()} Delhi NCR Restaurant Finder. Curated by @iavinaxh.</p><p className="mt-1">Place data © <a className="underline hover:text-[#CC3A63]" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>, available under the ODbL.</p></div><div className="flex items-center space-x-1"><span>Made with</span><Heart className="w-3.5 h-3.5 text-[#CC3A63] fill-[#CC3A63] inline"/><span>for people who hate choosing where to eat.</span></div></div>
  </div></footer>;
}
