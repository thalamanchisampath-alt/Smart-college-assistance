import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CampusRoom } from '../../types';
import {
  MapPin,
  Compass,
  Navigation,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Search,
  Layers,
  ArrowRight,
  Sparkles,
  Users,
  Maximize2,
  Footprints,
} from 'lucide-react';

export const SmartCampusMap: React.FC = () => {
  const { rooms } = useApp();

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('now');
  const [navFrom, setNavFrom] = useState<string>('Library');
  const [navTo, setNavTo] = useState<string>('Computer Lab 2');
  const [activeBuildingFilter, setActiveBuildingFilter] = useState<string>('all');
  const [isNavigating, setIsNavigating] = useState<boolean>(true);

  // Time slots for empty classroom finder
  const timeSlots = [
    { id: 'now', label: 'Right Now (11:15 AM)' },
    { id: '12pm', label: '12:00 PM – 01:00 PM' },
    { id: '02pm', label: '02:00 PM – 03:00 PM' },
    { id: '03pm', label: '03:00 PM – 04:00 PM' },
  ];

  // Dynamic filter for empty classrooms based on simulated time
  const getSimulatedStatus = (room: CampusRoom): 'available' | 'occupied' | 'maintenance' => {
    if (room.currentStatus === 'maintenance') return 'maintenance';
    if (selectedTimeSlot === '02pm') {
      if (room.id === 'room-102') return 'available'; // CS-102 becomes free at 2pm
      if (room.id === 'room-101') return 'occupied';
    }
    return room.currentStatus;
  };

  const classrooms = rooms.filter((r) => r.type === 'classroom');
  const labs = rooms.filter((r) => r.type === 'lab');

  // Indoor Navigation route calculations
  const routeSteps: Record<string, { distance: string; time: string; steps: string[] }> = {
    'Library_Computer Lab 2': {
      distance: '160 meters',
      time: '2 mins walk',
      steps: [
        'Exit Knowledge Center 2nd Floor and take Central Glass Elevator down to Level 1.',
        'Walk through the Covered Walkway across Central Quadrangle toward Computing Wing.',
        'Enter Computing Wing, take stairs up to 2nd Floor.',
        'Computer Lab 2 is on your right (Room 201).',
      ],
    },
    'Main Block_Canteen': {
      distance: '110 meters',
      time: '1.5 mins walk',
      steps: [
        'Exit Main Tech Block East Lobby.',
        'Proceed along the Pergola Pathway toward Student Activity Center.',
        'Food Court entrance is located on the Ground Floor straight ahead.',
      ],
    },
    'Classrooms_Library': {
      distance: '190 meters',
      time: '2.5 mins walk',
      steps: [
        'Take Corridor A past Lecture Hall CS-102 toward Central Clock Tower.',
        'Cross into Knowledge Center main sliding doors.',
        'Ascend stairs to 2nd Floor Silent Reading Pods.',
      ],
    },
  };

  const currentRouteKey = `${navFrom}_${navTo}`;
  const routeDetails = routeSteps[currentRouteKey] || {
    distance: '140 meters',
    time: '2 mins walk',
    steps: [
      `Depart from ${navFrom} main concourse.`,
      'Follow campus indoor wayfinding green signage along the central corridor.',
      'Arrive safely at your destination: ' + navTo,
    ],
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-1">
            <Compass className="w-3.5 h-3.5" />
            Interactive Spatial Telemetry & Indoor Wayfinding
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Smart Campus Navigation & Room Radar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Locate empty classrooms in real-time, inspect laboratory hardware capacity, and trace step-by-step indoor routes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Campus Sensor Node: Active
          </span>
        </div>
      </div>

      {/* Interactive Blueprint Map Canvas (SVG Isometric Vector Campus) */}
      <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl relative overflow-hidden text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-sm">Interactive Campus Spatial Grid</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
              BUILDING TELEMETRY V2.4
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Available
            </span>
            <span className="flex items-center gap-1 text-[11px] text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Occupied
            </span>
            <span className="flex items-center gap-1 text-[11px] text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> Maintenance
            </span>
          </div>
        </div>

        {/* SVG Campus Map with Route Visualization */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-slate-900/90 border border-slate-800/80 overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 900 450" fill="none">
            {/* Campus Grid Mesh */}
            <defs>
              <pattern id="campusGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              </pattern>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#campusGrid)" />

            {/* Pathways / Walkways */}
            <path
              d="M 150 220 L 750 220 M 450 70 L 450 380 M 260 120 L 640 320"
              stroke="rgba(99, 102, 241, 0.18)"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Central Courtyard / Plaza */}
            <circle cx="450" cy="220" r="45" fill="rgba(99, 102, 241, 0.08)" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="450" y="224" fill="#a5b4fc" fontSize="10" fontWeight="600" textAnchor="middle">CENTRAL PLAZA</text>

            {/* 1. Main Block */}
            <g transform="translate(100, 140)">
              <rect width="120" height="80" rx="14" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="2" />
              <text x="60" y="38" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Main Tech Block</text>
              <text x="60" y="55" fill="#a5b4fc" fontSize="9" textAnchor="middle">CS-101 • CS-102</text>
              <circle cx="108" cy="18" r="4" fill="#10b981" />
            </g>

            {/* 2. Computing Wing (Labs) */}
            <g transform="translate(680, 140)">
              <rect width="140" height="80" rx="14" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
              <text x="70" y="38" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Computing Wing</text>
              <text x="70" y="55" fill="#7dd3fc" fontSize="9" textAnchor="middle">Comp Lab 1 & 2</text>
              <circle cx="126" cy="18" r="4" fill="#10b981" />
            </g>

            {/* 3. Knowledge Center (Library) */}
            <g transform="translate(380, 40)">
              <rect width="140" height="70" rx="14" fill="#142b3b" stroke="#38bdf8" strokeWidth="2" />
              <text x="70" y="35" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Knowledge Center</text>
              <text x="70" y="52" fill="#bae6fd" fontSize="9" textAnchor="middle">Central Library (Pods)</text>
              <circle cx="126" cy="16" r="4" fill="#10b981" />
            </g>

            {/* 4. Administrative Block */}
            <g transform="translate(120, 310)">
              <rect width="130" height="70" rx="14" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <text x="65" y="35" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Administrative Block</text>
              <text x="65" y="52" fill="#94a3b8" fontSize="9" textAnchor="middle">Deanery & Accounts</text>
              <circle cx="116" cy="16" r="4" fill="#10b981" />
            </g>

            {/* 5. Canteen / Student Activity */}
            <g transform="translate(660, 310)">
              <rect width="140" height="70" rx="14" fill="#2d1c14" stroke="#f97316" strokeWidth="2" />
              <text x="70" y="35" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Food Court & Cafe</text>
              <text x="70" y="52" fill="#fdba74" fontSize="9" textAnchor="middle">Student Activity Hub</text>
              <circle cx="126" cy="16" r="4" fill="#10b981" />
            </g>

            {/* 6. Seminar Hall */}
            <g transform="translate(390, 330)">
              <rect width="120" height="65" rx="14" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
              <text x="60" y="32" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Auditorium</text>
              <text x="60" y="48" fill="#d8b4fe" fontSize="9" textAnchor="middle">Seminar Hall 1</text>
              <circle cx="106" cy="16" r="4" fill="#10b981" />
            </g>

            {/* Dynamic Animated Route Path */}
            {isNavigating && (
              <g>
                <path
                  d="M 450 110 L 450 220 L 680 180"
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                  className="animate-pulse"
                />
                <circle cx="450" cy="110" r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                <circle cx="680" cy="180" r="7" fill="#818cf8" stroke="#ffffff" strokeWidth="2" />
              </g>
            )}
          </svg>

          {/* Overlay Navigation HUD */}
          <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
              <Footprints className="w-3.5 h-3.5" />
              <span>Route: {navFrom} → {navTo}</span>
            </div>
            <div className="text-[11px] text-slate-300">
              Est: <strong className="text-white">{routeDetails.time}</strong> • {routeDetails.distance}
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column: Find Empty Classrooms & Lab Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Find Empty Classrooms */}
        <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Find Empty Classrooms
                </h3>
                <p className="text-[11px] text-slate-400">Real-time room occupancy radar</p>
              </div>
            </div>
          </div>

          {/* Time Selector */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
              Select Time Window:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  id={`slot-${slot.id}`}
                  onClick={() => setSelectedTimeSlot(slot.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                    selectedTimeSlot === slot.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Classroom List */}
          <div className="space-y-2.5 pt-1">
            {classrooms.map((room) => {
              const status = getSimulatedStatus(room);
              const isFree = status === 'available';

              return (
                <div
                  key={room.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isFree
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{room.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {room.building} ({room.floor})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {isFree ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          ✓ {room.nextAvailableTime}
                        </span>
                      ) : (
                        <span className="text-rose-500 font-medium">
                          ✕ {room.currentClass || 'In use by CSE Department'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isFree
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {isFree ? 'Vacant' : 'Occupied'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">Cap: {room.capacity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Lab Availability & Hardware Specs */}
        <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Laboratory Availability
                </h3>
                <p className="text-[11px] text-slate-400">Workstation states & maintenance radar</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {labs.map((lab) => {
              const badge =
                lab.currentStatus === 'available'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : lab.currentStatus === 'occupied'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';

              return (
                <div
                  key={lab.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{lab.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {lab.building} • {lab.floor}
                      </span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${badge}`}>
                      {lab.currentStatus}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-300">
                    {lab.nextAvailableTime}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {lab.amenities.map((am, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300"
                      >
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Indoor Navigation Route Selector & Directions */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Indoor Campus Wayfinder
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              Starting Location (From):
            </label>
            <select
              value={navFrom}
              onChange={(e) => setNavFrom(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
            >
              <option value="Library">Central Library</option>
              <option value="Main Block">Main Tech Block</option>
              <option value="Classrooms">Classroom CS-101</option>
              <option value="Canteen">Campus Food Court</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              Target Destination (To):
            </label>
            <select
              value={navTo}
              onChange={(e) => setNavTo(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs"
            >
              <option value="Computer Lab 2">Computer Lab 2 (Computing Wing)</option>
              <option value="Canteen">Food Court & Cafe</option>
              <option value="Library">Knowledge Center Library</option>
              <option value="Auditorium">Main Auditorium</option>
            </select>
          </div>

          <div className="sm:pt-5">
            <button
              onClick={() => setIsNavigating(true)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <span>Calculate Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Route Steps Card */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
          <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
            Step-by-Step Wayfinding Guidance ({routeDetails.distance} • {routeDetails.time}):
          </div>
          <div className="space-y-1.5 pt-1">
            {routeDetails.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
