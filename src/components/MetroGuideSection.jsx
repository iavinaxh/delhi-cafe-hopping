import React from 'react';
import { METRO_ROUTES } from '../data/datePlans';
import { TrainFront, ExternalLink } from 'lucide-react';

export default function MetroGuideSection(){
  return <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#CC3A63]">
    <div className="mb-7">
      <p className="text-xs uppercase tracking-widest text-[#F9F0E0] font-bold">Getting around Delhi NCR</p>
      <h2 className="font-serif text-3xl font-bold text-[#241F1A]">Metro Route Cheat Sheet</h2>
      <p className="text-sm text-[#F9F0E0] mt-1">Useful interchange notes for the areas covered in this guide. Start from the station closest to you.</p>
    </div>
    <div className="space-y-4">{METRO_ROUTES.map((item)=><article key={item.destination} className="p-5 rounded-2xl bg-[#F9F0E0] border border-[#A2AB73]/70 shadow-[0_10px_28px_rgba(80,35,55,0.16)]">
      <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-[#A2AB73] text-[#FFF7EB]"><TrainFront className="w-5 h-5"/></div><h3 className="font-serif text-xl font-bold text-[#241F1A]">{item.destination}</h3><span className="ml-auto text-xs text-[#6D5E55]">{item.time}</span></div>
      <p className="text-sm text-[#4E453B] mt-4">{item.route}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#A2AB73]/30 text-xs"><span className="text-[#6D5E55]">{item.transfers}</span><a href="https://delhimetrorail.com" target="_blank" rel="noreferrer" className="text-[#56602E] font-semibold flex items-center gap-1">DMRC Status <ExternalLink className="w-3 h-3"/></a></div>
    </article>)}</div>
    <div className="mt-6 p-5 rounded-2xl bg-[#FFF7EB] border border-[#A2AB73]/60 text-xs text-[#4E453B]"><b className="text-[#CC3A63]">Before you leave:</b> Check the official DMRC status. Temporary security restrictions, gate closures or service changes can affect central stations.</div>
  </section>;
}
