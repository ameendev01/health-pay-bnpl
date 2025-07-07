"use client";
import React, { useState } from "react";
import { Building2, Stethoscope, CheckCircle, ArrowRight, Sparkles, Heart, Settings, BarChart3, Users, Calendar, CreditCard, Shield, Upload, FileText, Ban as Bank, User, MapPin, Phone, Mail, Hash, DollarSign, Calendar as CalendarIcon, Lock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/app/(auth)/onboarding/_actions";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  // Step 1: Business Type
  footprint: "single" | "multiple";

  // Step 2: Clinic Information - Essential Details
  legalBusinessName: string;
  einTaxId: string;
  entityType: string;
  medicalSpecialty: string;
  stateMedicalLicense: string;
  licenseExpiryDate: string;
  npiNumber: string;

  // Location & Contact
  streetAddress: string;
  suiteUnit: string;
  city: string;
  state: string;
  zipCode: string;
  businessPhone: string;
  primaryContactName: string;
  workEmail: string;

  // Practice Details
  avgMonthlyPatients: number;
  minProcedurePrice: number;
  maxProcedurePrice: number;
  ehrPmsSystem: string;

  // Step 3: Banking Information
  bankConnectionMethod: "plaid" | "manual";
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: "checking" | "savings";

  // Authorized Signer Information
  signerFullName: string;
  signerDateOfBirth: string;
  signerLastFourSSN: string;
  signerHomeAddress: string;
  ownershipPercentage: number;
  uploadedIdFile: File | null;

  // Agreement
  agreedToTerms: boolean;
}

const steps = [
  {
    id: 1,
    title: "Choose Your Practice Type",
    subtitle: "How are you joining us today?",
    icon: Heart,
  },
  {
    id: 2,
    title: "Clinic Information",
    subtitle: "Tell us about your healthcare practice",
    icon: Stethoscope,
  },
  {
    id: 3,
    title: "Banking Details",
    subtitle: "Connect your bank account for seamless transactions",
    icon: Building2,
  },
];

const medicalSpecialties = [
  "General Practice",
  "Family Medicine", 
  "Internal Medicine",
  "Pediatrics",
  "Cardiology",
  "Dermatology",
  "Orthopedics",
  "Neurology",
  "Psychiatry",
  "Radiology",
  "Anesthesiology",
  "Emergency Medicine",
  "Obstetrics & Gynecology",
  "Ophthalmology",
  "Otolaryngology (ENT)",
  "Urology",
  "Gastroenterology",
  "Pulmonology",
  "Endocrinology",
  "Rheumatology",
  "Oncology",
  "Pathology",
  "Physical Medicine & Rehabilitation",
  "Plastic Surgery",
  "Dental",
  "Oral Surgery",
  "Orthodontics",
  "Periodontics",
  "Endodontics",
  "Other"
];

const entityTypes = [
  "LLC",
  "S-Corp", 
  "C-Corp",
  "Sole Proprietorship",
  "Partnership",
  "Professional Corporation (PC)",
  "Professional Limited Liability Company (PLLC)"
];

const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const ehrPmsSystems = [
  "Epic",
  "Cerner",
  "Allscripts",
  "athenahealth",
  "eClinicalWorks",
  "NextGen Healthcare",
  "Practice Fusion",
  "Greenway Health",
  "Meditech",
  "Centricity",
  "DrChrono",
  "CareCloud",
  "AdvancedMD",
  "Kareo",
  "ChartLogic",
  "Other"
];

export default function ModernOnboardingFlow() {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState<FormData>({
    footprint: "single",
    
    // Essential Details
    legalBusinessName: "",
    einTaxId: "",
    entityType: "",
    medicalSpecialty: "",
    stateMedicalLicense: "",
    licenseExpiryDate: "",
    npiNumber: "",

    // Location & Contact
    streetAddress: "",
    suiteUnit: "",
    city: "",
    state: "",
    zipCode: "",
    businessPhone: "",
    primaryContactName: "",
    workEmail: "",

    // Practice Details
    avgMonthlyPatients: 0,
    minProcedurePrice: 0,
    maxProcedurePrice: 0,
    ehrPmsSystem: "",

    // Banking Information
    bankConnectionMethod: "plaid",
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "checking",

    // Authorized Signer Information
    signerFullName: "",
    signerDateOfBirth: "",
    signerLastFourSSN: "",
    signerHomeAddress: "",
    ownershipPercentage: 0,
    uploadedIdFile: null,

    // Agreement
    agreedToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatEIN = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 9)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    switch (step) {
      case 1:
        if (!selectedOption) newErrors.selectedOption = 'Please select a practice type';
        break;
        
      case 2:
        // Essential Details validation
        if (!formData.legalBusinessName.trim()) newErrors.legalBusinessName = 'Legal business name is required';
        if (!formData.einTaxId.trim()) newErrors.einTaxId = 'EIN/Tax ID is required';
        if (!formData.entityType) newErrors.entityType = 'Entity type is required';
        if (!formData.medicalSpecialty) newErrors.medicalSpecialty = 'Medical specialty is required';
        if (!formData.stateMedicalLicense.trim()) newErrors.stateMedicalLicense = 'State medical license is required';
        if (!formData.licenseExpiryDate) newErrors.licenseExpiryDate = 'License expiry date is required';
        if (!formData.npiNumber.trim()) newErrors.npiNumber = 'NPI number is required';
        else if (!/^\d{10}$/.test(formData.npiNumber.replace(/\D/g, ''))) newErrors.npiNumber = 'NPI must be 10 digits';

        // Location & Contact validation
        if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        else if (!/^\d{5}$/.test(formData.zipCode)) newErrors.zipCode = 'ZIP code must be 5 digits';
        if (!formData.businessPhone.trim()) newErrors.businessPhone = 'Business phone is required';
        if (!formData.primaryContactName.trim()) newErrors.primaryContactName = 'Primary contact name is required';
        if (!formData.workEmail.trim()) newErrors.workEmail = 'Work email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) newErrors.workEmail = 'Invalid email format';

        // Practice Details validation
        if (!formData.avgMonthlyPatients || formData.avgMonthlyPatients <= 0) newErrors.avgMonthlyPatients = 'Average monthly patients is required';
        if (!formData.minProcedurePrice || formData.minProcedurePrice <= 0) newErrors.minProcedurePrice = 'Minimum procedure price is required';
        if (!formData.maxProcedurePrice || formData.maxProcedurePrice <= 0) newErrors.maxProcedurePrice = 'Maximum procedure price is required';
        if (formData.maxProcedurePrice <= formData.minProcedurePrice) newErrors.maxProcedurePrice = 'Maximum price must be greater than minimum';
        if (!formData.ehrPmsSystem) newErrors.ehrPmsSystem = 'EHR/PMS system is required';
        break;
        
      case 3:
        if (formData.bankConnectionMethod === 'manual') {
          if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
          if (!formData.routingNumber.trim()) newErrors.routingNumber = 'Routing number is required';
          else if (!/^\d{9}$/.test(formData.routingNumber)) newErrors.routingNumber = 'Routing number must be 9 digits';
          if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
        }

        // Authorized Signer validation
        if (!formData.signerFullName.trim()) newErrors.signerFullName = 'Signer full name is required';
        if (!formData.signerDateOfBirth) newErrors.signerDateOfBirth = 'Date of birth is required';
        if (!formData.signerLastFourSSN.trim()) newErrors.signerLastFourSSN = 'Last 4 SSN is required';
        else if (!/^\d{4}$/.test(formData.signerLastFourSSN)) newErrors.signerLastFourSSN = 'Must be 4 digits';
        if (!formData.signerHomeAddress.trim()) newErrors.signerHomeAddress = 'Home address is required';
        if (!formData.ownershipPercentage || formData.ownershipPercentage <= 0 || formData.ownershipPercentage > 100) {
          newErrors.ownershipPercentage = 'Ownership percentage must be between 1-100%';
        }
        if (!formData.uploadedIdFile) newErrors.uploadedIdFile = 'ID upload is required';
        if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to the terms';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Complete onboarding
      const result = await completeOnboarding(true);

      if (result.message) {
        setShowSuccess(true);
        await user?.reload();

        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.error("Onboarding error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateField('uploadedIdFile', file);
    }
  };

  const connectWithPlaid = () => {
    // Simulate Plaid connection
    alert('Plaid integration would be implemented here');
    updateField('bankConnectionMethod', 'plaid');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 text-black">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to HealthPay! 🎉
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Your account is ready. Redirecting to dashboard...
          </p>

          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black h-full flex justify-center items-center">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Step Header */}
          <div className="text-center space-y-4">
            <div
              className={`w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
            >
              {React.createElement(steps[currentStep - 1].icon, {
                className: "w-8 h-8 text-white",
              })}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                {steps[currentStep - 1].subtitle}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto"
              >
                <div className="relative group">
                  <RadioGroupItem
                    value="single-clinic"
                    id="single-clinic"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="single-clinic"
                    className="cursor-pointer block"
                  >
                    <Card
                      className={`h-full transition-all duration-500 ease-out relative overflow-hidden ${
                        selectedOption === "single-clinic"
                          ? "ring-4 ring-blue-500/30 shadow-xl border-blue-700 border-4 bg-blue-50/50 scale-[1.02]"
                          : "border-2 border-slate-200 shadow-xl"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-blue-500/8 to-blue-600/4 transition-all duration-500 ease-out ${
                          selectedOption === "single-clinic"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />

                      <CardHeader className="text-center pb-4 pt-6 relative z-10">
                        <div className="mx-auto mb-4 w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-md">
                          <Stethoscope className="w-7 h-7 text-blue-600 " />
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900 mb-1">
                          Solo Clinic
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-600">
                          Perfect for independent practitioners
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="relative z-10 px-6 pb-6">
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-2 p-2 bg-white/50  rounded-md">
                            <Calendar className="w-4 h-4 text-blue-600  flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700 ">
                              Scheduling
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/50  rounded-md">
                            <Users className="w-4 h-4 text-blue-600  flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700 ">
                              Patients
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/50  rounded-md">
                            <BarChart3 className="w-4 h-4 text-blue-600  flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700 ">
                              Analytics
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/50  rounded-md">
                            <Settings className="w-4 h-4 text-blue-600 d flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700 ">
                              Setup
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600  text-center pt-3 border-t border-slate-200 ">
                          <span className="font-semibold text-slate-900 ">
                            Ideal for:
                          </span>{" "}
                          Solo practitioners, small clinics
                        </p>
                      </CardContent>
                    </Card>
                  </Label>
                </div>

                <div className="relative group">
                  <RadioGroupItem
                    value="multiple-clinics"
                    id="multiple-clinics"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="multiple-clinics"
                    className="cursor-pointer block"
                  >
                    <Card
                      className={`h-full transition-all duration-500 ease-out relative overflow-hidden ${
                        selectedOption === "multiple-clinics"
                          ? "ring-4 ring-emerald-500/30 shadow-xl border-emerald-700 border-4 bg-emerald-50/50"
                          : "border-2 border-slate-200 shadow-xl"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-emerald-500/8 to-emerald-600/4 transition-all duration-500 ease-out ${
                          selectedOption === "multiple-clinics"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />

                      <CardHeader className="text-center pb-4 pt-6 relative z-10">
                        <div className="mx-auto mb-4 w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200  rounded-xl flex items-center justify-center shadow-md">
                          <Building2 className="w-7 h-7 text-emerald-600 " />
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900  mb-1">
                          Healthcare Enterprise
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-600 ">
                          Built for multiple locations
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="relative z-10 px-6 pb-6">
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-2 p-2 bg-white/50  rounded-md">
                            <Building2 className="w-4 h-4 text-emerald-600  flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700 whitespace-nowrap">
                              Multi-Location
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/50  rounded-md">
                            <Users className="w-4 h-4 text-emerald-600  flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700 ">
                              Team Mgmt
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/50  rounded-md">
                            <BarChart3 className="w-4 h-4 text-emerald-600  flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700 whitespace-nowrap">
                              Analytics
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/50  rounded-md">
                            <Settings className="w-4 h-4 text-emerald-600  flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700">
                              Permissions
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 text-center pt-3 border-t border-slate-200">
                          <span className="font-semibold text-slate-900">
                            Ideal for:
                          </span>{" "}
                          Healthcare chains, enterprises
                        </p>
                      </CardContent>
                    </Card>
                  </Label>
                </div>
              </RadioGroup>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                {/* Essential Details */}
                <Card className="border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Essential Details
                    </CardTitle>
                    <CardDescription>
                      Basic business and licensing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
                        <Input
                          id="legalBusinessName"
                          placeholder="ABC Medical Practice LLC"
                          value={formData.legalBusinessName}
                          onChange={(e) => updateField("legalBusinessName", e.target.value)}
                          className={errors.legalBusinessName ? "border-red-500" : ""}
                        />
                        {errors.legalBusinessName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.legalBusinessName}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="einTaxId">EIN/Tax ID *</Label>
                        <Input
                          id="einTaxId"
                          placeholder="XX-XXXXXXX"
                          value={formData.einTaxId}
                          onChange={(e) => updateField("einTaxId", formatEIN(e.target.value))}
                          maxLength={10}
                          className={errors.einTaxId ? "border-red-500" : ""}
                        />
                        {errors.einTaxId && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.einTaxId}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="entityType">Entity Type *</Label>
                        <Select
                          value={formData.entityType}
                          onValueChange={(value) => updateField("entityType", value)}
                        >
                          <SelectTrigger className={errors.entityType ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select entity type" />
                          </SelectTrigger>
                          <SelectContent>
                            {entityTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.entityType && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.entityType}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medicalSpecialty">Medical Specialty *</Label>
                        <Select
                          value={formData.medicalSpecialty}
                          onValueChange={(value) => updateField("medicalSpecialty", value)}
                        >
                          <SelectTrigger className={errors.medicalSpecialty ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select specialty" />
                          </SelectTrigger>
                          <SelectContent>
                            {medicalSpecialties.map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.medicalSpecialty && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.medicalSpecialty}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stateMedicalLicense">State Medical License Number *</Label>
                        <Input
                          id="stateMedicalLicense"
                          placeholder="License number"
                          value={formData.stateMedicalLicense}
                          onChange={(e) => updateField("stateMedicalLicense", e.target.value)}
                          className={errors.stateMedicalLicense ? "border-red-500" : ""}
                        />
                        {errors.stateMedicalLicense && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.stateMedicalLicense}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="licenseExpiryDate">License Expiry Date *</Label>
                        <Input
                          id="licenseExpiryDate"
                          type="date"
                          value={formData.licenseExpiryDate}
                          onChange={(e) => updateField("licenseExpiryDate", e.target.value)}
                          className={errors.licenseExpiryDate ? "border-red-500" : ""}
                        />
                        {errors.licenseExpiryDate && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.licenseExpiryDate}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="npiNumber">NPI Number *</Label>
                        <Input
                          id="npiNumber"
                          placeholder="1234567890"
                          value={formData.npiNumber}
                          onChange={(e) => updateField("npiNumber", e.target.value.replace(/\D/g, '').slice(0, 10))}
                          maxLength={10}
                          className={errors.npiNumber ? "border-red-500" : ""}
                        />
                        {errors.npiNumber && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.npiNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location & Contact */}
                <Card className="border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      Location & Contact
                    </CardTitle>
                    <CardDescription>
                      Practice address and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="streetAddress">Street Address *</Label>
                        <Input
                          id="streetAddress"
                          placeholder="123 Medical Center Drive"
                          value={formData.streetAddress}
                          onChange={(e) => updateField("streetAddress", e.target.value)}
                          className={errors.streetAddress ? "border-red-500" : ""}
                        />
                        {errors.streetAddress && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.streetAddress}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="suiteUnit">Suite/Unit</Label>
                        <Input
                          id="suiteUnit"
                          placeholder="Suite 200"
                          value={formData.suiteUnit}
                          onChange={(e) => updateField("suiteUnit", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="Los Angeles"
                          value={formData.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => updateField("state", value)}
                        >
                          <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.state}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          placeholder="90210"
                          value={formData.zipCode}
                          onChange={(e) => updateField("zipCode", e.target.value.replace(/\D/g, '').slice(0, 5))}
                          maxLength={5}
                          className={errors.zipCode ? "border-red-500" : ""}
                        />
                        {errors.zipCode && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.zipCode}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessPhone">Business Phone *</Label>
                        <Input
                          id="businessPhone"
                          placeholder="(555) 123-4567"
                          value={formData.businessPhone}
                          onChange={(e) => updateField("businessPhone", formatPhone(e.target.value))}
                          maxLength={14}
                          className={errors.businessPhone ? "border-red-500" : ""}
                        />
                        {errors.businessPhone && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.businessPhone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primaryContactName">Primary Contact Name *</Label>
                        <Input
                          id="primaryContactName"
                          placeholder="Dr. John Smith"
                          value={formData.primaryContactName}
                          onChange={(e) => updateField("primaryContactName", e.target.value)}
                          className={errors.primaryContactName ? "border-red-500" : ""}
                        />
                        {errors.primaryContactName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.primaryContactName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Work Email *</Label>
                      <Input
                        id="workEmail"
                        type="email"
                        placeholder="contact@practice.com"
                        value={formData.workEmail}
                        onChange={(e) => updateField("workEmail", e.target.value)}
                        className={errors.workEmail ? "border-red-500" : ""}
                      />
                      {errors.workEmail && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.workEmail}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Practice Details */}
                <Card className="border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      Practice Details
                    </CardTitle>
                    <CardDescription>
                      Information about your practice operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="avgMonthlyPatients">Average Monthly Patients *</Label>
                        <Input
                          id="avgMonthlyPatients"
                          type="number"
                          placeholder="150"
                          value={formData.avgMonthlyPatients || ''}
                          onChange={(e) => updateField("avgMonthlyPatients", parseInt(e.target.value) || 0)}
                          className={errors.avgMonthlyPatients ? "border-red-500" : ""}
                        />
                        {errors.avgMonthlyPatients && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.avgMonthlyPatients}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="minProcedurePrice">Min Procedure Price *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="minProcedurePrice"
                            type="number"
                            placeholder="100"
                            value={formData.minProcedurePrice || ''}
                            onChange={(e) => updateField("minProcedurePrice", parseInt(e.target.value) || 0)}
                            className={`pl-10 ${errors.minProcedurePrice ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.minProcedurePrice && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.minProcedurePrice}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxProcedurePrice">Max Procedure Price *</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="maxProcedurePrice"
                            type="number"
                            placeholder="5000"
                            value={formData.maxProcedurePrice || ''}
                            onChange={(e) => updateField("maxProcedurePrice", parseInt(e.target.value) || 0)}
                            className={`pl-10 ${errors.maxProcedurePrice ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.maxProcedurePrice && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.maxProcedurePrice}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ehrPmsSystem">EHR/PMS System *</Label>
                      <Select
                        value={formData.ehrPmsSystem}
                        onValueChange={(value) => updateField("ehrPmsSystem", value)}
                      >
                        <SelectTrigger className={errors.ehrPmsSystem ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select your EHR/PMS system" />
                        </SelectTrigger>
                        <SelectContent>
                          {ehrPmsSystems.map((system) => (
                            <SelectItem key={system} value={system}>
                              {system}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.ehrPmsSystem && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.ehrPmsSystem}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                {/* Bank Connection */}
                <Card className="border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bank className="w-5 h-5 text-green-600" />
                      Bank Account Connection
                    </CardTitle>
                    <CardDescription>
                      Connect your business bank account securely
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Plaid Integration Button */}
                    <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                      <Bank className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Secure Bank Connection
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Connect your bank account instantly and securely with bank-level encryption
                      </p>
                      <Button
                        onClick={connectWithPlaid}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                      >
                        <Shield className="w-5 h-5 mr-2" />
                        Connect Bank Account
                      </Button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Or enter manually</span>
                      </div>
                    </div>

                    {/* Manual Entry */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          placeholder="Chase Bank"
                          value={formData.bankName}
                          onChange={(e) => updateField("bankName", e.target.value)}
                          className={errors.bankName ? "border-red-500" : ""}
                        />
                        {errors.bankName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.bankName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="routingNumber">Routing Number (ABA)</Label>
                          <Input
                            id="routingNumber"
                            placeholder="123456789"
                            value={formData.routingNumber}
                            onChange={(e) => updateField("routingNumber", e.target.value.replace(/\D/g, '').slice(0, 9))}
                            maxLength={9}
                            className={errors.routingNumber ? "border-red-500" : ""}
                          />
                          {errors.routingNumber && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.routingNumber}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            placeholder="Account number"
                            value={formData.accountNumber}
                            onChange={(e) => updateField("accountNumber", e.target.value)}
                            className={errors.accountNumber ? "border-red-500" : ""}
                          />
                          {errors.accountNumber && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.accountNumber}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <RadioGroup
                          value={formData.accountType}
                          onValueChange={(value) => updateField("accountType", value as "checking" | "savings")}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="checking" id="checking" />
                            <Label htmlFor="checking">Checking</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="savings" id="savings" />
                            <Label htmlFor="savings">Savings</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Authorized Signer Information */}
                <Card className="border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Authorized Signer Information
                    </CardTitle>
                    <CardDescription>
                      Information about the person authorized to sign for the business
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signerFullName">Full Legal Name *</Label>
                        <Input
                          id="signerFullName"
                          placeholder="John Smith"
                          value={formData.signerFullName}
                          onChange={(e) => updateField("signerFullName", e.target.value)}
                          className={errors.signerFullName ? "border-red-500" : ""}
                        />
                        {errors.signerFullName && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.signerFullName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signerDateOfBirth">Date of Birth *</Label>
                        <Input
                          id="signerDateOfBirth"
                          type="date"
                          value={formData.signerDateOfBirth}
                          onChange={(e) => updateField("signerDateOfBirth", e.target.value)}
                          className={errors.signerDateOfBirth ? "border-red-500" : ""}
                        />
                        {errors.signerDateOfBirth && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.signerDateOfBirth}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signerLastFourSSN">Last 4 SSN *</Label>
                        <Input
                          id="signerLastFourSSN"
                          placeholder="1234"
                          value={formData.signerLastFourSSN}
                          onChange={(e) => updateField("signerLastFourSSN", e.target.value.replace(/\D/g, '').slice(0, 4))}
                          maxLength={4}
                          className={errors.signerLastFourSSN ? "border-red-500" : ""}
                        />
                        {errors.signerLastFourSSN && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.signerLastFourSSN}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ownershipPercentage">Ownership Percentage *</Label>
                        <div className="relative">
                          <Input
                            id="ownershipPercentage"
                            type="number"
                            placeholder="100"
                            min="1"
                            max="100"
                            value={formData.ownershipPercentage || ''}
                            onChange={(e) => updateField("ownershipPercentage", parseInt(e.target.value) || 0)}
                            className={`pr-8 ${errors.ownershipPercentage ? "border-red-500" : ""}`}
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                        </div>
                        {errors.ownershipPercentage && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.ownershipPercentage}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signerHomeAddress">Home Address *</Label>
                      <Input
                        id="signerHomeAddress"
                        placeholder="123 Main Street, City, State 12345"
                        value={formData.signerHomeAddress}
                        onChange={(e) => updateField("signerHomeAddress", e.target.value)}
                        className={errors.signerHomeAddress ? "border-red-500" : ""}
                      />
                      {errors.signerHomeAddress && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.signerHomeAddress}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="uploadId">Upload ID (Driver's License or Passport) *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-600 mb-2">
                          {formData.uploadedIdFile ? formData.uploadedIdFile.name : "Click to upload or drag and drop"}
                        </div>
                        <input
                          id="uploadId"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('uploadId')?.click()}
                          className={errors.uploadedIdFile ? "border-red-500" : ""}
                        >
                          Choose File
                        </Button>
                      </div>
                      {errors.uploadedIdFile && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.uploadedIdFile}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Agreement */}
                <Card className="border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      Review & Agreement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
                        <div className="text-sm text-gray-700 max-h-32 overflow-y-auto">
                          <p className="mb-2">
                            By proceeding, you agree to HealthPay's Terms of Service and Privacy Policy. 
                            You authorize us to verify the information provided and perform necessary 
                            background checks for underwriting purposes.
                          </p>
                          <p>
                            You understand that approval is subject to our underwriting criteria and 
                            that we may request additional documentation.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="agreedToTerms"
                          checked={formData.agreedToTerms}
                          onChange={(e) => updateField("agreedToTerms", e.target.checked)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <Label htmlFor="agreedToTerms" className="text-sm text-gray-700">
                          I have read and agree to the Terms & Conditions, Privacy Policy, and 
                          authorize HealthPay to verify the information provided. *
                        </Label>
                      </div>
                      {errors.agreedToTerms && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.agreedToTerms}
                        </p>
                      )}

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Lock className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">
                            Your information is secure and encrypted
                          </span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">
                          All data is protected with bank-level security and will only be used for 
                          account verification and service provision.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-8 flex justify-center">
            <Button
              onClick={handleNext}
              disabled={isSubmitting || (currentStep === 1 && !selectedOption)}
              className="px-8 py-3 text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  <span>Setting up your account...</span>
                </>
              ) : (
                <>
                  <span>
                    {currentStep === 3 ? "Complete Setup" : "Continue"}
                  </span>
                  {currentStep < 3 && <ArrowRight className="w-6 h-6 ml-2" />}
                  {currentStep === 3 && <Sparkles className="w-6 h-6 ml-2" />}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}