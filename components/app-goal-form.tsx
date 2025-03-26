"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function GoalForm() {
  const [goalType, setGoalType] = useState("daily")

  return (
    <Card className="w-full mx-auto mb-6">
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">目標タイトル</Label>
            <Input id="title" placeholder="例: 毎日30分運動する" />
          </div>

          <div className="space-y-2">
            <Label>目標タイプ</Label>
            <RadioGroup defaultValue="daily" onValueChange={setGoalType} className="flex space-x-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target">目標値</Label>
              <Input id="target" type="number" placeholder="例: 30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">単位</Label>
              <Select>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="単位を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">分</SelectItem>
                  <SelectItem value="hours">時間</SelectItem>
                  <SelectItem value="times">回</SelectItem>
                  <SelectItem value="pages">ページ</SelectItem>
                  <SelectItem value="books">冊</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="km">km</SelectItem>
                  <SelectItem value="custom">カスタム</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {goalType === "daily" && (
            <div className="space-y-2">
              <Label>繰り返し</Label>
              <div className="flex flex-wrap gap-2">
                {["月", "火", "水", "木", "金", "土", "日"].map((day) => (
                  <Button key={day} variant="outline" className="flex-1" type="button">
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {goalType === "monthly" && (
            <div className="space-y-2">
              <Label htmlFor="deadline">期限</Label>
              <Input id="deadline" type="date" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">詳細説明（任意）</Label>
            <Textarea id="description" placeholder="目標の詳細や達成するための方法など" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="public" />
            <Label htmlFor="public">この目標を公開する</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button>保存</Button>
      </CardFooter>
    </Card>
  )
}

