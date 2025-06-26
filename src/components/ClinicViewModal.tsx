'use client'

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  User,
  FileText,
  Save,
  Edit3,
  TrendingUp,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Globe,
  Clock
} from 'lucide-react';

interface ClinicData {
  id: number;
  name: string;
  type: string;
  location: string;
  phone: string;
  email: string;
  status: string;
  totalPlans: number;
  monthlyRevenue: string;
  joinDate: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  website?: string;
  contactPerson?: string;
  contactTitle?: string;
  contactPhone?: string;
  contactEmail?: string;
  description?: string;
  operatingHours?: string;
  specialties?: string;
}

interface ClinicViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: ClinicData | null;
  onUpdate: (clinicData: ClinicData) => void;
}

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

export default function ClinicViewModal({ isOpen, onClose, clinic, onUpdate }: ClinicViewModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState<ClinicData | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (clinic) {
      setFormData({
        ...clinic,
        address: clinic.address || '123 Medical Center Dr',
        city: clinic.city || clinic.location?.split(', ')[0] || '',
        state: clinic.state || clinic.location?.split(', ')[1] || '',
        zipCode: clinic.zipCode || '12345',
        website: clinic.website || '',
        contactPerson: clinic.contactPerson || 'Dr. John Smith',
        contactTitle: clinic.contactTitle || 'Medical Director',
        contactPhone: clinic.contactPhone || clinic.phone,
        contactEmail: clinic.contactEmail || clinic.email,
        description: clinic.description || 'Full-service medical facility providing comprehensive healthcare services to the community.',
        operatingHours: clinic.operatingHours || 'Mon-Fri 8AM-6PM, Sat 9AM-2PM',
        specialties: clinic.specialties || 'General Medicine, Preventive Care'
      });
    }
  }, [clinic]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    setFormData(prev => prev ? {
      ...prev,
      [name]: value
    } : null);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    if (!formData) return false;
    
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = 'Clinic name is required';
    if (!formData.type) newErrors.type = 'Clinic type is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData || !validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onUpdate({
        ...formData,
        location: `${formData.city}, ${formData.state}`
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating clinic:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Building2 },
    { id: 'contact', name: 'Contact', icon: Phone },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
    { id: 'details', name: 'Details', icon: FileText },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!isOpen || !clinic || !formData) return null;

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Status and Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Status</h4>
            {getStatusIcon(formData.status)}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(formData.status)}`}>
              {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Active Plans</h4>
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formData.totalPlans}</p>
          <p className="text-sm text-gray-600 mt-1">Payment plans</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Monthly Revenue</h4>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formData.monthlyRevenue}</p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Basic Information</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.type ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  {clinicTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-600">Clinic Name</p>
                <p className="font-semibold text-gray-900">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-semibold text-gray-900">{formData.type}</p>
              </div>
            </>
          )}
          
          <div>
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="font-semibold text-gray-900">{new Date(formData.joinDate).toLocaleDateString()}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600">Clinic ID</p>
            <p className="font-semibold text-gray-900">#{formData.id}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Description</h4>
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Clinic description..."
          />
        ) : (
          <p className="text-gray-700">{formData.description}</p>
        )}
      </div>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      {/* Main Contact */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-teal-600" />
          Main Contact Information
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{formData.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{formData.email}</p>
                </div>
              </div>
              {formData.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-700">
                      {formData.website}
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-teal-600" />
          Address
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{formData.address}</p>
                  <p className="text-gray-600">{formData.city}, {formData.state} {formData.zipCode}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Primary Contact Person */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-teal-600" />
          Primary Contact Person
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="contactTitle"
                  value={formData.contactTitle || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{formData.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Title</p>
                <p className="font-semibold text-gray-900">{formData.contactTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">{formData.contactPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{formData.contactEmail}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Payment Volume</h4>
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{formData.totalPlans}</p>
            <p className="text-sm text-gray-600">Active payment plans</p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Revenue</h4>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{formData.monthlyRevenue}</p>
            <p className="text-sm text-gray-600">Monthly revenue</p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-600 font-medium">+8.5%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New payment plan created</p>
              <p className="text-xs text-gray-600">Patient: Sarah M. - $1,200 treatment plan</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Payment received</p>
              <p className="text-xs text-gray-600">Patient: John D. - $450 installment payment</p>
            </div>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Plan completed</p>
              <p className="text-xs text-gray-600">Patient: Michael R. - $850 treatment completed</p>
            </div>
            <span className="text-xs text-gray-500">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Operating Information */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Operating Information</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours</label>
                <input
                  type="text"
                  name="operatingHours"
                  value={formData.operatingHours || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., Mon-Fri 8AM-6PM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                <input
                  type="text"
                  name="specialties"
                  value={formData.specialties || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="e.g., Cosmetic Surgery, Emergency Care"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-600">Operating Hours</p>
                <p className="font-semibold text-gray-900">{formData.operatingHours}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Specialties</p>
                <p className="font-semibold text-gray-900">{formData.specialties}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Integration Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Integration Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">API Integration</p>
              <p className="text-sm text-gray-600">Direct API connection for real-time data sync</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Webhook Notifications</p>
              <p className="text-sm text-gray-600">Automatic notifications for payment events</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Enabled</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">EMR Integration</p>
              <p className="text-sm text-gray-600">Electronic Medical Records sync</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-yellow-600">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'contact':
        return renderContactTab();
      case 'performance':
        return renderPerformanceTab();
      case 'details':
        return renderDetailsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
                <p className="text-sm text-gray-600">{formData.type} • {formData.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-teal-500 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}