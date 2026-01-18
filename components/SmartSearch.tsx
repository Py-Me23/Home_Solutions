import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Loader2, Search, BrainCircuit } from 'lucide-react';
import { getServiceRecommendation } from '../services/geminiService';
import { ServiceCategory } from '../types';
import { CATEGORIES } from '../constants';

interface SmartSearchProps {
  onCategorySelect: (category: ServiceCategory) => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ onCategorySelect }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ category: string; reasoning: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCategories = CATEGORIES.filter(category =>
    category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const recommendation = await getServiceRecommendation(query);
      setResult(recommendation);
    } catch (error) {
      console.error("AI Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyCategory = () => {
    if (result && result.category !== 'Unknown' && result.category !== 'Other') {
      onCategorySelect(result.category as ServiceCategory);
    }
  };

  return (
    <div className={`w-full transition-all duration-500 z-[100] ${isSticky
        ? 'fixed top-4 left-1/2 -translate-x-1/2 max-w-2xl px-4'
        : 'max-w-3xl mx-auto'
      }`}>
      <div className={`glass rounded-3xl p-1.5 shadow-2xl transition-all duration-500 overflow-hidden ${isSticky ? 'bg-white/70 dark:bg-slate-900/70 border-indigo-500/30' : ''
        }`}>
        <div className={`rounded-[1.4rem] transition-all duration-500 ${isSticky
            ? 'p-2'
            : 'bg-white dark:bg-slate-900 p-6 md:p-8'
          }`}>
          {!isSticky && (
            <div className="flex items-center space-x-2 mb-6 animate-fade-in-up">
              <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-1.5 rounded-full shadow-lg shadow-indigo-500/20">
                <BrainCircuit className="text-white w-4 h-4" />
              </div>
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 tracking-wider uppercase text-[10px]">Neural Search Engine</h3>
            </div>
          )}

          {!isSticky && (
            <>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">How can we assist you?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm font-medium opacity-80">
                Describe your project or issue—our agent will pinpoint the ideal expert for you.
              </p>
            </>
          )}

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className={`relative flex items-center gap-2 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 ${isSticky ? 'p-1' : 'p-2'}`}>
              <div className="flex-1 flex items-center px-4">
                <Search className={`text-slate-400 transition-all ${isSticky ? 'w-4 h-4' : 'w-5 h-5'} mr-3`} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                      setShowDropdown(false);
                    }
                  }}
                  placeholder={isSticky ? "Quick find..." : "e.g., 'I have a burst pipe in the basement'"}
                  className={`w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400/70 focus:outline-none font-medium ${isSticky ? 'py-1.5 text-sm' : 'py-3 text-lg'}`}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isLoading || !query}
                className={`bg-slate-900 dark:bg-indigo-600 text-white rounded-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/10 disabled:opacity-50 flex items-center justify-center ${isSticky ? 'px-4 py-2 text-xs' : 'px-8 py-3.5'
                  }`}
              >
                {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : isSticky ? <ArrowRight className="w-4 h-4" /> : 'Optimize Search'}
              </button>
            </div>

            {showDropdown && filteredCategories.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 glass rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden z-[110] max-h-60 overflow-y-auto">
                <div className="p-2">
                  <p className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Taxonomy</p>
                  {filteredCategories.map((category) => (
                    <button
                      key={category}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setQuery(category);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-indigo-600/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center group font-medium"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 mr-3 group-hover:bg-indigo-500 transition-colors"></div>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {result && !isSticky && (
            <div className="mt-8 bg-indigo-500/5 dark:bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20 animate-fade-in-up">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-tighter mb-3">
                    AI Intent Detection
                  </div>
                  <h4 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                    Connect with {result.category} Pros
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    {result.reasoning}
                  </p>
                </div>
                <button
                  onClick={applyCategory}
                  className="whitespace-nowrap px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/20 transition-all text-sm group flex items-center justify-center"
                >
                  Proceed to Experts <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};