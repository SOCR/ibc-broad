
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Info, BookOpen, School, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const About: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">About</h1>
        <div className="flex items-center">
          <Info className="mr-2 h-6 w-6 text-msu-green" />
          <span className="font-semibold">MSU Broad College & SOCR UMich</span>
        </div>
      </div>
      
      <Tabs defaultValue="msu-ibc" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="msu-ibc">MSU Broad IBC</TabsTrigger>
          <TabsTrigger value="socr-umich">SOCR UMich</TabsTrigger>
        </TabsList>
        
        <TabsContent value="msu-ibc" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <School className="h-5 w-5 mr-2" />
                Michigan State University International Business Center
              </CardTitle>
              <CardDescription>
                Center for International Business Education and Research (CIBER)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <img 
                  src="https://global.broad.msu.edu/ibc/wp-content/uploads/sites/14/2018/11/IBC-logo.png" 
                  alt="MSU IBC Logo" 
                  className="h-28 object-contain"
                />
              </div>

              <p>
                Michigan State University's International Business Center (IBC) was designated in 1990 as a National Resource Center by the U.S. Department of Education. 
                Michigan State is one of only 15 universities in the country to be awarded a federal grant to operate a Center for International Business Education and Research (CIBER).
              </p>
              
              <p>
                The mission of the MSU-CIBER is to provide superior education, research, and assistance to businesses, public policy makers, academics, and students on international business and trade.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Key Initiatives</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Global Business Knowledge Development</li>
                <li>Global Business Skill Development</li>
                <li>International Trade Research</li>
                <li>Community College Internationalization</li>
                <li>Global Mindset Development</li>
                <li>globalEDGE - Leading Online Resource for Global Business Knowledge</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Research Focus Areas</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>International Trade and Investment</li>
                <li>Global Supply Chain Management</li>
                <li>Cross-Cultural Management</li>
                <li>Emerging Markets</li>
              </ul>
              
              <div className="flex justify-center mt-6">
                <Button asChild variant="outline">
                  <a href="https://global.broad.msu.edu/ibc/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    Visit MSU IBC Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="socr-umich" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Statistics Online Computational Resource (SOCR)
              </CardTitle>
              <CardDescription>
                University of Michigan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <img 
                  src="https://www.socr.umich.edu/img/SOCR_Web_Icon.ico" 
                  alt="SOCR Logo" 
                  className="h-28 object-contain"
                />
              </div>

              <p>
                The Statistics Online Computational Resource (SOCR) is an NSF-funded project that provides free online educational materials, interactive tools, 
                statistical computing resources, and data analytics services. SOCR aims to advance probability and statistics education, scientific inquiry, and quantitative research.
              </p>
              
              <p>
                SOCR develops, validates and disseminates interactive tools for probability distributions, statistical analysis, virtual experimentation, 
                statistical simulations, and model-based inference, with applications in science, engineering, health, and social sciences.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Core Resources</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>SOCR Interactive Applets and Tools</li>
                <li>SOCR Data Analytics and Visualization</li>
                <li>SOCR Educational Materials and Courses</li>
                <li>SOCR Data Science and Predictive Analytics</li>
                <li>SOCR Computational Neuroscience</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Research Areas</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Data Science</li>
                <li>Machine Learning</li>
                <li>Big Data Analytics</li>
                <li>Predictive Modeling</li>
                <li>Computational Statistics</li>
                <li>Scientific Visualization</li>
              </ul>
              
              <div className="flex justify-center mt-6">
                <Button asChild variant="outline">
                  <a href="https://www.socr.umich.edu/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    Visit SOCR Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Collaboration</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The Michigan State University International Business Center (IBC) and the University of Michigan Statistics Online Computational Resource (SOCR)
            collaborate to develop innovative data analytics tools and educational resources for international business research and education.
          </p>
          
          <p className="mt-4">
            This dashboard represents one such collaborative effort, combining IBC's expertise in international business with SOCR's advanced
            statistical and data visualization capabilities to provide powerful insights into global economic trends and market dynamics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
