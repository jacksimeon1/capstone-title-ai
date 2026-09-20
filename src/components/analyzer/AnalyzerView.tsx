import React, { useState, useEffect } from 'react';
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  FileDown,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import type { TitleAnalysisResult } from '../../types';
import { analyzeExistingTitle } from '../../services/titleAnalyzerEngine';
import { storageService } from '../../services/storageService';
import { exportService } from '../../services/exportService';
import { MetricBar } from '../common/MetricBar';

interface AnalyzerViewProps {
  initialTitle?: string;
  onNavigate: (tabId: string, payload?: { title?: string; idea?: string }) => void;
}

export const AnalyzerView: React.FC<AnalyzerViewProps> = ({
  initialTitle = '',
  onNavigate,
}) => {
  const [inputTitle, setInputTitle] = useState(
    initialTitle || 'A Smart System for School Management'
  );
  const [analysis, setAnalysis] = useState<TitleAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const sampleInputs = [
    'A Smart System for School Management',
    'Online Attendance System',
    'AI-Based Plant Disease Detection System for Tomato Leaves',
    'Smart Hospital System',
    'Web-Based Automated Classroom Scheduling and Conflict Detection Information System',
  ];

  const runAnalysis = (titleToAnalyze?: string) => {
    const title = (titleToAnalyze || inputTitle).trim();
    if (!title) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeExistingTitle(title);
      setAnalysis(result);
      storageService.addAnalysisResult(result);
      setIsAnalyzing(false);
    }, 500);
  };

  useEffect(() => {
    if (initialTitle) {
      setInputTitle(initialTitle);
      runAnalysis(initialTitle);
    } else {
      runAnalysis();
    }
  }, [initialTitle]);

  const copyRevision = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-navy-700 dark:text-navy-400 uppercase tracking-wider">
          <Search className="w-4 h-4 text-navy-600 dark:text-navy-400" />
          <span>Academic Title Quality & Weakness Diagnostics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-950 dark:text-academic-50 font-serif">
          Analyze Existing Proposed Title
        </h1>
        <p className="text-xs sm:text-sm text-academic-600 dark:text-academic-400 max-w-3xl">
          Evaluate syntactic clarity, domain specificity, target users, research variables, and 10 visual academic quality indicators.
        </p>
      </div>

      {/* Input Box Bar */}
      <div className="p-5 sm:p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runAnalysis();
          }}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder="Paste or enter a proposed capstone title to evaluate..."
              className="w-full pl-3.5 pr-4 py-3 text-xs sm:text-sm rounded-xl border border-academic-300 dark:border-academic-700 focus:outline-none focus:ring-2 focus:ring-navy-600 bg-academic-50/50 dark:bg-academic-850 dark:text-academic-100 placeholder:text-academic-400"
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzing || !inputTitle.trim()}
            className="px-6 py-3 rounded-xl bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white font-semibold text-xs sm:text-sm shadow-academic flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Search className="w-4 h-4 text-navy-300" />
            <span>{isAnalyzing ? 'Analyzing Title Structure...' : 'Analyze Title'}</span>
          </button>
        </form>

        {/* Quick test buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-academic-500 dark:text-academic-400">
          <span className="text-[11px] font-medium text-academic-400 dark:text-academic-500">Quick tests:</span>
          {sampleInputs.map((sample, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setInputTitle(sample);
                runAnalysis(sample);
              }}
              className="px-2.5 py-1 rounded-md text-[11px] bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-700 dark:text-academic-300 transition-colors border border-academic-200 dark:border-academic-700 truncate max-w-[220px]"
            >
              &quot;{sample}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Results Workspace */}
      {analysis && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Metric Overview Bar */}
          <div className="p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider">
                Overall Defense Viability Score
              </span>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-4xl font-extrabold font-serif text-academic-950 dark:text-academic-50">
                  {analysis.qualityMetrics.overallQuality}%
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-navy-50 dark:bg-navy-950/80 text-navy-800 dark:text-navy-300 border border-navy-200 dark:border-navy-800">
                  {analysis.qualityMetrics.overallQuality >= 80
                    ? 'Well-Structured Title'
                    : analysis.qualityMetrics.overallQuality >= 60
                    ? 'Moderate Revision Advised'
                    : 'Substantial Weakness Detected'}
                </span>
              </div>
              <p className="text-[11px] text-academic-500 dark:text-academic-400 max-w-lg">
                Weighted composite across clarity, specificity, research potential, feasibility, and delimitation.
              </p>
            </div>

            {/* Quick action buttons on current analyzed title */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => onNavigate('conflict', { title: analysis.title })}
                className="px-3 py-2 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-academic-300 dark:border-academic-700"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Check Conflicts</span>
              </button>

              <button
                onClick={() => onNavigate('concept', { idea: analysis.title })}
                className="px-3 py-2 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-academic-300 dark:border-academic-700"
              >
                <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Generate Blueprint</span>
              </button>

              {/* Export Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setExportMenuOpen(!exportMenuOpen)}
                  className="px-3.5 py-2 rounded-lg bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-academic transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5 text-navy-300" />
                  <span>Export Report</span>
                </button>

                {exportMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-academic-850 rounded-xl shadow-academic-lg border border-academic-200 dark:border-academic-700 py-1.5 z-30 text-xs">
                    <button
                      onClick={() => {
                        exportService.downloadPdf({ analysisResult: analysis, projectIdea: inputTitle });
                        setExportMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-academic-100 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 font-medium"
                    >
                      Download PDF Document
                    </button>
                    <button
                      onClick={() => {
                        exportService.downloadMarkdown({ analysisResult: analysis, projectIdea: inputTitle });
                        setExportMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-academic-100 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 font-medium"
                    >
                      Download Markdown (.md)
                    </button>
                    <button
                      onClick={() => {
                        exportService.downloadTxt({ analysisResult: analysis, projectIdea: inputTitle });
                        setExportMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-academic-100 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 font-medium"
                    >
                      Download Plain Text (.txt)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Problems / Ambiguities Detected */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Diagnostic Weaknesses Detected ({analysis.problemsDetected.length})</span>
            </h2>

            {analysis.problemsDetected.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>No severe structural ambiguities or buzzword red flags were detected in this title.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysis.problemsDetected.map((prob) => (
                  <div
                    key={prob.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      prob.severity === 'high'
                        ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200'
                        : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-white/80 dark:bg-academic-800 border border-black/10 dark:border-white/10">
                        {prob.type}
                      </span>
                      <span className="text-[10px] font-semibold uppercase">
                        Severity: {prob.severity}
                      </span>
                    </div>
                    <p className="leading-relaxed font-medium">{prob.description}</p>
                    <div className="pt-2 border-t border-black/5 dark:border-white/10 text-[11px] opacity-90">
                      <span className="font-semibold">Recommendation: </span>
                      {prob.suggestion}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Research Structure Extraction */}
          <div className="bg-white dark:bg-academic-900 p-6 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
            <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
              Research Structure Extraction
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1">
                <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider">
                  Problem Domain
                </span>
                <p className="font-semibold text-academic-900 dark:text-academic-100">{analysis.structure.domain}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1">
                <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider">
                  System Delivery Type
                </span>
                <p className="font-semibold text-academic-900 dark:text-academic-100">{analysis.structure.systemType}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1">
                <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider">
                  Target Beneficiaries
                </span>
                <p className="font-semibold text-academic-900 dark:text-academic-100">{analysis.structure.targetUsers}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1 sm:col-span-2 lg:col-span-1">
                <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider">
                  Candidate Technologies
                </span>
                <div className="flex flex-wrap gap-1 pt-1">
                  {analysis.structure.technologies.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-academic-800 border border-academic-200 dark:border-academic-700 text-[11px] font-mono text-academic-700 dark:text-academic-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1 sm:col-span-2">
                <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider">
                  Research Variables Identified
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-academic-400 dark:text-academic-500 font-medium block">Independent Variables:</span>
                    <ul className="list-disc list-inside text-academic-700 dark:text-academic-300">
                      {analysis.structure.researchVariables.independent.map((v, i) => (
                        <li key={i} className="truncate">{v}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-academic-400 dark:text-academic-500 font-medium block">Dependent Variables:</span>
                    <ul className="list-disc list-inside text-academic-700 dark:text-academic-300">
                      {analysis.structure.researchVariables.dependent.map((v, i) => (
                        <li key={i} className="truncate">{v}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section: 10 Visual Title Quality Indicators */}
          <div className="bg-white dark:bg-academic-900 p-6 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-2 border-b border-academic-100 dark:border-academic-800">
              <div>
                <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
                  10-Point Academic Quality Indicators
                </h2>
                <p className="text-[11px] text-academic-500 dark:text-academic-400">
                  Visual diagnostic meters calibrated against university capstone grading rubrics.
                </p>
              </div>
              <span className="text-[10px] font-mono text-academic-400 dark:text-academic-500">
                *AI-assisted diagnostic estimates
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              <MetricBar
                label="1. Syntactic Clarity"
                value={analysis.qualityMetrics.clarity}
                subtitle="Unambiguous grammatical structure without colloquialisms."
              />
              <MetricBar
                label="2. Domain Specificity"
                value={analysis.qualityMetrics.specificity}
                subtitle="Explicitly names the distinct operational subdomain."
              />
              <MetricBar
                label="3. Scope Delimitation"
                value={analysis.qualityMetrics.scope}
                subtitle="Realistically bounded to prevent open-ended sprawl."
              />
              <MetricBar
                label="4. Student Feasibility"
                value={analysis.qualityMetrics.feasibility}
                subtitle="Achievable within a standard university thesis timeline."
              />
              <MetricBar
                label="5. Technical Depth"
                value={analysis.qualityMetrics.technicalDepth}
                subtitle="Exhibits software engineering or algorithmic substance."
              />
              <MetricBar
                label="6. Problem Relevance"
                value={analysis.qualityMetrics.problemRelevance}
                subtitle="Addresses a concrete, verifiable stakeholder pain point."
              />
              <MetricBar
                label="7. Target User Definition"
                value={analysis.qualityMetrics.targetUserDefinition}
                subtitle="Explicitly identifies the primary system beneficiaries."
              />
              <MetricBar
                label="8. Innovation & Novelty"
                value={analysis.qualityMetrics.innovation}
                subtitle="Differentiates beyond generic boilerplate templates."
              />
              <MetricBar
                label="9. Research Potential"
                value={analysis.qualityMetrics.researchPotential}
                subtitle="Supports empirical evaluation, testing, and metrics."
              />
              <MetricBar
                label="10. Overall Title Quality"
                value={analysis.qualityMetrics.overallQuality}
                subtitle="Composite academic defensibility index."
              />
            </div>
          </div>

          {/* Section: 4 Improved Revisions */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-navy-600 dark:text-navy-400" />
                <span>4 Defendable Academic Revisions</span>
              </h2>
              <p className="text-[11px] text-academic-500 dark:text-academic-400">
                AI-refined variations addressing the detected weaknesses without compromising the underlying project concept.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Conservative */}
              <div className="p-5 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-academic-300 dark:hover:border-academic-700 shadow-academic-sm space-y-3 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-academic-700 dark:text-academic-300 bg-academic-100 dark:bg-academic-800 px-2 py-0.5 rounded">
                    Conservative Revision
                  </span>
                  <button
                    onClick={() => copyRevision(analysis.improvedRevisions.conservative.title, 'cons')}
                    className="text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 flex items-center gap-1"
                  >
                    {copiedKey === 'cons' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">Copy</span>
                  </button>
                </div>
                <h3 className="text-sm font-bold text-academic-950 dark:text-academic-50 font-serif leading-snug">
                  &quot;{analysis.improvedRevisions.conservative.title}&quot;
                </h3>
                <p className="text-[11px] text-academic-600 dark:text-academic-400 leading-relaxed">
                  {analysis.improvedRevisions.conservative.rationale}
                </p>
                <div className="pt-2 border-t border-academic-100 dark:border-academic-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-academic-400 dark:text-academic-500 font-mono">
                    Focus: Standard Academic
                  </span>
                  <button
                    onClick={() => onNavigate('conflict', { title: analysis.improvedRevisions.conservative.title })}
                    className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200 font-medium text-[11px] flex items-center gap-1"
                  >
                    <span>Check Conflicts</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Professional */}
              <div className="p-5 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-academic-300 dark:hover:border-academic-700 shadow-academic-sm space-y-3 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-navy-800 dark:text-navy-300 bg-navy-50 dark:bg-navy-950/80 px-2 py-0.5 rounded border border-navy-100 dark:border-navy-800">
                    Professional SaaS Revision
                  </span>
                  <button
                    onClick={() => copyRevision(analysis.improvedRevisions.professional.title, 'prof')}
                    className="text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 flex items-center gap-1"
                  >
                    {copiedKey === 'prof' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">Copy</span>
                  </button>
                </div>
                <h3 className="text-sm font-bold text-academic-950 dark:text-academic-50 font-serif leading-snug">
                  &quot;{analysis.improvedRevisions.professional.title}&quot;
                </h3>
                <p className="text-[11px] text-academic-600 dark:text-academic-400 leading-relaxed">
                  {analysis.improvedRevisions.professional.rationale}
                </p>
                <div className="pt-2 border-t border-academic-100 dark:border-academic-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-academic-400 dark:text-academic-500 font-mono">
                    Focus: Industry Workflow
                  </span>
                  <button
                    onClick={() => onNavigate('conflict', { title: analysis.improvedRevisions.professional.title })}
                    className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200 font-medium text-[11px] flex items-center gap-1"
                  >
                    <span>Check Conflicts</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Advanced */}
              <div className="p-5 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-academic-300 dark:hover:border-academic-700 shadow-academic-sm space-y-3 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-800">
                    Advanced Algorithmic Revision
                  </span>
                  <button
                    onClick={() => copyRevision(analysis.improvedRevisions.advanced.title, 'adv')}
                    className="text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 flex items-center gap-1"
                  >
                    {copiedKey === 'adv' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">Copy</span>
                  </button>
                </div>
                <h3 className="text-sm font-bold text-academic-950 dark:text-academic-50 font-serif leading-snug">
                  &quot;{analysis.improvedRevisions.advanced.title}&quot;
                </h3>
                <p className="text-[11px] text-academic-600 dark:text-academic-400 leading-relaxed">
                  {analysis.improvedRevisions.advanced.rationale}
                </p>
                <div className="pt-2 border-t border-academic-100 dark:border-academic-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-academic-400 dark:text-academic-500 font-mono">
                    Focus: High Technical Depth
                  </span>
                  <button
                    onClick={() => onNavigate('conflict', { title: analysis.improvedRevisions.advanced.title })}
                    className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200 font-medium text-[11px] flex items-center gap-1"
                  >
                    <span>Check Conflicts</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Research-Oriented */}
              <div className="p-5 rounded-2xl border border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-900 hover:border-academic-300 dark:hover:border-academic-700 shadow-academic-sm space-y-3 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-800">
                    Research & Evaluation Revision
                  </span>
                  <button
                    onClick={() => copyRevision(analysis.improvedRevisions.researchOriented.title, 'res')}
                    className="text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 flex items-center gap-1"
                  >
                    {copiedKey === 'res' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">Copy</span>
                  </button>
                </div>
                <h3 className="text-sm font-bold text-academic-950 dark:text-academic-50 font-serif leading-snug">
                  &quot;{analysis.improvedRevisions.researchOriented.title}&quot;
                </h3>
                <p className="text-[11px] text-academic-600 dark:text-academic-400 leading-relaxed">
                  {analysis.improvedRevisions.researchOriented.rationale}
                </p>
                <div className="pt-2 border-t border-academic-100 dark:border-academic-800 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-academic-400 dark:text-academic-500 font-mono">
                    Focus: ISO Empirical Assessment
                  </span>
                  <button
                    onClick={() => onNavigate('concept', { idea: analysis.improvedRevisions.researchOriented.title })}
                    className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200 font-medium text-[11px] flex items-center gap-1"
                  >
                    <span>Plan Concept</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
