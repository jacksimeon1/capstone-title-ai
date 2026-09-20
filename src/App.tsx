import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ChatAssistant } from './components/common/ChatAssistant';
import { LandingView } from './components/landing/LandingView';
import { GeneratorView } from './components/generator/GeneratorView';
import { AnalyzerView } from './components/analyzer/AnalyzerView';
import { ConflictDetectorView } from './components/conflict/ConflictDetectorView';
import { ConceptPlannerView } from './components/concept/ConceptPlannerView';
import { FeasibilityView } from './components/feasibility/FeasibilityView';
import { TitleComparisonView } from './components/comparison/TitleComparisonView';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { GeneratedTitleCandidate } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  // Theme Management: Default to Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('capstone_ai_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true; // Default is dark mode when opening the website
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('capstone_ai_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('capstone_ai_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Cross-view navigation context payload
  const [navTitle, setNavTitle] = useState<string>('');
  const [navIdea, setNavIdea] = useState<string>('');

  // Multi-title comparison array
  const [comparedCandidates, setComparedCandidates] = useState<GeneratedTitleCandidate[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleNavigate = (tabId: string, payload?: { title?: string; idea?: string }) => {
    if (payload?.title) setNavTitle(payload.title);
    if (payload?.idea) setNavIdea(payload.idea);
    setActiveTab(tabId);
  };

  const handleAddToCompare = (candidate: GeneratedTitleCandidate) => {
    if (!comparedCandidates.some((c) => c.id === candidate.id)) {
      if (comparedCandidates.length >= 4) {
        alert('You can compare a maximum of 4 titles at once. Remove one to add another.');
        return;
      }
      setComparedCandidates((prev) => [...prev, candidate]);
    }
    setActiveTab('comparison');
  };

  const handleRemoveFromCompare = (id: string) => {
    setComparedCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-academic-50 dark:bg-academic-950 text-academic-900 dark:text-academic-100 font-sans selection:bg-navy-100 dark:selection:bg-navy-900 selection:text-navy-900 dark:selection:text-navy-100 transition-colors duration-200">
      {/* Header with Dark Mode Toggle and Open Source Info */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'landing' && <LandingView onNavigate={handleNavigate} />}

        {activeTab === 'generator' && (
          <GeneratorView
            onNavigate={handleNavigate}
            onAddToCompare={handleAddToCompare}
            comparedIds={comparedCandidates.map((c) => c.id)}
          />
        )}

        {activeTab === 'analyzer' && (
          <AnalyzerView
            initialTitle={navTitle}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'conflict' && (
          <ConflictDetectorView
            initialTitle={navTitle}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'concept' && (
          <ConceptPlannerView
            initialIdea={navIdea || navTitle}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'feasibility' && (
          <FeasibilityView
            initialTitle={navTitle}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'comparison' && (
          <TitleComparisonView
            candidatesToCompare={comparedCandidates}
            onRemoveCandidate={handleRemoveFromCompare}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'dashboard' && (
          <UserDashboard
            onNavigate={handleNavigate}
            onAddToCompare={handleAddToCompare}
          />
        )}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Slide-Over Capstone AI Assistant */}
      <ChatAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        activeContext={navTitle || navIdea}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
