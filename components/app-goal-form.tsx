"use client";

import { Goal, GoalCategory, GoalType } from "@prisma/client";
import { useState } from "react";
import { useAction } from "@/hooks/use-action";
import { createGoal } from "@/app/actions/create-goals";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { goalUnit, goalCategory, week } from "@/config";

interface GoalFormProps {
  data: Goal
  onSuccess?: () => void;
}

export const AppGoalForm = ({ onSuccess }: GoalFormProps) => {
  const [goalType, setGoalType] = useState<GoalType>("daily");
  const [isPublic, setIsPublic] = useState(false);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);

  const { execute, fieldErrors, error, data, isLoading } = useAction(createGoal, {
    onSuccess: (data) => {
      console.log("目標作成成功:", data);
      onSuccess?.();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const targetValue = formData.get("targetValue") as string;
    const unit = formData.get("unit") as string;
    const category = formData.get("category") as GoalCategory;
    const isPublic = formData.get("isPublic");
    const deadlineStr = formData.get("deadline") as string | null;
    const deadline = deadlineStr ? new Date(deadlineStr) : undefined;

    execute({
      title,
      description,
      targetValue: Number(targetValue),
      currentValue: 0,
      unit,
      goalType,
      category,
      isPublic: Boolean(isPublic),
      repeatDays,
      deadline,
    });
  };

  return (
    <Card className="w-full mx-auto mb-6">
      <CardContent>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="title">目標タイトル</Label>
            <Input
              id="title"
              name="title"
              value={data?.title}
              placeholder="例: 毎日30分運動する"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>目標タイプ</Label>
            <RadioGroup
              name="goalType"
              defaultValue="daily"
              onValueChange={(value) => setGoalType(value as "daily" | "monthly")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">日次目標</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">月次目標</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>目標カテゴリ</Label>
            <Select
              name="category"
              value={data?.category ?? undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="カテゴリを選択" />
              </SelectTrigger>
              <SelectContent>
                {goalCategory.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="targetValue">目標値</Label>
              <Input
                id="targetValue"
                name="targetValue"
                type="number"
                value={data?.targetValue}
                placeholder="例: 30"
                required
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="unit">単位</Label>
              <Select
                name="unit"
                defaultValue=""
              >
                <SelectTrigger id="unit">
                  <SelectValue placeholder="単位を選択" />
                </SelectTrigger>
                <SelectContent>
                  {goalUnit.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {goalType === "daily" && (
            <div className="space-y-2">
              <Label htmlFor="repeatDays">繰り返し</Label>
              <ToggleGroup
                type="multiple"
                className="flex flex-wrap gap-2"
                value={repeatDays}
                onValueChange={setRepeatDays}
              >
                {week.map((day) => (
                  <ToggleGroupItem key={day} value={day} name="repeatDays" asChild>
                    <Button variant="outline" type="button">
                      {day}
                    </Button>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}

          {goalType === "monthly" && (
            <div className="space-y-2">
              <Label htmlFor="deadline">期限</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={data?.deadline?.toISOString().split('T')[0]}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">詳細説明（任意）</Label>
            <Textarea
              id="description"
              name="description"
              value={data?.description ?? undefined}
              placeholder="目標の詳細や達成するための方法など"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublic"
              name="isPublic"
              defaultChecked={false}
              checked={isPublic}
              onCheckedChange={(checked) => {
                setIsPublic(checked);
              }}
            />
            <Label htmlFor="isPublic">この目標を公開する</Label>
          </div>

          <CardFooter className="flex justify-end space-x-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "保存中..." : "保存"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
