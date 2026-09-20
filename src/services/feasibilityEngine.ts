import { DifficultyLevel, FeasibilityReport, ProjectScope } from '../types';

interface FeasibilityInput {
  titleOrIdea: string;
  technologies: string[];
  scope: ProjectScope;
  difficulty: DifficultyLevel;
}

export function evaluateFeasibility(input: FeasibilityInput): FeasibilityReport {
  const { titleOrIdea, technologies, scope, difficulty } = input;
  const lower = titleOrIdea.toLowerCase();

  // Technical feasibility
  let techScore = 90;
  let timeScore = 88;
  let scopeScore = 85;

  const requiresHardware = lower.includes('iot') || lower.includes('sensor') || lower.includes('hardware') || lower.includes('arduino') || lower.includes('drone') || lower.includes('esp32');
  const requiresDeepAI = lower.includes('deep learning') || lower.includes('computer vision') || lower.includes('cnn') || lower.includes('neural') || lower.includes('nlp') || lower.includes('transformer');
  const requiresBiometrics = lower.includes('biometric') || lower.includes('fingerprint') || lower.includes('facial recognition');

  if (requiresHardware) {
    techScore -= 12;
    timeScore -= 15;
  }
  if (requiresDeepAI) {
    techScore -= 10;
    timeScore -= 10;
  }
  if (requiresBiometrics) {
    techScore -= 8;
  }

  if (difficulty === 'Advanced') {
    techScore -= 8;
    timeScore -= 10;
  } else if (difficulty === 'Beginner') {
    techScore += 5;
    timeScore += 5;
  }

  if (scope === 'Large') {
    scopeScore = 65;
    timeScore -= 18;
  } else if (scope === 'Small') {
    scopeScore = 95;
    timeScore += 8;
  }

  // Clamping
  techScore = Math.max(45, Math.min(98, techScore));
  timeScore = Math.max(40, Math.min(98, timeScore));
  scopeScore = Math.max(40, Math.min(98, scopeScore));

  const averageScore = (techScore + timeScore + scopeScore) / 3;

  let overallComplexity: 'Low' | 'Moderate' | 'High' = 'Moderate';
  if (averageScore < 65 || requiresHardware && requiresDeepAI || difficulty === 'Advanced') {
    overallComplexity = 'High';
  } else if (averageScore > 85 && scope === 'Small') {
    overallComplexity = 'Low';
  }

  // Estimated months
  let estimatedMonths = 4;
  if (overallComplexity === 'High') estimatedMonths = 7;
  if (overallComplexity === 'Low') estimatedMonths = 3;

  // Resource list derivation
  const hardware: string[] = ['Standard Developer PC / Laptop (Min 16GB RAM recommended)'];
  if (requiresHardware) {
    hardware.push('ESP32 / Arduino Microcontroller Development Boards', 'Breadboard, Regulated Power Supply, & Jumper Wires', 'Sensors (e.g. DHT22, Ultrasonic, Soil NPK or Moisture)');
  }
  if (requiresDeepAI) {
    hardware.push('NVIDIA GPU Workstation or Cloud GPU Compute (Google Colab / Kaggle)');
  }

  const software: string[] = ['VS Code / JetBrains IDE', 'Git & GitHub Version Control', 'Postman / Insomnia for API Testing'];
  if (requiresDeepAI) software.push('Jupyter Lab / Python 3.11 Runtime', 'Conda Virtual Environment');

  const apis: string[] = ['JWT / OAuth 2.0 Authentication Service'];
  if (lower.includes('sms') || lower.includes('notification')) apis.push('Twilio / Semaphore SMS Gateway API');
  if (lower.includes('map') || lower.includes('location')) apis.push('Google Maps / Mapbox Geolocation API');
  if (lower.includes('payment')) apis.push('Stripe / PayMongo Sandbox API');

  const cloudServices = ['Vercel / Netlify / Render (Frontend Hosting)', 'Supabase / Neon / Railway (Managed Database Instance)'];
  if (requiresHardware) cloudServices.push('HiveMQ / AWS IoT Core (MQTT Broker)');

  const datasetRequirements: string[] = [];
  if (requiresDeepAI) {
    datasetRequirements.push('Curated benchmark dataset (Min 1,000–5,000 labeled image or tabular samples)', 'Data augmentation pipeline for class balancing');
  } else {
    datasetRequirements.push('Synthetic institutional test data for load and edge-case validation', 'Pre-configured CSV/SQL seed files');
  }

  const developmentSkills = ['Relational Database Modeling & Normalization', 'RESTful API Design & Integration', 'Responsive Frontend Development'];
  if (requiresHardware) developmentSkills.push('Embedded C/C++ Firmware Programming', 'Circuit Prototyping & Sensor Calibration');
  if (requiresDeepAI) developmentSkills.push('Data Preprocessing, Model Training & Loss Function Evaluation');

  return {
    technicalFeasibility: {
      score: techScore,
      verdict: techScore >= 80 ? 'High Viability' : techScore >= 60 ? 'Moderate Viability' : 'High Risk / Low Viability',
      analysis:
        techScore >= 80
          ? 'The proposed architectural stack uses battle-tested frameworks with extensive documentation and community libraries.'
          : 'Involves specialized integrations (hardware/embedded systems or custom model training) that require dedicated technical validation before Chapter 3 defense.',
    },
    timeFeasibility: {
      score: timeScore,
      estimatedMonths,
      timelineFeasibility:
        estimatedMonths <= 4
          ? 'Easily Feasible (1 Semester)'
          : estimatedMonths <= 6
          ? 'Standard (1-2 Semesters)'
          : 'Risk of Overrun',
      analysis: `A typical student capstone timeline spans 16 to 24 weeks. This project is projected to require approximately ${estimatedMonths} months of development, testing, and documentation.`,
    },
    scopeFeasibility: {
      score: scopeScore,
      verdict: scopeScore >= 80 ? 'Well-Bounded' : scopeScore >= 60 ? 'Borderline Broad' : 'Critically Over-scoped',
      analysis:
        scopeScore >= 80
          ? 'Scope is focused on specific, measurable departmental objectives without open-ended institutional bloat.'
          : 'Risk of feature sprawl. Ensure explicit delimitation of non-essential features (such as automated billing or multi-tenant hosting) into "Future Work".',
    },
    resourceRequirements: {
      hardware,
      software,
      apis,
      cloudServices,
      datasetRequirements,
      developmentSkills,
    },
    overallComplexity,
    explanation:
      overallComplexity === 'High'
        ? 'High complexity due to cross-disciplinary requirements (integrating hardware, machine learning inference, or extensive multi-role workflows). Strong project management and weekly adviser syncs are imperative.'
        : overallComplexity === 'Moderate'
        ? 'Balanced complexity. Standard for university-level computing degrees. Fully executable within a 2-semester thesis sequence if milestones are tracked.'
        : 'Straightforward execution with minimal dependency bottlenecks. Ideal for rapid prototyping and rigorous user testing.',
  };
}
