"use client";

import { useState } from "react";
import { AppGoalForm } from "@/components/app-goal-form";
import { Goal } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const AppGoalDialog = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Goal | null>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          新規目標
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-[800px] !max-w-[800px]">
        <DialogHeader>
          <DialogTitle>新しい目標を設定</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>

        <AppGoalForm onSuccess={() => setOpen(false)} data={data as Goal} />
      </DialogContent>
    </Dialog>
  );
}

