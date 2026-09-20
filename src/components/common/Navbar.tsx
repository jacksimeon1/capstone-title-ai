import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Search,
  ShieldAlert,
  FileText,
  Activity,
  Layers,
  Bookmark,
  Database,
  Bot,
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  GitBranch
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  onToggleTheme,
  onOpenAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'generator', label: 'Generator', shortLabel: 'Generator', icon: Sparkles },
    { id: 'analyzer', label: 'Analyzer', shortLabel: 'Analyzer', icon: Search },
    { id: 'conflict', label: 'Conflict Check', shortLabel: 'Conflicts', icon: ShieldAlert },
    { id: 'concept', label: 'Concept Blueprint', shortLabel: 'Blueprint', icon: FileText },
    { id: 'feasibility', label: 'Feasibility', shortLabel: 'Feasibility', icon: Activity },
    { id: 'comparison', label: 'Compare', shortLabel: 'Compare', icon: Layers },
    { id: 'dashboard', label: 'Saved Work', shortLabel: 'Saved', icon: Bookmark },
    { id: 'admin', label: 'Repository', shortLabel: 'Repository', icon: Database },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-academic-950/95 backdrop-blur-md border-b border-academic-200 dark:border-academic-800 transition-colors duration-200">
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand */}
          <div
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-navy-800 dark:bg-navy-700 text-white flex items-center justify-center shadow-academic-sm group-hover:bg-navy-700 dark:group-hover:bg-navy-600 transition-colors shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-navy-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-academic-950 dark:text-academic-50 font-serif whitespace-nowrap">
                  CAPSTONE TITLE AI
                </span>
                <span className="hidden 2xl:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap">
                  <Code2 className="w-3 h-3" />
                  Open Source
                </span>
              </div>
              <p className="text-[10px] text-academic-500 dark:text-academic-400 font-medium hidden 2xl:block whitespace-nowrap">
                Academic Research Platform & Title Validator
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 shrink mx-1 xl:mx-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={item.label}
                  className={`flex items-center gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 font-semibold border border-navy-200 dark:border-navy-800 shadow-sm'
                      : 'text-academic-600 dark:text-academic-300 hover:text-academic-900 dark:hover:text-white hover:bg-academic-100 dark:hover:bg-academic-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-navy-600 dark:text-navy-400' : 'text-academic-400 dark:text-academic-500'}`} />
                  <span className="hidden 2xl:inline">{item.label}</span>
                  <span className="2xl:hidden">{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Dark Mode Toggle, AI Advisor, GitHub */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-academic-100 dark:bg-academic-800 text-academic-700 dark:text-academic-200 hover:bg-academic-200 dark:hover:bg-academic-700 border border-academic-200 dark:border-academic-700 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-academic-700" />
              )}
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-700 text-academic-800 dark:text-academic-200 transition-colors border border-academic-300 dark:border-academic-700 whitespace-nowrap"
              title="Open Capstone AI Research Advisor"
            >
              <Bot className="w-4 h-4 text-navy-600 dark:text-navy-400" />
              <span className="hidden sm:inline">AI Advisor</span>
            </button>

            {/* Open Source GitHub Badge */}
            <a
              href="https://github.com/jacksimeon1/capstone-title-ai"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-academic-200 dark:border-academic-750 bg-white dark:bg-academic-900 hover:bg-academic-50 dark:hover:bg-academic-850 text-academic-700 dark:text-academic-300 text-xs font-medium transition-colors whitespace-nowrap"
              title="View Open Source Project"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="hidden xl:inline">GitHub</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-academic-600 dark:text-academic-300 hover:bg-academic-100 dark:hover:bg-academic-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 px-4 pt-3 pb-5 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-navy-50 dark:bg-navy-950 text-navy-800 dark:text-navy-200 font-semibold border border-navy-200 dark:border-navy-800'
                      : 'text-academic-700 dark:text-academic-300 hover:bg-academic-100 dark:hover:bg-academic-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-navy-600 dark:text-navy-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-academic-100 dark:border-academic-800 flex items-center justify-between text-xs">
            <span className="text-academic-500 dark:text-academic-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Client-Side & Open Source</span>
            </span>
            <button
              onClick={onToggleTheme}
              className="px-2.5 py-1 text-xs font-medium text-academic-700 dark:text-academic-200 bg-academic-100 dark:bg-academic-800 rounded-lg flex items-center gap-1.5"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
