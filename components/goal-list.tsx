"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Goal } from "@prisma/client";
import { GoalProgress } from "@/components/goal-progress";
import { week } from "@/config";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
interface GoalListProps {
  goals: Goal[]
  onEdit: (goal: Goal) => void
  onDelete?: (id: string) => void
  onUpdateProgress?: (data: { goalId: string; current: number }) => void
  isLoading: boolean
}

export function GoalList({ goals, onEdit, onDelete, onUpdateProgress, isLoading }: GoalListProps) {
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedGoalId(expandedGoalId === id ? null : id)
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      health: "健康",
      learning: "学習",
      work: "仕事",
      personal: "個人",
      sports: "運動",
      other: "その他",
    }
    return categories[category] || category
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      health: "bg-green-100 text-green-800 hover:bg-green-100",
      learning: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      work: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      personal: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      other: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    }
    return colors[category] || "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }

  const getStatusLabel = (status: string) => {
    const statuses: Record<string, string> = {
      active: "進行中",
      completed: "達成",
      failed: "未達成",
    }
    return statuses[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      completed: "bg-green-100 text-green-800 hover:bg-green-100",
      failed: "bg-red-100 text-red-800 hover:bg-red-100",
    }
    return colors[status] || "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-2 w-full mb-2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (goals.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500 mb-4">目標がまだ設定されていません</p>
        <Button variant="outline">新しい目標を設定する</Button>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <Card key={goal.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{goal.title}</CardTitle>
              <div className="flex gap-1">
                <Badge variant="outline" className={getCategoryColor(goal.category || "")}>
                  {getCategoryLabel(goal.category || "")}
                </Badge>
                <Badge variant="outline" className={getStatusColor(goal.status)}>
                  {getStatusLabel(goal.status)}
                </Badge>
              </div>
            </div>
            <CardDescription>
              {goal.targetValue} {goal.unit}
              {goal.goalType === "daily" && " / 日"}
              {goal.goalType === "monthly" && " / 月"}
              {goal.isPublic ? (
                <Eye className="inline-block ml-2 h-3 w-3" />
              ) : (
                <EyeOff className="inline-block ml-2 h-3 w-3" />
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoalProgress
              goal={goal}
              //onUpdateProgress={onUpdateProgress}
              expanded={expandedGoalId === goal.id}
              onToggleExpand={() => toggleExpand(goal.id)}
            />

            {expandedGoalId === goal.id && (
              <div className="mt-4 space-y-2 text-sm">
                {goal.description && <p className="text-gray-600">{goal.description}</p>}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500">開始日</p>
                    {/* <p>{new Date(goal.startDate).toLocaleDateString()}</p> */}
                  </div>
                  {goal.deadline && (
                    <div>
                      <p className="text-gray-500">期限</p>
                      <p>{new Date(goal.deadline).toLocaleDateString()}</p>
                    </div>
                  )}
                  {goal.goalType === "daily" && goal.repeatDays && (
                    <div className="col-span-2">
                      <p className="text-gray-500">繰り返し</p>
                      <ToggleGroup
                        type="multiple"
                        className="flex flex-wrap gap-2"
                        value={goal.repeatDays}
                      >
                        {week.map((day) => (
                          <ToggleGroupItem key={day} value={day} name="repeatDays" asChild>
                            <Button variant="outline" type="button">
                              {day}
                            </Button>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm" onClick={() => onEdit(goal)}>
              <Edit className="h-4 w-4 mr-1" />
              編集
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-1" />
                  削除
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>目標を削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は元に戻せません。この目標とそのすべての進捗データが完全に削除されます。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction
                    // onClick={() => onDelete(goal.id)}
                    className="bg-red-500 hover:bg-red-700">
                    削除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

