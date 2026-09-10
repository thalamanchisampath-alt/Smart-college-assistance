import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';
import {
  Bot,
  Send,
  Sparkles,
  X,
  Minimize2,
  Maximize2,
  HelpCircle,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Clock,
  ArrowRight,
  User,
} from 'lucide-react';

export const CampusAIChatbot: React.FC = () => {
  const { isChatOpen, setIsChatOpen, student, subjects, grades, studyTasks } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello ${student.name}! I am Campus AI, your 24/7 Academic and Digital Campus Companion. How can I assist your studies today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const promptChips = [
    'Explain recursion in simple terms.',
    'What is my attendance?',
    'How many classes can I miss?',
    'When is my next exam?',
    'Create a study plan for tomorrow.',
    'Explain Dijkstra algorithm for 5 marks.',
  ];

  // Intelligent Contextual Knowledge Base for Instant Response
  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('recursion')) {
      return `### Recursion Explained Simply\n\nRecursion is a programming technique where **a function calls itself** to solve a smaller sub-problem of the original problem.\n\n**Two Golden Rules of Recursion:**\n1. **Base Case:** The condition where the function stops calling itself (without this, you get a \`StackOverflowError\`!).\n2. **Recursive Step:** Where the function calls itself with modified arguments moving towards the base case.\n\n**Real-Life Analogy:** Russian Nesting Dolls (Matryoshka). You open each doll until you reach the smallest, solid doll (base case), then put them all back together!`;
    }

    if (q.includes('what is my attendance') || (q.includes('attendance') && !q.includes('miss'))) {
      const subList = subjects
        .map((s) => `• **${s.name} (${s.code}):** ${Math.round((s.attended / s.total) * 100)}% (${s.attended}/${s.total})`)
        .join('\n');
      return `### Your Current Attendance Summary\n\n• **Overall Semester Attendance:** **${student.overallAttendance}%** (Total attended classes)\n\n**Subject Breakdown:**\n${subList}\n\n⚠️ **Action Required:** Discrete Mathematics (**69.4%**) is currently below the mandatory 75% cutoff. You need to attend the next 4 consecutive lectures!`;
    }

    if (q.includes('how many classes can i miss') || q.includes('classes can i miss')) {
      return `### Safe Absence Analysis\n\n• **Across all subjects:** You can miss **1 aggregate class** safely before your overall attendance dips below 75%.\n• **Data Structures (CS301):** Safe to miss **4 classes** (current 85%).\n• **Python Programming (CS302):** Safe to miss **3 classes** (current 84.2%).\n• **Discrete Mathematics (MA301):** ❌ **0 classes safe to miss!** You are already at **69.4%** and must attend 4 consecutive classes to reach 75%.`;
    }

    if (q.includes('next exam') || q.includes('exam date')) {
      return `### Upcoming Examination Schedule\n\n• **Mid-Term Assessment 2:** Starts **October 15, 2026** (in 35 days).\n• **Next Subject Exam:** **Data Structures & Algorithms (CS301)** at 10:00 AM, Exam Hall B.\n• **Semester End Theory:** Commencing **December 12, 2026**.\n\nCheck the **Notification Center** for the revised controller of examinations circular released today.`;
    }

    if (q.includes('study plan') || q.includes('schedule')) {
      return `### Tailored AI Study Plan for Tomorrow\n\n1. **04:00 PM – 05:15 PM:** *Discrete Mathematics* (Focus on Recurrence Relations & Generating Functions - Weak area)\n2. **05:15 PM – 05:35 PM:** *Cognitive Break & Fresh Air*\n3. **05:35 PM – 06:45 PM:** *Data Structures* (Balanced Binary Search Trees & Graph Traversals)\n4. **07:00 PM – 07:45 PM:** *Python Programming* (Assignment 2 review)\n5. **08:30 PM – 09:15 PM:** *Digital Logic* (Karnaugh Maps practice)\n\n*Tip: Would you like me to sync these automatically to your Smart Study Planner?*`;
    }

    if (q.includes('5 mark') || q.includes('5 marks') || q.includes('dijkstra')) {
      return `### Dijkstra's Shortest Path Algorithm (5-Mark Answer Guide)\n\n**1. Definition (1 Mark):**\nDijkstra's algorithm is a greedy graph algorithm that finds the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.\n\n**2. Key Characteristics (1 Mark):**\n• Paradigm: Greedy technique.\n• Restriction: Graph must contain **no negative weight edges**.\n• Data Structure: Min-Heap / Priority Queue.\n\n**3. Algorithm Steps (2 Marks):**\n1. Initialize \`dist[source] = 0\` and all other vertices \`dist[v] = ∞\`.\n2. Insert all vertices into a Priority Queue keyed on distance.\n3. While queue is not empty, extract vertex \`u\` with minimum distance.\n4. For each neighbor \`v\` of \`u\`, relax edge: \`if dist[u] + weight(u,v) < dist[v] => dist[v] = dist[u] + weight(u,v)\`.\n\n**4. Time & Space Complexity (1 Mark):**\n• Time Complexity: **O((V + E) log V)** using Min-Heap.\n• Space Complexity: **O(V)** for distance and predecessor arrays.`;
    }

    // Default contextual fallback
    return `### Campus AI Academic Guidance\n\nRegarding **"${query}"**:\n\nBased on your CSE Semester 3 curriculum and current profile, I can help you with:\n1. Detailed academic concept breakdowns (e.g., OOP principles, Big-O notations, Boolean algebra).\n2. Attendance & internal marks simulations.\n3. Campus facility locations & room schedules.\n\nFeel free to try asking: *"Explain AVL tree rotations for 5 marks"* or *"How do I raise my CGPA to 9.0?"*`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAIResponse(text);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  if (!isChatOpen) {
    return (
      <button
        id="floating-ai-trigger-btn"
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 text-white shadow-2xl shadow-indigo-500/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group cursor-pointer"
        aria-label="Open Campus AI"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          Campus AI
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden ${
        isExpanded
          ? 'inset-4 sm:inset-10 rounded-3xl'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] rounded-3xl'
      }`}
    >
      {/* Chat Window Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
            <Bot className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm">Campus AI</h3>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-indigo-200">
              Academic companion • Connected to student state
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            id="chat-toggle-expand"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Toggle Size"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            id="chat-close-btn"
            onClick={() => setIsChatOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close Chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line prose prose-xs dark:prose-invert">
                  {msg.text}
                </div>
                <div
                  className={`text-[9px] mt-1.5 text-right ${
                    isUser ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <div className="w-7 h-7 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
      >
        <input
          id="chat-input-field"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask an academic question or attendance query..."
          className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
        />
        <button
          id="chat-send-btn"
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-md transition-all shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
