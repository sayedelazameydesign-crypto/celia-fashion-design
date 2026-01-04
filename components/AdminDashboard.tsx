
import React, { useState } from 'react';
import { Product } from '../types';
import { PROFIT_MARGIN } from '../constants';

interface AdminDashboardProps {
  products: Product[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, onApprove, onReject }) => {
  const pendingDeals = products.filter(p => p.status === 'pending');
  const approvedCount = products.filter(p => p.status === 'approved').length;

  return (
    <div className="p-8 lg:p-16 max-w-[1700px] mx-auto space-y-16 text-right" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center gap-4">
             <span className="w-12 h-1 bg-cyber-gold rounded-full"></span>
             <h2 className="text-6xl font-black text-white italic tracking-tighter">مركز القيادة</h2>
          </div>
          <p className="text-zinc-500 font-medium text-lg">إدارة المخزون الملكي وطلبات الاستيراد الذكية</p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">القطع المعتمدة</p>
           <p className="text-5xl font-black text-white">{approvedCount}</p>
        </div>
        <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-cyber-gold/20 shadow-2xl">
           <p className="text-[10px] font-bold text-cyber-gold uppercase tracking-widest mb-4">طلبات معلقة</p>
           <p className="text-5xl font-black text-cyber-gold">{pendingDeals.length}</p>
        </div>
        <div className="bg-zinc-900/50 p-10 rounded-[3rem] border border-white/5 shadow-2xl">
           <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">هامش الربح الحالي</p>
           <p className="text-5xl font-black text-white">{PROFIT_MARGIN * 100}%</p>
        </div>
      </div>

      {/* Pending Deals Section */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
           <h3 className="text-2xl font-bold text-white">مراجعة صفقات الاستيراد</h3>
           <span className="text-[10px] bg-cyber-gold/10 text-cyber-gold px-4 py-2 rounded-full font-bold">يتطلب قراراً إدارياً</span>
        </div>

        {pendingDeals.length === 0 ? (
          <div className="py-20 text-center bg-zinc-900/20 rounded-[3rem] border border-dashed border-white/10">
             <p className="text-zinc-600 font-bold uppercase tracking-widest">لا توجد طلبات استيراد حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {pendingDeals.map(deal => (
              <div key={deal.id} className="bg-zinc-900 p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-10 hover:border-cyber-gold/30 transition-all group">
                <div className="w-32 h-32 bg-black rounded-3xl overflow-hidden shrink-0 border border-white/10">
                   <img src={deal.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={deal.name} />
                </div>
                
                <div className="flex-1 space-y-2 text-right">
                   <div className="flex gap-4 mb-2">
                      <span className="text-[8px] bg-white/5 px-2 py-1 rounded-full text-zinc-400 uppercase font-bold">{deal.category}</span>
                      <span className="text-[8px] bg-cyber-cyan/10 px-2 py-1 rounded-full text-cyber-cyan uppercase font-bold">Style Pts: {deal.stylePoints}</span>
                   </div>
                   <h4 className="text-xl font-bold text-white">{deal.name}</h4>
                   <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">{deal.description}</p>
                </div>

                <div className="flex flex-col items-center gap-2 px-10 border-r border-white/5">
                   <p className="text-[10px] text-zinc-500 uppercase font-bold">السعر المقترح</p>
                   <p className="text-2xl font-black text-cyber-gold">{Math.round(deal.originalPrice * (1 + PROFIT_MARGIN))} ر.س</p>
                   <p className="text-[8px] text-zinc-600">التكلفة: {deal.originalPrice} ر.س</p>
                </div>

                <div className="flex gap-4">
                   <button 
                    onClick={() => onApprove(deal.id)}
                    className="bg-cyber-gold text-black px-8 py-4 rounded-2xl font-black text-xs hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                   >
                     تعميد (Approve)
                   </button>
                   <button 
                    onClick={() => onReject(deal.id)}
                    className="bg-zinc-800 text-white px-8 py-4 rounded-2xl font-black text-xs hover:bg-rose-900/30 transition-all"
                   >
                     استبعاد
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
