import React, { useState, useEffect } from 'react';
import {
  Activity,
  Clock,
  Cpu,
  Boxes,
  FileDown,
  Server
} from 'lucide-react';
import type { DifficultyLevel, FeasibilityReport, ProjectScope } from '../../types';
import { evaluateFeasibility } from '../../services/feasibilityEngine';
import { MetricBar } from '../common/MetricBar';
import { exportService } from '../../services/exportService';

interface FeasibilityViewProps {
  initialTitle?: string;
  onNavigate: (tabId: string, payload?: { title?: string; idea?: string }) => void;
}

export const FeasibilityView: React.FC<FeasibilityViewProps> = ({
  initialTitle = '',
}) => {
  const [titleOrIdea, setTitleOrIdea] = useState(
    initialTitle || 'Automated Classroom Scheduling and Conflict Detection Information System'
  );
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [scope, setScope] = useState<ProjectScope>('Medium');
  const [report, setReport] = useState<FeasibilityReport | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateFeasibility = () => {
    if (!titleOrIdea.trim()) return;
    setIsCalculating(true);

    setTimeout(() => {
      const res = evaluateFeasibility({
        titleOrIdea,
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        difficulty,
        scope,
      });
      setReport(res);
      setIsCalculating(false);
    }, 400);
  };

  useEffect(() => {
    calculateFeasibility();
  }, [initialTitle]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-navy-700 dark:text-navy-400 uppercase tracking-wider">
          <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Timeline & Resource Risk Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-950 dark:text-academic-50 font-serif">
          Project Feasibility Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-academic-600 dark:text-academic-400 max-w-3xl">
          Evaluate technical viability, semester timeline constraints, hardware dependencies, and cloud resources before committee proposal defense.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="p-5 sm:p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
        <div className="space-y-3">
          <label className="font-semibold text-academic-800 dark:text-academic-200 text-xs">
            Proposed Capstone Title or System Concept
          </label>
          <input
            type="text"
            value={titleOrIdea}
            onChange={(e) => setTitleOrIdea(e.target.value)}
            placeholder="e.g., IoT-Based Greenhouse Environmental Regulation System..."
            className="w-full p-3 rounded-xl border border-academic-300 dark:border-academic-700 focus:outline-none focus:ring-2 focus:ring-navy-600 text-xs sm:text-sm bg-academic-50/50 dark:bg-academic-850 dark:text-academic-100 placeholder:text-academic-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
          {/* Difficulty */}
          <div className="space-y-1.5">
            <label className="font-semibold text-academic-800 dark:text-academic-200">Target Technical Complexity</label>
            <div className="grid grid-cols-3 gap-1">
              {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`py-2 text-[11px] font-medium rounded-lg border text-center transition-all ${
                    difficulty === lvl
                      ? 'bg-navy-50 dark:bg-navy-950 border-navy-300 dark:border-navy-700 text-navy-800 dark:text-navy-300 font-bold'
                      : 'border-academic-200 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-600 dark:text-academic-400 hover:bg-academic-50 dark:hover:bg-academic-750'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div className="space-y-1.5">
            <label className="font-semibold text-academic-800 dark:text-academic-200">Organizational Scope</label>
            <div className="grid grid-cols-3 gap-1">
              {(['Small', 'Medium', 'Large'] as ProjectScope[]).map((sc) => (
                <button
                  key={sc}
                  type="button"
                  onClick={() => setScope(sc)}
                  className={`py-2 text-[11px] font-medium rounded-lg border text-center transition-all ${
                    scope === sc
                      ? 'bg-navy-50 dark:bg-navy-950 border-navy-300 dark:border-navy-700 text-navy-800 dark:text-navy-300 font-bold'
                      : 'border-academic-200 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-600 dark:text-academic-400 hover:bg-academic-50 dark:hover:bg-academic-750'
                  }`}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex items-end">
            <button
              onClick={calculateFeasibility}
              disabled={isCalculating}
              className="w-full py-2.5 rounded-xl bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white font-semibold text-xs shadow-academic flex items-center justify-center gap-2 transition-all"
            >
              <Activity className="w-4 h-4 text-navy-300" />
              <span>{isCalculating ? 'Evaluating...' : 'Re-Calculate Feasibility'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report View */}
      {report && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Complexity Badge Banner */}
          <div className="p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider">
                Overall Complexity Rating
              </span>
              <div className="flex items-center justify-center md:justify-start gap-2 pt-0.5">
                <span
                  className={`text-2xl font-bold px-3 py-1 rounded-xl border uppercase font-serif ${
                    report.overallComplexity === 'High'
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800'
                      : report.overallComplexity === 'Moderate'
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  {report.overallComplexity} Complexity
                </span>
                <span className="text-xs font-semibold text-academic-700 dark:text-academic-300">
                  (~{report.timeFeasibility.estimatedMonths} Months Estimated Effort)
                </span>
              </div>
              <p className="text-xs text-academic-600 dark:text-academic-400 pt-1 max-w-xl">
                {report.explanation}
              </p>
            </div>

            <button
              onClick={() =>
                exportService.downloadPdf({
                  projectIdea: titleOrIdea,
                  feasibilityReport: report,
                })
              }
              className="px-4 py-2.5 rounded-xl bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white text-xs font-semibold flex items-center gap-2 shadow-academic transition-colors"
            >
              <FileDown className="w-4 h-4 text-navy-300" />
              <span>Export Feasibility Report</span>
            </button>
          </div>

          {/* Tri-Pillar Assessment: Technical, Time, Scope */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technical Feasibility */}
            <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-navy-700 dark:text-navy-300 px-2 py-0.5 rounded bg-navy-50 dark:bg-navy-950 border border-navy-100 dark:border-navy-800">
                  {report.technicalFeasibility.verdict}
                </span>
              </div>
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
                Technical Feasibility
              </h3>
              <MetricBar label="Implementation Viability" value={report.technicalFeasibility.score} />
              <p className="text-[11px] text-academic-600 dark:text-academic-400 leading-relaxed pt-1">
                {report.technicalFeasibility.analysis}
              </p>
            </div>

            {/* Time Feasibility */}
            <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-800">
                  {report.timeFeasibility.timelineFeasibility}
                </span>
              </div>
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
                Time Feasibility
              </h3>
              <MetricBar label="Timeline Confidence" value={report.timeFeasibility.score} />
              <p className="text-[11px] text-academic-600 dark:text-academic-400 leading-relaxed pt-1">
                {report.timeFeasibility.analysis}
              </p>
            </div>

            {/* Scope Feasibility */}
            <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                  <Boxes className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-800">
                  {report.scopeFeasibility.verdict}
                </span>
              </div>
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
                Scope Feasibility
              </h3>
              <MetricBar label="Boundaries Score" value={report.scopeFeasibility.score} />
              <p className="text-[11px] text-academic-600 dark:text-academic-400 leading-relaxed pt-1">
                {report.scopeFeasibility.analysis}
              </p>
            </div>
          </div>

          {/* Resource Requirements Breakdown */}
          <div className="bg-white dark:bg-academic-900 p-6 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-5 transition-colors">
            <div>
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
                <Server className="w-4 h-4 text-navy-600 dark:text-navy-400" />
                <span>Resource & Dependency Breakdown</span>
              </h3>
              <p className="text-[11px] text-academic-500 dark:text-academic-400">
                Mandatory infrastructure, external APIs, and skillsets needed to execute this project.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* Hardware */}
              <div className="p-4 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-2">
                <span className="text-[11px] font-bold text-academic-700 dark:text-academic-300 uppercase tracking-wider block">
                  Hardware Resources
                </span>
                <ul className="list-disc list-inside text-academic-600 dark:text-academic-400 text-[11px] space-y-1">
                  {report.resourceRequirements.hardware.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* APIs */}
              <div className="p-4 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-2">
                <span className="text-[11px] font-bold text-academic-700 dark:text-academic-300 uppercase tracking-wider block">
                  External APIs & Services
                </span>
                <ul className="list-disc list-inside text-academic-600 dark:text-academic-400 text-[11px] space-y-1">
                  {report.resourceRequirements.apis.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Cloud Services */}
              <div className="p-4 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-2">
                <span className="text-[11px] font-bold text-academic-700 dark:text-academic-300 uppercase tracking-wider block">
                  Cloud Infrastructure
                </span>
                <ul className="list-disc list-inside text-academic-600 dark:text-academic-400 text-[11px] space-y-1">
                  {report.resourceRequirements.cloudServices.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Dataset requirements */}
              <div className="p-4 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-2">
                <span className="text-[11px] font-bold text-academic-700 dark:text-academic-300 uppercase tracking-wider block">
                  Dataset Requirements
                </span>
                <ul className="list-disc list-inside text-academic-600 dark:text-academic-400 text-[11px] space-y-1">
                  {report.resourceRequirements.datasetRequirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Development Skills */}
              <div className="p-4 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-2 sm:col-span-2">
                <span className="text-[11px] font-bold text-academic-700 dark:text-academic-300 uppercase tracking-wider block">
                  Required Developer Skillsets
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {report.resourceRequirements.developmentSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-white dark:bg-academic-800 border border-academic-200 dark:border-academic-700 text-[11px] font-medium text-academic-700 dark:text-academic-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
