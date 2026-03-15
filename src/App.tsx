import React from 'react';
import { FileText, Download, Sparkles, Loader2, PlayCircle, BookOpen, Share2, History, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { generateMockContent, formatContentToString, DocumentaryContent } from './utils/contentGenerator';
import { exportToPDF, exportToDoc } from './utils/exporters';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import './App.css';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/1542db03-26ca-4a70-a51f-ed1375040ffd/docuflow-app-logo-97e372e5-1773542563175.webp";
const HERO_BG = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/1542db03-26ca-4a70-a51f-ed1375040ffd/hero-background-5d0cc873-1773542563530.webp";

export default function App() {
  const [topic, setTopic] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [result, setResult] = React.useState<DocumentaryContent | null>(null);
  const [activeTab, setActiveTab] = React.useState<'script' | 'preview'>('script');
  const [history, setHistory] = React.useState<string[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error('Please enter a topic first');
      return;
    }

    setIsGenerating(true);
    setResult(null);
    try {
      const content = await generateMockContent(topic);
      setResult(content);
      if (!history.includes(topic)) {
        setHistory(prev => [topic, ...prev].slice(0, 5));
      }
      toast.success('Documentary content generated!');
    } catch (error) {
      toast.error('Failed to generate content.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const contentStr = formatContentToString(result);
    exportToPDF(result.title, contentStr);
    toast.success('PDF exported successfully');
  };

  const handleDownloadDoc = () => {
    if (!result) return;
    const contentStr = formatContentToString(result);
    exportToDoc(result.title, contentStr);
    toast.success('Document exported');
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(formatContentToString(result));
    toast.success('Copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 selection:bg-indigo-500/30 font-sans">
      <Toaster position="bottom-right" theme="dark" />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <img 
          src={HERO_BG} 
          alt="background" 
          className="w-full h-full object-cover scale-110 blur-3xl opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b] via-transparent to-[#0a0a0b]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 lg:py-12">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center overflow-hidden">
              <img src={LOGO_URL} alt="DocuFlow Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight">DocuFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Generator</a>
            <a href="#" className="hover:text-white transition-colors">Templates</a>
            <a href="#" className="hover:text-white transition-colors">Archive</a>
            <button className="px-5 py-2 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-semibold">
              Pro Version
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Advanced Scripting AI
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent"
            >
              Tell your story <br /> with precision.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 text-lg max-w-xl mx-auto leading-relaxed"
            >
              Input any topic and watch our AI engineer a structured documentary script, visual directions, and a polished PDF report in seconds.
            </motion.p>
          </header>

          {/* Generator Input */}
          <section className="mb-12">
            <motion.form 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleGenerate} 
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex flex-col md:flex-row gap-3 p-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl backdrop-blur-xl">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Sparkles className="w-5 h-5 text-zinc-600" />
                  </div>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a documentary topic..."
                    className="w-full h-14 pl-12 pr-4 bg-transparent outline-none text-lg placeholder:text-zinc-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="h-14 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 font-bold transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create DocuFlow
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
            
            {/* History Tags */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {history.map((h, i) => (
                <button 
                  key={i}
                  onClick={() => setTopic(h)}
                  className="px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-500 hover:text-white hover:border-zinc-600 transition-all flex items-center gap-1.5"
                >
                  <History className="w-3 h-3" />
                  {h}
                </button>
              ))}
            </div>
          </section>

          {/* Results Display */}
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-16 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
                <div className="relative flex flex-col items-center gap-6">
                  <div className="w-20 h-20 relative">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <PlayCircle className="w-10 h-10 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">Composing Masterpiece</h3>
                    <p className="text-zinc-500 max-w-sm">Gathering insights and structuring narrative chapters for {topic}...</p>
                  </div>
                </div>
              </motion.div>
            )}

            {result && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Control Panel */}
                <div className="sticky top-6 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-2xl">
                  <div className="flex p-1.5 bg-black/40 rounded-xl border border-zinc-800/50">
                    <button
                      onClick={() => setActiveTab('script')}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all",
                        activeTab === 'script' ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      <PlayCircle className="w-4 h-4" />
                      SCRIPT
                    </button>
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all",
                        activeTab === 'preview' ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      <BookOpen className="w-4 h-4" />
                      READER
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-300 border border-zinc-700/50"
                      title="Copy Script"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDownloadDoc}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-bold border border-zinc-700/50"
                    >
                      <FileText className="w-4 h-4" />
                      TXT
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all text-sm font-bold shadow-lg shadow-indigo-600/20 active:scale-95"
                    >
                      <Download className="w-4 h-4" />
                      EXPORT PDF
                    </button>
                  </div>
                </div>

                {/* Main Content Paper */}
                <div className="rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800/50 overflow-hidden shadow-2xl">
                  <div className="p-8 lg:p-16">
                    {activeTab === 'script' ? (
                      <div className="max-w-3xl mx-auto space-y-16">
                        <header className="space-y-4 border-b border-zinc-800 pb-12">
                          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.2em]">
                             <div className="w-8 h-[1px] bg-indigo-500" />
                             Title Treatment
                          </div>
                          <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter leading-none">{result.title.toUpperCase()}</h2>
                        </header>

                        <div className="space-y-16">
                           <div className="space-y-6">
                              <span className="inline-block px-3 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-black tracking-widest uppercase">Opening Hook</span>
                              <p className="text-3xl font-medium leading-tight text-zinc-100 italic font-serif">
                                "{result.hook}"
                              </p>
                           </div>

                           <div className="space-y-6">
                              <span className="inline-block px-3 py-1 rounded bg-zinc-800 text-zinc-500 text-[10px] font-black tracking-widest uppercase">Act I: Intro</span>
                              <p className="text-xl leading-relaxed text-zinc-400">
                                {result.introduction}
                              </p>
                           </div>

                           {result.chapters.map((chapter, i) => (
                             <div key={i} className="pt-16 border-t border-zinc-800/50 group">
                                <div className="flex items-center gap-4 mb-8">
                                  <span className="text-6xl font-black text-zinc-800 group-hover:text-indigo-900/30 transition-colors">0{i+1}</span>
                                  <div>
                                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Chapter Segment</span>
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{chapter.title}</h3>
                                  </div>
                                </div>
                                
                                <div className="space-y-8">
                                  <div className="relative pl-8 border-l-2 border-indigo-500/30 py-2">
                                     <span className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-indigo-500" />
                                     <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 block">Narrator (V.O.)</span>
                                     <p className="text-xl leading-relaxed text-zinc-200">
                                       {chapter.content}
                                     </p>
                                  </div>

                                  {chapter.visuals && (
                                    <div className="ml-8 p-6 rounded-2xl bg-black/40 border border-zinc-800/50 flex gap-5 items-start">
                                      <div className="shrink-0 p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                                        <PlayCircle className="w-5 h-5" />
                                      </div>
                                      <div>
                                        <span className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 block">Cinematic Direction</span>
                                        <p className="text-sm text-zinc-400 italic font-medium leading-relaxed">
                                          {chapter.visuals}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                             </div>
                           ))}

                           <div className="pt-16 border-t border-zinc-800 space-y-6">
                              <span className="inline-block px-3 py-1 rounded bg-zinc-800 text-zinc-500 text-[10px] font-black tracking-widest uppercase">Closing Sequence</span>
                              <p className="text-xl leading-relaxed text-zinc-400 font-medium">
                                {result.conclusion}
                              </p>
                              <div className="flex justify-center pt-8">
                                <div className="px-6 py-2 rounded-full border border-zinc-800 text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase">
                                  End of Script
                                </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    ) : (
                      <article className="max-w-3xl mx-auto">
                        <header className="mb-16">
                           <h1 className="text-5xl font-black mb-6 tracking-tight">{result.title}</h1>
                           <div className="w-20 h-1.5 bg-indigo-500 mb-8" />
                           <p className="text-2xl text-zinc-400 leading-relaxed font-light">
                             {result.introduction}
                           </p>
                        </header>
                        
                        <div className="space-y-16">
                          {result.chapters.map((chapter, i) => (
                            <section key={i} className="space-y-6">
                              <h2 className="text-2xl font-bold flex items-center gap-4">
                                <span className="text-indigo-500">0{i+1}.</span>
                                {chapter.title}
                              </h2>
                              <p className="text-lg text-zinc-300 leading-relaxed">
                                {chapter.content}
                              </p>
                            </section>
                          ))}

                          <footer className="pt-16 border-t border-zinc-800">
                             <div className="p-10 rounded-3xl bg-indigo-600/5 border border-indigo-500/10">
                               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                 <Check className="w-5 h-5 text-indigo-400" />
                                 Final Summary
                               </h3>
                               <p className="text-zinc-400 leading-relaxed">
                                 {result.conclusion}
                               </p>
                             </div>
                          </footer>
                        </div>
                      </article>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Grid */}
        {!result && !isGenerating && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-12"
          >
            {[
              { 
                icon: Sparkles, 
                title: "Contextual AI", 
                desc: "Goes beyond keywords to understand the core narrative arc of your chosen topic.",
                color: "indigo"
              },
              { 
                icon: FileText, 
                title: "Ready-to-Print", 
                desc: "High-density PDF exports with professional layouts suitable for pitch decks.",
                color: "purple"
              },
              { 
                icon: PlayCircle, 
                title: "Director's Cut", 
                desc: "Automated visual cues and scene descriptions to guide your filming process.",
                color: "pink"
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-zinc-900/20 border border-zinc-800/50 hover:bg-zinc-900/40 hover:border-zinc-700/50 transition-all duration-500">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500",
                  item.color === 'indigo' ? "bg-indigo-500/10 text-indigo-500" :
                  item.color === 'purple' ? "bg-purple-500/10 text-purple-500" :
                  "bg-pink-500/10 text-pink-500"
                )}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <footer className="relative z-10 py-12 mt-20 border-t border-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="w-6 h-6 rounded bg-zinc-800" />
            <span className="font-bold text-sm tracking-tighter">DocuFlow AI</span>
          </div>
          <p className="text-zinc-600 text-sm">
            Powered by Generative Intelligence. For creative professionals.
          </p>
          <div className="flex gap-6 text-zinc-600 text-sm">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}