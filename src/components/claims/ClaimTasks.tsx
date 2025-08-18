import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  CheckSquare,
  Clock,
  User,
  Calendar,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Claim } from '@/features/claims/types';

interface Task {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  dueDate?: string;
  assignedTo?: string;
  completedAt?: string;
  completedBy?: string;
}

interface ClaimTasksProps {
  claim: Claim;
}

export default function ClaimTasks({ claim }: ClaimTasksProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Generate tasks based on claim status
    const baseTasks: Task[] = [];
    
    if (claim.status === 'denied' || claim.status === 'rejected') {
      baseTasks.push(
        {
          id: 'review-denial',
          title: 'Review Denial Reason',
          description: 'Analyze the denial reason and determine corrective actions',
          isRequired: true,
          isCompleted: false,
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          id: 'gather-docs',
          title: 'Gather Required Documentation',
          description: 'Collect all necessary supporting documents',
          isRequired: true,
          isCompleted: false,
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          id: 'correct-codes',
          title: 'Verify Procedure Codes',
          description: 'Ensure all procedure and diagnosis codes are correct',
          isRequired: true,
          isCompleted: false
        }
      );
    }
    
    if (claim.status === 'pending') {
      baseTasks.push(
        {
          id: 'provide-info',
          title: 'Provide Additional Information',
          description: 'Submit requested additional information to payer',
          isRequired: true,
          isCompleted: false,
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      );
    }

    return baseTasks;
  });

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            isCompleted: !task.isCompleted,
            completedAt: !task.isCompleted ? new Date().toISOString() : undefined,
            completedBy: !task.isCompleted ? 'Current User' : undefined
          }
        : task
    ));
  };

  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              <span>Task Progress</span>
            </CardTitle>
            <Badge variant="secondary">
              {completedTasks} of {totalTasks} completed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Complete all required tasks to enable claim resubmission
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-4 border rounded-lg transition-colors duration-200 ${
                  task.isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : isOverdue(task.dueDate)
                    ? 'bg-red-50 border-red-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={task.isCompleted}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${
                        task.isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                      }`}>
                        {task.title}
                        {task.isRequired && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Required
                          </Badge>
                        )}
                      </h4>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <User className="w-4 h-4 mr-2" />
                            Assign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Set Due Date
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <p className={`text-sm mt-1 ${
                      task.isCompleted ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 mt-3">
                      {task.dueDate && (
                        <div className={`flex items-center space-x-1 text-sm ${
                          isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          <Clock className="w-4 h-4" />
                          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      {task.assignedTo && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{task.assignedTo}</span>
                        </div>
                      )}
                      
                      {task.completedAt && (
                        <div className="flex items-center space-x-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Completed {new Date(task.completedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {tasks.length === 0 && (
              <div className="text-center py-8">
                <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks required</h3>
                <p className="text-gray-600">This claim doesn't have any pending tasks</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}