import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Layers,
  Activity,
  FileText,
  Award,
  ChevronRight,
  Code2
} from 'lucide-react';
import { BENCHMARK_TITLES } from '../../data/benchmarkTitles';

interface LandingViewProps {
  onNavigate: (tabId: string, payload?: { title?: string; idea?: string }) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const [quickInput, setQuickInput] = useState('');

  const sampleTitles = [
    'A Smart System for School Management',
    'Automated Classroom Scheduling and Conflict Resolution System',
    'Mobile-Assisted Plant Foliar Disease Classification via CNN',
    'IoT-Based Aquaponics Water Quality Telemetry Node',
  ];

  const handleQuickAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onNavigate('analyzer', { title: quickInput.trim() });
    } else {
      onNavigate('analyzer');
    }
  };

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.navy.50),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,#1e293b,#020617)] opacity-70 dark:opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-navy-50 dark:bg-navy-950/80 text-navy-800 dark:text-navy-300 border border-navy-200 dark:border-navy-800 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-navy-600 dark:text-navy-400" />
            <span>Open Source Academic Research Platform & Defense Preparation</span>
          </div>

          {/* Headlines */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-academic-950 dark:text-academic-50 font-serif tracking-tight leading-[1.15]">
              Generate Smarter Capstone Titles with AI
            </h1>
            <p className="text-base sm:text-xl text-academic-600 dark:text-academic-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Transform your ideas into research-ready, feasible, and academically structured capstone project titles.
            </p>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('generator')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white font-semibold text-sm shadow-academic flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-navy-300" />
              <span>Generate Title</span>
              <ArrowRight className="w-4 h-4 text-navy-300" />
            </button>
            <button
              onClick={() => onNavigate('analyzer')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-academic-900 hover:bg-academic-50 dark:hover:bg-academic-800 text-academic-800 dark:text-academic-200 font-semibold text-sm border border-academic-300 dark:border-academic-700 shadow-academic-sm flex items-center justify-center gap-2 transition-all hover:border-academic-400"
            >
              <Search className="w-4 h-4 text-academic-600 dark:text-academic-400" />
              <span>Analyze Existing Title</span>
            </button>
          </div>

          {/* Interactive Visual Representation Sandbox */}
          <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic-lg text-left transition-colors">
            <div className="flex items-center justify-between pb-4 border-b border-academic-100 dark:border-academic-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono font-medium text-academic-500 dark:text-academic-400">
                  AI Title Verification Sandbox
                </span>
              </div>
              <span className="text-[11px] font-semibold text-navy-700 dark:text-navy-300 bg-navy-50 dark:bg-navy-950/80 px-2 py-0.5 rounded border border-navy-200 dark:border-navy-800">
                Live Heuristic Engine
              </span>
            </div>

            <form onSubmit={handleQuickAnalyze} className="mt-4 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  placeholder="Paste any proposed capstone title to test... (e.g. 'Smart School System')"
                  className="w-full pl-3 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-academic-300 dark:border-academic-700 focus:outline-none focus:ring-2 focus:ring-navy-600 bg-academic-50/60 dark:bg-academic-850 dark:text-academic-100 placeholder:text-academic-400"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-navy-700 dark:bg-navy-600 hover:bg-navy-800 dark:hover:bg-navy-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Run Analysis</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick click suggestions */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-academic-500 dark:text-academic-400">
              <span className="text-[11px] font-medium text-academic-400 dark:text-academic-500">Try testing:</span>
              {sampleTitles.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuickInput(t);
                    onNavigate('analyzer', { title: t });
                  }}
                  className="px-2.5 py-1 rounded-md text-[11px] bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-700 dark:text-academic-300 transition-colors border border-academic-200 dark:border-academic-700 truncate max-w-[240px]"
                >
                  &quot;{t}&quot;
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Major Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-navy-700 dark:text-navy-400 tracking-widest uppercase">
            Defense-Grade Capabilities
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-academic-950 dark:text-academic-50 font-serif">
            Everything Required to Formulate & Defend a University Capstone
          </p>
          <p className="text-sm text-academic-600 dark:text-academic-400 max-w-xl mx-auto">
            Combines natural language analysis, software architectural patterns, and academic research rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div
            onClick={() => onNavigate('generator')}
            className="p-6 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-navy-300 dark:hover:border-navy-700 hover:shadow-academic transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center group-hover:bg-navy-800 dark:group-hover:bg-navy-600 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-academic-900 dark:text-academic-100 font-serif">
              AI Title Generation
            </h3>
            <p className="text-xs text-academic-600 dark:text-academic-400 leading-relaxed">
              Generate 5–10 academically structured capstone titles from a project idea with varied paradigms: Decision Support, Machine Learning, IoT, or Usability Evaluation.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            onClick={() => onNavigate('analyzer')}
            className="p-6 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-navy-300 dark:hover:border-navy-700 hover:shadow-academic transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center group-hover:bg-navy-800 dark:group-hover:bg-navy-600 group-hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-academic-900 dark:text-academic-100 font-serif">
              Intelligent Title Analysis
            </h3>
            <p className="text-xs text-academic-600 dark:text-academic-400 leading-relaxed">
              Analyze clarity, specificity, feasibility, relevance, and scope with 10 visual indicators, problem diagnostic alerts, and 4 refined revisions.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            onClick={() => onNavigate('conflict')}
            className="p-6 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-navy-300 dark:hover:border-navy-700 hover:shadow-academic transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center group-hover:bg-navy-800 dark:group-hover:bg-navy-600 group-hover:text-white transition-colors">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-academic-900 dark:text-academic-100 font-serif">
              Conflict & Similarity Detection
            </h3>
            <p className="text-xs text-academic-600 dark:text-academic-400 leading-relaxed">
              Cross-check against a repository of 100+ approved capstone projects to flag potential thematic duplication and identify distinguishing differences.
            </p>
          </div>

          {/* Feature 4 */}
          <div
            onClick={() => onNavigate('concept')}
            className="p-6 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-navy-300 dark:hover:border-navy-700 hover:shadow-academic transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center group-hover:bg-navy-800 dark:group-hover:bg-navy-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-academic-900 dark:text-academic-100 font-serif">
              Idea → Complete Concept Blueprint
            </h3>
            <p className="text-xs text-academic-600 dark:text-academic-400 leading-relaxed">
              Transform a simple thought into a complete capstone blueprint: Problem Statement, Core Modules, Database Entities, Scope suggestions, and Limitations.
            </p>
          </div>

          {/* Feature 5 */}
          <div
            onClick={() => onNavigate('feasibility')}
            className="p-6 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-navy-300 dark:hover:border-navy-700 hover:shadow-academic transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center group-hover:bg-navy-800 dark:group-hover:bg-navy-600 group-hover:text-white transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-academic-900 dark:text-academic-100 font-serif">
              Project Feasibility Analysis
            </h3>
            <p className="text-xs text-academic-600 dark:text-academic-400 leading-relaxed">
              Determine whether the proposed project is realistically achievable within a 1-semester or 2-semester academic timeline based on required hardware, APIs, and datasets.
            </p>
          </div>

          {/* Feature 6 */}
          <div
            onClick={() => onNavigate('comparison')}
            className="p-6 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-navy-300 dark:hover:border-navy-700 hover:shadow-academic transition-all cursor-pointer group space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center group-hover:bg-navy-800 dark:group-hover:bg-navy-600 group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-academic-900 dark:text-academic-100 font-serif">
              Multi-Title Comparison Matrix
            </h3>
            <p className="text-xs text-academic-600 dark:text-academic-400 leading-relaxed">
              Place candidate titles side-by-side to contrast clarity, technical depth, research potential, and trade-offs before finalizing your committee submission.
            </p>
          </div>
        </div>
      </section>

      {/* Benchmark Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xs font-bold text-navy-700 dark:text-navy-400 tracking-widest uppercase">
              Approved Benchmark Library
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-academic-950 dark:text-academic-50 font-serif">
              Recent Approved Titles Across Disciplines
            </p>
          </div>
          <button
            onClick={() => onNavigate('conflict')}
            className="text-xs font-semibold text-navy-700 dark:text-navy-400 hover:text-navy-900 dark:hover:text-navy-200 flex items-center gap-1"
          >
            <span>Search full repository ({BENCHMARK_TITLES.length}+ titles)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BENCHMARK_TITLES.slice(0, 4).map((bench) => (
            <div
              key={bench.id}
              className="p-5 rounded-xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-academic-300 dark:hover:border-academic-700 shadow-academic-sm space-y-3"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-navy-700 dark:text-navy-300 bg-navy-50 dark:bg-navy-950/80 px-2 py-0.5 rounded border border-navy-100 dark:border-navy-800">
                  {bench.program}
                </span>
                <span className="text-academic-500 dark:text-academic-400 font-mono">
                  {bench.institution} • {bench.year}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-academic-900 dark:text-academic-100 leading-snug">
                &quot;{bench.title}&quot;
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {bench.keywords.slice(0, 3).map((kw, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-academic-100 dark:bg-academic-800 text-academic-600 dark:text-academic-300"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-academic-100 dark:border-academic-800 flex items-center justify-between text-xs">
                <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Status: {bench.status}
                </span>
                <button
                  onClick={() => onNavigate('analyzer', { title: bench.title })}
                  className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200 font-medium hover:underline text-[11px]"
                >
                  Analyze Structure →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Defense Preparation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-academic-900 dark:bg-academic-850 text-white relative overflow-hidden shadow-academic-lg border border-academic-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-navy-200 border border-white/20">
              <Award className="w-3.5 h-3.5" />
              <span>Free & Open Source for Education</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
              Ready to Formulate Your Capstone Title?
            </h3>
            <p className="text-sm text-academic-300 leading-relaxed">
              Step into the generator with your general idea, and receive mathematically structured candidates, feasibility ratings, and defense-ready justification reports in minutes.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('generator')}
                className="px-5 py-2.5 rounded-xl bg-navy-600 hover:bg-navy-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <span>Launch Title Generator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('concept')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
              >
                Idea Planner Blueprint
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
