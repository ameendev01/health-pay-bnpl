import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { Claim } from '@/features/claims/types';

interface ClaimTimelineProps {
  claim: Claim;
}

interface TimelineEvent {
  id: string;
  type: 'created' | 'submitted' | 'accepted' | 'denied' | 'paid' | 'resubmitted';
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

export default function ClaimTimeline({ claim }: ClaimTimelineProps) {
  // Generate timeline events based on claim data
  const generateTimelineEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];

    // Claim created
    events.push({
      id: 'created',
      type: 'created',
      title: 'Claim Created',
      description: `Claim ${claim.claimNumber} was created in the system`,
      timestamp: claim.createdAt,
      actor: 'System',
      icon: FileText,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    });

    // Claim submitted
    if (claim.submissionDate) {
      events.push({
        id: 'submitted',
        type: 'submitted',
        title: 'Claim Submitted',
        description: `Submitted to ${claim.payerName} via clearinghouse`,
        timestamp: claim.submissionDate,
        actor: 'Auto-Submit',
        icon: Send,
        iconColor: 'text-purple-600',
        bgColor: 'bg-purple-50'
      });
    }

    // Response received
    if (claim.responseDate) {
      const isAccepted = claim.status === 'accepted' || claim.status === 'paid';
      events.push({
        id: 'response',
        type: isAccepted ? 'accepted' : 'denied',
        title: isAccepted ? 'Claim Accepted' : 'Claim Denied',
        description: isAccepted 
          ? `Claim approved for ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(claim.allowedAmount || claim.totalAmount)}`
          : 'Claim was denied and requires attention',
        timestamp: claim.responseDate,
        actor: claim.payerName,
        icon: isAccepted ? CheckCircle : XCircle,
        iconColor: isAccepted ? 'text-green-600' : 'text-red-600',
        bgColor: isAccepted ? 'bg-green-50' : 'bg-red-50'
      });
    }

    // Payment received
    if (claim.paymentDate && claim.paidAmount > 0) {
      events.push({
        id: 'paid',
        type: 'paid',
        title: 'Payment Received',
        description: `Payment of ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(claim.paidAmount)} received`,
        timestamp: claim.paymentDate,
        actor: claim.payerName,
        icon: DollarSign,
        iconColor: 'text-emerald-600',
        bgColor: 'bg-emerald-50'
      });
    }

    return events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const timelineEvents = generateTimelineEvents();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const groupEventsByDate = (events: TimelineEvent[]) => {
    const groups: { [date: string]: TimelineEvent[] } = {};
    
    events.forEach(event => {
      const date = formatTimestamp(event.timestamp).date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
    });
    
    return groups;
  };

  const groupedEvents = groupEventsByDate(timelineEvents);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>Claim Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([date, events]) => (
              <div key={date}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-sm font-medium text-gray-900">{date}</div>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                
                <div className="space-y-4">
                  {events.map((event, index) => {
                    const Icon = event.icon;
                    const { time } = formatTimestamp(event.timestamp);
                    
                    return (
                      <div key={event.id} className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full ${event.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${event.iconColor}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <span className="text-sm text-gray-500">{time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {event.actor}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      {(claim.status === 'denied' || claim.status === 'pending') && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <div>
                <h4 className="font-medium text-orange-800">Action Required</h4>
                <p className="text-sm text-orange-700 mt-1">
                  {claim.status === 'denied' 
                    ? 'This claim was denied and needs to be corrected and resubmitted.'
                    : 'Additional information is required to process this claim.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}