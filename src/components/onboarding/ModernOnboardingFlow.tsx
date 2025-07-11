"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Building2,
  CreditCard,
  FileText,
  MapPin,
  Stethoscope,
  User,
  Users,
  CircleCheck,
  ChevronDown,
} from "lucide-react";
import {
  onboardingSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  step8Schema,
  step9Schema,
  step10Schema,
} from "./schemas";
import { useState } from "react";

// Compact Progress Card Component
function ProgressCard({ currentStep = 5 }: { currentStep?: number }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Practice type",
      range: [1], // Step 1
    },
    {
      id: 2,
      title: "Clinic Info",
      range: [2, 3, 4, 5, 6, 7], // Steps 2-7
    },
    {
      id: 3,
      title: "Banking Details",
      range: [8, 9, 10], // Steps 8-10
    },
  ];

  const getGroupProgress = (stepGroup: any) => {
    const totalSteps = stepGroup.range.length;
    const completedSteps = stepGroup.range.filter(
      (step: number) => currentStep > step
    ).length;
    const currentStepInGroup = stepGroup.range.includes(currentStep);

    if (completedSteps === totalSteps) return 100;
    if (currentStepInGroup)
      return Math.round(((completedSteps + 0.5) / totalSteps) * 100);
    return Math.round((completedSteps / totalSteps) * 100);
  };

  const getStepStatus = (stepGroup: any) => {
    const progress = getGroupProgress(stepGroup);
    if (progress === 100) return "completed";
    if (progress > 0) return "current";
    return "pending";
  };

  // Compact Segmented Progress Bar
  const CompactProgressBar = ({
    progress,
    segments = 45,
  }: {
    progress: number;
    segments?: number;
  }) => {
    const filledSegments = Math.round((progress / 100) * segments);

    return (
      <div className="flex gap-0.5 w-full">
        {Array.from({ length: segments }, (_, index) => (
          <div
            key={index}
            className={`h-6 flex-1 rounded-full transition-all duration-300 ${
              index < filledSegments
                ? "bg-gradient-to-r from-orange-400 to-yellow-400"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  // Enhanced Circular Progress Component
  const CircularProgress = ({
    progress,
    size = 72,
  }: {
    progress: number;
    size?: number;
  }) => {
    const radius = (size - 12) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          className="transform -rotate-90 absolute"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(229, 231, 235)"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgb(251, 146, 60)" />
              <stop offset="100%" stopColor="rgb(250, 204, 21)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-gray-900">{progress}%</span>
        </div>
      </div>
    );
  };

  const overallProgress = Math.round((currentStep / 10) * 100);

  const toggleCollapse = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setIsCollapsed(!isCollapsed);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="fixed right-8 bottom-8 z-50">
      {/* Container with fixed positioning for both states */}
      <div className="relative">
        {/* Collapsed State - Always rendered with opacity control */}
        <div
          className={`
            absolute bottom-0 right-0 bg-white shadow-xl border border-gray-200 cursor-pointer
            w-16 h-16 rounded-full flex items-center justify-center
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            hover:shadow-2xl hover:scale-105
            ${
              isCollapsed
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-75 pointer-events-none"
            }
            ${isTransitioning ? "pointer-events-none" : ""}
          `}
          onClick={isCollapsed ? toggleCollapse : undefined}
          style={{
            transform: isCollapsed ? "scale(1)" : "scale(0.75)",
            transformOrigin: "center",
            zIndex: isCollapsed ? 10 : 5,
          }}
        >
          <CircularProgress progress={overallProgress} size={72} />
        </div>

        {/* Expanded State - Always rendered with opacity control */}
        <div
          className={`
            bg-white shadow-xl border border-gray-200 rounded-xl w-64
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            hover:shadow-lg
            ${
              isCollapsed
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-100 scale-100 pointer-events-auto"
            }
            ${isTransitioning ? "pointer-events-none" : ""}
          `}
          style={{
            transform: isCollapsed
              ? "scale(0.95) translateY(8px)"
              : "scale(1) translateY(0px)",
            transformOrigin: "bottom right",
            zIndex: isCollapsed ? 5 : 10,
          }}
        >
          <div className="p-3">
            {/* Compact Header */}
            <div className="flex items-center gap-2 mb-3">
              {/* <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <CircleCheck className="w-3.5 h-3.5 text-white" />
              </div> */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  Onboarding Progress
                </h3>
                <p className="text-xs text-gray-500">
                  {overallProgress}% complete
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCollapse();
                }}
                className={`
                  p-1 hover:bg-gray-100 rounded-md transition-all duration-300 flex-shrink-0
                  ${isTransitioning ? "pointer-events-none" : ""}
                `}
                disabled={isTransitioning}
              >
                <ChevronDown
                  className={`
                    w-4 h-4 text-gray-500 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isCollapsed ? "rotate-180" : "rotate-0"}
                  `}
                />
              </button>
            </div>

            {/* Overall Progress Bar */}
            <div className="mb-3">
              <CompactProgressBar progress={overallProgress} segments={45} />
            </div>

            {/* Compact Steps */}
            <div className="space-y-2">
              {steps.map((step, index) => {
                const progress = getGroupProgress(step);
                const status = getStepStatus(step);

                return (
                  <div
                    key={step.id}
                    className={`
                      flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${
                        isCollapsed
                          ? "opacity-0 transform translate-x-4"
                          : "opacity-100 transform translate-x-0"
                      }
                    `}
                    style={{
                      transitionDelay: isCollapsed
                        ? "0ms"
                        : `${200 + index * 100}ms`,
                    }}
                  >
                    {/* Compact Checkmark */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        status === "completed"
                          ? "bg-green-500 text-white"
                          : status === "current"
                          ? "bg-blue-100 text-gray-400 ring-1 ring-blue-200"
                          : "bg-gray-100 text-gray-300"
                      }`}
                    >
                      <CircleCheck
                        className={`w-3 h-3 transition-all duration-300 ${
                          status === "completed"
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      />
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-medium truncate ${
                            status === "completed"
                              ? "text-green-700"
                              : status === "current"
                              ? "text-blue-700"
                              : "text-gray-600"
                          }`}
                        >
                          {step.title}
                        </span>
                        {status === "current" && (
                          <span className="text-xs text-blue-600 font-medium ml-1">
                            {progress}%
                          </span>
                        )}
                        {/* {status === "completed" && (
                          <CircleCheck className="w-3 h-3 text-green-500 ml-1 flex-shrink-0" />
                        )} */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compact Footer */}
            <div
              className={`
                mt-3 pt-2 border-t border-gray-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${
                  isCollapsed
                    ? "opacity-0 transform translate-y-2"
                    : "opacity-100 transform translate-y-0"
                }
              `}
              style={{
                transitionDelay: isCollapsed ? "0ms" : "400ms",
              }}
            >
              <div className="flex justify-between text-xs text-gray-500">
                <span>Step {currentStep}/10</span>
                <span>{10 - currentStep} left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { id: 1, title: "Business Type", icon: Building2, schema: step1Schema },
  { id: 2, title: "Legal Identity", icon: FileText, schema: step2Schema },
  {
    id: 3,
    title: "Clinic Credentials",
    icon: Stethoscope,
    schema: step3Schema,
  },
  { id: 4, title: "Primary Location", icon: MapPin, schema: step4Schema },
  { id: 5, title: "Operating Profile", icon: Users, schema: step5Schema },
  { id: 6, title: "EHR/PMS Stack", icon: FileText, schema: step6Schema },
  { id: 7, title: "Point of Contact", icon: User, schema: step7Schema },
  { id: 8, title: "Banking Setup", icon: CreditCard, schema: step8Schema },
  { id: 9, title: "Identity Verification", icon: User, schema: step9Schema },
  { id: 10, title: "Agreements", icon: FileText, schema: step10Schema },
];

type OnboardingData = z.infer<typeof onboardingSchema>;

type StepProps = {
  form: any;
};

const Step1 = ({ form }: StepProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const businessType = watch("businessType");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Setup</h2>
        <p className="text-muted-foreground">
          Select the option that best describes your practice
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {/* Single Clinic Card */}
        <div
          className={`relative p-5 bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
            businessType === "single"
              ? "border-blue-500 shadow-md ring-2 ring-blue-100"
              : "border-gray-200 hover:border-blue-300"
          }`}
          onClick={() =>
            setValue("businessType", "single", { shouldValidate: true })
          }
        >
          {businessType === "single" && (
            <CircleCheck className="absolute top-3 right-3 w-5 h-5 text-blue-500" />
          )}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Single Clinic
              </h3>
              <p className="text-sm text-gray-600">
                Independent practice solution
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">Quick 5-minute setup</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-gray-700">Simple patient management</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="text-gray-700">Basic reporting & analytics</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">Cost-effective pricing</span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-800">Best for:</span> Solo
              practitioners, small clinics
            </p>
          </div>
        </div>

        {/* Multiple Clinics Card */}
        <div
          className={`relative p-5 bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
            businessType === "brand"
              ? "border-emerald-500 shadow-md ring-2 ring-emerald-100"
              : "border-gray-200 hover:border-emerald-300"
          }`}
          onClick={() =>
            setValue("businessType", "brand", { shouldValidate: true })
          }
        >
          {businessType === "brand" && (
            <CircleCheck className="absolute top-3 right-3 w-5 h-5 text-emerald-500" />
          )}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Multiple Clinics
              </h3>
              <p className="text-sm text-gray-600">
                Enterprise healthcare solution
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-emerald-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v1h12V6H4zm0 3v5h12v-5H4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">Multi-location management</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-emerald-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span className="text-gray-700">Advanced team controls</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-emerald-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="text-gray-700">Comprehensive analytics</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-emerald-500 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">Role-based permissions</span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              <span className="font-medium text-gray-800">Best for:</span>{" "}
              Healthcare chains, medical groups
            </p>
          </div>
        </div>
      </div>
      {errors.businessType && (
        <p className="text-red-500 text-sm text-center mt-2">
          {(errors.businessType as any).message}
        </p>
      )}
    </div>
  );
};

const Step2 = ({ form }: StepProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Legal Identity</h2>
        <p className="text-muted-foreground">
          Required for FinCEN "Know Your Business" compliance
        </p>
      </div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
          <Input
            id="legalBusinessName"
            {...register("legalBusinessName")}
            placeholder="Enter your legal business name"
          />
          {errors.legalBusinessName && (
            <p className="text-red-500 text-sm">
              {(errors.legalBusinessName as any).message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dba">DBA (Doing Business As)</Label>
          <Input
            id="dba"
            {...register("dba")}
            placeholder="Enter DBA if different from legal name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ein">EIN / Tax-ID *</Label>
          <Controller
            name="ein"
            control={control}
            render={({ field }) => (
              <Input
                id="ein"
                placeholder="XX-XXXXXXX"
                maxLength={10}
                {...field}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  let formattedValue = value;
                  if (value.length > 2) {
                    formattedValue = `${value.slice(0, 2)}-${value.slice(
                      2,
                      9
                    )}`;
                  }
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
          {errors.ein && (
            <p className="text-red-500 text-sm">
              {(errors.ein as any).message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="entityType">Entity Type *</Label>
          <Controller
            name="entityType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="llc">LLC</SelectItem>
                  <SelectItem value="s-corp">S-Corporation</SelectItem>
                  <SelectItem value="c-corp">C-Corporation</SelectItem>
                  <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.entityType && (
            <p className="text-red-500 text-sm">
              {(errors.entityType as any).message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Step3 = ({ form }: StepProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Clinic Credentials</h2>
        <p className="text-muted-foreground">
          Required to verify your clinic is authorized to provide healthcare
        </p>
      </div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="medicalLicenseNumber">
            State Medical License # *
          </Label>
          <Input
            id="medicalLicenseNumber"
            {...register("medicalLicenseNumber")}
            placeholder="Enter license number"
          />
          {errors.medicalLicenseNumber && (
            <p className="text-red-500 text-sm">
              {(errors.medicalLicenseNumber as any).message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Or facility license # for dental/vision
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="npi">NPI of Supervising Physician *</Label>
          <Input
            id="npi"
            {...register("npi")}
            placeholder="10-digit NPI number"
            maxLength={10}
            onChange={(e) => {
              const { value } = e.target;
              e.target.value = value.replace(/\D/g, "");
            }}
          />
          {errors.npi && (
            <p className="text-red-500 text-sm">
              {(errors.npi as any).message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date *</Label>
            <Input id="expiryDate" type="date" {...register("expiryDate")} />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">
                {(errors.expiryDate as any).message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="stateOfIssuance">State of Issuance *</Label>
            <Controller
              name="stateOfIssuance"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="AR">Arkansas</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="CO">Colorado</SelectItem>
                    <SelectItem value="CT">Connecticut</SelectItem>
                    <SelectItem value="DE">Delaware</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="HI">Hawaii</SelectItem>
                    <SelectItem value="ID">Idaho</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="IN">Indiana</SelectItem>
                    <SelectItem value="IA">Iowa</SelectItem>
                    <SelectItem value="KS">Kansas</SelectItem>
                    <SelectItem value="KY">Kentucky</SelectItem>
                    <SelectItem value="LA">Louisiana</SelectItem>
                    <SelectItem value="ME">Maine</SelectItem>
                    <SelectItem value="MD">Maryland</SelectItem>
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="MI">Michigan</SelectItem>
                    <SelectItem value="MN">Minnesota</SelectItem>
                    <SelectItem value="MS">Mississippi</SelectItem>
                    <SelectItem value="MO">Missouri</SelectItem>
                    <SelectItem value="MT">Montana</SelectItem>
                    <SelectItem value="NE">Nebraska</SelectItem>
                    <SelectItem value="NV">Nevada</SelectItem>
                    <SelectItem value="NH">New Hampshire</SelectItem>
                    <SelectItem value="NJ">New Jersey</SelectItem>
                    <SelectItem value="NM">New Mexico</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="NC">North Carolina</SelectItem>
                    <SelectItem value="ND">North Dakota</SelectItem>
                    <SelectItem value="OH">Ohio</SelectItem>
                    <SelectItem value="OK">Oklahoma</SelectItem>
                    <SelectItem value="OR">Oregon</SelectItem>
                    <SelectItem value="PA">Pennsylvania</SelectItem>
                    <SelectItem value="RI">Rhode Island</SelectItem>
                    <SelectItem value="SC">South Carolina</SelectItem>
                    <SelectItem value="SD">South Dakota</SelectItem>
                    <SelectItem value="TN">Tennessee</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="UT">Utah</SelectItem>
                    <SelectItem value="VT">Vermont</SelectItem>
                    <SelectItem value="VA">Virginia</SelectItem>
                    <SelectItem value="WA">Washington</SelectItem>
                    <SelectItem value="WV">West Virginia</SelectItem>
                    <SelectItem value="WI">Wisconsin</SelectItem>
                    <SelectItem value="WY">Wyoming</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.stateOfIssuance && (
              <p className="text-red-500 text-sm">
                {(errors.stateOfIssuance as any).message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step4 = ({ form }: StepProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Primary Location</h2>
        <p className="text-muted-foreground">
          Required for state-law compliance and fraud prevention
        </p>
      </div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="streetAddress">Street Address *</Label>
          <Input
            id="streetAddress"
            {...register("streetAddress")}
            placeholder="Enter street address"
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm">
              {(errors.streetAddress as any).message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="suite">Suite/Unit</Label>
          <Input
            id="suite"
            {...register("suite")}
            placeholder="Suite, unit, or floor"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code *</Label>
            <Input id="zipCode" {...register("zipCode")} placeholder="12345" />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">
                {(errors.zipCode as any).message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    let formattedValue = "";
                    if (value.length > 0) {
                      formattedValue = "(" + value.substring(0, 3);
                    }
                    if (value.length > 3) {
                      formattedValue += ") " + value.substring(3, 6);
                    }
                    if (value.length > 6) {
                      formattedValue += "-" + value.substring(6, 10);
                    }
                    field.onChange(formattedValue);
                  }}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">
                {(errors.phone as any).message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeZone">Time Zone *</Label>
          <Controller
            name="timeZone"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PST">Pacific (PST)</SelectItem>
                  <SelectItem value="MST">Mountain (MST)</SelectItem>
                  <SelectItem value="CST">Central (CST)</SelectItem>
                  <SelectItem value="EST">Eastern (EST)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.timeZone && (
            <p className="text-red-500 text-sm">
              {(errors.timeZone as any).message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Step5 = ({ form }: StepProps) => {
  const {
    control,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Operating Profile</h2>
        <p className="text-muted-foreground">
          Helps us understand your practice for underwriting
        </p>
      </div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="medicalSpecialty">Medical Specialty *</Label>
          <Controller
            name="medicalSpecialty"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Practice</SelectItem>
                  <SelectItem value="dental">Dental</SelectItem>
                  <SelectItem value="vision">Vision/Optometry</SelectItem>
                  <SelectItem value="cosmetic">Cosmetic Surgery</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="orthopedic">Orthopedic</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.medicalSpecialty && (
            <p className="text-red-500 text-sm">
              {(errors.medicalSpecialty as any).message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceRange">Typical Procedure Price Range *</Label>
          <Controller
            name="priceRange"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-500">Under $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                  <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="over-10000">Over $10,000</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.priceRange && (
            <p className="text-red-500 text-sm">
              {(errors.priceRange as any).message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyVolume">
            Average Monthly Patient Volume *
          </Label>
          <Controller
            name="monthlyVolume"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50">Under 50 patients</SelectItem>
                  <SelectItem value="50-100">50-100 patients</SelectItem>
                  <SelectItem value="100-250">100-250 patients</SelectItem>
                  <SelectItem value="250-500">250-500 patients</SelectItem>
                  <SelectItem value="over-500">Over 500 patients</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.monthlyVolume && (
            <p className="text-red-500 text-sm">
              {(errors.monthlyVolume as any).message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Step6 = ({ form }: StepProps) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;
  const ehrVendor = watch("ehrVendor");
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">EHR/PMS Stack</h2>
        <p className="text-muted-foreground">
          Helps us understand integration complexity
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ehrVendor">EHR Vendor *</Label>
          <Controller
            name="ehrVendor"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your EHR system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="athena">Athena Health</SelectItem>
                  <SelectItem value="drchrono">DrChrono</SelectItem>
                  <SelectItem value="nextgen">NextGen</SelectItem>
                  <SelectItem value="allscripts">Allscripts</SelectItem>
                  <SelectItem value="practice-fusion">
                    Practice Fusion
                  </SelectItem>
                  <SelectItem value="kareo">Kareo</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="none">No EHR System</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.ehrVendor && (
            <p className="text-red-500 text-sm">
              {(errors.ehrVendor as any).message}
            </p>
          )}
        </div>
        {ehrVendor === "other" && (
          <div className="space-y-2">
            <Label htmlFor="otherEhr">Please specify your EHR system</Label>
            <Input
              id="otherEhr"
              {...register("otherEhr")}
              placeholder="Enter your EHR system name"
            />
            {errors.otherEhr && (
              <p className="text-red-500 text-sm">
                {(errors.otherEhr as any).message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Step7 = ({ form }: StepProps) => {
  const {
    register,
    formState: { errors },
    control,
  } = form;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Point of Contact</h2>
        <p className="text-muted-foreground">
          Required for contractual communications and notices
        </p>
      </div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner/Manager Name *</Label>
          <Input
            id="ownerName"
            {...register("ownerName")}
            placeholder="Enter full name"
          />
          {errors.ownerName && (
            <p className="text-red-500 text-sm">
              {(errors.ownerName as any).message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="workEmail">Work Email *</Label>
          <Input
            id="workEmail"
            type="email"
            {...register("workEmail")}
            placeholder="email@clinic.com"
          />
          {errors.workEmail && (
            <p className="text-red-500 text-sm">
              {(errors.workEmail as any).message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <Input
                  id="mobile"
                  placeholder="(555) 123-4567"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    let formattedValue = "";
                    if (value.length > 0) {
                      formattedValue = "(" + value.substring(0, 3);
                    }
                    if (value.length > 3) {
                      formattedValue += ") " + value.substring(3, 6);
                    }
                    if (value.length > 6) {
                      formattedValue += "-" + value.substring(6, 10);
                    }
                    field.onChange(formattedValue);
                  }}
                />
              )}
            />
          {errors.mobile && (
            <p className="text-red-500 text-sm">
              {(errors.mobile as any).message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Step8 = ({ form }: StepProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Banking Setup</h2>
        <p className="text-muted-foreground">
          Connect your payout account for receiving funds
        </p>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-900">
              Secure Bank Connection
            </span>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            We'll use Plaid to securely connect your bank account. If that
            doesn't work, we'll collect your details manually.
          </p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Connect with Plaid
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or enter manually
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="routingNumber">Routing Number (ABA) *</Label>
            <Input
              id="routingNumber"
              {...register("routingNumber")}
              placeholder="9-digit routing number"
            />
            {errors.routingNumber && (
              <p className="text-red-500 text-sm">
                {(errors.routingNumber as any).message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number *</Label>
            <Input
              id="accountNumber"
              {...register("accountNumber")}
              placeholder="Account number"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm">
                {(errors.accountNumber as any).message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type *</Label>
            <Controller
              name="accountType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.accountType && (
              <p className="text-red-500 text-sm">
                {(errors.accountType as any).message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              {...register("bankName")}
              placeholder="Will auto-fill from routing number"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Step9 = ({ form }: StepProps) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Identity Verification</h2>
        <p className="text-muted-foreground">
          Required for authorized signer and UBO (Ultimate Beneficial Owner)
          verification
        </p>
      </div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="signerName">Full Legal Name *</Label>
          <Input
            id="signerName"
            {...register("signerName")}
            placeholder="Enter full legal name"
          />
          {errors.signerName && (
            <p className="text-red-500 text-sm">
              {(errors.signerName as any).message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth *</Label>
            <Input id="dob" type="date" {...register("dob")} />
            {errors.dob && (
              <p className="text-red-500 text-sm">
                {(errors.dob as any).message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="ssnLast4">SSN Last 4 Digits *</Label>
            <Input
              id="ssnLast4"
              {...register("ssnLast4")}
              placeholder="1234"
              maxLength={4}
            />
            {errors.ssnLast4 && (
              <p className="text-red-500 text-sm">
                {(errors.ssnLast4 as any).message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="homeAddress">Home Address *</Label>
          <Textarea
            id="homeAddress"
            {...register("homeAddress")}
            placeholder="Enter complete home address"
          />
          {errors.homeAddress && (
            <p className="text-red-500 text-sm">
              {(errors.homeAddress as any).message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownershipPercent">Ownership Percentage</Label>
          <Input
            id="ownershipPercent"
            {...register("ownershipPercent")}
            placeholder="Enter if ≥ 25%"
          />
          <p className="text-xs text-muted-foreground">
            Only required if you own 25% or more of the business
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
          <p className="text-sm text-amber-800 mb-3">
            Please upload a photo of your driver's license or passport for
            identity verification.
          </p>
          <Button variant="outline" className="w-full bg-transparent">
            Upload ID Document
          </Button>
        </div>
      </div>
    </div>
  );
};

const Step10 = ({ form }: StepProps) => {
  const {
    control,
    formState: { errors },
  } = form;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Final Step: Agreements</h2>
        <p className="text-muted-foreground">
          Review and sign the required agreements to complete setup
        </p>
      </div>
      <div className="space-y-4">
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Documents to Review & Sign:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CircleCheck className="h-4 w-4 text-green-600" />
              ACH Debit Authorization Agreement
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck className="h-4 w-4 text-green-600" />
              BNPL Provider Service Agreement
            </li>
            <li className="flex items-center gap-2">
              <CircleCheck className="h-4 w-4 text-green-600" />
              Privacy Policy & Terms of Service
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="terms" className="text-sm">
              I have read and agree to the Terms of Service and Privacy Policy
            </Label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">
              {(errors.terms as any).message}
            </p>
          )}
          <div className="flex items-center space-x-2">
            <Controller
              name="ach"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="ach"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="ach" className="text-sm">
              I authorize ACH debits from the connected bank account
            </Label>
          </div>
          {errors.ach && (
            <p className="text-red-500 text-sm">
              {(errors.ach as any).message}
            </p>
          )}
          <div className="flex items-center space-x-2">
            <Controller
              name="accuracy"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="accuracy"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="accuracy" className="text-sm">
              I certify that all information provided is accurate and complete
            </Label>
          </div>
          {errors.accuracy && (
            <p className="text-red-500 text-sm">
              {(errors.accuracy as any).message}
            </p>
          )}
        </div>

        <div className="p-4 border rounded-lg bg-green-50 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CircleCheck className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">
              Ready to Complete Setup
            </span>
          </div>
          <p className="text-sm text-green-700 mb-3">
            Click below to electronically sign all agreements and complete your
            onboarding.
          </p>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Sign & Finish Setup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ModernOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    shouldUnregister: false,
    defaultValues: {
      businessType: undefined,
      legalBusinessName: "",
      dba: "",
      ein: "",
      entityType: "",
      medicalLicenseNumber: "",
      npi: "",
      stateOfIssuance: "",
      expiryDate: "",
      streetAddress: "",
      suite: "",
      zipCode: "",
      phone: "",
      timeZone: "",
      medicalSpecialty: "",
      priceRange: "",
      monthlyVolume: "",
      ehrVendor: "",
      otherEhr: "",
      ownerName: "",
      workEmail: "",
      mobile: "",
      routingNumber: "",
      accountNumber: "",
      accountType: "",
      bankName: "",
      signerName: "",
      dob: undefined,
      ssnLast4: "",
      homeAddress: "",
      ownershipPercent: "",
      terms: false,
      ach: false,
      accuracy: false,
    },
  });

  const {
    handleSubmit,
    formState: {},
    watch,
    trigger,
  } = form;
  const businessType = watch("businessType");

  const nextStep = async () => {
    const currentSchema = STEPS[currentStep - 1].schema;
    const fields = Object.keys(
      "innerType" in currentSchema
        ? currentSchema.innerType().shape
        : currentSchema.shape
    );
    const result = await trigger(fields as any);

    if (result && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit: SubmitHandler<OnboardingData> = (data) => {
    console.log("Onboarding data:", data);
    // Handle final submission
  };

  return (
    <div className="" style={{ zoom: 1.14 }}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto px-4">
        <div className=" mb-14">
          {currentStep === 1 && <Step1 form={form} />}
          {currentStep === 2 && <Step2 form={form} />}
          {currentStep === 3 && <Step3 form={form} />}
          {currentStep === 4 && <Step4 form={form} />}
          {currentStep === 5 && <Step5 form={form} />}
          {currentStep === 6 && <Step6 form={form} />}
          {currentStep === 7 && <Step7 form={form} />}
          {currentStep === 8 && <Step8 form={form} />}
          {currentStep === 9 && <Step9 form={form} />}
          {currentStep === 10 && <Step10 form={form} />}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={currentStep !== 1 ? "cursor-pointer" : ""}
          >
            Previous
          </Button>
          {currentStep < STEPS.length ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={currentStep === 1 && !businessType}
              className={
                !(currentStep === 1 && !businessType) ? "cursor-pointer" : ""
              }
            >
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={!form.formState.isValid}>
              Complete
            </Button>
          )}
        </div>
      </form>

      <ProgressCard currentStep={currentStep} />
    </div>
  );
}
