import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeaveRequest } from '../../types';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Send,
  UserCheck,
  AlertCircle,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const LeaveApplication: React.FC = () => {
  const { leaveRequests, submitLeaveRequest, updateLeaveStatus, currentRole, student } = useApp();

  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [leaveType, setLeaveType] = useState<LeaveRequest['leaveType']>('On-Duty (OD)');
  const [fromDate, setFromDate] = useState<string>('2026-09-24');
  const [toDate, setToDate] = useState<string>('2026-09-25');
  const [reason, setReason] = useState<string>('');
  const [totalDays, setTotalDays] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    submitLeaveRequest({
      studentName: student.name,
      rollNo: student.rollNo,
      leaveType,
      fromDate,
      toDate,
      totalDays,
      reason,
    });

    setReason('');
    setShowApplyModal(false);
  };

  const isReviewerRole = currentRole === 'faculty' || currentRole === 'admin';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-1">
            <FileText className="w-3.5 h-3.5" />
            Zero-Paper Digital Workflow
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Leave & On-Duty (OD) Application
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Apply for medical leaves, hackathon on-duty compensations, and track multi-level approvals.
          </p>
        </div>

        <button
          id="btn-new-leave-app"
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for New Leave</span>
        </button>
      </div>

      {/* Visual Workflow Explainer Bar */}
      <div className="p-4 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-2">
          Automated Governance Pipeline
        </span>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold">1. Digital Submission</div>
            <span className="text-[10px] text-slate-400">Student applies with reason</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
            <div className="text-amber-500 font-bold">2. Faculty Verification</div>
            <span className="text-[10px] text-slate-400">Mentor reviews syllabus/tests</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium">
            <div className="text-emerald-500 font-bold">3. Attendance Auto-Credit</div>
            <span className="text-[10px] text-slate-400">Approved leaves credited</span>
          </div>
        </div>
      </div>

      {/* Leave Requests Stream */}
      <div className="space-y-4">
        {leaveRequests.map((req) => {
          const isPending = req.status === 'pending';
          const isReviewed = req.status === 'faculty_reviewed';
          const isApproved = req.status === 'approved';
          const isRejected = req.status === 'rejected';

          return (
            <div
              key={req.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {req.leaveType}
                    </span>
                    <span className="text-xs font-mono text-slate-400">• {req.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Duration: <strong className="text-slate-700 dark:text-slate-200">{req.fromDate}</strong> to{' '}
                    <strong className="text-slate-700 dark:text-slate-200">{req.toDate}</strong> ({req.totalDays} days)
                  </div>
                </div>

                <div>
                  <span
                    className={`text-[11px] px-3 py-1 rounded-full font-bold uppercase border ${
                      isApproved
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : isReviewed
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        : isRejected
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
                    }`}
                  >
                    {isApproved
                      ? 'Approved'
                      : isReviewed
                      ? 'Faculty Reviewed (Pending HOD)'
                      : isRejected
                      ? 'Rejected'
                      : 'Pending Review'}
                  </span>
                </div>
              </div>

              {/* Reason */}
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-white">Reason:</strong> {req.reason}
              </div>

              {/* Visual Multi-Step Approval Flow */}
              <div className="relative py-2">
                <div className="flex items-center justify-between text-xs">
                  {/* Step 1: Applied */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Submitted</div>
                      <div className="text-[10px] text-slate-400">{req.appliedDate}</div>
                    </div>
                  </div>

                  <div className="h-0.5 flex-1 mx-3 bg-slate-200 dark:bg-slate-700" />

                  {/* Step 2: Faculty Review */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isApproved || isReviewed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                      }`}
                    >
                      {isApproved || isReviewed ? '✓' : '2'}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Faculty Review</div>
                      <div className="text-[10px] text-slate-400">
                        {req.reviewedBy ? req.reviewedBy.split('(')[0] : 'In review'}
                      </div>
                    </div>
                  </div>

                  <div className="h-0.5 flex-1 mx-3 bg-slate-200 dark:bg-slate-700" />

                  {/* Step 3: Final Decision */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isApproved
                          ? 'bg-emerald-500 text-white'
                          : isRejected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isApproved ? '✓' : isRejected ? '✕' : '3'}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Final Signoff</div>
                      <div className="text-[10px] text-slate-400">
                        {isApproved ? 'Approved' : isRejected ? 'Declined' : 'Awaiting HOD'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Faculty Remarks */}
              {req.facultyRemarks && (
                <div className="text-[11px] p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-300">
                  <strong>Faculty Remarks:</strong> {req.facultyRemarks}
                </div>
              )}

              {/* Reviewer Action Buttons if Faculty/Admin */}
              {isReviewerRole && (isPending || isReviewed) && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                  <span className="text-xs text-slate-400 mr-2">Faculty Action:</span>
                  <button
                    onClick={() => updateLeaveStatus(req.id, 'rejected', 'Documentation incomplete.')}
                    className="px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateLeaveStatus(req.id, 'approved', 'Verified and sanctioned.')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
                  >
                    Approve Leave
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Submit Digital Leave Application
              </h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Leave Category:
                </label>
                <select
                  value={leaveType}
                  onChange={(e: any) => setLeaveType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="On-Duty (OD)">On-Duty (OD) – Hackathons, Seminars, Competitions</option>
                  <option value="Medical">Medical Leave – Health & Doctor Prescription</option>
                  <option value="Personal">Personal Leave</option>
                  <option value="Academic Event">Academic Event / Paper Presentation</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    From Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    To Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Reason & Details:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide context, event name, or medical reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
