"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Goal } from "@prisma/client";

interface GoalProgressProps {
  goal: Goal
  onUpdateProgress?: (data: { goalId: string; current: number }) => void
  expanded: boolean
  onToggleExpand: () => void
}

export function GoalProgress({ goal, onUpdateProgress, expanded, onToggleExpand }: GoalProgressProps) {
  const [progressValue, setProgressValue] = useState((goal.currentValue ?? 0).toString())

  const handleProgressUpdate = () => {
    const newValue = Number(progressValue)
    if (!isNaN(newValue) && newValue >= 0) {
      onUpdateProgress?.({ goalId: goal.id, current: newValue })
    }
  }

  const progressPercentage = Math.min(Math.round(((goal.currentValue ?? 0) / goal.targetValue) * 100), 100)
  const isCompleted = goal.status === "completed"

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          進捗: {goal.currentValue ?? 0} / {goal.targetValue} {goal.unit}
        </div>
        <Button variant="ghost" size="sm" onClick={onToggleExpand} className="h-6 w-6 p-0">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      <div className="relative">
        <Progress value={progressPercentage} className="h-2" />
        {isCompleted && <CheckCircle2 className="absolute -top-1 -right-1 h-4 w-4 text-green-500" />}
      </div>
    </div>
  )
}

