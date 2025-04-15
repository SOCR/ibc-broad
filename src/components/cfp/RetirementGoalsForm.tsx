
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";

interface RetirementGoalsFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function RetirementGoalsForm({ form }: RetirementGoalsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Goals</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="retirementMonthlyIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desired Monthly Income in Retirement ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="retirementSavingRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Retirement Savings ($)</FormLabel>
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
