import React, { useState, useEffect } from 'react';
import { Topic } from '../data/topics';
import { evaluateEssay, EvaluationResult } from '../services/ai';
import { Loader2, Send, CheckCircle2, AlertCircle, BookOpen, PenTool, Award, Clock, Lightbulb, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

interface WorkspaceProps {
  topic: Topic;
}

export function Workspace({ topic }: WorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'study' | 'practice'>('study');
  const [essay, setEssay] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(topic.type === 'Task 1' ? 20 * 60 : 40 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Reset state when topic changes
  useEffect(() => {
    setEssay('');
    setEvaluation(null);
    setError(null);
    setActiveTab('study');
    setTimeLeft(topic.type === 'Task 1' ? 20 * 60 : 40 * 60);
    setIsTimerRunning(false);
  }, [topic.id, topic.type]);

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
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const minWords = topic.type === 'Task 1' ? 150 : 250;

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
      setEvaluation(result);
    } catch (err) {
      setError('Failed to evaluate essay. Please try again.');
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md uppercase tracking-wide">
            {topic.type}
          </span>
          <h2 className="text-2xl font-bold text-slate-900">{topic.title}</h2>
        </div>
        <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">{topic.prompt}</p>
      </header>

      {/* Tabs */}
      <div className="px-8 pt-4 bg-white border-b border-slate-200 flex gap-6 flex-shrink-0">
        <button
          onClick={() => setActiveTab('study')}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'study'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Study Materials
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'practice'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <PenTool className="w-4 h-4" />
          Practice & Evaluate
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'study' ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {topic.imageUrl && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <img src={topic.imageUrl} alt="Task Visual" className="w-full h-auto rounded-lg" />
              </div>
            )}

            {topic.tips && topic.tips.length > 0 && (
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Writing Tips
                </h3>
                <ul className="space-y-2">
                  {topic.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-amber-800 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-500" />
                Sample Answers
              </h3>
              <div className="space-y-6">
                {topic.samples.map((sample, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Sample {idx + 1}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                        Band {sample.band.toFixed(1)}
                      </span>
                    </div>
                    <div className="p-6 text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">
                      {sample.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Writing Area */}
            <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700">Your Essay</span>
                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border border-slate-200 shadow-sm">
                    <Clock className={`w-4 h-4 ${timeLeft < 300 ? 'text-red-500' : 'text-slate-400'}`} />
                    <span className={`font-mono text-sm font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-slate-700'}`}>
                      {formatTime(timeLeft)}
                    </span>
                    <button 
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="ml-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      {isTimerRunning ? 'Pause' : 'Start'}
                    </button>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  wordCount >= minWords ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {wordCount} / {minWords} words
                </span>
              </div>
              <textarea
                value={essay}
                onChange={(e) => setEssay(e.target.value)}
                placeholder="Start typing your essay here..."
                className="flex-1 p-6 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-slate-700 leading-relaxed"
                disabled={isEvaluating}
              />
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                {error ? (
                  <span className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {error}
                  </span>
                ) : (
                  <span className="text-sm text-slate-500">
                    {wordCount >= minWords ? 'Word count requirement met.' : `Write at least ${minWords} words.`}
                  </span>
                )}
                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !essay.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Get AI Feedback
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Feedback Area */}
            <div className="flex flex-col h-[calc(100vh-16rem)] overflow-hidden bg-slate-100 rounded-xl border border-slate-200">
              {evaluation ? (
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Overall Band */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Estimated Band Score</h3>
                    <div className="text-5xl font-black text-indigo-600">{evaluation.overallBand.toFixed(1)}</div>
                  </div>

                  {/* General Feedback */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">General Feedback</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{evaluation.generalFeedback}</p>
                  </div>

                  {/* How to Score Higher (NEW) */}
                  {evaluation.howToScoreHigher && evaluation.howToScoreHigher.length > 0 && (
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl shadow-sm border border-indigo-100">
                      <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                        How to Score Higher
                      </h3>
                      <div className="space-y-6">
                        {evaluation.howToScoreHigher.map((strategy, idx) => (
                          <div key={idx} className="bg-white p-5 rounded-lg border border-indigo-100 shadow-sm">
                            <h4 className="font-bold text-slate-800 mb-2">{strategy.area}</h4>
                            <div className="space-y-3 text-sm">
                              <div>
                                <span className="font-semibold text-red-600 block mb-1">Your Weakness:</span>
                                <p className="text-slate-700">{strategy.currentWeakness}</p>
                              </div>
                              <div>
                                <span className="font-semibold text-amber-600 block mb-1">Actionable Advice:</span>
                                <p className="text-slate-700">{strategy.actionableAdvice}</p>
                              </div>
                              <div className="bg-emerald-50 p-3 rounded-md border border-emerald-100">
                                <span className="font-semibold text-emerald-700 flex items-center gap-1 mb-1">
                                  <ArrowRight className="w-4 h-4" /> Example Band 8.0+ Rewrite:
                                </span>
                                <p className="text-emerald-900 italic">"{strategy.exampleRewrite}"</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Criteria Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CriteriaCard title="Task Achievement" data={evaluation.taskAchievement} />
                    <CriteriaCard title="Coherence & Cohesion" data={evaluation.coherenceCohesion} />
                    <CriteriaCard title="Lexical Resource" data={evaluation.lexicalResource} />
                    <CriteriaCard title="Grammatical Range" data={evaluation.grammaticalRange} />
                  </div>

                  {/* Vocabulary Suggestions */}
                  {evaluation.vocabularySuggestions && evaluation.vocabularySuggestions.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        Vocabulary Suggestions
                      </h3>
                      <ul className="space-y-3">
                        {evaluation.vocabularySuggestions.map((vocab, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                            {vocab}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Corrections */}
                  {evaluation.corrections.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Specific Corrections</h3>
                      <div className="space-y-4">
                        {evaluation.corrections.map((corr, idx) => (
                          <div key={idx} className="p-4 bg-red-50/50 rounded-lg border border-red-100">
                            <div className="text-sm text-red-800 line-through mb-1">{corr.original}</div>
                            <div className="text-sm text-emerald-700 font-medium mb-2 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> {corr.corrected}
                            </div>
                            <div className="text-xs text-slate-600 bg-white/60 p-2 rounded border border-slate-200/60">
                              {corr.explanation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Awaiting Submission</h3>
                  <p className="text-sm max-w-sm">
                    Write your essay and click "Get AI Feedback" to receive a detailed evaluation based on official IELTS criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CriteriaCard({ title, data }: { title: string; data: { score: number; feedback: string } }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-slate-800 text-sm">{title}</h4>
        <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded text-sm">
          {data.score.toFixed(1)}
        </span>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">{data.feedback}</p>
    </div>
  );
}
