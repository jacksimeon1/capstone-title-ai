import { ConceptBlueprint, ProjectFeature } from '../types';

export function generateConceptBlueprint(rawIdea: string): ConceptBlueprint {
  const idea = rawIdea.trim();
  const lower = idea.toLowerCase();

  let domain = 'Institutional Process Digitization';
  let targetUsers = ['Students', 'Teachers & Faculty', 'School Administrators'];
  let defaultTitles = [
    `Web-Based Automated ${idea} Management and Monitoring System`,
    `Intelligent Decision Support System for ${idea} with Real-Time Analytics`,
    `Design and Implementation of a Cloud-Based ${idea} Portal for Academic Institutions`,
  ];

  if (lower.includes('schedul') || lower.includes('conflict') || lower.includes('room')) {
    domain = 'Academic Classroom Scheduling and Room Allocation';
    targetUsers = ['Department Chairs', 'Registrars', 'Faculty Members', 'Students'];
    defaultTitles = [
      'Web-Based Automated Classroom Scheduling and Conflict Resolution Management System for Higher Education Institutions',
      'Decision Support System for Academic Timetabling Using Heuristic Conflict Minimization',
      'Smart Campus Room Allocation and Schedule Optimization Information Portal with Real-Time Faculty Notifications',
      'Design and Usability Evaluation of a Decentralized Course Scheduling Management System',
    ];
  } else if (lower.includes('crop') || lower.includes('plant') || lower.includes('leaf') || lower.includes('disease') || lower.includes('farm')) {
    domain = 'Agricultural Foliar Disease Diagnostic and Yield Optimization';
    targetUsers = ['Smallholder Farmers', 'Agronomists', 'Agricultural Extension Officers'];
    defaultTitles = [
      'Mobile-Assisted Plant Foliar Disease Classification and Treatment Recommendation System Using Deep Convolutional Neural Networks',
      'AI-Powered Agricultural Crop Diagnostic and Early Pathogen Detection Platform for Rural Farming Communities',
      'Design and Evaluation of an Offline-First Edge Inference Mobile App for Foliar Crop Pathology',
    ];
  } else if (lower.includes('patient') || lower.includes('triage') || lower.includes('clinic') || lower.includes('health')) {
    domain = 'Clinical Patient Triage and Emergency Queue Prioritization';
    targetUsers = ['Triage Nurses', 'Clinical Physicians', 'Clinic Administrators', 'Patients'];
    defaultTitles = [
      'Clinical Decision Support System for Emergency Triage Priority and Queue Optimization in Primary Healthcare Centers',
      'Web-Based Electronic Health Record and Outpatient Prioritization Management System for Rural Health Units',
      'Mobile-Assisted Clinical Triage Stratification and Appointment Teleconsultation Platform',
    ];
  } else if (lower.includes('intern') || lower.includes('practicum') || lower.includes('ojt')) {
    domain = 'Student Practicum and Internship Competency Evaluation';
    targetUsers = ['Practicum Coordinators', 'Industry Mentors', 'Student Interns', 'Academic Deans'];
    defaultTitles = [
      'Centralized Practicum Management and Competency Evaluation System with Geolocation-Based Attendance Verification',
      'Web and Mobile-Assisted Student Internship Logbook and Performance Analytics Portal',
      'Automated Practicum Deliverables Tracking and Rubric-Based Assessment Information System',
    ];
  }

  const coreFeatures: ProjectFeature[] = [
    {
      name: 'Role-Based Authentication & Access Control (RBAC)',
      purpose: 'Enforces security policies and segregates student, faculty, and administrative privileges.',
      benefit: 'Guarantees confidentiality, prevents unauthorized data modification, and adheres to data privacy standards.',
      complexity: 'Low',
    },
    {
      name: 'Dynamic Workflow Processing & Collision Detection',
      purpose: 'Automatically intercepts overlapping records, schedule clashes, or conflicting resource requests.',
      benefit: 'Eliminates human error and expedites review turnaround by up to 80%.',
      complexity: 'Moderate',
    },
    {
      name: 'Real-Time Notification & Multi-Channel Alert Engine',
      purpose: 'Dispatches instantaneous email, in-app badges, or SMS updates upon status alterations.',
      benefit: 'Keeps all primary stakeholders synchronized without requiring manual follow-ups.',
      complexity: 'Moderate',
    },
    {
      name: 'Interactive Analytics Dashboard & Data Visualizer',
      purpose: 'Aggregates historical transactions into actionable KPI charts, trends, and utilization metrics.',
      benefit: 'Provides institutional leaders with empirical evidence for strategic operational decisions.',
      complexity: 'Moderate',
    },
    {
      name: 'Automated Audit Trail & Compliance Activity Logging',
      purpose: 'Captures immutable timestamps, IP signatures, and modified attributes for every transaction.',
      benefit: 'Crucial for thesis defense credibility and institutional accountability.',
      complexity: 'Low',
    },
    {
      name: 'Exportable Standardized Reporting (PDF / Excel / CSV)',
      purpose: 'Allows one-click compilation of accredited institutional reports and student records.',
      benefit: 'Bridges modern web workflows with legacy paperwork requirements.',
      complexity: 'Low',
    },
  ];

  return {
    projectConcept: `A centralized, digital research-driven platform designed to modernize ${domain.toLowerCase()}. By substituting disjointed paper logs and manual coordination with structured database transactions and automated validation algorithms, the project delivers measurable operational efficacy for ${targetUsers.join(', ')}.`,
    problemStatement: `Currently, operations in ${domain.toLowerCase()} suffer from manual bottlenecks, lack of real-time visibility, communication latency, and high propensity for human error. Without a centralized digital platform, stakeholders face coordination friction and unreliable audit trails.`,
    targetUsers,
    proposedSolution: `Development of a responsive, role-differentiated software solution featuring intuitive user workflows, automated constraint verification, real-time alert dispatch, and empirical analytics reporting.`,
    coreFeatures,
    recommendedTechStack: {
      frontend: ['React 18 / Next.js', 'Tailwind CSS for academic UI styling', 'Lucide Icons / Chart.js for data visualization'],
      backend: ['Node.js (Express / NestJS) or Python (FastAPI / Django)', 'RESTful JSON API Architecture', 'JWT Authentication'],
      database: ['PostgreSQL (Primary Relational Store)', 'Redis (Session caching & rate limiting)'],
      aiOrSpecialized: ['Constraint Solver / Heuristic Algorithm Engine', 'PDF Generation Engine (Puppeteer / jsPDF)'],
      devops: ['Docker for containerized environments', 'GitHub Actions for CI/CD', 'Vercel / Render cloud deployment'],
    },
    databaseRequirements: [
      {
        table: 'users',
        purpose: 'Stores authenticated user credentials, assigned roles, department, and contact info.',
        sampleFields: ['id (UUID)', 'email (VARCHAR)', 'password_hash', 'role (ENUM)', 'is_active (BOOLEAN)', 'created_at'],
      },
      {
        table: 'core_records',
        purpose: 'Main operational transactional entity tracking domain items, requests, or submissions.',
        sampleFields: ['id', 'user_id (FK)', 'title', 'status (ENUM)', 'metadata (JSONB)', 'created_at'],
      },
      {
        table: 'audit_logs',
        purpose: 'Maintains tamper-evident audit history of all entity modifications.',
        sampleFields: ['id', 'actor_id (FK)', 'action (VARCHAR)', 'entity_type', 'previous_state (JSONB)', 'timestamp'],
      },
      {
        table: 'notifications',
        purpose: 'Buffers targeted alerts and tracks read/unread delivery status.',
        sampleFields: ['id', 'recipient_id (FK)', 'title', 'message (TEXT)', 'is_read (BOOLEAN)', 'sent_at'],
      },
    ],
    possibleAIFeatures: [
      'Heuristic Constraint Optimization for automated scheduling or resource allocation',
      'Predictive Analytics to forecast peak demand or seasonal usage bottlenecks',
      'Natural Language Processing (NLP) for feedback summarization or automated sentiment extraction',
      'Computer Vision for automated document/receipt optical character recognition (OCR)',
    ],
    potentialCapstoneTitles: defaultTitles,
    scopeSuggestions: {
      included: [
        'Role-specific dashboards for designated stakeholder personas',
        'End-to-end CRUD operations with input validation and constraints checking',
        'Comprehensive audit logging and exportable reporting',
        'Formal usability evaluation using the System Usability Scale (SUS) with real respondents',
      ],
      delimited: [
        'Integration with third-party legacy enterprise ERPs (flagged as out of scope for thesis)',
        'Payment gateway real-money transactions (simulated with sandbox APIs only)',
        'Native desktop offline syncing beyond standard modern PWA capabilities',
      ],
    },
    limitations: [
      'System performance is subject to local internet stability unless running on an offline intranet server.',
      'Data accuracy relies on timely stakeholder inputs and institutional data integrity.',
    ],
    futureEnhancements: [
      'Integration with university-wide Single Sign-On (SSO) LDAP / Active Directory.',
      'Native iOS and Android mobile app wrappers using React Native or Flutter.',
      'Fine-tuned generative AI assistant for conversational queries against institutional records.',
    ],
  };
}
