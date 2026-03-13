import { Topic, topics as defaultTopics } from '../data/topics';
import { EvaluationResult } from './ai';

export interface EssayHistoryItem {
  id: string;
  topicId: string;
  topicTitle: string;
  topicType: 'Task 1' | 'Task 2';
  date: string;
  essay: string;
  result: EvaluationResult;
}

export const storage = {
  getCustomTopics: (): Topic[] => {
    const data = localStorage.getItem('ielts_custom_topics');
    return data ? JSON.parse(data) : [];
  },
  addCustomTopic: (topic: Topic) => {
    const topics = storage.getCustomTopics();
    topics.push(topic);
    localStorage.setItem('ielts_custom_topics', JSON.stringify(topics));
  },
  getAllTopics: (): Topic[] => {
    return [...defaultTopics, ...storage.getCustomTopics()];
  },
  
  getHistory: (): EssayHistoryItem[] => {
    const data = localStorage.getItem('ielts_essay_history');
    return data ? JSON.parse(data) : [];
  },
  saveEvaluation: (topic: Topic, essay: string, result: EvaluationResult) => {
    const history = storage.getHistory();
    const newItem: EssayHistoryItem = {
      id: Date.now().toString(),
      topicId: topic.id,
      topicTitle: topic.title,
      topicType: topic.type,
      date: new Date().toISOString(),
      essay,
      result
    };
    history.unshift(newItem);
    localStorage.setItem('ielts_essay_history', JSON.stringify(history));
  }
};
