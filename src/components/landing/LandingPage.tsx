import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Bot,
  CalendarCheck,
  GraduationCap,
  MapPin,
  FileText,
  Activity,
  Atom,
  Users,
  Briefcase,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Brain,
  Clock,
  Compass,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setCurrentRole, setIsChatOpen } = useApp();

  const problemsSolved = [
    {
      title: 'Attendance Shortage Surprises',
      problem: 'Students discover low attendance too late right before semester hall tickets.',
      solution: 'AI Attendance Predictor alerts safe miss counts and exact classes needed for 75%.',
      icon: CalendarCheck,
      color: 'emerald',
    },
    {
      title: 'Untracked Internal Marks',
      problem: 'Scattered marks across paper registers make final CGPA unpredictable.',
      solution: 'Continuous CGPA predictor simulates end-sem cutoffs & targeted 9.0 SGPA pathways.',
      icon: GraduationCap,
      color: 'amber',
    },
    {
      title: 'Delayed Semester Results',
      problem: 'Weeks of anxious waiting without real-time analytics or performance curves.',
      solution: 'Instant credit calculation, subject weighting, and predictive grade reports.',
      icon: TrendingUp,
      color: 'indigo',
    },
    {
      title: 'Missed Vital Notices',
      problem: 'Critical exam deadlines buried in crowded WhatsApp groups and hallway pinboards.',
      solution: 'Smart notification center with priority triage, emergency broadcast, and role filter.',
      icon: AlertTriangle,
      color: 'rose',
    },
    {
      title: 'Lack of Personalized Study Guidance',
      problem: 'Generic timetables fail to balance student weaknesses, assignments, and sleep.',
      solution: 'AI Study Planner customizes daily schedules based on exam dates and tough topics.',
      icon: Brain,
      color: 'cyan',
    },
    {
      title: 'Excessive Faculty Paperwork',
      problem: 'Professors spend 40% of class time manual roll-calling and paper leave approvals.',
      solution: '1-click bulk attendance and zero-paper digital leave verification pipeline.',
      icon: FileText,
      color: 'purple',
    },
  ];

  const userCards = [
    {
      role: 'student' as const,
      tab: 'overview' as const,
      title: 'Students',
      icon: UserCheck,
      badge: 'Active: Rahul Sharma',
      desc: 'Predict attendance margins, plan study schedules, calculate target CGPA, and navigate campus effortlessly.',
      previewItems: ['78% Attendance Monitor', '9.0 CGPA Roadmap', 'AI Daily Study Schedule'],
      actionText: 'Launch Student Dashboard',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      role: 'faculty' as const,
      tab: 'faculty-portal' as const,
      title: 'Faculty & Mentors',
      icon: Briefcase,
      badge: 'Prof. Arvind Rao',
      desc: 'Execute 1-tap bulk attendance, publish internal marks, approve digital leaves, and monitor at-risk students.',
      previewItems: ['1-Click Bulk Attendance', 'Paperless Leave Approval', 'Class Analytics & Radar'],
      actionText: 'Enter Faculty Portal',
      gradient: 'from-emerald-600 to-teal-600',
    },
    {
      role: 'parent' as const,
      tab: 'parent-portal' as const,
      title: 'Parents',
      icon: Users,
      badge: 'Mr. Suresh Sharma',
      desc: 'Receive transparent AI plain-language summaries of ward attendance, upcoming exams, and academic performance.',
      previewItems: ['Plain-Language AI Summary', 'Live Attendance Alerts', 'Fee Clearance Status'],
      actionText: 'Open Parent Dashboard',
      gradient: 'from-amber-600 to-orange-600',
    },
    {
      role: 'admin' as const,
      tab: 'intelligence' as const,
      title: 'College Administrators',
      icon: ShieldCheck,
      badge: 'Dean Academic Affairs',
      desc: 'Real-time campus intelligence score, classroom & lab telemetry, emergency alerts, and cross-department trends.',
      previewItems: ['88/100 Campus Score', 'Empty Classroom Radar', 'Cross-Dept State Telemetry'],
      actionText: 'View Campus Intelligence',
      gradient: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/20 via-cyan-500/20 to-purple-500/20 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-5xl mx-auto text-center px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
            <span>AI-Powered Smart Campus Operating System</span>
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            <span className="text-cyan-600 dark:text-cyan-400 font-mono">Quantum State Visualizer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Your College. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Smarter with AI.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            An intelligent digital campus companion that connects students, faculty, parents and administrators in one platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="hero-explore-dashboard-btn"
              onClick={() => {
                setCurrentRole('student');
                setActiveTab('overview');
              }}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-try-ai-btn"
              onClick={() => setIsChatOpen(true)}
              className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-300 dark:border-slate-800 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Try Campus AI</span>
            </button>

            <button
              id="hero-quantum-theme-btn"
              onClick={() => setActiveTab('quantum')}
              className="px-4 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold text-sm border border-indigo-200 dark:border-indigo-800 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Atom className="w-4 h-4 text-indigo-500" />
              <span>Quantum State View</span>
            </button>
          </div>

          {/* Quick Showcase Badges */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 75% Attendance Predictor
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> SGPA to 9.0 CGPA Simulator
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" /> Interactive Campus Indoor Navigation
            </span>
          </div>
        </div>

        {/* Animated Interactive Dashboard Preview Frame */}
        <div className="max-w-5xl mx-auto mt-10 px-4">
          <div className="relative rounded-3xl p-1 bg-gradient-to-b from-indigo-500/30 via-slate-700/20 to-transparent shadow-2xl shadow-indigo-500/10">
            <div className="rounded-[22px] bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 sm:p-6 overflow-hidden">
              {/* Mock Window Topbar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 ml-2 font-mono">smart-campus-os // student-terminal</span>
                </div>
                <div className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Academic Telemetry
                </div>
              </div>

              {/* Preview Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* 1. Attendance Predictor Teaser */}
                <div
                  onClick={() => {
                    setCurrentRole('student');
                    setActiveTab('attendance');
                  }}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-emerald-500/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <CalendarCheck className="w-4 h-4 text-emerald-400" /> Attendance Predictor
                    </span>
                    <span className="text-emerald-400 font-mono font-bold">78.0%</span>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full w-[78%]" />
                    </div>
                    <p className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
                      Safe miss margin: <strong className="text-emerald-400">1 class</strong> before dropping to 74.9%.
                    </p>
                  </div>
                  <span className="inline-block mt-3 text-[10px] text-indigo-400 font-semibold group-hover:underline">
                    Test Attendance Simulator →
                  </span>
                </div>

                {/* 2. CGPA Predictor Teaser */}
                <div
                  onClick={() => {
                    setCurrentRole('student');
                    setActiveTab('cgpa');
                  }}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-amber-400" /> Target CGPA Path
                    </span>
                    <span className="text-amber-400 font-mono font-bold">8.10 → 9.00</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-slate-300">
                      Estimated SGPA: <strong className="text-amber-400">8.24</strong>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      AI: Score +8 marks in Discrete Math to unlock 9.0 target!
                    </p>
                  </div>
                  <span className="inline-block mt-3 text-[10px] text-indigo-400 font-semibold group-hover:underline">
                    Calculate 9.0 Pathway →
                  </span>
                </div>

                {/* 3. Campus Map Navigation Teaser */}
                <div
                  onClick={() => {
                    setCurrentRole('student');
                    setActiveTab('navigation');
                  }}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-cyan-500/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-cyan-400" /> Smart Campus Map
                    </span>
                    <span className="text-cyan-400 font-mono text-[10px] font-bold">Library → Lab 2</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 14 Free Classrooms Now
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Indoor navigation: 180m step-by-step route active.
                    </p>
                  </div>
                  <span className="inline-block mt-3 text-[10px] text-indigo-400 font-semibold group-hover:underline">
                    Open Interactive Map →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Solved Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Transforming Broken College Workflows
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Engineered to eliminate administrative friction, missed deadlines, and anxiety across the college lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problemsSolved.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{item.title}</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-500/5 text-rose-700 dark:text-rose-300 border border-rose-500/15">
                    <strong>Problem:</strong> {item.problem}
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 border border-emerald-500/15">
                    <strong>Smart Solution:</strong> {item.solution}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* "One Smart Platform. Everyone Connected." Persona Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
            Unified Multi-Role Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            One Smart Platform. Everyone Connected.
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Tailored interfaces for every stakeholder with real-time synchronized data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.role}
                className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-md hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {card.role}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <div className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    {card.badge}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {card.desc}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {card.previewItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  id={`persona-btn-${card.role}`}
                  onClick={() => {
                    setCurrentRole(card.role);
                    setActiveTab(card.tab);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 text-slate-800 dark:text-slate-200 group-hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* High-Impact 5 Feature Quick Bar */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 text-white">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Hackathon Priority Engines
            </span>
            <h3 className="text-2xl font-bold mt-1">Jump Directly to Core Innovations</h3>
            <p className="text-xs text-slate-300 mt-1">
              Test all 5 interactive AI algorithms directly without login friction.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { id: 'attendance', label: '1. AI Attendance Predictor', icon: CalendarCheck },
              { id: 'cgpa', label: '2. AI CGPA Predictor', icon: GraduationCap },
              { id: 'planner', label: '3. Smart Study Planner', icon: Sparkles },
              { id: 'campus-ai', label: '4. Campus AI Chatbot', icon: Bot },
              { id: 'navigation', label: '5. Smart Campus Map', icon: MapPin },
            ].map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  id={`quick-launch-${btn.id}`}
                  onClick={() => {
                    setCurrentRole('student');
                    setActiveTab(btn.id as any);
                  }}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-left transition-all hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-cyan-300 mb-2" />
                  <div className="text-xs font-bold leading-tight">{btn.label}</div>
                  <span className="text-[10px] text-slate-300 block mt-1">Launch Tool →</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
