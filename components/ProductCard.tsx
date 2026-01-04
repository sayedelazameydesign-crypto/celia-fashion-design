
import React, { useState } from 'react';
import { Product } from '../types.ts';
import { PROFIT_MARGIN } from '../constants.tsx';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const finalPrice = Math.round(product.originalPrice * (1 + PROFIT_MARGIN));

  return (
    <div 
      className="group relative cursor-pointer bg-gradient-to-br from-zinc-900/60 to-zinc-900/40 border border-white/5 hover:border-cyber-gold/50 transition-all duration-500 rounded-[2.5rem] overflow-hidden p-1 hover:shadow-2xl hover:shadow-cyber-gold/10"
      onClick={() => onClick(product)}
    >
      {/* Limited Edition Badge */}
      {product.isLimitedEdition && (
        <div className="absolute top-6 left-6 z-30 animate-pulse">
          <div className="px-4 py-2 bg-gradient-to-r from-cyber-gold to-amber-600 border-2 border-cyber-gold/50 rounded-full flex items-center gap-2 shadow-lg shadow-cyber-gold/50">
             <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
             <span className="text-[9px] font-black text-black uppercase tracking-widest">إصدار محدود</span>
          </div>
        </div>
      )}

      {/* Rarity Badge */}
      {product.rarity && product.rarity !== 'Common' && (
        <div className={`absolute top-6 right-6 z-30 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
          product.rarity === 'Legendary' ? 'bg-purple-600/80 text-white' :
          product.rarity === 'Epic' ? 'bg-pink-600/80 text-white' :
          'bg-blue-600/80 text-white'
        }`}>
          {product.rarity}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-zinc-900 to-black">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 animate-pulse"></div>
        )}
        <img 
          src={product.image} 
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110 group-hover:brightness-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
          <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <span className="text-sm font-bold text-white">عرض التفاصيل</span>
          </div>
        </div>
        
        {/* Rating Stars */}
        <div className="absolute bottom-4 right-4 flex gap-1 backdrop-blur-sm bg-black/30 rounded-full px-2 py-1">
           {[...Array(5)].map((_, i) => (
             <svg key={i} className={`w-3 h-3 ${i < (product.rating || 4) ? 'text-cyber-gold fill-cyber-gold' : 'text-zinc-700'}`} viewBox="0 0 24 24">
               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
             </svg>
           ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-5 px-5 pb-5 space-y-4">
        {/* Category & Tags */}
        <div className="flex justify-between items-center flex-wrap gap-2">
           <span className="text-[9px] font-bold text-cyber-gold uppercase tracking-widest bg-cyber-gold/10 px-3 py-1 rounded-full">
             {product.category}
           </span>
           {product.silkScreenAvailable && (
             <span className="text-[8px] text-cyber-cyan border border-cyber-cyan/40 px-2 py-1 rounded-full font-bold bg-cyber-cyan/10">
               Silk Screen
             </span>
           )}
        </div>

        {/* Product Name */}
        <h3 className="text-lg md:text-xl font-black text-white group-hover:text-cyber-gold transition-colors duration-300 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
           <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-600 line-through">القيمة الأصلية: {product.originalPrice} ر.س</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-black text-gold-luxe">{finalPrice}</span>
                <span className="text-sm text-zinc-500">ر.س</span>
              </div>
           </div>
           <button 
             className="w-12 h-12 rounded-full border-2 border-white/10 hover:border-cyber-gold hover:bg-cyber-gold/10 flex items-center justify-center transition-all duration-300 group/btn"
             onClick={(e) => {
               e.stopPropagation();
               onClick(product);
             }}
           >
              <svg className="w-5 h-5 text-zinc-400 group-hover/btn:text-cyber-gold group-hover/btn:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/>
              </svg>
           </button>
        </div>

        {/* Style Points */}
        {product.stylePoints && (
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <span>⚡</span>
            <span className="font-bold text-cyber-acid">+{product.stylePoints.toLocaleString()} Style Points</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
