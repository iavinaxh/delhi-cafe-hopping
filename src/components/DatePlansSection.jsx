import React from 'react';
import { DATE_PLANS } from '../data/datePlans';

export default function DatePlansSection(){
  return <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#CC3A63]">
    <div className="mb-7">
      <p className="text-xs uppercase tracking-widest text-[#F9F0E0] font-bold">Ready-made plans</p>
      <h2 className="font-serif text-3xl font-bold text-[#241F1A]">Just Follow the Plan</h2>
      <p className="text-sm text-[#F9F0E0] mt-1">Routes, food timing and after-cafe activities are already mapped out.</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {DATE_PLANS.map(plan=><article key={plan.id} className="p-6 rounded-2xl bg-[#F9F0E0] border border-[#A2AB73]/70 shadow-[0_10px_28px_rgba(80,35,55,0.16)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><span className="text-xs uppercase tracking-wider text-[#CC3A63] font-bold">{plan.tag}</span><h3 className="font-serif text-2xl font-bold mt-1 text-[#241F1A]">{plan.title}</h3></div>
          <span className="px-3 py-1 rounded-lg bg-[#A2AB73] border border-[#56602E]/30 text-[#FFF7EB] text-xs font-bold">{plan.budget}</span>
        </div>
        <p className="text-xs text-[#6D5E55] mt-2">{plan.timing}</p>
        <div className="mt-5 space-y-3">{plan.timeline.map((x,i)=><div key={i} className="flex gap-4"><span className="w-24 shrink-0 text-xs font-bold text-[#CC3A63]">{x.time}</span><span className="text-sm text-[#4E453B]">{x.detail}</span></div>)}</div>
        <div className="mt-5 p-4 rounded-xl bg-[#FFF7EB] border border-[#A2AB73]/50 text-xs text-[#4E453B]"><b className="text-[#56602E]">Why it works:</b> {plan.whyItWorks}</div>
      </article>)}
    </div>
  </section>;
}
