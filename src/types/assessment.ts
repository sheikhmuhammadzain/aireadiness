export type Industry = 'healthcare' | 'finance' | 'manufacturing' | 'retail' | 'technology' | 'other';

export type CompanySize = 'small' | 'medium' | 'large' | 'enterprise';

export type Domain = 
  | 'data_infrastructure'
  | 'talent_capability'
  | 'ethics_governance'
  | 'technical_infrastructure'
  | 'business_strategy'
  | 'data_quality'
  | 'security_compliance';

export type MaturityLevel = 'initial' | 'developing' | 'defined' | 'managed' | 'optimizing';

export interface QuestionWeight {
  industry: Record<Industry, number>;
  companySize: Record<CompanySize, number>;
  baseWeight: number;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  domain: Domain;
  industry?: Industry[];
  companySize?: CompanySize[];
  weight: QuestionWeight;
  options: {
    value: number;
    label: string;
    description: string;
    recommendations?: string[];
    nextQuestions?: string[];
    estimatedCost?: {
      min: number;
      max: number;
      currency: string;
    };
  }[];
  dependencies?: {
    questionId: string;
    requiredAnswer: number;
  }[];
}

export interface OrganizationProfile {
  industry: Industry;
  companySize: CompanySize;
  annualRevenue?: number;
  employeeCount?: number;
  region?: string;
}

export interface DomainScore {
  score: number;
  maxScore: number;
  percentage: number;
  maturityLevel: MaturityLevel;
  recommendations: string[];
  benchmarks: {
    industryAverage: number;
    percentileRank: number;
    similarCompanies: number;
  };
}

export interface AssessmentResult {
  totalScore: number;
  maturityLevel: MaturityLevel;
  domainScores: Record<Domain, DomainScore>;
  benchmarkComparison: {
    industryAverage: number;
    percentileRank: number;
    similarCompanies: {
      average: number;
      count: number;
    };
  };
  estimatedCosts: {
    infrastructure: number;
    training: number;
    implementation: number;
    total: number;
    roi: {
      optimistic: number;
      conservative: number;
      timeframe: number;
    };
  };
  implementationTimeframe: {
    minimum: number;
    maximum: number;
    unit: 'months';
    milestones: Array<{
      month: number;
      description: string;
      domain: Domain;
    }>;
  };
  recommendations: Array<{
    domain: Domain;
    priority: 'high' | 'medium' | 'low';
    timeframe: 'short' | 'medium' | 'long';
    description: string;
    estimatedCost: number;
    expectedImpact: number;
  }>;
} 