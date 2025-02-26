import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAssessmentStore } from '@/store/assessment';
import { ArrowRight, BarChart2, Brain, Database, Lock, Shield, Users } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const { resetAssessment } = useAssessmentStore();

  const handleStartAssessment = () => {
    resetAssessment();
    navigate('/profile');
  };

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-20 pb-8 sm:pb-12 md:pb-16">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-background"></div>
        </div>
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center space-y-6 sm:space-y-8 text-center">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter">
                Assess Your Organization's
                <span className="text-primary block mt-1 sm:mt-2">AI Readiness</span>
              </h1>
              <p className="mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
                Get a comprehensive analysis of your organization's readiness to adopt and implement AI solutions.
                Receive personalized recommendations and actionable insights tailored to your industry.
              </p>
            </div>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full justify-center max-w-md">
              <Button size="lg" className="gap-2 w-full xs:w-auto" onClick={handleStartAssessment}>
                Start Assessment <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full xs:w-auto" onClick={() => navigate('/about')}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid gap-8 sm:gap-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Comprehensive Assessment Framework</h2>
            <p className="mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground">
              Our AI readiness assessment covers all critical aspects of successful AI implementation
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Database className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />}
              title="Data Infrastructure"
              description="Evaluate your data storage, processing capabilities, and infrastructure readiness for AI implementation."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />}
              title="Talent Capability"
              description="Assess your team's AI expertise and identify skill gaps for successful AI adoption."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />}
              title="Security & Compliance"
              description="Ensure your AI initiatives meet industry standards and regulatory requirements."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />}
              title="Technical Infrastructure"
              description="Evaluate your computing resources and technical capabilities for AI workloads."
            />
            <FeatureCard
              icon={<BarChart2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />}
              title="Business Strategy"
              description="Align AI initiatives with your business goals and measure potential ROI."
            />
            <FeatureCard
              icon={<Lock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />}
              title="Ethics & Governance"
              description="Establish responsible AI practices and governance frameworks."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="rounded-xl sm:rounded-2xl bg-muted/50 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 space-y-8 sm:space-y-10 md:space-y-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">How It Works</h2>
            <p className="mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl text-sm sm:text-base md:text-lg text-muted-foreground">
              Four simple steps to assess and improve your organization's AI readiness
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number={1}
              title="Organization Profile"
              description="Tell us about your organization and industry"
            />
            <StepCard
              number={2}
              title="Take Assessment"
              description="Complete our tailored assessment questionnaire"
            />
            <StepCard
              number={3}
              title="Get Analysis"
              description="Receive detailed analysis and benchmarking"
            />
            <StepCard
              number={4}
              title="Take Action"
              description="Follow recommendations and track progress"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="rounded-xl sm:rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 text-center space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            Ready to Start Your AI Journey?
          </h2>
          <p className="mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl text-sm sm:text-base md:text-lg text-primary-foreground/80">
            Begin your AI readiness assessment today and take the first step towards successful AI implementation.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2 w-full xs:w-auto"
            onClick={handleStartAssessment}
          >
            Start Free Assessment <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="group relative overflow-hidden rounded-lg border p-4 sm:p-5 md:p-6 hover:border-primary/50 transition-colors h-full">
    <div className="space-y-3 sm:space-y-4">
      <div className="bg-primary/10 inline-block rounded-lg p-2 sm:p-3 text-primary">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
    </div>
  </div>
);

const StepCard = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 h-full">
    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg sm:text-xl font-semibold">
      {number}
    </div>
    <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
    <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
  </div>
);