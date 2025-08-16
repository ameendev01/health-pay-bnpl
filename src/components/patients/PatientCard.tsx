"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Patient } from "@/features/patients/types";

export interface PatientCardProps {
  patient: Patient;
  onView: (patient: Patient) => void;
}

export default function PatientCard({ patient, onView }: PatientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birth = new Date(dateOfBirth);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card
        className={`rounded-xl transition-all duration-200 cursor-pointer border border-gray-200 ${
          isHovered ? "shadow-lg border-gray-300" : "shadow-sm"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header Section */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 bg-[#1557f6]">
                <AvatarFallback className="bg-[#1557f6] text-white">
                  {getInitials(patient.firstName, patient.lastName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {patient.firstName} {patient.lastName}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  {patient.dateOfBirth && (
                    <p className="text-sm text-gray-600">Age {formatAge(patient.dateOfBirth)}</p>
                  )}
                  {patient.medicalRecordNumber && (
                    <p className="text-sm text-gray-500">MRN: {patient.medicalRecordNumber}</p>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600 -mt-1"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Status and Quick Info */}
          <div className="flex items-center justify-between">
            <Badge
              className={`${getStatusColor(patient.status)} border-0`}
            >
              <div
                className={`w-2 h-2 ${
                  patient.status === "active"
                    ? "bg-green-500"
                    : patient.status === "inactive"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                } rounded-full mr-2`}
              ></div>
              {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
            </Badge>
            <div className="text-sm text-gray-600">
              Member since {new Date(patient.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          {/* Key Metrics */}
          <div className="px-6 py-5 bg-[#e9f9fb] border-y border-[#effafb] rounded-xl mx-5">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CreditCard className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600 font-medium">
                    Active Plans
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  2 {/* This will be dynamic from patient payment plans */}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600 font-medium">
                    Last Visit
                  </span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  Jan 15, 2024
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Contact Information */}
          {isExpanded && (
            <div className="px-6 py-5 bg-white border-t border-gray-100">
              <div className="space-y-4">
                {patient.email && (
                  <div className="group">
                    <a
                      href={`mailto:${patient.email}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                          <Mail className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                            {patient.email}
                          </p>
                          <p className="text-xs text-gray-500">Email</p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                {patient.phone && (
                  <div className="group">
                    <a
                      href={`tel:${patient.phone}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                          <Phone className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                            {patient.phone}
                          </p>
                          <p className="text-xs text-gray-500">Phone</p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                {patient.address && (
                  <div className="group">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                          <MapPin className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {patient.address}
                          </p>
                          <p className="text-xs text-gray-500">
                            {patient.city}, {patient.state} {patient.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Section */}
          <div className="px-6 pt-4 bg-white border-t border-gray-100">
            <div className="flex space-x-3">
              <Button
                className="flex-1 bg-white border-[1.5px] border-gray-200 hover:bg-[#1557f6] hover:text-white text-black"
                onClick={() => onView(patient)}
              >
                View Details
              </Button>
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-4 bg-white border-gray-200 border-[1.5px] hover:bg-gray-50"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-black" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-black" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}