'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Clock, Bookmark, ArrowLeft } from 'lucide-react'

interface SaveAndContinueLaterButtonProps {
  currentStep?: number
  totalSteps?: number
  progress?: number
  onSaveAndExit?: () => void
  onContinue?: () => void
  className?: string
  formTitle?: string
}

const SaveAndContinueLaterButton: React.FC<SaveAndContinueLaterButtonProps> = ({
  onSaveAndExit = () => console.log('Saved and exiting'),
  className,
}) => {
  const [showExitDialog, setShowExitDialog] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleSaveAndExit = () => {
    onSaveAndExit()
    setShowExitDialog(false)
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="flex justify-start border-2 border-dashed border-border rounded-lg">
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Button 
            variant="ghost" 
            onClick={() => setShowExitDialog(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Save and exit
          </Button>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 p-3 bg-popover border border-border rounded-lg shadow-lg z-50 w-64"
              >
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">Come back anytime</p>
                    <p className="text-muted-foreground mt-1">
                      Your progress will be saved and you can continue where you left off.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showExitDialog && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowExitDialog(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div className="bg-background border border-border rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bookmark className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Save your progress?
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <p className="text-muted-foreground">
                    We'll save your progress so you can pick up right where you left off.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setShowExitDialog(false)}
                    className="flex-1"
                  >
                    Keep editing
                  </Button>
                  <Button
                    onClick={handleSaveAndExit}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Save & go to dashboard
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SaveAndContinueLaterButton;