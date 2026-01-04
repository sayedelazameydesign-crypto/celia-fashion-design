
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1 Nov', clicks: 120, sales: 2 },
  { name: '5 Nov', clicks: 300, sales: 8 },
  { name: '10 Nov', clicks: 250, sales: 5 },
  { name: '15 Nov', clicks: 600, sales: 15 },
  { name: '20 Nov', clicks: 450, sales: 10 },
  { name: '25 Nov', clicks: 800, sales: 22 },
];

const AffiliateDashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-32 px-6 text-right" dir="rtl">
      <div className="mb-16 space-y-4">
        <span className="text-[10px] font-tech font-black uppercase tracking-[0.4em] text-cyber-acid animate-pulse">PARTNER_PORTAL_ACTIVE</span>
        <h2 className="text-5xl md:text-7xl font-tech font-black text-white uppercase italic">X-AURA_Network</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
         <div className="bg-cyber-zinc p-10 rounded-[2rem] border border-cyber-acid/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-acid/5 blur-3xl rounded-full"></div>
            <p className="text-[10px] font-tech font-black uppercase tracking-widest text-zinc-500 mb-6">UNCLAIMED_LOOT (BALANCE)</p>
            <p className="text-5xl font-tech font-black text-cyber-acid">2,450 <span className="text-xs opacity-40 font-tech">SAR</span></p>
            <button className="btn-cyber mt-8 w-full py-5 text-[10px] font-tech font-black tracking-widest">REQUEST_WITHDRAWAL</button>
         </div>
         <div className="bg-cyber-zinc p-10 rounded-[2rem] border border-white/5 shadow-xl">
            <p className="text-[10px] font-tech font-black uppercase tracking-widest text-zinc-500 mb-6">TOTAL_NODE_CLICKS</p>
            <p className="text-5xl font-tech font-black text-white">12.5K</p>
            <p className="mt-4 text-[10px] font-tech text-cyber-acid font-black uppercase">+45% GROWTH_BURST</p>
         </div>
         <div className="bg-cyber-zinc p-10 rounded-[2rem] border border-white/5 shadow-xl">
            <p className="text-[10px] font-tech font-black uppercase tracking-widest text-zinc-500 mb-6">CONVERSION_RATE</p>
            <p className="text-5xl font-tech font-black text-white">3.8%</p>
            <p className="mt-4 text-[10px] font-tech text-zinc-600 font-black uppercase tracking-widest">OPTIMAL_EFFICIENCY</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-cyber-zinc/50 p-10 rounded-[2.5rem] border border-white/5 h-[500px] shadow-2xl">
           <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-tech font-black uppercase tracking-widest text-zinc-500">REALTIME_TRAFFIC_HUD</span>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyber-acid shadow-[0_0_10px_#ccff00]"></div><span className="text-[8px] font-tech text-zinc-400 uppercase tracking-widest">SALES_NODE</span></div>
              </div>
           </div>
           <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={data}>
                 <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#ccff00" stopOpacity={0.2}/>
                       <stop offset="95%" stopColor="#ccff00" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(204,255,0,0.05)" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#444', fontFamily: 'Space Grotesk' }} />
                 <Tooltip 
                    contentStyle={{ background: '#000', border: '1px solid rgba(204,255,0,0.2)', borderRadius: '15px', color: '#fff', fontSize: '10px', textAlign: 'right', fontFamily: 'Space Grotesk' }}
                    itemStyle={{ color: '#ccff00' }}
                 />
                 <Area type="monotone" dataKey="sales" stroke="#ccff00" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
           </ResponsiveContainer>
        </div>

        <div className="space-y-8">
           <div className="bg-cyber-zinc p-10 rounded-[2.5rem] border border-white/5 shadow-xl">
              <h3 className="text-lg font-tech font-bold text-white mb-8 uppercase italic">REF_LINK_GEN</h3>
              <div className="flex items-center gap-4 bg-black/40 p-5 rounded-xl border border-white/10 group focus-within:border-cyber-acid/40 transition-all">
                 <input readOnly value="xaura.jnr/ref?id=ZYAD_HUD" className="bg-transparent text-[10px] font-tech flex-1 text-white outline-none" />
                 <button className="text-cyber-acid p-2 hover:scale-125 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2.5"/></svg>
                 </button>
              </div>
              <p className="mt-6 text-[8px] font-tech text-zinc-600 leading-relaxed italic uppercase">شارك هذا البروتوكول في الـ BIO الخاص بك على TikTok/Instagram لتحصيل مكافآت STYLE_XP وأرباح نقدية.</p>
           </div>
           
           <div className="bg-cyber-acid p-10 rounded-[2.5rem] text-black shadow-[0_0_50px_rgba(204,255,0,0.1)]">
              <h4 className="text-xl font-tech font-black mb-4 uppercase italic">MISSION_INTEL</h4>
              <p className="text-xs font-tech font-bold leading-relaxed mb-8">إكسسوارات الـ RGB وحقائب البكسل تحقق الآن أعلى معدل تحويل (CR) بين فئة المراهقين. ركز حملتك القادمة على الـ Accessories Vault.</p>
              <button className="w-full py-4 bg-black text-white text-[9px] font-tech font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform">DOWNLOAD_MEDIA_PACK</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
