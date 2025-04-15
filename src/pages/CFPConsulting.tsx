
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FinancialProfileForm } from "../components/cfp/FinancialProfileForm";
import { ScenariosDisplay } from "../components/cfp/ScenariosDisplay";
import { RetirementAnalysis } from "../components/cfp/RetirementAnalysis";
import { EducationPlanning } from "../components/cfp/EducationPlanning";
import { DebtManagement } from "../components/cfp/DebtManagement";
import { FinancialProfile, FinancialScenario } from "@/types/market";
import { generateFinancialScenarios } from "../utils/financial-planning";
import { InfoIcon } from "lucide-react";

const CFPConsulting = () => {
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [scenarios, setScenarios] = useState<FinancialScenario[]>([]);
  const [activeTab, setActiveTab] = useState("profile");

  const handleProfileSubmit = (profileData: FinancialProfile) => {
    setProfile(profileData);
    const generatedScenarios = generateFinancialScenarios(profileData);
    setScenarios(generatedScenarios);
    setActiveTab("scenarios");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Certified Financial Planning Consulting</h1>
      <p className="text-muted-foreground mb-6">
        Comprehensive financial planning to help you achieve your financial goals, from retirement 
        planning to education savings and wealth building.
      </p>

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
    </div>
  );
};

export default CFPConsulting;
