import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Plus,
  User,
  Clock,
  Lock,
  Send,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Claim } from '@/features/claims/types';

interface Note {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  isInternal: boolean;
  mentions: string[];
}

interface ClaimNotesProps {
  claim: Claim;
}

export default function ClaimNotes({ claim }: ClaimNotesProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 'note-1',
      content: 'Reviewed denial reason. Prior authorization was indeed required for this procedure. Contacting clinic to obtain authorization.',
      author: 'Claims Specialist',
      createdAt: '2024-01-22T10:30:00Z',
      isInternal: true,
      mentions: []
    },
    {
      id: 'note-2',
      content: 'Prior authorization obtained. Reference number: PA-2024-001234. Ready for resubmission.',
      author: 'Dr. Smith',
      createdAt: '2024-01-23T14:15:00Z',
      isInternal: false,
      mentions: ['@claims-team']
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [isInternal, setIsInternal] = useState(true);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: `note-${Date.now()}`,
      content: newNote,
      author: 'Current User',
      createdAt: new Date().toISOString(),
      isInternal,
      mentions: []
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Add Note */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Add Note</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Add a note about this claim... Use @username to mention team members"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="internal-note"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="internal-note" className="text-sm text-gray-600">
                  Internal note (not visible to clinic)
                </label>
              </div>
              
              <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card>
        <CardHeader>
          <CardTitle>Notes & Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{note.author}</span>
                        {note.isInternal && (
                          <Badge variant="secondary" className="text-xs flex items-center space-x-1">
                            <Lock className="w-3 h-3" />
                            <span>Internal</span>
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimestamp(note.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="mt-3 pl-11">
                  <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                  
                  {note.mentions.length > 0 && (
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Mentioned:</span>
                      {note.mentions.map((mention, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {mention}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {notes.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                <p className="text-gray-600">Add the first note to start tracking claim discussions</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Note Guidelines */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Note Guidelines</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Use @username to notify team members</li>
                <li>• Mark sensitive information as internal</li>
                <li>• Include relevant details for future reference</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}