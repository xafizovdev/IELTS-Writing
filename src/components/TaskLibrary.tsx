import React, { useState } from 'react';
import { Search, Bell, Filter, ChevronLeft, ChevronRight, MessageSquare, Star, Clock, CheckCircle2 } from 'lucide-react';
import { Topic } from '../data/topics';
import { ViewState } from '../App';

interface TaskLibraryProps {
  topics: Topic[];
  onStartPractice: (topic: Topic) => void;
  onNavigate: (view: ViewState) => void;
}

export function TaskLibrary({ topics, onStartPractice, onNavigate }: TaskLibraryProps) {
  const [activeTab, setActiveTab] = useState<'Task 1' | 'Task 2'>('Task 1');
  
  const filteredTopics = topics.filter(t => t.type === activeTab);

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#1152d4] p-1.5 rounded-md">
              <span className="material-symbols-outlined text-white text-lg">school</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900">IELTS Writing</h1>
          </div>
          <nav className="flex items-center gap-6">
            <button className="text-sm font-bold text-[#1152d4] border-b-2 border-[#1152d4] py-4 -mb-[18px]">Library</button>
            <button onClick={() => onNavigate('my-essays')} className="text-sm font-medium text-slate-500 hover:text-slate-900">Practice History</button>
            <button className="text-sm font-medium text-slate-500 hover:text-slate-900">Resources</button>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:border-transparent"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold text-xs">
            AJ
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-3">Writing Task Library</h1>
          <p className="text-slate-500 max-w-2xl">Master the IELTS Academic Writing section with our curated collection of Task 1 and Task 2 practice prompts. Filter by topic, type, or difficulty.</p>
        </div>

        {/* Filters Bar */}
        <div className="flex justify-between items-center mb-8 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('Task 1')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'Task 1' ? 'bg-white text-[#1152d4] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Task 1
            </button>
            <button 
              onClick={() => setActiveTab('Task 2')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'Task 2' ? 'bg-white text-[#1152d4] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Task 2
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1152d4] appearance-none pr-8 relative">
              <option>All Question Types</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1152d4] appearance-none pr-8">
              <option>Topic: Any</option>
            </select>
            <select className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1152d4] appearance-none pr-8">
              <option>Difficulty: Any</option>
            </select>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 px-2">
              <Filter className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTopics.map((topic, idx) => (
            <div key={topic.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              {/* Card Image */}
              <div className="h-48 bg-slate-200 relative">
                {topic.imageUrl ? (
                  <img src={topic.imageUrl} alt={topic.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-white opacity-50">image</span>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {topic.type}
                  </span>
                  {topic.category && (
                    <span className="bg-[#1152d4]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {topic.category}
                    </span>
                  )}
                </div>
                
                {/* Status Badge (Mock) */}
                {idx === 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      Attempted
                    </span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  <span className="text-[#1152d4]">{topic.category || 'General'}</span>
                  <span>•</span>
                  <span>Difficulty: {topic.difficulty || 'Medium'}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{topic.title}</h3>
                <p className="text-sm text-slate-500 mb-6 line-clamp-3 flex-1">{topic.prompt}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    {topic.stats ? (
                      <>
                        {topic.stats.comments && (
                          <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {topic.stats.comments} Comments</span>
                        )}
                        {topic.stats.rating && (
                          <span className="flex items-center gap-1 text-amber-500"><Star className="w-4 h-4 fill-current" /> {topic.stats.rating} ({topic.stats.practiced})</span>
                        )}
                        {!topic.stats.comments && !topic.stats.rating && (
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {topic.type === 'Task 1' ? '20 mins' : '40 mins'}</span>
                        )}
                      </>
                    ) : (
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {topic.type === 'Task 1' ? '20 mins' : '40 mins'}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => onStartPractice(topic)}
                    className="bg-[#1152d4] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    Practice Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 pb-12">
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#1152d4] text-white font-bold flex items-center justify-center shadow-md shadow-blue-500/20">1</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 font-medium hover:bg-slate-50 transition-colors">2</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 font-medium hover:bg-slate-50 transition-colors">3</button>
          <span className="text-slate-400 px-2">...</span>
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 font-medium hover:bg-slate-50 transition-colors">12</button>
          <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-4 gap-8 py-12 border-t border-slate-200">
          <div>
            <h4 className="text-3xl font-black text-[#1152d4] mb-1">500+</h4>
            <p className="text-sm font-medium text-slate-500">Practice Tasks</p>
          </div>
          <div>
            <h4 className="text-3xl font-black text-[#1152d4] mb-1">120k</h4>
            <p className="text-sm font-medium text-slate-500">Essays Written</p>
          </div>
          <div>
            <h4 className="text-3xl font-black text-[#1152d4] mb-1">15+</h4>
            <p className="text-sm font-medium text-slate-500">Question Types</p>
          </div>
          <div>
            <h4 className="text-3xl font-black text-[#1152d4] mb-1">7.5+</h4>
            <p className="text-sm font-medium text-slate-500">Avg. Student Band</p>
          </div>
        </div>

        <div className="flex justify-between items-center py-6 border-t border-slate-200 text-xs font-medium text-slate-400">
          <p>© 2024 IELTS Writing Mastery Pro. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-lg">language</span>
            <span className="material-symbols-outlined text-lg">help</span>
            <span className="material-symbols-outlined text-lg">shield</span>
          </div>
        </div>
      </div>
    </div>
  );
}
