import React from 'react';
import { X, AlertTriangle, Clock, XCircle, ArrowRight, AlertCircle } from 'lucide-react';

interface Issue {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  impact: string;
  action: string;
  link: string;
  timestamp: string;
}

interface ModernIssueDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const issues: Issue[] = [
  {
    id: '1',
    type: 'critical',
    title: 'High Default Risk Detected',
    description: 'Metro Dental Care shows 45% risk score with 8-point increase',
    impact: 'Potential $67k revenue at risk',
    action: 'Review clinic performance',
    link: '/analytics?view=risk&clinic=metro-dental',
    timestamp: '5 min ago'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Payment Processing Delays',
    description: '23 payments are overdue by 5+ days across 3 clinics',
    impact: 'Affects customer satisfaction',
    action: 'Send payment reminders',
    link: '/payments?status=overdue',
    timestamp: '1 hour ago'
  }
];

const getIssueConfig = (type: string) => {
  switch (type) {
    case 'critical':
      return {
        icon: XCircle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
        titleColor: 'text-red-900'
      };
    case 'warning':
      return {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        iconColor: 'text-yellow-600',
        titleColor: 'text-yellow-900'
      };
    case 'info':
      return {
        icon: AlertCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        titleColor: 'text-blue-900'
      };
    default:
      return {
        icon: AlertCircle,
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        iconColor: 'text-gray-600',
        titleColor: 'text-gray-900'
      };
  }
};

export default function ModernIssueDrawer({ isOpen, onClose }: ModernIssueDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out border-l border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Issues & Alerts</h2>
            <p className="text-sm text-gray-600 mt-1">{issues.length} items need attention</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto h-full pb-24">
          {issues.map((issue) => {
            const config = getIssueConfig(issue.type);
            const Icon = config.icon;
            
            return (
              <div
                key={issue.id}
                className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} hover:shadow-sm transition-all duration-200`}
              >
                {/* Header */}
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center border ${config.borderColor}`}>
                    <Icon className={`w-4 h-4 ${config.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${config.titleColor}`}>{issue.title}</h3>
                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        {issue.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{issue.description}</p>
                  </div>
                </div>
                
                {/* Impact */}
                <div className="mb-3 p-2 bg-white rounded border border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">Impact:</p>
                  <p className="text-sm text-gray-900">{issue.impact}</p>
                </div>
                
                {/* Action */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => window.location.href = issue.link}
                    className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    {issue.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{issue.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
          <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
            View All Issues
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </>
  );
}