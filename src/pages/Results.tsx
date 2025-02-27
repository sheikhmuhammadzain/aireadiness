import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import useAssessmentStore from '@/store/assessment';
import { CheckCircle, WarningCircle, XCircle, CurrencyDollar, Clock, ChartLineUp, Target } from '@phosphor-icons/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
};

const getScoreIcon = (score: number) => {
  if (score >= 80) return <CheckCircle className="w-8 h-8 text-green-500" />;
  if (score >= 60) return <WarningCircle className="w-8 h-8 text-yellow-500" />;
  return <XCircle className="w-8 h-8 text-red-500" />;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

const COLORS = ['#22c55e', '#eab308', '#3b82f6', '#ec4899'];

const RadarChartComponent = ({ domainScores }: { domainScores: Record<string, any> }) => {
  if (!domainScores) return null;
  
  const data = Object.entries(domainScores).map(([domain, data]) => ({
    domain: domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    score: data.percentage
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="domain" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
        <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const CostPieChart = ({ costs }: { costs: any }) => {
  if (!costs) return null;
  
  const { total, ...costCategories } = costs;
  
  // Filter out the "total" key and prepare data for the pie chart
  const data = Object.entries(costCategories).map(([name, value]) => ({
    name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    value: value as number
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value as number)} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const BenchmarkBarChart = ({ score, industryAverage }: { score: number; industryAverage: number }) => {
  if (score === undefined || industryAverage === undefined) return null;
  
  const data = [
    { name: 'Your Score', value: score },
    { name: 'Industry Average', value: industryAverage }
  ];

  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
        <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const TimelineChart = ({ minimum, maximum }: { minimum: number; maximum: number }) => {
  if (minimum === undefined || maximum === undefined) return null;
  
  const data = [
    { name: 'Optimistic', months: minimum },
    { name: 'Expected', months: Math.round((minimum + maximum) / 2) },
    { name: 'Conservative', months: maximum }
  ];

  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 5, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" tick={{ fontSize: 10 }} />
        <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} />
        <Tooltip formatter={(value) => [`${value} months`, 'Timeline']} />
        <Bar dataKey="months" fill="#10b981" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function Results() {
  const navigate = useNavigate();
  const { result, resetAssessment } = useAssessmentStore();
  
  if (!result) {
    navigate('/assessment');
    return null;
  }

  const scoreColor = getScoreColor(result.totalScore);
  const scoreIcon = getScoreIcon(result.totalScore);

  const handleStartNew = () => {
    resetAssessment();
    navigate('/assessment');
  };

  const formatDomainName = (domain: string) => {
    return domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-10">
      <div className="mb-4 sm:mb-6 lg:mb-8 text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">AI Readiness Assessment Results</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Comprehensive analysis of your organization's AI readiness with actionable insights
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6 lg:space-y-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="domains" className="text-xs sm:text-sm">Domain Analysis</TabsTrigger>
          <TabsTrigger value="costs" className="text-xs sm:text-sm">Costs</TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs sm:text-sm">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                  Overall Readiness Score
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your organization's AI readiness level</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                  {scoreIcon}
                  <span className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${scoreColor}`}>
                    {result.totalScore}%
                  </span>
                </div>
                <Progress value={result.totalScore} className="h-2 w-full" />
                <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-muted-foreground text-center">
                  Your score is {result.benchmarkComparison?.percentileRank}th percentile
                  compared to industry average of {result.benchmarkComparison?.industryAverage}%
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                  <div className="text-center">
                    <h3 className="text-xs sm:text-sm font-medium mb-2">Industry Comparison</h3>
                    <div className="h-32 w-48">
                      {result.industryAverage !== undefined && (
                        <BenchmarkBarChart score={result.totalScore} industryAverage={result.industryAverage} />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs sm:text-sm font-medium mb-2">Implementation Timeline</h3>
                    <div className="h-32 w-48">
                      {result.implementationTimeframe && result.implementationTimeframe.minimum !== undefined && 
                       result.implementationTimeframe.maximum !== undefined && (
                        <TimelineChart 
                          minimum={result.implementationTimeframe.minimum} 
                          maximum={result.implementationTimeframe.maximum} 
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  Implementation Timeline
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Estimated time to achieve AI readiness</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm">Minimum Timeline</span>
                    <span className="font-semibold text-xs sm:text-sm">{result.implementationTimeframe.minimum} months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm">Maximum Timeline</span>
                    <span className="font-semibold text-xs sm:text-sm">{result.implementationTimeframe.maximum} months</span>
                  </div>
                  <TimelineChart 
                    minimum={result.implementationTimeframe.minimum}
                    maximum={result.implementationTimeframe.maximum}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="domains">
          <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <ChartLineUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  Domain Analysis
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">How you perform across different areas</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="h-[300px] w-full">
                  {result.domainScores && <RadarChartComponent domainScores={result.domainScores} />}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Domain Scores</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Breakdown by AI readiness domain</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {result.domainScores && Object.entries(result.domainScores).map(([domain, data]) => (
                    <div key={domain} className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-xs sm:text-sm">{formatDomainName(domain)}</h4>
                          <p className="text-xs text-muted-foreground">
                            Maturity Level: {data.maturityLevel}
                          </p>
                        </div>
                        <span className={`font-bold text-xs sm:text-sm ${getScoreColor(data.percentage)}`}>
                          {data.percentage}%
                        </span>
                      </div>
                      <Progress value={data.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs">
          <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CurrencyDollar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Cost Distribution
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Breakdown of estimated costs</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {result.estimatedCosts && <CostPieChart costs={result.estimatedCosts} />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Detailed Costs</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Investment requirements by category</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {result.estimatedCosts && Object.entries(result.estimatedCosts).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center border-b pb-2 border-border last:border-0 last:pb-0">
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm">{formatDomainName(category)}</h4>
                        <p className="text-xs text-muted-foreground">{Math.round(amount / result.estimatedCosts.total * 100)}% of total</p>
                      </div>
                      <span className="font-bold text-xs sm:text-sm">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                    <h4 className="font-medium text-xs sm:text-sm">Total Estimated Cost</h4>
                    <span className="font-bold text-xs sm:text-sm">{result.estimatedCosts && formatCurrency(result.estimatedCosts.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Prioritized Recommendations</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Actions to improve your AI readiness</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {result.recommendations && result.recommendations.map((recommendation, index) => (
                    <div key={index} className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 mb-2">
                        {recommendation.priority && recommendation.priority === 'high' ? (
                          <XCircle className="text-red-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                        ) : recommendation.priority && recommendation.priority === 'medium' ? (
                          <WarningCircle className="text-amber-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base mb-1">{recommendation.title}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">{recommendation.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted">
                              {recommendation.domain ? recommendation.domain.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'General'}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${
                              recommendation.priority === 'high' 
                                ? 'bg-red-100 text-red-800' 
                                : recommendation.priority === 'medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {recommendation.priority ? recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1) : 'Low'} Priority
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted">
                              Effort: {recommendation.effort || 'Unknown'}
                            </span>
                          </div>
                          <div className="mt-2">
                            <h4 className="text-xs sm:text-sm font-medium mb-1">Implementation Steps:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                              {recommendation.steps && recommendation.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 sm:p-6">
                <Button onClick={handleStartNew} className="w-full sm:w-auto text-xs sm:text-sm">
                  Start New Assessment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => navigate('/assessment')}>
          Review Assessment
        </Button>
        <Button onClick={handleStartNew}>Start New Assessment</Button>
      </div>
    </div>
  );
}; 