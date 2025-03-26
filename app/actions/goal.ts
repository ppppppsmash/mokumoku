"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type CreateGoalInput = {
  title: string;
  goalType: "daily" | "monthly";
  targetValue: number;
  unit: string;
  description?: string;
  isPublic: boolean;
  repeatDays?: string[];
  deadline?: Date;
};

export async function createGoal(data: CreateGoalInput) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("認証されていません");
    }

    const goal = await prisma.goal.create({
      data: {
        ...data,
        userId,
      },
    });

    revalidatePath("/top");
    return { success: true, data: goal };
  } catch (error) {
    console.error("目標作成エラー:", error);
    return { success: false, message: "目標の作成に失敗しました" };
  }
} 