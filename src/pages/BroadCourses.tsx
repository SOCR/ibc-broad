
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

// Add more Broad College undergraduate courses based on the provided document
const additionalCourses = [
  {
    code: "ACC 201",
    title: "Principles of Financial Accounting",
    credits: 3,
    department: "Accounting",
    category: "Core",
    description: "Introduction to financial statements and the accounting cycle for business enterprises."
  },
  {
    code: "ACC 202",
    title: "Principles of Management Accounting",
    credits: 3,
    department: "Accounting",
    category: "Core",
    description: "Management accounting concepts and practices. Costing systems, budgeting, and financial analysis for management decision making."
  },
  {
    code: "BUS 250",
    title: "Business Communications",
    credits: 3,
    department: "Business",
    category: "Core",
    description: "Written and oral communication in a business setting. Communication theory, analysis, and practical applications."
  },
  {
    code: "FI 311",
    title: "Financial Management",
    credits: 3,
    department: "Finance",
    category: "Core",
    description: "Fundamentals of business finance. Investment, financing, and dividend decisions of firms, risk, and return."
  },
  {
    code: "MKT 300",
    title: "Principles of Marketing",
    credits: 3,
    department: "Marketing",
    category: "Core",
    description: "Marketing concepts, methods, and strategic foundation for business decisions."
  },
  {
    code: "MGT 315",
    title: "Managing Human Resources and Organizational Behavior",
    credits: 3,
    department: "Management",
    category: "Core",
    description: "Human resource management and organizational behavior theories and practices in modern organizations."
  },
  {
    code: "SCM 303",
    title: "Introduction to Supply Chain Management",
    credits: 3,
    department: "Supply Chain Management",
    category: "Core",
    description: "Overview of supply chain management, including procurement, operations, logistics, and integration across functions."
  },
  {
    code: "ITM 309",
    title: "Business Information Systems and Technology",
    credits: 3,
    department: "Information Technology",
    category: "Core",
    description: "Information systems concepts, technologies, and their applications in business."
  },
  {
    code: "GBL 323",
    title: "Introduction to Business Law",
    credits: 3,
    department: "Business Law",
    category: "Core",
    description: "Introduction to the legal and regulatory environment of business."
  },
  {
    code: "IBUS 330",
    title: "International Business",
    credits: 3,
    department: "International Business",
    category: "Core",
    description: "International dimensions of business: trade, investment, and multinational firms' operations."
  }
];

// Combine with existing courses
const allBroadCourses = [...broadCourses, ...additionalCourses];

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
