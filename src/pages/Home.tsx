import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useAssessmentStore from '@/store/assessment';
import { ArrowRight, ChartBar, Brain, Database, LockSimple, Shield, Users } from '@phosphor-icons/react';

const Home = () => {
  const navigate = useNavigate();
  const { resetAssessment } = useAssessmentStore();

  const handleStartAssessment = () => {
    resetAssessment();
    navigate('/profile');
  };

  return (
    <div className="space-y-16 md:space-y-24 lg:space-y-32 pb-16 md:pb-24">
      {/* Hero Section */}
      <section className="relative py-10 md:py-10 lg:py-10 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/40 to-background/60"></div>
        </div>
        <div className="container px-6 md:px-8 mx-auto max-w-6xl">
          <div className="flex flex-col items-center space-y-8 md:space-y-10 text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
              Enterprise AI Assessment Solution
            </div>
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Assess Your Organization's
                <span className="text-primary block mt-2 md:mt-3">AI Readiness</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300">
                Get a comprehensive analysis of your organization's readiness to adopt and implement AI solutions.
                Receive personalized recommendations and actionable insights tailored to your industry.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
              <Button size="lg" className="gap-2 w-full sm:w-auto h-12 text-base font-medium" onClick={handleStartAssessment}>
                Start Assessment <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 text-base font-medium" onClick={() => navigate('/about')}>
                Learn More
              </Button>
            </div>
            <div className="pt-8 md:pt-12 w-full max-w-4xl">
              <div className="relative aspect-video overflow-hidden rounded-xl border shadow-lg">
                <video 
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                  controls
                  preload="none"
                >
                  <source src="https://videos.ctfassets.net/wl95ljfippl8/4YmxZ4srCnNTa16zxvTYZn/eece59fd2e912cfb74e9fa52c977a6fb/calm_office_business_unsplash.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/30 transition-all cursor-pointer group">
                  <div className="text-center p-6 group-hover:scale-110 transition-transform">
                    <div className="rounded-full h-16 w-16 flex items-center justify-center bg-primary/90 text-white mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                    <p className="mt-4 text-lg font-medium text-white">Watch Demo Video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="container px-6 md:px-8 mx-auto max-w-6xl py-8 md:py-12">
        <div className="text-center space-y-6">
          <h2 className="text-xl text-gray-600 dark:text-gray-300 font-medium">Trusted by industry leaders</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <div className="h-12">
              <img 
                src="https://static-00.iconduck.com/assets.00/google-icon-512x168-6eakzcko.png" 
                alt="Google" 
                className="h-full object-contain opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>
            <div className="h-10">
              <img 
                src="https://static.vecteezy.com/system/resources/thumbnails/019/136/319/small_2x/amazon-logo-amazon-icon-free-free-vector.jpg" 
                alt="Amazon" 
                className="h-full object-contain opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>
            <div className="h-12">
              <img 
                src="https://w7.pngwing.com/pngs/646/324/png-transparent-github-computer-icons-github-logo-monochrome-head.png" 
                alt="GitHub" 
                className="h-full object-contain opacity-80 hover:opacity-100 transition-opacity mix-blend-multiply dark:invert dark:brightness-200 dark:contrast-200 rounded-full" 
              />
            </div>
            <div className="h-10">
              <img 
                src="https://i.pcmag.com/imagery/reviews/07td46ju7p6lLVb0QGwc5VF-6.fit_scale.size_760x427.v1569479844.jpg" 
                alt="Slack" 
                className="h-full object-contain opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-6 md:px-8 mx-auto max-w-6xl py-8 md:py-16">
        <div className="grid gap-12 md:gap-16">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
              Comprehensive Framework
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Enterprise AI Readiness</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our AI readiness assessment covers all critical aspects needed for successful enterprise AI implementation
            </p>
          </div>
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Database className="h-8 w-8" />}
              title="Data Infrastructure"
              description="Evaluate your data storage, processing capabilities, and infrastructure readiness for AI implementation."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Talent Capability"
              description="Assess your team's AI expertise and identify skill gaps for successful AI adoption."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Security & Compliance"
              description="Ensure your AI initiatives meet industry standards and regulatory requirements."
            />
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Technical Infrastructure"
              description="Evaluate your computing resources and technical capabilities for AI workloads."
            />
            <FeatureCard
              icon={<ChartBar className="h-8 w-8" />}
              title="Business Strategy"
              description="Align AI initiatives with your business goals and measure potential ROI."
            />
            <FeatureCard
              icon={<LockSimple className="h-8 w-8" />}
              title="Ethics & Governance"
              description="Establish responsible AI practices and governance frameworks."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-6 md:px-8 mx-auto max-w-6xl py-8 md:py-16">
        <div className="rounded-2xl bg-gradient-to-br from-muted/80 to-muted/40 p-8 md:p-12 lg:p-16 space-y-10 md:space-y-12">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Four streamlined steps to assess and enhance your organization's enterprise AI readiness
            </p>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Testimonials */}
      <section className="container px-6 md:px-8 mx-auto max-w-6xl py-8 md:py-16">
        <div className="text-center space-y-4 md:space-y-6 mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
            Client Success
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Clients Say</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Hear from organizations that have successfully implemented AI with our assessment
          </p>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard 
            quote="The assessment gave us clear insights into our AI readiness and a roadmap for implementation."
            name="Jane Smith"
            role="CTO, Enterprise Corp"
          />
          <TestimonialCard 
            quote="We were able to identify critical gaps in our data infrastructure that would have caused issues later."
            name="David Johnson"
            role="Director of Innovation, Tech Solutions"
          />
          <TestimonialCard 
            quote="The recommendations helped us align our AI strategy with our business goals effectively."
            name="Sarah Williams"
            role="VP of Digital Transformation, Global Industries"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-6 md:px-8 mx-auto max-w-6xl py-8 md:py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-12 md:p-16 text-center space-y-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-sm font-medium">
            Get Started Today
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Transform Your Enterprise with AI?
          </h2>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/90">
            Begin your AI readiness assessment today and take the first step towards successful AI implementation.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 h-12 text-base font-medium px-8"
              onClick={handleStartAssessment}
            >
              Start Free Assessment <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-white/80 text-sm mt-6">
            No credit card required • Full enterprise assessment • Receive results instantly
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-background shadow-sm p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300 h-full">
    <div className="space-y-4">
      <div className="bg-primary/10 inline-block rounded-lg p-3 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const StepCard = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center space-y-4 h-full bg-background rounded-lg p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-semibold">
      {number}
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role }: { quote: string; name: string; role: string }) => (
  <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-background p-6 shadow-sm h-full">
    <div className="flex flex-col h-full justify-between space-y-4">
      <div className="space-y-4">
        <svg className="text-primary h-6 w-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M11.9995 14.9995H7.99951C7.99951 14.9995 7.99951 11.9995 7.99951 9.99951C7.99951 7.99951 9.99951 7.99951 9.99951 7.99951C9.99951 6.99951 9.99951 3.99951 6.99951 3.99951C6.99951 3.99951 3.99951 3.99951 3.99951 7.99951C3.99951 11.9995 3.99951 17.9995 3.99951 17.9995C3.99951 17.9995 3.99951 19.9995 5.99951 19.9995C5.99951 19.9995 17.9995 19.9995 19.9995 19.9995C19.9995 19.9995 19.9995 15.9995 19.9995 14.9995C19.9995 13.9995 18.9995 12.9995 17.9995 12.9995C16.9995 12.9995 14.9995 12.9995 13.9995 12.9995C12.9995 12.9995 11.9995 13.9995 11.9995 14.9995Z"></path></svg>
        <p className="text-lg">{quote}</p>
      </div>
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

export default Home;