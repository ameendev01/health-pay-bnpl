"use client";
import React, { useState } from "react";
import { Building2, Stethoscope, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Heart, Settings, BarChart3, Users, Calendar, MapPin, CreditCard, Shield, FileText, Upload, Ban as Bank, User, Briefcase } from "lucide-react";
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
  businessType: "single" | "multiple";
  
  // Step 2: Essential Details
  legalBusinessName: string;
  einTaxId: string;
  entityType: string;
  medicalSpecialty: string;
  stateLicenseNumber: string;
  licenseExpiryDate: string;
  npiNumber: string;
  
  // Step 3: Location & Contact
  streetAddress: string;
  suiteUnit: string;
  city: string;
  state: string;
  zipCode: string;
  businessPhone: string;
  primaryContactName: string;
  workEmail: string;
  
  // Step 4: Practice Details
  avgMonthlyPatients: string;
  procedurePriceMin: string;
  procedurePriceMax: string;
  ehrSystem: string;
  
  // Step 5: Banking Method
  bankingMethod: "plaid" | "manual";
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: "checking" | "savings";
  
  // Step 6: Authorized Signer
  signerFullName: string;
  signerDob: string;
  signerSsnLast4: string;
  signerHomeAddress: string;
  ownershipPercentage: string;
  idUpload: File | null;
  agreedToTerms: boolean;
}

const steps = [
  {
    id: 1,
    title: "Business Type",
    subtitle: "How are you joining us today?",
    icon: Heart,
  },
  {
    id: 2,
    title: "Essential Details",
    subtitle: "Basic business information",
    icon: Briefcase,
  },
  {
    id: 3,
    title: "Location & Contact",
    subtitle: "Where can we reach you?",
    icon: MapPin,
  },
  {
    id: 4,
    title: "Practice Details",
    subtitle: "Tell us about your practice",
    icon: Stethoscope,
  },
  {
    id: 5,
    title: "Banking Information",
    subtitle: "Connect your bank account",
    icon: CreditCard,
  },
  {
    id: 6,
    title: "Authorized Signer",
    subtitle: "Verify your identity",
    icon: Shield,
  },
];

const entityTypes = [
  "LLC",
  "S-Corp", 
  "C-Corp",
  "Sole Proprietorship",
  "Partnership",
  "Professional Corporation"
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
  "Emergency Medicine",
  "Anesthesiology",
  "Pathology",
  "Surgery - General",
  "Surgery - Orthopedic",
  "Surgery - Cardiac",
  "Surgery - Plastic",
  "Obstetrics & Gynecology",
  "Ophthalmology",
  "Otolaryngology (ENT)",
  "Urology",
  "Oncology",
  "Endocrinology",
  "Gastroenterology",
  "Pulmonology",
  "Nephrology",
  "Rheumatology",
  "Infectious Disease",
  "Physical Medicine & Rehabilitation",
  "Dental - General",
  "Dental - Orthodontics",
  "Dental - Oral Surgery",
  "Dental - Periodontics",
  "Dental - Endodontics",
  "Other"
];

const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const ehrSystems = [
  "Epic",
  "Cerner",
  "Allscripts",
  "athenahealth",
  "eClinicalWorks",
  "NextGen",
  "Practice Fusion",
  "Greenway Health",
  "Meditech",
  "Centricity",
  "DrChrono",
  "SimplePractice",
  "TherapyNotes",
  "Other",
  "None"
];

export default function ModernOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessType: "single",
    legalBusinessName: "",
    einTaxId: "",
    entityType: "",
    medicalSpecialty: "",
    stateLicenseNumber: "",
    licenseExpiryDate: "",
    npiNumber: "",
    streetAddress: "",
    suiteUnit: "",
    city: "",
    state: "",
    zipCode: "",
    businessPhone: "",
    primaryContactName: "",
    workEmail: "",
    avgMonthlyPatients: "",
    procedurePriceMin: "",
    procedurePriceMax: "",
    ehrSystem: "",
    bankingMethod: "plaid",
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "checking",
    signerFullName: "",
    signerDob: "",
    signerSsnLast4: "",
    signerHomeAddress: "",
    ownershipPercentage: "",
    idUpload: null,
    agreedToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user } = useUser();
  const router = useRouter();

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
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

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.businessType) {
          newErrors.businessType = "Please select a business type";
        }
        break;
      
      case 2:
        if (!formData.legalBusinessName.trim()) {
          newErrors.legalBusinessName = "Legal business name is required";
        }
        if (!formData.einTaxId.trim()) {
          newErrors.einTaxId = "EIN/Tax ID is required";
        }
        if (!formData.entityType) {
          newErrors.entityType = "Entity type is required";
        }
        if (!formData.medicalSpecialty) {
          newErrors.medicalSpecialty = "Medical specialty is required";
        }
        if (!formData.stateLicenseNumber.trim()) {
          newErrors.stateLicenseNumber = "State license number is required";
        }
        if (!formData.licenseExpiryDate) {
          newErrors.licenseExpiryDate = "License expiry date is required";
        }
        if (!formData.npiNumber.trim()) {
          newErrors.npiNumber = "NPI number is required";
        } else if (formData.npiNumber.replace(/\D/g, '').length !== 10) {
          newErrors.npiNumber = "NPI number must be 10 digits";
        }
        break;
      
      case 3:
        if (!formData.streetAddress.trim()) {
          newErrors.streetAddress = "Street address is required";
        }
        if (!formData.city.trim()) {
          newErrors.city = "City is required";
        }
        if (!formData.state) {
          newErrors.state = "State is required";
        }
        if (!formData.zipCode.trim()) {
          newErrors.zipCode = "ZIP code is required";
        }
        if (!formData.businessPhone.trim()) {
          newErrors.businessPhone = "Business phone is required";
        }
        if (!formData.primaryContactName.trim()) {
          newErrors.primaryContactName = "Primary contact name is required";
        }
        if (!formData.workEmail.trim()) {
          newErrors.workEmail = "Work email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
          newErrors.workEmail = "Please enter a valid email address";
        }
        break;
      
      case 4:
        if (!formData.avgMonthlyPatients.trim()) {
          newErrors.avgMonthlyPatients = "Average monthly patients is required";
        }
        if (!formData.procedurePriceMin.trim()) {
          newErrors.procedurePriceMin = "Minimum procedure price is required";
        }
        if (!formData.procedurePriceMax.trim()) {
          newErrors.procedurePriceMax = "Maximum procedure price is required";
        }
        if (!formData.ehrSystem) {
          newErrors.ehrSystem = "EHR/PMS system selection is required";
        }
        break;
      
      case 5:
        if (formData.bankingMethod === "manual") {
          if (!formData.bankName.trim()) {
            newErrors.bankName = "Bank name is required";
          }
          if (!formData.routingNumber.trim()) {
            newErrors.routingNumber = "Routing number is required";
          } else if (formData.routingNumber.replace(/\D/g, '').length !== 9) {
            newErrors.routingNumber = "Routing number must be 9 digits";
          }
          if (!formData.accountNumber.trim()) {
            newErrors.accountNumber = "Account number is required";
          }
        }
        break;
      
      case 6:
        if (!formData.signerFullName.trim()) {
          newErrors.signerFullName = "Signer full name is required";
        }
        if (!formData.signerDob) {
          newErrors.signerDob = "Date of birth is required";
        }
        if (!formData.signerSsnLast4.trim()) {
          newErrors.signerSsnLast4 = "Last 4 SSN digits are required";
        } else if (formData.signerSsnLast4.replace(/\D/g, '').length !== 4) {
          newErrors.signerSsnLast4 = "Must be exactly 4 digits";
        }
        if (!formData.signerHomeAddress.trim()) {
          newErrors.signerHomeAddress = "Home address is required";
        }
        if (!formData.ownershipPercentage.trim()) {
          newErrors.ownershipPercentage = "Ownership percentage is required";
        }
        if (!formData.agreedToTerms) {
          newErrors.agreedToTerms = "You must agree to the terms";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
      updateField('idUpload', file);
    }
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

  const renderProgressBar = () => (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              currentStep > step.id 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : currentStep === step.id
                ? 'border-blue-500 text-blue-500 bg-blue-50'
                : 'border-gray-300 text-gray-400 bg-white'
            }`}>
              {currentStep > step.id ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span className="text-sm font-semibold">{step.id}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {steps[currentStep - 1].title}
        </h2>
        <p className="text-gray-600">
          {steps[currentStep - 1].subtitle}
        </p>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-8">
        <RadioGroup
          value={formData.businessType}
          onValueChange={(value) => updateField('businessType', value)}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="relative group">
            <RadioGroupItem
              value="single"
              id="single"
              className="peer sr-only"
            />
            <Label
              htmlFor="single"
              className="cursor-pointer block"
            >
              <Card className={`h-full transition-all duration-300 ${
                formData.businessType === "single"
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:shadow-md"
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Solo Clinic</CardTitle>
                  <CardDescription>
                    Perfect for independent practitioners
                  </CardDescription>
                </CardHeader>
              </Card>
            </Label>
          </div>

          <div className="relative group">
            <RadioGroupItem
              value="multiple"
              id="multiple"
              className="peer sr-only"
            />
            <Label
              htmlFor="multiple"
              className="cursor-pointer block"
            >
              <Card className={`h-full transition-all duration-300 ${
                formData.businessType === "multiple"
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:shadow-md"
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">Healthcare Enterprise</CardTitle>
                  <CardDescription>
                    Multiple locations and providers
                  </CardDescription>
                </CardHeader>
              </Card>
            </Label>
          </div>
        </RadioGroup>
        {errors.businessType && (
          <p className="text-red-500 text-sm mt-4 text-center">{errors.businessType}</p>
        )}
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          Essential Business Details
        </CardTitle>
        <CardDescription>
          Basic information about your healthcare practice
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
            <Input
              id="legalBusinessName"
              value={formData.legalBusinessName}
              onChange={(e) => updateField('legalBusinessName', e.target.value)}
              placeholder="ABC Medical Center LLC"
              className={errors.legalBusinessName ? "border-red-500" : ""}
            />
            {errors.legalBusinessName && (
              <p className="text-red-500 text-sm mt-1">{errors.legalBusinessName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="einTaxId">EIN/Tax ID *</Label>
            <Input
              id="einTaxId"
              value={formData.einTaxId}
              onChange={(e) => updateField('einTaxId', formatEIN(e.target.value))}
              placeholder="XX-XXXXXXX"
              maxLength={10}
              className={errors.einTaxId ? "border-red-500" : ""}
            />
            {errors.einTaxId && (
              <p className="text-red-500 text-sm mt-1">{errors.einTaxId}</p>
            )}
          </div>

          <div>
            <Label htmlFor="entityType">Entity Type *</Label>
            <Select value={formData.entityType} onValueChange={(value) => updateField('entityType', value)}>
              <SelectTrigger className={errors.entityType ? "border-red-500" : ""}>
                <SelectValue placeholder="Select entity type" />
              </SelectTrigger>
              <SelectContent>
                {entityTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.entityType && (
              <p className="text-red-500 text-sm mt-1">{errors.entityType}</p>
            )}
          </div>

          <div>
            <Label htmlFor="medicalSpecialty">Medical Specialty *</Label>
            <Select value={formData.medicalSpecialty} onValueChange={(value) => updateField('medicalSpecialty', value)}>
              <SelectTrigger className={errors.medicalSpecialty ? "border-red-500" : ""}>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {medicalSpecialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.medicalSpecialty && (
              <p className="text-red-500 text-sm mt-1">{errors.medicalSpecialty}</p>
            )}
          </div>

          <div>
            <Label htmlFor="stateLicenseNumber">State Medical License Number *</Label>
            <Input
              id="stateLicenseNumber"
              value={formData.stateLicenseNumber}
              onChange={(e) => updateField('stateLicenseNumber', e.target.value)}
              placeholder="License number"
              className={errors.stateLicenseNumber ? "border-red-500" : ""}
            />
            {errors.stateLicenseNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.stateLicenseNumber}</p>
            )}
          </div>

          <div>
            <Label htmlFor="licenseExpiryDate">License Expiry Date *</Label>
            <Input
              id="licenseExpiryDate"
              type="date"
              value={formData.licenseExpiryDate}
              onChange={(e) => updateField('licenseExpiryDate', e.target.value)}
              className={errors.licenseExpiryDate ? "border-red-500" : ""}
            />
            {errors.licenseExpiryDate && (
              <p className="text-red-500 text-sm mt-1">{errors.licenseExpiryDate}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="npiNumber">NPI Number *</Label>
            <Input
              id="npiNumber"
              value={formData.npiNumber}
              onChange={(e) => updateField('npiNumber', e.target.value.replace(/\D/g, ''))}
              placeholder="1234567890"
              maxLength={10}
              className={errors.npiNumber ? "border-red-500" : ""}
            />
            {errors.npiNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.npiNumber}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Location & Contact Information
        </CardTitle>
        <CardDescription>
          Where can we reach you and your practice?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="streetAddress">Street Address *</Label>
            <Input
              id="streetAddress"
              value={formData.streetAddress}
              onChange={(e) => updateField('streetAddress', e.target.value)}
              placeholder="123 Medical Center Drive"
              className={errors.streetAddress ? "border-red-500" : ""}
            />
            {errors.streetAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
            )}
          </div>

          <div>
            <Label htmlFor="suiteUnit">Suite/Unit</Label>
            <Input
              id="suiteUnit"
              value={formData.suiteUnit}
              onChange={(e) => updateField('suiteUnit', e.target.value)}
              placeholder="Suite 200"
            />
          </div>

          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="Los Angeles"
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <Label htmlFor="state">State *</Label>
            <Select value={formData.state} onValueChange={(value) => updateField('state', value)}>
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {usStates.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <Label htmlFor="zipCode">ZIP Code *</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => updateField('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="90210"
              maxLength={5}
              className={errors.zipCode ? "border-red-500" : ""}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
            )}
          </div>

          <div>
            <Label htmlFor="businessPhone">Business Phone *</Label>
            <Input
              id="businessPhone"
              value={formData.businessPhone}
              onChange={(e) => updateField('businessPhone', formatPhone(e.target.value))}
              placeholder="(555) 123-4567"
              className={errors.businessPhone ? "border-red-500" : ""}
            />
            {errors.businessPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.businessPhone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="primaryContactName">Primary Contact Name *</Label>
            <Input
              id="primaryContactName"
              value={formData.primaryContactName}
              onChange={(e) => updateField('primaryContactName', e.target.value)}
              placeholder="Dr. John Smith"
              className={errors.primaryContactName ? "border-red-500" : ""}
            />
            {errors.primaryContactName && (
              <p className="text-red-500 text-sm mt-1">{errors.primaryContactName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="workEmail">Work Email *</Label>
            <Input
              id="workEmail"
              type="email"
              value={formData.workEmail}
              onChange={(e) => updateField('workEmail', e.target.value)}
              placeholder="contact@clinic.com"
              className={errors.workEmail ? "border-red-500" : ""}
            />
            {errors.workEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.workEmail}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          Practice Details
        </CardTitle>
        <CardDescription>
          Help us understand your practice better
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="avgMonthlyPatients">Average Monthly Patients *</Label>
            <Input
              id="avgMonthlyPatients"
              type="number"
              value={formData.avgMonthlyPatients}
              onChange={(e) => updateField('avgMonthlyPatients', e.target.value)}
              placeholder="500"
              className={errors.avgMonthlyPatients ? "border-red-500" : ""}
            />
            {errors.avgMonthlyPatients && (
              <p className="text-red-500 text-sm mt-1">{errors.avgMonthlyPatients}</p>
            )}
          </div>

          <div>
            <Label htmlFor="ehrSystem">EHR/PMS System *</Label>
            <Select value={formData.ehrSystem} onValueChange={(value) => updateField('ehrSystem', value)}>
              <SelectTrigger className={errors.ehrSystem ? "border-red-500" : ""}>
                <SelectValue placeholder="Select system" />
              </SelectTrigger>
              <SelectContent>
                {ehrSystems.map((system) => (
                  <SelectItem key={system} value={system}>{system}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ehrSystem && (
              <p className="text-red-500 text-sm mt-1">{errors.ehrSystem}</p>
            )}
          </div>

          <div>
            <Label htmlFor="procedurePriceMin">Typical Procedure Price Range *</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="procedurePriceMin"
                type="number"
                value={formData.procedurePriceMin}
                onChange={(e) => updateField('procedurePriceMin', e.target.value)}
                placeholder="100"
                className={errors.procedurePriceMin ? "border-red-500" : ""}
              />
              <span className="text-gray-500">to</span>
              <Input
                id="procedurePriceMax"
                type="number"
                value={formData.procedurePriceMax}
                onChange={(e) => updateField('procedurePriceMax', e.target.value)}
                placeholder="5000"
                className={errors.procedurePriceMax ? "border-red-500" : ""}
              />
            </div>
            {(errors.procedurePriceMin || errors.procedurePriceMax) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.procedurePriceMin || errors.procedurePriceMax}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep5 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          Banking Information
        </CardTitle>
        <CardDescription>
          Connect your bank account for secure transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="p-6 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
            <div className="text-center">
              <Bank className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connect with Plaid (Recommended)
              </h3>
              <p className="text-gray-600 mb-4">
                Securely connect your bank account in seconds
              </p>
              <Button 
                onClick={() => updateField('bankingMethod', 'plaid')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Shield className="w-4 h-4 mr-2" />
                Connect Bank Account
              </Button>
            </div>
          </div>

          <div className="text-center">
            <span className="text-gray-500">or</span>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => updateField('bankingMethod', 'manual')}
              className="w-full"
            >
              Enter Bank Details Manually
            </Button>

            {formData.bankingMethod === 'manual' && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => updateField('bankName', e.target.value)}
                    placeholder="Chase Bank"
                    className={errors.bankName ? "border-red-500" : ""}
                  />
                  {errors.bankName && (
                    <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="routingNumber">Routing Number (ABA) *</Label>
                    <Input
                      id="routingNumber"
                      value={formData.routingNumber}
                      onChange={(e) => updateField('routingNumber', e.target.value.replace(/\D/g, '').slice(0, 9))}
                      placeholder="123456789"
                      maxLength={9}
                      className={errors.routingNumber ? "border-red-500" : ""}
                    />
                    {errors.routingNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.routingNumber}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => updateField('accountNumber', e.target.value)}
                      placeholder="Account number"
                      className={errors.accountNumber ? "border-red-500" : ""}
                    />
                    {errors.accountNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Account Type *</Label>
                  <RadioGroup
                    value={formData.accountType}
                    onValueChange={(value) => updateField('accountType', value)}
                    className="flex space-x-6 mt-2"
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
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep6 = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Authorized Signer Information
        </CardTitle>
        <CardDescription>
          Verify the identity of the authorized signer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="signerFullName">Full Legal Name *</Label>
            <Input
              id="signerFullName"
              value={formData.signerFullName}
              onChange={(e) => updateField('signerFullName', e.target.value)}
              placeholder="John Smith"
              className={errors.signerFullName ? "border-red-500" : ""}
            />
            {errors.signerFullName && (
              <p className="text-red-500 text-sm mt-1">{errors.signerFullName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="signerDob">Date of Birth *</Label>
            <Input
              id="signerDob"
              type="date"
              value={formData.signerDob}
              onChange={(e) => updateField('signerDob', e.target.value)}
              className={errors.signerDob ? "border-red-500" : ""}
            />
            {errors.signerDob && (
              <p className="text-red-500 text-sm mt-1">{errors.signerDob}</p>
            )}
          </div>

          <div>
            <Label htmlFor="signerSsnLast4">Last 4 SSN *</Label>
            <Input
              id="signerSsnLast4"
              value={formData.signerSsnLast4}
              onChange={(e) => updateField('signerSsnLast4', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="1234"
              maxLength={4}
              className={errors.signerSsnLast4 ? "border-red-500" : ""}
            />
            {errors.signerSsnLast4 && (
              <p className="text-red-500 text-sm mt-1">{errors.signerSsnLast4}</p>
            )}
          </div>

          <div>
            <Label htmlFor="ownershipPercentage">Ownership Percentage *</Label>
            <Input
              id="ownershipPercentage"
              type="number"
              value={formData.ownershipPercentage}
              onChange={(e) => updateField('ownershipPercentage', e.target.value)}
              placeholder="100"
              min="0"
              max="100"
              className={errors.ownershipPercentage ? "border-red-500" : ""}
            />
            {errors.ownershipPercentage && (
              <p className="text-red-500 text-sm mt-1">{errors.ownershipPercentage}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="signerHomeAddress">Home Address *</Label>
            <Input
              id="signerHomeAddress"
              value={formData.signerHomeAddress}
              onChange={(e) => updateField('signerHomeAddress', e.target.value)}
              placeholder="123 Main Street, City, State 12345"
              className={errors.signerHomeAddress ? "border-red-500" : ""}
            />
            {errors.signerHomeAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.signerHomeAddress}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="idUpload">Upload ID (Driver's License or Passport) *</Label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                {formData.idUpload && (
                  <p className="text-sm text-green-600 font-medium">
                    ✓ {formData.idUpload.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={(e) => updateField('agreedToTerms', e.target.checked)}
                className="mt-1"
              />
              <Label htmlFor="agreedToTerms" className="text-sm">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and authorize HealthPay to verify the information provided and process payments from the connected bank account.
              </Label>
            </div>
            {errors.agreedToTerms && (
              <p className="text-red-500 text-sm mt-1">{errors.agreedToTerms}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="text-black min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {renderProgressBar()}
        
        <div className="mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>

        <div className="flex justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Setting up...
              </>
            ) : currentStep === steps.length ? (
              <>
                Complete Setup
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}