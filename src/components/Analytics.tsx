import React, { useEffect, useState } from 'react';
import { BarChart2, TrendingUp, Target, Award, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { EssayHistoryItem, storage } from '../services/storage';

export function Analytics() {
  const [history, setHistory] = useState<EssayHistoryItem[]>([]);

  useEffect(() => {
    // Sort history chronologically for charts (oldest to newest)
    const data = storage.getHistory().reverse();
    setHistory(data);
  }, []);

  if (history.length === 0) {
    return (
      <div className="flex-1 bg-[#f8fafc] min-h-screen p-8 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <BarChart2 className="w-8 h-8 text-[#1152d4]" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">No Data Yet</h2>
        <p className="text-slate-500 max-w-md text-center">
          Complete at least one practice essay to see your performance analytics and progress charts.
        </p>
      </div>
    );
  }

  // Prepare Data for Line Chart (Overall Band Progress)
  const progressData = history.map((item, index) => ({
    name: `Essay ${index + 1}`,
    date: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: item.result.overallBand
  }));

  // Prepare Data for Radar Chart (Average Criteria Scores)
  const avgTR = history.reduce((sum, item) => sum + item.result.taskResponse.score, 0) / history.length;
  const avgCC = history.reduce((sum, item) => sum + item.result.coherenceCohesion.score, 0) / history.length;
  const avgLR = history.reduce((sum, item) => sum + item.result.lexicalResource.score, 0) / history.length;
  const avgGRA = history.reduce((sum, item) => sum + item.result.grammaticalRange.score, 0) / history.length;

  const radarData = [
    { subject: 'Task Response', A: avgTR.toFixed(1), fullMark: 9 },
    { subject: 'Coherence', A: avgCC.toFixed(1), fullMark: 9 },
    { subject: 'Vocabulary', A: avgLR.toFixed(1), fullMark: 9 },
    { subject: 'Grammar', A: avgGRA.toFixed(1), fullMark: 9 },
  ];

  // Find weakest criteria
  const criteriaScores = [
    { name: 'Task Response', score: avgTR },
    { name: 'Coherence & Cohesion', score: avgCC },
    { name: 'Lexical Resource', score: avgLR },
    { name: 'Grammatical Range', score: avgGRA },
  ];
  const weakest = criteriaScores.reduce((prev, curr) => prev.score < curr.score ? prev : curr);
  const strongest = criteriaScores.reduce((prev, curr) => prev.score > curr.score ? prev : curr);

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Performance Analytics</h1>
          <p className="text-slate-500">Track your progress and identify areas for improvement.</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#1152d4]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase">Current Average</p>
              <p className="text-2xl font-black text-slate-900">
                {(history.reduce((sum, item) => sum + item.result.overallBand, 0) / history.length).toFixed(1)}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase">Strongest Area</p>
              <p className="text-lg font-bold text-slate-900">{strongest.name}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase">Needs Focus</p>
              <p className="text-lg font-bold text-slate-900">{weakest.name}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Progress Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Band Score Progress</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis domain={[4, 9]} ticks={[4, 5, 6, 7, 8, 9]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#1152d4" strokeWidth={3} dot={{ r: 4, fill: '#1152d4', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Skill Breakdown (Average)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 9]} tick={false} axisLine={false} />
                  <Radar name="Score" dataKey="A" stroke="#1152d4" fill="#1152d4" fillOpacity={0.2} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
