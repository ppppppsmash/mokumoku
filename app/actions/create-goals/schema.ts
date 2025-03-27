import { z } from "zod";
import { GoalType, GoalCategory } from "@prisma/client";

export const CreateGoal = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  goalType: z.nativeEnum(GoalType),
  category: z.nativeEnum(GoalCategory).nullable().optional(),
  targetValue: z.number().min(1),
  currentValue: z.number().min(0),
  unit: z.string().nullable().optional(),
  isPublic: z.boolean().optional(),
  repeatDays: z.array(z.string()).optional(),
  deadline: z.date().nullable().optional(),
  userId: z.string().optional(), 
});
