"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getGoals() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("認証されていません");
    }

    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: goals,
    };
  } catch (error) {
    console.error("目標取得エラー:", error);
    return {
      success: false,
      message: "目標の取得に失敗しました",
    };
  }
}
