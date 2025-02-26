import { z } from 'zod';
import { Industry, CompanySize, Domain, MaturityLevel } from '@/types/assessment';

export const organizationProfileSchema = z.object({
  industry: z.enum(['healthcare', 'finance', 'manufacturing', 'retail', 'technology', 'other'] as const),
  companySize: z.enum(['small', 'medium', 'large', 'enterprise'] as const),
  annualRevenue: z.number().optional(),
  employeeCount: z.number().optional(),
  region: z.string().optional()
});

export const questionOptionSchema = z.object({
  value: z.number().min(1).max(4),
  label: z.string(),
  description: z.string(),
  recommendations: z.array(z.string()).optional(),
  nextQuestions: z.array(z.string()).optional(),
  estimatedCost: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string()
  }).optional()
});

export const questionWeightSchema = z.object({
  baseWeight: z.number(),
  industry: z.record(z.number()),
  companySize: z.record(z.number())
});

export const assessmentQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  domain: z.enum([
    'data_infrastructure',
    'talent_capability',
    'ethics_governance',
    'technical_infrastructure',
    'business_strategy',
    'data_quality',
    'security_compliance'
  ] as const),
  industry: z.array(z.enum(['healthcare', 'finance', 'manufacturing', 'retail', 'technology', 'other'] as const)).optional(),
  companySize: z.array(z.enum(['small', 'medium', 'large', 'enterprise'] as const)).optional(),
  weight: questionWeightSchema,
  options: z.array(questionOptionSchema),
  dependencies: z.array(z.object({
    questionId: z.string(),
    requiredAnswer: z.number()
  })).optional()
});

export const assessmentResultSchema = z.object({
  totalScore: z.number().min(0).max(100),
  maturityLevel: z.enum(['initial', 'developing', 'defined', 'managed', 'optimizing'] as const),
  domainScores: z.record(z.object({
    score: z.number().min(0).max(100),
    maxScore: z.number(),
    percentage: z.number().min(0).max(100),
    maturityLevel: z.string(),
    recommendations: z.array(z.string()),
    benchmarks: z.object({
      industryAverage: z.number(),
      percentileRank: z.number(),
      similarCompanies: z.number()
    })
  })),
  benchmarkComparison: z.object({
    industryAverage: z.number(),
    percentileRank: z.number(),
    similarCompanies: z.object({
      average: z.number(),
      count: z.number()
    })
  }),
  estimatedCosts: z.object({
    infrastructure: z.number(),
    training: z.number(),
    implementation: z.number(),
    total: z.number(),
    roi: z.object({
      optimistic: z.number(),
      conservative: z.number(),
      timeframe: z.number()
    })
  }),
  implementationTimeframe: z.object({
    minimum: z.number(),
    maximum: z.number(),
    unit: z.literal('months'),
    milestones: z.array(z.object({
      month: z.number(),
      description: z.string(),
      domain: z.enum([
        'data_infrastructure',
        'talent_capability',
        'ethics_governance',
        'technical_infrastructure',
        'business_strategy',
        'data_quality',
        'security_compliance'
      ] as const)
    }))
  }),
  recommendations: z.array(z.object({
    domain: z.enum([
      'data_infrastructure',
      'talent_capability',
      'ethics_governance',
      'technical_infrastructure',
      'business_strategy',
      'data_quality',
      'security_compliance'
    ] as const),
    priority: z.enum(['high', 'medium', 'low'] as const),
    timeframe: z.enum(['short', 'medium', 'long'] as const),
    description: z.string(),
    estimatedCost: z.number(),
    expectedImpact: z.number().min(0).max(100)
  }))
}); 