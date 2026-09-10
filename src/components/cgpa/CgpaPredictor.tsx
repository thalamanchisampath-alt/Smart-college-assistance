import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubjectGrade } from '../../types';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Award,
  BookOpen,
} from 'lucide-react';

export const CgpaPredictor: React.FC = () => {
  const { grades, setGrades, student } = useApp();

  const [targetCgpa, setTargetCgpa] = useState<number>(student.targetCgpa || 9.0);
  const [aiSuggestions, setAiSuggestions] = useState<string[] | null>(null);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState<boolean>(false);

  // Helper to map total mark (out of 100) to grade and grade points
  // Total = internal (out of 40) * 1.0 + endSem (out of 60) * 1.0 = 100
  const calculateGradeDetails = (internal: number, endSem: number) => {
    const total = internal + endSem;
    if (total >= 90) return { grade: 'O', points: 10 };
    if (total >= 80) return { grade: 'A+', points: 9 };
    if (total >= 70) return { grade: 'A', points: 8 };
    if (total >= 60) return { grade: 'B+', points: 7 };
    if (total >= 50) return { grade: 'B', points: 6 };
    if (total >= 40) return { grade: 'C', points: 5 };
    return { grade: 'F', points: 0 };
  };

  const handleInternalChange = (id: string, newInternal: number) => {
    const val = Math.min(40, Math.max(0, newInternal));
    setGrades((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const { grade, points } = calculateGradeDetails(val, g.predictedEndSemMarks);
          return {
            ...g,
            internalMarks: val,
            estimatedGrade: grade,
            estimatedGradePoints: points,
          };
        }
        return g;
      })
    );
  };

  const handleEndSemChange = (id: string, newEndSem: number) => {
    const val = Math.min(60, Math.max(0, newEndSem));
    setGrades((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const { grade, points } = calculateGradeDetails(g.internalMarks, val);
          return {
            ...g,
            predictedEndSemMarks: val,
            estimatedGrade: grade,
            estimatedGradePoints: points,
          };
        }
        return g;
      })
    );
  };

  // Calculate SGPA for Semester 3
  const totalCredits = grades.reduce((acc, g) => acc + g.credits, 0);
  const totalQualityPoints = grades.reduce(
    (acc, g) => acc + g.credits * g.estimatedGradePoints,
    0
  );
  const estimatedSgpa = Math.round((totalQualityPoints / totalCredits) * 100) / 100;

  // Prior completed semesters:
  // Sem 1: 20 credits, GPA 7.90
  // Sem 2: 22 credits, GPA 8.30
  // Sem 3: totalCredits (18 credits), estimatedSgpa
  const priorCredits = 20 + 22;
  const priorQualityPoints = 20 * 7.9 + 22 * 8.3;
  const cumulativeCredits = priorCredits + totalCredits;
  const estimatedCgpa =
    Math.round(((priorQualityPoints + totalQualityPoints) / cumulativeCredits) * 100) /
    100;

  const currentSgpa = 8.24;
  const currentCgpa = 8.1;

  // Generate suggestions to reach 9.0 target
  const handleGenerateImprovements = () => {
    setIsGeneratingSuggestions(true);
    setTimeout(() => {
      const suggestions: string[] = [];

      // Find subjects below 9 grade points
      const weakSubs = grades.filter((g) => g.estimatedGradePoints < 9);

      if (weakSubs.length > 0) {
        weakSubs.forEach((sub) => {
          const currentTotal = sub.internalMarks + sub.predictedEndSemMarks;
          const neededForAplus = Math.max(0, 80 - currentTotal);
          const neededForO = Math.max(0, 90 - currentTotal);

          if (sub.code === 'MA301') {
            suggestions.push(
              `Critical Boost in Discrete Mathematics (${sub.code}): Your internal is currently ${sub.internalMarks}/40. Scoring +6 marks in Internal Retest 2 plus achieving 50/60 in End-Sem will raise your grade from ${sub.estimatedGrade} to A+ (9.0 pts), directly pushing your SGPA to 8.65.`
            );
          } else {
            suggestions.push(
              `Target ${sub.name}: Increase end-semester exam score by +${neededForAplus || 4} marks to reach Grade A+ (9.0 pts). Worth +${sub.credits * 1} quality points.`
            );
          }
        });
      } else {
        suggestions.push(
          'Outstanding! All current courses are at Grade A+ or O (9.0 - 10.0 points). Keep this trajectory to surpass your 9.0 target with honors.'
        );
      }

      suggestions.push(
        `Semester 4 Bridge Strategy: To comfortably secure a permanent >9.0 CGPA at graduation, you will need an SGPA of at least 8.85 in Semester 4 across core elective subjects.`
      );

      setAiSuggestions(suggestions);
      setIsGeneratingSuggestions(false);

      if (estimatedCgpa >= targetCgpa) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 450);
  };

  // Performance progression points for custom graph
  const performanceHistory = [
    { label: 'Sem 1', value: 7.9, type: 'actual' },
    { label: 'Sem 2', value: 8.3, type: 'actual' },
    { label: 'Sem 3 (Current)', value: currentSgpa, type: 'current' },
    { label: 'Sem 3 (Predicted)', value: estimatedSgpa, type: 'predicted' },
    { label: 'Target Goal', value: targetCgpa, type: 'target' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            AI CGPA Prediction Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Academic Performance & CGPA Predictor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Simulate internal marks, estimate semester SGPA, and generate AI guidance to achieve your 9.0 goal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl">
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span>Target CGPA:</span>
            <input
              id="target-cgpa-input"
              type="number"
              step="0.1"
              min="7.0"
              max="10.0"
              value={targetCgpa}
              onChange={(e) => setTargetCgpa(Number(e.target.value))}
              className="w-14 px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white text-xs"
            />
          </div>
        </div>
      </div>

      {/* Metrics Row: 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Current Overall CGPA</span>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            {currentCgpa} <span className="text-xs font-normal text-slate-400">/ 10</span>
          </div>
          <span className="text-[10px] text-slate-400">Based on Sem 1 & 2</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] text-slate-400 block font-medium">Current Semester SGPA</span>
          <div className="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            {currentSgpa}
          </div>
          <span className="text-[10px] text-slate-400">Mid-term base score</span>
        </div>

        <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-white to-white dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900 border border-indigo-500/30 shadow-sm">
          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 block font-bold">
            Estimated Semester SGPA
          </span>
          <div className="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-300 mt-1">
            {estimatedSgpa}
          </div>
          <span className="text-[10px] text-slate-400">Live based on sliders</span>
        </div>

        <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 border border-amber-500/30 shadow-sm">
          <span className="text-[11px] text-amber-600 dark:text-amber-400 block font-bold">
            Projected Cumulative CGPA
          </span>
          <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-300 mt-1">
            {estimatedCgpa}
          </div>
          <span className="text-[10px] text-slate-400">
            {estimatedCgpa >= targetCgpa ? '🎉 Target Met!' : `Goal gap: ${(targetCgpa - estimatedCgpa).toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* AI Prediction Callout */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 text-white shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>AI Performance Projection Message</span>
        </div>
        <p className="text-base sm:text-lg font-medium leading-relaxed">
          “Based on your current performance and entered marks, your estimated semester GPA is{' '}
          <span className="text-cyan-300 font-bold font-mono text-xl">{estimatedSgpa}</span>, elevating your total cumulative CGPA to{' '}
          <span className="text-amber-300 font-bold font-mono text-xl">{estimatedCgpa}</span>.”
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            id="btn-improve-to-9"
            onClick={handleGenerateImprovements}
            disabled={isGeneratingSuggestions}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-amber-300" />
            <span>{isGeneratingSuggestions ? 'Analyzing syllabus & mark weights...' : 'What should I improve to reach 9.0 CGPA?'}</span>
          </button>
          <span className="text-xs text-slate-400">
            Click to compute exact subject mark delta required
          </span>
        </div>
      </div>

      {/* AI Improvement Suggestions Dropdown */}
      {aiSuggestions && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-500/40 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Personalized 9.0 CGPA Action Roadmap
              </h3>
            </div>
            <span className="text-[11px] font-mono text-indigo-500 font-semibold">
              OPTIMIZATION ENGINE
            </span>
          </div>
          <div className="space-y-2.5 pt-1">
            {aiSuggestions.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Curve Graph (Previous -> Current -> Predicted -> Target) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Performance Progression Trajectory
            </h3>
            <p className="text-[11px] text-slate-500">
              Previous performance → Current performance → Predicted performance → Target
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-400" /> Historic
            </span>
            <span className="flex items-center gap-1 text-indigo-500">
              <span className="w-2 h-2 rounded-full bg-indigo-500" /> Predicted
            </span>
            <span className="flex items-center gap-1 text-amber-500">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Goal
            </span>
          </div>
        </div>

        {/* Visual Bar & Step Chart */}
        <div className="pt-4 grid grid-cols-5 gap-3 sm:gap-6 items-end h-48 border-b border-slate-200 dark:border-slate-800 px-2 pb-2">
          {performanceHistory.map((item, idx) => {
            const heightPct = Math.min(100, Math.max(10, ((item.value - 6.5) / 3.5) * 100));
            const barColor =
              item.type === 'target'
                ? 'bg-amber-500'
                : item.type === 'predicted'
                ? 'bg-gradient-to-t from-indigo-600 to-cyan-400'
                : item.type === 'current'
                ? 'bg-indigo-500'
                : 'bg-slate-400 dark:bg-slate-600';

            return (
              <div key={idx} className="flex flex-col items-center justify-end h-full group">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white mb-1 group-hover:scale-110 transition-transform">
                  {item.value.toFixed(2)}
                </span>
                <div
                  className={`w-full max-w-[48px] rounded-t-xl transition-all duration-500 ${barColor}`}
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 font-medium text-center line-clamp-1">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Subject Marks Editor Matrix */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Interactive Subject Marks & Weighting Simulator
            </h3>
            <p className="text-[11px] text-slate-500">
              Adjust internal marks (out of 40) and projected end-semester marks (out of 60)
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">5 Courses • 18 Credits</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-medium pb-2">
                <th className="py-2.5 px-3">Subject & Code</th>
                <th className="py-2.5 px-3">Credits</th>
                <th className="py-2.5 px-3">Internal (40)</th>
                <th className="py-2.5 px-3">Predicted End-Sem (60)</th>
                <th className="py-2.5 px-3">Total (100)</th>
                <th className="py-2.5 px-3">Estimated Grade</th>
                <th className="py-2.5 px-3">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {grades.map((sub) => {
                const total = sub.internalMarks + sub.predictedEndSemMarks;
                return (
                  <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white">{sub.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{sub.code}</div>
                    </td>
                    <td className="py-3 px-3 font-mono">{sub.credits}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <input
                          id={`internal-input-${sub.id}`}
                          type="number"
                          min={0}
                          max={40}
                          value={sub.internalMarks}
                          onChange={(e) => handleInternalChange(sub.id, Number(e.target.value))}
                          className="w-16 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-slate-900 dark:text-white"
                        />
                        <span className="text-[10px] text-slate-400">/ 40</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <input
                          id={`endsem-input-${sub.id}`}
                          type="number"
                          min={0}
                          max={60}
                          value={sub.predictedEndSemMarks}
                          onChange={(e) => handleEndSemChange(sub.id, Number(e.target.value))}
                          className="w-16 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-center font-bold text-slate-900 dark:text-white"
                        />
                        <span className="text-[10px] text-slate-400">/ 60</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                      {total} / 100
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full font-mono font-bold text-[11px] bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        {sub.estimatedGrade}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {sub.estimatedGradePoints} pts
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
