import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Users,
  CheckCircle2,
  XCircle,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  Upload,
  Send,
  Sparkles,
  BarChart3,
  CalendarCheck,
} from 'lucide-react';

interface StudentRoster {
  id: string;
  rollNo: string;
  name: string;
  status: 'present' | 'absent';
  midTermMarks: number;
}

export const FacultyDashboard: React.FC = () => {
  const { subjects, notifications, setNotifications } = useApp();

  const [selectedClass, setSelectedClass] = useState<string>('CS301');
  const [newNoticeTitle, setNewNoticeTitle] = useState<string>('');
  const [newNoticeContent, setNewNoticeContent] = useState<string>('');
  const [noticeSent, setNoticeSent] = useState<boolean>(false);

  // Demo class roster for bulk attendance
  const [roster, setRoster] = useState<StudentRoster[]>([
    { id: '1', rollNo: '22CS081', name: 'Aarav Patel', status: 'present', midTermMarks: 34 },
    { id: '2', rollNo: '22CS082', name: 'Aditi Nair', status: 'present', midTermMarks: 38 },
    { id: '3', rollNo: '22CS083', name: 'Kavita Menon', status: 'present', midTermMarks: 29 },
    { id: '4', rollNo: '22CS084', name: 'Rahul Sharma', status: 'present', midTermMarks: 36 },
    { id: '5', rollNo: '22CS085', name: 'Rohan Gupta', status: 'absent', midTermMarks: 24 },
    { id: '6', rollNo: '22CS086', name: 'Siddharth Varma', status: 'present', midTermMarks: 32 },
    { id: '7', rollNo: '22CS087', name: 'Sneha Reddy', status: 'present', midTermMarks: 39 },
    { id: '8', rollNo: '22CS088', name: 'Varun Joshi', status: 'absent', midTermMarks: 27 },
  ]);

  const toggleStudentAttendance = (id: string) => {
    setRoster((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'present' ? 'absent' : 'present' }
          : s
      )
    );
  };

  const markAllPresent = () => {
    setRoster((prev) => prev.map((s) => ({ ...s, status: 'present' })));
  };

  const presentCount = roster.filter((s) => s.status === 'present').length;
  const attendanceRate = Math.round((presentCount / roster.length) * 100);

  const handleBroadcastNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) return;

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: newNoticeTitle,
        content: newNoticeContent,
        category: 'general',
        priority: 'high',
        timestamp: 'Just now',
        read: false,
        sender: 'Prof. Arvind Rao (Dept. of CSE)',
      },
      ...prev,
    ]);

    setNewNoticeTitle('');
    setNewNoticeContent('');
    setNoticeSent(true);
    setTimeout(() => setNoticeSent(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            Faculty Control Terminal & Paperless Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Faculty Portal • Prof. Arvind Rao
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            HOD & Associate Professor, Computer Science and Engineering Department.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 font-bold">
            94% Paperwork Digitized
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Class Attendance Rate</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            85.4%
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">+2.1% this month</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Students at Attendance Risk</span>
          <div className="text-2xl font-bold font-mono text-rose-500 mt-1">
            12
          </div>
          <span className="text-[10px] text-rose-500 font-semibold">Below 75% Cutoff</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Pending Assignment Submissions</span>
          <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            23
          </div>
          <span className="text-[10px] text-slate-400">Due tonight 11:59 PM</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Leave Requests to Review</span>
          <div className="text-2xl font-bold font-mono text-amber-500 mt-1">
            1 Pending
          </div>
          <span className="text-[10px] text-slate-400">Rahul Sharma (OD)</span>
        </div>
      </div>

      {/* Bulk Attendance Management Tool */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                1-Tap Smart Bulk Attendance Management
              </h3>
            </div>
            <p className="text-[11px] text-slate-400">
              Live roll call • Toggle individual absentees with zero paper registers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              <option value="CS301">CS301 - Data Structures (Sec A)</option>
              <option value="CS302">CS302 - Python Programming (Sec B)</option>
            </select>

            <button
              id="faculty-mark-all-present-btn"
              onClick={markAllPresent}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
            >
              Mark All Present
            </button>
          </div>
        </div>

        {/* Live Attendance Metric Bar */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Class Attendance Today:</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {presentCount} / {roster.length} Present ({attendanceRate}%)
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Click student card to toggle Present/Absent</span>
        </div>

        {/* Roster Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {roster.map((studentItem) => {
            const isPresent = studentItem.status === 'present';
            return (
              <div
                key={studentItem.id}
                onClick={() => toggleStudentAttendance(studentItem.id)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isPresent
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">
                    {studentItem.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {studentItem.rollNo} • Mid: {studentItem.midTermMarks}/40
                  </div>
                </div>

                <div className="shrink-0">
                  {isPresent ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                      <CheckCircle2 className="w-3 h-3" /> P
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                      <XCircle className="w-3 h-3" /> A
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Broadcast Class Notice */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Send className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Broadcast Immediate Class Notification
          </h3>
        </div>

        {noticeSent && (
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Notice dispatched to all student and parent portals in real-time!
          </div>
        )}

        <form onSubmit={handleBroadcastNotice} className="space-y-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notice Title:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lab Viva Schedule for Batch A"
              value={newNoticeTitle}
              onChange={(e) => setNewNoticeTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notice Content:
            </label>
            <textarea
              rows={3}
              required
              placeholder="Enter instructions, syllabus covered, or laboratory timings..."
              value={newNoticeContent}
              onChange={(e) => setNewNoticeContent(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              id="faculty-publish-notice-btn"
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Notice to Class & Parents</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
