
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { tutorialSteps } from "@/data/marketData";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Tutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  const totalSteps = tutorialSteps.length;
  const step = tutorialSteps.find(s => s.id === currentStep) || tutorialSteps[0];
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Tutorial Completed!",
        description: "You have completed the MSU Broad College IBC Dashboard tutorial.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Tutorial</h1>
        <div className="flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-msu-green" />
          <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
        </div>
      </div>
      
      <Card className="relative">
        <div className="absolute top-4 right-4 bg-msu-green text-white px-3 py-1 rounded-full text-sm">
          Step {currentStep}/{totalSteps}
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{step.title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            Follow this step-by-step guide to learn how to use the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[200px]">
            <p className="text-lg">{step.description}</p>
            
            {step.image && (
              <div className="mt-4 flex justify-center">
                <img src={step.image} alt={`Tutorial step ${currentStep}`} className="max-w-full rounded-md shadow-md" />
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
            
            <div className="flex space-x-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index + 1 === currentStep ? "bg-msu-green" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
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
        {tutorialSteps.map((tutorialStep) => (
          <Card 
            key={tutorialStep.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              tutorialStep.id === currentStep ? "ring-2 ring-msu-green" : ""
            }`}
            onClick={() => setCurrentStep(tutorialStep.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{tutorialStep.id}. {tutorialStep.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {tutorialStep.description.substring(0, 100)}
              {tutorialStep.description.length > 100 ? "..." : ""}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
