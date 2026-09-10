import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Info,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';

export const AttendancePredictor: React.FC = () => {
  const { subjects, student } = useApp();

  // Aggregate stats
  const totalAttended = subjects.reduce((acc, s) => acc + s.attended, 0);
  const totalConducted = subjects.reduce((acc, s) => acc + s.total, 0);
  const currentOverallPct = Math.round((totalAttended / totalConducted) * 1000) / 10;

  // Simulator state
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [classesToMiss, setClassesToMiss] = useState<number>(3);
  const [extraClassesToAttend, setExtraClassesToAttend] = useState<number>(0);

  // Active calculation context
  const activeSubject = selectedSubjectId === 'all'
    ? null
    : subjects.find((s) => s.id === selectedSubjectId);

  const activeAttended = activeSubject ? activeSubject.attended : totalAttended;
  const activeTotal = activeSubject ? activeSubject.total : totalConducted;
  const activeCurrentPct = Math.round((activeAttended / activeTotal) * 1000) / 10;

  // Simulation calculations:
  // If user misses `classesToMiss`:
  // New attended = activeAttended
  // New total = activeTotal + classesToMiss
  const simulatedTotalAfterMiss = activeTotal + classesToMiss;
  const simulatedAttendedAfterMiss = activeAttended;
  const simulatedPctAfterMiss =
    Math.round((simulatedAttendedAfterMiss / simulatedTotalAfterMiss) * 1000) / 10;

  // Safe miss margin: how many classes can they miss without dropping below 75%?
  // attended / (total + M) >= 0.75
  // attended >= 0.75 * total + 0.75 * M
  // M <= (attended - 0.75 * total) / 0.75
  const safeMissCount = Math.max(
    0,
    Math.floor((activeAttended - 0.75 * activeTotal) / 0.75)
  );

  // If currently below 75%, how many consecutive classes MUST they attend to reach 75%?
  // (attended + C) / (total + C) >= 0.75
  // attended + C >= 0.75 * total + 0.75 * C
  // 0.25 * C >= 0.75 * total - attended
  // C >= (0.75 * total - attended) / 0.25
  const classesNeededFor75 =
    activeCurrentPct < 75
      ? Math.max(0, Math.ceil((0.75 * activeTotal - activeAttended) / 0.25))
      : 0;

  // Simulation with extra attended
  const simulatedWithExtraTotal = activeTotal + extraClassesToAttend;
  const simulatedWithExtraAttended = activeAttended + extraClassesToAttend;
  const simulatedWithExtraPct =
    Math.round((simulatedWithExtraAttended / simulatedWithExtraTotal) * 1000) / 10;

  // Circular gauge calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (simulatedPctAfterMiss / 100) * circumference;

  const gaugeColor =
    simulatedPctAfterMiss >= 80
      ? 'text-emerald-500'
      : simulatedPctAfterMiss >= 75
      ? 'text-amber-500'
      : 'text-rose-500';

  const gaugeBgColor =
    simulatedPctAfterMiss >= 75 ? 'bg-emerald-500/10' : 'bg-rose-500/10';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            AI Predictive Attendance Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Attendance & Risk Predictor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Simulate absences, monitor safe thresholds, and safeguard your semester exam eligibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            Mandatory Target: <strong className="text-emerald-500">75.0%</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Predictor Card + Overall Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Interactive Predictor Engine */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  What-If Attendance Simulator
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select a subject or simulate aggregate campus attendance
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold">
              REAL-TIME
            </span>
          </div>

          {/* Scope Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select Simulation Target:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                id="sim-target-all"
                onClick={() => setSelectedSubjectId('all')}
                className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all ${
                  selectedSubjectId === 'all'
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div>All Subjects Combined</div>
                <div className="text-[10px] opacity-75">{currentOverallPct}% Current</div>
              </button>

              {subjects.map((sub) => {
                const subPct = Math.round((sub.attended / sub.total) * 1000) / 10;
                return (
                  <button
                    key={sub.id}
                    id={`sim-target-${sub.id}`}
                    onClick={() => setSelectedSubjectId(sub.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all truncate ${
                      selectedSubjectId === sub.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="truncate">{sub.name.split(' ')[0]} ({sub.code})</div>
                    <div className={`text-[10px] font-mono ${subPct < 75 ? 'text-rose-500 font-bold' : 'opacity-75'}`}>
                      {subPct}% ({sub.attended}/{sub.total})
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <span>Classes You May Miss:</span>
                <span className="font-mono text-sm px-2.5 py-0.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                  {classesToMiss} classes
                </span>
              </div>
              <input
                id="missed-classes-slider"
                type="range"
                min={0}
                max={15}
                value={classesToMiss}
                onChange={(e) => setClassesToMiss(Number(e.target.value))}
                className="w-full accent-rose-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0</span>
                <span>5</span>
                <span>10</span>
                <span>15 classes</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <span>Classes to Attend Without Absence:</span>
                <span className="font-mono text-sm px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  +{extraClassesToAttend} classes
                </span>
              </div>
              <input
                id="extra-classes-slider"
                type="range"
                min={0}
                max={15}
                value={extraClassesToAttend}
                onChange={(e) => setExtraClassesToAttend(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* AI Output Banner */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              simulatedPctAfterMiss < 75
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {simulatedPctAfterMiss < 75 ? (
                <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider">
                  AI Prediction Calculation
                </div>
                <p className="text-sm font-semibold leading-snug">
                  “If you miss <span className="underline font-bold">{classesToMiss}</span> more classes, your attendance will become{' '}
                  <span className={`text-base font-extrabold font-mono ${simulatedPctAfterMiss < 75 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {simulatedPctAfterMiss}%
                  </span>.”
                </p>
                {simulatedPctAfterMiss < 75 ? (
                  <p className="text-xs text-rose-600 dark:text-rose-300 font-medium">
                    ⚠️ Warning: This falls below the mandatory 75% examination eligibility limit! You may be debarred from end-semester tests.
                  </p>
                ) : (
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                    ✓ Safe zone maintained: You will remain eligible for upcoming lab and theory exams.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actionable Threshold Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Safe Absences Remaining
              </span>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                {safeMissCount} <span className="text-xs font-normal">classes</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Maximum classes you can miss while keeping ≥ 75.0%
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Classes Needed for 75% Target
              </span>
              <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                {classesNeededFor75 > 0 ? (
                  <span className="text-rose-500 font-bold">{classesNeededFor75} classes</span>
                ) : (
                  <span className="text-emerald-500 text-base font-semibold">Already Above 75%</span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {classesNeededFor75 > 0 ? 'Consecutive attendances required' : 'No recovery required'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Gauge & Overall Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Circular Gauge */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 text-center space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Simulated Attendance Gauge
              </span>
              <span className="text-[11px] font-mono text-slate-400">Target: 75%</span>
            </div>

            <div className="relative flex items-center justify-center py-4">
              <svg className="w-48 h-48 -rotate-90">
                {/* Background track */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  className="text-slate-100 dark:text-slate-800 stroke-current"
                  strokeWidth="14"
                  fill="transparent"
                />
                {/* 75% reference ring line */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  className="stroke-amber-400/40"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  fill="transparent"
                />
                {/* Dynamic progress arc */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  className={`${gaugeColor} stroke-current transition-all duration-500 ease-out`}
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {simulatedPctAfterMiss}%
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {simulatedPctAfterMiss >= 75 ? 'ELIGIBLE' : 'DEBARRED RISK'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1">
                  Current: {activeCurrentPct}%
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-400 text-left space-y-1">
              <div className="flex justify-between">
                <span>Total Classes Conducted:</span>
                <strong className="text-slate-900 dark:text-white font-mono">{activeTotal}</strong>
              </div>
              <div className="flex justify-between">
                <span>Classes Attended:</span>
                <strong className="text-slate-900 dark:text-white font-mono">{activeAttended}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Absent:</span>
                <strong className="text-rose-500 font-mono">{activeTotal - activeAttended}</strong>
              </div>
            </div>
          </div>

          {/* Quick AI Tip Card */}
          <div className="rounded-3xl p-5 bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-500/20 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Campus AI Advisory</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Discrete Mathematics (MA301) is currently at <strong className="text-rose-400">69.4%</strong>. You need to attend the next <strong>4 consecutive lectures</strong> to lift it back above 75%.
            </p>
          </div>
        </div>
      </div>

      {/* Subject-Wise Breakdown Table & Trend */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Subject-Wise Attendance Matrix
          </h2>
          <span className="text-xs text-slate-500">Current Semester 3</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-medium pb-2">
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Faculty</th>
                <th className="py-2.5 px-3">Attended / Total</th>
                <th className="py-2.5 px-3">Percentage</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Recent 5 Classes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {subjects.map((sub) => {
                const pct = Math.round((sub.attended / sub.total) * 1000) / 10;
                const isShortage = pct < 75;
                return (
                  <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{sub.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{sub.code} • {sub.credits} Credits</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{sub.faculty}</td>
                    <td className="py-3 px-3 font-mono font-medium text-slate-900 dark:text-white">
                      {sub.attended} / {sub.total}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pct >= 85 ? 'bg-emerald-500' : pct >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                        <span className={`font-mono font-bold ${isShortage ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}`}>
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {isShortage ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <AlertTriangle className="w-3 h-3" /> Shortage
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> On Track
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        {sub.recentTrend.map((present, idx) => (
                          <span
                            key={idx}
                            title={present ? 'Present' : 'Absent'}
                            className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center font-mono ${
                              present
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {present ? 'P' : 'A'}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
