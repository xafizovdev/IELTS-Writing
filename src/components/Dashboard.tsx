import React, { useEffect, useState } from 'react';
import { Search, Bell, Plus, TrendingUp, ArrowRight, Clock, FileText } from 'lucide-react';
import { ViewState } from '../App';
import { EssayHistoryItem, storage } from '../services/storage';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
  onReviewEssay: (item: EssayHistoryItem) => void;
}

export function Dashboard({ onNavigate, onReviewEssay }: DashboardProps) {
  const [history, setHistory] = useState<EssayHistoryItem[]>([]);

  useEffect(() => {
    setHistory(storage.getHistory());
  }, []);

  const overallBand = history.length > 0 
    ? (history.reduce((sum, item) => sum + item.result.overallBand, 0) / history.length).toFixed(1)
    : '0.0';

  const vocabScore = history.length > 0
    ? Math.round((history.reduce((sum, item) => sum + item.result.lexicalResource.score, 0) / history.length) / 9 * 100)
    : 0;

  const recentEssays = history.slice(0, 3);

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search resources, tasks, or essays..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-6">
          <button className="relative text-slate-500 hover:text-slate-700">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#f8fafc]"></span>
          </button>
          <button 
            onClick={() => onNavigate('library')}
            className="flex items-center gap-2 bg-[#1152d4] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Start New Practice
          </button>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Alex!</h1>
        <p className="text-slate-500 text-lg">You are on track to reach your target <span className="font-bold text-[#1152d4]">Band 7.5</span>.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Band</h3>
            {history.length > 0 && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">+0.5</span>}
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-slate-900">{overallBand}</span>
            <span className="text-slate-400 font-medium">/ 9.0</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#1152d4]" style={{ width: `${(parseFloat(overallBand) / 9) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Essays Completed</h3>
            <span className="bg-blue-100 text-[#1152d4] text-xs font-bold px-2 py-1 rounded">Active</span>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-slate-900">{history.length}</span>
            <span className="text-slate-400 font-medium">Tasks</span>
          </div>
          <p className="text-sm text-slate-500">Keep up the good work!</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vocabulary Score</h3>
            {history.length > 0 && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">+8%</span>}
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black text-slate-900">{vocabScore}%</span>
            <span className="text-slate-400 font-medium">Accuracy</span>
          </div>
          <div className="flex gap-1">
            <div className="w-8 h-8 rounded-full bg-[#1152d4] border-2 border-white -mr-3 z-20"></div>
            <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white -mr-3 z-10"></div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="col-span-2 space-y-8">
          {/* Recommended */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Recommended for You</h2>
              <button onClick={() => onNavigate('library')} className="text-sm font-bold text-[#1152d4] hover:underline">View Library</button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Task 1 Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer hover:border-blue-300 transition-colors" onClick={() => onNavigate('library')}>
                <div className="absolute top-4 right-4 text-slate-200 group-hover:text-blue-100 transition-colors">
                  <TrendingUp className="w-16 h-16" />
                </div>
                <span className="inline-block bg-blue-100 text-[#1152d4] text-xs font-bold px-2 py-1 rounded mb-4">TASK 1: ACADEMIC</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Global Energy Consumption</h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2">Describe the changes in energy usage across five continents between 1990...</p>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 20 min</span>
                  <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> 150 words</span>
                </div>
              </div>

              {/* Task 2 Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer hover:border-purple-300 transition-colors" onClick={() => onNavigate('library')}>
                <div className="absolute top-4 right-4 text-slate-200 group-hover:text-purple-100 transition-colors">
                  <FileText className="w-16 h-16" />
                </div>
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded mb-4">TASK 2: ESSAY</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Remote Work Challenges</h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-2">Discuss the advantages and disadvantages of remote work on...</p>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 40 min</span>
                  <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> 250 words</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-slate-900">Band Score Trend</h2>
              <select className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#1152d4]">
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            
            {/* Simple CSS Chart */}
            <div className="h-48 flex items-end justify-between px-4">
              <div className="w-1/6 flex flex-col items-center gap-2">
                <div className="w-10 bg-blue-200 rounded-t-md" style={{ height: '30%' }}></div>
                <span className="text-xs font-bold text-slate-400">WEEK 1</span>
              </div>
              <div className="w-1/6 flex flex-col items-center gap-2">
                <div className="w-10 bg-blue-400 rounded-t-md" style={{ height: '45%' }}></div>
                <span className="text-xs font-bold text-slate-400">WEEK 2</span>
              </div>
              <div className="w-1/6 flex flex-col items-center gap-2">
                <div className="w-10 bg-[#1152d4] rounded-t-md opacity-80" style={{ height: '60%' }}></div>
                <span className="text-xs font-bold text-slate-400">WEEK 3</span>
              </div>
              <div className="w-1/6 flex flex-col items-center gap-2">
                <div className="w-10 bg-[#1152d4] rounded-t-md" style={{ height: '65%' }}></div>
                <span className="text-xs font-bold text-slate-400">WEEK 4</span>
              </div>
              <div className="w-1/6 flex flex-col items-center gap-2">
                <div className="w-10 bg-[#1152d4] rounded-t-md" style={{ height: '75%' }}></div>
                <span className="text-xs font-bold text-slate-400">TARGET</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Essays</h2>
          <div className="space-y-4">
            {recentEssays.length === 0 ? (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center text-slate-500">
                No essays written yet. Start practicing!
              </div>
            ) : (
              recentEssays.map(item => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 line-clamp-1">{item.topicTitle}</h4>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Graded</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    {new Date(item.date).toLocaleDateString()} • {item.topicType}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-slate-900">{item.result.overallBand.toFixed(1)}</span>
                      <span className="text-xs text-slate-400 font-medium">Score</span>
                    </div>
                    <button onClick={() => onReviewEssay(item)} className="text-sm font-bold text-[#1152d4] flex items-center gap-1 hover:underline">
                      Review <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}

            <button 
              onClick={() => onNavigate('my-essays')}
              className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors"
            >
              View Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
