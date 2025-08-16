import React from 'react';
import { Plus, Bell, Calendar, FileText, Zap, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

const quickActions: QuickAction[] = [
  {
    id: 'create-alert',
    title: 'Create Alert',
    description: 'Set up custom notifications',
    icon: Bell,
    color: 'bg-blue-100 text-blue-600',
    onClick: () => console.log('Create alert')
  },
  {
    id: 'schedule-promo',
    title: 'Schedule Promo',
    description: 'Plan marketing campaigns',
    icon: Calendar,
    color: 'bg-green-100 text-green-600',
    onClick: () => console.log('Schedule promo')
  },
  {
    id: 'export-report',
    title: 'Custom Report',
    description: 'Generate detailed analysis',
    icon: FileText,
    color: 'bg-purple-100 text-purple-600',
    onClick: () => console.log('Create custom report')
  },
  {
    id: 'automation',
    title: 'Create Automation',
    description: 'Set up workflow triggers',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600',
    onClick: () => console.log('Create automation')
  }
];

export default function ModernQuickActions() {
  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Quick Actions
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">Common tasks and automations</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-left group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 group-hover:text-gray-700">{action.title}</p>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}