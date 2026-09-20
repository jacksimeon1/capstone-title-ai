import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Search,
  ShieldAlert,
  Activity,
  Bookmark,
  Trash2,
  Clock,
  FileDown,
  ArrowRight,
  FolderOpen,
  HardDrive,
  ShieldCheck
} from 'lucide-react';
import { GeneratedTitleCandidate, Project, TitleAnalysisResult } from '../../types';
import { storageService } from '../../services/storageService';
import { exportService } from '../../services/exportService';

interface UserDashboardProps {
  onNavigate: (tabId: string, payload?: { title?: string; idea?: string }) => void;
  onAddToCompare: (candidate: GeneratedTitleCandidate) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  onNavigate,
  onAddToCompare,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [savedTitles, setSavedTitles] = useState<GeneratedTitleCandidate[]>([]);
  const [analysisHistory, setAnalysisHistory] = useState<TitleAnalysisResult[]>([]);

  useEffect(() => {
    setProjects(storageService.getProjects());
    setSavedTitles(storageService.getSavedTitles());
    setAnalysisHistory(storageService.getAnalysisHistory());
  }, []);

  const handleDeleteProject = (id: string) => {
    storageService.deleteProject(id);
    setProjects(storageService.getProjects());
  };

  const handleRemoveSavedTitle = (title: string) => {
    storageService.removeSavedTitle(title);
    setSavedTitles(storageService.getSavedTitles());
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Workspace Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-academic-900 via-navy-950 to-academic-950 dark:from-academic-950 dark:via-navy-950 dark:to-academic-900 text-white rounded-3xl shadow-academic-lg border border-academic-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-navy-300 text-xs font-semibold uppercase tracking-wider">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>Open Source Academic Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Saved Research & Defense Workspace
          </h1>
          <p className="text-xs sm:text-sm text-academic-300 max-w-xl">
            Zero accounts or login required. All your generated titles, blueprints, diagnostic evaluations, and benchmarks are preserved locally in your browser.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigate('generator')}
            className="px-4 py-2.5 rounded-xl bg-navy-600 hover:bg-navy-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate New Title</span>
          </button>
          <button
            onClick={() => onNavigate('analyzer')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Analyze Existing</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm space-y-1">
          <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
            Projects Created
          </span>
          <div className="text-2xl font-extrabold text-academic-950 dark:text-academic-50 font-serif">
            {projects.length}
          </div>
          <p className="text-[11px] text-academic-400 dark:text-academic-500">Active research concepts</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm space-y-1">
          <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
            Saved / Favorited Titles
          </span>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-serif">
            {savedTitles.length}
          </div>
          <p className="text-[11px] text-academic-400 dark:text-academic-500">Bookmarked for defense</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm space-y-1">
          <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
            Titles Analyzed
          </span>
          <div className="text-2xl font-extrabold text-navy-700 dark:text-navy-300 font-serif">
            {analysisHistory.length}
          </div>
          <p className="text-[11px] text-academic-400 dark:text-academic-500">Diagnostic evaluations</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm space-y-1">
          <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
            Repository Benchmarks
          </span>
          <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-serif">
            {storageService.getBenchmarkTitles().length}
          </div>
          <p className="text-[11px] text-academic-400 dark:text-academic-500">Approved university titles</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
          Quick Launch Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => onNavigate('generator')}
            className="p-4 rounded-xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:bg-navy-50/50 dark:hover:bg-academic-800 hover:border-navy-300 dark:hover:border-academic-700 text-left transition-all space-y-1 group"
          >
            <Sparkles className="w-4 h-4 text-navy-600 dark:text-navy-400 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-academic-900 dark:text-academic-100">Title Generator</div>
            <div className="text-[11px] text-academic-500 dark:text-academic-400">Synthesize 5–10 titles</div>
          </button>

          <button
            onClick={() => onNavigate('analyzer')}
            className="p-4 rounded-xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:bg-navy-50/50 dark:hover:bg-academic-800 hover:border-navy-300 dark:hover:border-academic-700 text-left transition-all space-y-1 group"
          >
            <Search className="w-4 h-4 text-navy-600 dark:text-navy-400 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-academic-900 dark:text-academic-100">Title Analyzer</div>
            <div className="text-[11px] text-academic-500 dark:text-academic-400">Evaluate 10 metrics</div>
          </button>

          <button
            onClick={() => onNavigate('conflict')}
            className="p-4 rounded-xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:bg-navy-50/50 dark:hover:bg-academic-800 hover:border-navy-300 dark:hover:border-academic-700 text-left transition-all space-y-1 group"
          >
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-academic-900 dark:text-academic-100">Detect Conflicts</div>
            <div className="text-[11px] text-academic-500 dark:text-academic-400">Compare with prior art</div>
          </button>

          <button
            onClick={() => onNavigate('feasibility')}
            className="p-4 rounded-xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:bg-navy-50/50 dark:hover:bg-academic-800 hover:border-navy-300 dark:hover:border-academic-700 text-left transition-all space-y-1 group"
          >
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-academic-900 dark:text-academic-100">Feasibility Check</div>
            <div className="text-[11px] text-academic-500 dark:text-academic-400">Assess timeline risk</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Projects */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-navy-600 dark:text-navy-400" />
              <span>Recent Research Projects ({projects.length})</span>
            </h2>
          </div>

          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 text-center space-y-2">
                <FolderOpen className="w-8 h-8 text-academic-300 dark:text-academic-600 mx-auto" />
                <p className="text-xs text-academic-500 dark:text-academic-400">No saved projects yet. Generate titles or create a blueprint to see them here.</p>
                <button
                  onClick={() => onNavigate('generator')}
                  className="px-3 py-1.5 rounded-lg bg-navy-600 text-white text-xs font-semibold hover:bg-navy-500"
                >
                  Start Project Generation
                </button>
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm hover:border-academic-300 dark:hover:border-academic-700 transition-all space-y-3 text-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-academic-900 dark:text-academic-100 text-sm font-serif">
                          {proj.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-academic-100 dark:bg-academic-800 text-academic-700 dark:text-academic-300 font-semibold border border-academic-200 dark:border-academic-700">
                          {proj.program}
                        </span>
                      </div>
                      <p className="text-academic-500 dark:text-academic-400 text-[11px] line-clamp-2">
                        {proj.idea}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="text-academic-400 hover:text-rose-600 dark:hover:text-rose-400 p-1"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-academic-100 dark:border-academic-800 text-[11px]">
                    <span className="text-academic-400 font-mono">
                      Updated: {new Date(proj.updatedAt).toLocaleDateString()}
                    </span>
                    <span className="text-academic-300 dark:text-academic-700">•</span>
                    <span className="text-academic-600 dark:text-academic-300 font-medium">
                      Type: {proj.projectType}
                    </span>
                  </div>

                  {/* Project Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onNavigate('generator', { idea: proj.idea })}
                      className="px-2.5 py-1 rounded-lg bg-navy-50 dark:bg-navy-950/60 hover:bg-navy-100 dark:hover:bg-navy-900 text-navy-800 dark:text-navy-300 text-[11px] font-semibold flex items-center gap-1 transition-colors border border-navy-200 dark:border-navy-800"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Generate Alternatives</span>
                    </button>
                    <button
                      onClick={() => onNavigate('analyzer', { title: proj.savedTitles[0] || proj.name })}
                      className="px-2.5 py-1 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-700 text-academic-800 dark:text-academic-200 text-[11px] font-medium flex items-center gap-1 transition-colors"
                    >
                      <Search className="w-3 h-3" />
                      <span>Analyze</span>
                    </button>
                    <button
                      onClick={() =>
                        exportService.downloadPdf({
                          projectIdea: proj.idea,
                          generatedTitles: proj.generatedTitles,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-700 text-academic-800 dark:text-academic-200 text-[11px] font-medium flex items-center gap-1 transition-colors"
                    >
                      <FileDown className="w-3 h-3" />
                      <span>Export PDF</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Bookmarked Titles & Analysis History */}
        <div className="lg:col-span-5 space-y-6">
          {/* Bookmarked / Saved Titles */}
          <div className="bg-white dark:bg-academic-900 p-5 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-3">
            <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Saved / Favorite Titles ({savedTitles.length})</span>
            </h2>

            {savedTitles.length === 0 ? (
              <p className="text-xs text-academic-400 dark:text-academic-500 py-3 text-center italic">
                No titles favorited yet. Click the bookmark icon in the Title Generator to save candidates here.
              </p>
            ) : (
              <div className="space-y-2.5">
                {savedTitles.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-serif font-bold text-academic-900 dark:text-academic-100 text-xs leading-snug">
                        &quot;{item.title}&quot;
                      </p>
                      <button
                        onClick={() => handleRemoveSavedTitle(item.title)}
                        className="text-academic-400 hover:text-rose-600 dark:hover:text-rose-400 shrink-0"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-academic-200/60 dark:border-academic-700">
                      <span className="text-navy-700 dark:text-navy-300 font-semibold">{item.paradigm}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onAddToCompare(item)}
                          className="text-academic-600 dark:text-academic-300 hover:text-navy-700 dark:hover:text-navy-300 font-medium"
                        >
                          + Compare
                        </button>
                        <button
                          onClick={() => onNavigate('analyzer', { title: item.title })}
                          className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-300 font-medium"
                        >
                          Analyze →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Analysis History */}
          <div className="bg-white dark:bg-academic-900 p-5 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-3">
            <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
              <Clock className="w-4 h-4 text-navy-600 dark:text-navy-400" />
              <span>Recent Diagnostic History ({analysisHistory.length})</span>
            </h2>

            {analysisHistory.length === 0 ? (
              <p className="text-xs text-academic-400 dark:text-academic-500 py-3 text-center italic">
                No analyses completed yet.
              </p>
            ) : (
              <div className="space-y-2 text-xs">
                {analysisHistory.slice(0, 4).map((hist) => (
                  <div
                    key={hist.id}
                    onClick={() => onNavigate('analyzer', { title: hist.title })}
                    className="p-2.5 rounded-xl hover:bg-academic-50 dark:hover:bg-academic-800 border border-transparent hover:border-academic-200 dark:hover:border-academic-700 cursor-pointer transition-colors flex items-center justify-between gap-2"
                  >
                    <div className="truncate flex-1">
                      <span className="font-serif font-medium text-academic-900 dark:text-academic-100 block truncate">
                        &quot;{hist.title}&quot;
                      </span>
                      <span className="text-[10px] text-academic-400 dark:text-academic-500">
                        Score: {hist.qualityMetrics.overallQuality}% • {hist.problemsDetected.length} weaknesses flagged
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-academic-400 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
