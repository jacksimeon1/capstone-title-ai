import { ProblemDetected, TitleAnalysisResult } from '../types';

export function analyzeExistingTitle(rawTitle: string): TitleAnalysisResult {
  const title = rawTitle.trim();
  const lower = title.toLowerCase();

  // 1. Structure Extraction
  let systemType = 'Information System';
  if (lower.includes('web') || lower.includes('portal') || lower.includes('online')) {
    systemType = 'Web-Based Application / Portal';
  } else if (lower.includes('mobile') || lower.includes('android') || lower.includes('ios') || lower.includes('app')) {
    systemType = 'Mobile Application';
  } else if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('neural') || lower.includes('deep learning') || lower.includes('cnn') || lower.includes('nlp')) {
    systemType = 'AI / Machine Learning System';
  } else if (lower.includes('iot') || lower.includes('sensor') || lower.includes('arduino') || lower.includes('esp32') || lower.includes('hardware')) {
    systemType = 'IoT & Embedded System';
  } else if (lower.includes('decision support') || lower.includes('dss') || lower.includes('optimization')) {
    systemType = 'Decision Support System (DSS)';
  } else if (lower.includes('management system') || lower.includes('tracking')) {
    systemType = 'Management Information System (MIS)';
  }

  // Domain extraction
  let domain = 'General Administrative Operations';
  if (lower.includes('school') || lower.includes('student') || lower.includes('class') || lower.includes('academic') || lower.includes('faculty') || lower.includes('schedul')) {
    domain = 'Academic & Educational Administration';
  } else if (lower.includes('health') || lower.includes('patient') || lower.includes('clinic') || lower.includes('hospital') || lower.includes('medical') || lower.includes('triage')) {
    domain = 'Healthcare Informatics & Clinical Operations';
  } else if (lower.includes('farm') || lower.includes('crop') || lower.includes('plant') || lower.includes('agricultur') || lower.includes('soil')) {
    domain = 'Agricultural Technology & Crop Pathology';
  } else if (lower.includes('inventory') || lower.includes('store') || lower.includes('sales') || lower.includes('retail') || lower.includes('order') || lower.includes('business')) {
    domain = 'Enterprise Retail & Supply Chain Operations';
  } else if (lower.includes('security') || lower.includes('vulnerability') || lower.includes('attack') || lower.includes('code') || lower.includes('api')) {
    domain = 'Software Engineering & Cybersecurity';
  }

  // Target users extraction
  let targetUsers = 'General / Unspecified Users';
  if (lower.includes('student') && lower.includes('teacher')) {
    targetUsers = 'Students and Faculty Members';
  } else if (lower.includes('student')) {
    targetUsers = 'Students';
  } else if (lower.includes('faculty') || lower.includes('teacher') || lower.includes('instructor')) {
    targetUsers = 'Teachers and Academic Faculty';
  } else if (lower.includes('patient') || lower.includes('doctor') || lower.includes('nurse') || lower.includes('clinician')) {
    targetUsers = 'Clinicians and Patients';
  } else if (lower.includes('farmer')) {
    targetUsers = 'Farmers and Agricultural Stakeholders';
  } else if (lower.includes('administrator') || lower.includes('admin')) {
    targetUsers = 'Institutional Administrators';
  }

  // Technologies inferred or noted
  const technologies: string[] = [];
  if (lower.includes('web') || lower.includes('portal')) technologies.push('Web Frameworks (e.g. React / Next.js / Laravel)');
  if (lower.includes('mobile')) technologies.push('Mobile SDK (e.g. Flutter / React Native)');
  if (lower.includes('ai') || lower.includes('smart') || lower.includes('learning')) technologies.push('Machine Learning Pipeline (Python / TensorFlow / scikit-learn)');
  if (lower.includes('iot') || lower.includes('sensor')) technologies.push('Microcontrollers (ESP32 / Arduino / MQTT)');
  if (technologies.length === 0) {
    technologies.push('Standard Relational Database Management System (RDBMS) & Full-Stack Web Framework');
  }

  // Functionality
  const keyFunctionality: string[] = [];
  if (lower.includes('schedul') || lower.includes('conflict')) keyFunctionality.push('Timetable Scheduling & Conflict Detection');
  if (lower.includes('track') || lower.includes('monitor')) keyFunctionality.push('Real-Time Tracking and Status Monitoring');
  if (lower.includes('predict') || lower.includes('classif') || lower.includes('detect')) keyFunctionality.push('Automated Classification & Predictive Analysis');
  if (lower.includes('evaluat') || lower.includes('grad') || lower.includes('score')) keyFunctionality.push('Assessment Scoring & Usability Measurement');
  if (keyFunctionality.length === 0) {
    keyFunctionality.push('Centralized Records Management', 'Transactional CRUD Operations', 'Analytical Reporting');
  }

  // Research variables
  const independent = ['Automated Digital Workflow Architecture', 'Algorithmic Validation Heuristics'];
  const dependent = ['Turnaround Time / Latency', 'Scheduling Conflict Rate', 'User Task Completion Efficiency'];

  if (lower.includes('iot') || lower.includes('sensor')) {
    independent.push('Sensor Sampling Rate and Telemetry Transmission');
    dependent.push('Environmental Data Accuracy', 'System Alert Response Latency');
  }
  if (lower.includes('ai') || lower.includes('detect') || lower.includes('predict')) {
    independent.push('Feature Engineering and Model Hyperparameters');
    dependent.push('Precision, Recall, and F1-Score Accuracy');
  }

  // 2. Problem Detection
  const problemsDetected: ProblemDetected[] = [];

  const wordCount = title.split(/\s+/).length;
  const genericWords = ['smart', 'system', 'app', 'online', 'tool', 'platform', 'good', 'helper', 'quick'];
  const matchedGenerics = genericWords.filter((w) => lower.includes(w));

  // Check 1: Too Generic
  if (matchedGenerics.length >= 2 && wordCount < 9) {
    problemsDetected.push({
      id: 'prob-1',
      type: 'Too Generic',
      severity: 'high',
      description: `The title utilizes buzzwords (${matchedGenerics.map(w => `"${w}"`).join(', ')}) without specifying the underlying mechanism or technical methodology.`,
      suggestion: 'Replace colloquial buzzwords like "Smart" with precise technical descriptors such as "Automated", "Rule-Based", "AI-Assisted", or "Decision Support".',
    });
  }

  // Check 2: Too Broad / Unbounded Scope
  if (
    (lower.includes('management') && !lower.includes('for') && wordCount < 8) ||
    lower.includes('all') ||
    lower === 'school management system' ||
    lower === 'smart school system' ||
    wordCount < 6
  ) {
    problemsDetected.push({
      id: 'prob-2',
      type: 'Too Broad',
      severity: 'high',
      description: 'The title attempts to address an entire institutional domain without clear boundaries, which will invite intense skepticism during a defense.',
      suggestion: 'Delimit the project to a specific operational sub-domain, such as "Classroom Scheduling", "Student Clearance", or "Grade Inquiries".',
    });
  }

  // Check 3: Target Users Unclear
  if (!lower.includes('for') && targetUsers.includes('Unspecified')) {
    problemsDetected.push({
      id: 'prob-3',
      type: 'Target Users Unclear',
      severity: 'medium',
      description: 'The intended primary beneficiaries or organizational stakeholders are not explicitly declared in the title.',
      suggestion: 'Append the intended beneficiary cohort (e.g. "...for Senior High School Faculty and Students" or "...for Rural Health Units").',
    });
  }

  // Check 4: Technology / Delivery Unspecified
  if (!lower.includes('web') && !lower.includes('mobile') && !lower.includes('iot') && !lower.includes('cloud') && !lower.includes('desktop')) {
    problemsDetected.push({
      id: 'prob-4',
      type: 'Technology Unspecified',
      severity: 'medium',
      description: 'The architectural form factor or delivery mechanism is ambiguous (is this a web app, mobile app, desktop software, or hardware device?).',
      suggestion: 'Prefix or qualify the title with "Web-Based", "Mobile-Assisted", "Cloud-Hosted", or "Cross-Platform".',
    });
  }

  // Check 5: Research Context Missing
  if (!lower.includes('evaluation') && !lower.includes('algorithm') && !lower.includes('support') && !lower.includes('analysis') && !lower.includes('framework')) {
    problemsDetected.push({
      id: 'prob-5',
      type: 'Research Context Missing',
      severity: 'low',
      description: 'The title sounds like a standard commercial software product rather than an academic thesis or scholarly investigation.',
      suggestion: 'Incorporate academic components such as an evaluation framework, predictive modeling, or constraint optimization.',
    });
  }

  // 3. 10-Point Metric Scoring
  let clarityScore = 80;
  let specificityScore = 75;
  let scopeScore = 78;
  let feasibilityScore = 85;
  let technicalDepthScore = 70;
  let problemRelevanceScore = 82;
  let targetUserDefScore = 75;
  let innovationScore = 65;
  let researchPotentialScore = 72;

  if (wordCount < 6) {
    clarityScore = Math.max(40, clarityScore - 30);
    specificityScore = Math.max(35, specificityScore - 35);
    technicalDepthScore = Math.max(40, technicalDepthScore - 25);
  } else if (wordCount > 18) {
    clarityScore = Math.max(50, clarityScore - 20);
    scopeScore = Math.max(55, scopeScore - 20);
  } else {
    clarityScore += 10;
    specificityScore += 12;
  }

  if (problemsDetected.some((p) => p.type === 'Too Generic')) {
    specificityScore = Math.max(40, specificityScore - 20);
    innovationScore = Math.max(45, innovationScore - 15);
  }
  if (problemsDetected.some((p) => p.type === 'Too Broad')) {
    scopeScore = Math.max(45, scopeScore - 25);
    feasibilityScore = Math.max(50, feasibilityScore - 20);
  }
  if (problemsDetected.some((p) => p.type === 'Target Users Unclear')) {
    targetUserDefScore = Math.max(40, targetUserDefScore - 25);
  }
  if (lower.includes('ai') || lower.includes('algorithm') || lower.includes('iot') || lower.includes('neural')) {
    technicalDepthScore = Math.min(95, technicalDepthScore + 18);
    innovationScore = Math.min(92, innovationScore + 20);
    researchPotentialScore = Math.min(95, researchPotentialScore + 18);
  }

  const overallQuality = Math.round(
    (clarityScore * 0.15 +
      specificityScore * 0.15 +
      scopeScore * 0.12 +
      feasibilityScore * 0.12 +
      technicalDepthScore * 0.12 +
      problemRelevanceScore * 0.1 +
      targetUserDefScore * 0.08 +
      innovationScore * 0.08 +
      researchPotentialScore * 0.08)
  );

  // 4. Generate 4 Improved Revisions
  // Sanitize title for rewrites
  const coreNoun = title
    .replace(/^(a|an|the)\s+/i, '')
    .replace(/smart\s+/i, '')
    .replace(/system\s*/i, '')
    .trim() || 'Institutional Operations';

  const improvedRevisions = {
    conservative: {
      title: `Web-Based ${coreNoun.charAt(0).toUpperCase() + coreNoun.slice(1)} Management Information System for Academic Stakeholders`,
      rationale:
        'Standard, defendable academic formulation. Replaces vague buzzwords with precise web delivery and standard Management Information System (MIS) terminology.',
      focus: 'Safe, standard capstone structure with clear scope and stakeholders.',
    },
    professional: {
      title: `Centralized ${coreNoun.charAt(0).toUpperCase() + coreNoun.slice(1)} and Workflow Monitoring Portal with Automated Reporting`,
      rationale:
        'Adopts modern enterprise SaaS terminology. Highlights workflow automation, role auditing, and structured transactional data handling.',
      focus: 'Industry-ready software architecture and operational clarity.',
    },
    advanced: {
      title: `Intelligent Decision Support and Optimization System for ${coreNoun.charAt(0).toUpperCase() + coreNoun.slice(1)} Using Heuristic Scheduling Algorithms`,
      rationale:
        'Substantially elevates technical complexity. Demonstrates computer science depth by specifying an algorithmic optimization engine.',
      focus: 'Algorithm-driven constraint solving and high technical rigor.',
    },
    researchOriented: {
      title: `Design, Implementation, and Usability Evaluation of an Automated ${coreNoun.charAt(0).toUpperCase() + coreNoun.slice(1)} Platform: An Empirical Assessment Using the ISO/IEC 25010 Quality Model`,
      rationale:
        'Embeds formal thesis methodology directly in the title. Panelists will immediately recognize the empirical research design and scientific evaluation standards.',
      focus: 'Rigorous empirical evaluation and published international software standards.',
    },
  };

  return {
    id: `eval-${Date.now()}`,
    title,
    analyzedAt: new Date().toISOString(),
    structure: {
      systemType,
      domain,
      targetUsers,
      technologies,
      keyFunctionality,
      researchVariables: {
        independent,
        dependent,
      },
      intendedOutcome: `Streamline and digitize ${domain.toLowerCase()} with verifiable improvements in user productivity and error minimization.`,
    },
    problemsDetected,
    qualityMetrics: {
      clarity: Math.min(98, clarityScore),
      specificity: Math.min(98, specificityScore),
      scope: Math.min(98, scopeScore),
      feasibility: Math.min(98, feasibilityScore),
      technicalDepth: Math.min(98, technicalDepthScore),
      problemRelevance: Math.min(98, problemRelevanceScore),
      targetUserDefinition: Math.min(98, targetUserDefScore),
      innovation: Math.min(98, innovationScore),
      researchPotential: Math.min(98, researchPotentialScore),
      overallQuality: Math.min(98, overallQuality),
    },
    improvedRevisions,
  };
}
