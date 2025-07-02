'use client'

import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Save,
  AlertCircle
} from 'lucide-react';

interface AddClinicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (clinicData: any) => void;
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

export default function AddClinicModal({ isOpen, onClose, onSubmit }: AddClinicModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) newErrors.name = 'Clinic name is required';
    if (!formData.type) newErrors.type = 'Clinic type is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        ...formData,
        id: Date.now(),
        status: 'pending',
        totalPlans: 0,
        monthlyRevenue: '$0',
        joinDate: new Date().toISOString().split('T')[0],
        location: `${formData.city}, ${formData.state}`
      });
      
      setFormData({
        name: '',
        type: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding clinic:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Clinic</h2>
                <p className="text-sm text-gray-600">Enter the essential details to get started.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter clinic name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 ${errors.type ? 'border-red-300' : 'border-gray-300'}`}
                >
                  <option value="">Select clinic type</option>
                  {clinicTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 ${errors.address ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Enter street address"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 ${errors.city ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="City"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 ${errors.state ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="State"
                  />
                  {errors.state && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 ${errors.zipCode ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="ZIP"
                  />
                  {errors.zipCode && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.zipCode}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-8 border-t border-gray-200 mt-8 space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Clinic...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Add Clinic
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
