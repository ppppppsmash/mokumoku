import { useState } from "react";
import { toast } from "sonner";
import { createGoal } from "@/app/actions/goal";

interface GoalFormData {
  title: string;
  goalType: "daily" | "monthly";
  targetValue: string;
  unit: string;
  description: string;
  isPublic: boolean;
  repeatDays: string[];
  deadline: string;
};

export function useGoalForm() {
  const [goalType, setGoalType] = useState<"daily" | "monthly">("daily");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<GoalFormData>({
    title: "",
    goalType: "daily",
    targetValue: "",
    unit: "",
    description: "",
    isPublic: false,
    repeatDays: [],
    deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createGoal({
        title: formData.title,
        goalType,
        targetValue: parseInt(formData.targetValue),
        unit: formData.unit,
        description: formData.description,
        isPublic: formData.isPublic,
        repeatDays: goalType === "daily" ? formData.repeatDays : undefined,
        deadline: goalType === "monthly" ? new Date(formData.deadline) : undefined,
      });

      if (result.success) {
        toast.success("目標を作成しました");

        setFormData({
          title: "",
          goalType: "daily",
          targetValue: "",
          unit: "",
          description: "",
          isPublic: false,
          repeatDays: [],
          deadline: "",
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

  const handleInputChange = (field: keyof GoalFormData, value: string | boolean | string[]) => {
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