import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAssessmentStore } from '@/store/assessment';

export const Home = () => {
  const navigate = useNavigate();
  const { resetAssessment } = useAssessmentStore();

  const handleStartAssessment = () => {
    resetAssessment();
    navigate('/profile');
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Assess Your Organization's
          <span className="text-primary block mt-2">AI Readiness</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Get a comprehensive analysis of your organization's readiness to adopt and implement AI solutions.
          Receive personalized recommendations and actionable insights tailored to your industry.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={handleStartAssessment}>Start Assessment</Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/about')}>Learn More</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Industry-Specific Analysis</h3>
          <p className="text-muted-foreground">
            Receive insights and recommendations tailored to your industry's unique challenges and requirements.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Comprehensive Assessment</h3>
          <p className="text-muted-foreground">
            Evaluate key areas including technical infrastructure, data readiness, 
            skills and expertise, and organizational culture.
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Actionable Insights</h3>
          <p className="text-muted-foreground">
            Get detailed recommendations, implementation timelines, and cost estimates
            for your AI transformation journey.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-accent/50 p-12 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">1</div>
            <h4 className="font-semibold mb-2">Organization Profile</h4>
            <p className="text-sm text-muted-foreground">Tell us about your organization and industry</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">2</div>
            <h4 className="font-semibold mb-2">Take Assessment</h4>
            <p className="text-sm text-muted-foreground">Complete our tailored assessment questionnaire</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">3</div>
            <h4 className="font-semibold mb-2">Get Analysis</h4>
            <p className="text-sm text-muted-foreground">Receive detailed analysis and benchmarking</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">4</div>
            <h4 className="font-semibold mb-2">Take Action</h4>
            <p className="text-sm text-muted-foreground">Follow recommendations and track progress</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Begin your AI readiness assessment today and take the first step towards successful AI implementation.
        </p>
        <Button size="lg" onClick={handleStartAssessment}>Start Free Assessment</Button>
      </section>
    </div>
  );
}; 