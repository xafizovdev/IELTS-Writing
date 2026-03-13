import React from 'react';
import { BookOpen, LayoutDashboard, FileText, BarChart2, Zap } from 'lucide-react';
import { ViewState } from '../App';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'library', label: 'Tasks', icon: BookOpen },
    { id: 'my-essays', label: 'My Essays', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r border-slate-200 flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#1152d4] p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">IELTS Master</h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (currentView === 'library' && item.id === 'library');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewState)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1152d4] text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
          <p className="text-xs font-bold text-[#1152d4] uppercase tracking-wider mb-1">Current Plan</p>
          <p className="text-sm font-semibold text-slate-900 mb-3">Free Tier</p>
          <button className="w-full bg-[#1152d4] text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade to Pro
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold">
            AJ
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Alex Johnson</p>
            <p className="text-xs text-slate-500">Academic Candidate</p>
          </div>
        </div>
        
        {/* Hidden Admin Trigger */}
        <button 
          onClick={() => onNavigate('admin' as ViewState)}
          className="w-full h-4 opacity-0 hover:opacity-10 text-[10px] text-slate-400 flex items-center justify-center cursor-default"
          title="Admin Access"
        >
          Admin
        </button>
      </div>
    </div>
  );
}
