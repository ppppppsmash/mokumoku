"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useGoalForm } from "@/hooks/use-goal-form";
import { goalUnit, goalCategory } from "@/config";
import { format } from "date-fns";

interface GoalFormProps {
  onSuccess?: () => void;
}

export const AppGoalForm = ({ onSuccess }: GoalFormProps) => {
  const {
    goalType,
    setGoalType,
    formData,
    isSubmitting,
    handleSubmit,
    handleInputChange,
  } = useGoalForm();

  const handleSuccess = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit(e);
    if (success) {
      onSuccess?.();
    }
  }

  return (
    <Card className="w-full mx-auto mb-6">
      <CardContent>
        <form onSubmit={handleSuccess} className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="title">目標タイトル</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="例: 毎日30分運動する"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>目標タイプ</Label>
            <RadioGroup
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
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger id="category">
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
              <Label htmlFor="target">目標値</Label>
              <Input
                id="target"
                value={formData.targetValue}
                onChange={(e) => handleInputChange("targetValue", e.target.value)}
                placeholder="例: 30"
                required
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="unit">単位</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => handleInputChange("unit", value)}
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
              <Label>繰り返し</Label>
              <ToggleGroup
                type="multiple"
                value={formData.repeatDays}
                onValueChange={(value) => handleInputChange("repeatDays", value)}
                className="flex flex-wrap gap-2"
              >
                {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
                  <ToggleGroupItem key={day} value={day} asChild>
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
                type="date"
                value={formData.deadline ? format(formData.deadline, "yyyy-MM-dd") : ""}
                onChange={(e) => handleInputChange("deadline", e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">詳細説明（任意）</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="目標の詳細や達成するための方法など"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="public"
              checked={formData.isPublic}
              onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
            />
            <Label htmlFor="public">この目標を公開する</Label>
          </div>

          <CardFooter className="flex justify-end space-x-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "保存中..." : "保存"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
