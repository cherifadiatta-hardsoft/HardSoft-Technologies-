import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { AlertCircle, CheckCircle2, Info, Search, RefreshCw, X } from 'lucide-react';

interface SeoResult {
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
}

export default function SeoAnalyzer() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SeoResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { language } = useLanguage();
  const isFr = language === 'fr';

  const analyzeSeo = () => {
    setIsAnalyzing(true);
    setResults([]);
    
    setTimeout(() => {
      const newResults: SeoResult[] = [];
      
      // 1. Title
      const title = document.title;
      if (!title || title.length === 0) {
        newResults.push({ type: 'error', title: 'Title Tag', message: 'Title tag is missing or empty.' });
      } else if (title.length < 30 || title.length > 60) {
        newResults.push({ type: 'warning', title: 'Title Length', message: `Title length is ${title.length} characters. Optimal is between 30 and 60.` });
      } else {
        newResults.push({ type: 'success', title: 'Title Tag', message: 'Title tag is present and has an optimal length.' });
      }

      // 2. Meta Description
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      if (!metaDesc || metaDesc.length === 0) {
        newResults.push({ type: 'error', title: 'Meta Description', message: 'Meta description is missing.' });
      } else if (metaDesc.length < 120 || metaDesc.length > 160) {
        newResults.push({ type: 'warning', title: 'Meta Description Length', message: `Meta description length is ${metaDesc.length} characters. Optimal is between 120 and 160.` });
      } else {
        newResults.push({ type: 'success', title: 'Meta Description', message: 'Meta description is present and optimal.' });
      }

      // 3. H1 Tag
      const h1s = document.querySelectorAll('h1');
      if (h1s.length === 0) {
        newResults.push({ type: 'error', title: 'H1 Tag', message: 'No H1 tag found on the page.' });
      } else if (h1s.length > 1) {
        newResults.push({ type: 'warning', title: 'H1 Tag', message: `Found ${h1s.length} H1 tags. It is recommended to have exactly one H1 tag per page.` });
      } else {
        newResults.push({ type: 'success', title: 'H1 Tag', message: 'Exactly one H1 tag found.' });
      }

      // 4. Image Alt attributes
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt') || img.getAttribute('alt') === '');
      if (imagesWithoutAlt.length > 0) {
        newResults.push({ type: 'error', title: 'Image Alt Attributes', message: `Found ${imagesWithoutAlt.length} images without an alt attribute.` });
      } else if (images.length > 0) {
        newResults.push({ type: 'success', title: 'Image Alt Attributes', message: 'All images have alt attributes.' });
      }

      // 5. Links
      const links = document.querySelectorAll('a');
      const linksWithoutHref = Array.from(links).filter(link => !link.hasAttribute('href') || link.getAttribute('href') === '');
      if (linksWithoutHref.length > 0) {
        newResults.push({ type: 'warning', title: 'Broken Links', message: `Found ${linksWithoutHref.length} links without a valid href attribute.` });
      }

      setResults(newResults);
      setIsAnalyzing(false);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => { setIsOpen(true); analyzeSeo(); }}
        className="fixed bottom-24 right-6 bg-slate-900 text-white p-3 rounded-full shadow-xl hover:bg-slate-800 transition-colors z-50 flex items-center justify-center gap-2 group border border-slate-700"
        title={isFr ? "Analyseur SEO (Admin)" : "SEO Analyzer (Admin)"}
      >
        <Search size={20} />
        <span className="text-xs font-bold uppercase hidden group-hover:block px-1">SEO</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col overflow-hidden max-h-[80vh]">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Search size={18} className="text-indigo-500" />
          {isFr ? "Analyse SEO de la page" : "Page SEO Analysis"}
        </h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={analyzeSeo}
            disabled={isAnalyzing}
            className={`p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors ${isAnalyzing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1 bg-slate-50/50 dark:bg-slate-900/50">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <RefreshCw size={32} className="animate-spin mb-4 text-indigo-500" />
            <p className="text-sm font-medium">{isFr ? "Analyse en cours..." : "Analyzing page structure..."}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-xl border ${
                  result.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200' :
                  result.type === 'error' ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50 text-red-900 dark:text-red-200' :
                  'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    {result.type === 'success' && <CheckCircle2 size={16} className="text-emerald-500" />}
                    {result.type === 'error' && <AlertCircle size={16} className="text-red-500" />}
                    {result.type === 'warning' && <Info size={16} className="text-amber-500" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{result.title}</h4>
                    <p className="text-xs opacity-90 leading-relaxed">{result.message}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {results.length === 0 && !isAnalyzing && (
              <p className="text-center text-sm text-slate-500 py-4">
                {isFr ? "Aucun résultat." : "No results found."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
