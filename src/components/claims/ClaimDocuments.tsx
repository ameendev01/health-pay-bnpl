import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  FileText,
  Image,
  Download,
  Eye,
  Trash2,
  AlertTriangle,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { Claim } from '@/features/claims/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Document {
  id: string;
  name: string;
  type: 'required' | 'optional';
  category: 'clinical' | 'administrative' | 'authorization';
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  status: 'uploaded' | 'processing' | 'approved' | 'rejected';
  virusScanStatus: 'pending' | 'clean' | 'infected';
}

interface ClaimDocumentsProps {
  claim: Claim;
}

export default function ClaimDocuments({ claim }: ClaimDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-1',
      name: 'Clinical Notes.pdf',
      type: 'required',
      category: 'clinical',
      size: 245760,
      uploadedAt: '2024-01-20T10:30:00Z',
      uploadedBy: 'Dr. Smith',
      status: 'approved',
      virusScanStatus: 'clean'
    },
    {
      id: 'doc-2',
      name: 'Prior Authorization.pdf',
      type: 'required',
      category: 'authorization',
      size: 156432,
      uploadedAt: '2024-01-21T14:15:00Z',
      uploadedBy: 'Admin',
      status: 'processing',
      virusScanStatus: 'pending'
    }
  ]);

  const [isDragOver, setIsDragOver] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentIcon = (name: string) => {
    const extension = name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'uploaded':
        return <Badge className="bg-blue-100 text-blue-800">Uploaded</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    }
  };

  const getVirusScanBadge = (status: Document['virusScanStatus']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="text-xs">Scanning...</Badge>;
      case 'clean':
        return <Badge className="bg-green-100 text-green-800 text-xs">Clean</Badge>;
      case 'infected':
        return <Badge className="bg-red-100 text-red-800 text-xs">Infected</Badge>;
    }
  };

  const requiredDocs = documents.filter(doc => doc.type === 'required');
  const optionalDocs = documents.filter(doc => doc.type === 'optional');
  const completedRequired = requiredDocs.filter(doc => doc.status === 'approved').length;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
    // Handle file upload logic here
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <span>Document Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-gray-600 mb-4">
              Supports PDF, JPG, PNG files up to 10MB
            </p>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-red-600" />
              <span>Required Documents</span>
            </CardTitle>
            <Badge variant="secondary">
              {completedRequired} of {requiredDocs.length} complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getDocumentIcon(doc.name)}
                  <div>
                    <div className="font-medium text-gray-900">{doc.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getVirusScanBadge(doc.virusScanStatus)}
                  {getStatusBadge(doc.status)}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
            
            {requiredDocs.length === 0 && (
              <div className="text-center py-6">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No required documents for this claim</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Optional Documents */}
      {optionalDocs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <span>Supporting Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {optionalDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getDocumentIcon(doc.name)}
                    <div>
                      <div className="font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-500">
                        {formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(doc.status)}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Requirements */}
      {(claim.status === 'denied' || claim.status === 'pending') && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <div>
                <h4 className="font-medium text-orange-800">Documentation Required</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Upload all required documents before resubmitting this claim.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}