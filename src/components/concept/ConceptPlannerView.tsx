import React, { useState, useEffect } from 'react';
import {
  FileText,
  Sparkles,
  Database,
  Code,
  Layers,
  CheckCircle2,
  FileDown,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';
import type { ConceptBlueprint } from '../../types';
import { generateConceptBlueprint } from '../../services/conceptPlannerEngine';
import { exportService } from '../../services/exportService';

interface ConceptPlannerViewProps {
  initialIdea?: string;
  onNavigate: (tabId: string, payload?: { title?: string; idea?: string }) => void;
}

export const ConceptPlannerView: React.FC<ConceptPlannerViewProps> = ({
  initialIdea = '',
  onNavigate,
}) => {
  const [ideaInput, setIdeaInput] = useState(
    initialIdea || 'A system that helps schools schedule classrooms, assign faculty, and detect conflicts between classes automatically.'
  );
  const [blueprint, setBlueprint] = useState<ConceptBlueprint | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);

  const sampleIdeas = [
    'I want to create something for school scheduling and room conflict detection.',
    'A mobile app for farmers to take photos of plant leaves and identify crop diseases.',
    'A patient triage priority system for community clinics to organize emergency queues.',
    'A student internship tracking portal with geolocation attendance and competency rubrics.',
  ];

  const handleGenerate = (text?: string) => {
    const query = (text || ideaInput).trim();
    if (!query) return;

    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateConceptBlueprint(query);
      setBlueprint(plan);
      setIsGenerating(false);
    }, 600);
  };

  useEffect(() => {
    if (initialIdea) {
      setIdeaInput(initialIdea);
      handleGenerate(initialIdea);
    } else {
      handleGenerate();
    }
  }, [initialIdea]);

  const copyTitle = (title: string) => {
    navigator.clipboard.writeText(title);
    setCopiedTitle(title);
    setTimeout(() => setCopiedTitle(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-navy-700 dark:text-navy-400 uppercase tracking-wider">
          <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Capstone Architectural Blueprinting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-950 dark:text-academic-50 font-serif">
          Idea → Complete Capstone Blueprint
        </h1>
        <p className="text-xs sm:text-sm text-academic-600 dark:text-academic-400 max-w-3xl">
          Convert a simple concept into a full academic blueprint: problem statement, core modules, database schema, tech stack, and scope delimitations.
        </p>
      </div>

      {/* Input Box Bar */}
      <div className="p-5 sm:p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
          className="space-y-3"
        >
          <label className="font-semibold text-academic-800 dark:text-academic-200 text-xs flex items-center justify-between">
            <span>Enter Your Capstone Idea or Rough Proposal *</span>
            <span className="text-[11px] text-academic-400 dark:text-academic-500 font-normal">Can be raw or informal</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <textarea
              rows={2}
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              placeholder="e.g., 'I want to build an automated scheduling app for our university department...'"
              className="flex-1 p-3 text-xs sm:text-sm rounded-xl border border-academic-300 dark:border-academic-700 focus:outline-none focus:ring-2 focus:ring-navy-600 bg-academic-50/50 dark:bg-academic-850 dark:text-academic-100 placeholder:text-academic-400 leading-relaxed"
            />
            <button
              type="submit"
              disabled={isGenerating || !ideaInput.trim()}
              className="px-6 py-3 rounded-xl bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white font-semibold text-xs sm:text-sm shadow-academic flex items-center justify-center gap-2 transition-all disabled:opacity-50 self-end sm:self-stretch"
            >
              <Sparkles className="w-4 h-4 text-navy-300" />
              <span>{isGenerating ? 'Building Blueprint...' : 'Generate Blueprint'}</span>
            </button>
          </div>
        </form>

        {/* Quick prompt tests */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-academic-500 dark:text-academic-400">
          <span className="text-[11px] font-medium text-academic-400 dark:text-academic-500">Sample ideas:</span>
          {sampleIdeas.map((sample, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setIdeaInput(sample);
                handleGenerate(sample);
              }}
              className="px-2.5 py-1 rounded-md text-[11px] bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-700 dark:text-academic-300 transition-colors border border-academic-200 dark:border-academic-700 truncate max-w-[260px]"
            >
              &quot;{sample}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Blueprint Content */}
      {blueprint && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Actions & Export Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-academic-900 rounded-xl border border-academic-200 dark:border-academic-800 shadow-academic-sm transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-academic-900 dark:text-academic-100 font-serif">
                Academic Blueprint Status:
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Complete Architecture Formulated
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  exportService.downloadPdf({
                    projectIdea: ideaInput,
                    conceptBlueprint: blueprint,
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-academic transition-colors"
              >
                <FileDown className="w-3.5 h-3.5 text-navy-300" />
                <span>Export PDF</span>
              </button>

              <button
                onClick={() =>
                  exportService.downloadMarkdown({
                    projectIdea: ideaInput,
                    conceptBlueprint: blueprint,
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 text-xs font-medium flex items-center gap-1.5 border border-academic-300 dark:border-academic-700 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-academic-600 dark:text-academic-400" />
                <span>Export Markdown</span>
              </button>
            </div>
          </div>

          {/* 1. Problem Statement & Proposed Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-3 transition-colors">
              <span className="text-[11px] font-bold text-navy-700 dark:text-navy-400 uppercase tracking-wider">
                Section 1.1 • Background & Problem Statement
              </span>
              <h3 className="text-base font-bold text-academic-950 dark:text-academic-100 font-serif">
                The Problem
              </h3>
              <p className="text-xs text-academic-700 dark:text-academic-300 leading-relaxed">
                {blueprint.problemStatement}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-3 transition-colors">
              <span className="text-[11px] font-bold text-navy-700 dark:text-navy-400 uppercase tracking-wider">
                Section 1.2 • Proposed Academic Solution
              </span>
              <h3 className="text-base font-bold text-academic-950 dark:text-academic-100 font-serif">
                The Technical Solution
              </h3>
              <p className="text-xs text-academic-700 dark:text-academic-300 leading-relaxed">
                {blueprint.proposedSolution}
              </p>
            </div>
          </div>

          {/* 2. Potential Capstone Titles Formulated */}
          <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
            <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-navy-600 dark:text-navy-400" />
              <span>Recommended Capstone Titles from this Concept</span>
            </h3>
            <div className="space-y-2.5">
              {blueprint.potentialCapstoneTitles.map((t, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-academic-50 dark:bg-academic-850 hover:bg-navy-50/50 dark:hover:bg-navy-950/40 border border-academic-200 dark:border-academic-750 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors"
                >
                  <span className="font-serif font-semibold text-academic-900 dark:text-academic-100">
                    &quot;{t}&quot;
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => copyTitle(t)}
                      className="px-2.5 py-1 rounded bg-white dark:bg-academic-800 border border-academic-200 dark:border-academic-700 text-academic-700 dark:text-academic-300 hover:text-navy-700 dark:hover:text-white text-[11px] flex items-center gap-1"
                    >
                      {copiedTitle === t ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => onNavigate('analyzer', { title: t })}
                      className="px-2.5 py-1 rounded bg-navy-800 dark:bg-navy-600 text-white text-[11px] font-medium hover:bg-navy-900 dark:hover:bg-navy-500"
                    >
                      Analyze Title →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Core Features Matrix */}
          <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
                Core Functional Modules & Matrix
              </h3>
              <span className="text-[11px] text-academic-500 dark:text-academic-400 font-mono">
                Feature → Purpose → Benefit → Complexity
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-academic-200 dark:border-academic-800 bg-academic-50 dark:bg-academic-850 text-academic-600 dark:text-academic-300">
                    <th className="py-2.5 px-3 font-semibold">Module / Feature</th>
                    <th className="py-2.5 px-3 font-semibold">Primary Purpose</th>
                    <th className="py-2.5 px-3 font-semibold">Institutional Benefit</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Complexity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-academic-100 dark:divide-academic-800">
                  {blueprint.coreFeatures.map((feat, i) => (
                    <tr key={i} className="hover:bg-academic-50/50 dark:hover:bg-academic-850/50">
                      <td className="py-3 px-3 font-semibold text-academic-900 dark:text-academic-100">{feat.name}</td>
                      <td className="py-3 px-3 text-academic-600 dark:text-academic-300 max-w-xs">{feat.purpose}</td>
                      <td className="py-3 px-3 text-academic-600 dark:text-academic-300 max-w-xs">{feat.benefit}</td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            feat.complexity === 'High'
                              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                              : feat.complexity === 'Moderate'
                              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          }`}
                        >
                          {feat.complexity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Recommended Tech Stack & Database Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tech Stack */}
            <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
                <Code className="w-4 h-4 text-navy-600 dark:text-navy-400" />
                <span>Recommended Architectural Stack</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750">
                  <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
                    Frontend Layer
                  </span>
                  <p className="font-semibold text-academic-800 dark:text-academic-200 pt-0.5">
                    {blueprint.recommendedTechStack.frontend.join(' • ')}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750">
                  <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
                    Backend API Services
                  </span>
                  <p className="font-semibold text-academic-800 dark:text-academic-200 pt-0.5">
                    {blueprint.recommendedTechStack.backend.join(' • ')}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750">
                  <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
                    Relational Database Store
                  </span>
                  <p className="font-semibold text-academic-800 dark:text-academic-200 pt-0.5">
                    {blueprint.recommendedTechStack.database.join(' • ')}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750">
                  <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
                    Specialized / AI Engines
                  </span>
                  <p className="font-semibold text-academic-800 dark:text-academic-200 pt-0.5">
                    {blueprint.recommendedTechStack.aiOrSpecialized.join(' • ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Database Requirements */}
            <div className="p-6 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Database Schema Architecture</span>
              </h3>

              <div className="space-y-3 text-xs">
                {blueprint.databaseRequirements.map((table, i) => (
                  <div key={i} className="p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-navy-800 dark:text-navy-300 text-xs">
                        table: {table.table}
                      </span>
                      <span className="text-[10px] text-academic-400 dark:text-academic-500">3NF Normalized</span>
                    </div>
                    <p className="text-[11px] text-academic-600 dark:text-academic-400">{table.purpose}</p>
                    <div className="pt-1 flex flex-wrap gap-1">
                      {table.sampleFields.map((f, j) => (
                        <span key={j} className="px-1.5 py-0.5 rounded bg-white dark:bg-academic-800 border border-academic-200 dark:border-academic-700 font-mono text-[10px] text-academic-600 dark:text-academic-400">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Scope Suggestions, Delimitations & Future Enhancements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Scope Included */}
            <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-3 transition-colors">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Included in Scope</span>
              </span>
              <ul className="list-disc list-inside text-xs text-academic-700 dark:text-academic-300 space-y-2 leading-relaxed">
                {blueprint.scopeSuggestions.included.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Delimited */}
            <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-3 transition-colors">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Explicit Delimitations</span>
              </span>
              <ul className="list-disc list-inside text-xs text-academic-700 dark:text-academic-300 space-y-2 leading-relaxed">
                {blueprint.scopeSuggestions.delimited.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Future Work */}
            <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic space-y-3 transition-colors">
              <span className="text-xs font-bold text-navy-700 dark:text-navy-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Future Enhancements</span>
              </span>
              <ul className="list-disc list-inside text-xs text-academic-700 dark:text-academic-300 space-y-2 leading-relaxed">
                {blueprint.futureEnhancements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
