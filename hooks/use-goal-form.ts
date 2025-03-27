import { useState } from "react";
import { toast } from "sonner";
import { createGoal } from "@/app/actions/create-goals";
import { Goal } from "@/config/types";

export function useGoalForm() {
  const [goalType, setGoalType] = useState<"daily" | "monthly">("daily");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Omit<Goal, "userId">>({
    title: "",
    description: "",
    goalType: "daily",
    category: "other",
    targetValue: 0,
    currentValue: 0,
    unit: "",
    isPublic: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createGoal({
        title: formData.title,
        description: formData.description,
        goalType,
        category: formData.category,
        targetValue: formData.targetValue,
        currentValue: formData.currentValue,
        unit: formData.unit,
        isPublic: formData.isPublic,
        createdAt: new Date(),
        updatedAt: new Date(),
        repeatDays: goalType === "daily" ? formData.repeatDays : undefined,
        deadline: goalType === "monthly" ? formData.deadline : undefined,
      });

      if (result.success) {
        toast.success("目標を作成しました");

        setFormData({
          title: "",
          description: "",
          goalType: "daily",
          category: "other",
          targetValue: 0,
          currentValue: 0,
          unit: "",
          isPublic: false,
        });

        return true;
      } else {
        toast.error("目標の作成に失敗しました");
      }
    } catch (error) {
      toast.error("目標の作成中にエラーが発生しました。");
    } finally {
      setIsSubmitting(false);
    }

    return false;
  };

  const handleInputChange = (field: keyof Goal, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    goalType,
    setGoalType,
    formData,
    isSubmitting,
    handleSubmit,
    handleInputChange,
  };
}
