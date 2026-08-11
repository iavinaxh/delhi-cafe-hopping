import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function InstaModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;
  const handleCopy = () => { navigator.clipboard.writeText('@iavinaxh'); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241F1A]/60 backdrop-blur-md animate-fadeIn"><div className="relative w-full max-w-md rounded-3xl bg-[#FFF7EB] border border-[#A2AB73]/60 p-6 shadow-2xl text-[#332B23] overflow-hidden" onClick={e=>e.stopPropagation()}>
    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-[#F9F0E0] text-[#56602E] border border-[#A2AB73]/40"><X className="w-5 h-5" /></button>
    <div className="text-center space-y-2 mb-6"><div className="w-16 h-16 mx-auto rounded-2xl bg-[#CC3A63] p-1"><div className="w-full h-full rounded-[14px] bg-[#FFF7EB] flex items-center justify-center"><InstagramIcon className="w-8 h-8 text-[#CC3A63]" /></div></div><h3 className="font-serif text-2xl font-bold flex items-center justify-center gap-2">Curated by Avinash <Sparkles className="w-4 h-4 text-[#A2AB73]" /></h3><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F0E0] border border-[#A2AB73]/50 text-xs font-semibold text-[#CC3A63]"><span>@iavinaxh</span><button onClick={handleCopy} className="p-1">{copied ? <Check className="w-3.5 h-3.5 text-[#56602E]" /> : <Copy className="w-3.5 h-3.5" />}</button></div></div>
    <div className="p-4 rounded-2xl bg-[#F9F0E0] border border-[#A2AB73]/40 text-center mb-6"><div className="w-56 h-56 mx-auto bg-white p-3 rounded-xl overflow-hidden flex items-center justify-center"><img src="/insta-qr.jpg" alt="Avinash Instagram QR Code @iavinaxh" className="w-full h-full object-contain rounded-lg" onError={e=>{e.target.onerror=null;e.target.src='https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://instagram.com/iavinaxh'}} /></div><p className="text-xs text-[#6D5E55] mt-3 flex items-center justify-center gap-1"><QrCode className="w-3.5 h-3.5 text-[#CC3A63]" /> Scan QR code or use the button below</p></div>
    <a href="https://instagram.com/iavinaxh" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl bg-[#CC3A63] hover:bg-[#B52F55] text-white font-bold text-sm flex items-center justify-center gap-2"><InstagramIcon className="w-5 h-5" /><span>Follow @iavinaxh on Instagram</span><ExternalLink className="w-4 h-4 opacity-80" /></a>
    {copied && <p className="text-center text-xs text-[#56602E] font-medium mt-2">Copied @iavinaxh to clipboard!</p>}
  </div></div>;
}
