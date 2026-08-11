import React from 'react';
import { Coffee, QrCode, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function Footer({ onOpenInstaModal }) {
  return (
    <footer className="bg-stone-950 border-t border-amber-900/40 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-900">
          <div>
            <div className="flex items-center space-x-3 mb-3"><div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-stone-950 font-bold"><Coffee className="w-5 h-5" /></div><span className="font-serif text-xl font-bold text-amber-100">Delhi NCR Date Guide</span></div>
            <p className="text-xs text-stone-400 leading-relaxed">Paschim Vihar origin budget-friendly cafe hopping guide. Handcrafted with warm cozy aesthetics, real menu budgets, & direct travel routes.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-3">Curator & Instagram</h4>
            <div className="space-y-2 text-xs"><p className="text-stone-300">Curated by <strong className="text-amber-200">Avinash</strong></p><button onClick={onOpenInstaModal} className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white font-semibold text-xs inline-flex items-center gap-2 hover:shadow-lg hover:shadow-pink-950/40 transition-all"><InstagramIcon className="w-4 h-4" /><span>@iavinaxh on Instagram</span><QrCode className="w-3.5 h-3.5 opacity-80" /></button></div>
          </div>
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-amber-400 mb-3">Vercel Ready Deployment</h4>
            <p className="text-xs text-stone-400 mb-2 leading-relaxed">Designed for ultra-fast performance, static generation & 1-click Vercel cloud hosting.</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>Vercel Optimized & Ready</span></div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4"><p>© {new Date().getFullYear()} Delhi NCR Date & Cafe Guide. Curated by @iavinaxh.</p><div className="flex items-center space-x-1"><span>Made with</span><Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /><span>for Coffee & Date Lovers in Delhi NCR</span></div></div>
      </div>
    </footer>
  );
}
