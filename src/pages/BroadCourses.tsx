import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { broadCourses } from "@/data/marketData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Expanded Broad College courses list ---

// *** Undergrad Core Courses ***
const undergraduateCore = [
  { code: "ACC 201", title: "Principles of Financial Accounting", credits: 3, department: "Accounting", category: "Undergraduate Core", description: "Introduction to financial statements and the accounting cycle for business enterprises." },
  { code: "ACC 202", title: "Principles of Management Accounting", credits: 3, department: "Accounting", category: "Undergraduate Core", description: "Management accounting concepts and practices." },
  { code: "BUS 250", title: "Business Communications", credits: 3, department: "Business", category: "Undergraduate Core", description: "Written and oral business communications." },
  { code: "FI 311", title: "Financial Management", credits: 3, department: "Finance", category: "Undergraduate Core", description: "Fundamentals of business finance for organizations." },
  { code: "MKT 300", title: "Principles of Marketing", credits: 3, department: "Marketing", category: "Undergraduate Core", description: "Basic marketing concepts and strategic foundation." },
  { code: "MGT 315", title: "Managing Human Resources and Organizational Behavior", credits: 3, department: "Management", category: "Undergraduate Core", description: "HRM and OB in modern organizations." },
  { code: "SCM 303", title: "Introduction to Supply Chain Management", credits: 3, department: "Supply Chain", category: "Undergraduate Core", description: "Overview of supply chain including procurement, logistics, integration." },
  { code: "ITM 309", title: "Business Information Systems and Technology", credits: 3, department: "IT", category: "Undergraduate Core", description: "Information systems, technology, and their applications in business." },
  { code: "GBL 323", title: "Introduction to Business Law", credits: 3, department: "Business Law", category: "Undergraduate Core", description: "Legal and regulatory business environment." },
  { code: "IBUS 330", title: "International Business", credits: 3, department: "International Business", category: "Undergraduate Core", description: "International dimensions of business: trade, investment, MNCs." },
];

// *** Undergraduate Electives ***
const undergraduateElectives = [
  { code: "SCM 371", title: "Procurement and Sourcing", credits: 3, department: "Supply Chain", category: "Undergraduate Elective", description: "Analysis of procurement, negotiations, supplier management." },
  { code: "MKT 310", title: "International Business", credits: 3, department: "Marketing", category: "Undergraduate Elective", description: "International marketing concepts and practices." },
  { code: "FI 320", title: "Introduction to Investments", credits: 3, department: "Finance", category: "Undergraduate Elective", description: "Markets and instruments, securities analysis and portfolio management." },
  { code: "ITM 317", title: "Digital Business & Emerging Technologies", credits: 3, department: "IT", category: "Undergraduate Elective", description: "Digitalization, disruptive innovations, and technology in business." },
  { code: "MGT 409", title: "Business Policy and Strategic Management", credits: 3, department: "Management", category: "Undergraduate Elective", description: "Strategy formulation, case analysis, and implementation." },
  { code: "ENT 321", title: "Entrepreneurial Mindset and Skills", credits: 3, department: "Entrepreneurship", category: "Undergraduate Elective", description: "Core entrepreneurial principles and skill development." },
  { code: "HRM 360", title: "Negotiation", credits: 3, department: "Human Resource", category: "Undergraduate Elective", description: "Negotiation strategies and simulations." },
];

// *** Graduate Core Courses ***
const graduateCore = [
  { code: "MBA 801", title: "An Introduction to Accounting", credits: 2, department: "Accounting", category: "Graduate Core", description: "Accounting principles for MBA students." },
  { code: "MBA 802", title: "Financial Accounting", credits: 2, department: "Accounting", category: "Graduate Core", description: "Analysis of financial statements and reporting." },
  { code: "MBA 820", title: "Global Supply Chain Management", credits: 3, department: "Supply Chain", category: "Graduate Core", description: "Design and management of global supply chains." },
  { code: "MBA 823", title: "Information Technology Management", credits: 2, department: "IT", category: "Graduate Core", description: "Management of information systems in business." },
  { code: "MBA 824", title: "Corporate Finance", credits: 2, department: "Finance", category: "Graduate Core", description: "Corporate financial decisions and value creation." },
  { code: "MBA 829", title: "Marketing Management", credits: 2, department: "Marketing", category: "Graduate Core", description: "Strategies for marketing in dynamic environments." },
  { code: "MBA 841", title: "Strategic Management", credits: 2, department: "Management", category: "Graduate Core", description: "Strategy processes, global markets, and competitive environments." },
  { code: "MBA 850", title: "International Financial Management", credits: 3, department: "Finance", category: "Graduate Core", description: "Financial management in an international context." },
  { code: "MBA 854", title: "Human Resource Management", credits: 2, department: "Human Resource", category: "Graduate Core", description: "Advanced HRM concepts in the global context." },
  { code: "MBA 811", title: "Global Strategy", credits: 3, department: "Management", category: "Graduate Core", description: "Analysis of globalization and strategy development." },
];

// *** Graduate Electives ***
const graduateElectives = [
  { code: "FI 850", title: "International Financial Management", credits: 3, department: "Finance", category: "Graduate Elective", description: "Deep dive into global financial markets and exposure management." },
  { code: "MGT 808", title: "Leadership and Teamwork", credits: 2, department: "Management", category: "Graduate Elective", description: "Developing strong teams and effective leadership styles." },
  { code: "SCM 892", title: "Supply Chain Analytics", credits: 3, department: "Supply Chain", category: "Graduate Elective", description: "Analytics for managing supply chain operations and strategies." },
  { code: "MKT 851", title: "International Marketing", credits: 2, department: "Marketing", category: "Graduate Elective", description: "Cross-border marketing challenges and global brand strategies." },
];

// **** Consolidate all courses, including previously in the file ****
const allBroadCourses = [
  ...undergraduateCore,
  ...undergraduateElectives,
  ...graduateCore,
  ...graduateElectives,
];

const BroadCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  
  // Get unique departments and categories for filters
  const departments = ["all", ...Array.from(new Set(allBroadCourses.map(course => course.department)))];
  const categories = ["all", ...Array.from(new Set(allBroadCourses.map(course => course.category)))];
  
  // Filter courses based on search term and selected filters
  const filteredCourses = allBroadCourses.filter(course => {
    const matchesSearch = 
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = filterDepartment === "all" || course.department === filterDepartment;
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    
    return matchesSearch && matchesDepartment && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">MSU Broad College Courses</h1>
        <div className="flex items-center">
          <GraduationCap className="mr-2 h-6 w-6 text-msu-green" />
          <span className="font-semibold">Total Courses: {allBroadCourses.length}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Input 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Department:</label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Category:</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.filter(cat => cat !== "all").map((cat) => (
                <Badge 
                  key={cat}
                  variant={filterCategory === cat ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilterCategory(cat === filterCategory ? "all" : cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <div className="space-y-4">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">No courses match your filters. Try adjusting your search criteria.</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <Card key={course.code} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">
                        {course.code}: {course.title}
                      </CardTitle>
                      <Badge>{course.credits} Credits</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{course.department}</Badge>
                      <Badge variant="outline" className="bg-msu-green text-white">{course.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadCourses;
