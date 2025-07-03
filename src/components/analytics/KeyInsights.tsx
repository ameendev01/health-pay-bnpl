import React from 'react';
import { Lightbulb, TrendingUp, Users, DollarSign } from 'lucide-react';

const insights = [
  {
    text: "Your most popular financed procedure is 'Invisalign' with 32% growth this month.",
    source: 'Procedure Analytics',
    icon: TrendingUp,
    color: 'emerald'
  },
  {
    text: 'Saturdays show 45% higher conversion rates for new payment plan applications.',
    source: 'Hourly Payment Activity',
    icon: Users,
    color: 'blue'
  },
  {
    text: 'Revenue from BNPL has increased by 15% month-over-month across all clinics.',
    source: 'Revenue Chart',
    icon: DollarSign,
    color: 'purple'
  },
];

export default function KeyInsights() {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-50 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-yellow-50 rounded-lg">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Key Insights</h2>
          <p className="text-sm text-gray-500">AI-powered analytics from your data</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                insight.color === 'emerald' ? 'bg-emerald-50' :
                insight.color === 'blue' ? 'bg-blue-50' : 'bg-purple-50'
              }`}>
                <insight.icon className={`w-4 h-4 ${
                  insight.color === 'emerald' ? 'text-emerald-600' :
                  insight.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                }`} />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-gray-900 leading-relaxed">
                  {insight.text}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    insight.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                    insight.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {insight.source}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}