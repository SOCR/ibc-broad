import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { tutorialSteps } from "@/data/marketData";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// --- Updated Step Definitions: new tutorialSteps array ---
const tutorialStepsData = [
  {
    id: 1,
    title: "Getting Started: Dashboard Overview",
    description: "Explore the MSU IBC Dashboard's Overview page. Review key market data, statistics, and trends at a glance. Use tooltips on each stats card for extra context about IBEX Score, State Rankings, and Top International Course.",
    image: "dashboard-1.png"
  },
  {
    id: 2,
    title: "IBEX Analysis: State and National Data",
    description: "Analyze State IBEX Scores using interactive charts and filters. Compare rankings and deep dive into longitudinal trends for each state.",
    image: "ibex-analysis-2.png"
  },
  {
    id: 3,
    title: "Market Data: Economic, Exchange, and Stock Trends",
    description: "Navigate the Market Data page. View Exchange Rate, Economic Indicator, and Stock Exchange charts. Adjust date ranges, and explore dynamic charting features.",
    image: "market-data-3.png"
  },
  {
    id: 4,
    title: "Case Studies & CFP Consulting",
    description: "Access detailed case studies and try the CFP Consulting tool. Plan your financial future, assess retirement readiness, and review simulated plans using the CFP features.",
    image: "cfp-consulting-4.png"
  },
  {
    id: 5,
    title: "Trade & Supply Chain Analytics",
    description: "Deep dive into Global Trade, Regional Performance, Supply Chain, and International Trade analytics. Use the filtering, trend, and export features to analyze global trade and logistics data.",
    image: "trade-supply-5.png"
  },
  {
    id: 6,
    title: "Browse Broad College Courses",
    description: "Browse undergraduate and graduate-level courses at MSU Broad College. Filter by department or category, and search to find the right class for your professional goals.",
    image: "broad-courses-6.png"
  },
  {
    id: 7,
    title: "Meet the IBC Team",
    description: "Get to know the IBC team members and student researchers supporting international business education and research at MSU.",
    image: "team-7.png"
  },
  {
    id: 8,
    title: "You’re All Set! Support & Feedback",
    description: "Contact the IBC team or visit the About page for more information, support, and resources about the MSU IBC Dashboard and its initiatives.",
    image: "about-8.png"
  }
];

const Tutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { toast } = useToast();
  
  const totalSteps = tutorialStepsData.length;
  const step = tutorialStepsData.find(s => s.id === currentStep) || tutorialStepsData[0];
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleNext = () => {
    // Mark current step as completed if not already
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Tutorial Completed!",
        description: "You have completed the MSU Broad College IBC Dashboard tutorial.",
      });
    }
  };
  
  const handleMarkComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      toast({
        title: "Step Marked as Complete",
        description: `Tutorial step ${currentStep} has been marked as complete.`,
      });
    }
  };

  const progress = Math.round((completedSteps.length / totalSteps) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Tutorial</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-msu-green" />
            <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="bg-gray-100 rounded-full h-2.5 w-32">
            <div 
              className="bg-msu-green h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{progress}% complete</span>
        </div>
      </div>
      
      <Card className="relative shadow-md">
        <div className="absolute top-4 right-4 bg-msu-green text-white px-3 py-1 rounded-full text-sm">
          Step {currentStep}/{totalSteps}
        </div>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            {step.title}
            {completedSteps.includes(currentStep) && (
              <Check className="h-5 w-5 text-green-500" />
            )}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Follow this step-by-step guide to learn how to use the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[200px]">
            <p className="text-lg">{step.description}</p>
            
            {step.image && (
              <div className="mt-4 flex justify-center">
                <img 
                  src={`/tutorial-graphs/graph-${currentStep}.png`} 
                  alt={`Tutorial step ${currentStep}`} 
                  className="max-w-full h-auto rounded-md shadow-md border"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleMarkComplete}
              disabled={completedSteps.includes(currentStep)}
              className="flex items-center"
            >
              <Check className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center bg-msu-green hover:bg-msu-green/90"
            >
              {currentStep === totalSteps ? "Finish" : "Next"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutorialStepsData.map((tutorialStep) => (
          <Card 
            key={tutorialStep.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              tutorialStep.id === currentStep ? "ring-2 ring-msu-green" : ""
            }`}
            onClick={() => setCurrentStep(tutorialStep.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{tutorialStep.id}. {tutorialStep.title}</span>
                {completedSteps.includes(tutorialStep.id) && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {tutorialStep.description.substring(0, 100)}
              {tutorialStep.description.length > 100 ? "..." : ""}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
        <h3 className="font-medium text-amber-800 mb-2">Tutorial Tips</h3>
        <ul className="list-disc pl-5 text-sm text-amber-700 space-y-1">
          <li>You can click on any tutorial card to jump directly to that step</li>
          <li>Mark steps as complete to track your progress</li>
          <li>Refresh the page to start over if needed</li>
          <li>Contact the IBC team for additional help with dashboard features</li>
        </ul>
      </div>
    </div>
  );
};

export default Tutorial;
