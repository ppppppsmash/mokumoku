"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [progressValue, setProgressValue] = useState(goal.currentValue.toString())

  const handleProgressUpdate = () => {
    const newValue = Number(progressValue)
    if (!isNaN(newValue) && newValue >= 0) {
      // onUpdateProgress({ goalId: goal.id, current: newValue })
    }
  }

  const progressPercentage = Math.min(Math.round((goal.currentValue / goal.targetValue) * 100), 100)
  const isCompleted = goal.status === "completed"

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          進捗: {goal.currentValue} / {goal.targetValue} {goal.unit}
        </div>
        <Button variant="ghost" size="sm" onClick={onToggleExpand} className="h-6 w-6 p-0">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      <div className="relative">
        <Progress value={progressPercentage} className="h-2" />
        {isCompleted && <CheckCircle2 className="absolute -top-1 -right-1 h-4 w-4 text-green-500" />}
      </div>

      {expanded && (
        <div className="flex items-center gap-2 mt-2">
          <Input
            type="number"
            value={progressValue}
            onChange={(e) => setProgressValue(e.target.value)}
            className="h-8"
            min="0"
            max={goal.targetValue}
          />
          <Button size="sm" onClick={handleProgressUpdate} className="h-8">
            更新
          </Button>
        </div>
      )}
    </div>
  )
}

