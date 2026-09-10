import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Atom,
  Zap,
  Activity,
  Sparkles,
  RefreshCw,
  Cpu,
  Layers,
  Radio,
  Sliders,
  Shield,
  Eye,
} from 'lucide-react';

export const QuantumStateVisualizer: React.FC = () => {
  const { quantumState, cycleQuantumState, campusStats, student } = useApp();

  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; vx: number; vy: number; radius: number; state: string; label: string }>
  >([]);

  useEffect(() => {
    // Generate quantum nodes representing campus entities
    const entities = [
      { label: 'Student: Rahul S.', state: 'Superposition' },
      { label: 'CS-101 Lecture Hall', state: 'Occupied' },
      { label: 'Comp Lab 2 (RTX)', state: 'Coherent' },
      { label: 'Knowledge Center', state: 'Ground State' },
      { label: 'Controller of Exams', state: 'High Entropy' },
      { label: 'Prof. Arvind Rao', state: 'Active' },
      { label: 'Canteen Hub', state: 'Entangled' },
      { label: 'IoT Sensor Node 4', state: 'Telemetry' },
    ];

    const initialParticles = entities.map((e, idx) => ({
      id: idx,
      x: 100 + (idx % 4) * 180 + Math.random() * 40,
      y: 80 + Math.floor(idx / 4) * 140 + Math.random() * 30,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: 12,
      state: e.state,
      label: e.label,
    }));
    setParticles(initialParticles);

    // Subtle drift loop
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let nx = p.x + p.vx;
          let ny = p.y + p.vy;
          let nvx = p.vx;
          let nvy = p.vy;

          if (nx < 40 || nx > 760) nvx = -nvx;
          if (ny < 40 || ny > 320) nvy = -nvy;

          return { ...p, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const stateColors: Record<string, { ring: string; glow: string; text: string }> = {
    coherent: { ring: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)', text: 'text-cyan-400' },
    superposition: { ring: '#c084fc', glow: 'rgba(192, 132, 252, 0.4)', text: 'text-purple-400' },
    entangled: { ring: '#fbbf24', glow: 'rgba(251, 191, 36, 0.4)', text: 'text-amber-400' },
  };

  const currentColor = stateColors[quantumState] || stateColors.coherent;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1">
            <Atom className="w-3.5 h-3.5 animate-spin" />
            Hackathon Theme Engine: Quantum State Visualizer
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Campus Quantum Harmonic Field
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A conceptual visualizer mapping physical college events, attendance probabilities, and resource states as an entangled quantum matrix.
          </p>
        </div>

        <button
          onClick={cycleQuantumState}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-cyan-500 to-purple-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Perturb Quantum State ({quantumState.toUpperCase()})</span>
        </button>
      </div>

      {/* Main Interactive Canvas Container */}
      <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl relative overflow-hidden text-white">
        {/* Top telemetry status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-cyan-300">
              STATE VECTOR: |Ψ⟩ = α|Physical⟩ + β|Digital⟩
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Coherence: <strong className="text-cyan-400">99.82%</strong></span>
            <span>Entropy: <strong className="text-emerald-400">ΔS = 0.014</strong></span>
            <span>Phase Angle: <strong className="text-purple-400">π / 3</strong></span>
          </div>
        </div>

        {/* SVG Quantum Particle Simulation Canvas */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 800 360">
            {/* Background Grid */}
            <defs>
              <radialGradient id="quantumRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.15)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#quantumRadial)" />

            {/* Entanglement Connection Rays between Particles */}
            {particles.map((p1, i) =>
              particles.slice(i + 1).map((p2) => {
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 180) {
                  return (
                    <line
                      key={`${p1.id}-${p2.id}`}
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={currentColor.ring}
                      strokeWidth={dist < 120 ? 1.5 : 0.8}
                      strokeDasharray={quantumState === 'superposition' ? '4 4' : 'none'}
                      opacity={Math.max(0.1, 1 - dist / 180) * 0.6}
                    />
                  );
                }
                return null;
              })
            )}

            {/* Quantum Nodes */}
            {particles.map((p) => (
              <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
                {/* Orbital Wave Ring */}
                <circle
                  r={p.radius + 6}
                  fill="none"
                  stroke={currentColor.ring}
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  className="animate-spin"
                  style={{ transformOrigin: '0px 0px', animationDuration: '6s' }}
                />
                {/* Node Core */}
                <circle
                  r={p.radius}
                  fill="#0f172a"
                  stroke={currentColor.ring}
                  strokeWidth="2.5"
                />
                <circle r={p.radius * 0.4} fill={currentColor.ring} />

                {/* Node Label Card */}
                <text
                  y={p.radius + 16}
                  fill="#f8fafc"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {p.label}
                </text>
                <text
                  y={p.radius + 28}
                  fill="#94a3b8"
                  fontSize="8"
                  textAnchor="middle"
                >
                  [{p.state}]
                </text>
              </g>
            ))}
          </svg>

          {/* Floating Telemetry HUD */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs max-w-sm space-y-1">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Wavefunction Collapse Prediction</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {quantumState === 'coherent'
                ? 'Coherent State: High probability of 100% lecture hall occupancy compliance.'
                : quantumState === 'superposition'
                ? 'Superposition: Multiple student schedules simultaneously evaluating optimal revision routes.'
                : 'Entangled: Immediate cross-sync between student leave approvals and faculty attendance rosters.'}
            </p>
          </div>
        </div>

        {/* 3 Metric Pillards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block font-mono">Entangled Campus Nodes</span>
            <div className="text-2xl font-bold font-mono text-cyan-400 mt-0.5">8 Active Nodes</div>
            <span className="text-[10px] text-slate-400">Classrooms, Labs, Portals, Sensors</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block font-mono">Probability Wave Amplitude</span>
            <div className="text-2xl font-bold font-mono text-purple-400 mt-0.5">|ψ|² = 0.94</div>
            <span className="text-[10px] text-slate-400">Attendance Risk Elimination</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[11px] text-slate-400 block font-mono">State Resonance Mode</span>
            <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5 uppercase">
              {quantumState}
            </div>
            <span className="text-[10px] text-slate-400">Harmonic Campus Frequency</span>
          </div>
        </div>
      </div>
    </div>
  );
};
