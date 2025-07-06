
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { addPaymentPlanSchema } from "./schemas";

interface AddPaymentPlanFormProps {
  onSuccess: () => void;
}

export default function AddPaymentPlanForm({ onSuccess }: AddPaymentPlanFormProps) {
  const form = useForm<z.infer<typeof addPaymentPlanSchema>>({
    resolver: zodResolver(addPaymentPlanSchema),
    defaultValues: {
      planName: "",
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof addPaymentPlanSchema>) {
    console.log(values);
    // Here you would typically send data to your backend
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="planName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name</FormLabel>
              <FormControl>
                <Input placeholder="Basic Plan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="100" {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
