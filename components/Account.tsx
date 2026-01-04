
import React from 'react';

interface AccountProps {
  onGoToAffiliate?: () => void;
}

const Account: React.FC<AccountProps> = ({ onGoToAffiliate }) => {
  return (
    <div className="max-w-6xl mx-auto py-32 px-6 text-right" dir="rtl">
      {/* Membership Header - Cyber Style */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-cyber-zinc p-12 md:p-16 text-white mb-20 border border-cyber-acid/20 shadow-2xl shadow-cyber-acid/5">
         <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-acid/5 blur-[120px] rounded-full -translate-y-48 translate-x-48"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-10">
               <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-2 border-cyber-acid/30 p-1.5 bg-black rotate-3 group-hover:rotate-0 transition-transform">
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200" className="w-full h-full object-cover rounded-2xl grayscale brightness-125" alt="User Avatar" />
               </div>
               <div className="space-y-2">
                  <span className="text-[10px] font-tech font-black uppercase tracking-[0.6em] text-cyber-acid animate-pulse">LEVEL_MAX_JNR</span>
                  <h2 className="text-4xl md:text-5xl font-tech font-black tracking-tight uppercase">Cyber_Ziad</h2>
                  <p className="text-zinc-500 text-xs font-tech">Member since Protocol 2024.11</p>
               </div>
            </div>
            
            <div className="flex gap-10 text-center">
               <div className="space-y-1">
                  <p className="text-[8px] font-tech font-black uppercase tracking-widest text-zinc-500">STYLE_XP</p>
                  <p className="text-4xl font-tech font-black text-cyber-acid">14.2K</p>
               </div>
               <div className="w-px h-12 bg-white/10 hidden md:block"></div>
               <div className="space-y-1">
                  <p className="text-[8px] font-tech font-black uppercase tracking-widest text-zinc-500">RANK</p>
                  <p className="text-4xl font-tech font-black text-cyber-pink">ELITE</p>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           <div className="bg-cyber-zinc/50 p-10 rounded-[2.5rem] border border-white/5">
              <div className="flex justify-between items-center mb-10">
                <button className="text-[8px] font-tech font-black uppercase tracking-widest text-cyber-acid hover:text-white transition-all underline underline-offset-8">VIEW_HISTORY</button>
                <h3 className="text-xl font-tech font-black text-white uppercase italic">Active_Deployments</h3>
              </div>
              <div className="space-y-6">
                {[1, 2].map(id => (
                  <div key={id} className="flex items-center justify-between p-8 bg-black/40 rounded-3xl border border-white/5 hover:border-cyber-acid/30 transition-all group">
                     <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-cyber-acid/10 rounded-2xl flex items-center justify-center text-[10px] font-tech font-black text-cyber-acid">#{2026 + id}</div>
                        <div className="text-right">
                           <p className="font-tech font-bold text-white group-hover:text-cyber-acid transition-colors">IN_TRANSIT: GIZA_SECTOR</p>
                           <p className="text-[10px] font-tech text-zinc-500">ETA: 48 HOURS // 3 ITEMS</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-tech uppercase text-zinc-600 hover:text-white transition-all">TRACK_DAT</button>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-cyber-zinc/50 p-10 rounded-[2.5rem] border border-white/5">
              <h3 className="text-xl font-tech font-black text-white uppercase italic mb-10">AURA_CLOSET (DIGITAL_COLLECTION)</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
                <div className="aspect-[3/4] bg-black/40 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-cyber-acid/50 cursor-pointer transition-all group">
                   <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-zinc-700 group-hover:text-cyber-acid" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" strokeWidth="2.5" /></svg>
                   </div>
                   <span className="text-[7px] text-zinc-700 font-tech font-black uppercase tracking-widest group-hover:text-cyber-acid">UPLOAD_SCAN</span>
                </div>
                {[1, 2].map(i => (
                  <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden bg-black group relative border border-white/5">
                    <img src={`https://images.unsplash.com/photo-${i === 1 ? '1519238263530-99bdd11df2ea' : '1553062407-98eeb64c6a62'}?q=80&w=400`} className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-cyber-acid/90 text-center translate-y-full group-hover:translate-y-0 transition-transform">
                       <span className="text-[8px] text-black font-tech font-black uppercase tracking-widest">EQUIP_NOW</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-cyber-zinc/50 p-10 rounded-[2.5rem] border border-cyber-acid/20 space-y-10">
              <h3 className="text-xl font-tech font-black text-white uppercase italic">Partner_Console</h3>
              <div className="space-y-6">
                 <p className="text-xs text-zinc-500 font-tech leading-relaxed">حقّق أرباحاً تصل إلى <span className="text-cyber-acid">10%</span> بمشاركة كودك الخاص مع أصدقائك في مجتمع الجيمرز والشباب.</p>
                 <button 
                  onClick={onGoToAffiliate}
                  className="btn-cyber w-full py-5 text-[9px] font-tech font-black tracking-widest"
                 >
                    DASHBOARD_ACCESS
                 </button>
              </div>
           </div>

           <div className="bg-black/40 p-10 rounded-[2.5rem] border border-white/5 space-y-12">
              <h3 className="text-xl font-tech font-black text-white uppercase italic">Style_Metrics</h3>
              <div className="space-y-8">
                 <div className="space-y-4">
                    <p className="text-[8px] font-tech font-black uppercase tracking-[0.4em] text-zinc-500">VIBE_ANALYSIS</p>
                    <p className="text-2xl font-tech font-black text-cyber-acid uppercase">Tech-Wear // Pro</p>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[85%] h-full bg-cyber-acid shadow-[0_0_10px_#ccff00]"></div>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <p className="text-[8px] font-tech font-black uppercase tracking-[0.4em] text-zinc-500">FAVORITE_COLORS</p>
                    <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-xl bg-cyber-black border border-cyber-acid/40" title="Carbon"></div>
                       <div className="w-10 h-10 rounded-xl bg-cyber-acid border border-white/10" title="Neon"></div>
                       <div className="w-10 h-10 rounded-xl bg-cyber-pink border border-white/10" title="Flash"></div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/10">
                    <button className="w-full py-5 rounded-2xl bg-white/5 text-zinc-400 text-[9px] font-tech font-black uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all border border-white/10">
                       GENERATE_STYLE_REPORT.PDF
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
