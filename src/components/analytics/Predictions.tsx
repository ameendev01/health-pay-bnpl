
import React from 'react';
import { TrendingUp, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Predictions() {
  return (
    <div className="space-y-6">
      {/* Revenue Predictions */}
      <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Next Month's Forecast</CardTitle>
          <p className="text-sm text-gray-600 mt-1">Based on current trends, we project you will add <span className="font-bold text-blue-600">50 new payment plans</span> next month, generating an estimated <span className="font-bold text-blue-600">$150,000</span> in revenue.</p>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between space-x-2">
            {[ 
              { month: 'Jul', actual: 290000, predicted: null },
              { month: 'Aug', actual: null, predicted: 325000 },
              { month: 'Sep', actual: null, predicted: 340000 },
              { month: 'Oct', actual: null, predicted: 365000 },
              { month: 'Nov', actual: null, predicted: 380000 },
              { month: 'Dec', actual: null, predicted: 395000 },
            ].map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full">
                  {item.actual ? (
                    <div 
                      className="w-full bg-green-500 rounded-t-lg"
                      style={{ 
                        height: `${(item.actual / 400000) * 250}px`,
                        minHeight: '20px'
                      }}
                      title={`Actual: ${item.actual.toLocaleString()}`}
                    ></div>
                  ) : (
                    <div 
                      className="w-full bg-blue-500 rounded-t-lg"
                      style={{ 
                        height: `${(item.predicted! / 400000) * 250}px`,
                        minHeight: '20px'
                      }}
                      title={`Predicted: ${item.predicted!.toLocaleString()}`}
                    ></div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-900">{item.month}</p>
                  <p className="text-xs text-gray-600">
                    ${((item.actual || item.predicted!) / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Actual Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Predicted Revenue</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Growth Opportunities</CardTitle>
            <p className="text-sm text-gray-600 mt-1">AI-identified expansion opportunities</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-full"><TrendingUp className="w-5 h-5 text-green-600" /></div>
                    <p className="text-sm text-gray-700">Dental implant procedures show <span className="font-semibold">32% growth potential</span> in California market.</p>
                </div>
                <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full"><Target className="w-5 h-5 text-blue-600" /></div>
                    <p className="text-sm text-gray-700">Untapped market in Florida with <span className="font-semibold">45% higher average payment values</span>.</p>
                </div>
                <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 rounded-full"><Zap className="w-5 h-5 text-purple-600" /></div>
                    <p className="text-sm text-gray-700">Automated payment reminders could <span className="font-semibold">reduce late payments by 23%</span>.</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Predictive Metrics</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Key performance indicators forecast</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Expected Growth Rate</span>
                  <span className="text-sm font-bold text-green-600">+18.5%</span>
                </div>
                <Progress value={75} indicatorClassName="bg-green-500" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Market Penetration</span>
                  <span className="text-sm font-bold text-blue-600">34.2%</span>
                </div>
                <Progress value={34} indicatorClassName="bg-blue-500" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Customer Retention</span>
                  <span className="text-sm font-bold text-teal-600">92.8%</span>
                </div>
                <Progress value={93} indicatorClassName="bg-teal-500" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Risk Score</span>
                  <span className="text-sm font-bold text-orange-600">Low (12.3)</span>
                </div>
                <Progress value={15} indicatorClassName="bg-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

