"use client";

import { useGoals } from "@/hooks/use-goals";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";


export function AppGoalPanel() {
  const { goals, isLoading, error } = useGoals();

  const dailyGoals = goals?.filter(goal => goal.goalType === "daily") || [];
  const monthlyGoals = goals?.filter(goal => goal.goalType === "monthly") || [];

  const renderGoalCard = (goal: any) => (
    <Card key={goal.id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{goal.title}</CardTitle>
        <CardDescription>
          {goal.currentValue || 0} / {goal.targetValue} {goal.unit}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={((goal.currentValue || 0) / goal.targetValue) * 100} className="h-2" />
      </CardContent>
    </Card>
  );

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
  );

  return (
    <Tabs defaultValue="daily">
      <TabsList className="mb-4">
        <TabsTrigger value="daily">日次目標</TabsTrigger>
        <TabsTrigger value="monthly">月次目標</TabsTrigger>
      </TabsList>

      <TabsContent value="daily" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">日次目標</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {isLoading ? (
            [...Array(3)].map((_, i) => renderSkeletonCard())
          ) : dailyGoals.length > 0 ? (
            dailyGoals.map(renderGoalCard)
          ) : (
            <Card className="col-span-full">
              <CardContent className="py-6">
                <p className="text-center text-muted-foreground">
                  日次目標が設定されていません
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>

      <TabsContent value="monthly" className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">月次目標</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {isLoading ? (
            [...Array(3)].map((_, i) => renderSkeletonCard())
          ) : monthlyGoals.length > 0 ? (
            monthlyGoals.map(renderGoalCard)
          ) : (
            <Card className="col-span-full">
              <CardContent className="py-6">
                <p className="text-center text-muted-foreground">
                  月次目標が設定されていません
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
