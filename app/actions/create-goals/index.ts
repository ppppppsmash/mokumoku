"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Goal } from "@/config/types";

export async function createGoal(data: Omit<Goal, "userId">) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("認証されていません");
    }

    const goal = await prisma.goal.create({
      data: {
        ...data,
        userId,
        status: "active",
        targetValue: Number(data.targetValue),
        currentValue: Number(data.currentValue),
        deadline: data.deadline ? new Date(data.deadline) : undefined,
      }
    });

    revalidatePath("/top");
    return { success: true, data: goal };
  } catch (error) {
    console.error("目標作成エラー:", error);
    return { success: false, message: "目標の作成に失敗しました" };
  }
}
