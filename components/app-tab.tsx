"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { week } from "@/config";

const dailyGoals = [
  { id: 1, title: "30分の運動", target: 30, current: 20, unit: "分" },
  { id: 2, title: "水を飲む", target: 2000, current: 1500, unit: "ml" },
  { id: 3, title: "読書", target: 20, current: 15, unit: "ページ" },
];

const monthlyGoals = [
  { id: 1, title: "ジム通い", target: 12, current: 8, unit: "回" },
  { id: 2, title: "新しい本を読む", target: 3, current: 2, unit: "冊" },
  { id: 3, title: "プロジェクト完了", target: 1, current: 0, unit: "個" },
];

const chartData = [
  { name: week[0], 運動: 30, 水分: 80, 読書: 40 },
  { name: week[1], 運動: 20, 水分: 75, 読書: 75 },
  { name: week[2], 運動: 60, 水分: 90, 読書: 50 },
  { name: week[3], 運動: 40, 水分: 85, 読書: 80 },
  { name: week[4], 運動: 70, 水分: 60, 読書: 90 },
  { name: week[5], 運動: 50, 水分: 70, 読書: 60 },
  { name: week[6], 運動: 90, 水分: 100, 読書: 70 },
];

export const AppTab = () => {
  return (
    <Tabs defaultValue="daily">
      <TabsList className="mb-4">
        <TabsTrigger value="daily">日次目標</TabsTrigger>
        <TabsTrigger value="monthly">月次目標</TabsTrigger>
      </TabsList>

      <TabsContent value="daily" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {dailyGoals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <CardDescription>
                  {goal.current} / {goal.target} {goal.unit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>週間進捗</CardTitle>
            <CardDescription>過去7日間の目標達成率</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="運動" fill="#8884d8" />
                  <Bar dataKey="水分" fill="#82ca9d" />
                  <Bar dataKey="読書" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="monthly" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {monthlyGoals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <CardDescription>
                  {goal.current} / {goal.target} {goal.unit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
