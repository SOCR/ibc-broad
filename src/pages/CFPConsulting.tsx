
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FinancialProfileForm } from "../components/cfp/FinancialProfileForm";
import { ScenariosDisplay } from "../components/cfp/ScenariosDisplay";
import { RetirementAnalysis } from "../components/cfp/RetirementAnalysis";
import { EducationPlanning } from "../components/cfp/EducationPlanning";
import { DebtManagement } from "../components/cfp/DebtManagement";
import { FinancialProfile, FinancialScenario } from "@/types/market";
import { generateFinancialScenarios } from "../utils/financial-planning";
import { 
  InfoIcon, 
  FileText, 
  Download, 
  Share2, 
  Save, 
  RefreshCcw, 
  Printer,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CFPConsulting = () => {
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [scenarios, setScenarios] = useState<FinancialScenario[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  const handleProfileSubmit = (profileData: FinancialProfile) => {
    setProfile(profileData);
    const generatedScenarios = generateFinancialScenarios(profileData);
    setScenarios(generatedScenarios);
    setActiveTab("scenarios");
    
    toast({
      title: "Financial Profile Submitted",
      description: "Your financial analysis has been generated successfully.",
    });
  };

  const handleSavePlan = () => {
    toast({
      title: "Financial Plan Saved",
      description: "Your financial plan has been saved to your account.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export Initiated",
      description: "Your financial plan is being prepared for download.",
    });
  };

  const handleSharePlan = () => {
    toast({
      title: "Share Options",
      description: "Share options dialog would appear here.",
    });
  };

  const handleReRunAnalysis = () => {
    if (profile) {
      const generatedScenarios = generateFinancialScenarios(profile);
      setScenarios(generatedScenarios);
      toast({
        title: "Analysis Updated",
        description: "Your financial analysis has been refreshed with the latest data.",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Certified Financial Planning Consulting</h1>
          <p className="text-muted-foreground">
            Comprehensive financial planning to help you achieve your financial goals, from retirement 
            planning to education savings and wealth building.
          </p>
        </div>
        
        {profile && (
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={handleSavePlan}>
              <Save className="mr-1 h-4 w-4" />
              Save Plan
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="mr-1 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleSharePlan}>
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleReRunAnalysis}>
              <RefreshCcw className="mr-1 h-4 w-4" />
              Re-run Analysis
            </Button>
          </div>
        )}
      </div>

      {!profile && (
        <Alert className="mb-6">
          <FileText className="h-4 w-4" />
          <AlertTitle>Get started with your financial plan</AlertTitle>
          <AlertDescription>
            Complete your financial profile to receive personalized recommendations and analysis.
            All information is kept confidential and secure.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="profile">
            <HoverCard>
              <HoverCardTrigger className="flex items-center gap-2">
                Financial Profile
                <InfoIcon className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent>
                Enter your personal and financial information to get started with your financial plan.
              </HoverCardContent>
            </HoverCard>
          </TabsTrigger>
          <TabsTrigger value="scenarios" disabled={!profile}>
            <HoverCard>
              <HoverCardTrigger className="flex items-center gap-2">
                Scenarios
                <InfoIcon className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent>
                Explore different financial scenarios based on your profile.
              </HoverCardContent>
            </HoverCard>
          </TabsTrigger>
          <TabsTrigger value="retirement" disabled={!profile}>
            <HoverCard>
              <HoverCardTrigger className="flex items-center gap-2">
                Retirement
                <InfoIcon className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent>
                Analyze and plan your retirement strategy.
              </HoverCardContent>
            </HoverCard>
          </TabsTrigger>
          <TabsTrigger value="education" disabled={!profile}>
            <HoverCard>
              <HoverCardTrigger className="flex items-center gap-2">
                Education
                <InfoIcon className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent>
                Plan for your children's education expenses.
              </HoverCardContent>
            </HoverCard>
          </TabsTrigger>
          <TabsTrigger value="debt" disabled={!profile}>
            <HoverCard>
              <HoverCardTrigger className="flex items-center gap-2">
                Debt Management
                <InfoIcon className="h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent>
                Analyze and optimize your debt repayment strategy.
              </HoverCardContent>
            </HoverCard>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <FinancialProfileForm onSubmit={handleProfileSubmit} initialData={profile} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scenarios">
          <Card>
            <CardContent className="pt-6">
              {profile && <ScenariosDisplay profile={profile} scenarios={scenarios} />}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="retirement">
          <Card>
            <CardContent className="pt-6">
              {profile && <RetirementAnalysis profile={profile} scenarios={scenarios} />}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education">
          <Card>
            <CardContent className="pt-6">
              {profile && <EducationPlanning profile={profile} scenarios={scenarios} />}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="debt">
          <Card>
            <CardContent className="pt-6">
              {profile && <DebtManagement profile={profile} scenarios={scenarios} />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {profile && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Your Next Steps</CardTitle>
            <CardDescription>Recommended actions to improve your financial situation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="rounded-full bg-primary/10 p-2 mr-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium">Optimize Retirement Savings</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Consider increasing your monthly retirement contributions by 10% to meet your retirement income goals.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="rounded-full bg-primary/10 p-2 mr-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium">Reduce High-Interest Debt</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Focus on paying down credit card debt to save on interest payments and improve your debt-to-income ratio.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="rounded-full bg-primary/10 p-2 mr-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium">Review Investment Allocation</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adjust your investment portfolio to align with your risk tolerance and time horizon for better returns.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={() => window.print()} className="ml-auto">
              <Printer className="mr-1 h-4 w-4" />
              Print Recommendations
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CFPConsulting;
