import { auth } from "@clerk/nextjs/server";
import { createUser } from "@/app/actions/user";
import GoalDialog from "@/components/app-goal-dialog";
import { AppTab } from "@/components/app-tab";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await createUser();

  return (
    <div className="bg-gray-100">
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <GoalDialog />
        </div>

        <AppTab />
      </div>
    </div>
  )
}

