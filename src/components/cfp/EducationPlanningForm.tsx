
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";

interface EducationPlanningFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function EducationPlanningForm({ form }: EducationPlanningFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education Planning</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="children"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Children</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="yearsUntilCollege"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years Until College (separate by commas)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 5, 10, 15" {...field} />
              </FormControl>
              <FormDescription>
                Enter years for each child separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="estimatedCostPerYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Cost per Year ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="educationSavingRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Education Savings ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
