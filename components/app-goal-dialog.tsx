"use client";

import { useState } from "react";
import { GoalForm } from "@/components/app-goal-form"
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

const GoalDialog = () => {
  const [open, setOpen] = useState(false);

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
            テキストテキスト
          </DialogDescription>
        </DialogHeader>

        <GoalForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default GoalDialog;
