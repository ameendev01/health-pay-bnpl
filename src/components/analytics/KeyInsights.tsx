import React from 'react';
import { Lightbulb } from 'lucide-react';

const insights = [
  {
    text: "Your most popular financed procedure is 'Invisalign'.",
    source: 'Procedure Analytics',
  },
  {
    text: 'Saturdays are your busiest day for new payment plans.',
    source: 'Hourly Payment Activity',
  },
  {
    text: 'Revenue from BNPL has increased by 15% month-over-month.',
    source: 'Revenue Chart',
  },
];

export default function KeyInsights() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-900">Key Insights</h2>
      </div>
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-800">{insight.text}</p>
              <p className="text-xs text-gray-500">Source: {insight.source}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
