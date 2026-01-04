
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string, size: string, color: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  if (!isOpen) return null;
  const total = items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  const totalStylePoints = items.reduce((sum, item) => sum + ((item.stylePoints || 0) * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-[500] flex justify-end">
      <div className="absolute inset-0 bg-cyber-black/80 backdrop-blur-md animate-slow-fade" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg h-full bg-cyber-zinc border-l border-cyber-acid/20 p-6 md:p-12 flex flex-col text-right shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        
        <div className="flex justify-between items-center mb-12">
          <button onClick={onClose} className="text-zinc-500 hover:text-cyber-acid p-2 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg>
          </button>
          <div className="text-right">
            <h2 className="text-xl font-tech font-black text-white uppercase italic">Inventory_Deploy</h2>
            <p className="text-[8px] font-tech text-cyber-acid tracking-[0.4em]">SYSTEM_READY_FOR_IMPORT</p>
          </div>
        </div>

        {/* Style Points HUD Summary */}
        <div className="mb-8 p-4 bg-cyber-acid/5 border border-cyber-acid/20 rounded-2xl flex justify-between items-center">
           <div className="text-right">
              <p className="text-[7px] font-tech text-zinc-500 uppercase">Total Style Boost</p>
              <p className="text-xl font-tech font-black text-cyber-acid">+{totalStylePoints} PTS</p>
           </div>
           <div className="w-10 h-10 bg-cyber-acid rounded-lg flex items-center justify-center shadow-[0_0_15px_#ccff00]">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
               <div className="w-16 h-16 border-2 border-dashed border-cyber-acid rounded-full animate-spin"></div>
               <p className="text-[9px] font-tech font-black uppercase tracking-[0.5em]">No Assets Detected</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex gap-6 animate-reveal group relative">
                <div className="w-20 h-24 bg-black overflow-hidden shrink-0 rounded-xl border border-white/5 group-hover:border-cyber-acid/30 transition-all">
                  <img src={item.image} className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-[11px] font-tech font-bold text-white uppercase leading-relaxed">{item.name}</h3>
                    <div className="mt-2 flex items-center justify-end gap-3">
                       <span className="text-[8px] text-zinc-500 uppercase tracking-widest">{item.category}</span>
                       <span className="text-sm font-tech font-black text-cyber-acid">{item.finalPrice} SAR</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[7px] font-tech text-cyber-pink font-black">+{item.stylePoints} PTS</span>
                    <button 
                      onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)}
                      className="text-[8px] font-tech uppercase text-zinc-500 hover:text-cyber-pink transition-colors"
                    >
                      [EJECT_ITEM]
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-8 border-t border-white/5 mt-8 space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-tech font-black text-white">{total} <span className="text-xs text-cyber-acid">SAR</span></span>
              <span className="text-[9px] font-tech uppercase text-zinc-500 tracking-widest">Grand_Total</span>
            </div>
            <button className="btn-cyber w-full py-6 text-[10px] font-tech font-black tracking-[0.3em]">
              PROCEED_TO_DEPLOYMENT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
