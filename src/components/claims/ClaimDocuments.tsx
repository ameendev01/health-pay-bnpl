import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Download,
  Eye,
  Trash2,
  AlertTriangle,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { Claim } from '@/features/claims/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

// ---------- Types & helpers (moved outside to avoid re-creation on each render) ----------
type ClaimDoc = {
  id: string;
  name: string;
  type: 'required' | 'optional';
  category: 'clinical' | 'administrative' | 'authorization';
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  status: 'uploaded' | 'processing' | 'approved' | 'rejected';
  virusScanStatus: 'pending' | 'clean' | 'infected';
};

const seedDocs = (): ClaimDoc[] => [
  {
    id: 'doc-1',
    name: 'Clinical Notes.pdf',
    type: 'required',
    category: 'clinical',
    size: 245_760,
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
    size: 156_432,
    uploadedAt: '2024-01-21T14:15:00Z',
    uploadedBy: 'Admin',
    status: 'processing',
    virusScanStatus: 'pending'
  },
  {
    id: 'doc-3',
    name: 'Insurance Card.jpg',
    type: 'optional',
    category: 'administrative',
    size: 102_400,
    uploadedAt: '2024-01-22T09:00:00Z',
    uploadedBy: 'Patient',
    status: 'uploaded',
    virusScanStatus: 'clean'
  }
];

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const DocIcon = ({ name }: { name: string }) => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return <FileText className="w-5 h-5 text-red-600" />;
  if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') return <ImageIcon className="w-5 h-5 text-blue-600" />;
  return <FileText className="w-5 h-5 text-gray-600" />;
};

const StatusBadge = React.memo(function StatusBadge({
  status,
}: { status: ClaimDoc['status'] }) {
  switch (status) {
    case 'uploaded':
      return <Badge className="bg-blue-100 text-blue-800">Uploaded</Badge>;
    case 'processing':
      return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
    case 'approved':
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case 'rejected':
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    default:
      return null; // exhaustiveness safety
  }
});

const VirusBadge = React.memo(function VirusBadge({
  status,
}: { status: ClaimDoc['virusScanStatus'] }) {
  switch (status) {
    case 'pending':
      return <Badge variant="secondary" className="text-xs">Scanning...</Badge>;
    case 'clean':
      return <Badge className="bg-green-100 text-green-800 text-xs">Clean</Badge>;
    case 'infected':
      return <Badge className="bg-red-100 text-red-800 text-xs">Infected</Badge>;
    default:
      return null;
  }
});

const DocumentRow = React.memo(function DocumentRow({
  doc,
  onPreview,
  onDownload,
  onDelete,
}: {
  doc: ClaimDoc;
  onPreview: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const dateStr = useMemo(() => new Date(doc.uploadedAt).toLocaleDateString(), [doc.uploadedAt]);
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <DocIcon name={doc.name} />
        <div>
          <div className="font-medium text-gray-900">{doc.name}</div>
          <div className="text-sm text-gray-500">
            {formatFileSize(doc.size)} • Uploaded {dateStr}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {'virusScanStatus' in doc && <VirusBadge status={doc.virusScanStatus} />}
        <StatusBadge status={doc.status} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onPreview(doc.id)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDownload(doc.id)}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={() => onDelete(doc.id)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});

// ---------- Component ----------
interface ClaimDocumentsProps {
  claim: Claim;
}

export default function ClaimDocuments({ claim }: ClaimDocumentsProps) {
  // If you have claim.documents, hydrate from it; otherwise seed.
  const [documents, setDocuments] = useState<ClaimDoc[]>(
    () => (Array.isArray((claim as any).documents) && (claim as any).documents.length
      ? (claim as any).documents as ClaimDoc[]
      : seedDocs())
  );

  // Reset docs when switching to a different claim (prevents stale state carryover)
  useEffect(() => {
    if (Array.isArray((claim as any).documents) && (claim as any).documents.length) {
      setDocuments((claim as any).documents as ClaimDoc[]);
    } else {
      setDocuments(seedDocs());
    }
  }, [claim.id]);

  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derivations are memoized to avoid recomputing on unrelated state changes
  const requiredDocs = useMemo(() => documents.filter(d => d.type === 'required'), [documents]);
  const optionalDocs = useMemo(() => documents.filter(d => d.type === 'optional'), [documents]);
  const completedRequired = useMemo(
    () => requiredDocs.filter(d => d.status === 'approved').length,
    [requiredDocs]
  );

  // Stable handlers (no re-creation unless deps change)
  const addFiles = useCallback((files: File[]) => {
    if (!files.length) return;
    setDocuments(prev => {
      const next = prev.slice();
      for (const file of files) {
        const id = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).toString();
        // Basic categorization stub; adapt to your business rules
        const category: ClaimDoc['category'] =
          file.name.toLowerCase().endsWith('.pdf') ? 'clinical' : 'administrative';
        next.push({
          id,
          name: file.name,
          type: 'optional',
          category,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          uploadedBy: 'You',
          status: 'uploaded',
          virusScanStatus: 'pending',
        });
      }
      return next;
    });
  }, []);

  const openFilePicker = useCallback(() => fileInputRef.current?.click(), []);
  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(e.target.files ?? []));
    // allow uploading the same file again later
    e.target.value = '';
  }, [addFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  }, [addFiles]);

  const handlePreview = useCallback((id: string) => {
    // open preview modal / route
    // e.g., setPreviewDocId(id)
    console.log('preview', id);
  }, []);
  const handleDownload = useCallback((id: string) => {
    // trigger download flow
    console.log('download', id);
  }, []);
  const handleDelete = useCallback((id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  }, []);

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
            role="button"
            tabIndex={0}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 cursor-pointer ${
              isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={openFilePicker}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openFilePicker()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-gray-600 mb-4">Supports PDF, JPG, PNG files up to 10MB</p>
            <Button variant="outline" onClick={openFilePicker}>
              <Plus className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              className="hidden"
              onChange={onFileInputChange}
            />
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
              <DocumentRow
                key={doc.id}
                doc={doc}
                onPreview={handlePreview}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
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
                <DocumentRow
                  key={doc.id}
                  doc={doc}
                  onPreview={handlePreview}
                  onDownload={handleDownload}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Document Requirements Notice */}
      {(claim.status === 'denied' || (claim as any).status === 'pending') && (
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