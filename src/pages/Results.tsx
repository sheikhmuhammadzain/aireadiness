import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAssessmentStore } from '@/store/assessment';
import { CheckCircle2, AlertTriangle, XCircle, DollarSign, Clock, TrendingUp, Target } from 'lucide-react';
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
  if (score >= 80) return <CheckCircle2 className="w-8 h-8 text-green-500" />;
  if (score >= 60) return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
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
    score: data.percentage,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="domain" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const CostPieChart = ({ costs }: { costs: any }) => {
  if (!costs) return null;

  const data = [
    { name: 'Infrastructure', value: costs.infrastructure },
    { name: 'Training', value: costs.training },
    { name: 'Implementation', value: costs.implementation },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const BenchmarkBarChart = ({ score, industryAverage }: { score: number; industryAverage: number }) => {
  const data = [
    { name: 'Your Score', value: score },
    { name: 'Industry Average', value: industryAverage },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const TimelineChart = ({ minimum, maximum }: { minimum: number; maximum: number }) => {
  const data = Array.from({ length: maximum + 1 }, (_, i) => ({
    month: i,
    progress: i <= minimum ? 100 : i <= maximum ? 60 : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" label={{ value: 'Months', position: 'bottom' }} />
        <YAxis domain={[0, 100]} label={{ value: 'Implementation Progress (%)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const Results = () => {
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
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">AI Readiness Assessment Results</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of your organization's AI readiness with actionable insights
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Overall Readiness Score
                </CardTitle>
                <CardDescription>Your organization's AI readiness level</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4">
                  {scoreIcon}
                  <span className={`text-5xl font-bold ${scoreColor}`}>
                    {result.totalScore}%
                  </span>
                </div>
                <Progress value={result.totalScore} className="h-2 w-full" />
                <div className="mt-4 text-sm text-muted-foreground text-center">
                  Your score is {result.benchmarkComparison?.percentileRank}th percentile
                  compared to industry average of {result.benchmarkComparison?.industryAverage}%
                </div>
                <div className="mt-8 w-full">
                  <BenchmarkBarChart 
                    score={result.totalScore} 
                    industryAverage={result.benchmarkComparison?.industryAverage || 0} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Implementation Timeline
                </CardTitle>
                <CardDescription>Estimated time to achieve AI readiness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Minimum Timeline</span>
                    <span className="font-semibold">{result.implementationTimeframe.minimum} months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maximum Timeline</span>
                    <span className="font-semibold">{result.implementationTimeframe.maximum} months</span>
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

        <TabsContent value="details">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Domain Analysis
                </CardTitle>
                <CardDescription>Radar view of assessment domains</CardDescription>
              </CardHeader>
              <CardContent>
                <RadarChartComponent domainScores={result.domainScores} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Scores</CardTitle>
                <CardDescription>Breakdown by assessment domain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(result.domainScores).map(([domain, data]) => (
                    <div key={domain} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{formatDomainName(domain)}</h4>
                          <p className="text-sm text-muted-foreground">
                            Maturity Level: {data.maturityLevel}
                          </p>
                        </div>
                        <span className={`font-bold ${getScoreColor(data.percentage)}`}>
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
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Cost Distribution
                </CardTitle>
                <CardDescription>Breakdown of estimated costs</CardDescription>
              </CardHeader>
              <CardContent>
                <CostPieChart costs={result.estimatedCosts} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Costs</CardTitle>
                <CardDescription>Investment requirements by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Infrastructure</h4>
                      <p className="text-2xl font-bold">
                        {formatCurrency(result.estimatedCosts.infrastructure)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Data and computing infrastructure
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Training</h4>
                      <p className="text-2xl font-bold">
                        {formatCurrency(result.estimatedCosts.training)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Team training and skill development
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Implementation</h4>
                      <p className="text-2xl font-bold">
                        {formatCurrency(result.estimatedCosts.implementation)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Project implementation and integration
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Total Estimated Investment</h4>
                        <p className="text-sm text-muted-foreground">
                          Total cost over {result.implementationTimeframe.maximum} months
                        </p>
                      </div>
                      <p className="text-3xl font-bold">
                        {formatCurrency(result.estimatedCosts.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-6">
            {Object.entries(result.domainScores).map(([domain, data]) => (
              <Card key={domain}>
                <CardHeader>
                  <CardTitle>{formatDomainName(domain)}</CardTitle>
                  <CardDescription>
                    Maturity Level: {data.maturityLevel} ({data.percentage}%)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {data.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium">{index + 1}</span>
                        </div>
                        <span className="text-muted-foreground">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
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