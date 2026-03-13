import React, { useEffect, useState } from 'react';
import { FileText, ArrowRight, Clock, Search, Filter } from 'lucide-react';
import { EssayHistoryItem, storage } from '../services/storage';
import { ViewState } from '../App';

interface MyEssaysProps {
  onNavigate: (view: ViewState) => void;
  onReviewEssay: (item: EssayHistoryItem) => void;
}

export function MyEssays({ onNavigate, onReviewEssay }: MyEssaysProps) {
  const [history, setHistory] = useState<EssayHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setHistory(storage.getHistory());
  }, []);

  const filteredHistory = history.filter(item => 
    item.topicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.topicType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">My Essays</h1>
            <p className="text-slate-500">Review your past writing tasks and AI feedback.</p>
          </div>
          <button 
            onClick={() => onNavigate('library')}
            className="px-6 py-2.5 bg-[#1152d4] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
          >
            Start New Practice
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by topic or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 px-4 py-2 border border-slate-200 rounded-lg">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No essays found</h3>
              <p className="text-slate-500 mb-6">You haven't written any essays yet, or none match your search.</p>
              <button 
                onClick={() => onNavigate('library')}
                className="text-[#1152d4] font-bold hover:underline"
              >
                Go to Task Library
              </button>
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-300 transition-colors group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-[#1152d4] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {item.topicType}
                    </span>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.topicTitle}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1 mb-3">{item.essay}</p>
                  
                  {/* Detailed Scores */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">TR/TA</span>
                      <span className="text-xs font-black text-slate-700">{item.result.taskResponse.score.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">CC</span>
                      <span className="text-xs font-black text-slate-700">{item.result.coherenceCohesion.score.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">LR</span>
                      <span className="text-xs font-black text-slate-700">{item.result.lexicalResource.score.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">GRA</span>
                      <span className="text-xs font-black text-slate-700">{item.result.grammaticalRange.score.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 ml-8">
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Band Score</p>
                    <p className="text-3xl font-black text-[#1152d4]">{item.result.overallBand.toFixed(1)}</p>
                  </div>
                  <button 
                    onClick={() => onReviewEssay(item)}
                    className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1152d4] group-hover:bg-[#1152d4] group-hover:text-white group-hover:border-[#1152d4] transition-all shadow-sm"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
