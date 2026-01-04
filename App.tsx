
import React, { useState, useEffect, useMemo } from 'react';
import { View, Product, CartItem } from './types.ts';
import { MOCK_PRODUCTS, CATEGORIES, PROFIT_MARGIN } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import ProductCard from './components/ProductCard.tsx';
import Cart from './components/Cart.tsx';
import StylistAI from './components/StylistAI.tsx';
import Blog from './components/Blog.tsx';
import SilkScreenStudio from './components/SilkScreenStudio.tsx';
import Checkout from './components/Checkout.tsx';
import Account from './components/Account.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<View>('store');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // حالة المنتجات الفعلية (محاكاة لقاعدة البيانات)
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // المنتجات المعتمدة فقط تظهر في المتجر
  const approvedProducts = useMemo(() => {
    let result = allProducts.filter(p => p.status === 'approved');
    if (selectedCategory !== 'الكل') result = result.filter(p => p.category === selectedCategory);
    return result;
  }, [selectedCategory, allProducts]);

  const handleApprove = (id: string) => {
    setAllProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  };

  const handleReject = (id: string) => {
    setAllProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
  };

  const addToCart = (product: Product) => {
    const finalPrice = Math.round(product.originalPrice * (1 + PROFIT_MARGIN));
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1, selectedSize: 'M', selectedColor: 'Default', finalPrice }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white relative overflow-x-hidden">
      
      <Navbar 
        currentView={view} 
        onViewChange={setView} 
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={0}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {view === 'store' && (
          <div className="pt-24 md:pt-32">
            {/* Enhanced Hero Section */}
            <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 md:px-6 relative overflow-hidden py-20">
               {/* Animated Background */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-gold/5 blur-[150px] rounded-full animate-pulse"></div>
               <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyber-acid/5 blur-[100px] rounded-full animate-pulse delay-1000"></div>
               
               {/* Content */}
               <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-gold/10 border border-cyber-gold/30 rounded-full mb-8">
                   <span className="w-2 h-2 bg-cyber-gold rounded-full animate-pulse"></span>
                   <span className="text-[11px] font-bold text-cyber-gold tracking-widest uppercase">
                     Celia Fashion Design // تم التحقق من الجودة
                   </span>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.1]">
                   مجموعتنا<br/>
                   <span className="text-gold-luxe bg-clip-text">المعتمدة</span>
                 </h1>
                 
                 <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                   كل قطعة تراها هنا خضعت لبروتوكول فحص دقيق من خبراء الموضة والذكاء الاصطناعي لدينا. 
                   أزياء عصرية تلبي أحدث صيحات الموضة العالمية.
                 </p>

                 {/* Stats */}
                 <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12">
                   <div className="text-center">
                     <div className="text-3xl md:text-4xl font-black text-cyber-gold mb-1">{approvedProducts.length}+</div>
                     <div className="text-xs text-zinc-500 uppercase tracking-widest">منتج معتمد</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl md:text-4xl font-black text-cyber-gold mb-1">100%</div>
                     <div className="text-xs text-zinc-500 uppercase tracking-widest">جودة مضمونة</div>
                   </div>
                   <div className="text-center">
                     <div className="text-3xl md:text-4xl font-black text-cyber-gold mb-1">24/7</div>
                     <div className="text-xs text-zinc-500 uppercase tracking-widest">دعم متواصل</div>
                   </div>
                 </div>
            </section>

            {/* Enhanced Products Section */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-20">
              <div className="flex flex-col lg:flex-row gap-12 md:gap-16">
                
                {/* Enhanced Sidebar */}
                <aside className="w-full lg:w-72 space-y-8 text-right">
                  <div className="sticky top-28 space-y-8">
                    {/* Categories */}
                    <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-sm">
                      <h4 className="text-xs font-black text-cyber-gold uppercase tracking-widest flex items-center gap-2">
                        <span>📂</span>
                        التصنيفات المعتمدة
                      </h4>
                      <div className="flex flex-col gap-3">
                        {CATEGORIES.map(cat => (
                          <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-sm text-right transition-all duration-300 p-3 rounded-xl ${
                              selectedCategory === cat 
                                ? 'bg-cyber-gold/20 text-cyber-gold font-bold border border-cyber-gold/30' 
                                : 'text-zinc-500 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-gradient-to-br from-cyber-gold/10 to-amber-600/5 border border-cyber-gold/20 rounded-3xl p-6 space-y-4 backdrop-blur-sm">
                       <h5 className="font-bold text-white text-sm flex items-center gap-2">
                         <span>📊</span>
                         إحصائية المخزون
                       </h5>
                       <p className="text-xs text-zinc-400 font-light leading-relaxed">
                         يتم إضافة قطع جديدة فور تعميدها من الإدارة العالمية.
                       </p>
                       <div className="pt-4 border-t border-cyber-gold/20">
                         <div className="text-2xl font-black text-cyber-gold">{approvedProducts.length}</div>
                         <div className="text-xs text-zinc-500">منتج متاح الآن</div>
                       </div>
                    </div>
                  </div>
                </aside>

                {/* Products Grid */}
                <div className="flex-1">
                  {approvedProducts.length > 0 ? (
                    <>
                      <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl md:text-3xl font-black text-white">
                          {selectedCategory === 'الكل' ? 'جميع المنتجات' : selectedCategory}
                        </h2>
                        <span className="text-sm text-zinc-500">
                          {approvedProducts.length} منتج
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                        {approvedProducts.map((product, index) => (
                          <div 
                            key={product.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <ProductCard product={product} onClick={setSelectedProduct} />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="py-40 text-center">
                      <div className="max-w-md mx-auto space-y-6">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-bold text-zinc-400">لا توجد منتجات</h3>
                        <p className="text-zinc-600">
                          لا توجد قطع معتمدة في هذا التصنيف حالياً.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'admin' && (
          <div className="pt-32">
             <AdminDashboard 
              products={allProducts} 
              onApprove={handleApprove} 
              onReject={handleReject} 
             />
          </div>
        )}

        {view === 'magazine' && <Blog />}
        {view === 'silk-screen' && <SilkScreenStudio />}
        {view === 'ai-stylist' && <StylistAI />}
        {view === 'checkout' && <Checkout items={cartItems} onComplete={() => setView('account')} />}
        {view === 'account' && <Account onGoToAffiliate={() => setView('affiliate')} />}
      </main>

      {/* Cart */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
      />

      {/* Enhanced Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6 backdrop-blur-3xl animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
           <div 
             className="absolute inset-0 bg-black/95" 
             onClick={() => setSelectedProduct(null)} 
           />
           <div 
             className="relative w-full max-w-7xl h-[90vh] bg-gradient-to-br from-zinc-900 to-black border-2 border-cyber-gold/30 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
             onClick={(e) => e.stopPropagation()}
           >
              {/* Image Section */}
              <div className="w-full lg:w-3/5 bg-black h-[50vh] lg:h-full relative">
                 <img 
                   src={selectedProduct.image} 
                   alt={selectedProduct.name}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>

              {/* Info Section */}
              <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 text-right space-y-8 overflow-y-auto bg-gradient-to-b from-zinc-900 to-black">
                 {/* Category & Badges */}
                 <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-2 bg-cyber-gold/20 text-cyber-gold text-xs font-bold tracking-widest uppercase rounded-full border border-cyber-gold/30">
                      {selectedProduct.category}
                    </span>
                    {selectedProduct.isLimitedEdition && (
                      <span className="px-4 py-2 bg-amber-600/20 text-amber-400 text-xs font-bold tracking-widest uppercase rounded-full border border-amber-600/30">
                        إصدار محدود
                      </span>
                    )}
                 </div>

                 {/* Title */}
                 <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                   {selectedProduct.name}
                 </h2>

                 {/* Description */}
                 {selectedProduct.description && (
                   <p className="text-zinc-400 leading-relaxed">
                     {selectedProduct.description}
                   </p>
                 )}

                 {/* Price */}
                 <div className="py-6 border-y border-white/10">
                   <div className="text-5xl md:text-6xl font-black text-gold-luxe mb-2">
                     {Math.round(selectedProduct.originalPrice * (1 + PROFIT_MARGIN))} ر.س
                   </div>
                   <div className="text-sm text-zinc-600 line-through">
                     القيمة الأصلية: {selectedProduct.originalPrice} ر.س
                   </div>
                 </div>

                 {/* Actions */}
                 <div className="pt-4 flex flex-col gap-4">
                    <button 
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }} 
                      className="btn-gold py-5 text-base tracking-widest font-black hover:scale-105 transition-transform"
                    >
                      إضافة إلى الخزانة
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(null)} 
                      className="text-xs font-black uppercase text-zinc-600 hover:text-white tracking-widest transition-colors py-2"
                    >
                      ← العودة للمعرض
                    </button>
                 </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 left-6 w-12 h-12 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/40 rounded-full flex items-center justify-center transition-all z-10"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
           </div>
        </div>
      )}

      {/* Admin Quick Link */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button 
          onClick={() => setView(view === 'admin' ? 'store' : 'admin')}
          className="bg-black/90 hover:bg-black text-cyber-gold border-2 border-cyber-gold/50 hover:border-cyber-gold p-4 rounded-full hover:scale-110 transition-all shadow-xl shadow-cyber-gold/20"
        >
          <span className="text-[9px] font-black uppercase block">
            {view === 'admin' ? '🚪 خروج' : '⚙️ أدمن'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
