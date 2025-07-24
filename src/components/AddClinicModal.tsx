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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Building2,
  MapPin,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles
} from 'lucide-react';

// Form validation schemas for each step
const basicInfoSchema = z.object({
  name: z.string().min(2, 'Clinic name must be at least 2 characters'),
  type: z.string().min(1, 'Please select a clinic type'),
});

const locationInfoSchema = z.object({
  address: z.string().min(5, 'Please enter a complete address'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
});

const fullFormSchema = basicInfoSchema.and(locationInfoSchema);

type FormData = z.infer<typeof fullFormSchema>;

interface AddClinicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clinicData: any) => void;
}

const steps = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Clinic name and type',
    icon: Building2,
  },
  {
    id: 2,
    title: 'Location Details',
    description: 'Address information',
    icon: MapPin,
  },
  {
    id: 3,
    title: 'Review',
    description: 'Review and submit',
    icon: CheckCircle,
  }
];

const clinicTypes = [
  'General Practice',
  'Family Medicine',
  'Dental',
  'Cardiology',
  'Dermatology',
  'Orthopedics',
  'Pediatrics',
  'Ophthalmology',
  'Mental Health',
  'Urgent Care',
  'Specialty Clinic',
  'Other'
];

export default function AddClinicModal({ isOpen, onClose, onSubmit }: AddClinicModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(fullFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      type: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const watchedValues = form.watch();
  const progress = (currentStep / steps.length) * 100;

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'type'];
        break;
      case 2:
        fieldsToValidate = ['address', 'city', 'state', 'zipCode'];
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const clinicData = {
        ...data,
        id: Date.now(),
        status: 'pending',
        totalPlans: 0,
        monthlyRevenue: '$0',
        joinDate: new Date().toISOString().split('T')[0],
        location: `${data.city}, ${data.state}`
      };
      
      setIsSuccess(true);
      onSubmit(clinicData);
      
      // Reset form and close dialog after success animation
      setTimeout(() => {
        onClose();
        setCurrentStep(1);
        setIsSuccess(false);
        form.reset();
      }, 2500);
    } catch (error) {
      console.error('Error adding clinic:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(1);
    setIsSuccess(false);
    form.reset();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Sunrise Medical Center" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select clinic type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clinicTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Medical Center Dr" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Los Angeles" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="90210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-[#fefcf5] border border-[#e7e4db] rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Clinic Summary</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Clinic Name:</span>
                  <span className="font-medium text-gray-900">{watchedValues.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{watchedValues.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Address:</span>
                  <span className="font-medium text-gray-900 text-right">
                    {watchedValues.address}<br />
                    {watchedValues.city}, {watchedValues.state} {watchedValues.zipCode}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#84cc16]/10 border border-[#84cc16]/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-[#84cc16]" />
                <p className="text-sm font-medium text-gray-900">
                  Ready to add clinic
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                All information has been validated and the clinic is ready to be added.
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
        className="w-16 h-16 bg-[#84cc16] rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <CheckCircle className="w-8 h-8 text-white" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-2">Clinic Added Successfully!</h3>
        <p className="text-gray-600 mb-4">
          {watchedValues.name} has been added to your network.
        </p>
        <div className="bg-[#e9f9fb] rounded-lg p-3 inline-block">
          <p className="text-sm text-gray-700">
            Status: <span className="font-semibold text-[#1557f6]">Pending Approval</span>
          </p>
        </div>
      </motion.div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Add New Clinic
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
                          Adding...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Add Clinic
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