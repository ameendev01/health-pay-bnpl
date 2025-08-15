
import React from 'react';
import { Lightbulb, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <CardTitle className="text-lg font-semibold text-gray-900">Key Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="text-sm text-gray-800">{insight.text}</p>
                <p className="text-xs text-gray-500">Source: {insight.source}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

