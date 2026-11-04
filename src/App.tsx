import React, { useState } from 'react';
import { UserProfile, DaySchedule, NoteItem, QuizData, TwinNudge, ExamEvent, LeaderboardUser, StudyRoom } from './types';
import { initialUserProfile, sampleTimetable, sampleExams, sampleNotes, sampleTwinNudges, sampleLeaderboard, sampleStudyRooms, defaultQuiz } from './data/mockData';
import { PaletteId, GlowIntensity, GlassBlur, themePalettes } from './data/themePalettes';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { FloatingBottomDock } from './components/FloatingBottomDock';
import { DrawerSheetModal } from './components/DrawerSheetModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { RightAiCopilotSidebar } from './components/RightAiCopilotSidebar';
import { BackButtonHeader } from './components/BackButtonHeader';
import { AuthLoginModal } from './components/AuthLoginModal';

import { DashboardView } from './components/DashboardView';
import { StudyTwinModule } from './components/StudyTwinModule';
import { TimetableModule } from './components/TimetableModule';
import { StudyAssistantModule } from './components/StudyAssistantModule';
import { SmartNotebookModule } from './components/SmartNotebookModule';
import { VoiceCompanionModule } from './components/VoiceCompanionModule';
import { QuizEngineModule } from './components/QuizEngineModule';
import { GamificationModule } from './components/GamificationModule';
import { SocialLearningModule } from './components/SocialLearningModule';
import { MentalWellnessModule } from './components/MentalWellnessModule';
import { CareerModeModule } from './components/CareerModeModule';
import { AnalyticsDashboardModule } from './components/AnalyticsDashboardModule';
import { BiWeeklyContestsModule } from './components/BiWeeklyContestsModule';
import { ProjectProposalModule } from './components/ProjectProposalModule';

export default function App() {
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [paletteId, setPaletteId] = useState<PaletteId>('cyberpunk');
  const [glowIntensity, setGlowIntensity] = useState<GlowIntensity>('vibrant');
  const [glassBlur, setGlassBlur] = useState<GlassBlur>('medium');
  
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [showDrawerSheet, setShowDrawerSheet] = useState(false);
  const [showRightCopilot, setShowRightCopilot] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Sidebar toggle states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  const [schedules, setSchedules] = useState<DaySchedule[]>(sampleTimetable);
  const [exams, setExams] = useState<ExamEvent[]>(sampleExams);
  const [notes, setNotes] = useState<NoteItem[]>(sampleNotes);
  const [nudges, setNudges] = useState<TwinNudge[]>(sampleTwinNudges);
  const [quiz, setQuiz] = useState<QuizData>(defaultQuiz);
  const [leaderboard] = useState<LeaderboardUser[]>(sampleLeaderboard);
  const [studyRooms] = useState<StudyRoom[]>(sampleStudyRooms);

  const activePalette = themePalettes[paletteId] || themePalettes.cyberpunk;

  const handleApplyTheme = (newPaletteId: PaletteId, dark: boolean, intensity: GlowIntensity, blur: GlassBlur) => {
    setPaletteId(newPaletteId);
    setDarkMode(dark);
    setGlowIntensity(intensity);
    setGlassBlur(blur);
  };

  const handleLogin = (updatedData: Partial<UserProfile> & { 
    avatar?: string;
    schedule?: DaySchedule[];
    quiz?: QuizData;
  }) => {
    setUser(prev => ({
      ...prev,
      name: updatedData.name || prev.name,
      avatarUrl: updatedData.avatarUrl || updatedData.avatar || prev.avatarUrl,
      stream: updatedData.stream || prev.stream,
      branch: updatedData.branch || prev.branch,
      targetExam: updatedData.targetExam || prev.targetExam,
      targetHours: updatedData.targetHours || prev.targetHours,
      subjects: updatedData.subjects || prev.subjects
    }));

    if (updatedData.schedule && updatedData.schedule.length > 0) {
      setSchedules(updatedData.schedule);
    }
    if (updatedData.quiz) {
      setQuiz(updatedData.quiz);
    }

    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const glowOpacityMap = {
    subtle: 'opacity-20',
    vibrant: 'opacity-35',
    intense: 'opacity-55',
  };

  return (
    <div 
      className={`min-h-screen font-sans antialiased selection:bg-violet-600 selection:text-white transition-colors duration-500 relative overflow-hidden flex flex-col`}
      style={{ backgroundColor: darkMode ? activePalette.darkBg : activePalette.lightBg, color: darkMode ? '#ffffff' : '#0f172a' }}
    >
      
      {/* Background Glow Effects from Active Theme Palette */}
      {darkMode && (
        <>
          <div 
            className={`fixed top-[-10%] left-[-10%] w-[45%] h-[45%] blur-[120px] rounded-full pointer-events-none z-0 transition-all duration-700 ${glowOpacityMap[glowIntensity]}`}
            style={{ backgroundColor: activePalette.primaryColor }}
          ></div>
          <div 
            className={`fixed bottom-[-10%] right-[-10%] w-[35%] h-[35%] blur-[100px] rounded-full pointer-events-none z-0 transition-all duration-700 ${glowOpacityMap[glowIntensity]}`}
            style={{ backgroundColor: activePalette.secondaryColor }}
          ></div>
        </>
      )}

      {/* Top Header Navbar */}
      <Navbar 
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenOnboarding={() => setShowAuthModal(true)}
        onOpenThemeCustomizer={() => setShowThemeCustomizer(true)}
        onToggleCopilot={() => setShowRightCopilot(prev => !prev)}
        onToggleSidebar={() => {
          if (window.innerWidth < 1024) {
            setIsSidebarMobileOpen(prev => !prev);
          } else {
            setIsSidebarCollapsed(prev => !prev);
          }
        }}
        activeTab={activeTab}
      />

      {/* Main Workspace Layout */}
      <div className="flex max-w-7xl mx-auto w-full min-h-[calc(100vh-65px)] z-10 relative">
        
        {/* Navigation Sidebar (Separate & Toggleable) */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenThemeCustomizer={() => setShowThemeCustomizer(true)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          isOpenMobile={isSidebarMobileOpen}
          onCloseMobile={() => setIsSidebarMobileOpen(false)}
          darkMode={darkMode}
        />

        {/* Dynamic Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {activeTab !== 'dashboard' && (
            <BackButtonHeader 
              onBack={() => setActiveTab('dashboard')} 
              title={activeTab.toUpperCase()}
              subtitle="SmartAI OS Navigation"
            />
          )}

          {activeTab === 'dashboard' && (
            <DashboardView 
              user={user}
              nudges={nudges}
              exams={exams}
              schedules={schedules}
              setActiveTab={setActiveTab}
              onStartQuiz={() => setActiveTab('quiz')}
              darkMode={darkMode}
            />
          )}

          {activeTab === 'proposal' && (
            <ProjectProposalModule />
          )}

          {activeTab === 'twin' && (
            <StudyTwinModule 
              user={user}
              nudges={nudges}
            />
          )}

          {activeTab === 'timetable' && (
            <TimetableModule 
              user={user}
              schedules={schedules}
              setSchedules={setSchedules}
              exams={exams}
            />
          )}

          {activeTab === 'assistant' && (
            <StudyAssistantModule 
              user={user}
            />
          )}

          {activeTab === 'notebook' && (
            <SmartNotebookModule 
              user={user}
              notes={notes}
              setNotes={setNotes}
            />
          )}

          {activeTab === 'voice' && (
            <VoiceCompanionModule 
              user={user}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizEngineModule 
              user={user}
              setUser={setUser}
              quiz={quiz}
            />
          )}

          {activeTab === 'gamification' && (
            <GamificationModule 
              user={user}
              setUser={setUser}
            />
          )}

          {activeTab === 'social' && (
            <SocialLearningModule 
              user={user}
              leaderboard={leaderboard}
              rooms={studyRooms}
            />
          )}

          {activeTab === 'wellness' && (
            <MentalWellnessModule 
              user={user}
            />
          )}

          {activeTab === 'career' && (
            <CareerModeModule 
              user={user}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboardModule 
              user={user}
            />
          )}

          {activeTab === 'contests' && (
            <BiWeeklyContestsModule 
              user={user}
              onStartBattle={() => setActiveTab('quiz')}
            />
          )}

          {activeTab === 'onboarding' && (
            <div className="p-8 text-center space-y-4">
              <h2 className="text-xl font-bold">AI Onboarding & Login Manager</h2>
              <p className="text-xs text-slate-400">Manage your avatar, target goals, and login profile</p>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg"
              >
                Open Scholar Login & Setup Portal
              </button>
            </div>
          )}
        </main>

      </div>

      {/* Floating Bottom Navigation Dock (5 Fixed Anchors) */}
      <FloatingBottomDock 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDrawer={() => setShowDrawerSheet(true)}
      />

      {/* Drawer Sheet Slide-out Modal */}
      <DrawerSheetModal 
        isOpen={showDrawerSheet}
        onClose={() => setShowDrawerSheet(false)}
        setActiveTab={setActiveTab}
        onOpenThemeCustomizer={() => setShowThemeCustomizer(true)}
        onOpenOnboarding={() => setShowAuthModal(true)}
      />

      {/* Initial Auth / Login Modal Screen */}
      {(!isLoggedIn || showAuthModal) && (
        <AuthLoginModal 
          isOpen={!isLoggedIn || showAuthModal}
          onLogin={handleLogin}
          darkMode={darkMode}
        />
      )}

      {/* Theme Customizer Modal Overlay */}
      {showThemeCustomizer && (
        <ThemeCustomizerModal 
          currentPaletteId={paletteId}
          darkMode={darkMode}
          glowIntensity={glowIntensity}
          glassBlur={glassBlur}
          onApplyTheme={handleApplyTheme}
          onClose={() => setShowThemeCustomizer(false)}
        />
      )}

      {/* Slide-out Right AI Copilot Drawer */}
      <RightAiCopilotSidebar 
        isOpen={showRightCopilot}
        onClose={() => setShowRightCopilot(false)}
        user={user}
      />

    </div>
  );
}
