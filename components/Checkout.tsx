
import React, { useState } from 'react';
import { CartItem } from '../types';
import VodafonePayment from './VodafonePayment.tsx';

interface CheckoutProps {
  items: CartItem[];
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onComplete }) => {
  const total = items.reduce((s, i) => s + (i.finalPrice * i.quantity), 0);
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('vodafone');

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 text-right" dir="rtl">
      <div className="mb-16 space-y-4">
        <span className="text-[10px] font-tech font-black uppercase tracking-[0.4em] text-cyber-acid animate-pulse">PROTOCOL: SECURE_DEPLOYMENT</span>
        <h2 className="text-5xl font-tech font-black text-white uppercase italic">Import_Confirmation</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          
          <div className="bg-cyber-zinc p-10 rounded-[2rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-tech font-bold mb-8 text-white uppercase italic border-r-4 border-cyber-acid pr-4">User_Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input type="text" placeholder="FULL_NAME" className="md:col-span-2 bg-black/40 border border-white/10 rounded-xl p-5 text-xs text-white font-tech outline-none focus:border-cyber-acid transition-all" />
               <input type="text" placeholder="NEURAL_LINK_ID / MOBILE" className="bg-black/40 border border-white/10 rounded-xl p-5 text-xs text-white font-tech outline-none focus:border-cyber-acid transition-all" />
               <input type="text" placeholder="SECTOR / GOVERNORATE" className="bg-black/40 border border-white/10 rounded-xl p-5 text-xs text-white font-tech outline-none focus:border-cyber-acid transition-all" />
               <textarea placeholder="DETAILED_DEPLOYMENT_ADDRESS" className="md:col-span-2 bg-black/40 border border-white/10 rounded-xl p-5 text-xs text-white font-tech h-32 outline-none focus:border-cyber-acid transition-all"></textarea>
            </div>
          </div>

          <div className="bg-cyber-zinc p-10 rounded-[2rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-tech font-bold mb-8 text-white uppercase italic border-r-4 border-cyber-acid pr-4">Payment_Gateway</h3>
            <div className="space-y-4">
               <div 
                onClick={() => setMethod('vodafone')}
                className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                  method === 'vodafone' ? 'border-cyber-acid bg-cyber-acid/5' : 'border-white/5 hover:border-white/10'
                }`}
               >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center font-tech font-black text-white text-[10px]">CASH</div>
                    <div className="text-right">
                       <p className="font-tech font-bold text-white text-sm">VODAFONE_CASH_LINK</p>
                       <p className="text-[8px] font-tech text-zinc-500 uppercase tracking-widest">Local_Transfer Protocol</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'vodafone' ? 'border-cyber-acid' : 'border-zinc-700'}`}>
                    {method === 'vodafone' && <div className="w-3 h-3 rounded-full bg-cyber-acid shadow-[0_0_10px_#ccff00]"></div>}
                  </div>
               </div>
            </div>
            
            {method === 'vodafone' && (
              <div className="mt-6">
                <VodafonePayment 
                  total={total}
                  orderId={undefined}
                  onReceiptUpload={(file) => {
                    console.log('Receipt uploaded:', file.name);
                    // يمكن إرسال الملف إلى الخادم هنا
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-cyber-zinc p-10 rounded-[2rem] text-white border border-cyber-acid/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-acid/5 blur-3xl"></div>
              <h3 className="text-lg font-tech font-bold mb-8 uppercase italic">Vault_Inventory</h3>
              <div className="space-y-4 mb-8">
                {items.map(i => (
                  <div key={i.id} className="flex flex-col gap-1 pb-4 border-b border-white/5 last:border-0">
                     <div className="flex justify-between text-xs font-tech">
                        <span className="text-cyber-acid font-black">{i.finalPrice * i.quantity} SAR</span>
                        <span className="opacity-60 truncate max-w-[150px]">{i.name}</span>
                     </div>
                     <div className="flex justify-between text-[7px] text-zinc-600 uppercase tracking-widest">
                        <span>QTY: {i.quantity}</span>
                        <span>STYLE: +{i.stylePoints}</span>
                     </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-6 space-y-4">
                 <div className="flex justify-between font-tech font-black text-2xl text-cyber-acid">
                    <span>{total} SAR</span>
                    <span className="text-xs uppercase tracking-widest self-center text-zinc-500">Total_Val</span>
                 </div>
              </div>
              <button 
                onClick={handlePay}
                disabled={loading}
                className="btn-cyber w-full py-6 mt-10 text-[10px] font-tech font-black tracking-widest flex items-center justify-center gap-3"
              >
                {loading && <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>}
                {loading ? 'SYNCHRONIZING...' : 'EXECUTE_DEPLOYMENT'}
              </button>
           </div>
           
           <div className="p-8 bg-black/40 rounded-2xl border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-xl bg-cyber-acid/10 flex items-center justify-center text-cyber-acid shadow-[0_0_10px_rgba(204,255,0,0.1)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="2"/></svg>
                 </div>
                 <p className="text-[10px] font-tech font-black text-white uppercase tracking-widest">X-AURA_GUARANTEE</p>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed font-light">نضمن سلامة الأجهزة والملابس ومطابقتها للمعايير التقنية المعلنة. تتبع شحنتك لحظة بلحظة عبر الـ HUD الخاص بك.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
