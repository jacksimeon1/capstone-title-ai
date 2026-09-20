import { BenchmarkTitle, ChatMessage, GeneratedTitleCandidate, Project, TitleAnalysisResult, UserProfile } from '../types';
import { BENCHMARK_TITLES } from '../data/benchmarkTitles';

const STORAGE_KEYS = {
  USER_PROFILE: 'capstone_ai_user_profile',
  PROJECTS: 'capstone_ai_projects',
  SAVED_TITLES: 'capstone_ai_saved_titles',
  ANALYSIS_HISTORY: 'capstone_ai_analysis_history',
  BENCHMARK_TITLES: 'capstone_ai_custom_benchmarks',
  CHAT_MESSAGES: 'capstone_ai_chat_messages',
};

const DEFAULT_USER: UserProfile = {
  id: 'usr-student-1',
  name: 'Alex Rivera',
  email: 'a.rivera@university.edu',
  role: 'student',
  program: 'Information Technology',
  school: 'State University College of Information and Communications Technology',
  yearLevel: '4th Year Senior',
  preferredTech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
};

const ADMIN_USER: UserProfile = {
  id: 'usr-admin-1',
  name: 'Dr. Evelyn Vance',
  email: 'e.vance@university.edu',
  role: 'admin',
  program: 'Computer Science',
  school: 'Department of Computing & Graduate Studies',
  yearLevel: 'Capstone Committee Chair / Faculty Adviser',
  preferredTech: ['Python', 'FastAPI', 'PyTorch', 'Docker'],
};

export const storageService = {
  // User Profile
  getUserProfile(): UserProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) {
      this.setUserProfile(DEFAULT_USER);
      return DEFAULT_USER;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USER;
    }
  },

  setUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  switchToStudent(): UserProfile {
    this.setUserProfile(DEFAULT_USER);
    return DEFAULT_USER;
  },

  switchToAdmin(): UserProfile {
    this.setUserProfile(ADMIN_USER);
    return ADMIN_USER;
  },

  // Projects
  getProjects(): Project[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      const initialProjects = this.getSeedProjects();
      this.saveProjects(initialProjects);
      return initialProjects;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveProjects(projects: Project[]): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  addProject(project: Project): void {
    const projects = this.getProjects();
    projects.unshift(project);
    this.saveProjects(projects);
  },

  updateProject(id: string, updates: Partial<Project>): void {
    const projects = this.getProjects().map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
    this.saveProjects(projects);
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter((p) => p.id !== id);
    this.saveProjects(projects);
  },

  // Saved / Favorite Titles
  getSavedTitles(): GeneratedTitleCandidate[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_TITLES);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveTitle(title: GeneratedTitleCandidate): void {
    const saved = this.getSavedTitles();
    if (!saved.some((t) => t.title === title.title)) {
      saved.unshift({ ...title, saved: true });
      localStorage.setItem(STORAGE_KEYS.SAVED_TITLES, JSON.stringify(saved));
    }
  },

  removeSavedTitle(titleText: string): void {
    const saved = this.getSavedTitles().filter((t) => t.title !== titleText);
    localStorage.setItem(STORAGE_KEYS.SAVED_TITLES, JSON.stringify(saved));
  },

  isTitleSaved(titleText: string): boolean {
    return this.getSavedTitles().some((t) => t.title === titleText);
  },

  // Title Analysis History
  getAnalysisHistory(): TitleAnalysisResult[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYSIS_HISTORY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  addAnalysisResult(result: TitleAnalysisResult): void {
    const history = this.getAnalysisHistory();
    history.unshift(result);
    localStorage.setItem(STORAGE_KEYS.ANALYSIS_HISTORY, JSON.stringify(history.slice(0, 25)));
  },

  // Benchmark Titles (for Admin Repository management)
  getBenchmarkTitles(): BenchmarkTitle[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BENCHMARK_TITLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BENCHMARK_TITLES, JSON.stringify(BENCHMARK_TITLES));
      return BENCHMARK_TITLES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return BENCHMARK_TITLES;
    }
  },

  addBenchmarkTitle(item: BenchmarkTitle): void {
    const list = this.getBenchmarkTitles();
    list.unshift(item);
    localStorage.setItem(STORAGE_KEYS.BENCHMARK_TITLES, JSON.stringify(list));
  },

  updateBenchmarkStatus(id: string, status: 'Approved' | 'Archived' | 'Flagged'): void {
    const list = this.getBenchmarkTitles().map((t) => (t.id === id ? { ...t, status } : t));
    localStorage.setItem(STORAGE_KEYS.BENCHMARK_TITLES, JSON.stringify(list));
  },

  deleteBenchmarkTitle(id: string): void {
    const list = this.getBenchmarkTitles().filter((t) => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.BENCHMARK_TITLES, JSON.stringify(list));
  },

  // Chat History
  getChatMessages(): ChatMessage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
    if (!raw) {
      return [
        {
          id: 'msg-welcome',
          sender: 'assistant',
          text: 'Hello! I am your Capstone AI Research Assistant. Ask me about scoping your project, formulating defense-ready titles, deciding on database schemas, or evaluating timeline feasibility.',
          timestamp: new Date().toISOString(),
          suggestions: [
            'Is this project too broad for 1 semester?',
            'What database tables might I need for scheduling?',
            'How can I make this title more research-oriented?',
            'Recommend 3 advanced features for this concept.',
          ],
        },
      ];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveChatMessages(messages: ChatMessage[]): void {
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(messages));
  },

  // Initial Seed Projects
  getSeedProjects(): Project[] {
    return [
      {
        id: 'proj-demo-1',
        userId: 'usr-student-1',
        name: 'Classroom Timetable & Conflict Engine',
        idea: 'A system that helps academic registrars and department chairs schedule classrooms and detect room or time conflicts automatically.',
        program: 'Information Technology',
        projectType: 'Management System',
        targetUsers: ['School Administrators', 'Teachers & Faculty'],
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        difficulty: 'Intermediate',
        scope: 'Medium',
        additionalRequirements: 'Must support PDF export of class schedules.',
        generatedTitles: [
          {
            id: 'seed-title-1',
            paradigm: 'Decision Support & Optimization',
            title: 'Web-Based Automated Classroom Scheduling and Conflict Detection Information System for Higher Education Institutions',
            rationale: 'Balanced, defendable academic title with explicit target domain and institutional stakeholder.',
            problemAddressed: 'Manual room allocation resulting in scheduling double-bookings and faculty conflicts.',
            targetUsers: 'School Administrators, Teachers & Faculty',
            mainSystem: 'Management System with Heuristic Checking',
            keyFeatures: ['Automated conflict detection', 'Faculty timetable matrix', 'Room utilization analytics', 'Exportable PDF rosters'],
            possibleTechnologies: ['React', 'Node.js', 'PostgreSQL'],
            potentialScope: 'Scoped to single-campus undergraduate engineering and IT departments.',
            quality: {
              clarity: 94,
              specificity: 92,
              relevance: 96,
              feasibility: 90,
              innovation: 85,
              scopeScore: 92,
              technicalComplexity: 80,
            },
            createdAt: new Date().toISOString(),
            saved: true,
          },
        ],
        savedTitles: ['Web-Based Automated Classroom Scheduling and Conflict Detection Information System for Higher Education Institutions'],
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
  },
};
