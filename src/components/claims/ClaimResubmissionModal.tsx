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
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Loader2,
  FileText,
  X
} from 'lucide-react';
import { Claim } from '@/features/claims/types';

const resubmissionSchema = z.object({
  denialReason: z.string().min(1, 'Please select a denial reason'),
  correctionsMade: z.string().min(10, 'Please describe the corrections made (minimum 10 characters)'),
  procedureCodes: z.string().min(1, 'Procedure codes are required'),
  diagnosisCodes: z.string().min(1, 'Diagnosis codes are required'),
  totalAmount: z.number().min(0.01, 'Amount must be greater than 0'),
  additionalDocumentation: z.string().optional(),
});

type ResubmissionFormData = z.infer<typeof resubmissionSchema>;

interface ClaimResubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim | null;
  onResubmit: (resubmissionData: any) => void;
}

const commonDenialReasons = [
  'Prior Authorization Required',
  'Duplicate Claim',
  'Medical Necessity Not Established',
  'Incorrect Patient Information',
  'Incorrect Provider Information',
  'Invalid Procedure Code',
  'Invalid Diagnosis Code',
  'Services Not Covered',
  'Timely Filing Limit Exceeded',
  'Other'
];

export default function ClaimResubmissionModal({ isOpen, onClose, claim, onResubmit }: ClaimResubmissionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResubmissionFormData>({
    resolver: zodResolver(resubmissionSchema),
    defaultValues: {
      denialReason: '',
      correctionsMade: '',
      procedureCodes: claim?.procedureCodes.join(', ') || '',
      diagnosisCodes: claim?.diagnosisCodes.join(', ') || '',
      totalAmount: claim?.totalAmount || 0,
      additionalDocumentation: '',
    },
  });

  const handleSubmit = async (data: ResubmissionFormData) => {
    if (!claim) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const resubmissionData = {
        originalClaimId: claim.id,
        ...data,
        procedureCodes: data.procedureCodes.split(',').map(code => code.trim()),
        diagnosisCodes: data.diagnosisCodes.split(',').map(code => code.trim()),
        resubmittedAt: new Date().toISOString(),
      };
      
      setIsSuccess(true);
      onResubmit(resubmissionData);
      
      // Reset and close after success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error('Error resubmitting claim:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setIsSuccess(false);
    form.reset();
  };

  if (!claim) return null;

  const renderSuccessState = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Claim Resubmitted Successfully!</h3>
      <p className="text-gray-600 mb-4">
        Claim {claim.claimNumber} has been resubmitted with corrections.
      </p>
      <div className="bg-blue-50 rounded-lg p-3 inline-block">
        <p className="text-sm text-gray-700">
          New Claim ID: <span className="font-semibold text-blue-600">CLM-{Date.now()}</span>
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <span>Resubmit Claim</span>
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Correct and resubmit denied claim {claim.claimNumber}
              </DialogDescription>
            </DialogHeader>

            {/* Denial Alert */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <h4 className="font-semibold text-red-800">Claim Denied</h4>
                  <p className="text-sm text-red-700">
                    This claim was denied and requires corrections before resubmission.
                  </p>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="denialReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Denial Reason</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the reason for denial" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {commonDenialReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="correctionsMade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Corrections Made</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the specific corrections made to address the denial reason..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="procedureCodes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Procedure Codes</FormLabel>
                        <FormControl>
                          <Input placeholder="99213, 99214" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diagnosisCodes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis Codes</FormLabel>
                        <FormControl>
                          <Input placeholder="Z00.00, M25.511" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount</FormLabel>
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

                <FormField
                  control={form.control}
                  name="additionalDocumentation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Documentation</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional documentation or notes to include with the resubmission..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Resubmitting...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resubmit Claim
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