"use client";

import { useState } from "react";
import { GoalStats } from "@/components/goal-stats";
import { useGoals } from "@/hooks/use-goals";
import { Goal } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoalList } from "./goal-list";

export const AppGoalPanel = () => {
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const { goals, isLoading, error } = useGoals()

  const dailyGoals = goals?.filter(goal => goal.goalType === "daily") || []
  const monthlyGoals = goals?.filter(goal => goal.goalType === "monthly") || []

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal)
  }

  const handleCloseForm = () => {
    setEditingGoal(null)
  }

  const renderGoalCard = (goal: Goal) => (
    <Card key={goal.id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{goal.title}</CardTitle>
        <CardDescription>
          {goal.currentValue ?? 0} / {goal.targetValue} {goal.unit}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={((goal.currentValue ?? 0) / goal.targetValue) * 100} className="h-2" />
      </CardContent>
    </Card>
  )

  const renderSkeletonCard = () => (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-2 w-full" />
      </CardContent>
    </Card>
  )

  return (
    <>
      <GoalStats goals={goals} />

      <Tabs defaultValue="daily" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="daily">日次目標</TabsTrigger>
          <TabsTrigger value="monthly">月次目標</TabsTrigger>
          <TabsTrigger value="all">すべての目標</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">日次目標</h2>
          </div>

          <GoalList
            goals={dailyGoals}
            onEdit={handleEditGoal}
            // onDelete={deleteGoal}
            // onUpdateProgress={updateProgress}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <GoalList
            goals={monthlyGoals}
            onEdit={()=> console.log("edit")}
            // onDelete={deleteGoal}
            // onUpdateProgress={updateProgress}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <GoalList
            goals={goals}
            onEdit={()=> console.log("edit")}
            // onDelete={deleteGoal}
            // onUpdateProgress={updateProgress}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

