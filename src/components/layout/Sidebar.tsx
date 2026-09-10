import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';
import {
  Home,
  LayoutDashboard,
  CalendarCheck,
  GraduationCap,
  Sparkles,
  Bot,
  MapPin,
  Calendar,
  FileCheck2,
  Bell,
  FileText,
  Activity,
  Atom,
  Users,
  Briefcase,
  Award,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, notifications } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navSections: { title: string; items: NavItem[] }[] = [
    {
      title: 'Navigation',
      items: [
        { id: 'landing', label: 'Home & Welcome', icon: Home },
        { id: 'overview', label: 'Student Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'AI Prediction Engines',
      items: [
        {
          id: 'attendance',
          label: 'AI Attendance Predictor',
          icon: CalendarCheck,
          badge: 'Smart Gauge',
          badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          highlight: true,
        },
        {
          id: 'cgpa',
          label: 'AI CGPA Predictor',
          icon: GraduationCap,
          badge: '9.0 Path',
          badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          highlight: true,
        },
        {
          id: 'planner',
          label: 'Smart Study Planner',
          icon: Sparkles,
          badge: 'AI Schedule',
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          highlight: true,
        },
        {
          id: 'campus-ai',
          label: 'Campus AI Assistant',
          icon: Bot,
          badge: 'Online',
          badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
        },
      ],
    },
    {
      title: 'Campus Life & Navigation',
      items: [
        {
          id: 'navigation',
          label: 'Smart Campus Map',
          icon: MapPin,
          badge: 'Interactive',
          badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        },
        { id: 'timetable', label: 'Class Timetable', icon: Calendar },
        { id: 'assignments', label: 'Assignments & Marks', icon: FileCheck2 },
        { id: 'results', label: 'Semester Results', icon: Award },
        {
          id: 'notifications',
          label: 'Notification Center',
          icon: Bell,
          badge: unreadCount > 0 ? `${unreadCount}` : undefined,
          badgeColor: 'bg-rose-500 text-white font-bold',
        },
        {
          id: 'leave',
          label: 'Digital Leave Application',
          icon: FileText,
          badge: 'Workflow',
          badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
        },
      ],
    },
    {
      title: 'Hackathon Stars',
      items: [
        {
          id: 'intelligence',
          label: 'Campus Intelligence',
          icon: Activity,
          badge: '88/100 Score',
          badgeColor: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold border-emerald-500/30',
          highlight: true,
        },
        {
          id: 'quantum',
          label: 'Quantum State Visualizer',
          icon: Atom,
          badge: 'Hackathon Theme',
          badgeColor: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-bold border-indigo-500/30',
          highlight: true,
        },
      ],
    },
    {
      title: 'Portals',
      items: [
        { id: 'parent-portal', label: 'Parent Portal', icon: Users },
        { id: 'faculty-portal', label: 'Faculty Dashboard', icon: Briefcase },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 p-4 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="space-y-6">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <h3 className="px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-0.5 mt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-link-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : item.highlight ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium border shrink-0 ${
                          isActive ? 'bg-white/20 text-white border-white/30' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isActive && <ChevronRight className="w-3.5 h-3.5 ml-1 opacity-75 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info card */}
      <div className="mt-8 p-3 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900/40 border border-indigo-500/20 text-[11px] text-slate-400">
        <div className="flex items-center gap-2 font-semibold text-slate-200 mb-1">
          <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Hackathon Mode</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-400">
          Smart campus state engine connected with predictive analytics & quantum workflow visualization.
        </p>
      </div>
    </aside>
  );
};
