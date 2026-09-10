import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Activity,
  Cpu,
  Zap,
  TrendingUp,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Building2,
  Atom,
  RefreshCw,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const CampusIntelligence: React.FC = () => {
  const { quantumState, cycleQuantumState, campusStats } = useApp();
  const [activeView, setActiveView] = useState<'analytics' | 'quantum'>('analytics');

  // Department Attendance Trends Data
  const deptData = [
    { name: 'CSE', attendance: 86, performance: 84, roomsUsed: 92 },
    { name: 'ECE', attendance: 79, performance: 81, roomsUsed: 84 },
    { name: 'MECH', attendance: 74, performance: 76, roomsUsed: 78 },
    { name: 'CIVIL', attendance: 81, performance: 77, roomsUsed: 80 },
    { name: 'IT', attendance: 88, performance: 89, roomsUsed: 87 },
  ];

  // Semester Exam Performance Forecast (Historical vs AI Predicted)
  const forecastData = [
    { sem: 'Sem 1', historical: 8.1, predicted: 8.1 },
    { sem: 'Sem 2', historical: 8.24, predicted: 8.24 },
    { sem: 'Sem 3 (Current)', historical: 8.42, predicted: 8.5 },
    { sem: 'Sem 4 (AI Forecast)', historical: null, predicted: 8.8 },
    { sem: 'Sem 5 (AI Forecast)', historical: null, predicted: 9.05 },
  ];

  // Room Utilization Pie Data
  const roomUtilization = [
    { name: 'Active Lectures', value: 62, color: '#6366f1' },
    { name: 'Labs in Session', value: 22, color: '#06b6d4' },
    { name: 'Vacant / Study', value: 11, color: '#10b981' },
    { name: 'Maintenance', value: 5, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-1">
            <Cpu className="w-3.5 h-3.5" />
            Macro-Campus Predictive Engine & Quantum State Analytics
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            AI Campus Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time telemetry across academic performance, campus facilities, and at-risk student mitigation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => cycleQuantumState()}
            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <Atom className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Shift Quantum State ({quantumState})</span>
          </button>
        </div>
      </div>

      {/* Top Banner: Campus Intelligence Score & Quantum Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 text-white shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-indigo-300 font-semibold">
              Campus Intelligence Score
            </span>
            <div className="text-4xl font-extrabold font-mono text-cyan-400 mt-1">
              {campusStats.campusIntelligenceScore} <span className="text-lg text-slate-400">/ 100</span>
            </div>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3 h-3" /> High Operational Efficiency
            </div>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shrink-0">
            <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Quantum State Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/30 text-white shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
            <span>QUANTUM HARMONIC STATE</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 uppercase font-bold text-[10px] text-cyan-300">
              {quantumState}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold">
              {quantumState === 'coherent'
                ? 'High-Coherence Resonance'
                : quantumState === 'superposition'
                ? 'Superposition Multi-Stream'
                : 'Accelerated Entanglement'}
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Campus physical & digital nodes synchronized with 99.4% telemetry fidelity.
            </p>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-3">
            <div
              className={`h-full transition-all duration-700 ${
                quantumState === 'coherent'
                  ? 'w-[94%] bg-cyan-400'
                  : quantumState === 'superposition'
                  ? 'w-[78%] bg-purple-400'
                  : 'w-[88%] bg-amber-400'
              }`}
            />
          </div>
        </div>

        {/* Paperwork Reduction & Space Utilization */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-medium">Digital Transformation</span>
            <span className="text-xs font-mono font-bold text-emerald-500">
              {campusStats.paperworkReduced} Digitized
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Classroom Utilization</span>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {campusStats.roomUtilization}% Optimal
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full w-[84%]" />
          </div>
        </div>
      </div>

      {/* 2-Column: Department Trends & Academic Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department Attendance & Performance Comparison */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Departmental Attendance & Performance Correlation
              </h3>
              <p className="text-[11px] text-slate-400">
                Comparing CSE, ECE, MECH, CIVIL & IT cohorts
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              Avg: 81.6%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="attendance" fill="#6366f1" radius={[6, 6, 0, 0]} name="Attendance %" />
                <Bar dataKey="performance" fill="#06b6d4" radius={[6, 6, 0, 0]} name="Academic Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-indigo-600" /> Attendance %
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-cyan-500" /> Academic Score %
            </span>
          </div>
        </div>

        {/* Right: Academic Forecast with AI Trajectory */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                CGPA Trajectory & Predictive Horizon
              </h3>
              <p className="text-[11px] text-slate-400">
                Machine learning forecast based on study habits
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-500">
              Projected: 9.05
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis dataKey="sem" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[7.5, 9.5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#predictedGrad)"
                  name="CGPA Trajectory"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-[11px] text-indigo-700 dark:text-indigo-300">
            💡 <strong>Forecast Insight:</strong> Maintaining the current 4.5 hours daily study routine and raising Discrete Math marks yields a 92% probability of reaching the 9.0 honor roll by Semester 5.
          </div>
        </div>
      </div>

      {/* At-Risk Students Triage Table & Real-Time Alerts */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Early Warning Intervention Radar
              </h3>
              <p className="text-[11px] text-slate-400">
                12 students flagged across campus for attendance or grade remediation
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">
            Active Alerts: 3 Critical
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-slate-900 dark:text-white">Rohan Gupta (22CS085)</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-500 text-white">CRITICAL</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Attendance: <strong className="text-rose-600">62.1%</strong> (Below 65% Condone Limit)
            </div>
            <div className="text-[10px] text-slate-400">
              Trigger: Missed 8 consecutive Discrete Math & DLD classes. Mentor counseling dispatched.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-slate-900 dark:text-white">Varun Joshi (22CS088)</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white">WARNING</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Attendance: <strong className="text-amber-600">71.4%</strong> • Mid-term: 27/40
            </div>
            <div className="text-[10px] text-slate-400">
              Action: Auto-assigned remedial practice sessions in Smart Study Planner.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-slate-900 dark:text-white">Rahul Sharma (22CS084)</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-500 text-white">MONITOR</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Attendance: <strong className="text-indigo-600">78.0%</strong> (Math at 69.4%)
            </div>
            <div className="text-[10px] text-slate-400">
              Action: Requires 4 consecutive math classes to guarantee semester exam admit ticket.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
