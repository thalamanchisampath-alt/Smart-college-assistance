import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  GraduationCap,
  Sparkles,
  BookOpen,
  MapPin,
  Clock,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Flame,
  Bot,
  Zap,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { student, subjects, studyTasks, notifications, setActiveTab, setIsChatOpen } = useApp();

  const totalAttended = subjects.reduce((a, b) => a + b.attended, 0);
  const totalConducted = subjects.reduce((a, b) => a + b.total, 0);
  const overallPct = Math.round((totalAttended / totalConducted) * 1000) / 10;

  const lowSubject = subjects.find((s) => (s.attended / s.total) * 100 < 75);
  const urgentNotif = notifications.find((n) => n.priority === 'urgent' || n.priority === 'high');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Student Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 border border-indigo-500/20 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cyan-300 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              Academic Term Active • CSE Semester 3
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {student.name}!
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
              Roll No: <span className="font-mono text-white">{student.rollNo}</span> • Section A • Mentor:{' '}
              {student.mentor.split('(')[0]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="student-dashboard-chat-btn"
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>Ask Campus AI</span>
            </button>

            <button
              id="student-dashboard-plan-btn"
              onClick={() => setActiveTab('planner')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Study Planner</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Diagnostic Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Status */}
        <div
          onClick={() => setActiveTab('attendance')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Overall Attendance</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              {overallPct}%
            </span>
            <span className="text-[11px] text-emerald-500 font-semibold font-mono">
              Safe (&gt;75%)
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallPct}%` }} />
          </div>
          <div className="mt-3 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline flex items-center gap-1">
            <span>Run What-If Predictor</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* CGPA Status */}
        <div
          onClick={() => setActiveTab('cgpa')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Current CGPA</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              {student.currentCgpa}
            </span>
            <span className="text-[11px] text-amber-500 font-semibold">
              Goal: {student.targetCgpa}
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '81%' }} />
          </div>
          <div className="mt-3 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline flex items-center gap-1">
            <span>9.0 CGPA Roadmap</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Study Streak */}
        <div
          onClick={() => setActiveTab('planner')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Study Streak</span>
            <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              6 Days
            </span>
            <span className="text-[11px] text-orange-500 font-semibold">🔥 Active</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-orange-500 rounded-full w-[85%]" />
          </div>
          <div className="mt-3 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline flex items-center gap-1">
            <span>View Today's Plan</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Empty Classrooms Radar */}
        <div
          onClick={() => setActiveTab('navigation')}
          className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Campus Radar</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
              14 Free
            </span>
            <span className="text-[11px] text-emerald-500 font-semibold">Classrooms</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-cyan-500 rounded-full w-[70%]" />
          </div>
          <div className="mt-3 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline flex items-center gap-1">
            <span>Find Empty Rooms</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Critical Alert Banner if Discrete Math attendance is low */}
      {lowSubject && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-rose-900 dark:text-rose-200 font-bold block">
                Attendance Shortage Warning: {lowSubject.name} ({Math.round((lowSubject.attended / lowSubject.total) * 100)}%)
              </strong>
              <span className="text-rose-700 dark:text-rose-300">
                You are 2.8% below the mandatory 75% examination threshold. Attend the next 4 lectures consecutively.
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('attendance')}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs whitespace-nowrap self-start sm:self-auto shadow-xs"
          >
            Simulate Catch-Up
          </button>
        </div>
      )}

      {/* 2-Column: Today's AI Schedule + Latest Campus Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's AI Study Schedule Teaser */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Today's Personalized Study Slots
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('planner')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Full Planner →
            </button>
          </div>

          <div className="space-y-2.5">
            {studyTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                    {task.time}
                  </span>
                  <div>
                    <div className={`font-semibold text-slate-900 dark:text-white ${task.completed ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </div>
                    <div className="text-[10px] text-slate-400">{task.subject} • {task.duration}</div>
                  </div>
                </div>

                <span
                  className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                    task.priority === 'high'
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Verified Circulars */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Official Announcements
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('notifications')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              All Circulars →
            </button>
          </div>

          <div className="space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <div
                key={n.id}
                onClick={() => setActiveTab('notifications')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {n.title}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {n.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {n.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
