import { AppGoalDialog } from "@/components/app-goal-dialog";
import { AppGoalPanel } from "@/components/app-goal-panel";

export default async function GoalsPage() {
  return (
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">目標管理</h1>
          <AppGoalDialog />
        </div>

        <p className="text-gray-500 mb-5">あなたの目標を管理し、進捗を追跡します</p>
        <AppGoalPanel />
    </div>
  );
}
