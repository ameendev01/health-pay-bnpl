import React from 'react';
import { TrendingUp, Target, Zap } from 'lucide-react';

export default function Predictions() {
  return (
    <div className="space-y-6">
      {/* Revenue Predictions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Forecasting</h2>
          <p className="text-sm text-gray-600 mt-1">AI-powered revenue predictions for next 6 months</p>
        </div>
        <div className="p-6">
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
                      className="w-full bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-lg"
                      style={{ 
                        height: `${(item.actual / 400000) * 250}px`,
                        minHeight: '20px'
                      }}
                      title={`Actual: $${item.actual.toLocaleString()}`}
                    ></div>
                  ) : (
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg"
                      style={{ 
                        height: `${(item.predicted! / 400000) * 250}px`,
                        minHeight: '20px'
                      }}
                      title={`Predicted: $${item.predicted!.toLocaleString()}`}
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
              <div className="w-3 h-3 bg-teal-500 rounded"></div>
              <span className="text-sm text-gray-600">Actual Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Predicted Revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Growth Opportunities</h3>
            <p className="text-sm text-gray-600 mt-1">AI-identified expansion opportunities</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">High Growth Potential</span>
                </div>
                <p className="text-sm text-green-700 mb-2">
                  Dental implant procedures show 32% growth potential in California market
                </p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Recommended Action</span>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Market Expansion</span>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  Untapped market in Florida with 45% higher average payment values
                </p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Consider</span>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Process Optimization</span>
                </div>
                <p className="text-sm text-purple-700 mb-2">
                  Automated payment reminders could reduce late payments by 23%
                </p>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Quick Win</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Predictive Metrics</h3>
            <p className="text-sm text-gray-600 mt-1">Key performance indicators forecast</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Expected Growth Rate</span>
                  <span className="text-sm font-bold text-green-600">+18.5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Market Penetration</span>
                  <span className="text-sm font-bold text-blue-600">34.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Customer Retention</span>
                  <span className="text-sm font-bold text-teal-600">92.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Risk Score</span>
                  <span className="text-sm font-bold text-orange-600">Low (12.3)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
