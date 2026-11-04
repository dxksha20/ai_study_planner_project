import { UserProfile, DaySchedule, ExamEvent, NoteItem, TwinNudge, LeaderboardUser, StudyRoom, QuizData } from '../types';

export const initialUserProfile: UserProfile = {
  name: "Alex Vance",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  stream: "Engineering",
  branch: "Computer Science & Engineering",
  semester: "6th Semester",
  subjects: ["Database Management Systems", "Operating Systems", "Computer Networks", "Design & Analysis of Algorithms", "Full Stack Web Dev"],
  weakSubjects: ["Operating Systems", "Design & Analysis of Algorithms"],
  strongSubjects: ["Database Management Systems", "Full Stack Web Dev"],
  dailyStudyGoalHours: 5,
  sleepSchedule: "11:30 PM - 07:00 AM",
  goals: "Targeting SDE-1 at Top Tech Company & MCA Top Ranker",
  targetRole: "Senior AI & Full Stack Engineer",
  learningStyle: "Hands-On",
  level: 14,
  xp: 3850,
  maxXp: 5000,
  coins: 1240,
  energy: 85,
  maxEnergy: 100,
  streakDays: 12,
  isOnboarded: true,
};

export const sampleTimetable: DaySchedule[] = [
  {
    day: "Monday",
    slots: [
      { id: "m1", time: "07:30 AM - 08:30 AM", subject: "Operating Systems", type: "Deep Focus", notes: "Spaced repetition on Virtual Memory & Page Replacement", completed: true },
      { id: "m2", time: "09:00 AM - 01:00 PM", subject: "College Lectures", type: "Lecture", notes: "DBMS & Networks Lab", completed: true },
      { id: "m3", time: "03:30 PM - 05:00 PM", subject: "DBMS", type: "Practice", notes: "Solve 15 SQL Join & Normalization Queries", completed: false },
      { id: "m4", time: "06:00 PM - 07:30 PM", subject: "Algorithms", type: "Practice", notes: "Dynamic Programming - Knapsack Variations", completed: false },
      { id: "m5", time: "09:00 PM - 10:00 PM", subject: "Placement DSA", type: "Practice", notes: "LeetCode Medium Two Pointers Set", completed: false }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { id: "t1", time: "07:30 AM - 08:30 AM", subject: "Computer Networks", type: "Deep Focus", notes: "TCP/IP 3-way Handshake & Flow Control", completed: false },
      { id: "t2", time: "09:00 AM - 01:00 PM", subject: "College Lectures", type: "Lecture", notes: "Web Tech & OS Theory", completed: false },
      { id: "t3", time: "04:00 PM - 05:30 PM", subject: "Operating Systems", type: "Revision", notes: "Process Synchronization & Semaphores", completed: false },
      { id: "t4", time: "08:00 PM - 09:30 PM", subject: "Full Stack Dev", type: "Practice", notes: "Build Express API routes for AetherLearn", completed: false }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { id: "w1", time: "07:30 AM - 08:30 AM", subject: "Algorithms", type: "Deep Focus", notes: "Graph Algorithms (Dijkstra & BFS/DFS)", completed: false },
      { id: "w2", time: "09:00 AM - 01:00 PM", subject: "College Lectures", type: "Lecture", notes: "Mini Project Review & Software Engg", completed: false },
      { id: "w3", time: "04:00 PM - 05:30 PM", subject: "DBMS", type: "Practice", notes: "Transaction Management & ACID properties", completed: false },
      { id: "w4", time: "08:30 PM - 09:30 PM", subject: "Nightly AI Quiz", type: "Mock Test", notes: "15-min AI generated revision quiz", completed: false }
    ]
  }
];

export const sampleExams: ExamEvent[] = [
  { id: "e1", subject: "Operating Systems Mid-Term", date: "2026-08-04", daysRemaining: 14, importance: "Critical" },
  { id: "e2", subject: "DBMS End-Semester Lab", date: "2026-08-12", daysRemaining: 22, importance: "High" },
  { id: "e3", subject: "GATE Computer Science Mock", date: "2026-08-25", daysRemaining: 35, importance: "Medium" },
];

export const sampleNotes: NoteItem[] = [
  {
    id: "n1",
    title: "Operating Systems: Process vs Thread & Deadlocks",
    stream: "Engineering",
    category: "Operating Systems",
    content: "A process is an executing instance of a program with isolated address space. A thread is a lightweight execution unit inside a process sharing code and data segments.",
    codeSnippet: `// C Semaphore Example
#include <semaphore.h>
sem_t mutex;

void* thread_func(void* arg) {
    sem_wait(&mutex); // Wait / P operation
    // Critical Section
    sem_post(&mutex); // Signal / V operation
}`,
    tags: ["OS", "Concurrency", "Semaphores"],
    updatedAt: "2 hours ago",
    isPinned: true,
  },
  {
    id: "n2",
    title: "DBMS: 3NF vs BCNF Normalization Cheatsheet",
    stream: "Engineering",
    category: "DBMS",
    content: "3NF eliminates transitive dependencies. BCNF is a stricter version where for every functional dependency X -> Y, X must be a super key.",
    tags: ["DBMS", "SQL", "Normalization"],
    updatedAt: "Yesterday",
    isPinned: true,
  },
  {
    id: "n3",
    title: "Anatomy: Neurovascular Supply of the Upper Limb",
    stream: "Medical",
    category: "Anatomy",
    content: "Brachial plexus originates from C5-T1 roots. Supplies innervation to shoulder, arm, forearm, and hand. Major branches: Radial, Median, Ulnar, Musculocutaneous, and Axillary nerves.",
    tags: ["Medical", "BrachialPlexus", "Nerves"],
    updatedAt: "3 days ago",
  },
  {
    id: "n4",
    title: "Law: Constitution Article 21 & Landmark Precedents",
    stream: "Law",
    category: "Constitutional Law",
    content: "Article 21 guarantees Protection of Life and Personal Liberty. Key precedents: Maneka Gandhi v. Union of India (1978) expanded procedure established by law to due process.",
    tags: ["Law", "Constitution", "LandmarkCases"],
    updatedAt: "4 days ago",
  }
];

export const sampleTwinNudges: TwinNudge[] = [
  {
    id: "tn1",
    type: "retention",
    title: "Ebbinghaus Retention Decay Warning",
    message: "You studied Operating Systems 5 days ago. Your memory retention is currently at 42%. A quick 8-minute recall quiz today will boost retention back to 95%.",
    action: "Launch 8-Min Recall Quiz",
    impact: "+22% Exam Retention Score",
    timestamp: "10 mins ago",
  },
  {
    id: "tn2",
    type: "habit",
    title: "Peak Cognitive Window Active",
    message: "Your past quiz data shows 91% accuracy between 8:00 AM and 10:30 AM. Perfect time to tackle hard Algorithms problems!",
    action: "Open Algorithms Module",
    impact: "1.8x Speed Multiplier",
    timestamp: "1 hour ago",
  },
  {
    id: "tn3",
    type: "streak",
    title: "Level 15 XP Milestone Nearby",
    message: "You are only 1,150 XP away from reaching Level 15 and unlocking the Cyberpunk Study Room skin & Cyber-Owl Pet!",
    action: "Earn XP Now",
    impact: "Unlock Rare Avatar Skin",
    timestamp: "3 hours ago",
  }
];

export const sampleLeaderboard: LeaderboardUser[] = [
  { rank: 1, name: "Sophia Chen", college: "IIT Bombay", xp: 14250, level: 28, streak: 42, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", badge: "Grandmaster Scholar" },
  { rank: 2, name: "Aarav Sharma", college: "NIT Trichy", xp: 12890, level: 25, streak: 31, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", badge: "Algorithms Titan" },
  { rank: 3, name: "Alex Vance (You)", college: "National Tech Inst", xp: 3850, level: 14, streak: 12, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", badge: "Pro Study Prodigy" },
  { rank: 4, name: "Rohan Verma", college: "BITS Pilani", xp: 3620, level: 13, streak: 18, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", badge: "DBMS Master" },
  { rank: 5, name: "Ananya Iyer", college: "AIIMS Delhi", xp: 3410, level: 13, streak: 24, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", badge: "Anatomy Prodigy" }
];

export const sampleStudyRooms: StudyRoom[] = [
  { id: "sr1", name: "GATE & MCA CS Deep Focus Squad 🚀", subject: "Computer Science", activeUsers: 6, maxUsers: 10, isVoiceActive: true, hostName: "DevGuru", topic: "Operating Systems & Algorithms" },
  { id: "sr2", name: "Neet & MBBS Midnight Meds 🩺", subject: "Medical", activeUsers: 8, maxUsers: 12, isVoiceActive: true, hostName: "Dr_MedLearner", topic: "Neuroanatomy High Yield" },
  { id: "sr3", name: "Placement DSA Sprint & LeetCode 💻", subject: "Coding", activeUsers: 4, maxUsers: 8, isVoiceActive: false, hostName: "CodeNinja", topic: "Dynamic Programming" },
];

export const defaultQuiz: QuizData = {
  id: "q_nightly_1",
  title: "Nightly OS & DBMS AI Recall Battle",
  subject: "Computer Science",
  totalXp: 300,
  totalCoins: 50,
  questions: [
    {
      id: 1,
      type: "mcq",
      question: "Which CPU scheduling algorithm gives minimum average waiting time for a given set of processes?",
      options: ["FCFS (First Come First Serve)", "SJF (Shortest Job First)", "Round Robin", "Priority Scheduling"],
      correctIndex: 1,
      explanation: "Shortest Job First (SJF) is mathematically optimal as it minimizes average waiting time by executing shorter jobs first."
    },
    {
      id: 2,
      type: "true_false",
      question: "In B+ Trees, data pointers are stored only in the leaf nodes, whereas internal nodes contain search keys.",
      options: ["True", "False"],
      correctIndex: 0,
      explanation: "True! B+ Trees store all actual records/data pointers at the leaf level, allowing efficient sequential range queries."
    },
    {
      id: 3,
      type: "fill_blank",
      question: "The phenomenon where increasing memory page frames leads to more page faults in FIFO is called ________ Anomaly.",
      correctAnswer: "Belady",
      explanation: "Belady's Anomaly occurs in FIFO page replacement where adding page frames unexpectedly increases page faults."
    },
    {
      id: 4,
      type: "coding",
      question: "In SQL, write the keyword used to filter grouped query results generated by the GROUP BY clause.",
      correctAnswer: "HAVING",
      explanation: "The HAVING clause filters aggregated groups after GROUP BY, whereas WHERE filters individual rows."
    }
  ]
};
