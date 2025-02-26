import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Database, Shield, Users, BarChart2, Lock, Workflow } from 'lucide-react';

interface PracticeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  practices: string[];
}

const PracticeCard: React.FC<PracticeCardProps> = ({ icon, title, description, practices }) => (
  <Card className="h-full">
    <CardHeader>
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {practices.map((practice, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-medium">{index + 1}</span>
            </div>
            <span className="text-sm text-muted-foreground">{practice}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export const BestPractices = () => {
  const practices = [
    {
      icon: <Database className="h-5 w-5" />,
      title: "Data Management",
      description: "Best practices for managing and preparing data for AI implementation",
      practices: [
        "Implement robust data governance frameworks",
        "Ensure data quality and consistency across sources",
        "Establish clear data ownership and access controls",
        "Regular data audits and cleaning processes",
        "Maintain comprehensive data documentation"
      ]
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI Model Development",
      description: "Guidelines for developing and deploying AI models",
      practices: [
        "Follow MLOps best practices for model lifecycle",
        "Implement proper version control for models",
        "Regular model performance monitoring",
        "Establish clear model validation processes",
        "Document model architecture and decisions"
      ]
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Security & Compliance",
      description: "Security considerations for AI implementations",
      practices: [
        "Regular security audits of AI systems",
        "Implement proper access controls",
        "Monitor for potential vulnerabilities",
        "Maintain compliance documentation",
        "Regular security training for team members"
      ]
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Team Organization",
      description: "Structuring teams for AI implementation success",
      practices: [
        "Clear roles and responsibilities",
        "Regular skill development programs",
        "Establish communication protocols",
        "Cross-functional team collaboration",
        "Regular knowledge sharing sessions"
      ]
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: "Performance Monitoring",
      description: "Tracking and improving AI system performance",
      practices: [
        "Establish clear KPIs and metrics",
        "Regular performance reviews",
        "Automated monitoring systems",
        "Incident response procedures",
        "Continuous improvement processes"
      ]
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Ethics & Governance",
      description: "Ensuring responsible AI implementation",
      practices: [
        "Establish AI ethics guidelines",
        "Regular bias assessments",
        "Transparent decision-making processes",
        "Stakeholder engagement protocols",
        "Impact assessment frameworks"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          AI Implementation Best Practices
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive guidelines and recommendations for successful AI implementation in your organization
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {practices.map((practice, index) => (
          <PracticeCard key={index} {...practice} />
        ))}
      </div>
    </div>
  );
}; 