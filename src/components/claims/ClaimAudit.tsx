import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  User,
  Clock,
  Edit,
  Eye,
  Download,
  FileText
} from 'lucide-react';
import { Claim } from '@/features/claims/types';

interface AuditEntry {
  id: string;
  action: 'created' | 'updated' | 'viewed' | 'submitted' | 'resubmitted';
  field?: string;
  oldValue?: string;
  newValue?: string;
  actor: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

interface ClaimAuditProps {
  claim: Claim;
}

export default function ClaimAudit({ claim }: ClaimAuditProps) {
  // Mock audit data - in real app this would come from API
  const auditEntries: AuditEntry[] = [
    {
      id: 'audit-1',
      action: 'created',
      actor: 'Dr. Smith',
      timestamp: claim.createdAt,
      ipAddress: '192.168.1.100'
    },
    {
      id: 'audit-2',
      action: 'updated',
      field: 'totalAmount',
      oldValue: '400.00',
      newValue: '450.00',
      actor: 'Admin User',
      timestamp: '2024-01-16T08:30:00Z',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'audit-3',
      action: 'submitted',
      actor: 'System',
      timestamp: claim.submissionDate || claim.createdAt,
      ipAddress: 'system'
    },
    {
      id: 'audit-4',
      action: 'viewed',
      actor: 'Manager',
      timestamp: '2024-01-20T14:15:00Z',
      ipAddress: '192.168.1.102'
    }
  ];

  const getActionIcon = (action: AuditEntry['action']) => {
    switch (action) {
      case 'created':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'updated':
        return <Edit className="w-4 h-4 text-orange-600" />;
      case 'viewed':
        return <Eye className="w-4 h-4 text-gray-600" />;
      case 'submitted':
      case 'resubmitted':
        return <Clock className="w-4 h-4 text-purple-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionBadge = (action: AuditEntry['action']) => {
    switch (action) {
      case 'created':
        return <Badge className="bg-blue-100 text-blue-800">Created</Badge>;
      case 'updated':
        return <Badge className="bg-orange-100 text-orange-800">Updated</Badge>;
      case 'viewed':
        return <Badge className="bg-gray-100 text-gray-800">Viewed</Badge>;
      case 'submitted':
        return <Badge className="bg-purple-100 text-purple-800">Submitted</Badge>;
      case 'resubmitted':
        return <Badge className="bg-purple-100 text-purple-800">Resubmitted</Badge>;
      default:
        return <Badge variant="secondary">{action}</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="space-y-6">
      {/* Audit Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Audit Trail</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Audit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-semibold text-blue-900">{auditEntries.length}</div>
                <div className="text-sm text-blue-700">Total Events</div>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-semibold text-green-900">
                  {auditEntries.filter(e => e.action === 'updated').length}
                </div>
                <div className="text-sm text-green-700">Modifications</div>
              </div>
              
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-semibold text-purple-900">
                  {new Set(auditEntries.map(e => e.actor)).size}
                </div>
                <div className="text-sm text-purple-700">Unique Actors</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditEntries.map((entry) => {
              const { date, time } = formatTimestamp(entry.timestamp);
              
              return (
                <div key={entry.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                    {getActionIcon(entry.action)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getActionBadge(entry.action)}
                        {entry.field && (
                          <Badge variant="outline" className="text-xs">
                            {entry.field}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {date} at {time}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{entry.actor}</span>
                        {entry.ipAddress && entry.ipAddress !== 'system' && (
                          <span className="text-sm text-gray-500">({entry.ipAddress})</span>
                        )}
                      </div>
                      
                      {entry.field && entry.oldValue && entry.newValue && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-600">Changed:</span>
                              <code className="bg-white px-2 py-1 rounded text-xs">{entry.field}</code>
                            </div>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <span className="text-red-600 text-xs">From:</span>
                                <div className="bg-red-50 border border-red-200 px-2 py-1 rounded text-sm font-mono">
                                  {entry.oldValue}
                                </div>
                              </div>
                              <div>
                                <span className="text-green-600 text-xs">To:</span>
                                <div className="bg-green-50 border border-green-200 px-2 py-1 rounded text-sm font-mono">
                                  {entry.newValue}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Audit Compliance</h4>
              <p className="text-sm text-blue-700 mt-1">
                This audit trail is immutable and maintained for compliance purposes. 
                All access and modifications are logged with full traceability.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}