
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

interface DebtsFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function DebtsForm({ form }: DebtsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Debts</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="mortgageDebt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mortgage ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="studentLoanDebt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Loans ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="carLoanDebt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Loans ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="creditCardDebt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credit Cards ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="otherDebt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Debts ($)</FormLabel>
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
