
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "International Business Education at Community Colleges",
      description: "2019 Broad IBC Benchmark report on international business education at community colleges",
      pdfUrl: "https://ibc-static.broad.msu.edu/sites/globalinit/ibc/publications/research/pdfs/ibex2019.pdf",
      date: "2019"
    },
    {
      id: 2,
      title: "Global Supply Chain Disruption",
      description: "Analysis of global supply chain disruptions during economic uncertainties",
      pdfUrl: "#",
      date: "2021"
    },
    {
      id: 3,
      title: "Emerging Markets Investment Strategy",
      description: "Investment strategies for businesses entering emerging markets",
      pdfUrl: "#",
      date: "2022"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Case Studies</h1>
        <p className="text-muted-foreground">
          Research and case studies from MSU Broad College International Business Center.
        </p>
      </div>
      
      <div className="flex items-center justify-between bg-muted/50 p-4 rounded-lg mb-4">
        <div className="flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-msu-green" />
          <span className="font-medium">Looking for financial planning tools?</span>
        </div>
        <Button asChild variant="outline">
          <Link to="/cfp-consulting" className="flex items-center">
            Visit CFP Consulting Tools
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study) => (
          <Card key={study.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-msu-green" />
                {study.title}
              </CardTitle>
              <CardDescription>{study.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-sm mb-4 flex-1">{study.description}</p>
              <Button asChild className="w-full mt-auto" variant="outline">
                <a href={study.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
