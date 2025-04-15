
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ibexOverTimeData, ibexKnowledgeData, courseData, stateRankings } from "@/data/ibexData";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area
} from "recharts";

const IBEXAnalysis: React.FC = () => {
  // Process data for course offerings over time
  const processedCourseData = courseData.slice(0, 6).map(course => {
    const yearData: { [key: string]: any } = { course: course.course };
    Object.entries(course.years).forEach(([year, value]) => {
      yearData[year] = value;
    });
    return yearData;
  });

  // Top 10 and bottom 10 states
  const top10States = stateRankings.slice(0, 10);
  const bottom10States = stateRankings.slice(-10);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>IBEX Analysis Dashboard</CardTitle>
          <CardDescription>
            The International Business Education Index (IBEX) measures the degree to which community colleges emphasize internationalization of business education.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
              <TabsTrigger value="courses">Course Offerings</TabsTrigger>
              <TabsTrigger value="states">State Rankings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">IBEX 2019</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{ibexOverTimeData[6].overall}</div>
                    <p className="text-xs text-muted-foreground">
                      Classified as "Active" (0.60-0.69)
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Highest Regional Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{ibexOverTimeData[6].northeast}</div>
                    <p className="text-xs text-muted-foreground">Northeast Region</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Top Ranked State</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stateRankings[0].state}</div>
                    <p className="text-xs text-muted-foreground">
                      Score: {stateRankings[0].score} (Highly Active)
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>IBEX Trends (2008-2019)</CardTitle>
                  <CardDescription>
                    Overall IBEX scores have been consistently in the "Active" category since 2012.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={ibexOverTimeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 0.8]} />
                      <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="overall" 
                        stroke="#18453B" 
                        strokeWidth={3}
                        name="Overall" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>International Business Knowledge</CardTitle>
                  <CardDescription>
                    Assessment of international business knowledge across different groups (scale 1-10)
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={ibexKnowledgeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
                      <Legend />
                      <Line type="monotone" dataKey="students" stroke="#18453B" name="Students" />
                      <Line type="monotone" dataKey="faculty" stroke="#7A9B76" name="Faculty" />
                      <Line type="monotone" dataKey="administrators" stroke="#A2AAAD" name="Administrators" />
                      <Line type="monotone" dataKey="localCommunities" stroke="#0000FF" name="Local Communities" />
                      <Line type="monotone" dataKey="peopleInCountry" stroke="#FF0000" name="People in Country" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="regional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional IBEX Comparison</CardTitle>
                  <CardDescription>
                    Compare IBEX scores across different regions of the United States
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={ibexOverTimeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 0.8]} />
                      <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
                      <Legend />
                      <Line type="monotone" dataKey="midwest" stroke="#8884d8" name="Midwest" />
                      <Line type="monotone" dataKey="northeast" stroke="#82ca9d" name="Northeast" />
                      <Line type="monotone" dataKey="south" stroke="#ffc658" name="South" />
                      <Line type="monotone" dataKey="west" stroke="#ff7300" name="West" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Breakdown 2019</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[ibexOverTimeData[6]]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 0.8]} />
                        <YAxis dataKey="year" type="category" tick={false} />
                        <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(2) : value} />
                        <Legend />
                        <Bar dataKey="midwest" name="Midwest" fill="#8884d8" />
                        <Bar dataKey="northeast" name="Northeast" fill="#82ca9d" />
                        <Bar dataKey="south" name="South" fill="#ffc658" />
                        <Bar dataKey="west" name="West" fill="#ff7300" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Regional Activity Classification 2019</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Northeast Region: 0.71</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "71%" }}></div>
                        </div>
                        <p className="text-sm text-green-600 font-medium mt-1">Highly Active</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">West Region: 0.66</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "66%" }}></div>
                        </div>
                        <p className="text-sm text-blue-600 font-medium mt-1">Active</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">South Region: 0.65</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                        <p className="text-sm text-blue-600 font-medium mt-1">Active</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Midwest Region: 0.63</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "63%" }}></div>
                        </div>
                        <p className="text-sm text-blue-600 font-medium mt-1">Active</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular International Business Courses</CardTitle>
                  <CardDescription>
                    Percentage of community colleges offering internationally-oriented business courses
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={processedCourseData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="course" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="2008" name="2008" fill="#8884d8" />
                      <Bar dataKey="2012" name="2012" fill="#82ca9d" />
                      <Bar dataKey="2016" name="2016" fill="#ffc658" />
                      <Bar dataKey="2019" name="2019" fill="#18453B" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Courses (2019)</CardTitle>
                  <CardDescription>
                    Ranking of international courses by percentage of community colleges offering them
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.slice(0, 6).map((course, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{course.course}</span>
                          <span>{course.years["2019"]}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-msu-green h-2.5 rounded-full" 
                            style={{ width: `${course.years["2019"]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="states" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top 10 States by IBEX Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {top10States.map((state, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{state.rank}. {state.state}</span>
                            <span className="font-bold">{state.score}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ width: `${state.score * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bottom 10 States by IBEX Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bottom10States.map((state, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{state.rank}. {state.state}</span>
                            <span className="font-bold">{state.score}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                state.category === "Less Active" ? "bg-orange-500" : "bg-blue-600"
                              }`}
                              style={{ width: `${state.score * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Level Distribution</CardTitle>
                  <CardDescription>
                    States are categorized as Highly Active (0.70-1.00), Active (0.60-0.69), or Less Active (0.30-0.59)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-4 rounded-md">
                      <h3 className="font-bold text-green-700 mb-2">Highly Active</h3>
                      <p className="text-3xl font-bold text-green-600 mb-2">20</p>
                      <p className="text-sm text-green-700">
                        States with IBEX scores from 0.70 to 1.00
                      </p>
                      <div className="mt-4 text-sm text-green-800">
                        <p className="mb-1">Top state: South Dakota (0.85)</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md">
                      <h3 className="font-bold text-blue-700 mb-2">Active</h3>
                      <p className="text-3xl font-bold text-blue-600 mb-2">17</p>
                      <p className="text-sm text-blue-700">
                        States with IBEX scores from 0.60 to 0.69
                      </p>
                      <div className="mt-4 text-sm text-blue-800">
                        <p className="mb-1">Including: California, Texas, New York</p>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-md">
                      <h3 className="font-bold text-orange-700 mb-2">Less Active</h3>
                      <p className="text-3xl font-bold text-orange-600 mb-2">13</p>
                      <p className="text-sm text-orange-700">
                        States with IBEX scores from 0.30 to 0.59
                      </p>
                      <div className="mt-4 text-sm text-orange-800">
                        <p className="mb-1">Lowest state: Alaska (0.30)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IBEXAnalysis;
