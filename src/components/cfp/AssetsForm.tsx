
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

interface AssetsFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function AssetsForm({ form }: AssetsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="cashAssets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cash & Equivalents ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="investmentAssets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investments ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="realEstateAssets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Real Estate ($)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="otherAssets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Assets ($)</FormLabel>
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
