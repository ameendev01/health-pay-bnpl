import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Keyboard } from 'lucide-react';
import { KEYBOARD_SHORTCUTS } from '@/features/claims/constants';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Keyboard className="w-5 h-5 text-blue-600" />
            <span>Keyboard Shortcuts</span>
          </DialogTitle>
          <DialogDescription>
            Use these shortcuts to navigate and manage claims efficiently
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {Object.entries(KEYBOARD_SHORTCUTS).map(([key, description]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{description}</span>
              <Badge variant="outline" className="font-mono">
                {key}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Press <Badge variant="outline" className="font-mono text-xs">?</Badge> anytime to show this help
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}