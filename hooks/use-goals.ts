import { useEffect, useState } from "react";
import { getGoals } from "@/app/actions/get-goals";
import { toast } from "sonner";
import { Goal } from "@prisma/client";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      const result = await getGoals();

      if (result.success) {
        setGoals(result.data as Goal[]);
      } else {
        setError(result.message || "目標の取得に失敗しました");
        toast.error(result.message || "目標の取得に失敗しました");
      }
    } catch (error) {
      setError("目標の取得中にエラーが発生しました");
      toast.error("目標の取得中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return {
    goals,
    isLoading,
    error,
    refetch: fetchGoals,
  };
} 