
import React, { useState, useRef, useEffect } from 'react';
import { aiAPI } from '../lib/api';
import { Product } from '../types';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  products?: Product[];
}

const StylistAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Optional filters
  const [ageRange, setAgeRange] = useState('');
  const [size, setSize] = useState('');
  const [favoriteColors, setFavoriteColors] = useState('');
  const [budget, setBudget] = useState<number | ''>('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setChat(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await aiAPI.getAdvice({
        query: userText,
        age_range: ageRange || undefined,
        size: size || undefined,
        favorite_colors: favoriteColors || undefined,
        budget: budget ? Number(budget) : undefined,
        lang: 'ar'
      });

      setChat(prev => [...prev, { 
        role: 'ai', 
        text: response.advice,
        products: response.products || []
      }]);
    } catch (error: any) {
      setChat(prev => [...prev, { 
        role: 'ai', 
        text: `⚠️ خطأ: ${error.message || 'فشل الاتصال بالخادم'}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setChat(prev => [...prev, { role: 'user', text: '🔍 البحث بالصورة...' }]);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result;
      if (typeof result === 'string') {
        const base64 = result.split(',')[1];
        try {
          const response = await aiAPI.visualSearch(base64, 'ar');
          setChat(prev => [...prev, { 
            role: 'ai', 
            text: response.message || '🔥 وجدنا منتجات مشابهة!',
            products: response.products || []
          }]);
        } catch (error: any) {
          setChat(prev => [...prev, { 
            role: 'ai', 
            text: `⚠️ خطأ: ${error.message || 'فشل البحث البصري'}` 
          }]);
        }
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-7xl mx-auto py-32 px-4 text-right">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-[900px]">
        
        {/* Aura-Bot Profile Side */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
           <div className="relative group mx-auto lg:mr-0">
             <div className="absolute inset-0 bg-cyber-acid blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
             <div className="relative w-40 h-40 border-4 border-cyber-acid p-2 rounded-[2rem] overflow-hidden bg-black">
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4628c975c?q=80&w=200" className="w-full h-full object-cover grayscale contrast-125" alt="Aura Bot" />
             </div>
             <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-cyber-acid text-black font-black text-[10px] rounded-xl shadow-2xl">
                AURA_BOT v5.0 🔥
             </div>
           </div>

           <div className="space-y-4">
             <h2 className="text-5xl font-tech font-bold text-white uppercase leading-none">Aura <br/> <span className="text-cyber-acid">Architect</span></h2>
             <p className="text-zinc-500 text-sm font-light leading-relaxed">
                مبرمج المظهر الذكي لجيل Z. اطلب "Level Up" 👟، "Epic Loot" 💎، أو "Glow Up" ✨
             </p>
           </div>

           {/* Optional Filters */}
           <div className="space-y-4 p-6 bg-zinc-900/50 border border-white/10 rounded-2xl">
             <h4 className="text-[10px] font-bold text-cyber-gold uppercase tracking-widest mb-4">الفلاتر (اختياري)</h4>
             <input
               type="text"
               placeholder="العمر (مثلاً: 16-20)"
               value={ageRange}
               onChange={(e) => setAgeRange(e.target.value)}
               className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-cyber-acid/50 focus:outline-none"
             />
             <input
               type="text"
               placeholder="المقاس (مثلاً: M, L)"
               value={size}
               onChange={(e) => setSize(e.target.value)}
               className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-cyber-acid/50 focus:outline-none"
             />
             <input
               type="text"
               placeholder="الألوان المفضلة"
               value={favoriteColors}
               onChange={(e) => setFavoriteColors(e.target.value)}
               className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-cyber-acid/50 focus:outline-none"
             />
             <input
               type="number"
               placeholder="الميزانية (ر.س)"
               value={budget}
               onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : '')}
               className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-cyber-acid/50 focus:outline-none"
             />
           </div>

           {/* Quick Actions */}
           <div className="flex flex-col gap-3">
             {['نسقي لي إطلالة للجيمينج 🎮', 'أريد ستايل مدرسة نيون 🎒', 'إكسسوارات ترفع ليفل الأناقة ⚡'].map(q => (
               <button 
                 key={q}
                 onClick={() => setQuery(q)}
                 className="p-5 bg-white/5 border border-white/10 rounded-2xl text-right text-[11px] font-tech text-zinc-400 hover:text-cyber-acid hover:border-cyber-acid/50 transition-all"
               >
                 {q}
               </button>
             ))}
             <button
               onClick={() => fileInputRef.current?.click()}
               className="p-5 bg-cyber-acid/10 border border-cyber-acid/30 rounded-2xl text-right text-[11px] font-tech text-cyber-acid hover:bg-cyber-acid/20 transition-all flex items-center justify-between"
             >
               <span>🔍 البحث بالصورة</span>
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 0 0110.07 4h3.86a2 0 011.664.89l.812 1.22A2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
               </svg>
             </button>
             <input
               ref={fileInputRef}
               type="file"
               accept="image/*"
               className="hidden"
               onChange={handleImageUpload}
             />
           </div>
        </div>

        {/* HUD Chat Window */}
        <div className="lg:col-span-8 bg-cyber-zinc/50 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="h-2 bg-gradient-to-l from-cyber-acid via-cyber-cyan to-transparent opacity-30"></div>
          
          <div ref={scrollRef} className="flex-1 p-10 overflow-y-auto space-y-8 no-scrollbar">
            {chat.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-8 opacity-20">
                 <div className="w-32 h-32 border-2 border-dashed border-cyber-acid/30 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                    <div className="w-16 h-16 bg-cyber-acid/20 rounded-full animate-pulse"></div>
                 </div>
                 <p className="text-[10px] font-tech text-cyber-acid uppercase tracking-[1em] animate-pulse">Waiting for Intel...</p>
              </div>
            ) : (
              chat.map((msg, i) => (
                <div key={i} className="space-y-4 animate-reveal">
                  <div className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] rounded-[2rem] px-8 py-6 text-sm leading-relaxed border ${
                      msg.role === 'user' 
                        ? 'bg-cyber-acid text-black font-black border-transparent' 
                        : 'bg-black/60 text-white font-light border-white/10 shadow-xl'
                    }`}>
                      {msg.text.split('\n').map((line, idx) => (
                        <p key={idx} className="mb-2 last:mb-0">{line}</p>
                      ))}
                    </div>
                  </div>
                  
                  {/* Display Recommended Products */}
                  {msg.role === 'ai' && msg.products && msg.products.length > 0 && (
                    <div className="flex justify-end">
                      <div className="max-w-[90%] grid grid-cols-1 md:grid-cols-3 gap-4">
                        {msg.products.map((product: any) => (
                          <div
                            key={product.id}
                            className="bg-zinc-900/80 border border-cyber-acid/20 rounded-2xl overflow-hidden hover:border-cyber-acid/50 transition-all cursor-pointer group"
                            onClick={() => window.location.href = `/product/${product.id}`}
                          >
                            <div className="aspect-square overflow-hidden bg-black">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4 space-y-2">
                              <p className="text-[8px] text-cyber-acid uppercase tracking-widest font-bold">{product.category}</p>
                              <h4 className="text-sm font-bold text-white line-clamp-2">{product.name}</h4>
                              <div className="flex items-center justify-between pt-2">
                                <span className="text-lg font-black text-gold-luxe">{product.final_price} ر.س</span>
                                <button className="px-4 py-1.5 bg-cyber-acid text-black text-[10px] font-bold rounded-lg hover:bg-cyber-acid/80 transition-all">
                                  شراء 🔥
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-end animate-pulse">
                <div className="bg-cyber-acid/10 rounded-2xl px-8 py-4 border border-cyber-acid/20">
                  <span className="text-[8px] font-tech uppercase tracking-widest text-cyber-acid">Computing Style Protocol... ⚡</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="p-8 bg-black/40 border-t border-white/5">
            <div className="flex gap-4 items-center bg-white/5 border border-white/10 rounded-3xl px-8 py-3 focus-within:border-cyber-acid/50 transition-all group">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="أدخل بروتوكول البحث... (أو ارفع صورة للبحث البصري)"
                className="flex-1 bg-transparent py-4 text-sm focus:outline-none text-white text-right placeholder:text-zinc-600 font-tech"
              />
              <button 
                type="submit"
                disabled={loading || !query.trim()}
                className="text-cyber-acid p-4 hover:scale-125 transition-all disabled:opacity-20"
              >
                <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default StylistAI;
