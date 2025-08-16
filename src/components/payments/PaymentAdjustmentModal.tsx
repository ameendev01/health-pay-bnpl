'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DollarSign,
  CheckCircle,
  Loader2,
  AlertTriangle,
  X
} from 'lucide-react';

const adjustmentSchema = z.object({
  adjustmentType: z.enum(['refund', 'credit', 'debit', 'fee_waiver', 'discount'], {
    required_error: 'Please select an adjustment type',
  }),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  reason: z.string().min(10, 'Please provide a detailed reason (minimum 10 characters)'),
  patientId: z.string().min(1, 'Please select a patient'),
  paymentPlanId: z.string().optional(),
  notes: z.string().optional(),
});

type AdjustmentFormData = z.infer<typeof adjustmentSchema>;

interface PaymentAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (adjustmentData: AdjustmentFormData) => void;
}

const adjustmentTypes = [
  { value: 'refund', label: 'Refund', description: 'Return money to patient' },
  { value: 'credit', label: 'Credit', description: 'Apply credit to account' },
  { value: 'debit', label: 'Debit', description: 'Charge additional amount' },
  { value: 'fee_waiver', label: 'Fee Waiver', description: 'Waive late fees or charges' },
  { value: 'discount', label: 'Discount', description: 'Apply discount to balance' },
];

export default function PaymentAdjustmentModal({ isOpen, onClose, onSubmit }: PaymentAdjustmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<AdjustmentFormData>({
    resolver: zodResolver(adjustmentSchema),
    defaultValues: {
      adjustmentType: undefined,
      amount: 0,
      reason: '',
      patientId: '',
      paymentPlanId: '',
      notes: '',
    },
  });

  const watchedValues = form.watch();

  const handleSubmit = async (data: AdjustmentFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      onSubmit(data);
      
      // Reset and close after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        form.reset();
      }, 2500);
    } catch (error) {
      console.error('Error processing adjustment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setIsSuccess(false);
    form.reset();
  };

  const renderSuccessState = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Adjustment Processed Successfully!</h3>
      <p className="text-gray-600 mb-4">
        {watchedValues.adjustmentType?.charAt(0).toUpperCase() + watchedValues.adjustmentType?.slice(1)} of ${watchedValues.amount} has been processed.
      </p>
      <div className="bg-blue-50 rounded-lg p-3 inline-block">
        <p className="text-sm text-gray-700">
          Adjustment ID: <span className="font-semibold text-blue-600">ADJ-{Date.now()}</span>
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Process Payment Adjustment</span>
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Create a refund, credit, or other financial adjustment
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="adjustmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adjustment Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select adjustment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {adjustmentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-sm text-gray-500">{type.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="patientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select patient" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PAT-001">John Smith</SelectItem>
                            <SelectItem value="PAT-002">Sarah Johnson</SelectItem>
                            <SelectItem value="PAT-003">Michael Davis</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Adjustment</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide a detailed explanation for this adjustment..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional notes or documentation..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Approval Warning */}
                {watchedValues.amount > 500 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Manager Approval Required</p>
                        <p className="text-sm text-yellow-700">
                          Adjustments over $500 require manager approval before processing.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Process Adjustment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          renderSuccessState()
        )}
      </DialogContent>
    </Dialog>
  );
}