import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../../types';
import { storageService } from '../../services/storageService';

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  activeContext?: string; // Current title or project idea
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  isOpen,
  onClose,
  activeContext = '',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaded = storageService.getChatMessages();
    setMessages(loaded);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulate intelligent academic assistant response
    setTimeout(() => {
      const botResponse = generateAssistantReply(query, activeContext);
      const updatedMessages = [...newMessages, botResponse];
      setMessages(updatedMessages);
      storageService.saveChatMessages(updatedMessages);
      setIsTyping(false);
    }, 700);
  };

  const handleReset = () => {
    localStorage.removeItem('capstone_ai_chat_messages');
    setMessages(storageService.getChatMessages());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-academic-900 border-l border-academic-200 dark:border-academic-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-academic-200 dark:border-academic-800 bg-academic-50 dark:bg-academic-950 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-navy-800 dark:bg-navy-700 text-white flex items-center justify-center">
            <Bot className="w-4 h-4 text-navy-200" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-academic-950 dark:text-academic-50 font-serif">Capstone AI Adviser</h3>
            <p className="text-[10px] text-academic-500 dark:text-academic-400">Defense Preparation & Scoping Copilot</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="p-1.5 text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 rounded-md hover:bg-academic-200 dark:hover:bg-academic-800 transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-academic-400 hover:text-academic-700 dark:hover:text-academic-200 rounded-md hover:bg-academic-200 dark:hover:bg-academic-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Context Banner */}
      {activeContext && (
        <div className="px-4 py-2 bg-navy-50/70 dark:bg-navy-950/70 border-b border-navy-100 dark:border-navy-900 text-[11px] text-navy-800 dark:text-navy-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-navy-600 dark:text-navy-400 shrink-0" />
          <span className="truncate font-medium">Context: &quot;{activeContext}&quot;</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-navy-100 dark:bg-navy-900/60 text-navy-700 dark:text-navy-300 flex items-center justify-center shrink-0 mt-0.5 border border-navy-200 dark:border-navy-800">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-navy-700 dark:bg-navy-600 text-white shadow-academic-sm'
                  : 'bg-academic-100 dark:bg-academic-800 text-academic-800 dark:text-academic-100 border border-academic-200/80 dark:border-academic-700 shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-academic-200/60 dark:border-academic-700/60 space-y-1.5">
                  <p className="text-[10px] font-semibold text-academic-500 dark:text-academic-400 uppercase tracking-wider">
                    Suggested Inquiries:
                  </p>
                  <div className="flex flex-col gap-1">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="text-left text-[11px] text-navy-700 dark:text-navy-300 hover:text-navy-900 dark:hover:text-white bg-white dark:bg-academic-850 hover:bg-navy-50/80 dark:hover:bg-academic-750 px-2 py-1 rounded border border-academic-200 dark:border-academic-700 transition-colors"
                      >
                        → {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`text-[9px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-navy-200' : 'text-academic-400 dark:text-academic-500'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-6 h-6 rounded-full bg-academic-200 dark:bg-academic-700 text-academic-700 dark:text-academic-200 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 items-center text-academic-400 dark:text-academic-500 text-xs italic py-1">
            <Bot className="w-4 h-4 animate-spin text-navy-600 dark:text-navy-400" />
            <span>Formulating academic guidance...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-academic-200 dark:border-academic-800 bg-white dark:bg-academic-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about titles, scope, database, timeline..."
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-academic-300 dark:border-academic-700 focus:outline-none focus:ring-1 focus:ring-navy-600 bg-academic-50/50 dark:bg-academic-850 dark:text-academic-100 placeholder:text-academic-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 rounded-lg bg-navy-800 dark:bg-navy-600 text-white hover:bg-navy-700 dark:hover:bg-navy-500 disabled:opacity-40 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

function generateAssistantReply(query: string, context: string): ChatMessage {
  const lower = query.toLowerCase();
  let text = '';
  let suggestions: string[] = [];

  if (lower.includes('broad') || lower.includes('scope')) {
    text = `Scope management is the #1 reason capstone titles are questioned during proposal defense.\n\nTo narrow your scope effectively:\n1. Specify the exact beneficiary cohort (e.g. "Senior High School Faculty" instead of "All Teachers").\n2. Bound the operational modules to 3-4 key workflows (e.g., Scheduling & Conflict Resolution, rather than Full ERP).\n3. Explicitly state the delimitation in your Chapter 1 Scope & Delimitations section.`;
    suggestions = ['How can I defend this scope to panel members?', 'What are the recommended database tables?'];
  } else if (lower.includes('database') || lower.includes('table') || lower.includes('schema')) {
    text = `For an academic capstone, a solid relational schema typically requires:\n\n1. \`users\` (authentication, RBAC role, profile info)\n2. \`roles_permissions\` (granular security matrix)\n3. \`primary_records\` (e.g., schedules, patient_triages, bookings)\n4. \`transactions_or_logs\` (status history, timestamps, foreign keys)\n5. \`audit_trail\` (actor_id, action, before/after JSONB payload, timestamp)\n\nTip: Demonstrating a 3rd Normal Form (3NF) relational diagram in Chapter 3 gives your system strong technical credibility.`;
    suggestions = ['What technologies should I use for this?', 'Can this be done in 4 months?'];
  } else if (lower.includes('month') || lower.includes('time') || lower.includes('timeline') || lower.includes('schedule')) {
    text = `A 4-month (1-semester) capstone timeline is realistic if you adopt an Agile Scrum or iterative sprint cycle:\n\n• Month 1: Chapters 1-3 manuscript, wireframes, database normalization.\n• Month 2: Authentication, core CRUD transactions, and business logic.\n• Month 3: Constraint checking/algorithms, UI refinement, and integration.\n• Month 4: ISO 25010 / SUS Usability testing with 30+ respondents and defense preparation.\n\nDelimit high-risk items (like hardware IoT integration or custom deep neural networks) unless team members already possess domain expertise.`;
    suggestions = ['Is this project too broad for 1 semester?', 'Recommend 3 advanced features for this concept.'];
  } else if (lower.includes('tech') || lower.includes('stack') || lower.includes('language')) {
    text = `For high velocity and defensible architecture, I recommend:\n\n• Frontend: React / Next.js with TypeScript and Tailwind CSS (clean, responsive, modern).\n• Backend: Node.js (Express/NestJS) or Python (FastAPI) for straightforward REST endpoints.\n• Database: PostgreSQL (structured relational transactions + JSONB flexibility).\n• Evaluation Tooling: System Usability Scale (SUS) survey engine.`;
    suggestions = ['What features can I add?', 'How can I make this title more research-oriented?'];
  } else if (lower.includes('feature') || lower.includes('add')) {
    text = `To elevate this beyond a simple CRUD application for your defense, consider adding:\n\n1. Automated Constraint / Conflict Verification (e.g. detecting room clashes or schedule overlaps).\n2. Immutable Audit Logging (logging who modified what, with before/after state diffs).\n3. KPI Analytics Dashboard (historical trend visualizations using Chart.js).\n4. Automated PDF Report Generation (for official institutional transcripts or schedules).`;
    suggestions = ['What database tables might I need?', 'How can I make this title more specific?'];
  } else if (lower.includes('research') || lower.includes('title') || lower.includes('specific')) {
    text = `To make your title sound rigorous and scholarly:\n\n• Avoid buzzwords like "Smart" or "Easy".\n• Include the delivery architecture (e.g., "Web-Based", "Mobile-Assisted").\n• Include the core technical approach (e.g., "with Automated Conflict Resolution").\n• Include the empirical evaluation framework (e.g., "An ISO/IEC 25010 Usability Assessment").`;
    suggestions = ['Recommend 3 advanced features for this concept.', 'Is this project too broad?'];
  } else {
    text = `Regarding your inquiry on "${query}":\n\nWhen preparing capstone projects, academic panels look for three pillars:\n1. A genuine, verifiable real-world problem with an identifiable client/beneficiary.\n2. Technical substance that reflects 4 years of university-level computing coursework.\n3. An empirical testing methodology (e.g. ISO software quality evaluation or SUS testing) proving the system achieved its stated objectives.`;
    suggestions = ['Is this project too broad for 1 semester?', 'What database tables might I need?'];
  }

  return {
    id: `bot-${Date.now()}`,
    sender: 'assistant',
    text,
    timestamp: new Date().toISOString(),
    suggestions,
  };
}
