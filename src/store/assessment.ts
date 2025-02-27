import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  AssessmentQuestion, 
  OrganizationProfile, 
  AssessmentResult,
  Domain,
  MaturityLevel,
  Industry,
  CompanySize
} from '@/types/assessment'
import { questionBank, getQuestionsForOrganization, calculateMaturityLevel } from '@/data/questionBank'

interface CategoryScore {
  score: number
  maxScore: number
  percentage: number
  recommendations: string[]
  maturityLevel: 'Basic' | 'Developing' | 'Advanced' | 'Optimized'
}

interface AssessmentState {
  organizationProfile: OrganizationProfile | null
  currentQuestionIndex: number
  answers: Record<string, number>
  questions: AssessmentQuestion[]
  isComplete: boolean
  result: AssessmentResult | null
  
  // Actions
  setOrganizationProfile: (profile: OrganizationProfile) => void
  setAnswer: (questionId: string, value: number) => void
  nextQuestion: () => void
  previousQuestion: () => void
  calculateResults: () => void
  resetAssessment: () => void
}

const calculateDomainScore = (
  domain: Domain,
  answers: Record<string, number>,
  questions: AssessmentQuestion[],
  profile: OrganizationProfile
): number => {
  const domainQuestions = questions.filter(q => q.domain === domain)
  if (domainQuestions.length === 0) return 0

  const totalWeight = domainQuestions.reduce((sum, q) => sum + q.weight.baseWeight, 0)
  const weightedScore = domainQuestions.reduce((sum, question) => {
    const answer = answers[question.id] || 0
    const weight = question.weight.baseWeight * 
      question.weight.industry[profile.industry] * 
      question.weight.companySize[profile.companySize]
    return sum + (answer * weight)
  }, 0)

  return (weightedScore / (totalWeight * 4)) * 100
}

const generateBenchmarks = (
  score: number,
  domain: Domain,
  profile: OrganizationProfile
) => {
  // In a real application, these would come from a database of anonymized results
  return {
    industryAverage: 65,
    percentileRank: score >= 65 ? 75 : 25,
    similarCompanies: 70
  }
}

const generateRecommendations = (
  domain: Domain,
  score: number,
  answers: Record<string, number>,
  questions: AssessmentQuestion[]
): string[] => {
  const recommendations: string[] = [];
  questions
    .filter(q => q.domain === domain)
    .forEach(question => {
      const answerIndex = answers[question.id];
      if (answerIndex && question.options[answerIndex - 1]) {
        const option = question.options[answerIndex - 1];
        if (option && option.recommendations && Array.isArray(option.recommendations)) {
          recommendations.push(...option.recommendations);
        }
      }
    });
  
  // Add default recommendations if none were found
  if (recommendations.length === 0) {
    switch (domain) {
      case 'data_infrastructure':
        recommendations.push('Consider implementing a centralized data storage solution');
        break;
      case 'talent_capability':
        recommendations.push('Invest in AI and data science training for your team');
        break;
      case 'ethics_governance':
        recommendations.push('Develop AI ethics guidelines and governance frameworks');
        break;
      case 'technical_infrastructure':
        recommendations.push('Evaluate and upgrade computing resources for AI workloads');
        break;
      case 'business_strategy':
        recommendations.push('Align AI initiatives with business objectives');
        break;
      case 'data_quality':
        recommendations.push('Implement data quality assessment and improvement processes');
        break;
      case 'security_compliance':
        recommendations.push('Review and enhance data security measures');
        break;
    }
  }
  
  return recommendations;
}

const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      organizationProfile: null,
      currentQuestionIndex: 0,
      answers: {},
      questions: [],
      isComplete: false,
      result: null,

      setOrganizationProfile: (profile: OrganizationProfile) => {
        const questions = getQuestionsForOrganization(
          profile.industry,
          profile.companySize,
          {}
        )
        set({ 
          organizationProfile: profile,
          questions,
          currentQuestionIndex: 0,
          answers: {},
          isComplete: false,
          result: null
        })
      },

      setAnswer: (questionId: string, value: number) => {
        const { answers, organizationProfile, questions } = get()
        const newAnswers = { ...answers, [questionId]: value }
        
        // Get next set of questions based on new answers
        const updatedQuestions = organizationProfile 
          ? getQuestionsForOrganization(
              organizationProfile.industry,
              organizationProfile.companySize,
              newAnswers
            )
          : questions

        set({ 
          answers: newAnswers,
          questions: updatedQuestions
        })
      },

      nextQuestion: () => {
        const { currentQuestionIndex, questions, answers } = get()
        
        // Only mark as complete if we've answered all questions
        const allQuestionsAnswered = questions.every(q => answers[q.id])
        const isLastQuestion = currentQuestionIndex === questions.length - 1

        if (isLastQuestion && allQuestionsAnswered) {
          set({ isComplete: true })
          get().calculateResults()
        } else if (currentQuestionIndex < questions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 })
        }
      },

      previousQuestion: () => {
        set((state) => ({
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
        }))
      },

      calculateResults: () => {
        const { answers, questions, organizationProfile } = get()
        if (!organizationProfile) return

        // Calculate domain scores
        const domainScores: Record<Domain, any> = {} as Record<Domain, any>
        const domains = [...new Set(questions.map(q => q.domain))]

        domains.forEach(domain => {
          const score = calculateDomainScore(domain, answers, questions, organizationProfile)
          const benchmarks = generateBenchmarks(score, domain, organizationProfile)
          const recommendations = generateRecommendations(domain, score, answers, questions)

          domainScores[domain] = {
            score,
            maxScore: 100,
            percentage: score,
            maturityLevel: calculateMaturityLevel(score),
            recommendations,
            benchmarks
          }
        })

        // Calculate total score
        const totalScore = Math.round(
          Object.values(domainScores).reduce((sum, domain) => sum + domain.percentage, 0) / 
          Object.keys(domainScores).length
        )

        // Calculate costs with safety checks
        const estimatedCosts = {
          infrastructure: 0,
          training: 0,
          implementation: 0,
          total: 0,
          roi: {
            optimistic: 2.5,
            conservative: 1.5,
            timeframe: 24
          }
        }

        questions.forEach(question => {
          const answerIndex = answers[question.id]
          if (answerIndex && question.options[answerIndex - 1]) {
            const option = question.options[answerIndex - 1]
            if (option?.estimatedCost) {
              const avgCost = (option.estimatedCost.min + option.estimatedCost.max) / 2
              estimatedCosts.total += avgCost

              switch (question.domain) {
                case 'data_infrastructure':
                case 'technical_infrastructure':
                  estimatedCosts.infrastructure += avgCost
                  break
                case 'talent_capability':
                  estimatedCosts.training += avgCost
                  break
                default:
                  estimatedCosts.implementation += avgCost
              }
            }
          }
        })

        const result: AssessmentResult = {
          totalScore,
          maturityLevel: calculateMaturityLevel(totalScore),
          domainScores,
          benchmarkComparison: {
            industryAverage: 65,
            percentileRank: totalScore >= 65 ? 75 : 25,
            similarCompanies: {
              average: 70,
              count: 50
            }
          },
          estimatedCosts,
          implementationTimeframe: {
            minimum: totalScore >= 80 ? 6 : totalScore >= 60 ? 12 : 18,
            maximum: totalScore >= 80 ? 12 : totalScore >= 60 ? 18 : 36,
            unit: 'months',
            milestones: [
              {
                month: 3,
                description: 'Initial Assessment and Planning',
                domain: 'business_strategy'
              },
              {
                month: 6,
                description: 'Infrastructure Setup',
                domain: 'technical_infrastructure'
              },
              {
                month: 9,
                description: 'Data Integration',
                domain: 'data_infrastructure'
              },
              {
                month: 12,
                description: 'Team Training',
                domain: 'talent_capability'
              }
            ]
          },
          recommendations: Object.entries(domainScores).flatMap(([domain, data]) => 
            data.recommendations.map((rec: string, index: number) => ({
              domain: domain as Domain,
              priority: index < 2 ? 'high' : index < 4 ? 'medium' : 'low',
              timeframe: index < 2 ? 'short' : index < 4 ? 'medium' : 'long',
              description: rec,
              estimatedCost: Math.round(estimatedCosts.total * (0.1 / data.recommendations.length)),
              expectedImpact: Math.round(70 + Math.random() * 20)
            }))
          )
        }

        set({ result })
      },

      resetAssessment: () => {
        set({
          organizationProfile: null,
          currentQuestionIndex: 0,
          answers: {},
          questions: [],
          isComplete: false,
          result: null
        })
      }
    }),
    {
      name: 'ai-readiness-assessment',
      partialize: (state) => ({
        organizationProfile: state.organizationProfile,
        answers: state.answers,
        isComplete: state.isComplete,
        result: state.result
      })
    }
  )
) 

export default useAssessmentStore;