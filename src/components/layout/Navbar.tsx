import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sparkles,
  Search,
  Bell,
  Sun,
  Moon,
  Bot,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Info,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    isDarkMode,
    toggleDarkMode,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsChatOpen,
    searchQuery,
    setSearchQuery,
    setActiveTab,
    student,
    setIsConfigModalOpen,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { title: string; subtitle: string; badge: string }> = {
    student: {
      title: student.name,
      subtitle: `${student.branch.split(' ')[0]} • 3rd Sem`,
      badge: 'Student',
    },
    faculty: {
      title: 'Prof. Arvind Rao',
      subtitle: 'Dept. of CSE • HOD & Mentor',
      badge: 'Faculty',
    },
    parent: {
      title: 'Mr. Suresh Sharma',
      subtitle: "Parent of Rahul (22CS084)",
      badge: 'Parent',
    },
    admin: {
      title: 'Dr. K. R. Ramanathan',
      subtitle: 'Dean of Academic Affairs',
      badge: 'Admin',
    },
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setIsRoleMenuOpen(false);
    if (role === 'parent') {
      setActiveTab('parent-portal');
    } else if (role === 'faculty') {
      setActiveTab('faculty-portal');
    } else if (role === 'student') {
      setActiveTab('overview');
    } else {
      setActiveTab('intelligence');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & AI Tag */}
        <div className="flex items-center gap-3">
          <button
            id="nav-logo-btn"
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base sm:text-lg">
                  Smart College <span className="text-indigo-600 dark:text-indigo-400">Assistant</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  AI-Powered Smart Campus
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attendance, CGPA predictor, rooms, notices..."
              className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hackathon Setup / Architecture Info */}
          <button
            id="nav-config-info-btn"
            onClick={() => setIsConfigModalOpen(true)}
            title="Hackathon Demo & Architecture Stack"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <Info className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">Architecture</span>
          </button>

          {/* Quick AI Chatbot trigger */}
          <button
            id="nav-quick-ai-btn"
            onClick={() => setIsChatOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">Campus AI</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="nav-theme-toggle-btn"
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              id="nav-notif-bell-btn"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 my-2">
                  {notifications.slice(0, 4).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`py-2.5 px-2 rounded-lg cursor-pointer transition-colors ${
                        !notif.read ? 'bg-indigo-50/50 dark:bg-indigo-950/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notif.priority === 'urgent' ? (
                          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                            {notif.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                            {notif.content}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 inline-block">
                            {notif.timestamp} • {notif.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  id="view-all-notifs-btn"
                  onClick={() => {
                    setIsNotifOpen(false);
                    setActiveTab('notifications');
                  }}
                  className="w-full mt-2 py-2 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl transition-colors"
                >
                  View All Notifications Hub →
                </button>
              </div>
            )}
          </div>

          {/* Role Switcher & Persona */}
          <div className="relative">
            <button
              id="role-switch-btn"
              onClick={() => setIsRoleMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-indigo-500/50 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                {roleLabels[currentRole].badge[0]}
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                  {roleLabels[currentRole].title}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  Role: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{roleLabels[currentRole].badge}</span>
                </div>
              </div>
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Campus Persona
                  </span>
                </div>
                <div className="space-y-1 mt-1">
                  {(['student', 'faculty', 'parent', 'admin'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors ${
                        currentRole === role
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{roleLabels[role].title}</div>
                        <div className={`text-[10px] ${currentRole === role ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {roleLabels[role].subtitle}
                        </div>
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                          currentRole === role ? 'bg-indigo-700 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
