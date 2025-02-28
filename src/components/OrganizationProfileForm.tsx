import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowRight, Building2, Users, DollarSign, Globe, AlertCircle } from 'lucide-react';
import useAssessmentStore from '@/store/assessment';
import { Industry, CompanySize, OrganizationProfile } from '@/types/assessment';

// Industry options with descriptions and icons (we'll display these as a better UX)
const industriesData = [
  { value: 'healthcare', label: 'Healthcare', description: 'Hospitals, clinics, medical services' },
  { value: 'finance', label: 'Finance', description: 'Banking, insurance, investment' },
  { value: 'manufacturing', label: 'Manufacturing', description: 'Production, assembly, fabrication' },
  { value: 'retail', label: 'Retail', description: 'Stores, e-commerce, consumer goods' },
  { value: 'technology', label: 'Technology', description: 'Software, hardware, IT services' },
  { value: 'other', label: 'Other', description: 'Other industry sectors' }
];

// Company size options with descriptions
const companySizesData = [
  { value: 'small', label: 'Small', description: '1-50 employees' },
  { value: 'medium', label: 'Medium', description: '51-250 employees' },
  { value: 'large', label: 'Large', description: '251-1000 employees' },
  { value: 'enterprise', label: 'Enterprise', description: '1000+ employees' }
];

// Simplified list for type checking
const industries: Industry[] = industriesData.map(item => item.value as Industry);
const companySizes: CompanySize[] = companySizesData.map(item => item.value as CompanySize);

export const OrganizationProfileForm = () => {
  const navigate = useNavigate();
  const { setOrganizationProfile } = useAssessmentStore();
  const [profile, setProfile] = useState<Partial<OrganizationProfile>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profile.industry) {
      newErrors.industry = 'Please select your industry';
    }
    
    if (!profile.companySize) {
      newErrors.companySize = 'Please select your company size';
    }
    
    if (profile.employeeCount && (isNaN(profile.employeeCount) || profile.employeeCount <= 0)) {
      newErrors.employeeCount = 'Please enter a valid number of employees';
    }
    
    if (profile.annualRevenue && (isNaN(profile.annualRevenue) || profile.annualRevenue <= 0)) {
      newErrors.annualRevenue = 'Please enter a valid revenue amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a short delay
      await new Promise(resolve => setTimeout(resolve, 600));
      setOrganizationProfile(profile as OrganizationProfile);
      navigate('/assessment');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = <K extends keyof OrganizationProfile>(
    key: K, 
    value: OrganizationProfile[K]
  ) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    
    // Clear error for this field if it exists
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b pb-6">
          <CardTitle className="text-2xl font-bold text-gray-800">Organization Profile</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Complete your organization profile to receive a tailored assessment
            that addresses your specific business needs and challenges.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8 pt-6">
            {Object.keys(errors).length > 0 && (
              <Alert variant="destructive" className="bg-red-50 text-red-800 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please correct the errors below to continue
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="industry" className="text-base font-medium">
                  Industry <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={profile.industry}
                  onValueChange={(value: Industry) => handleChange('industry', value)}
                >
                  <SelectTrigger 
                    id="industry" 
                    className={`h-12 ${errors.industry ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                  >
                    <Building2 className="mr-2 h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {industriesData.map(industry => (
                      <SelectItem key={industry.value} value={industry.value} className="py-3">
                        <div>
                          <div className="font-medium">{industry.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{industry.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-red-500 mt-1">{errors.industry}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="companySize" className="text-base font-medium">
                  Company Size <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={profile.companySize}
                  onValueChange={(value: CompanySize) => handleChange('companySize', value)}
                >
                  <SelectTrigger 
                    id="companySize" 
                    className={`h-12 ${errors.companySize ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                  >
                    <Users className="mr-2 h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Select your company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizesData.map(size => (
                      <SelectItem key={size.value} value={size.value} className="py-3">
                        <div>
                          <div className="font-medium">{size.label}</div>
                          <div className="text-xs text-gray-500 mt-1">{size.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.companySize && (
                  <p className="text-sm text-red-500 mt-1">{errors.companySize}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="employeeCount" className="text-base font-medium">
                    Number of Employees
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="employeeCount"
                      type="number"
                      placeholder="e.g., 1000"
                      className={`pl-10 h-12 ${errors.employeeCount ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                      value={profile.employeeCount || ''}
                      onChange={(e) => handleChange('employeeCount', parseInt(e.target.value) || undefined)}
                    />
                  </div>
                  {errors.employeeCount && (
                    <p className="text-sm text-red-500 mt-1">{errors.employeeCount}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="annualRevenue" className="text-base font-medium">
                    Annual Revenue (USD)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="annualRevenue"
                      type="number"
                      placeholder="e.g., 10,000,000"
                      className={`pl-10 h-12 ${errors.annualRevenue ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                      value={profile.annualRevenue || ''}
                      onChange={(e) => handleChange('annualRevenue', parseInt(e.target.value) || undefined)}
                    />
                  </div>
                  {errors.annualRevenue && (
                    <p className="text-sm text-red-500 mt-1">{errors.annualRevenue}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="region" className="text-base font-medium">
                  Region
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="region"
                    placeholder="e.g., North America"
                    className="pl-10 h-12 border-gray-300"
                    value={profile.region || ''}
                    onChange={(e) => handleChange('region', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 px-6 py-5 rounded-b-lg border-t flex flex-col sm:flex-row gap-4 sm:justify-between">
            <div className="text-sm text-gray-500">
              <span className="text-red-500">*</span> Required fields
            </div>
            <Button 
              type="submit" 
              className="w-full sm:w-auto text-base px-8 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Your information is securely processed according to our 
        <Button variant="link" className="px-1 text-blue-600 hover:text-blue-800">privacy policy</Button>
      </div>
    </div>
  );
};

export default OrganizationProfileForm;