import React, { useState, useEffect } from 'react';
import { Topic } from '../data/topics';
import { evaluateEssay, EvaluationResult } from '../services/ai';
import { Loader2, Send, CheckCircle2, AlertCircle, TrendingUp, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';

interface PracticeInterfaceProps {
  topic: Topic;
  onBack: () => void;
  onEvaluate: (essay: string, result: EvaluationResult) => void;
}

export function PracticeInterface({ topic, onBack, onEvaluate }: PracticeInterfaceProps) {
  const [essay, setEssay] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const initialTime = topic.type === 'Task 1' ? 20 * 60 : 40 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isStrictMode, setIsStrictMode] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem(`draft-${topic.id}`);
    if (draft) {
      setEssay(draft);
    }
  }, [topic.id]);

  // Auto-save every 10 seconds if essay changed
  useEffect(() => {
    if (!essay.trim()) return;
    const interval = setInterval(() => {
      localStorage.setItem(`draft-${topic.id}`, essay);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, [essay, topic.id]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return { m: m.toString().padStart(2, '0'), s: s.toString().padStart(2, '0') };
  };

  const time = formatTime(timeLeft);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const charCount = essay.length;
  const paragraphCount = essay.trim() ? essay.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
  const minWords = topic.type === 'Task 1' ? 150 : 250;
  const progressPercentage = Math.min(100, (wordCount / minWords) * 100);

  const handleEvaluate = async () => {
    if (wordCount < 50) {
      setError('Please write at least 50 words before evaluating.');
      return;
    }
    setIsTimerRunning(false);
    setIsEvaluating(true);
    setError(null);
    try {
      const result = await evaluateEssay(topic.prompt, essay, topic.type);
      onEvaluate(essay, result);
    } catch (err) {
      setError('Failed to evaluate essay. Please try again.');
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem(`draft-${topic.id}`, essay);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (isStrictMode) {
      e.preventDefault();
      setError('Pasting is disabled in Strict Exam Mode.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('essay-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = essay.substring(start, end);
    const newText = essay.substring(0, start) + prefix + selectedText + suffix + essay.substring(end);
    
    setEssay(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f6f6f8] text-slate-900 font-sans">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-slate-500 hover:text-[#1152d4] transition-colors flex items-center">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-[#1152d4]">
            <span className="material-symbols-outlined text-3xl">school</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">IELTS Exam Portal</h2>
          <span className="ml-2 px-2 py-0.5 rounded bg-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">Practice Mode</span>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Strict Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Strict Mode</span>
            <button 
              onClick={() => setIsStrictMode(!isStrictMode)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isStrictMode ? 'bg-red-500' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isStrictMode ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
            <span className="material-symbols-outlined text-[#1152d4] text-xl">timer</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-mono font-bold text-slate-900">{time.m}</span>
              <span className="text-xs font-medium text-slate-500 uppercase">min</span>
              <span className="text-xl font-mono font-bold text-slate-900 ml-1">{time.s}</span>
              <span className="text-xs font-medium text-slate-500 uppercase">sec</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={handleSaveDraft} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-300 transition-colors">
              Save Draft
            </button>
            <button onClick={onBack} className="px-6 py-2 bg-[#1152d4] text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
              Finish Session
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden h-[calc(100vh-65px)]">
        {/* Left Column: Prompt */}
        <section className="w-1/2 border-r border-slate-200 overflow-y-auto custom-scrollbar bg-white">
          <div className="p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <span className="text-[#1152d4] text-sm font-bold uppercase tracking-widest">Academic Writing</span>
              <h1 className="text-3xl font-bold mt-1 text-slate-900">{topic.type}</h1>
              <div className="flex items-center gap-4 mt-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {topic.type === 'Task 1' ? '20' : '40'} Minutes</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">edit_note</span> {minWords} Words Minimum</span>
              </div>
            </div>
            
            <div className="prose prose-slate max-w-none">
              <div className="bg-blue-50 border-l-4 border-[#1152d4] p-6 rounded-r-lg mb-8">
                <p className="text-lg leading-relaxed font-medium text-slate-800 italic">
                  "{topic.prompt}"
                </p>
              </div>
              
              {topic.imageUrl && (
                <div className="mb-8">
                  <img src={topic.imageUrl} alt="Task Visual" className="w-full h-auto rounded-lg shadow-sm border border-slate-200" />
                </div>
              )}
              
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                <p>Write at least {minWords} words.</p>
              </div>
              
              {topic.tips && topic.tips.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Prompt Analysis & Tips</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {topic.tips.map((tip, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-xs font-bold text-[#1152d4] block mb-1">Tip {idx + 1}</span>
                        <p className="text-sm text-slate-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Editor */}
        <section className="w-1/2 flex flex-col bg-[#f6f6f8]">
          <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
            <div className="flex items-center gap-2">
              <button onClick={() => insertFormatting('**', '**')} className="p-2 hover:bg-slate-100 rounded transition-colors" title="Bold"><span className="material-symbols-outlined text-xl">format_bold</span></button>
              <button onClick={() => insertFormatting('*', '*')} className="p-2 hover:bg-slate-100 rounded transition-colors" title="Italic"><span className="material-symbols-outlined text-xl">format_italic</span></button>
              <button onClick={() => insertFormatting('__', '__')} className="p-2 hover:bg-slate-100 rounded transition-colors" title="Underline"><span className="material-symbols-outlined text-xl">format_underlined</span></button>
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              <button onClick={() => insertFormatting('\n- ', '')} className="p-2 hover:bg-slate-100 rounded transition-colors" title="List"><span className="material-symbols-outlined text-xl">format_list_bulleted</span></button>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm font-medium">
                <span className="text-slate-400">Word Count:</span>
                <span className={`font-bold ml-1 ${wordCount >= minWords ? 'text-[#1152d4]' : 'text-amber-600'}`}>{wordCount}</span>
                <span className="text-slate-400 ml-1">/ {minWords}</span>
              </div>
              <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#1152d4] transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-8 overflow-hidden flex flex-col">
            <div className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <textarea 
                id="essay-editor"
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                onPaste={handlePaste}
                spellCheck={!isStrictMode}
                className="flex-1 w-full p-8 text-lg text-slate-800 bg-transparent border-none focus:ring-0 resize-none font-sans leading-relaxed overflow-y-auto" 
                placeholder="Start typing your essay here..."
                disabled={isEvaluating}
              />
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span>Characters: {charCount}</span>
                  <span>Paragraphs: {paragraphCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  {isSaved && (
                    <>
                      <span className="material-symbols-outlined text-xs text-green-500">cloud_done</span>
                      <span className="text-green-600">Saved to draft</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-8 pb-8 flex justify-between items-center">
            <div>
              {error && (
                <span className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {error}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveDraft} className="flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-white transition-all">
                <span className="material-symbols-outlined">save</span>
                Save Draft
              </button>
              <button 
                onClick={handleEvaluate}
                disabled={isEvaluating || !essay.trim()}
                className="flex items-center gap-2 px-8 py-3 bg-[#1152d4] text-white rounded-lg font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    Submit Essay
                    <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 px-6 py-2 flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-bold">
        <div className="flex gap-4">
          <span>Candidate ID: IELTS-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</span>
          <span>Session Key: {Math.random().toString(36).substring(2, 6).toUpperCase()}-{Math.random().toString(36).substring(2, 6).toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          System Status: Secure & Synchronized
        </div>
      </footer>
    </div>
  );
}
