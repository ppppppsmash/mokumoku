import { AppGoalDialog } from "@/components/app-goal-dialog";
import { AppGoalPanel } from "@/components/app-goal-panel";

export default async function DashboardPage() {
  return (
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ダッシュボード</h1>
          <AppGoalDialog />
        </div>

      <AppGoalPanel />
    </div>
  );
}
