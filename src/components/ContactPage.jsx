import React from 'react';
import { ArrowLeft, Mail, Instagram, Coffee } from 'lucide-react';

function LinkedInIcon({ className = 'w-5 h-5' }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor"><path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45H7.1V8.99H3.54v11.46Z" /></svg>;
}

export default function ContactPage() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#F47B3A] px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF4E6] border border-[#E7B894] text-[#7A2E12] text-sm font-semibold hover:border-[#CC3A63] transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Delhi Date
        </a>
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-6 lg:gap-8 mt-8">
          <section className="rounded-[32px] bg-[#FFF4E6] border border-[#E7B894] p-7 sm:p-10 shadow-[0_20px_60px_rgba(78,43,25,0.14)]">
            <div className="w-14 h-14 rounded-2xl bg-[#7A2E12] flex items-center justify-center mb-6"><Coffee className="w-7 h-7 text-[#FFF4E6]" /></div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#CC3A63]">Get in touch</p>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#3A1F14] mt-2">Let's talk.</h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#6D5143] max-w-xl">Have a suggestion for the Delhi NCR guide, found an incorrect venue detail, want to collaborate, or simply want to say hello? Send me a message.</p>
            <div className="mt-8 space-y-3">
              <a href="mailto:avisingh21122003@gmail.com" className="flex items-center gap-4 rounded-2xl bg-[#FCE6D0] border border-[#E7B894] p-4 hover:border-[#CC3A63] transition-all">
                <span className="w-11 h-11 rounded-xl bg-[#CC3A63] text-white flex items-center justify-center shrink-0"><Mail className="w-5 h-5" /></span>
                <span className="min-w-0"><span className="block text-xs uppercase tracking-wider font-bold text-[#CC3A63]">Email</span><span className="block text-sm sm:text-base font-semibold text-[#3A1F14] break-all">avisingh21122003@gmail.com</span></span>
              </a>
              <a href="https://www.linkedin.com/in/avinash-singh-232522254/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-[#FCE6D0] border border-[#E7B894] p-4 hover:border-[#CC3A63] transition-all">
                <span className="w-11 h-11 rounded-xl bg-[#7A2E12] text-[#FFF4E6] flex items-center justify-center shrink-0"><LinkedInIcon /></span>
                <span><span className="block text-xs uppercase tracking-wider font-bold text-[#CC3A63]">LinkedIn</span><span className="block text-sm sm:text-base font-semibold text-[#3A1F14]">Avinash Singh</span></span>
              </a>
              <a href="https://instagram.com/iavinaxh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-[#FCE6D0] border border-[#E7B894] p-4 hover:border-[#CC3A63] transition-all">
                <span className="w-11 h-11 rounded-xl bg-[#CC3A63] text-white flex items-center justify-center shrink-0"><Instagram className="w-5 h-5" /></span>
                <span><span className="block text-xs uppercase tracking-wider font-bold text-[#CC3A63]">Instagram</span><span className="block text-sm sm:text-base font-semibold text-[#3A1F14]">@iavinaxh</span></span>
              </a>
            </div>
          </section>
          <section className="rounded-[32px] bg-[#7A2E12] text-[#FFF4E6] p-7 sm:p-10 shadow-[0_20px_60px_rgba(78,43,25,0.2)] flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#F7B18A]">About the project</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2">Delhi Date is built to make choosing easier.</h2>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#FCE6D0]">The guide turns a few simple preferences into a focused shortlist of cafes and restaurants across Delhi NCR. The goal is practical recommendations, clear budget guidance and useful venue information, not endless scrolling.</p>
            </div>
            <div className="mt-10 rounded-2xl bg-[#FFF4E6]/10 border border-[#FFF4E6]/20 p-5"><p className="text-sm text-[#FCE6D0]">For corrections or venue updates, please include the restaurant name and the detail that needs changing. That makes it much easier to verify and update the guide.</p></div>
          </section>
        </div>
      </div>
    </main>
  );
}
