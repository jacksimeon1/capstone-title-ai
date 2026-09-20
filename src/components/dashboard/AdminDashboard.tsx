import React, { useState, useEffect } from 'react';
import {
  Database,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Layers,
  Code2,
  Globe2,
  X
} from 'lucide-react';
import { AcademicProgram, BenchmarkTitle } from '../../types';
import { storageService } from '../../services/storageService';
import { ACADEMIC_PROGRAMS } from '../../data/academicPrograms';

export const AdminDashboard: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<BenchmarkTitle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // New title modal state
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newProgram, setNewProgram] = useState<AcademicProgram>('Information Technology');
  const [newInstitution, setNewInstitution] = useState('State Polytechnic University');
  const [newKeywords, setNewKeywords] = useState('');
  const [newTechnologies, setNewTechnologies] = useState('React, Node.js, PostgreSQL');

  useEffect(() => {
    setBenchmarks(storageService.getBenchmarkTitles());
  }, []);

  const handleStatusChange = (id: string, status: 'Approved' | 'Archived' | 'Flagged') => {
    storageService.updateBenchmarkStatus(id, status);
    setBenchmarks(storageService.getBenchmarkTitles());
  };

  const handleDelete = (id: string) => {
    storageService.deleteBenchmarkTitle(id);
    setBenchmarks(storageService.getBenchmarkTitles());
  };

  const handleCreateBenchmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: BenchmarkTitle = {
      id: `BM-OPEN-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      program: newProgram,
      category: 'Community Contributed Benchmark',
      year: new Date().getFullYear(),
      institution: newInstitution.trim() || 'Open Research Repository',
      keywords: newKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      technologies: newTechnologies.split(',').map((t) => t.trim()).filter(Boolean),
      targetUsers: ['Students', 'Teachers & Faculty', 'Researchers'],
      complexity: 'Moderate',
      status: 'Approved',
    };

    storageService.addBenchmarkTitle(created);
    setBenchmarks(storageService.getBenchmarkTitles());
    setIsAdding(false);
    setNewTitle('');
    setNewKeywords('');
  };

  // Filtered benchmarks
  const filteredBenchmarks = benchmarks.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
      b.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = selectedProgram === 'All' || b.program === selectedProgram;
    const matchesStatus = selectedStatus === 'All' || b.status === selectedStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  // Calculate high-level repository analytics
  const totalTitles = benchmarks.length;
  const approvedCount = benchmarks.filter((b) => b.status === 'Approved').length;
  const flaggedCount = benchmarks.filter((b) => b.status === 'Flagged').length;

  const programCounts: Record<string, number> = {};
  benchmarks.forEach((b) => {
    programCounts[b.program] = (programCounts[b.program] || 0) + 1;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Repository Header */}
      <div className="p-6 bg-gradient-to-r from-academic-900 via-purple-950 to-academic-950 dark:from-academic-950 dark:via-purple-950 dark:to-academic-900 text-white rounded-3xl shadow-academic-lg border border-purple-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Globe2 className="w-4 h-4 text-purple-400" />
            <span>Open Source Academic Repository & Corpus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Community Benchmark Repository & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl">
            Explore 100+ approved capstone titles, audit prior-art datasets used by the conflict engine, and contribute approved benchmark titles directly.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Contribute Benchmark Title</span>
        </button>
      </div>

      {/* Analytics Statistics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm space-y-1">
          <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
            Repository Database
          </span>
          <div className="text-2xl font-extrabold text-academic-950 dark:text-academic-50 font-serif">
            {totalTitles}
          </div>
          <p className="text-[11px] text-academic-400 dark:text-academic-500">Benchmark records stored</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm space-y-1">
          <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
            Approved Titles
          </span>
          <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-serif">
            {approvedCount}
          </div>
          <p className="text-[11px] text-academic-400 dark:text-academic-500">Active for conflict detection</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm space-y-1">
          <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
            Flagged for Overlap
          </span>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-serif">
            {flaggedCount}
          </div>
          <p className="text-[11px] text-academic-400 dark:text-academic-500">Duplicate alerts logged</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-academic-900 border border-academic-200 dark:border-academic-800 shadow-academic-sm space-y-1">
          <span className="text-[11px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider block">
            Academic Disciplines
          </span>
          <div className="text-2xl font-extrabold text-navy-700 dark:text-navy-300 font-serif">
            {Object.keys(programCounts).length}
          </div>
          <p className="text-[11px] text-academic-400 dark:text-academic-500">Active degree specializations</p>
        </div>
      </div>

      {/* Program Distribution Breakdown */}
      <div className="bg-white dark:bg-academic-900 p-6 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic space-y-4">
        <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Repository Discipline Distribution</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(programCounts).slice(0, 6).map(([prog, count]) => (
            <div key={prog} className="p-3 rounded-xl bg-academic-50 dark:bg-academic-850 border border-academic-200 dark:border-academic-750 space-y-1 text-xs">
              <span className="text-[11px] text-academic-500 dark:text-academic-400 font-medium truncate block">
                {prog}
              </span>
              <div className="font-bold text-academic-900 dark:text-academic-100 text-base">{count} titles</div>
            </div>
          ))}
        </div>
      </div>

      {/* Repository Filter & Table */}
      <div className="bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-academic overflow-hidden space-y-4 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-academic-100 dark:border-academic-800">
          <h2 className="text-sm font-bold text-academic-900 dark:text-academic-100 font-serif flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Benchmark Title Records ({filteredBenchmarks.length})</span>
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search titles or keywords..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-900 dark:text-academic-100 text-xs focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
              <Search className="w-3.5 h-3.5 text-academic-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Program Filter */}
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-800 text-xs text-academic-700 dark:text-academic-200 focus:outline-none"
            >
              <option value="All">All Disciplines</option>
              {ACADEMIC_PROGRAMS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-800 text-xs text-academic-700 dark:text-academic-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Flagged">Flagged</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Benchmarks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-academic-200 dark:border-academic-800 bg-academic-50 dark:bg-academic-850 text-academic-600 dark:text-academic-400">
                <th className="py-2.5 px-3 font-semibold">Title & ID</th>
                <th className="py-2.5 px-3 font-semibold">Discipline</th>
                <th className="py-2.5 px-3 font-semibold">Institution & Year</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-academic-100 dark:divide-academic-800">
              {filteredBenchmarks.map((b) => (
                <tr key={b.id} className="hover:bg-academic-50/50 dark:hover:bg-academic-850/50 transition-colors">
                  <td className="py-3 px-3 max-w-md">
                    <div className="font-mono text-[10px] text-academic-400">#{b.id}</div>
                    <div className="font-semibold text-academic-950 dark:text-academic-50 font-serif leading-snug">
                      &quot;{b.title}&quot;
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {b.keywords.slice(0, 3).map((kw, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-academic-100 dark:bg-academic-800 text-academic-600 dark:text-academic-400 border border-academic-200 dark:border-academic-700">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-academic-700 dark:text-academic-300 whitespace-nowrap">{b.program}</td>
                  <td className="py-3 px-3 text-academic-600 dark:text-academic-400 whitespace-nowrap">
                    {b.institution} ({b.year})
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        b.status === 'Approved'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : b.status === 'Flagged'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-academic-100 dark:bg-academic-800 text-academic-600 dark:text-academic-400 border border-academic-200 dark:border-academic-700'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {b.status !== 'Approved' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'Approved')}
                          className="p-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-academic-800 rounded transition-colors"
                          title="Approve"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {b.status !== 'Flagged' && (
                        <button
                          onClick={() => handleStatusChange(b.id, 'Flagged')}
                          className="p-1 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-academic-800 rounded transition-colors"
                          title="Flag Overlap Concern"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-1 text-academic-400 hover:text-rose-600 dark:hover:text-rose-400 rounded transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New Benchmark */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-academic-900 rounded-2xl border border-academic-200 dark:border-academic-800 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-academic-950 dark:text-academic-50 font-serif">
                Add Benchmark Title to Open Database
              </h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-academic-400 hover:text-academic-600 dark:hover:text-academic-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateBenchmark} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-academic-800 dark:text-academic-200">Benchmark Title *</label>
                <textarea
                  required
                  rows={2}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Automated Greenhouse Monitoring System Using LoRaWAN and Edge Computing..."
                  className="w-full p-2.5 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-900 dark:text-academic-100 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-academic-800 dark:text-academic-200">Discipline</label>
                  <select
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value as AcademicProgram)}
                    className="w-full p-2 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-900 dark:text-academic-100"
                  >
                    {ACADEMIC_PROGRAMS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-academic-800 dark:text-academic-200">Institution / Source</label>
                  <input
                    type="text"
                    value={newInstitution}
                    onChange={(e) => setNewInstitution(e.target.value)}
                    className="w-full p-2 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-900 dark:text-academic-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-academic-800 dark:text-academic-200">Keywords (Comma-separated)</label>
                <input
                  type="text"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  placeholder="iot, edge computing, agriculture"
                  className="w-full p-2 rounded-lg border border-academic-300 dark:border-academic-700 bg-white dark:bg-academic-800 text-academic-900 dark:text-academic-100"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-lg border border-academic-300 dark:border-academic-700 text-academic-700 dark:text-academic-300 hover:bg-academic-50 dark:hover:bg-academic-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-semibold shadow-sm"
                >
                  Save to Benchmark Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
