import React, { useState } from 'react';
import { Bell, ArrowLeft, RotateCcw, CheckCircle2, AlertCircle, Info, Target, Printer, BookOpen } from 'lucide-react';
import { EvaluationResult } from '../services/ai';

interface EvaluationViewProps {
  essay: string;
  result: EvaluationResult;
  onBack: () => void;
  onTryAgain: () => void;
}

export function EvaluationView({ essay, result, onBack, onTryAgain }: EvaluationViewProps) {
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  
  // Simple word count
  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  // Function to highlight text based on AI highlights
  const renderHighlightedEssay = () => {
    if (!result.highlights || result.highlights.length === 0) {
      return <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{essay}</p>;
    }

    let highlightedText = essay;
    const sortedHighlights = [...result.highlights].sort((a, b) => b.originalText.length - a.originalText.length);

    // This is a naive highlighting approach. In a real app, you'd use a more robust text parsing library
    // to avoid replacing parts of HTML tags or overlapping matches.
    let elements: React.ReactNode[] = [];
    let currentIndex = 0;

    // A more robust approach: find all matches and their indices
    const matches: { start: number, end: number, highlight: any }[] = [];
    
    sortedHighlights.forEach(hl => {
      let startIndex = 0;
      while ((startIndex = essay.indexOf(hl.originalText, startIndex)) > -1) {
        // Check for overlap
        const isOverlapping = matches.some(m => 
          (startIndex >= m.start && startIndex < m.end) || 
          (startIndex + hl.originalText.length > m.start && startIndex + hl.originalText.length <= m.end)
        );
        
        if (!isOverlapping) {
          matches.push({
            start: startIndex,
            end: startIndex + hl.originalText.length,
            highlight: hl
          });
        }
        startIndex += hl.originalText.length;
      }
    });

    matches.sort((a, b) => a.start - b.start);

    if (matches.length === 0) {
      return <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{essay}</p>;
    }

    matches.forEach((match, idx) => {
      // Add text before the match
      if (match.start > currentIndex) {
        elements.push(<span key={`text-${idx}`}>{essay.substring(currentIndex, match.start)}</span>);
      }

      // Add the highlighted match
      const colorClass = 
        match.highlight.type === 'error' ? 'bg-red-100 border-b-2 border-red-500 text-red-900' :
        match.highlight.type === 'warning' ? 'bg-amber-100 border-b-2 border-amber-500 text-amber-900' :
        'bg-blue-100 border-b-2 border-[#1152d4] text-blue-900';

      elements.push(
        <span 
          key={`hl-${idx}`} 
          className={`relative group cursor-help ${colorClass} px-1 rounded-sm transition-colors`}
        >
          {essay.substring(match.start, match.end)}
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-900 text-white text-xs p-2 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
            <span className="font-bold block mb-1 capitalize">{match.highlight.type}</span>
            {match.highlight.suggestion}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
          </div>
        </span>
      );

      currentIndex = match.end;
    });

    // Add remaining text
    if (currentIndex < essay.length) {
      elements.push(<span key="text-end">{essay.substring(currentIndex)}</span>);
    }

    return <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">{elements}</div>;
  };

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="text-[#1152d4]">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900">IELTS Master</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="relative text-slate-500 hover:text-slate-700">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#1152d4] font-bold text-xs border border-blue-200">
            JD
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Page Title & Actions */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Essay Analysis & Band Score</h1>
            <p className="text-slate-500">Detailed evaluation based on official IELTS assessment criteria</p>
          </div>
          <div className="flex gap-4 no-print">
            <button 
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
              title="Download PDF / Print"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
            <button 
              onClick={onBack}
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={onTryAgain}
              className="px-6 py-2.5 bg-[#1152d4] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
            >
              Try Again
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column (Essay & Improvements) */}
          <div className="col-span-2 space-y-6">
            {/* Essay Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print-break-inside-avoid">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1152d4] text-xl">edit_document</span>
                  Submitted Essay
                </h3>
                <span className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{wordCount} Words</span>
              </div>
              <div className="p-8">
                {renderHighlightedEssay()}
              </div>
            </div>

            {/* Model Answer Toggle */}
            {result.modelAnswer && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print-break-inside-avoid">
                <button 
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-slate-50/50 hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    Band 9.0 Model Answer
                  </h3>
                  <span className="text-sm font-bold text-[#1152d4] no-print">
                    {showModelAnswer ? 'Hide' : 'Show'}
                  </span>
                </button>
                {(showModelAnswer || window.matchMedia('print').matches) && (
                  <div className="p-8 border-t border-slate-100 bg-emerald-50/30">
                    <p className="text-slate-800 leading-relaxed whitespace-pre-wrap text-lg font-serif">
                      {result.modelAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Improvements */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print-break-inside-avoid">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1152d4] text-xl">lightbulb</span>
                  Key Improvements
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {result.keyImprovements.map((improvement, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Scores & Summary) */}
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="bg-[#1152d4] rounded-2xl shadow-lg shadow-blue-500/30 p-8 text-white relative overflow-hidden print-break-inside-avoid print-bg-blue">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                <span className="material-symbols-outlined text-9xl">bar_chart</span>
              </div>
              
              <h3 className="text-blue-100 font-bold uppercase tracking-widest text-xs mb-6 text-center">Estimated Band Score</h3>
              
              <div className="flex flex-col items-center justify-center mb-6">
                <span className="text-8xl font-black leading-none tracking-tighter mb-2">{result.overallBand.toFixed(1)}</span>
                <span className="bg-blue-600/50 border border-blue-400/30 text-blue-50 text-sm font-bold px-4 py-1 rounded-full backdrop-blur-sm">
                  {result.overallBand >= 8 ? 'Expert User' : result.overallBand >= 7 ? 'Good User' : result.overallBand >= 6 ? 'Competent User' : 'Modest User'}
                </span>
              </div>
              
              <p className="text-center text-blue-100 text-sm leading-relaxed">
                {result.overallBand >= 7 
                  ? "Excellent work! You're demonstrating strong command of English." 
                  : "You've reached a solid level, but a few tweaks could push you higher."}
              </p>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 print-break-inside-avoid">
              <h3 className="font-bold text-slate-900 mb-6">Detailed Score Breakdown</h3>
              
              <div className="space-y-6">
                <ScoreBar title="Task Response" score={result.taskResponse.score} feedback={result.taskResponse.feedback} />
                <ScoreBar title="Coherence and Cohesion" score={result.coherenceCohesion.score} feedback={result.coherenceCohesion.feedback} />
                <ScoreBar title="Lexical Resource" score={result.lexicalResource.score} feedback={result.lexicalResource.feedback} />
                <ScoreBar title="Grammatical Range & Accuracy" score={result.grammaticalRange.score} feedback={result.grammaticalRange.feedback} />
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-slate-300 print-break-inside-avoid print-bg-dark">
              <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#1152d4] text-xl">psychology</span>
                AI Feedback Summary
              </h3>
              
              <p className="text-sm leading-relaxed mb-6">
                {result.feedbackSummary}
              </p>
              
              <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Top Goal for Next Attempt:</h4>
                <p className="text-[#1152d4] font-medium text-sm">{result.topGoal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center py-8 mt-8 border-t border-slate-200 text-xs font-medium text-slate-400 no-print">
          <p>© 2024 IELTS Master Writing Lab. Powered by AI Analysis.</p>
          <div className="flex gap-6">
            <button className="hover:text-slate-600 transition-colors">Study Guide</button>
            <button className="hover:text-slate-600 transition-colors">Sample Essays</button>
            <button className="hover:text-slate-600 transition-colors">Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ title, score, feedback }: { title: string, score: number, feedback: string }) {
  const percentage = (score / 9) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <h4 className="text-sm font-bold text-slate-800">{title}</h4>
        <span className="text-sm font-black text-[#1152d4]">{score.toFixed(1)}</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
        <div className="h-full bg-[#1152d4] rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{feedback}</p>
    </div>
  );
}
