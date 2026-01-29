// Core type definitions for Matura Master application

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  formatted?: boolean;
}

export interface AIResponse {
  text: string;
  formatted: boolean;
}

export interface AppData {
  currentLesson: number;
  completedLessons: number[];
  dailyQuests: DailyQuest[];
  xp: number;
  leaderboardProgress: number;
  streak: number;
}

export interface DailyQuest {
  id: number;
  text: string;
  completed: boolean;
  progress?: number;
  target?: number;
}

export interface Lesson {
  id: number;
  title: string;
  xp: number;
  description: string;
  icon: string;
  content: string;
  questions: Question[];
  locked?: boolean;
}

export interface Question {
  question: string;
  options: QuestionOption[];
  explanation?: string;
}

export interface QuestionOption {
  text: string;
  correct: boolean;
}

export interface KnowledgeBase {
  [key: string]: KnowledgeBaseEntry;
}

export interface KnowledgeBaseEntry {
  answer: string;
  examples?: string[];
  quotes?: string[];
  themes?: string[];
  rules?: string[];
}

export interface LiteraryWork {
  id: string;
  title: string;
  author: string;
  year?: number;
  genre?: string;
  text: string;
  analysis: string;
}

export interface WorksData {
  [key: string]: LiteraryWork;
}

// Firebase specific types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Helper functions
export function safeJSONParse<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function safeNumberParse(key: string, fallback: number): number {
  try {
    const item = localStorage.getItem(key);
    const num = item ? parseFloat(item) : NaN;
    return isNaN(num) ? fallback : num;
  } catch {
    return fallback;
  }
}

// Storage keys enum for type safety
export enum StorageKeys {
  CompletedLessons = 'completedLessons',
  CompletedLiteratureLessons = 'completedLiteratureLessons',
  XP = 'xp',
  LiteratureXP = 'literatureXp',
  Streak = 'streak',
  LiteratureStreak = 'literatureStreak',
  LeaderboardProgress = 'leaderboardProgress',
  LiteratureLeaderboardProgress = 'literatureLeaderboardProgress',
  LastCompletedDate = 'lastCompletedDate',
  LastLiteratureCompletedDate = 'lastLiteratureCompletedDate',
  User = 'user'
}
