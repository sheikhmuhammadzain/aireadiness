import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, Code, FileText, Settings, HelpCircle } from 'lucide-react';

interface DocSectionProps {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

const DocSection: React.FC<DocSectionProps> = ({ title, description, content, tags }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="prose prose-sm max-w-none">
        <p className="text-muted-foreground">{content}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const gettingStartedDocs = [
    {
      title: "Quick Start Guide",
      description: "Get up and running with the AI Readiness Assessment tool",
      content: "Follow these steps to begin your AI readiness journey: 1. Create an organization profile, 2. Complete the assessment questionnaire, 3. Review your results and recommendations.",
      tags: ["getting-started", "guide", "basics"]
    },
    {
      title: "Assessment Process",
      description: "Understanding the assessment methodology",
      content: "Our assessment process evaluates seven key domains of AI readiness, providing a comprehensive view of your organization's capabilities and areas for improvement.",
      tags: ["methodology", "process", "evaluation"]
    }
  ];

  const technicalDocs = [
    {
      title: "API Documentation",
      description: "Technical details for system integration",
      content: "Our REST API provides endpoints for assessment data, results analysis, and recommendation generation. Use standard HTTP methods for interaction.",
      tags: ["api", "integration", "technical"]
    },
    {
      title: "Data Models",
      description: "Understanding the data structure",
      content: "The assessment framework uses standardized data models for organization profiles, assessment responses, and results calculation.",
      tags: ["data", "models", "structure"]
    }
  ];

  const faqDocs = [
    {
      title: "Common Questions",
      description: "Frequently asked questions about the assessment",
      content: "Find answers to common questions about assessment timing, result interpretation, and implementation recommendations.",
      tags: ["faq", "help", "support"]
    },
    {
      title: "Troubleshooting",
      description: "Solutions to common issues",
      content: "Address common technical issues and questions about the assessment process and results interpretation.",
      tags: ["troubleshooting", "support", "help"]
    }
  ];

  const filterDocs = (docs: typeof gettingStartedDocs) => {
    if (!searchQuery) return docs;
    const query = searchQuery.toLowerCase();
    return docs.filter(doc => 
      doc.title.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query) ||
      doc.content.toLowerCase().includes(query) ||
      doc.tags.some(tag => tag.toLowerCase().includes(query))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive guides and documentation for the AI Readiness Assessment platform
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="getting-started">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="getting-started">
              <Book className="h-4 w-4 mr-2" />
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="technical">
              <Code className="h-4 w-4 mr-2" />
              Technical Guide
            </TabsTrigger>
            <TabsTrigger value="faq">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="mt-6">
            {filterDocs(gettingStartedDocs).map((doc, index) => (
              <DocSection key={index} {...doc} />
            ))}
          </TabsContent>

          <TabsContent value="technical" className="mt-6">
            {filterDocs(technicalDocs).map((doc, index) => (
              <DocSection key={index} {...doc} />
            ))}
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            {filterDocs(faqDocs).map((doc, index) => (
              <DocSection key={index} {...doc} />
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Button>Contact Support</Button>
        </div>
      </div>
    </div>
  );
}; 