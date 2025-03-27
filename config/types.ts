export type GoalType = "daily" | "monthly"
export type GoalStatus = "active" | "completed" | "failed"
export type GoalCategory = "health" | "learning" | "work" | "personal" | "sports" | "other"

export interface Goal {
  title: string
  description?: string
  goalType: GoalType
  category: GoalCategory
  targetValue: number
  currentValue: number
  unit: string
  isPublic: boolean
  status?: GoalStatus
  userId: string
  createdAt?: Date
  updatedAt?: Date
  repeatDays?: string[]
  deadline?: Date
}

export interface GoalProgressUpdate {
  goalId: string
  currentValue: string
}
