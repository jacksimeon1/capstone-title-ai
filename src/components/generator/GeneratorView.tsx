import React, { useState } from 'react';
import {
  Sparkles,
  Bookmark,
  Search,
  ShieldAlert,
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Layers,
  Info
} from 'lucide-react';
import type {
  AcademicProgram,
  DifficultyLevel,
  GeneratedTitleCandidate,
  ProjectScope,
  ProjectType,
  TargetUser,
} from '../../types';
import {
  ACADEMIC_PROGRAMS,
  PROJECT_TYPES,
  TARGET_USERS,
  POPULAR_TECHNOLOGIES,
  SAMPLE_PROMPT_IDEAS,
} from '../../data/academicPrograms';
import { generateCapstoneTitles } from '../../services/titleGeneratorEngine';
import { storageService } from '../../services/storageService';
import { MetricBar } from '../common/MetricBar';

interface GeneratorViewProps {
  onNavigate: (tabId: string, payload?: { title?: string; idea?: string }) => void;
  onAddToCompare: (candidate: GeneratedTitleCandidate) => void;
  comparedIds: string[];
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({
  onNavigate,
  onAddToCompare,
  comparedIds,
}) => {
  // Form state
  const [idea, setIdea] = useState(
    'A system that helps schools schedule classrooms, assign faculty, and detect conflicts between classes automatically.'
  );
  const [program, setProgram] = useState<AcademicProgram>('Information Technology');
  const [customProgram, setCustomProgram] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('Management System');
  const [customProjectType, setCustomProjectType] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<TargetUser[]>([
    'Teachers & Faculty',
    'School Administrators',
  ]);
  const [selectedTech, setSelectedTech] = useState<string[]>(['React', 'Node.js', 'PostgreSQL']);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [scope, setScope] = useState<ProjectScope>('Medium');
  const [additionalRequirements, setAdditionalRequirements] = useState(
    'Must support export of conflict logs and schedule matrices to PDF.'
  );

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [candidates, setCandidates] = useState<GeneratedTitleCandidate[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleUser = (user: TargetUser) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!idea.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const activeProg = program === 'Other' && customProgram.trim() ? (customProgram as AcademicProgram) : program;
      const activeType = projectType === 'Other' && customProjectType.trim() ? (customProjectType as ProjectType) : projectType;

      const results = generateCapstoneTitles({
        idea,
        program: activeProg,
        projectType: activeType,
        targetUsers: selectedUsers,
        technologies: selectedTech,
        difficulty,
        scope,
        additionalRequirements,
      });

      setCandidates(results);
      if (results.length > 0) {
        setExpandedId(results[0].id);
      }
      setIsGenerating(false);
    }, 600);
  };

  const handleApplySample = (sample: (typeof SAMPLE_PROMPT_IDEAS)[0]) => {
    setIdea(sample.idea);
    setProgram(sample.program);
    setProjectType(sample.type);
    setSelectedUsers(sample.users);
    setSelectedTech(sample.tech);
  };

  const handleSaveTitle = (candidate: GeneratedTitleCandidate) => {
    if (storageService.isTitleSaved(candidate.title)) {
      storageService.removeSavedTitle(candidate.title);
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidate.id ? { ...c, saved: false } : c))
      );
    } else {
      storageService.saveTitle(candidate);
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidate.id ? { ...c, saved: true } : c))
      );
    }
  };

  const copyToClipboard = (candidate: GeneratedTitleCandidate) => {
    navigator.clipboard.writeText(candidate.title);
    setCopiedId(candidate.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-navy-700 dark:text-navy-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-navy-600 dark:text-navy-400" />
          <span>Academic Title Synthesis Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-950 dark:text-academic-50 font-serif">
          AI Capstone Title Generator
        </h1>
        <p className="text-xs sm:text-sm text-academic-600 dark:text-academic-400 max-w-3xl">
          Formulate defensible, accredited capstone titles tailored to your discipline, technical constraints, and target beneficiaries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Parameters */}
        <div className="lg:col-span-5 bg-white dark:bg-academic-900 p-5 sm:p-6 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-6 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-academic-100 dark:border-academic-800">
            <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">Project Parameters</h2>
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-academic-400 dark:text-academic-500">Load sample:</span>
              <select
                onChange={(e) => {
                  const idx = parseInt(e.target.value, 10);
                  if (!isNaN(idx)) handleApplySample(SAMPLE_PROMPT_IDEAS[idx]);
                }}
                defaultValue=""
                className="text-[11px] py-0.5 px-2 bg-academic-50 dark:bg-academic-800 rounded border border-academic-200 dark:border-academic-700 text-academic-700 dark:text-academic-300 focus:outline-none"
              >
                <option value="" disabled>Choose preset</option>
                {SAMPLE_PROMPT_IDEAS.map((s, idx) => (
                  <option key={idx} value={idx}>{s.title}</option>
                ))}
              </select>
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs">
            {/* Project Idea */}
            <div className="space-y-1.5">
              <label className="font-semibold text-academic-800 dark:text-academic-200 flex items-center justify-between">
                <span>Core Project Idea / Problem Statement *</span>
                <span className="text-[10px] text-academic-400 dark:text-academic-500 font-normal">Min 10 words</span>
              </label>
              <textarea
                rows={4}
                required
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe what the system will do, who it helps, and what problem it resolves..."
                className="w-full p-3 rounded-xl border border-academic-300 dark:border-academic-700 focus:outline-none focus:ring-1 focus:ring-navy-600 bg-academic-50/50 dark:bg-academic-850 dark:text-academic-100 placeholder:text-academic-400 leading-relaxed text-xs"
              />
            </div>

            {/* Academic Program */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-academic-800 dark:text-academic-200">Academic Program *</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value as AcademicProgram)}
                  className="w-full p-2.5 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-850 dark:text-academic-100 focus:outline-none focus:ring-1 focus:ring-navy-600 text-xs"
                >
                  {ACADEMIC_PROGRAMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {program === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify program..."
                    value={customProgram}
                    onChange={(e) => setCustomProgram(e.target.value)}
                    className="mt-1.5 w-full p-2 rounded border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-850 text-xs"
                  />
                )}
              </div>

              {/* Project Type */}
              <div className="space-y-1">
                <label className="font-semibold text-academic-800 dark:text-academic-200">Project Type *</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as ProjectType)}
                  className="w-full p-2.5 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-850 dark:text-academic-100 focus:outline-none focus:ring-1 focus:ring-navy-600 text-xs"
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {projectType === 'Other' && (
                  <input
                    type="text"
                    placeholder="Specify project type..."
                    value={customProjectType}
                    onChange={(e) => setCustomProjectType(e.target.value)}
                    className="mt-1.5 w-full p-2 rounded border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-850 text-xs"
                  />
                )}
              </div>
            </div>

            {/* Target Users (Multi-select) */}
            <div className="space-y-1.5">
              <label className="font-semibold text-academic-800 dark:text-academic-200 flex items-center justify-between">
                <span>Target Users / Beneficiaries</span>
                <span className="text-[10px] text-academic-400 dark:text-academic-500 font-normal">Select all that apply</span>
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 border border-academic-200 dark:border-academic-800 rounded-xl bg-academic-50/40 dark:bg-academic-850/40">
                {TARGET_USERS.map((user) => {
                  const isSelected = selectedUsers.includes(user);
                  return (
                    <button
                      key={user}
                      type="button"
                      onClick={() => toggleUser(user)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        isSelected
                          ? 'bg-navy-700 dark:bg-navy-600 text-white shadow-sm'
                          : 'bg-white dark:bg-academic-800 text-academic-700 dark:text-academic-300 border border-academic-200 dark:border-academic-700 hover:border-academic-300'
                      }`}
                    >
                      {user}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred Technologies */}
            <div className="space-y-1.5">
              <label className="font-semibold text-academic-800 dark:text-academic-200 flex items-center justify-between">
                <span>Preferred Technologies (Optional)</span>
                <span className="text-[10px] text-academic-400 dark:text-academic-500 font-normal">{selectedTech.length} selected</span>
              </label>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1.5 border border-academic-200 dark:border-academic-800 rounded-xl bg-academic-50/40 dark:bg-academic-850/40">
                {POPULAR_TECHNOLOGIES.slice(0, 18).map((tech) => {
                  const isSelected = selectedTech.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                        isSelected
                          ? 'bg-academic-800 dark:bg-navy-700 text-white'
                          : 'bg-white dark:bg-academic-800 text-academic-600 dark:text-academic-400 border border-academic-200 dark:border-academic-700 hover:bg-academic-100 dark:hover:bg-academic-750'
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty & Scope */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="font-semibold text-academic-800 dark:text-academic-200">Target Difficulty</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDifficulty(lvl)}
                      className={`py-1.5 text-[10px] font-medium rounded-lg border text-center transition-all ${
                        difficulty === lvl
                          ? 'bg-navy-50 dark:bg-navy-950 border-navy-300 dark:border-navy-700 text-navy-800 dark:text-navy-300 font-semibold'
                          : 'border-academic-200 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-600 dark:text-academic-400 hover:bg-academic-50 dark:hover:bg-academic-750'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-academic-800 dark:text-academic-200">Project Scope</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['Small', 'Medium', 'Large'] as ProjectScope[]).map((sc) => (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setScope(sc)}
                      className={`py-1.5 text-[10px] font-medium rounded-lg border text-center transition-all ${
                        scope === sc
                          ? 'bg-navy-50 dark:bg-navy-950 border-navy-300 dark:border-navy-700 text-navy-800 dark:text-navy-300 font-semibold'
                          : 'border-academic-200 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-600 dark:text-academic-400 hover:bg-academic-50 dark:hover:bg-academic-750'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="space-y-1">
              <label className="font-semibold text-academic-800 dark:text-academic-200">Additional Constraints / Requirements</label>
              <input
                type="text"
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="e.g., Must integrate with SMS alerts, offline capability..."
                className="w-full p-2.5 rounded-lg border border-academic-300 dark:border-academic-700 bg-academic-50/50 dark:bg-academic-850 dark:text-academic-100 text-xs focus:outline-none focus:ring-1 focus:ring-navy-600"
              />
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isGenerating || !idea.trim()}
              className="w-full mt-2 py-3 rounded-xl bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white font-semibold text-xs sm:text-sm shadow-academic flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-navy-300" />
              <span>{isGenerating ? 'Synthesizing Academic Titles...' : 'Generate Titles'}</span>
            </button>
          </form>
        </div>

        {/* Right Output: Generated Candidates */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">
                Generated Title Candidates {candidates.length > 0 && `(${candidates.length})`}
              </h2>
              <p className="text-[11px] text-academic-500 dark:text-academic-400">
                {candidates.length > 0
                  ? 'Click any candidate to inspect academic rationale, target users, and indicators.'
                  : 'Configure project parameters on the left and click "Generate Titles".'}
              </p>
            </div>

            {candidates.length > 0 && (
              <button
                onClick={() => handleGenerate()}
                className="flex items-center gap-1 text-xs text-navy-700 dark:text-navy-400 font-medium hover:text-navy-900 dark:hover:text-navy-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            )}
          </div>

          {/* Empty State */}
          {candidates.length === 0 && !isGenerating && (
            <div className="p-12 text-center bg-white dark:bg-academic-900 rounded-2xl border border-dashed border-academic-300 dark:border-academic-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-navy-950/80 text-navy-700 dark:text-navy-300 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-academic-800 dark:text-academic-200 font-serif">No Titles Generated Yet</h3>
              <p className="text-xs text-academic-500 dark:text-academic-400 max-w-md mx-auto">
                Fill in your project idea or pick a preset on the left to generate 8 academically formulated capstone title candidates across multiple research paradigms.
              </p>
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="mt-2 px-4 py-2 rounded-lg bg-navy-50 dark:bg-navy-950/80 hover:bg-navy-100 dark:hover:bg-navy-900 text-navy-800 dark:text-navy-300 font-medium text-xs border border-navy-200 dark:border-navy-800 transition-colors"
              >
                Generate Demo Set
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {isGenerating && (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 animate-pulse space-y-3">
                  <div className="h-4 bg-academic-200 dark:bg-academic-800 rounded w-1/4" />
                  <div className="h-5 bg-academic-300 dark:bg-academic-700 rounded w-4/5" />
                  <div className="h-3 bg-academic-100 dark:bg-academic-800 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Candidates List */}
          {candidates.length > 0 && !isGenerating && (
            <div className="space-y-3.5">
              {candidates.map((candidate, index) => {
                const isExpanded = expandedId === candidate.id;
                const isSaved = storageService.isTitleSaved(candidate.title);
                const isCompared = comparedIds.includes(candidate.id);

                return (
                  <div
                    key={candidate.id}
                    className={`rounded-2xl border transition-all duration-200 bg-white dark:bg-academic-900 ${
                      isExpanded
                        ? 'border-navy-300 dark:border-navy-700 shadow-academic ring-1 ring-navy-100 dark:ring-navy-900'
                        : 'border-academic-200 dark:border-academic-800 hover:border-academic-300 dark:hover:border-academic-700 shadow-academic-sm'
                    }`}
                  >
                    {/* Title Header Bar */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-academic-100 dark:bg-academic-800 text-academic-700 dark:text-academic-300">
                              #{index + 1}
                            </span>
                            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-navy-50 dark:bg-navy-950/80 text-navy-800 dark:text-navy-300 border border-navy-200 dark:border-navy-800">
                              {candidate.paradigm}
                            </span>
                            <span className="text-[10px] text-academic-400 dark:text-academic-500 font-mono">
                              Est. Quality: {candidate.quality.clarity}%
                            </span>
                          </div>

                          <h3
                            onClick={() => setExpandedId(isExpanded ? null : candidate.id)}
                            className="text-sm sm:text-base font-semibold text-academic-950 dark:text-academic-50 font-serif leading-snug cursor-pointer hover:text-navy-700 dark:hover:text-navy-400 pt-1"
                          >
                            &quot;{candidate.title}&quot;
                          </h3>
                        </div>

                        {/* Top quick actions */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => copyToClipboard(candidate)}
                            className="p-1.5 text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 rounded-md hover:bg-academic-100 dark:hover:bg-academic-800"
                            title="Copy Title"
                          >
                            {copiedId === candidate.id ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleSaveTitle(candidate)}
                            className={`p-1.5 rounded-md hover:bg-academic-100 dark:hover:bg-academic-800 ${
                              isSaved ? 'text-amber-500' : 'text-academic-400 hover:text-academic-700 dark:hover:text-academic-200'
                            }`}
                            title={isSaved ? 'Remove from Saved' : 'Save to Favorites'}
                          >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                          </button>
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : candidate.id)}
                            className="p-1.5 text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 rounded-md hover:bg-academic-100 dark:hover:bg-academic-800"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Brief rationale preview if collapsed */}
                      {!isExpanded && (
                        <p className="text-xs text-academic-500 dark:text-academic-400 line-clamp-1 mt-1.5">
                          {candidate.rationale}
                        </p>
                      )}
                    </div>

                    {/* Expanded Detail Drawer */}
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-academic-100 dark:border-academic-800 space-y-4 text-xs">
                        {/* Section: Academic Rationale & Problem */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1 p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750">
                            <h4 className="font-semibold text-academic-900 dark:text-academic-100 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-navy-600 dark:text-navy-400" />
                              <span>Academic Rationale</span>
                            </h4>
                            <p className="text-academic-600 dark:text-academic-300 leading-relaxed text-[11px]">
                              {candidate.rationale}
                            </p>
                          </div>

                          <div className="space-y-1 p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750">
                            <h4 className="font-semibold text-academic-900 dark:text-academic-100">Problem Addressed</h4>
                            <p className="text-academic-600 dark:text-academic-300 leading-relaxed text-[11px]">
                              {candidate.problemAddressed}
                            </p>
                          </div>
                        </div>

                        {/* Structural Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
                          <div>
                            <span className="text-academic-400 dark:text-academic-500 font-medium block">Target Beneficiaries</span>
                            <span className="font-semibold text-academic-800 dark:text-academic-200">{candidate.targetUsers}</span>
                          </div>
                          <div>
                            <span className="text-academic-400 dark:text-academic-500 font-medium block">Core Architecture</span>
                            <span className="font-semibold text-academic-800 dark:text-academic-200">{candidate.mainSystem}</span>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <span className="text-academic-400 dark:text-academic-500 font-medium block">Delimited Scope</span>
                            <span className="font-semibold text-academic-800 dark:text-academic-200">{candidate.potentialScope}</span>
                          </div>
                        </div>

                        {/* Key Features & Tech */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-semibold text-academic-700 dark:text-academic-300 uppercase tracking-wider">
                            Key Functional Modules
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                            {candidate.keyFeatures.map((feat, i) => (
                              <div key={i} className="flex items-center gap-1.5 text-academic-600 dark:text-academic-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-navy-600 dark:bg-navy-400 shrink-0" />
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quality Indicators Progress Bars */}
                        <div className="pt-2 border-t border-academic-100 dark:border-academic-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-academic-700 dark:text-academic-300 uppercase tracking-wider">
                              AI-Assisted Quality Indicators
                            </span>
                            <span className="text-[10px] text-academic-400 dark:text-academic-500 italic">
                              *Estimates for thesis defense preparation
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                            <MetricBar label="Clarity" value={candidate.quality.clarity} />
                            <MetricBar label="Specificity" value={candidate.quality.specificity} />
                            <MetricBar label="Feasibility" value={candidate.quality.feasibility} />
                            <MetricBar label="Complexity" value={candidate.quality.technicalComplexity} />
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="pt-3 border-t border-academic-100 dark:border-academic-800 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              onClick={() => onNavigate('analyzer', { title: candidate.title })}
                              className="px-2.5 py-1.5 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 font-medium text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <Search className="w-3.5 h-3.5 text-navy-600 dark:text-navy-400" />
                              <span>Analyze Structure</span>
                            </button>
                            <button
                              onClick={() => onNavigate('conflict', { title: candidate.title })}
                              className="px-2.5 py-1.5 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 font-medium text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                              <span>Check Conflicts</span>
                            </button>
                            <button
                              onClick={() => onNavigate('concept', { idea: candidate.title })}
                              className="px-2.5 py-1.5 rounded-lg bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-800 dark:text-academic-200 font-medium text-[11px] flex items-center gap-1 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                              <span>Plan Concept</span>
                            </button>
                          </div>

                          <button
                            onClick={() => onAddToCompare(candidate)}
                            className={`px-3 py-1.5 rounded-lg font-medium text-[11px] flex items-center gap-1 transition-colors ${
                              isCompared
                                ? 'bg-navy-100 dark:bg-navy-950 text-navy-800 dark:text-navy-200 border border-navy-300 dark:border-navy-700'
                                : 'bg-navy-700 dark:bg-navy-600 text-white hover:bg-navy-800 dark:hover:bg-navy-500'
                            }`}
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>{isCompared ? 'In Comparison Matrix' : 'Compare Title'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
