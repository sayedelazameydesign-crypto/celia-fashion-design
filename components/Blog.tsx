
import React from 'react';
import { MOCK_BLOGS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-40" dir="rtl">
      <div className="text-center mb-32 space-y-6">
        <h2 className="text-7xl font-black text-white italic tracking-tighter">THE MAGAZINE</h2>
        <div className="h-px w-40 bg-cyber-gold mx-auto opacity-30"></div>
        <p className="text-zinc-500 font-light tracking-[0.2em] text-xs uppercase">سرديات الموضة والذكاء الاصطناعي</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        {MOCK_BLOGS.map((post, idx) => (
          <article key={post.id} className="magazine-card group cursor-pointer space-y-10">
            <div className="relative overflow-hidden aspect-[16/10] bg-zinc-900 border border-white/5">
              <img src={post.image} className="magazine-img w-full h-full object-cover" alt={post.title} />
              <div className="absolute top-10 left-10 text-[9px] font-bold text-white/40 tracking-widest bg-black/40 backdrop-blur-md px-6 py-2 border border-white/10">
                 ISSUE NO. {2026 - idx}
              </div>
            </div>
            
            <div className="space-y-6 text-right">
              <div className="flex items-center justify-end gap-6 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                <span>بواسطة: {post.author}</span>
                <span className="w-1 h-1 bg-cyber-gold rounded-full"></span>
                <span>{post.readTime} قراءة</span>
              </div>
              <h3 className="text-4xl font-bold text-white group-hover:text-cyber-gold transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-xl mr-auto">
                {post.excerpt}
              </p>
              <div className="pt-8">
                 <button className="text-[10px] font-black uppercase text-cyber-gold tracking-widest border-b border-cyber-gold/20 pb-2 hover:border-cyber-gold transition-all">
                    اقرأ المقال الكامل
                 </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
