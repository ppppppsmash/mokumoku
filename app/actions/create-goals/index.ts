"use server";

import { z } from "zod";
import { createSafeAction } from "@/lib/create-safe-action";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateGoal } from "./schema";
import { db } from "@/lib/db";

const handler = async (data: z.infer<typeof CreateGoal>) => {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("認証されていません");
  }

  try {
    const goal = await db.goal.create({
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
    return { success: false, data: undefined };
  }
};

export const createGoal = createSafeAction(CreateGoal, handler);