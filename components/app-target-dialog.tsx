"use client";

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

const TargetDialog = () => {
  return (
    <Dialog>
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

        <GoalForm />
      </DialogContent>
    </Dialog>
  );
};

export default TargetDialog;
