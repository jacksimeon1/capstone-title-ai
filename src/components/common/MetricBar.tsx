import React from 'react';

interface MetricBarProps {
  label: string;
  value: number; // 0 - 100
  subtitle?: string;
  weight?: string;
}

export const MetricBar: React.FC<MetricBarProps> = ({ label, value, subtitle, weight }) => {
  let barColor = 'bg-navy-500';
  let badgeColor = 'text-navy-700 dark:text-navy-300 bg-navy-50 dark:bg-navy-950/60 border-navy-200 dark:border-navy-800';

  if (value >= 85) {
    barColor = 'bg-emerald-500';
    badgeColor = 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
  } else if (value >= 70) {
    barColor = 'bg-navy-500';
    badgeColor = 'text-navy-700 dark:text-navy-300 bg-navy-50 dark:bg-navy-950/60 border-navy-200 dark:border-navy-800';
  } else if (value >= 55) {
    barColor = 'bg-amber-500';
    badgeColor = 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
  } else {
    barColor = 'bg-rose-500';
    badgeColor = 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium text-academic-700 dark:text-academic-300">
          <span>{label}</span>
          {weight && <span className="text-[10px] text-academic-400 dark:text-academic-500 font-mono">({weight})</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}`}>
            {value}%
          </span>
        </div>
      </div>
      <div className="w-full bg-academic-200 dark:bg-academic-800 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {subtitle && <p className="text-[11px] text-academic-500 dark:text-academic-400 leading-tight">{subtitle}</p>}
    </div>
  );
};
