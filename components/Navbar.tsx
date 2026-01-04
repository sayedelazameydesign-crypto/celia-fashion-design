
import React, { useState, useEffect } from 'react';
import { View } from '../types.ts';

interface NavbarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {id: 'store', label: 'المتجر', icon: '🛍️'},
    {id: 'magazine', label: 'المجلة', icon: '📖'},
    {id: 'silk-screen', label: 'الاستوديو', icon: '🎨'},
    {id: 'ai-stylist', label: 'المنسق الذكي', icon: '🤖'}
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
      scrolled 
        ? 'bg-cyber-black/98 border-b border-cyber-gold/20 backdrop-blur-2xl shadow-xl shadow-black/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1600px] mx-auto h-20 md:h-24 px-4 md:px-8 flex items-center justify-between">
        
        {/* Cart/Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={onOpenCart}
            className="group relative flex items-center gap-2 md:gap-3 p-2.5 md:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-gold/50 rounded-xl md:rounded-2xl transition-all duration-300"
          >
            <div className="relative">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-cyber-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeWidth="2" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyber-gold text-black text-[10px] w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-black rounded-full animate-pulse shadow-lg shadow-cyber-gold/50">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white hidden md:block transition-colors">الخزانة</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 bg-white/5 border border-white/10 rounded-xl hover:border-cyber-gold/50 transition-all"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Center - Links (Desktop) */}
        <nav className="hidden md:flex gap-8 lg:gap-12">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`text-xs font-bold tracking-widest transition-all duration-300 relative group ${
                currentView === item.id 
                  ? 'text-cyber-gold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </span>
              <div className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-cyber-gold to-cyber-acid transition-all duration-300 ${
                currentView === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></div>
            </button>
          ))}
        </nav>

        {/* Brand */}
        <div 
          onClick={() => onViewChange('store')} 
          className="cursor-pointer text-right group"
        >
          <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white group-hover:text-cyber-gold transition-colors duration-300">
            Celia <span className="text-gold-luxe">Fashion</span>
          </h1>
          <p className="text-[6px] md:text-[7px] text-zinc-600 group-hover:text-zinc-400 tracking-[0.8em] md:tracking-[1em] uppercase transition-colors">
            Design Excellence
          </p>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-cyber-black/98 backdrop-blur-2xl">
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id as View);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 p-4 rounded-xl text-right transition-all ${
                  currentView === item.id
                    ? 'bg-cyber-gold/20 text-cyber-gold border border-cyber-gold/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-bold">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
