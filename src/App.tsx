import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TaskLibrary } from './components/TaskLibrary';
import { PracticeInterface } from './components/PracticeInterface';
import { EvaluationView } from './components/EvaluationView';
import { AdminPanel } from './components/AdminPanel';
import { MyEssays } from './components/MyEssays';
import { Analytics } from './components/Analytics';
import { Topic } from './data/topics';
import { EvaluationResult } from './services/ai';
import { storage, EssayHistoryItem } from './services/storage';

export type ViewState = 'dashboard' | 'library' | 'practice' | 'evaluation' | 'my-essays' | 'analytics' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [evaluationData, setEvaluationData] = useState<{ essay: string, result: EvaluationResult } | null>(null);

  const navigateTo = (view: ViewState) => setCurrentView(view);

  const handleStartPractice = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('practice');
  };

  const handleEvaluationComplete = (essay: string, result: EvaluationResult) => {
    if (selectedTopic) {
      storage.saveEvaluation(selectedTopic, essay, result);
    }
    setEvaluationData({ essay, result });
    setCurrentView('evaluation');
  };

  const handleReviewEssay = (item: EssayHistoryItem) => {
    setEvaluationData({ essay: item.essay, result: item.result });
    setCurrentView('evaluation');
  };

  const allTopics = storage.getAllTopics();

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] font-sans overflow-hidden">
      {currentView !== 'practice' && currentView !== 'evaluation' && (
        <Sidebar currentView={currentView} onNavigate={navigateTo} />
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {currentView === 'dashboard' && <Dashboard onNavigate={navigateTo} onReviewEssay={handleReviewEssay} />}
        {currentView === 'library' && <TaskLibrary topics={allTopics} onStartPractice={handleStartPractice} onNavigate={navigateTo} />}
        {currentView === 'practice' && selectedTopic && (
          <PracticeInterface
            topic={selectedTopic}
            onBack={() => setCurrentView('library')}
            onEvaluate={handleEvaluationComplete}
          />
        )}
        {currentView === 'evaluation' && evaluationData && (
          <EvaluationView
            essay={evaluationData.essay}
            result={evaluationData.result}
            onBack={() => setCurrentView('dashboard')}
            onTryAgain={() => setCurrentView('practice')}
          />
        )}
        {currentView === 'admin' && <AdminPanel />}
        {currentView === 'my-essays' && <MyEssays onNavigate={navigateTo} onReviewEssay={handleReviewEssay} />}
        {currentView === 'analytics' && <Analytics />}
      </div>
    </div>
  );
}
