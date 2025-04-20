
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartBar, Globe, BookOpen, Wallet } from "lucide-react";

const quickStats = [
  { title: "Markets Analyzed", value: "30+", icon: <ChartBar className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
  { title: "Countries Covered", value: "175", icon: <Globe className="h-5 w-5" />, color: "bg-green-100 text-green-600" },
  { title: "Courses Available", value: "10", icon: <BookOpen className="h-5 w-5" />, color: "bg-amber-100 text-amber-600" },
  { title: "Financial Tools", value: "12", icon: <Wallet className="h-5 w-5" />, color: "bg-purple-100 text-purple-600" }
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {quickStats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div className={`rounded-full p-2 ${stat.color}`}>
              {stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
