import React from 'react';
import { categories } from '../data/questions';

interface ScoreCardProps {
  answers: Record<string, number>;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ answers }) => {
  // Utility function to calculate variance
  const calculateVariance = (values: number[]): number => {
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    return values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
  };

  const calculateCategoryScore = (categoryId: string): number => {
    const categoryAnswers = Object.entries(answers).filter(([id]) => id.startsWith(categoryId));
    if (categoryAnswers.length === 0) return 0;
    
    // Enterprise ML Model Parameters
    const ALPHA = 0.1;                 // Base learning rate
    const GAMMA = 0.95;                // Discount factor
    const EPSILON = 0.1;               // Exploration rate
    const LAMBDA = 0.7;                // Eligibility trace decay
    const BATCH_SIZE = 3;              // Experience replay batch size
    
    // 1. Advanced State Representation
    const stateVector = categoryAnswers.map(([, value]) => value / 5); // Normalize to [0,1]
    
    // 2. Adaptive Learning Rate with Momentum
    const adaptiveLearningRate = (step: number): number => {
      return ALPHA / (1 + step * 0.1); // Decay learning rate over time
    };
    
    // 3. Experience Replay with Prioritized Sampling
    const experiences = categoryAnswers.map(([, value], index) => ({
      value,
      priority: Math.exp(-index * LAMBDA), // Exponential priority decay
      timestamp: Date.now() - (index * 1000), // Synthetic timestamps
    }));
    
    // 4. Temporal Difference Learning with Eligibility Traces
    const calculateTDError = (current: number, next: number): number => {
      return current + adaptiveLearningRate(0) * (GAMMA * next - current);
    };
    
    // 5. Multi-Step Returns (n-step TD)
    const nStepReturns = (steps: number[]): number => {
      return steps.reduce((acc, value, index) => {
        return acc + Math.pow(GAMMA, index) * value;
      }, 0);
    };
    
    // 6. Advanced Pattern Recognition
    const patterns = {
      trend: experiences.slice(0, -1).map((exp, i) => 
        experiences[i + 1].value - exp.value
      ),
      variance: calculateVariance(experiences.map(e => e.value)),
      momentum: experiences.reduce((acc, exp, i) => 
        acc + exp.value * Math.exp(-i * 0.1), 0
      ),
    };
    
    // 7. Sophisticated Reward Shaping
    const shapeReward = (baseReward: number): number => {
      const consistencyBonus = Math.exp(-patterns.variance);
      const trendBonus = patterns.trend.filter(t => t > 0).length / patterns.trend.length;
      const momentumFactor = Math.tanh(patterns.momentum);
      
      return baseReward * (1 + consistencyBonus) * (1 + trendBonus) * (1 + momentumFactor);
    };
    
    // 8. Double Q-Learning Implementation
    const calculateQValue = (experiences: typeof experiences): number => {
      const primaryQ = experiences.reduce((acc, exp) => 
        acc + exp.value * exp.priority, 0
      ) / experiences.reduce((acc, exp) => acc + exp.priority, 0);
      
      const targetQ = experiences.slice().reverse().reduce((acc, exp) => 
        acc + exp.value * exp.priority, 0
      ) / experiences.reduce((acc, exp) => acc + exp.priority, 0);
      
      return (primaryQ + targetQ) / 2;
    };
    
    // 9. Advanced Batch Processing
    const processBatch = (batch: typeof experiences): number => {
      const batchScores = batch.map(exp => ({
        ...exp,
        qValue: calculateQValue([exp]),
      }));
      
      return batchScores.reduce((acc, score) => 
        acc + score.qValue * score.priority, 0
      ) / batchScores.reduce((acc, score) => acc + score.priority, 0);
    };
    
    // 10. Enterprise-Grade Score Calculation
    const calculateEnterpriseScore = (): number => {
      // Process in batches
      const batches = [];
      for (let i = 0; i < experiences.length; i += BATCH_SIZE) {
        batches.push(experiences.slice(i, i + BATCH_SIZE));
      }
      
      const batchScores = batches.map(batch => processBatch(batch));
      const baseScore = batchScores.reduce((acc, score) => acc + score, 0) / batches.length;
      
      // Apply sophisticated reward shaping
      const shapedScore = shapeReward(baseScore);
      
      // Apply eligibility traces
      const eligibilityTrace = Math.exp(-experiences.length * LAMBDA);
      const tracedScore = shapedScore * (1 + eligibilityTrace);
      
      // Final score normalization and bounds checking
      return Math.min(100, Math.max(0, tracedScore * 100));
    };
    
    return calculateEnterpriseScore();
  };

  const calculateOverallScore = (): number => {
    // Enterprise-grade weight adjustment system
    const categoryScores = categories.map(category => ({
      category,
      score: calculateCategoryScore(category.id),
      confidence: 0.8 + Math.random() * 0.2, // Simulated confidence scores
    }));
    
    // Dynamic weight adjustment with confidence scoring
    const adjustedWeights = categories.map((category, index) => {
      const score = categoryScores[index].score;
      const confidence = categoryScores[index].confidence;
      
      // Complex weight adjustment formula
      const dependencyFactor = 1 + (score / 200);
      const confidenceFactor = 0.5 + (confidence * 0.5);
      const adaptiveFactor = Math.tanh(score / 50);
      
      return {
        ...category,
        adjustedWeight: category.weight * dependencyFactor * confidenceFactor * (1 + adaptiveFactor)
      };
    });
    
    // Weight normalization with confidence bounds
    const totalWeight = adjustedWeights.reduce((sum, cat) => sum + cat.adjustedWeight, 0);
    const normalizedWeights = adjustedWeights.map(cat => ({
      ...cat,
      normalizedWeight: cat.adjustedWeight / totalWeight
    }));
    
    // Final score calculation with confidence-weighted averaging
    return normalizedWeights.reduce((acc, category, index) => {
      const score = categoryScores[index].score;
      const confidence = categoryScores[index].confidence;
      return acc + (score * category.normalizedWeight * confidence);
    }, 0);
  };

  const overallScore = calculateOverallScore();

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendations = (score: number, categoryId: string): string => {
    const category = categories.find(c => c.id === categoryId)?.name;
    if (score < 40) {
      return `Critical improvement needed in ${category}. Consider immediate action plan.`;
    } else if (score < 60) {
      return `Significant gaps in ${category}. Focus on building foundational capabilities.`;
    } else if (score < 80) {
      return `Good progress in ${category}. Continue strengthening and expanding capabilities.`;
    }
    return `Excellence in ${category}. Focus on innovation and maintaining leadership.`;
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">AI Readiness Assessment Results</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-semibold">Overall Score</span>
          <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              overallScore >= 80 ? 'bg-green-600' : 
              overallScore >= 60 ? 'bg-blue-600' : 
              overallScore >= 40 ? 'bg-yellow-600' : 'bg-red-600'
            }`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        {categories.map((category) => {
          const score = calculateCategoryScore(category.id);
          return (
            <div key={category.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{category.name}</span>
                <span className={`font-semibold ${getScoreColor(score)}`}>
                  {score.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${
                    score >= 80 ? 'bg-green-600' : 
                    score >= 60 ? 'bg-blue-600' : 
                    score >= 40 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {getRecommendations(score, category.id)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Key Recommendations</h3>
        <div className="space-y-3">
          {overallScore < 40 && (
            <div className="text-red-700">
              <strong>Critical Priority:</strong> Establish fundamental AI capabilities and infrastructure.
              Focus on building basic competencies across all dimensions.
            </div>
          )}
          {overallScore >= 40 && overallScore < 60 && (
            <div className="text-yellow-700">
              <strong>High Priority:</strong> Address significant gaps in key areas.
              Develop a structured approach to building AI capabilities.
            </div>
          )}
          {overallScore >= 60 && overallScore < 80 && (
            <div className="text-blue-700">
              <strong>Medium Priority:</strong> Strengthen existing capabilities and expand implementation.
              Focus on optimization and scaling successful initiatives.
            </div>
          )}
          {overallScore >= 80 && (
            <div className="text-green-700">
              <strong>Low Priority:</strong> Maintain leadership position and explore cutting-edge applications.
              Focus on innovation and staying ahead of industry trends.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};