export type UserRole = 'student' | 'faculty' | 'parent' | 'admin';

export type NavigationTab =
  | 'landing'
  | 'overview'
  | 'attendance'
  | 'cgpa'
  | 'planner'
  | 'campus-ai'
  | 'navigation'
  | 'timetable'
  | 'assignments'
  | 'results'
  | 'notifications'
  | 'leave'
  | 'intelligence'
  | 'quantum'
  | 'parent-portal'
  | 'faculty-portal';

export interface SubjectAttendance {
  id: string;
  code: string;
  name: string;
  attended: number;
  total: number;
  faculty: string;
  credits: number;
  recentTrend: number[]; // Last 5 classes: 1 for present, 0 for absent
}

export interface StudentProfile {
  name: string;
  id: string;
  rollNo: string;
  branch: string;
  year: string;
  semester: number;
  overallAttendance: number;
  currentCgpa: number;
  currentSgpa: number;
  targetCgpa: number;
  email: string;
  phone: string;
  mentor: string;
  avatar: string;
}

export interface SubjectGrade {
  id: string;
  code: string;
  name: string;
  credits: number;
  internalMarks: number; // out of 40 or 50
  maxInternal: number;
  predictedEndSemMarks: number; // out of 60 or 50
  estimatedGrade: string;
  estimatedGradePoints: number;
}

export interface StudyTask {
  id: string;
  time: string;
  title: string;
  subject: string;
  duration: string;
  type: 'study' | 'break' | 'assignment' | 'revision';
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface CampusNotification {
  id: string;
  title: string;
  content: string;
  category: 'exams' | 'assignments' | 'events' | 'attendance' | 'general' | 'emergency';
  priority: 'urgent' | 'high' | 'normal';
  timestamp: string;
  read: boolean;
  sender: string;
  actionUrl?: string;
}

export interface CampusRoom {
  id: string;
  name: string;
  building: string;
  floor: string;
  type: 'classroom' | 'lab' | 'seminar' | 'library' | 'canteen' | 'admin';
  capacity: number;
  currentStatus: 'available' | 'occupied' | 'maintenance';
  currentClass?: string;
  nextAvailableTime?: string;
  workstations?: number;
  amenities: string[];
}

export interface LeaveRequest {
  id: string;
  studentName: string;
  rollNo: string;
  leaveType: 'Medical' | 'On-Duty (OD)' | 'Personal' | 'Academic Event';
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: 'pending' | 'faculty_reviewed' | 'approved' | 'rejected';
  appliedDate: string;
  facultyRemarks?: string;
  reviewedBy?: string;
}

export interface AssignmentItem {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'submitted' | 'pending' | 'evaluated';
  score?: number;
  maxScore: number;
  weightage: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: string;
  promptChip?: string;
}
