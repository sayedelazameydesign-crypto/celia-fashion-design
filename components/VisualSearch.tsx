
import React, { useRef, useState } from 'react';
import { searchByImage } from '../services/gemini';

interface VisualSearchProps {
  onResults: (keywords: string[]) => void;
}

const VisualSearch: React.FC<VisualSearchProps> = ({ onResults }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result;
      if (typeof result === 'string') {
        const base64 = result.split(',')[1];
        const keywords = await searchByImage(base64);
        if (keywords) onResults(keywords);
      }
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={isAnalyzing}
        className="text-zinc-400 hover:text-black dark:hover:text-white transition-all flex items-center gap-3"
      >
        <span className="text-[8px] font-bold uppercase tracking-widest">{isAnalyzing ? 'يتم التحليل..' : 'عدسة سيليا'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        </svg>
      </button>
    </div>
  );
};

export default VisualSearch;
