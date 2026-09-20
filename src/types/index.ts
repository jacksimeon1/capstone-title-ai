export type AcademicProgram =
  | 'Information Technology'
  | 'Computer Science'
  | 'Information Systems'
  | 'Software Engineering'
  | 'Computer Engineering'
  | 'Electronics Engineering'
  | 'Business Administration'
  | 'Education & Pedagogy'
  | 'Healthcare & Nursing'
  | 'Hospitality & Tourism'
  | 'Agriculture & Biosciences'
  | 'Other';

export type ProjectType =
  | 'Web Application'
  | 'Mobile Application'
  | 'Desktop Application'
  | 'AI / Machine Learning System'
  | 'IoT & Embedded System'
  | 'Information System'
  | 'Management System'
  | 'Decision Support System'
  | 'E-Commerce System'
  | 'Educational System'
  | 'Healthcare Information System'
  | 'Business & ERP System'
  | 'Robotics & Automation System'
  | 'Other';

export type TargetUser =
  | 'Students'
  | 'Teachers & Faculty'
  | 'School Administrators'
  | 'Corporate Employees'
  | 'Customers & Consumers'
  | 'Small Business Owners'
  | 'Government Agencies'
  | 'Patients & Clinicians'
  | 'Academic Researchers'
  | 'Farmers & Agriculturalists'
  | 'Community Members';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ProjectScope = 'Small' | 'Medium' | 'Large';

export interface QualityIndicators {
  clarity: number;
  specificity: number;
  relevance: number;
  feasibility: number;
  innovation: number;
  scopeScore: number;
  technicalComplexity: number;
}

export interface GeneratedTitleCandidate {
  id: string;
  title: string;
  paradigm: string;
  rationale: string;
  problemAddressed: string;
  targetUsers: string;
  mainSystem: string;
  keyFeatures: string[];
  possibleTechnologies: string[];
  potentialScope: string;
  quality: QualityIndicators;
  createdAt: string;
  saved?: boolean;
}

export interface TitleStructure {
  systemType: string;
  domain: string;
  targetUsers: string;
  technologies: string[];
  keyFunctionality: string[];
  researchVariables: {
    independent: string[];
    dependent: string[];
  };
  intendedOutcome: string;
}

export interface ProblemDetected {
  id: string;
  type:
    | 'Too Broad'
    | 'Too Generic'
    | 'Target Users Unclear'
    | 'Functionality Unclear'
    | 'Scope Undefined'
    | 'Technology Unspecified'
    | 'Research Context Missing';
  severity: 'low' | 'medium' | 'high';
  description: string;
  suggestion: string;
}

export interface ImprovedTitleRevision {
  title: string;
  rationale: string;
  focus: string;
}

export interface TitleAnalysisResult {
  id: string;
  title: string;
  analyzedAt: string;
  structure: TitleStructure;
  problemsDetected: ProblemDetected[];
  qualityMetrics: {
    clarity: number;
    specificity: number;
    scope: number;
    feasibility: number;
    technicalDepth: number;
    problemRelevance: number;
    targetUserDefinition: number;
    innovation: number;
    researchPotential: number;
    overallQuality: number;
  };
  improvedRevisions: {
    conservative: ImprovedTitleRevision;
    professional: ImprovedTitleRevision;
    advanced: ImprovedTitleRevision;
    researchOriented: ImprovedTitleRevision;
  };
}

export interface BenchmarkTitle {
  id: string;
  title: string;
  program: AcademicProgram;
  category: string;
  year: number;
  institution: string;
  keywords: string[];
  technologies: string[];
  targetUsers: string[];
  complexity: 'Low' | 'Moderate' | 'High';
  status: 'Approved' | 'Archived' | 'Flagged';
}

export interface ConflictMatch {
  benchmark: BenchmarkTitle;
  similarityScore: number;
  matchingConcepts: string[];
  differences: string[];
  explanation: string;
}

export interface ConflictCheckResult {
  proposedTitle: string;
  overallConflictRisk: 'Low' | 'Moderate' | 'High';
  highestSimilarityScore: number;
  matches: ConflictMatch[];
  academicAdvice: string;
}

export interface ProjectFeature {
  name: string;
  purpose: string;
  benefit: string;
  complexity: 'Low' | 'Moderate' | 'High';
}

export interface ConceptBlueprint {
  projectConcept: string;
  problemStatement: string;
  targetUsers: string[];
  proposedSolution: string;
  coreFeatures: ProjectFeature[];
  recommendedTechStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    aiOrSpecialized: string[];
    devops: string[];
  };
  databaseRequirements: Array<{
    table: string;
    purpose: string;
    sampleFields: string[];
  }>;
  possibleAIFeatures: string[];
  potentialCapstoneTitles: string[];
  scopeSuggestions: {
    included: string[];
    delimited: string[];
  };
  limitations: string[];
  futureEnhancements: string[];
}

export interface FeasibilityReport {
  technicalFeasibility: {
    score: number;
    verdict: 'High Viability' | 'Moderate Viability' | 'High Risk / Low Viability';
    analysis: string;
  };
  timeFeasibility: {
    score: number;
    estimatedMonths: number;
    timelineFeasibility: 'Easily Feasible (1 Semester)' | 'Standard (1-2 Semesters)' | 'Risk of Overrun';
    analysis: string;
  };
  scopeFeasibility: {
    score: number;
    verdict: 'Well-Bounded' | 'Borderline Broad' | 'Critically Over-scoped';
    analysis: string;
  };
  resourceRequirements: {
    hardware: string[];
    software: string[];
    apis: string[];
    cloudServices: string[];
    datasetRequirements: string[];
    developmentSkills: string[];
  };
  overallComplexity: 'Low' | 'Moderate' | 'High';
  explanation: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  idea: string;
  program: AcademicProgram;
  projectType: ProjectType;
  targetUsers: string[];
  technologies: string[];
  difficulty: DifficultyLevel;
  scope: ProjectScope;
  additionalRequirements: string;
  generatedTitles: GeneratedTitleCandidate[];
  savedTitles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  program: AcademicProgram;
  school: string;
  yearLevel: string;
  preferredTech: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
