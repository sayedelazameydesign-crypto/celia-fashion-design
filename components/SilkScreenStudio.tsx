
import React from 'react';

const SilkScreenStudio: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto py-40 px-6 text-right" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        <div className="silk-frame p-1 relative group overflow-hidden bg-black aspect-square flex items-center justify-center">
           <img 
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000" 
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000" 
           />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-cyber-gold/90 text-black px-12 py-6 font-black text-2xl rotate-[-5deg] shadow-2xl">
                 ROYAL_INK_STUDIO
              </div>
           </div>
        </div>

        <div className="space-y-12">
           <div className="space-y-4">
              <span className="text-[10px] font-bold text-cyber-gold uppercase tracking-[0.5em] block animate-pulse">CRAFT_PROTOCOL_ACTIVE</span>
              <h2 className="text-6xl font-black text-white italic leading-none">استوديو <br/> <span className="text-gold-luxe uppercase tracking-tighter">Silk Screen</span></h2>
           </div>

           <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-lg mr-auto">
              نحن لا نطبع فقط، نحن نسكب الذهب السائل على النسيج. تقنيتنا اليدوية تعتمد على تمريرات دقيقة عبر الشاشات الحريرية لضمان عمق لوني وملمس فاخر لا يمكن للطباعة الرقمية محاكاته.
           </p>

           <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem] space-y-4">
                 <div className="w-10 h-10 bg-cyber-gold/10 rounded-xl flex items-center justify-center text-cyber-gold">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" strokeWidth="2"/></svg>
                 </div>
                 <h4 className="font-bold text-white">طبقات الأحبار</h4>
                 <p className="text-[10px] text-zinc-500 font-tech uppercase tracking-widest">INK_LAYERS_DEPTH</p>
              </div>
              <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem] space-y-4">
                 <div className="w-10 h-10 bg-cyber-cyan/10 rounded-xl flex items-center justify-center text-cyber-cyan">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" strokeWidth="2"/></svg>
                 </div>
                 <h4 className="font-bold text-white">باليت ملكية</h4>
                 <p className="text-[10px] text-zinc-500 font-tech uppercase tracking-widest">LIQUID_GOLD_PALETTE</p>
              </div>
           </div>

           <button className="btn-gold px-12 py-5 text-sm tracking-widest shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:scale-105 transition-all">
              احجز قطعتك المخصصة الآن
           </button>
        </div>
      </div>
    </div>
  );
};

export default SilkScreenStudio;
