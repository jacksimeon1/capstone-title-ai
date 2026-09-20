import React from 'react';
import { GraduationCap, Shield, BookOpen, Code2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-950 text-academic-600 dark:text-academic-400 text-xs py-10 mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-navy-800 dark:bg-navy-700 text-white flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-navy-200" />
              </div>
              <span className="font-bold text-sm text-academic-900 dark:text-academic-50 font-serif">
                CAPSTONE TITLE AI
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold uppercase">
                Open Source
              </span>
            </div>
            <p className="text-academic-500 dark:text-academic-400 leading-relaxed max-w-md">
              Intelligent Open-Source Capstone Project Title Generator, Research Assistant, and Title Validation Platform.
              Engineered to help students, thesis committees, and academic researchers conceptualize,
              validate, and defend robust technology projects with zero barrier to entry.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-academic-500 dark:text-academic-400">
              <Shield className="w-3.5 h-3.5 text-navy-600 dark:text-navy-400" />
              <span>Compliant with IEEE / ACM academic thesis documentation structures</span>
            </div>
          </div>

          {/* Column 2: Tools */}
          <div className="space-y-2">
            <h4 className="font-semibold text-academic-900 dark:text-academic-200 uppercase text-[11px] tracking-wider">
              Research Engines
            </h4>
            <ul className="space-y-1.5 text-academic-500 dark:text-academic-400">
              <li>
                <button onClick={() => setActiveTab('generator')} className="hover:text-navy-600 dark:hover:text-navy-400 transition-colors">
                  AI Title Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('analyzer')} className="hover:text-navy-600 dark:hover:text-navy-400 transition-colors">
                  Structural Title Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('conflict')} className="hover:text-navy-600 dark:hover:text-navy-400 transition-colors">
                  Conflict & Duplicate Detector
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('feasibility')} className="hover:text-navy-600 dark:hover:text-navy-400 transition-colors">
                  Timeline & Resource Feasibility
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('concept')} className="hover:text-navy-600 dark:hover:text-navy-400 transition-colors">
                  Idea to Blueprint Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Defense Resources */}
          <div className="space-y-2">
            <h4 className="font-semibold text-academic-900 dark:text-academic-200 uppercase text-[11px] tracking-wider">
              Academic Standards
            </h4>
            <ul className="space-y-1.5 text-academic-500 dark:text-academic-400">
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-academic-400 dark:text-academic-500" />
                <span>ISO/IEC 25010 Software Quality</span>
              </li>
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-academic-400 dark:text-academic-500" />
                <span>System Usability Scale (SUS)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-academic-400 dark:text-academic-500" />
                <span>ACM Computing Classification</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Code2 className="w-3 h-3 text-emerald-500" />
                <span>Privacy-First: 100% Client-Side</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-academic-100 dark:border-academic-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-academic-400 dark:text-academic-500">
          <p>
            © {new Date().getFullYear()} Capstone Title AI. Free & Open Source academic defense tool.
          </p>
          <p className="italic max-w-xl text-center md:text-right">
            Disclaimer: All algorithmic indicators, similarity scores, and feasibility estimates are AI-assisted academic heuristics and do not constitute an official faculty committee endorsement.
          </p>
        </div>
      </div>
    </footer>
  );
};
