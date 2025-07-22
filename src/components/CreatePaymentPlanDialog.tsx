'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  CreditCard,
  User,
  DollarSign,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  FileText,
  Building2,
  Phone,
  Mail,
  MapPin,
  Calculator,
  Sparkles
} from 'lucide-react';

// Form validation schemas for each step
const patientInfoSchema = z.object({
  patientName: z.string().min(2, 'Patient name must be at least 2 characters'),
  patientEmail: z.string().email('Please enter a valid email address'),
  patientPhone: z.string().min(10, 'Please enter a valid phone number'),
  patientAddress: z.string().min(5, 'Please enter a complete address'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

const treatmentInfoSchema = z.object({
  clinicId: z.string().min(1, 'Please select a clinic'),
  treatmentType: z.string().min(1, 'Please select a treatment type'),
  treatmentDescription: z.string().optional(),
  totalAmount: z.number().min(1, 'Amount must be greater than 0'),
  downPayment: z.number().min(0, 'Down payment cannot be negative').optional(),
});

const paymentPlanSchema = z.object({
  planDuration: z.string().min(1, 'Please select a plan duration'),
  interestRate: z.number().min(0, 'Interest rate cannot be negative'),
  firstPaymentDate: z.string().min(1, 'First payment date is required'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
});

const fullFormSchema = patientInfoSchema.and(treatmentInfoSchema).and(paymentPlanSchema);

type FormData = z.infer<typeof fullFormSchema>;

interface CreatePaymentPlanDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: (data: FormData) => void;
}

const steps = [
  {
    id: 1,
    title: 'Patient Information',
    description: 'Enter patient details',
    icon: User,
  },
  {
    id: 2,
    title: 'Treatment Details',
    description: 'Treatment and cost info',
    icon: FileText,
  },
  {
    id: 3,
    title: 'Payment Plan',
    description: 'Configure payment terms',
    icon: Calendar,
  },
  {
    id: 4,
    title: 'Review',
    description: 'Review and submit',
    icon: CheckCircle,
  }
];

const clinics = [
  { id: '1', name: 'Sunrise Medical Center', location: 'Los Angeles, CA' },
  { id: '2', name: 'Valley Health Clinic', location: 'Phoenix, AZ' },
  { id: '3', name: 'Metro Dental Care', location: 'Denver, CO' },
  { id: '4', name: 'Family Health Partners', location: 'Austin, TX' },
];

const treatmentTypes = [
  'Dental Implants',
  'Orthodontic Treatment',
  'Root Canal',
  'Crown/Bridge',
  'Cosmetic Surgery',
  'Cardiac Procedure',
  'Orthopedic Surgery',
  'Physical Therapy',
  'Diagnostic Testing',
  'Other'
];

const planDurations = [
  { value: '6', label: '6 months', rate: 0 },
  { value: '12', label: '12 months', rate: 2.9 },
  { value: '18', label: '18 months', rate: 4.9 },
  { value: '24', label: '24 months', rate: 6.9 },
];

export default function CreatePaymentPlanDialog({ trigger, onSuccess }: CreatePaymentPlanDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(fullFormSchema),
    mode: 'onChange',
    defaultValues: {
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      patientAddress: '',
      dateOfBirth: '',
      clinicId: '',
      treatmentType: '',
      treatmentDescription: '',
      totalAmount: 0,
      downPayment: 0,
      planDuration: '',
      interestRate: 0,
      firstPaymentDate: '',
      paymentMethod: '',
    },
  });

  const watchedValues = form.watch();
  const progress = (currentStep / steps.length) * 100;

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = (watchedValues.totalAmount || 0) - (watchedValues.downPayment || 0);
    const months = parseInt(watchedValues.planDuration || '6');
    const rate = watchedValues.interestRate / 100 / 12;
    
    if (rate === 0) return principal / months;
    
    return principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  };

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['patientName', 'patientEmail', 'patientPhone', 'patientAddress', 'dateOfBirth'];
        break;
      case 2:
        fieldsToValidate = ['clinicId', 'treatmentType', 'totalAmount'];
        break;
      case 3:
        fieldsToValidate = ['planDuration', 'firstPaymentDate', 'paymentMethod'];
        break;
      default:
        return true;
    }
    
    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      onSuccess?.(data);
      
      // Reset form and close dialog after success animation
      setTimeout(() => {
        setOpen(false);
        setCurrentStep(1);
        setIsSuccess(false);
        form.reset();
      }, 3000);
    } catch (error) {
      console.error('Error creating payment plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="patientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.smith@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="123 Main St, Anytown, CA 12345" 
                      {...field}
                      className="min-h-[60px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="clinicId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Clinic</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a clinic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clinics.map((clinic) => (
                        <SelectItem key={clinic.id} value={clinic.id}>
                          <div>
                            <div className="font-medium">{clinic.name}</div>
                            <div className="text-sm text-gray-500">{clinic.location}</div>
                          </div>
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
              name="treatmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatment Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select treatment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {treatmentTypes.map((treatment) => (
                        <SelectItem key={treatment} value={treatment}>
                          {treatment}
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
              name="treatmentDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatment Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional details about the treatment..." 
                      {...field}
                      className="min-h-[60px]"
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Provide additional context
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
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
                name="downPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Down Payment</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Amount paid upfront
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="planDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Plan Duration</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      const selectedPlan = planDurations.find(p => p.value === value);
                      if (selectedPlan) {
                        form.setValue('interestRate', selectedPlan.rate);
                      }
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose payment duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {planDurations.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{plan.label}</span>
                            <Badge variant="secondary" className="ml-2">
                              {plan.rate}% APR
                            </Badge>
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
                name="firstPaymentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Payment Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date"
                        {...field}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="debit_card">Debit Card</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="auto_pay">Auto Pay</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Payment Calculation Preview */}
            {watchedValues.totalAmount > 0 && watchedValues.planDuration && (
              <div className="bg-[#e9f9fb] border border-[#1557f6]/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Calculator className="w-5 h-5 text-[#1557f6]" />
                  <h4 className="font-medium text-gray-900">Payment Calculation</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Amount:</p>
                    <p className="font-semibold text-gray-900">${watchedValues.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Down Payment:</p>
                    <p className="font-semibold text-gray-900">${(watchedValues.downPayment || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Financed Amount:</p>
                    <p className="font-semibold text-gray-900">
                      ${((watchedValues.totalAmount || 0) - (watchedValues.downPayment || 0)).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Monthly Payment:</p>
                    <p className="font-bold text-[#84cc16] text-lg">
                      ${calculateMonthlyPayment().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-[#fefcf5] border border-[#e7e4db] rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Payment Plan Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Patient</p>
                    <p className="font-medium text-gray-900">{watchedValues.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Treatment</p>
                    <p className="font-medium text-gray-900">{watchedValues.treatmentType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clinic</p>
                    <p className="font-medium text-gray-900">
                      {clinics.find(c => c.id === watchedValues.clinicId)?.name}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium text-gray-900">${watchedValues.totalAmount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Plan Duration</p>
                    <p className="font-medium text-gray-900">
                      {planDurations.find(p => p.value === watchedValues.planDuration)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                    <p className="font-bold text-[#84cc16] text-lg">
                      ${calculateMonthlyPayment().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#84cc16]/10 border border-[#84cc16]/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-[#84cc16]" />
                <p className="text-sm font-medium text-gray-900">
                  Ready to create payment plan
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                All information has been validated and the plan is ready to be created.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSuccessState = () => (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-[#84cc16] rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-white" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Plan Created!</h3>
        <p className="text-gray-600 mb-4">
          The payment plan for {watchedValues.patientName} has been successfully created.
        </p>
        <div className="bg-[#e9f9fb] rounded-lg p-4 inline-block">
          <p className="text-sm text-gray-700">
            Plan ID: <span className="font-mono font-semibold">PMT-{Date.now()}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-[#84cc16] hover:bg-[#65a30d] text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Create Payment Plan
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Create Payment Plan
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.description}
              </DialogDescription>
              
              {/* Progress Bar */}
              <div className="space-y-2 pt-2">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-between pt-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300
                        ${isCompleted 
                          ? 'bg-[#84cc16] text-white' 
                          : isActive 
                          ? 'bg-[#1557f6] text-white' 
                          : 'bg-gray-200 text-gray-400'
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`
                          w-8 h-0.5 mx-1 transition-colors duration-300
                          ${isCompleted ? 'bg-[#84cc16]' : 'bg-gray-200'}
                        `} />
                      )}
                    </div>
                  );
                })}
              </div>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    size="sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#1557f6] hover:bg-[#1557f6]/90 text-white"
                      size="sm"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#84cc16] hover:bg-[#65a30d] text-white"
                      size="sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Create Plan
                        </>
                      )}
                    </Button>
                  )}
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