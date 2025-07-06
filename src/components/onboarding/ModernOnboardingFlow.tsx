"use client";
import React, { useState } from "react";
import {
  Building2,
  Stethoscope,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Settings,
  BarChart3,
  Users,
  Calendar,
} from "lucide-react";
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
  footprint: "single" | "multiple";
  // Payment Information
  // cardNumber: string;
  // expiryDate: string;
  // cvv: string;
  // cardholderName: string;

  // Banking Details
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: "checking" | "savings";

  // Clinic Profile
  clinicName: string;
  clinicType: string;
  address: string;
  phone: string;
  email: string;
  licenseNumber: string;
}

const steps = [
  {
    id: 1,
    title: "Choose Your Practise Type",
    subtitle: "How are you joining us today?",
    icon: Heart,
  },
  {
    id: 2,
    title: "Banking Details",
    subtitle: "Connect your bank account for seamless transactions",
    icon: Building2,
  },
  {
    id: 3,
    title: "Clinic Profile",
    subtitle: "Tell us about your healthcare practice",
    icon: Stethoscope,
  },
];

const clinicTypes = [
  "General Practice",
  "Dental Clinic",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Mental Health",
  "Urgent Care",
  "Specialty Clinic",
];

export default function ModernOnboardingFlow() {
  const [selectedOption, setSelectedOption] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    footprint: "single",
    // Banking Details
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
    // Clinic Profile
    clinicName: "",
    clinicType: "",
    address: "",
    phone: "",
    email: "",
    licenseNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
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
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
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
                          Single Clinic
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
                          Multiple Clinics
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-600 ">
                          Built for healthcare brands
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
              <Card className="border-slate-200 shadow-xl">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      placeholder="Bank Name"
                      value={formData.bankName}
                      onChange={(e) => updateField("bankName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="Account Number"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        updateField("accountNumber", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input
                      id="routingNumber"
                      placeholder="Routing Number"
                      value={formData.routingNumber}
                      onChange={(e) =>
                        updateField("routingNumber", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup
                      defaultValue="checking"
                      onValueChange={(value) =>
                        updateField(
                          "accountType",
                          value as "checking" | "savings"
                        )
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="checking" id="r1" />
                        <Label htmlFor="r1">Checking</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="savings" id="r2" />
                        <Label htmlFor="r2">Savings</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="border-slate-200 shadow-xl">
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input
                      id="clinicName"
                      placeholder="Clinic Name"
                      value={formData.clinicName}
                      onChange={(e) =>
                        updateField("clinicName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clinicType">Clinic Type</Label>
                    <Select
                      onValueChange={(value) =>
                        updateField("clinicType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Clinic Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {clinicTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Clinic Address</Label>
                    <Input
                      id="address"
                      placeholder="Clinic Address"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">
                      Medical License Number
                    </Label>
                    <Input
                      id="licenseNumber"
                      placeholder="Medical License Number"
                      value={formData.licenseNumber}
                      onChange={(e) =>
                        updateField("licenseNumber", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-8 flex justify-center">
            <Button
              onClick={handleNext}
              disabled={isSubmitting || (currentStep === 1 && !selectedOption)}
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Setting up your account...</span>
                </>
              ) : (
                <>
                  <span>
                    {currentStep === 3 ? "Complete Setup" : "Continue"}
                  </span>
                  {currentStep < 4 && <ArrowRight className="w-6 h-6 ml-2" />}
                  {currentStep === 4 && <Sparkles className="w-6 h-6 ml-2" />}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
