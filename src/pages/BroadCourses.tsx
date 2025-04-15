
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

const BroadCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  
  // Get unique departments and categories for filters
  const departments = ["all", ...Array.from(new Set(broadCourses.map(course => course.department)))];
  const categories = ["all", ...Array.from(new Set(broadCourses.map(course => course.category)))];
  
  // Filter courses based on search term and selected filters
  const filteredCourses = broadCourses.filter(course => {
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
          <span className="font-semibold">Total Courses: {broadCourses.length}</span>
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
