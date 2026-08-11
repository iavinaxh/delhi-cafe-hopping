import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

export default function InstaModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;
  const handleCopy = () => { navigator.clipboard.writeText('@iavinaxh'); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"><div className="relative w-full max-w-md rounded-3xl bg-stone-900 border border-amber-800/50 p-6 shadow-2xl text-stone-100 overflow-hidden" onClick={e=>e.stopPropagation()}>
    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400"><X className="w-5 h-5" /></button>
    <div className="text-center space-y-2 mb-6"><div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 p-1"><div className="w-full h-full rounded-[14px] bg-stone-950 flex items-center justify-center"><InstagramIcon className="w-8 h-8 text-pink-400" /></div></div><h3 className="font-serif text-2xl font-bold flex items-center justify-center gap-2">Curated by Avinash <Sparkles className="w-4 h-4 text-amber-400" /></h3><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950 border border-stone-800 text-xs font-semibold text-pink-400"><span>@iavinaxh</span><button onClick={handleCopy} className="p-1">{copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}</button></div></div>
    <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-center mb-6"><div className="w-56 h-56 mx-auto bg-white p-3 rounded-xl overflow-hidden flex items-center justify-center"><img src="/insta-qr.jpg" alt="Avinash Instagram QR Code @iavinaxh" className="w-full h-full object-contain rounded-lg" onError={e=>{e.target.onerror=null;e.target.src='https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://instagram.com/iavinaxh'}} /></div><p className="text-xs text-stone-400 mt-3 flex items-center justify-center gap-1"><QrCode className="w-3.5 h-3.5 text-amber-400" /> Scan QR code or use the button below</p></div>
    <a href="https://instagram.com/iavinaxh" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white font-bold text-sm flex items-center justify-center gap-2"><InstagramIcon className="w-5 h-5" /><span>Follow @iavinaxh on Instagram</span><ExternalLink className="w-4 h-4 opacity-80" /></a>
    {copied && <p className="text-center text-xs text-emerald-400 font-medium mt-2">Copied @iavinaxh to clipboard!</p>}
  </div></div>;
}
