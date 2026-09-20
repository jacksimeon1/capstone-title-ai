import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  HelpCircle,
  Filter,
  ArrowRight
} from 'lucide-react';
import type { ConflictCheckResult } from '../../types';
import { detectTitleConflicts } from '../../services/conflictDetector';
import { storageService } from '../../services/storageService';

interface ConflictDetectorViewProps {
  initialTitle?: string;
  onNavigate: (tabId: string, payload?: { title?: string; idea?: string }) => void;
}

export const ConflictDetectorView: React.FC<ConflictDetectorViewProps> = ({
  initialTitle = '',
  onNavigate,
}) => {
  const [proposedTitle, setProposedTitle] = useState(
    initialTitle || 'Automated Classroom Scheduling and Conflict Resolution Management System'
  );
  const [result, setResult] = useState<ConflictCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [filterThreshold, setFilterThreshold] = useState<number>(20);

  const sampleTitles = [
    'Automated Classroom Scheduling and Conflict Resolution Management System',
    'Deep CNN for Crop Foliar Disease Detection',
    'Student Internship Logbook and Geolocation Attendance Tracking Portal',
    'Hospital Patient Triage Priority Decision Support System',
    'Novel Blockchain-Driven Decentralized Identity Voting System for Student Councils',
  ];

  const runCheck = (titleToCheck?: string) => {
    const title = (titleToCheck || proposedTitle).trim();
    if (!title) return;

    setIsChecking(true);
    setTimeout(() => {
      const customBenchmarks = storageService.getBenchmarkTitles();
      const checkResult = detectTitleConflicts(title, customBenchmarks);
      setResult(checkResult);
      setIsChecking(false);
    }, 450);
  };

  useEffect(() => {
    if (initialTitle) {
      setProposedTitle(initialTitle);
      runCheck(initialTitle);
    } else {
      runCheck();
    }
  }, [initialTitle]);

  const filteredMatches = result
    ? result.matches.filter((m) => m.similarityScore >= filterThreshold)
    : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-navy-700 dark:text-navy-400 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Academic Overlap & Prior Art Validation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-academic-950 dark:text-academic-50 font-serif">
          Title Conflict & Similarity Detector
        </h1>
        <p className="text-xs sm:text-sm text-academic-600 dark:text-academic-400 max-w-3xl">
          Screen proposed project titles against benchmark repositories of previously defended university capstone projects to detect potential duplication and verify novelty.
        </p>
      </div>

      {/* Input Box Bar */}
      <div className="p-5 sm:p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-4 transition-colors">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runCheck();
          }}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={proposedTitle}
              onChange={(e) => setProposedTitle(e.target.value)}
              placeholder="Enter proposed capstone title to compare against benchmark repository..."
              className="w-full pl-3.5 pr-4 py-3 text-xs sm:text-sm rounded-xl border border-academic-300 dark:border-academic-700 focus:outline-none focus:ring-2 focus:ring-navy-600 bg-academic-50/50 dark:bg-academic-850 dark:text-academic-100 placeholder:text-academic-400"
            />
          </div>
          <button
            type="submit"
            disabled={isChecking || !proposedTitle.trim()}
            className="px-6 py-3 rounded-xl bg-navy-800 dark:bg-navy-600 hover:bg-navy-900 dark:hover:bg-navy-500 text-white font-semibold text-xs sm:text-sm shadow-academic flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Search className="w-4 h-4 text-navy-300" />
            <span>{isChecking ? 'Checking Repository...' : 'Check Similarity'}</span>
          </button>
        </form>

        {/* Quick test buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-academic-500 dark:text-academic-400">
          <span className="text-[11px] font-medium text-academic-400 dark:text-academic-500">Benchmark tests:</span>
          {sampleTitles.map((sample, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setProposedTitle(sample);
                runCheck(sample);
              }}
              className="px-2.5 py-1 rounded-md text-[11px] bg-academic-100 dark:bg-academic-800 hover:bg-academic-200 dark:hover:bg-academic-750 text-academic-700 dark:text-academic-300 transition-colors border border-academic-200 dark:border-academic-700 truncate max-w-[220px]"
            >
              &quot;{sample}&quot;
            </button>
          ))}
        </div>
      </div>

      {/* Results Workspace */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Advisory Banner */}
          <div
            className={`p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors ${
              result.overallConflictRisk === 'High'
                ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900'
                : result.overallConflictRisk === 'Moderate'
                ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900'
                : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-academic-600 dark:text-academic-400">
                  Overlap Assessment:
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide border ${
                    result.overallConflictRisk === 'High'
                      ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                      : result.overallConflictRisk === 'Moderate'
                      ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                      : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                  }`}
                >
                  {result.overallConflictRisk} Overlap Risk ({result.highestSimilarityScore}% Max Match)
                </span>
              </div>
              <p className="text-xs text-academic-800 dark:text-academic-200 font-medium max-w-2xl leading-relaxed pt-1">
                {result.academicAdvice}
              </p>
            </div>

            {/* Academic Notice Disclaimer */}
            <div className="p-3 bg-white/80 dark:bg-academic-850 rounded-xl border border-black/5 dark:border-white/10 text-[11px] text-academic-600 dark:text-academic-300 max-w-xs space-y-1">
              <div className="flex items-center gap-1 font-semibold text-academic-800 dark:text-academic-100">
                <HelpCircle className="w-3.5 h-3.5 text-navy-600 dark:text-navy-400" />
                <span>Ethical Review Note</span>
              </div>
              <p className="italic">
                Similarity does not imply plagiarism. Academic committees evaluate the distinctiveness of your dataset, methodology, and institutional client.
              </p>
            </div>
          </div>

          {/* Filtering Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-academic-900 dark:text-academic-100 font-serif text-sm">
                Potentially Similar Projects ({filteredMatches.length})
              </span>
              <span className="text-academic-400 dark:text-academic-500">
                (from {storageService.getBenchmarkTitles().length} repository titles)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-academic-400 dark:text-academic-500" />
              <span className="text-academic-500 dark:text-academic-400">Min Similarity:</span>
              {[20, 40, 60].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterThreshold(t)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                    filterThreshold === t
                      ? 'bg-navy-50 dark:bg-navy-950 text-navy-700 dark:text-navy-300 border-navy-300 dark:border-navy-700 font-bold'
                      : 'bg-white dark:bg-academic-850 text-academic-600 dark:text-academic-400 border-academic-200 dark:border-academic-700'
                  }`}
                >
                  {t}%+
                </button>
              ))}
            </div>
          </div>

          {/* Matches List */}
          {filteredMatches.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif">No Critical Overlap Found</h3>
              <p className="text-xs text-academic-500 dark:text-academic-400 max-w-md mx-auto">
                No existing benchmark projects in the repository exceeded the {filterThreshold}% similarity threshold for this title.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <div
                  key={match.benchmark.id}
                  className="p-5 sm:p-6 bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic-sm hover:border-academic-300 dark:hover:border-academic-700 transition-all space-y-4"
                >
                  {/* Title & Similarity Score */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="font-mono text-academic-400 dark:text-academic-500 font-medium">
                          #{match.benchmark.id}
                        </span>
                        <span className="font-semibold text-navy-700 dark:text-navy-300 bg-navy-50 dark:bg-navy-950/80 px-2 py-0.5 rounded border border-navy-100 dark:border-navy-800">
                          {match.benchmark.program}
                        </span>
                        <span className="text-academic-500 dark:text-academic-400 font-mono">
                          {match.benchmark.institution} ({match.benchmark.year})
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-academic-950 dark:text-academic-50 font-serif leading-snug pt-1">
                        &quot;{match.benchmark.title}&quot;
                      </h3>
                    </div>

                    {/* Similarity Indicator Pill */}
                    <div className="text-right shrink-0">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          match.similarityScore >= 70
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                            : match.similarityScore >= 45
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                            : 'bg-navy-50 dark:bg-navy-950/60 text-navy-700 dark:text-navy-300 border-navy-200 dark:border-navy-800'
                        }`}
                      >
                        <span>{match.similarityScore}% Similarity</span>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                    {/* Matching Concepts */}
                    <div className="p-3.5 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1.5">
                      <span className="text-[11px] font-semibold text-academic-700 dark:text-academic-300 uppercase tracking-wider block">
                        Matching Concepts & Keywords
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {match.matchingConcepts.map((concept, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white dark:bg-academic-800 border border-academic-200 dark:border-academic-700 text-[11px] text-academic-700 dark:text-academic-300 font-medium"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Differences */}
                    <div className="p-3.5 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1.5">
                      <span className="text-[11px] font-semibold text-academic-700 dark:text-academic-300 uppercase tracking-wider block">
                        Distinct Differences Identified
                      </span>
                      <ul className="list-disc list-inside text-academic-600 dark:text-academic-400 text-[11px] space-y-1">
                        {match.differences.map((diff, i) => (
                          <li key={i}>{diff}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Potential conflict explanation */}
                  <div className="p-3 rounded-xl bg-academic-50/70 dark:bg-academic-850 border border-academic-100 dark:border-academic-750 text-xs text-academic-700 dark:text-academic-300 leading-relaxed">
                    <span className="font-semibold text-academic-900 dark:text-academic-100">Advisory Synthesis: </span>
                    {match.explanation}
                  </div>

                  {/* Quick Action */}
                  <div className="pt-2 border-t border-academic-100 dark:border-academic-800 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onNavigate('analyzer', { title: match.benchmark.title })}
                      className="text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-200 font-medium text-[11px] flex items-center gap-1"
                    >
                      <span>Analyze this benchmark title</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onNavigate('concept', { idea: match.benchmark.title })}
                      className="text-academic-500 dark:text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 text-[11px]"
                    >
                      View Blueprint
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
