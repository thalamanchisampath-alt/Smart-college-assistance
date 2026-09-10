import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyTask } from '../../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Calendar,
  AlertCircle,
  BookOpen,
  Plus,
  Coffee,
  CheckSquare,
  Shuffle,
  Zap,
} from 'lucide-react';

export const StudyPlanner: React.FC = () => {
  const { studyTasks, toggleTaskCompleted, addStudyTask, optimizeScheduleWithAI } = useApp();

  // Inputs for AI schedule generator
  const [examDate, setExamDate] = useState<string>('2026-10-15');
  const [availableHours, setAvailableHours] = useState<number>(4.5);
  const [weakSubjects, setWeakSubjects] = useState<string>('Discrete Mathematics, DSA AVL Trees');
  const [strongSubjects, setStrongSubjects] = useState<string>('Python Programming, Logic Design');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  // New task form modal/drawer
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskSubject, setNewTaskSubject] = useState<string>('Data Structures');
  const [newTaskTime, setNewTaskTime] = useState<string>('09:00 PM');
  const [newTaskDuration, setNewTaskDuration] = useState<string>('45 min');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');

  // Completed count and progress
  const completedCount = studyTasks.filter((t) => t.completed).length;
  const progressPct = studyTasks.length > 0 ? Math.round((completedCount / studyTasks.length) * 100) : 0;

  // Days to exam calculation
  const targetDateObj = new Date(examDate);
  const now = new Date('2026-09-10T02:00:00Z');
  const diffTime = targetDateObj.getTime() - now.getTime();
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      optimizeScheduleWithAI();
      setIsOptimizing(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 500);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addStudyTask({
      title: newTaskTitle,
      subject: newTaskSubject,
      time: newTaskTime,
      duration: newTaskDuration,
      type: 'study',
      completed: false,
      priority: newTaskPriority,
    });
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Driven Cognitive Schedule Optimizer
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Smart AI Study Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Personalized daily schedule engineered around your weak subjects, attention span, and exam deadlines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-optimize-schedule"
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>{isOptimizing ? 'Optimizing with Gemini...' : 'Optimize My Schedule with AI'}</span>
          </button>

          <button
            id="btn-add-study-task"
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700"
            title="Add Task"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Banner Stats: Study Streak, Countdown, Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Study Streak</span>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              6 Days Active 🔥
            </div>
            <span className="text-[10px] text-emerald-500 font-semibold">+2 days over weekly goal</span>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Exam Countdown</span>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              {diffDays} Days Remaining
            </div>
            <span className="text-[10px] text-slate-400">Semester 3 Finals: {examDate}</span>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center text-[11px] text-slate-400 font-medium">
              <span>Today's Completion</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{progressPct}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {completedCount} of {studyTasks.length} sessions completed
            </span>
          </div>
        </div>
      </div>

      {/* Grid: AI Inputs & Customizer (Left) + Interactive Daily Schedule (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Parameters & Guidance */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Study Optimizer Inputs
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Exam Start Date:
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Available Study Hours Today:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {availableHours} Hours
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={0.5}
                  value={availableHours}
                  onChange={(e) => setAvailableHours(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-rose-600 dark:text-rose-400 mb-1">
                  Weak Subjects / Priority Focus:
                </label>
                <input
                  type="text"
                  value={weakSubjects}
                  onChange={(e) => setWeakSubjects(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
                />
                <span className="text-[10px] text-slate-400">
                  Algorithm assigns peak evening focus hours to these topics.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                  Strong Subjects / Rapid Revision:
                </label>
                <input
                  type="text"
                  value={strongSubjects}
                  onChange={(e) => setStrongSubjects(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleOptimize}
                  className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs border border-indigo-200 dark:border-indigo-800/80 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Shuffle className="w-3.5 h-3.5 text-indigo-500" />
                  Re-Distribute Daily Slots
                </button>
              </div>
            </div>
          </div>

          {/* AI Cognitive Recommendation Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Spaced Repetition Advisory</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Based on your attendance and internal marks, <strong className="text-amber-300">Discrete Mathematics</strong> has a 1.4x higher forgetting curve. The AI has interleaved a 20-minute cognitive break between Discrete Math and DSA.
            </p>
          </div>
        </div>

        {/* Right Column: Daily Schedule Timeline */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Today's AI Optimized Timeline
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Click circle to mark sessions completed
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Today</span>
          </div>

          <div className="space-y-3">
            {studyTasks.map((task) => {
              const isBreak = task.type === 'break';
              const priorityBadge =
                task.priority === 'high'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                  : task.priority === 'medium'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 border-slate-300 dark:border-slate-700';

              return (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    task.completed
                      ? 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-60'
                      : isBreak
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTaskCompleted(task.id)}
                      className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {task.time}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {task.duration}
                        </span>
                      </div>
                      <h4
                        className={`text-xs font-semibold text-slate-900 dark:text-white ${
                          task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
                        }`}
                      >
                        {task.title}
                      </h4>
                      <div className="text-[10px] text-slate-400">
                        {task.subject}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold border tracking-wider ${priorityBadge}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Add Custom Study Session
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topic / Task Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graph BFS Traversal Exercises"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject:
                  </label>
                  <input
                    type="text"
                    value={newTaskSubject}
                    onChange={(e) => setNewTaskSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Time:
                  </label>
                  <input
                    type="text"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Duration:
                  </label>
                  <input
                    type="text"
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority:
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e: any) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
