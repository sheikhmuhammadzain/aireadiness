import { AssessmentQuestion, Domain, Industry, CompanySize, MaturityLevel } from '@/types/assessment';

const baseWeights = {
  industry: {
    healthcare: 1.2,
    finance: 1.2,
    manufacturing: 1.1,
    retail: 1.0,
    technology: 1.3,
    other: 1.0
  },
  companySize: {
    small: 0.9,
    medium: 1.0,
    large: 1.1,
    enterprise: 1.2
  }
};

// Base questions that all organizations should answer
const baseQuestions: AssessmentQuestion[] = [
  {
    id: 'data-storage',
    domain: 'data_infrastructure',
    text: 'How do you currently store and manage your data?',
    weight: {
      baseWeight: 1.5,
      industry: baseWeights.industry,
      companySize: baseWeights.companySize
    },
    options: [
      {
        value: 1,
        label: 'Basic',
        description: 'Data stored in basic files or simple databases',
        recommendations: [
          'Implement proper database system',
          'Develop data management strategy',
          'Create backup procedures'
        ],
        estimatedCost: { min: 50000, max: 100000, currency: 'USD' }
      },
      {
        value: 2,
        label: 'Structured',
        description: 'Organized databases with basic management',
        recommendations: [
          'Implement data warehouse',
          'Develop data governance',
          'Create data catalog'
        ],
        estimatedCost: { min: 100000, max: 200000, currency: 'USD' }
      },
      {
        value: 3,
        label: 'Advanced',
        description: 'Data warehouse with governance',
        recommendations: [
          'Implement data lake',
          'Develop advanced analytics',
          'Create data quality framework'
        ],
        estimatedCost: { min: 200000, max: 400000, currency: 'USD' }
      },
      {
        value: 4,
        label: 'Optimized',
        description: 'Modern data lake with advanced management',
        recommendations: [
          'Implement AI-driven management',
          'Develop real-time processing',
          'Create automated governance'
        ],
        estimatedCost: { min: 400000, max: 800000, currency: 'USD' }
      }
    ]
  },
  {
    id: 'technical-infrastructure',
    domain: 'technical_infrastructure',
    text: 'What is the state of your technical infrastructure for AI?',
    weight: {
      baseWeight: 1.8,
      industry: baseWeights.industry,
      companySize: baseWeights.companySize
    },
    options: [
      {
        value: 1,
        label: 'Basic',
        description: 'Limited computing resources',
        recommendations: [
          'Implement cloud infrastructure',
          'Develop computing strategy',
          'Create resource management'
        ],
        estimatedCost: { min: 75000, max: 150000, currency: 'USD' }
      },
      {
        value: 4,
        label: 'Advanced',
        description: 'Cloud-native infrastructure with ML capabilities',
        recommendations: [
          'Implement advanced orchestration',
          'Develop automated scaling',
          'Create MLOps platform'
        ],
        estimatedCost: { min: 300000, max: 600000, currency: 'USD' }
      }
    ]
  }
];

// Industry-specific follow-up questions
const industrySpecificQuestions: Record<Industry, AssessmentQuestion[]> = {
  healthcare: [
    {
      id: 'healthcare-data-privacy',
      domain: 'security_compliance',
      text: 'How does your organization handle healthcare data privacy and HIPAA compliance?',
      weight: {
        baseWeight: 2.0,
        industry: baseWeights.industry,
        companySize: baseWeights.companySize
      },
      dependencies: [
        { questionId: 'data-storage', requiredAnswer: 3 }
      ],
      options: [
        {
          value: 1,
          label: 'Basic',
          description: 'Minimal HIPAA compliance measures',
          recommendations: [
            'Implement comprehensive HIPAA compliance program',
            'Develop healthcare-specific data security protocols',
            'Create PHI access audit system'
          ],
          estimatedCost: { min: 100000, max: 200000, currency: 'USD' }
        },
        {
          value: 4,
          label: 'Advanced',
          description: 'Full HIPAA compliance with automated monitoring',
          recommendations: [
            'Implement AI-driven privacy monitoring',
            'Develop advanced encryption protocols',
            'Create automated compliance reporting'
          ],
          estimatedCost: { min: 400000, max: 800000, currency: 'USD' }
        }
      ]
    }
  ],
  finance: [
    {
      id: 'finance-risk-assessment',
      domain: 'ethics_governance',
      text: 'How does your organization handle AI risk assessment in financial operations?',
      weight: {
        baseWeight: 2.0,
        industry: baseWeights.industry,
        companySize: baseWeights.companySize
      },
      dependencies: [
        { questionId: 'ethics-governance', requiredAnswer: 3 }
      ],
      options: [
        {
          value: 1,
          label: 'Basic',
          description: 'Manual risk assessment procedures',
          recommendations: [
            'Implement automated risk assessment',
            'Develop financial AI governance',
            'Create risk monitoring dashboard'
          ],
          estimatedCost: { min: 200000, max: 400000, currency: 'USD' }
        },
        {
          value: 4,
          label: 'Advanced',
          description: 'AI-driven risk assessment and monitoring',
          recommendations: [
            'Implement predictive risk modeling',
            'Develop real-time monitoring',
            'Create advanced reporting system'
          ],
          estimatedCost: { min: 800000, max: 1600000, currency: 'USD' }
        }
      ]
    }
  ],
  manufacturing: [
    {
      id: 'manufacturing-quality',
      domain: 'data_quality',
      text: 'How do you handle quality control data in your manufacturing processes?',
      weight: {
        baseWeight: 1.8,
        industry: baseWeights.industry,
        companySize: baseWeights.companySize
      },
      dependencies: [
        { questionId: 'data-quality', requiredAnswer: 2 }
      ],
      options: [
        {
          value: 1,
          label: 'Basic',
          description: 'Manual quality control data collection',
          recommendations: [
            'Implement IoT sensors',
            'Develop automated quality monitoring',
            'Create predictive maintenance system'
          ],
          estimatedCost: { min: 150000, max: 300000, currency: 'USD' }
        },
        {
          value: 4,
          label: 'Advanced',
          description: 'AI-driven quality control system',
          recommendations: [
            'Implement advanced analytics',
            'Develop real-time optimization',
            'Create digital twin system'
          ],
          estimatedCost: { min: 600000, max: 1200000, currency: 'USD' }
        }
      ]
    }
  ],
  retail: [
    {
      id: 'retail-customer-data',
      domain: 'data_infrastructure',
      text: 'How do you manage and utilize customer data for personalization?',
      weight: {
        baseWeight: 1.7,
        industry: baseWeights.industry,
        companySize: baseWeights.companySize
      },
      dependencies: [
        { questionId: 'data-storage', requiredAnswer: 2 }
      ],
      options: [
        {
          value: 1,
          label: 'Basic',
          description: 'Basic customer data collection',
          recommendations: [
            'Implement customer data platform',
            'Develop personalization engine',
            'Create customer segmentation'
          ],
          estimatedCost: { min: 100000, max: 200000, currency: 'USD' }
        },
        {
          value: 4,
          label: 'Advanced',
          description: 'AI-driven personalization system',
          recommendations: [
            'Implement real-time personalization',
            'Develop predictive analytics',
            'Create omnichannel experience'
          ],
          estimatedCost: { min: 400000, max: 800000, currency: 'USD' }
        }
      ]
    }
  ],
  technology: [
    {
      id: 'tech-innovation',
      domain: 'business_strategy',
      text: 'How do you incorporate AI innovation in your product development?',
      weight: {
        baseWeight: 2.0,
        industry: baseWeights.industry,
        companySize: baseWeights.companySize
      },
      dependencies: [
        { questionId: 'business-strategy', requiredAnswer: 3 }
      ],
      options: [
        {
          value: 1,
          label: 'Basic',
          description: 'Limited AI integration in products',
          recommendations: [
            'Implement AI feature roadmap',
            'Develop innovation lab',
            'Create AI product strategy'
          ],
          estimatedCost: { min: 200000, max: 400000, currency: 'USD' }
        },
        {
          value: 4,
          label: 'Advanced',
          description: 'AI-first product development',
          recommendations: [
            'Implement advanced AI research',
            'Develop product innovation',
            'Create AI ecosystem'
          ],
          estimatedCost: { min: 800000, max: 1600000, currency: 'USD' }
        }
      ]
    }
  ],
  other: [
    {
      id: 'general-ai-adoption',
      domain: 'business_strategy',
      text: 'How do you approach AI adoption in your industry?',
      weight: {
        baseWeight: 1.5,
        industry: baseWeights.industry,
        companySize: baseWeights.companySize
      },
      dependencies: [
        { questionId: 'business-strategy', requiredAnswer: 2 }
      ],
      options: [
        {
          value: 1,
          label: 'Basic',
          description: 'Exploratory AI adoption',
          recommendations: [
            'Implement use case analysis',
            'Develop adoption roadmap',
            'Create pilot program'
          ],
          estimatedCost: { min: 100000, max: 200000, currency: 'USD' }
        },
        {
          value: 4,
          label: 'Advanced',
          description: 'Strategic AI transformation',
          recommendations: [
            'Implement transformation program',
            'Develop industry solutions',
            'Create competitive advantage'
          ],
          estimatedCost: { min: 400000, max: 800000, currency: 'USD' }
        }
      ]
    }
  ]
};

// Follow-up questions based on maturity level
const maturityBasedQuestions: AssessmentQuestion[] = [
  {
    id: 'advanced-data-integration',
    domain: 'data_infrastructure',
    text: 'How advanced is your data integration and processing pipeline?',
    weight: {
      baseWeight: 1.8,
      industry: baseWeights.industry,
      companySize: baseWeights.companySize
    },
    dependencies: [
      { questionId: 'data-storage', requiredAnswer: 3 }
    ],
    options: [
      {
        value: 1,
        label: 'Basic Pipeline',
        description: 'Basic ETL processes with limited automation',
        recommendations: [
          'Implement automated pipelines',
          'Develop data validation',
          'Create monitoring system'
        ],
        estimatedCost: { min: 150000, max: 300000, currency: 'USD' }
      },
      {
        value: 4,
        label: 'Advanced Pipeline',
        description: 'Fully automated data pipeline with real-time processing',
        recommendations: [
          'Implement streaming analytics',
          'Develop advanced integration',
          'Create self-healing pipelines'
        ],
        estimatedCost: { min: 600000, max: 1200000, currency: 'USD' }
      }
    ]
  },
  {
    id: 'mlops-practices',
    domain: 'technical_infrastructure',
    text: 'How mature are your MLOps practices and tools?',
    weight: {
      baseWeight: 1.9,
      industry: baseWeights.industry,
      companySize: baseWeights.companySize
    },
    dependencies: [
      { questionId: 'technical-infrastructure', requiredAnswer: 3 }
    ],
    options: [
      {
        value: 1,
        label: 'Basic MLOps',
        description: 'Manual deployment and monitoring',
        recommendations: [
          'Implement CI/CD for ML',
          'Develop model monitoring',
          'Create automated testing'
        ],
        estimatedCost: { min: 200000, max: 400000, currency: 'USD' }
      },
      {
        value: 4,
        label: 'Advanced MLOps',
        description: 'Fully automated ML lifecycle',
        recommendations: [
          'Implement advanced orchestration',
          'Develop automated retraining',
          'Create advanced monitoring'
        ],
        estimatedCost: { min: 800000, max: 1600000, currency: 'USD' }
      }
    ]
  }
];

// Export the combined question bank
export const questionBank: AssessmentQuestion[] = [
  ...baseQuestions,
  ...maturityBasedQuestions
];

export const getQuestionsForOrganization = (
  industry: Industry,
  companySize: CompanySize,
  previousAnswers: Record<string, number>
): AssessmentQuestion[] => {
  // Get industry-specific questions
  const industryQuestions = industrySpecificQuestions[industry] || [];
  
  // Combine all questions
  const allQuestions = [...questionBank, ...industryQuestions];

  return allQuestions
    .filter(question => {
      // Check industry-specific questions
      if (question.industry && !question.industry.includes(industry)) {
        return false;
      }

      // Check company size restrictions
      if (question.companySize && !question.companySize.includes(companySize)) {
        return false;
      }

      // Check dependencies
      if (question.dependencies) {
        return question.dependencies.every(dep => 
          previousAnswers[dep.questionId] === dep.requiredAnswer
        );
      }

      return true;
    })
    .map(question => ({
      ...question,
      weight: {
        ...question.weight,
        // Adjust weights based on industry and company size
        baseWeight: question.weight.baseWeight * 
          question.weight.industry[industry] * 
          question.weight.companySize[companySize]
      }
    }));
};

export const calculateMaturityLevel = (score: number): MaturityLevel => {
  if (score >= 90) return 'optimizing';
  if (score >= 75) return 'managed';
  if (score >= 60) return 'defined';
  if (score >= 45) return 'developing';
  return 'initial';
}; 