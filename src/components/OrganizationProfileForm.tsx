import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAssessmentStore } from '@/store/assessment';
import { Industry, CompanySize, OrganizationProfile } from '@/types/assessment';

const industries: Industry[] = ['healthcare', 'finance', 'manufacturing', 'retail', 'technology', 'other'];
const companySizes: CompanySize[] = ['small', 'medium', 'large', 'enterprise'];

const formatLabel = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');
};

export const OrganizationProfileForm = () => {
  const navigate = useNavigate();
  const { setOrganizationProfile } = useAssessmentStore();
  const [profile, setProfile] = React.useState<Partial<OrganizationProfile>>({});
  const [error, setError] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile.industry || !profile.companySize) {
      setError('Please fill in all required fields');
      return;
    }

    setOrganizationProfile(profile as OrganizationProfile);
    navigate('/assessment');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Organization Profile</CardTitle>
          <CardDescription>
            Please provide information about your organization to receive a tailored assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="text-sm text-red-500 mb-4">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Select
              value={profile.industry}
              onValueChange={(value: Industry) => {
                setProfile(prev => ({ ...prev, industry: value }));
                setError('');
              }}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {formatLabel(industry)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size *</Label>
            <Select
              value={profile.companySize}
              onValueChange={(value: CompanySize) => {
                setProfile(prev => ({ ...prev, companySize: value }));
                setError('');
              }}
            >
              <SelectTrigger id="companySize">
                <SelectValue placeholder="Select your company size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map(size => (
                  <SelectItem key={size} value={size}>
                    {formatLabel(size)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeCount">Number of Employees</Label>
            <Input
              id="employeeCount"
              type="number"
              placeholder="e.g., 1000"
              value={profile.employeeCount || ''}
              onChange={(e) => setProfile(prev => ({ 
                ...prev, 
                employeeCount: parseInt(e.target.value) || undefined 
              }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="annualRevenue">Annual Revenue (USD)</Label>
            <Input
              id="annualRevenue"
              type="number"
              placeholder="e.g., 10000000"
              value={profile.annualRevenue || ''}
              onChange={(e) => setProfile(prev => ({ 
                ...prev, 
                annualRevenue: parseInt(e.target.value) || undefined 
              }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              placeholder="e.g., North America"
              value={profile.region || ''}
              onChange={(e) => setProfile(prev => ({ 
                ...prev, 
                region: e.target.value 
              }))}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full">
              Start Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}; 