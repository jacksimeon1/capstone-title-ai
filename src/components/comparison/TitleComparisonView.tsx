import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Trash2,
  Scale
} from 'lucide-react';
import type { GeneratedTitleCandidate } from '../../types';

interface TitleComparisonViewProps {
  candidatesToCompare: GeneratedTitleCandidate[];
  onRemoveCandidate: (id: string) => void;
  onNavigate: (tabId: string, payload?: { title?: string; idea?: string }) => void;
}

export const TitleComparisonView: React.FC<TitleComparisonViewProps> = ({
  candidatesToCompare,
  onRemoveCandidate,
  onNavigate,
}) => {
  // Categories to compare
  const criteria = [
    { key: 'clarity', label: 'Clarity', desc: 'Syntactic and grammatical precision' },
    { key: 'specificity', label: 'Specificity', desc: 'Clear operational sub-domain designation' },
    { key: 'scopeScore', label: 'Scope', desc: 'Feasible boundary limits for undergraduate timeline' },
    { key: 'technicalComplexity', label: 'Technical Depth', desc: 'Software engineering and algorithmic rigor' },
    { key: 'feasibility', label: 'Feasibility', desc: 'Realism within collegiate resource constraints' },
    { key: 'innovation', label: 'Innovation', desc: 'Novel application or methodology' },
    { key: 'relevance', label: 'Research Potential', desc: 'Empirical testing and thesis publication viability' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-navy-700 dark:text-navy-400 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-navy-600 dark:text-navy-400" />
          <span>Comparative Multi-Title Evaluation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-950 dark:text-academic-50 font-serif">
          Title Comparison Matrix
        </h1>
        <p className="text-xs sm:text-sm text-academic-600 dark:text-academic-400 max-w-3xl">
          Evaluate multiple generated or proposed titles side-by-side. Inspect relative trade-offs across clarity, technical depth, and research potential before making your final committee submission.
        </p>
      </div>

      {/* Empty State when fewer than 2 titles */}
      {candidatesToCompare.length < 2 && (
        <div className="p-10 text-center bg-white dark:bg-academic-900 rounded-2xl border border-dashed border-academic-300 dark:border-academic-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
              Select At Least 2 Titles to Compare
            </h3>
            <p className="text-xs text-academic-500 dark:text-academic-400 max-w-md mx-auto">
              Currently {candidatesToCompare.length} title selected. Head to the Title Generator or Saved Titles to add 2 to 4 candidates to this comparison matrix.
            </p>
          </div>
          <button
            onClick={() => onNavigate('generator')}
            className="px-4 py-2 rounded-xl bg-navy-800 dark:bg-navy-600 text-white text-xs font-semibold hover:bg-navy-900 dark:hover:bg-navy-500 transition-colors inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Go to AI Title Generator</span>
          </button>
        </div>
      )}

      {/* Comparison Matrix Table */}
      {candidatesToCompare.length >= 2 && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-academic-200 dark:border-academic-800 bg-academic-50 dark:bg-academic-850">
                    <th className="py-4 px-4 w-48 font-bold text-academic-900 dark:text-academic-100 uppercase tracking-wider text-[11px]">
                      Evaluation Metric
                    </th>
                    {candidatesToCompare.map((c, idx) => (
                      <th
                        key={c.id}
                        className="py-4 px-4 min-w-[240px] max-w-[320px] font-normal align-top border-l border-academic-200 dark:border-academic-800"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-navy-800 dark:text-navy-300 text-xs font-mono uppercase">
                              Option {String.fromCharCode(65 + idx)}
                            </span>
                            <button
                              onClick={() => onRemoveCandidate(c.id)}
                              className="text-academic-400 hover:text-rose-600 dark:hover:text-rose-400 p-1"
                              title="Remove from comparison"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="font-serif font-bold text-academic-950 dark:text-academic-50 text-xs leading-snug">
                            &quot;{c.title}&quot;
                          </p>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 border border-navy-100 dark:border-navy-800">
                            {c.paradigm}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-academic-100 dark:divide-academic-800">
                  {criteria.map((crit) => (
                    <tr key={crit.key} className="hover:bg-academic-50/50 dark:hover:bg-academic-850/50">
                      <td className="py-3.5 px-4 font-semibold text-academic-800 dark:text-academic-200 bg-academic-50/30 dark:bg-academic-850/30">
                        <div>{crit.label}</div>
                        <div className="text-[10px] text-academic-400 dark:text-academic-500 font-normal">{crit.desc}</div>
                      </td>

                      {candidatesToCompare.map((c) => {
                        const score = (c.quality as any)[crit.key] || 80;
                        return (
                          <td key={c.id} className="py-3.5 px-4 border-l border-academic-100 dark:border-academic-800">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-semibold">
                                <span className="text-academic-700 dark:text-academic-300">{score}%</span>
                                <span className="text-[10px] text-academic-400 dark:text-academic-500 font-normal">
                                  {score >= 85 ? 'Excellent' : score >= 70 ? 'Adequate' : 'Needs Work'}
                                </span>
                              </div>
                              <div className="w-full bg-academic-200 dark:bg-academic-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    score >= 85 ? 'bg-emerald-500' : score >= 70 ? 'bg-navy-500' : 'bg-amber-500'
                                  }`}
                                  style={{ width: `${score}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Target Users Row */}
                  <tr className="hover:bg-academic-50/50 dark:hover:bg-academic-850/50">
                    <td className="py-3.5 px-4 font-semibold text-academic-800 dark:text-academic-200 bg-academic-50/30 dark:bg-academic-850/30">
                      Target Stakeholders
                    </td>
                    {candidatesToCompare.map((c) => (
                      <td key={c.id} className="py-3.5 px-4 border-l border-academic-100 dark:border-academic-800 text-academic-700 dark:text-academic-300">
                        {c.targetUsers}
                      </td>
                    ))}
                  </tr>

                  {/* Core Architecture */}
                  <tr className="hover:bg-academic-50/50 dark:hover:bg-academic-850/50">
                    <td className="py-3.5 px-4 font-semibold text-academic-800 dark:text-academic-200 bg-academic-50/30 dark:bg-academic-850/30">
                      System Architecture
                    </td>
                    {candidatesToCompare.map((c) => (
                      <td key={c.id} className="py-3.5 px-4 border-l border-academic-100 dark:border-academic-800 text-academic-700 dark:text-academic-300">
                        {c.mainSystem}
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr>
                    <td className="py-4 px-4 bg-academic-50/30 dark:bg-academic-850/30" />
                    {candidatesToCompare.map((c) => (
                      <td key={c.id} className="py-4 px-4 border-l border-academic-100 dark:border-academic-800">
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => onNavigate('analyzer', { title: c.title })}
                            className="w-full py-1.5 px-3 rounded-lg bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white text-[11px] font-semibold text-center transition-colors"
                          >
                            Analyze in Depth
                          </button>
                          <button
                            onClick={() => onNavigate('conflict', { title: c.title })}
                            className="w-full py-1.5 px-3 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 text-[11px] font-medium text-center transition-colors border border-academic-200 dark:border-academic-700"
                          >
                            Check Overlap
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Trade-Off Analysis Synthesis */}
          <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-navy-600 dark:text-navy-400" />
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
                Academic Trade-Off Analysis (No Arbitrary Winner)
              </h3>
            </div>

            <p className="text-xs text-academic-600 dark:text-academic-400 leading-relaxed">
              In academic capstone defense panels, there is no universally &quot;superior&quot; title—each candidate balances distinct trade-offs depending on your degree requirements:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              {candidatesToCompare.map((c, i) => (
                <div key={c.id} className="p-4 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-800 dark:text-navy-300">
                      Option {String.fromCharCode(65 + i)}: {c.paradigm}
                    </span>
                    <span className="text-[10px] text-academic-400 dark:text-academic-500 font-mono">
                      Feasibility: {c.quality.feasibility}%
                    </span>
                  </div>
                  <p className="text-[11px] text-academic-600 dark:text-academic-300 leading-relaxed">
                    <span className="font-semibold text-academic-800 dark:text-academic-100">Core Strength: </span>
                    {c.rationale}
                  </p>
                  <p className="text-[11px] text-academic-600 dark:text-academic-300 leading-relaxed">
                    <span className="font-semibold text-academic-800 dark:text-academic-100">Panel Defense Consideration: </span>
                    {c.quality.technicalComplexity >= 85
                      ? 'Panelists will scrutinize the underlying algorithm, mathematical formulas, and computational dataset.'
                      : 'Panelists will expect rigorous user usability validation (e.g. ISO 25010 or SUS survey) with genuine end-user respondents.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
