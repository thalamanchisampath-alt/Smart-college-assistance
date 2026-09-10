import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  NavigationTab,
  StudentProfile,
  SubjectAttendance,
  SubjectGrade,
  StudyTask,
  CampusNotification,
  CampusRoom,
  LeaveRequest,
  AssignmentItem,
} from '../types';
import {
  initialStudent,
  initialSubjects,
  initialGrades,
  initialStudyTasks,
  initialNotifications,
  initialRooms,
  initialLeaveRequests,
  initialAssignments,
} from '../data/mockData';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  subjects: SubjectAttendance[];
  setSubjects: React.Dispatch<React.SetStateAction<SubjectAttendance[]>>;
  grades: SubjectGrade[];
  setGrades: React.Dispatch<React.SetStateAction<SubjectGrade[]>>;
  studyTasks: StudyTask[];
  setStudyTasks: React.Dispatch<React.SetStateAction<StudyTask[]>>;
  notifications: CampusNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<CampusNotification[]>>;
  rooms: CampusRoom[];
  setRooms: React.Dispatch<React.SetStateAction<CampusRoom[]>>;
  leaveRequests: LeaveRequest[];
  setLeaveRequests: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
  assignments: AssignmentItem[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentItem[]>>;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  submitLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => void;
  updateLeaveStatus: (id: string, status: LeaveRequest['status'], remarks?: string) => void;
  toggleTaskCompleted: (id: string) => void;
  addStudyTask: (task: Omit<StudyTask, 'id'>) => void;
  optimizeScheduleWithAI: () => void;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [student, setStudent] = useState<StudentProfile>(initialStudent);
  const [subjects, setSubjects] = useState<SubjectAttendance[]>(initialSubjects);
  const [grades, setGrades] = useState<SubjectGrade[]>(initialGrades);
  const [studyTasks, setStudyTasks] = useState<StudyTask[]>(initialStudyTasks);
  const [notifications, setNotifications] = useState<CampusNotification[]>(initialNotifications);
  const [rooms, setRooms] = useState<CampusRoom[]>(initialRooms);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [assignments, setAssignments] = useState<AssignmentItem[]>(initialAssignments);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const submitLeaveRequest = (req: Omit<LeaveRequest, 'id' | 'status' | 'appliedDate'>) => {
    const newReq: LeaveRequest = {
      ...req,
      id: `LEAVE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    setLeaveRequests((prev) => [newReq, ...prev]);
  };

  const updateLeaveStatus = (id: string, status: LeaveRequest['status'], remarks?: string) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status,
              facultyRemarks: remarks || req.facultyRemarks,
              reviewedBy: currentRole === 'faculty' ? 'Prof. Arvind Rao (Class In-charge)' : req.reviewedBy,
            }
          : req
      )
    );
  };

  const toggleTaskCompleted = (id: string) => {
    setStudyTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addStudyTask = (task: Omit<StudyTask, 'id'>) => {
    const newTask: StudyTask = {
      ...task,
      id: `task-${Date.now()}`,
    };
    setStudyTasks((prev) => [...prev, newTask]);
  };

  const optimizeScheduleWithAI = () => {
    // Dynamically reorganize based on priority and spacing
    const optimized: StudyTask[] = [
      {
        id: `opt-1-${Date.now()}`,
        time: '04:00 PM',
        title: 'Deep Focus: Discrete Math Graph Theory (Weak Area Boost)',
        subject: 'Discrete Mathematics',
        duration: '75 min',
        type: 'revision',
        completed: false,
        priority: 'high',
      },
      {
        id: `opt-2-${Date.now()}`,
        time: '05:15 PM',
        title: 'Cognitive Reset & Hydration Break',
        subject: 'Wellness',
        duration: '20 min',
        type: 'break',
        completed: false,
        priority: 'low',
      },
      {
        id: `opt-3-${Date.now()}`,
        time: '05:35 PM',
        title: 'DSA Code Optimization: Balanced Trees & Dijkstra Heap',
        subject: 'Data Structures',
        duration: '60 min',
        type: 'study',
        completed: false,
        priority: 'high',
      },
      {
        id: `opt-4-${Date.now()}`,
        time: '06:45 PM',
        title: 'Digital Electronics Lab Assignment Completion',
        subject: 'Digital Electronics',
        duration: '45 min',
        type: 'assignment',
        completed: false,
        priority: 'medium',
      },
      {
        id: `opt-5-${Date.now()}`,
        time: '07:35 PM',
        title: 'Python Async Generators & Test Suite Run',
        subject: 'Python Programming',
        duration: '45 min',
        type: 'study',
        completed: false,
        priority: 'medium',
      },
    ];
    setStudyTasks(optimized);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentRole,
        setCurrentRole,
        isDarkMode,
        toggleDarkMode,
        student,
        setStudent,
        subjects,
        setSubjects,
        grades,
        setGrades,
        studyTasks,
        setStudyTasks,
        notifications,
        setNotifications,
        rooms,
        setRooms,
        leaveRequests,
        setLeaveRequests,
        assignments,
        setAssignments,
        isChatOpen,
        setIsChatOpen,
        searchQuery,
        setSearchQuery,
        markNotificationRead,
        markAllNotificationsRead,
        submitLeaveRequest,
        updateLeaveStatus,
        toggleTaskCompleted,
        addStudyTask,
        optimizeScheduleWithAI,
        isConfigModalOpen,
        setIsConfigModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
