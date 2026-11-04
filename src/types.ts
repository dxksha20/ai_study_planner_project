export type StreamType = 'Engineering' | 'Medical' | 'Law' | 'Commerce' | 'School' | 'Competitive (UPSC/GATE/NEET/JEE)';

export interface UserProfile {
  name: string;
  avatarUrl: string;
  stream: StreamType;
  branch: string;
  semester: string;
  subjects: string[];
  weakSubjects: string[];
  strongSubjects: string[];
  dailyStudyGoalHours: number;
  sleepSchedule: string;
  goals: string;
  targetRole: string;
  targetExam?: string;
  targetHours?: number;
  learningStyle: 'Visual' | 'Concise' | 'Deep-Dive' | 'Hands-On';
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  energy: number; // 0-100
  maxEnergy: number;
  streakDays: number;
  isOnboarded: boolean;
}

export interface TimetableSlot {
  id: string;
  time: string;
  subject: string;
  type: 'Lecture' | 'Deep Focus' | 'Revision' | 'Practice' | 'Rest' | 'Mock Test';
  notes?: string;
  completed?: boolean;
}

export interface DaySchedule {
  day: string;
  slots: TimetableSlot[];
}

export interface ExamEvent {
  id: string;
  subject: string;
  date: string;
  daysRemaining: number;
  importance: 'High' | 'Critical' | 'Medium';
}

export interface NoteItem {
  id: string;
  title: string;
  stream: StreamType;
  category: string;
  content: string;
  codeSnippet?: string;
  diagramPrompt?: string;
  tags: string[];
  updatedAt: string;
  isPinned?: boolean;
}

export interface QuizQuestion {
  id: number;
  type: 'mcq' | 'true_false' | 'fill_blank' | 'coding';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  explanation: string;
  userAnswer?: string | number;
}

export interface QuizData {
  id: string;
  title: string;
  subject: string;
  totalXp: number;
  totalCoins: number;
  questions: QuizQuestion[];
}

export interface TwinNudge {
  id: string;
  type: 'retention' | 'habit' | 'streak' | 'wellness';
  title: string;
  message: string;
  action: string;
  impact: string;
  timestamp: string;
}

export interface AvatarCustomization {
  hairStyle: string;
  outfit: string;
  accessory: string;
  deskDecor: string;
  pet: string;
  backgroundTheme: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  college: string;
  xp: number;
  level: number;
  streak: number;
  avatar: string;
  badge: string;
}

export interface StudyRoom {
  id: string;
  name: string;
  subject: string;
  activeUsers: number;
  maxUsers: number;
  isVoiceActive: boolean;
  hostName: string;
  topic: string;
}
