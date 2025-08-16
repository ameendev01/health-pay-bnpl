import React from 'react';
import { Lightbulb, ArrowRight, BarChart3, Calendar, TrendingUp, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Insight {
  id: string;
  type: 'high-impact' | 'pattern' | 'trend';
  title: string;
  description: string;
  confidence: number; // 1-3 dots
  action: string;
  actionIcon: React.ElementType;
  source: string;
  onClick: () => void;
}

const insights: Insight[] = [
  {
    id: '1',
    type: 'high-impact',
    title: 'Invisalign is most financed',
    description: 'Dental implant procedures show 32% growth potential in California market',
    confidence: 3,
    action: 'View procedure drill-down',
    actionIcon: BarChart3,
    source: 'Procedure Analytics',
    onClick: () => console.log('Navigate to procedure analytics')
  },
  {
    id: '2',
    type: 'pattern',
    title: 'Saturdays peak for new plans',
    description: 'Weekend appointments generate 40% more financing applications',
    confidence: 2,
    action: 'Schedule promo',
    actionIcon: Calendar,
    source: 'Hourly Payment Activity',
    onClick: () => console.log('Open promo scheduler')
  },
  {
    id: '3',
    type: 'trend',
    title: 'BNPL revenue +15% MoM',
    description: 'Buy-now-pay-later adoption accelerating across all clinic types',
    confidence: 3,
    action: 'Annotate revenue chart',
    actionIcon: TrendingUp,
    source: 'Revenue Chart',
    onClick: () => console.log('Highlight revenue chart')
  }
];

const getInsightTypeConfig = (type: string) => {
  switch (type) {
    case 'high-impact':
      return {
        dotColor: 'bg-green-500',
        borderClass: 'insight-chip high-impact',
        priority: 'High Impact'
      };
    case 'pattern':
      return {
        dotColor: 'bg-yellow-500',
        borderClass: 'insight-chip pattern',
        priority: 'Pattern'
      };
    case 'trend':
      return {
        dotColor: 'bg-blue-500',
        borderClass: 'insight-chip trend',
        priority: 'Trend'
      };
    default:
      return {
        dotColor: 'bg-gray-500',
        borderClass: 'insight-chip',
        priority: 'Info'
      };
  }
};

const ConfidenceIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center space-x-1" title={`Confidence: ${level}/3`}>
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className={`w-1.5 h-1.5 rounded-full ${
          i < level ? 'bg-gray-600' : 'bg-gray-300'
        }`}
      />
    ))}
  </div>
);

export default function ModernInsightChips() {
  return (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
          Key Insights
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">AI-powered insights with actionable recommendations</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight) => {
            const config = getInsightTypeConfig(insight.type);
            const ActionIcon = insight.actionIcon;
            
            return (
              <div
                key={insight.id}
                className={`${config.borderClass} group cursor-pointer`}
                onClick={insight.onClick}
              >
                {/* Priority Indicator */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${config.dotColor}`}></div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {config.priority}
                  </span>
                  <ConfidenceIndicator level={insight.confidence} />
                </div>
                
                {/* Main Content */}
                <div className="flex items-start justify-between mt-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
                  </div>
                  
                  {/* Action Button */}
                  <button className="ml-4 inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 group-hover:bg-blue-100 group-hover:text-blue-700">
                    <ActionIcon className="w-4 h-4 mr-1" />
                    {insight.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
                
                {/* Source (in tooltip on hover) */}
                <div className="mt-2 flex items-center space-x-2">
                  <Info className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">Source: {insight.source}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}