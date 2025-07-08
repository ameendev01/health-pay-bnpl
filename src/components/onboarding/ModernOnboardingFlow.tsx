"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Building2, CreditCard, FileText, MapPin, Stethoscope, User, Users, CheckCircle } from "lucide-react"

const STEPS = [
  { id: 1, title: "Business Type", icon: Building2 },
  { id: 2, title: "Legal Identity", icon: FileText },
  { id: 3, title: "Clinic Credentials", icon: Stethoscope },
  { id: 4, title: "Primary Location", icon: MapPin },
  { id: 5, title: "Operating Profile", icon: Users },
  { id: 6, title: "EHR/PMS Stack", icon: FileText },
  { id: 7, title: "Point of Contact", icon: User },
  { id: 8, title: "Banking Setup", icon: CreditCard },
  { id: 9, title: "Identity Verification", icon: User },
  { id: 10, title: "Agreements", icon: FileText },
]

export default function ModernOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessType: "",
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
    ownerName: "",
    workEmail: "",
    mobile: "",
    routingNumber: "",
    accountNumber: "",
    accountType: "",
    bankName: "",
    signerName: "",
    dob: "",
    ssnLast4: "",
    homeAddress: "",
    ownershipPercent: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">Choose Your Setup</h2>
              <p className="text-lg text-gray-600">Select the option that best describes your practice</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Single Clinic Card */}
              <div
                className={`relative p-8 bg-white rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  formData.businessType === "single"
                    ? "border-blue-500 shadow-lg ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => updateFormData("businessType", "single")}
              >
                {/* Selection indicator */}
                {formData.businessType === "single" && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                {/* Title and subtitle */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Single Clinic</h3>
                  <p className="text-gray-600">Perfect for independent practitioners</p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-blue-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Scheduling</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-blue-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Patients</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-blue-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Analytics</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-blue-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Setup</span>
                  </div>
                </div>

                {/* Ideal for text */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">Ideal for:</span> Solo practitioners, small clinics
                  </p>
                </div>
              </div>

              {/* Multiple Clinics Card */}
              <div
                className={`relative p-8 bg-white rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  formData.businessType === "brand"
                    ? "border-emerald-500 shadow-lg ring-2 ring-emerald-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => updateFormData("businessType", "brand")}
              >
                {/* Selection indicator */}
                {formData.businessType === "brand" && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>

                {/* Title and subtitle */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Multiple Clinics</h3>
                  <p className="text-gray-600">Built for healthcare brands</p>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-emerald-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2v1h12V6H4zm0 3v5h12v-5H4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Multi-Location</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-emerald-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Team Mgmt</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-emerald-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Analytics</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 text-emerald-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Permissions</span>
                  </div>
                </div>

                {/* Ideal for text */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">Ideal for:</span> Healthcare chains, enterprises
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Legal Identity</h2>
              <p className="text-muted-foreground">Required for FinCEN "Know Your Business" compliance</p>
            </div>
            <div className="grid grid-cols-2 grid-rows-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="legalBusinessName">Legal Business Name *</Label>
                <Input
                  id="legalBusinessName"
                  value={formData.legalBusinessName}
                  onChange={(e) => updateFormData("legalBusinessName", e.target.value)}
                  placeholder="Enter your legal business name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dba">DBA (Doing Business As)</Label>
                <Input
                  id="dba"
                  value={formData.dba}
                  onChange={(e) => updateFormData("dba", e.target.value)}
                  placeholder="Enter DBA if different from legal name"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="ein">EIN / Tax-ID *</Label>
                <Input
                  id="ein"
                  value={formData.ein}
                  onChange={(e) => updateFormData("ein", e.target.value)}
                  placeholder="XX-XXXXXXX"
                />
              </div>
              <div className="space-y-2 row-start-3">
                <Label htmlFor="entityType">Entity Type *</Label>
                <Select value={formData.entityType} onValueChange={(value) => updateFormData("entityType", value)}>
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
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Clinic Credentials</h2>
              <p className="text-muted-foreground">
                Required to verify your clinic is authorized to provide healthcare
              </p>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medicalLicenseNumber">State Medical License # *</Label>
                <Input
                  id="medicalLicenseNumber"
                  value={formData.medicalLicenseNumber}
                  onChange={(e) => updateFormData("medicalLicenseNumber", e.target.value)}
                  placeholder="e.g., FL AHCA 9233 | TX 007971 | CA 20-016-057"
                />
                <p className="text-xs text-muted-foreground">Or facility license # for dental/vision</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="npi">NPI of Supervising Physician *</Label>
                <Input
                  id="npi"
                  value={formData.npi}
                  onChange={(e) => updateFormData("npi", e.target.value)}
                  placeholder="10-digit NPI number"
                />
              </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => updateFormData("expiryDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stateOfIssuance">State of Issuance *</Label>
                  <Select
                    value={formData.stateOfIssuance}
                    onValueChange={(value) => updateFormData("stateOfIssuance", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      {/* Add more states as needed */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Primary Location</h2>
              <p className="text-muted-foreground">Required for state-law compliance and fraud prevention</p>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address *</Label>
                <Input
                  id="streetAddress"
                  value={formData.streetAddress}
                  onChange={(e) => updateFormData("streetAddress", e.target.value)}
                  placeholder="Enter street address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suite">Suite/Unit</Label>
                <Input
                  id="suite"
                  value={formData.suite}
                  onChange={(e) => updateFormData("suite", e.target.value)}
                  placeholder="Suite, unit, or floor"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                    placeholder="12345"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeZone">Time Zone *</Label>
                <Select value={formData.timeZone} onValueChange={(value) => updateFormData("timeZone", value)}>
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
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Operating Profile</h2>
              <p className="text-muted-foreground">Helps us understand your practice for underwriting</p>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="medicalSpecialty">Medical Specialty *</Label>
                <Select
                  value={formData.medicalSpecialty}
                  onValueChange={(value) => updateFormData("medicalSpecialty", value)}
                >
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceRange">Typical Procedure Price Range *</Label>
                <Select value={formData.priceRange} onValueChange={(value) => updateFormData("priceRange", value)}>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyVolume">Average Monthly Patient Volume *</Label>
                <Select
                  value={formData.monthlyVolume}
                  onValueChange={(value) => updateFormData("monthlyVolume", value)}
                >
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
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">EHR/PMS Stack</h2>
              <p className="text-muted-foreground">Helps us understand integration complexity</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ehrVendor">EHR Vendor *</Label>
                <Select value={formData.ehrVendor} onValueChange={(value) => updateFormData("ehrVendor", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your EHR system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="athena">Athena Health</SelectItem>
                    <SelectItem value="drchrono">DrChrono</SelectItem>
                    <SelectItem value="nextgen">NextGen</SelectItem>
                    <SelectItem value="allscripts">Allscripts</SelectItem>
                    <SelectItem value="practice-fusion">Practice Fusion</SelectItem>
                    <SelectItem value="kareo">Kareo</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="none">No EHR System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.ehrVendor === "other" && (
                <div className="space-y-2">
                  <Label htmlFor="otherEhr">Please specify your EHR system</Label>
                  <Input id="otherEhr" placeholder="Enter your EHR system name" />
                </div>
              )}
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Point of Contact</h2>
              <p className="text-muted-foreground">Required for contractual communications and notices</p>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner/Manager Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => updateFormData("ownerName", e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workEmail">Work Email *</Label>
                <Input
                  id="workEmail"
                  type="email"
                  value={formData.workEmail}
                  onChange={(e) => updateFormData("workEmail", e.target.value)}
                  placeholder="email@clinic.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => updateFormData("mobile", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Banking Setup</h2>
              <p className="text-muted-foreground">Connect your payout account for receiving funds</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Secure Bank Connection</span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  We'll use Plaid to securely connect your bank account. If that doesn't work, we'll collect your
                  details manually.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Connect with Plaid</Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number (ABA) *</Label>
                  <Input
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) => updateFormData("routingNumber", e.target.value)}
                    placeholder="9-digit routing number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => updateFormData("accountNumber", e.target.value)}
                    placeholder="Account number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Select value={formData.accountType} onValueChange={(value) => updateFormData("accountType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => updateFormData("bankName", e.target.value)}
                    placeholder="Will auto-fill from routing number"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Identity Verification</h2>
              <p className="text-muted-foreground">
                Required for authorized signer and UBO (Ultimate Beneficial Owner) verification
              </p>
            </div>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="signerName">Full Legal Name *</Label>
                <Input
                  id="signerName"
                  value={formData.signerName}
                  onChange={(e) => updateFormData("signerName", e.target.value)}
                  placeholder="Enter full legal name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateFormData("dob", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssnLast4">SSN Last 4 Digits *</Label>
                  <Input
                    id="ssnLast4"
                    value={formData.ssnLast4}
                    onChange={(e) => updateFormData("ssnLast4", e.target.value)}
                    placeholder="1234"
                    maxLength={4}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeAddress">Home Address *</Label>
                <Textarea
                  id="homeAddress"
                  value={formData.homeAddress}
                  onChange={(e) => updateFormData("homeAddress", e.target.value)}
                  placeholder="Enter complete home address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownershipPercent">Ownership Percentage</Label>
                <Input
                  id="ownershipPercent"
                  value={formData.ownershipPercent}
                  onChange={(e) => updateFormData("ownershipPercent", e.target.value)}
                  placeholder="Enter if ≥ 25%"
                />
                <p className="text-xs text-muted-foreground">Only required if you own 25% or more of the business</p>
              </div>
              <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                <p className="text-sm text-amber-800 mb-3">
                  Please upload a photo of your driver's license or passport for identity verification.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Upload ID Document
                </Button>
              </div>
            </div>
          </div>
        )

      case 10:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Final Step: Agreements</h2>
              <p className="text-muted-foreground">Review and sign the required agreements to complete setup</p>
            </div>
            <div className="space-y-4">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold mb-2">Documents to Review & Sign:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    ACH Debit Authorization Agreement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    BNPL Provider Service Agreement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Privacy Policy & Terms of Service
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I have read and agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="ach" />
                  <Label htmlFor="ach" className="text-sm">
                    I authorize ACH debits from the connected bank account
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="accuracy" />
                  <Label htmlFor="accuracy" className="text-sm">
                    I certify that all information provided is accurate and complete
                  </Label>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Ready to Complete Setup</span>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Click below to electronically sign all agreements and complete your onboarding.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">Sign & Finish Setup</Button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className=" py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-black">Clinic Onboarding</h1>
            <Badge variant="secondary" className=" text-white bg-[var(--primary)]">
              Step {currentStep} of {STEPS.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Step Indicators */}
          <div className="flex justify-between mt-4 overflow-x-auto">
            {STEPS.map((step) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center min-w-0 flex-1 ${
                    isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                      isActive
                        ? "bg-blue-100 border-2 border-blue-600"
                        : isCompleted
                          ? "bg-green-100 border-2 border-green-600"
                          : "bg-gray-100 border-2 border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-center px-1">{step.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <div className="p-8">{renderStepContent()}</div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          <Button onClick={nextStep} disabled={currentStep === STEPS.length}>
            {currentStep === STEPS.length ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
