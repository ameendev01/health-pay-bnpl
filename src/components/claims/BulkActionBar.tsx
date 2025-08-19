import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  UserPlus,
  Upload,
  RefreshCw,
  Download,
  X,
} from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkAssign: () => void;
  onBulkUpload: () => void;
  onBulkResubmit: () => void;
  onBulkExport: () => void;
}

export default function BulkActionBar({
  selectedCount,
  onClearSelection,
  onBulkAssign,
  onBulkUpload,
  onBulkResubmit,
  onBulkExport
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4">
        <div className="flex items-center space-x-4">
          {/* Selection Count */}
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {selectedCount} selected
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="w-6 h-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300" />

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkAssign}
              className="flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Assign</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkUpload}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Docs</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkResubmit}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Resubmit</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}