"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  DollarSign,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Clinic } from "@/features/clinics/types";

export interface ClinicCardProps {
  clinic: Clinic;
  onView: (clinic: Clinic) => void;
}

export default function Component({ clinic, onView }: ClinicCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card
        className={`rounded-xl overflow-hidden transition-all duration-200 cursor-pointer border border-gray-200 ${
          isHovered ? "shadow-lg border-gray-300" : "shadow-sm"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header Section - Simplified */}
        <div className="bg-white px-6 ">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 bg-[#1557f6]">
                <AvatarFallback className="bg-[#1557f6] text-white">
                  <Building2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  Sunrise Medical Center
                </h3>
                <p className="text-sm text-gray-600 mt-1">General Practice</p>
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

          {/* Status and Rating - Unified Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 border-0"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-[2px]"></div>
                Active
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-gray-900 text-gray-900" />
                <span className="text-sm font-semibold text-gray-900">4.8</span>
                <span className="text-sm text-gray-500">(127)</span>
              </div>
          </div>
        </div>

        <CardContent className="p-0">
          {/* Key Metrics - Clean Layout */}
          <div className="px-6 py-5 bg-[#e9f9fb] border-y border-[#effafb] rounded-xl mx-5">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600 font-medium">
                    Active Plans
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">45</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600 font-medium">
                    Revenue
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">$125K</div>
              </div>
            </div>
          </div>

          {/* Contact Information - Enhanced Presentation */}
          {/* Remove this entire section */}

          {/* Expandable Section - Enhanced Email */}
          {isExpanded && (
            <div className="px-6 py-5 bg-white border-t border-gray-100">
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="group">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                          <MapPin className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Los Angeles, CA
                          </p>
                          <p className="text-xs text-gray-500">Location</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <a
                      href="tel:+15551234567"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                          <Phone className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                            (555) 123-4567
                          </p>
                          <p className="text-xs text-gray-500">Phone</p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          Call
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="group">
                    <a
                      href="mailto:contact@sunrisemedical.com"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                          <Mail className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                            contact@sunrisemedical.com
                          </p>
                          <p className="text-xs text-gray-500">Email</p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          Email
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Section - Simplified */}
          <div className="px-6 pt-4 bg-white border-t border-gray-100">
            <div className="flex space-x-3">
              <Button
                className="flex-1 bg-white border-[1.5px] border-gray-200 hover:bg-[#1557f6] hover:text-white text-black"
                onClick={() => onView(clinic)}
              >
                View Details
              </Button>
              <Button
                // variant="outline"
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
