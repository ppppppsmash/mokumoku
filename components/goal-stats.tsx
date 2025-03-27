"use client";

import { Goal } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Target, TrendingUp } from "lucide-react";

interface GoalStatsProps {
  goals: Goal[]
}

export function GoalStats({ goals }: GoalStatsProps) {

  const totalGoals = goals.length;

  // 達成した目標数
  const completedGoals = goals.filter((goal) => goal.status === "completed").length;

  // 進行中の目標数
  const activeGoals = goals.filter((goal) => goal.status === "active").length;

  // 平均達成率
  const averageProgress =
    goals.length > 0
      ? Math.round(
          goals.reduce(
            (acc, goal) => acc + (((goal.currentValue ?? 0) / goal.targetValue) * 100),
            0
          ) / goals.length
        )
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">総目標数</CardTitle>
          <Target className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGoals}</div>
          <p className="text-xs text-gray-500">設定された目標の総数</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">達成目標</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedGoals}</div>
          <p className="text-xs text-gray-500">達成した目標の数</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">進行中</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeGoals}</div>
          <p className="text-xs text-gray-500">現在進行中の目標</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">平均達成率</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageProgress}%</div>
          <p className="text-xs text-gray-500">全目標の平均達成率</p>
        </CardContent>
      </Card>
    </div>
  );
}
