import React from 'react';
import { CreditCard } from 'lucide-react';

export default function BillingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription Plan</h3>
        <div className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-gray-900">Enterprise Plan</p>
              <p className="text-gray-600">$299/month • Unlimited clinics and transactions</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Active</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-8 h-8 text-gray-400" />
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4532</p>
              <p className="text-sm text-gray-600">Expires 12/26</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
