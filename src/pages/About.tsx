
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const About = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      
      <Tabs defaultValue="msu" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="msu">MSU Broad IBC</TabsTrigger>
          <TabsTrigger value="socr">SOCR UMich</TabsTrigger>
        </TabsList>
        
        <TabsContent value="msu" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Michigan State University Broad College International Business Center</CardTitle>
              <CardDescription>Global Excellence in Business Education and Research</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p>
                  The International Business Center (IBC) at Michigan State University's Eli Broad College of Business 
                  provides world-class education, research, and assistance to businesses, public policy makers, academics, 
                  and students on international business and trade.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Centers of Excellence</h3>
                <p>
                  The IBC is designated as a Center for International Business Education and Research (CIBER) by the U.S. 
                  Department of Education, making it one of only 15 such centers in the country. This prestigious designation 
                  recognizes our commitment to excellence in international business education and research.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Key Initiatives</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>GlobalEDGE™ - A knowledge portal that connects international business professionals worldwide with a wealth of information, insights, and resources.</li>
                  <li>International Business Education - Developing and delivering innovative programs that prepare students for careers in a global marketplace.</li>
                  <li>Faculty Development in International Business - Supporting faculty research and teaching in international business.</li>
                  <li>Research in Global Business - Conducting cutting-edge research on issues affecting global business.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                <p>
                  International Business Center<br />
                  Michigan State University<br />
                  645 N. Shaw Ln., Room 7<br />
                  East Lansing, MI 48824<br />
                  United States<br />
                  Email: ibc@broad.msu.edu
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="socr" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistics Online Computational Resource (SOCR)</CardTitle>
              <CardDescription>University of Michigan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Mission</h3>
                <p>
                  The Statistics Online Computational Resource (SOCR) provides free, online educational materials, 
                  interactive tools, and computational resources for data science, probability, and statistics education.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Resources</h3>
                <p>
                  SOCR develops and maintains a collection of interactive applets, educational materials, 
                  and computational tools designed to enhance learning experiences in statistics education 
                  and data science research.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Key Features</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Interactive Applets - Tools for data analysis, visualization, and statistical modeling</li>
                  <li>Educational Materials - Courses, books, and learning modules</li>
                  <li>Data Science Resources - Big data analytics and machine learning tools</li>
                  <li>Case Studies - Real-world applications of statistical methods</li>
                  <li>Research Projects - Collaborative initiatives exploring novel statistical methodologies</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                <p>
                  Statistics Online Computational Resource<br />
                  Department of Statistics<br />
                  University of Michigan<br />
                  Ann Arbor, MI 48109<br />
                  United States<br />
                  Website: <a href="http://www.socr.umich.edu" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.socr.umich.edu</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;
