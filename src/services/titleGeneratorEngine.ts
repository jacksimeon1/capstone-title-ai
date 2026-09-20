import {
  AcademicProgram,
  DifficultyLevel,
  GeneratedTitleCandidate,
  ProjectScope,
  ProjectType,
  TargetUser,
} from '../types';

interface GenerationParams {
  idea: string;
  program: AcademicProgram;
  projectType: ProjectType;
  targetUsers: TargetUser[];
  technologies: string[];
  difficulty: DifficultyLevel;
  scope: ProjectScope;
  additionalRequirements?: string;
}

// Helper to sanitize and extract core nouns from idea
function extractKeywords(idea: string): { action: string; domain: string; objective: string } {
  const cleaned = idea.trim().toLowerCase();
  
  let domain = 'Operations and Workflow';
  if (cleaned.includes('schedul') || cleaned.includes('conflict') || cleaned.includes('class') || cleaned.includes('room')) {
    domain = 'Classroom Scheduling and Timetable Allocation';
  } else if (cleaned.includes('crop') || cleaned.includes('plant') || cleaned.includes('farm') || cleaned.includes('leaf') || cleaned.includes('disease')) {
    domain = 'Foliar Plant Pathology and Crop Disease Diagnostic';
  } else if (cleaned.includes('patient') || cleaned.includes('clinic') || cleaned.includes('triage') || cleaned.includes('hospital') || cleaned.includes('health')) {
    domain = 'Patient Triage Stratification and Clinical Flow';
  } else if (cleaned.includes('intern') || cleaned.includes('practicum') || cleaned.includes('attendance') || cleaned.includes('ojt')) {
    domain = 'Student Practicum Deliverables and Competency Tracking';
  } else if (cleaned.includes('inventory') || cleaned.includes('stock') || cleaned.includes('warehouse') || cleaned.includes('supply')) {
    domain = 'Supply Inventory Tracking and Dynamic Reorder Management';
  } else if (cleaned.includes('greenhouse') || cleaned.includes('water') || cleaned.includes('soil') || cleaned.includes('iot') || cleaned.includes('sensor')) {
    domain = 'Environmental Telemetry and Microclimatic Regulation';
  } else if (cleaned.includes('enroll') || cleaned.includes('grading') || cleaned.includes('school') || cleaned.includes('student')) {
    domain = 'Student Academic Records and Institutional Services';
  } else if (cleaned.includes('document') || cleaned.includes('clearance') || cleaned.includes('routing')) {
    domain = 'Administrative Document Tracking and Workflow Clearance';
  } else if (cleaned.includes('e-commerce') || cleaned.includes('store') || cleaned.includes('shop') || cleaned.includes('order')) {
    domain = 'Digital Commerce and Transactional Fulfillment';
  } else {
    // derive a capitalized phrase from the first 4-8 words of idea
    const words = idea.split(/\s+/).filter(w => w.length > 3 && !['this', 'that', 'with', 'from', 'help', 'system', 'create', 'want', 'make'].includes(w.toLowerCase()));
    if (words.length > 0) {
      domain = words.slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  return {
    action: 'Automated Management and Assessment',
    domain,
    objective: 'Institutional Operational Efficiency',
  };
}

export function generateCapstoneTitles(params: GenerationParams): GeneratedTitleCandidate[] {
  const { idea, program, projectType, targetUsers, technologies, difficulty, scope } = params;
  const { domain } = extractKeywords(idea);

  const targetAudienceStr = targetUsers.length > 0 ? targetUsers.join(', ') : 'Academic and Enterprise Users';
  const primaryAudience = targetUsers.length > 0 ? targetUsers[0] : 'End Users';
  const primaryTech = technologies.length > 0 ? technologies[0] : 'Modern Web Frameworks';
  const techStackStr = technologies.length > 0 ? technologies.slice(0, 3).join(', ') : 'Full-Stack Architecture';

  const candidates: GeneratedTitleCandidate[] = [
    // 1. Classical Academic & Comprehensive Information System
    {
      id: `gen-${Date.now()}-1`,
      paradigm: 'Comprehensive Information System',
      title: `Web-Based ${domain} Management and Operational Tracking System for ${primaryAudience}`,
      rationale:
        'Presents a balanced, standard academic formulation. It clearly designates the architectural delivery (Web-Based), core operational domain, key functionality (Management & Tracking), and direct target beneficiaries.',
      problemAddressed: `Manual, fragmented, or error-prone processes in ${domain.toLowerCase()} leading to operational delays and lack of centralized records for ${primaryAudience.toLowerCase()}.`,
      targetUsers: targetAudienceStr,
      mainSystem: `${projectType} with Relational Data Architecture`,
      keyFeatures: [
        'Centralized entity records management & CRUD auditing',
        'Dynamic search, filter, and customizable report generation',
        'Role-Based Access Control (RBAC) with granular security',
        'Exportable audit trail logs and automated email notifications',
      ],
      possibleTechnologies: technologies.length > 0 ? technologies : ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      potentialScope: `Focuses on core administrative workflows and user-facing dashboards within a single organizational department or institution.`,
      quality: {
        clarity: 92,
        specificity: 88,
        relevance: 94,
        feasibility: 95,
        innovation: 75,
        scopeScore: 90,
        technicalComplexity: difficulty === 'Advanced' ? 82 : difficulty === 'Beginner' ? 60 : 72,
      },
      createdAt: new Date().toISOString(),
    },

    // 2. Decision Support & Algorithmic Optimization
    {
      id: `gen-${Date.now()}-2`,
      paradigm: 'Decision Support & Optimization',
      title: `Intelligent Decision Support System for ${domain} with Automated Conflict Detection and Resource Allocation`,
      rationale:
        'Elevates the academic rigor by framing the software as a Decision Support System (DSS). It highlights analytical algorithms rather than merely basic CRUD operations, which capstone panel members appreciate.',
      problemAddressed: `Suboptimal allocation of resources, scheduling gridlocks, and human oversight during multi-constraint decision making.`,
      targetUsers: targetAudienceStr,
      mainSystem: 'Decision Support & Constraint-Satisfaction Engine',
      keyFeatures: [
        'Heuristic constraint-checking and conflict resolution algorithms',
        'Interactive recommendation engine with weighted criteria scoring',
        'Real-time collision notifications and alternative slot suggestion',
        'Managerial KPI analytics dashboard with historical utilization metrics',
      ],
      possibleTechnologies: technologies.length > 0 ? [...technologies, 'FastAPI'] : ['Next.js', 'Python / FastAPI', 'PostgreSQL'],
      potentialScope: `Delimited to heuristic or rule-based optimization for predefined constraints (e.g. time, capacity, availability).`,
      quality: {
        clarity: 94,
        specificity: 92,
        relevance: 96,
        feasibility: 86,
        innovation: 89,
        scopeScore: 84,
        technicalComplexity: 86,
      },
      createdAt: new Date().toISOString(),
    },

    // 3. AI / Machine Learning Predictive & Diagnostic Paradigm
    {
      id: `gen-${Date.now()}-3`,
      paradigm: 'AI-Assisted & Predictive Analytics',
      title: `AI-Assisted ${domain} Predictive Analytics and Diagnostic Classification System Using Supervised Learning`,
      rationale:
        'Ideal for Computer Science and Software Engineering programs. It explicitly highlights an underlying machine learning methodology without promising unattainable general artificial intelligence.',
      problemAddressed: `Lack of predictive insights and slow diagnostic triage in ${domain.toLowerCase()}, leading to reactive rather than proactive intervention.`,
      targetUsers: targetAudienceStr,
      mainSystem: 'Machine Learning Pipeline with Web Inference API',
      keyFeatures: [
        'Data ingestion, automated feature extraction, and preprocessing pipeline',
        'Trained classification / regression model inference with confidence scores',
        'Visual explainability dashboards (e.g., feature importance weights)',
        'Continuous model feedback loop for retraining and performance tracking',
      ],
      possibleTechnologies: ['Python', 'scikit-learn / TensorFlow', 'FastAPI', 'React', 'Docker'],
      potentialScope: `Trained on a scoped benchmark dataset with documented accuracy, precision, recall, and F1-score evaluation metrics.`,
      quality: {
        clarity: 90,
        specificity: 95,
        relevance: 92,
        feasibility: 82,
        innovation: 94,
        scopeScore: 80,
        technicalComplexity: 92,
      },
      createdAt: new Date().toISOString(),
    },

    // 4. Mobile & Cloud Responsive Paradigm
    {
      id: `gen-${Date.now()}-4`,
      paradigm: 'Cross-Platform Mobile & Cloud Integration',
      title: `Cross-Platform Mobile-Assisted ${domain} and Real-Time Notification System with Cloud Synchronization`,
      rationale:
        'Emphasizes accessibility and mobile convenience for end users in the field or on-the-go. Highlights cloud synchronization and asynchronous push alert mechanisms.',
      problemAddressed: `Inability of ${primaryAudience.toLowerCase()} to access real-time status updates and submit inputs when away from desktop terminals.`,
      targetUsers: targetAudienceStr,
      mainSystem: 'Mobile Client with Cloud Microservices Backend',
      keyFeatures: [
        'Native-feel cross-platform user experience (iOS and Android)',
        'Push notifications for critical schedule changes and priority alerts',
        'Offline caching with automatic background synchronization upon reconnect',
        'Camera, GPS, or biometric hardware sensor integration',
      ],
      possibleTechnologies: ['React Native / Flutter', 'Node.js', 'Firebase Cloud Messaging', 'PostgreSQL'],
      potentialScope: `Bounded to mobile user workflows with an accompanying administrative web console for institutional management.`,
      quality: {
        clarity: 93,
        specificity: 89,
        relevance: 91,
        feasibility: 90,
        innovation: 82,
        scopeScore: 88,
        technicalComplexity: 78,
      },
      createdAt: new Date().toISOString(),
    },

    // 5. Hardware / IoT / Edge Embedded System
    {
      id: `gen-${Date.now()}-5`,
      paradigm: 'IoT & Telemetry Integration',
      title: `IoT-Enabled ${domain} Telemetry and Automated Control System Using Microcontroller Sensor Nodes`,
      rationale:
        'Tailored specifically for Computer Engineering, Electronics, or IoT tracks. Connects physical hardware telemetry to a cloud monitoring interface.',
      problemAddressed: `Lack of continuous physical monitoring, manual data logging, and delayed response to critical environmental or physical threshold triggers.`,
      targetUsers: targetAudienceStr,
      mainSystem: 'Edge Microcontroller Hardware with Web Telemetry Dashboard',
      keyFeatures: [
        'Hardware sensor data acquisition (MQTT / HTTP protocol transmission)',
        'Edge logic for local actuator triggering and fail-safe alerts',
        'Live streaming time-series visualization on cloud web dashboard',
        'Historical sensor threshold logging and anomaly detection',
      ],
      possibleTechnologies: ['ESP32 / Arduino', 'C++', 'MQTT Broker', 'Node.js', 'React', 'InfluxDB / MongoDB'],
      potentialScope: `Tested with 2-3 localized physical sensor nodes in a controlled test environment.`,
      quality: {
        clarity: 89,
        specificity: 93,
        relevance: 90,
        feasibility: 80,
        innovation: 91,
        scopeScore: 78,
        technicalComplexity: 90,
      },
      createdAt: new Date().toISOString(),
    },

    // 6. Usability, Validation & Empirical Research Paradigm
    {
      id: `gen-${Date.now()}-6`,
      paradigm: 'Empirical Research & Usability Evaluation',
      title: `Design, Development, and Usability Evaluation of a Digital ${domain} Portal: An ISO 9241-11 Usability Assessment`,
      rationale:
        'A favorite among academic thesis panels because it incorporates formal research methodology and standard testing frameworks (ISO 9241 or ISO 25010) into the title itself.',
      problemAddressed: `Poor user adoption, high cognitive friction, and lack of scientifically validated interfaces in existing solutions for ${primaryAudience.toLowerCase()}.`,
      targetUsers: targetAudienceStr,
      mainSystem: 'Human-Centered Web Portal with Usability Instrumentation',
      keyFeatures: [
        'Streamlined, accessible UI adhering to WCAG 2.1 AAA accessibility',
        'In-system telemetry measuring task completion time and error rates',
        'Integrated System Usability Scale (SUS) questionnaire module',
        'Comparative pre- and post-deployment efficiency metrics',
      ],
      possibleTechnologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase / Node.js'],
      potentialScope: `System implementation followed by formal usability evaluation with a sample of 30-50 real respondent stakeholders.`,
      quality: {
        clarity: 95,
        specificity: 94,
        relevance: 93,
        feasibility: 92,
        innovation: 85,
        scopeScore: 92,
        technicalComplexity: 74,
      },
      createdAt: new Date().toISOString(),
    },

    // 7. Security, Auditability & Role-Based Governance
    {
      id: `gen-${Date.now()}-7`,
      paradigm: 'Secure Governance & Auditability',
      title: `Secure Cloud-Based ${domain} and Multi-Level Workflow Verification System with Immutable Audit Trails`,
      rationale:
        'Emphasizes enterprise compliance, data integrity, non-repudiation, and rigorous security postures suitable for corporate or government domain projects.',
      problemAddressed: `Risks of unauthorized record modification, lack of verifiable approval history, and security vulnerabilities in administrative transactions.`,
      targetUsers: targetAudienceStr,
      mainSystem: 'Enterprise Web Application with Cryptographic Audit Logging',
      keyFeatures: [
        'Multi-factor authentication (MFA) and JWT-based session security',
        'Cryptographically hashed tamper-evident transaction logs',
        'Multi-stage hierarchical approval matrix with digital sign-offs',
        'Compliance report generator for internal institutional audits',
      ],
      possibleTechnologies: ['Next.js', 'Spring Boot / Node.js', 'PostgreSQL', 'Docker', 'Redis'],
      potentialScope: `Restricted to internal authorization pathways and compliance protocols within the designated organizational scope.`,
      quality: {
        clarity: 91,
        specificity: 90,
        relevance: 95,
        feasibility: 88,
        innovation: 87,
        scopeScore: 86,
        technicalComplexity: 85,
      },
      createdAt: new Date().toISOString(),
    },

    // 8. Agile Modular Micro-Architecture
    {
      id: `gen-${Date.now()}-8`,
      paradigm: 'Modular Service Architecture',
      title: `Modular Web-Based Information Platform for ${domain} with Dynamic Analytics and Role-Based Notification Services`,
      rationale:
        'Highlights modular software engineering principles, making it straightforward to defend code architecture, separation of concerns, and system maintainability.',
      problemAddressed: `Rigid, monolithic systems that are difficult to adapt to evolving institutional requirements and varied departmental roles.`,
      targetUsers: targetAudienceStr,
      mainSystem: 'Modular Service-Oriented Web Application',
      keyFeatures: [
        'Pluggable service modules for distinct organizational units',
        'Configurable workflow builder without requiring source code modifications',
        'Automated digest generation and event-driven webhooks',
        'Comprehensive RESTful API documentation for interoperability',
      ],
      possibleTechnologies: technologies.length > 0 ? technologies : ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
      potentialScope: `Scoped to 3 core operational modules with defined interoperability endpoints.`,
      quality: {
        clarity: 93,
        specificity: 87,
        relevance: 92,
        feasibility: 93,
        innovation: 83,
        scopeScore: 91,
        technicalComplexity: 79,
      },
      createdAt: new Date().toISOString(),
    },
  ];

  return candidates;
}
