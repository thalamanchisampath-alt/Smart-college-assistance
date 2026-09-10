import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Calendar,
  Award,
  Phone,
  Mail,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const { student, subjects, grades, assignments, notifications } = useApp();

  const totalAttended = subjects.reduce((acc, s) => acc + s.attended, 0);
  const totalConducted = subjects.reduce((acc, s) => acc + s.total, 0);
  const overallPct = Math.round((totalAttended / totalConducted) * 1000) / 10;

  // Discrete math check
  const mathSub = subjects.find((s) => s.code === 'MA301');
  const mathPct = mathSub ? Math.round((mathSub.attended / mathSub.total) * 100) : 69;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-1">
            <Users className="w-3.5 h-3.5" />
            Guardian & Parent Transparency View
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Parent Portal • Academic Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monitoring Ward: <strong className="text-slate-900 dark:text-white">{student.name}</strong> (Roll No: {student.rollNo}, {student.branch})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
            Mentor: <strong className="text-indigo-600 dark:text-indigo-400">{student.mentor.split('(')[0]}</strong>
          </div>
        </div>
      </div>

      {/* AI-Generated Plain-English Executive Summary */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-500/30 text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>AI Campus Ward Assessment</span>
        </div>
        <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-100">
          “Your student <span className="text-white font-bold">{student.name}</span> has maintained a good overall attendance of{' '}
          <span className="text-emerald-400 font-bold font-mono">{overallPct}%</span> and strong coding grades in Python and Data Structures, but{' '}
          <span className="text-amber-300 font-semibold underline">needs immediate improvement in Discrete Mathematics</span> where attendance is currently at {mathPct}% and internal score is 27/40.”
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
          <span>✓ Fee Dues: Clear (₹0 Outstanding)</span>
          <span>•</span>
          <span>✓ Next Exam: Oct 15, 2026</span>
          <span>•</span>
          <span>✓ No Disciplinary Infractions</span>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Overall Attendance</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {overallPct}%
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">Above 75% College Cutoff</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Academic CGPA</span>
          <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            {student.currentCgpa} <span className="text-xs font-normal text-slate-400">/ 10</span>
          </div>
          <span className="text-[10px] text-slate-400">Class Rank: Top 15%</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Assignments Turned In</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {assignments.filter((a) => a.status !== 'pending').length} / {assignments.length}
          </div>
          <span className="text-[10px] text-slate-400">1 assignment due tonight</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">College Fee Status</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            PAID
          </div>
          <span className="text-[10px] text-slate-400">Receipt #APX-2026-891</span>
        </div>
      </div>

      {/* 2-Column: Subject Marks Breakdown & Fee Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Simplified Subject Breakdown for Parents */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Subject Attendance & Internal Marks
            </h3>
            <span className="text-[11px] text-slate-400">Semester 3</span>
          </div>

          <div className="space-y-3">
            {subjects.map((sub) => {
              const gradeItem = grades.find((g) => g.id === sub.id);
              const pct = Math.round((sub.attended / sub.total) * 100);
              const isLow = pct < 75;

              return (
                <div
                  key={sub.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-white">
                      {sub.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Teacher: {sub.faculty}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Attendance</span>
                      <span className={`text-xs font-mono font-bold ${isLow ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                        {pct}% ({sub.attended}/{sub.total})
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">Internals</span>
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {gradeItem?.internalMarks || 35} / 40
                      </span>
                    </div>

                    <div className="w-16 text-center">
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isLow
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {isLow ? 'Alert' : 'Good'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Fee Summary & Contact Faculty */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fee Information Card */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Fee Summary</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                All Cleared
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400">
                <span>Tuition & Laboratory Fee (Sem 3):</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">₹75,000</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400">
                <span>Examination & Library Deposit:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">₹6,500</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600 dark:text-slate-400">
                <span>Campus Health & Sports Fund:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">₹2,500</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Total Semester Dues:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">₹0.00 (Paid in Full)</span>
              </div>
            </div>

            <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
              <FileCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Download Digital Fee Receipt PDF</span>
            </button>
          </div>

          {/* Quick Faculty Contact Pod */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Class Mentor Contact</h3>
            <p className="text-xs text-slate-500">
              Direct communication line with faculty advisor regarding attendance or performance:
            </p>
            <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">Dr. Arvind Rao</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Associate Professor & Student Mentor (CSE)
              </div>
              <div className="flex items-center gap-3 pt-2 text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> +91 94432 10987
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> mentor.cse@apexuniversity.edu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
