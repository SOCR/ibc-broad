
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FinancialProfileForm } from "@/components/cfp/FinancialProfileForm";
import { ScenariosDisplay } from "@/components/cfp/ScenariosDisplay";
import { RetirementAnalysis } from "@/components/cfp/RetirementAnalysis";
import { EducationPlanning } from "@/components/cfp/EducationPlanning";
import { DebtManagement } from "@/components/cfp/DebtManagement";
import { FinancialHealthScoreComponent } from "@/components/cfp/FinancialHealthScore";
import { PortfolioAllocation } from "@/components/cfp/PortfolioAllocation";
import { FinancialProfile } from "@/types/market";
import { generateFinancialScenarios } from "@/utils/financial-planning";
import { Calculator, BarChart, School, CreditCard, PieChart, LineChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CFPConsulting: React.FC = () => {
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  
  const handleSubmitProfile = (profileData: FinancialProfile) => {
    setProfile(profileData);
    const generatedScenarios = generateFinancialScenarios(profileData);
    setScenarios(generatedScenarios);
    setActiveTab("overview");
    
    toast({
      title: "Financial Analysis Generated",
      description: "Your financial profile has been processed successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">CFP Consulting Tools</h1>
        <div className="flex items-center">
          <Calculator className="mr-2 h-6 w-6 text-msu-green" />
          <span className="text-sm font-medium">Financial Planning & Analysis</span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-1">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" /> 
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger 
            value="overview" 
            disabled={!profile} 
            className="flex items-center gap-1"
          >
            <PieChart className="h-4 w-4" /> 
            <span className="hidden md:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="retirement" 
            disabled={!profile} 
            className="flex items-center gap-1"
          >
            <LineChart className="h-4 w-4" /> 
            <span className="hidden md:inline">Retirement</span>
          </TabsTrigger>
          <TabsTrigger 
            value="education" 
            disabled={!profile} 
            className="flex items-center gap-1"
          >
            <School className="h-4 w-4" /> 
            <span className="hidden md:inline">Education</span>
          </TabsTrigger>
          <TabsTrigger 
            value="debt" 
            disabled={!profile} 
            className="flex items-center gap-1"
          >
            <CreditCard className="h-4 w-4" /> 
            <span className="hidden md:inline">Debt</span>
          </TabsTrigger>
          <TabsTrigger 
            value="investment" 
            disabled={!profile} 
            className="flex items-center gap-1"
          >
            <PieChart className="h-4 w-4" /> 
            <span className="hidden md:inline">Investments</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Profile</CardTitle>
              <CardDescription>
                Enter your financial information to generate a personalized analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialProfileForm onSubmit={handleSubmitProfile} initialData={profile} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-6">
          {profile && scenarios.length > 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ScenariosDisplay profile={profile} scenarios={scenarios} />
                </div>
                <div className="lg:col-span-1">
                  <FinancialHealthScoreComponent profile={profile} />
                </div>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="retirement" className="space-y-6">
          {profile && scenarios.length > 0 && (
            <RetirementAnalysis profile={profile} scenarios={scenarios} />
          )}
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6">
          {profile && scenarios.length > 0 && (
            <EducationPlanning profile={profile} scenarios={scenarios} />
          )}
        </TabsContent>
        
        <TabsContent value="debt" className="space-y-6">
          {profile && scenarios.length > 0 && (
            <DebtManagement profile={profile} />
          )}
        </TabsContent>
        
        <TabsContent value="investment" className="space-y-6">
          {profile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PortfolioAllocation riskTolerance={profile.riskTolerance} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Investment Strategy</CardTitle>
                  <CardDescription>
                    Custom investment recommendations based on your risk tolerance and goals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Risk Profile: {profile.riskTolerance.charAt(0).toUpperCase() + profile.riskTolerance.slice(1)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.riskTolerance === 'low' 
                        ? 'Your conservative risk profile indicates a preference for stability and wealth preservation over higher returns.'
                        : profile.riskTolerance === 'medium'
                          ? 'Your balanced approach suggests comfort with moderate market fluctuations in pursuit of long-term growth.'
                          : 'Your aggressive stance prioritizes maximizing long-term returns despite potential short-term volatility.'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Recommended Strategies:</h4>
                    <ul className="list-disc ml-5 space-y-1">
                      {profile.riskTolerance === 'low' ? (
                        <>
                          <li className="text-sm">Focus on index funds and high-quality bonds</li>
                          <li className="text-sm">Maintain higher cash reserves (6-12 months)</li>
                          <li className="text-sm">Consider dividend-focused investments</li>
                          <li className="text-sm">Implement dollar-cost averaging approach</li>
                        </>
                      ) : profile.riskTolerance === 'medium' ? (
                        <>
                          <li className="text-sm">Balance between growth stocks and income investments</li>
                          <li className="text-sm">Consider mid-cap and international exposure</li>
                          <li className="text-sm">Moderately diversified portfolio with bonds</li>
                          <li className="text-sm">Quarterly portfolio rebalancing</li>
                        </>
                      ) : (
                        <>
                          <li className="text-sm">Emphasis on growth stocks and emerging markets</li>
                          <li className="text-sm">Higher allocation to small-cap and sector funds</li>
                          <li className="text-sm">Consider strategic use of leveraged positions</li>
                          <li className="text-sm">Explore alternative investments</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CFPConsulting;
