"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

const handler = async () => {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !currentUser) {
      throw new Error("認証されていません");
    }

    const existingUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (existingUser) {
      return { success: true, message: "ユーザーは既に存在します" };
    }

    await db.user.create({
      data: {
        id: userId,
        email: user?.emailAddresses[0].emailAddress || "",
        name: user?.firstName ? `${user.firstName} ${user.lastName || ""}` : null,
      },
    });

    return { success: true, message: "ユーザーを作成しました" };
  } catch (error) {
    console.error("ユーザー作成エラー:", error);
    return { success: false, message: "ユーザーの作成に失敗しました" };
  }
}

export { handler as createUser };
