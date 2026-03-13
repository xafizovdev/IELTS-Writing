import React, { useState } from 'react';
import { Plus, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { Topic } from '../data/topics';
import { storage } from '../services/storage';

export function AdminPanel() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Task 1' | 'Task 2'>('Task 1');
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !prompt) {
      setStatus('error');
      return;
    }

    const newTopic: Topic = {
      id: `custom-${Date.now()}`,
      title,
      type,
      prompt,
      category: category || 'General',
      difficulty,
      imageUrl: imageUrl || undefined,
      samples: [],
      stats: {
        practiced: '0'
      }
    };

    try {
      storage.addCustomTopic(newTopic);
      setStatus('success');
      // Reset form
      setTitle('');
      setPrompt('');
      setCategory('');
      setImageUrl('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="flex-1 bg-[#f8fafc] min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Admin Panel</h1>
          <p className="text-slate-500">Add new Task 1 or Task 2 writing prompts to the library.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {status === 'success' && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <p className="font-medium">New task successfully added to the library!</p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">Please fill in all required fields.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Task Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Global Energy Consumption"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Task Type *</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value as 'Task 1' | 'Task 2')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:bg-white transition-colors"
                >
                  <option value="Task 1">Task 1 (Academic/General)</option>
                  <option value="Task 2">Task 2 (Essay)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Difficulty</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:bg-white transition-colors"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Prompt / Question *</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  placeholder="Enter the full question prompt here..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:bg-white transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <input 
                  type="text" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Environment, Education"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Image URL (Optional)</label>
                <input 
                  type="text" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1152d4] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="submit"
                className="flex items-center gap-2 bg-[#1152d4] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
              >
                <Save className="w-5 h-5" />
                Save Task to Library
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
