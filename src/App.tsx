import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { AttendancePredictor } from './components/attendance/AttendancePredictor';
import { CgpaPredictor } from './components/cgpa/CgpaPredictor';
import { StudyPlanner } from './components/planner/StudyPlanner';
import { SmartCampusMap } from './components/map/SmartCampusMap';
import { ParentPortal } from './components/parent/ParentPortal';
import { FacultyDashboard } from './components/faculty/FacultyDashboard';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { LeaveApplication } from './components/leave/LeaveApplication';
import { CampusIntelligence } from './components/analytics/CampusIntelligence';
import { QuantumStateVisualizer } from './components/quantum/QuantumStateVisualizer';
import { CampusAIChatbot } from './components/chatbot/CampusAIChatbot';

export default function App() {
  const { activeTab, setActiveTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'overview':
        return <StudentDashboard />;
      case 'attendance':
        return <AttendancePredictor />;
      case 'cgpa':
        return <CgpaPredictor />;
      case 'planner':
        return <StudyPlanner />;
      case 'navigation':
        return <SmartCampusMap />;
      case 'parent-portal':
        return <ParentPortal />;
      case 'faculty-portal':
        return <FacultyDashboard />;
      case 'notifications':
        return <NotificationCenter />;
      case 'leave':
        return <LeaveApplication />;
      case 'intelligence':
        return <CampusIntelligence />;
      case 'quantum':
        return <QuantumStateVisualizer />;
      default:
        return <LandingPage />;
    }
  };

  const isLanding = activeTab === 'landing';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Layout Body */}
      <div className="flex-1 flex w-full">
        {/* Left Navigation Sidebar (Hidden on landing page if preferred, or collapsible) */}
        {!isLanding && <Sidebar />}

        {/* Dynamic Content Area */}
        <main
          className={`flex-1 overflow-x-hidden ${
            isLanding ? 'w-full' : 'p-4 sm:p-6 lg:p-8'
          }`}
        >
          {renderContent()}
        </main>
      </div>

      {/* Always-Available Floating Campus AI Chatbot */}
      <CampusAIChatbot />
    </div>
  );
}
