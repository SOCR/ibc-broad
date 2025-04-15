
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";

interface RiskToleranceFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function RiskToleranceForm({ form }: RiskToleranceFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Tolerance</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="riskTolerance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Risk Tolerance</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="low" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Low Risk - Emphasis on preserving capital with modest returns
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="medium" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Medium Risk - Balance between growth and stability
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="high" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      High Risk - Focus on growth with higher volatility
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
