"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  Eye,
  Users,
  DollarSign,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface AnalyticsCardProps {
  clinic: {
    id: number;
    name: string;
    type: string;
    location: string;
    phone: string;
    email: string;
    status: 'active' | 'pending' | 'inactive';
    totalPlans: number;
    monthlyRevenue: string;
    rating: number;
    reviewCount: number;
    viewCount: string;
    growth: number;
  };
  onViewDetails: (clinic: any) => void;
}

export default function AnalyticsCard({ clinic, onViewDetails }: AnalyticsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-0';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-0';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 border-0';
      default:
        return 'bg-gray-100 text-gray-700 border-0';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-gray-900 text-gray-900'
            : 'fill-gray-300 text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card
      className={`rounded-xl overflow-hidden transition-all duration-200 cursor-pointer border border-gray-200 ${
        isHovered ? "shadow-lg border-gray-300" : "shadow-sm"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Section */}
      <div className="bg-white p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 bg-gray-900">
              <AvatarFallback className="bg-gray-900 text-white">
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">{clinic.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{clinic.type}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 -mt-1">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Status and Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className={getStatusColor(clinic.status)}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                clinic.status === 'active' ? 'bg-green-500' :
                clinic.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></div>
              {clinic.status.charAt(0).toUpperCase() + clinic.status.slice(1)}
            </Badge>
            <div className="flex items-center space-x-1">
              {renderStars(clinic.rating)}
              <span className="text-sm font-semibold text-gray-900 ml-1">{clinic.rating}</span>
              <span className="text-sm text-gray-500">({clinic.reviewCount})</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500">
            <Eye className="h-4 w-4 mr-1" />
            <span className="text-sm">{clinic.viewCount}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        {/* Key Metrics */}
        <div className="px-6 py-5 bg-gray-50 border-y border-gray-100 mx-5 rounded-xl">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-600 font-medium">Active Plans</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{clinic.totalPlans}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-600 font-medium">Revenue</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{clinic.monthlyRevenue}</div>
            </div>
          </div>
        </div>

        {/* Expandable Section */}
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
                        <p className="text-sm font-medium text-gray-900">{clinic.location}</p>
                        <p className="text-xs text-gray-500">Location</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <a
                    href={`tel:${clinic.phone}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                        <Phone className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{clinic.phone}</p>
                        <p className="text-xs text-gray-500">Phone</p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Call</div>
                    </div>
                  </a>
                </div>

                <div className="group">
                  <a
                    href={`mailto:${clinic.email}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                        <Mail className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                          {clinic.email}
                        </p>
                        <p className="text-xs text-gray-500">Email</p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Email</div>
                    </div>
                  </a>
                </div>

                {/* Growth Metric */}
                <div className="group">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mr-3 group-hover:bg-gray-200 transition-colors duration-150">
                        {clinic.growth > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${clinic.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {clinic.growth > 0 ? '+' : ''}{clinic.growth}% Growth
                        </p>
                        <p className="text-xs text-gray-500">This month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Section */}
        <div className="px-6 py-4 bg-white border-t border-gray-100">
          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => onViewDetails(clinic)}
            >
              View Details
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 border-gray-300 hover:bg-gray-50"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}